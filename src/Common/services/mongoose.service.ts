import mongoose from "mongoose"
import debug, { IDebugger } from "debug"
import { Console } from "console"

const log: IDebugger = debug("app:mongoose-service")

class MongooseService {
  private count = 0
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false,
  }

  constructor() {
    this.connectWithRetry()
  }

  getInstance() {
    return mongoose
  }

  connectWithRetry() {
    const MONGODB_URI = process.env.MONGODB_URI || ""
    mongoose
      .connect(MONGODB_URI, this.mongooseOptions)
      .then(() => {
        console.log("MongoDB is connected")
      })
      .catch((err) => {
        console.log("connection failed")
        const retrySeconds = 5 * 1000
        log(
          `MongoDB connection unsuccessful (will retry #${++this
            .count} after ${retrySeconds} seconds):`,
          err
        )
        setTimeout(this.connectWithRetry, retrySeconds)
      })
  }
}

export default new MongooseService()

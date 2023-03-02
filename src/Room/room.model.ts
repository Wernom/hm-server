import MongooseService from "../Common/services/mongoose.service"
import { Schema, Model, Document } from "mongoose"
import { scrypt } from "crypto"
import { promisify } from "util"
import { IRoom } from "./room.interface"
import { Password } from "../Common/services/password"
const scryptAsync = promisify(scrypt)

export interface RoomDocument extends Document {
  name: string
  temp: string
  pAtm: string
  timestamp: number
}

interface RoomModel extends Model<RoomDocument> {
  build(attrs: IRoom): RoomDocument
}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    temp: { type: Number, required: true },
    pAtm: { type: Number, required: true },
    timestamp: { type: Number, required: true }
  },
  {
    toObject: {
      transform: function (doc, ret) { },
    },
    toJSON: {
      transform: function (doc, ret) {
      },
    },
  }
)

RoomSchema.statics.build = (attrs: IRoom) => {
  return new Room(attrs)
}

const Room = MongooseService.getInstance().model<RoomDocument, RoomModel>(
  "Room",
  RoomSchema
)

export default Room

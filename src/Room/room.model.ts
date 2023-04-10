/* eslint-disable @typescript-eslint/no-empty-function */
import { Document, Model, Schema } from "mongoose";
import MongooseService from "../Common/services/mongoose.service";
import { IRoom } from "./room.interface";

export interface RoomDocument extends Document {
  name: string;
  temp: number;
  humidity: number;
  timestamp: number;
}

interface RoomModel extends Model<RoomDocument> {
  build(attrs: IRoom): RoomDocument;
}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    timestamp: { type: Number, required: true },
  },
  {
    toObject: {
      transform: function (doc, ret) {},
    },
    toJSON: {
      transform: function (doc, ret) {},
    },
  }
);

RoomSchema.statics.build = (attrs: IRoom) => {
  return new Room(attrs);
};

const Room = MongooseService.getInstance().model<RoomDocument, RoomModel>(
  "Room",
  RoomSchema
);

export default Room;

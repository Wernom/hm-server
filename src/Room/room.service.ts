import Room from "../Room/room.model"
import { IRoom } from "../Room/room.interface"
import { FilterQuery } from "mongoose"
import { IUser } from "../User/user.interface"

class RoomService {

  async find(filter: FilterQuery<IUser>) {
    return Room.find(filter || {})
  }

  async create(data: IRoom) {
    try {
      const room = Room.build(data)
      await room.save()
    } catch (e: any) {
      throw new Error(e)
    }
  }

}

export default new RoomService()

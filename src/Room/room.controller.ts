import { Response, NextFunction } from "express"
import roomService from "./room.service"
class RoomController {

  async getRoom(req: any, res: Response, next: NextFunction) {
    try {

      const rooms = await roomService.find(req.body)

      return res.status(200).json({
        success: true,
        data: rooms
      })
    } catch (e: any) {
      next(e.message)
    }
  }

  async createRoom(req: any, res: Response, next: NextFunction) {
    try {

      await roomService.create(req.body)

      return res.status(200).json({
        success: true,
      })
    } catch (e: any) {
      next(e.message)
    }
  }

}

export default new RoomController()

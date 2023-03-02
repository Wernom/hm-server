import bcrypt from "bcrypt"

export class Password {
  static async toHash(password: string) {

    const hash = await bcrypt.hash(password, 8)

    return hash
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return bcrypt.compare(suppliedPassword, storedPassword)
  }
}

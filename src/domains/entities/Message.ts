import { User } from "./User";


export class Message {
  constructor(
    public id: string,
    public senderId: string,
    public receiverId: string,
    public createdAt?: Date,
    public sender?: User,
    public receiver?: User
  ) {}
}
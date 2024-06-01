import { Message } from "./Message";

export class User {
  constructor(public email: string, public password: string, public name?: string, public id?: string, messagesSent?: Message[], messagesReceived?: Message[] ) {}
}

import { User } from "src/user/user.entity"
import { DeepPartial } from "typeorm"

export type CreateUserParams = {
    email: string,
    firstname: string,
    lastname: string,
    password: string
}

export type CreateEventParams = {
    title: string,
    decription: string,
    startDateTime: string,
    endDateTime: string,
    color: string,
    icon: string,
    importance: number,
    userId: DeepPartial<User>,
    recurrence: Record<string,any>
}
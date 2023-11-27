import { DeepPartial } from "typeorm";
import { User } from "src/user/user.entity";

export class CreateEventDto {
    title: string;
    decription: string;
    startDateTime: string;
    endDateTime: string;
    color: string;
    icon: string;
    importance: number;
    userId: DeepPartial<User>;
    recurrence: Record<string, any>;

}

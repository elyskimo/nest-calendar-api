import { User } from "../user/user.entity";

declare namespace Express {
    export interface Request {
      user?: User;
    }
  }
  
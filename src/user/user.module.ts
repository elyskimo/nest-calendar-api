import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { User } from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
    ],
    controllers: [UserController],
    providers: [
        UserService,
        //...userProviders,
        // User
    ]
})
export class UserModule {}

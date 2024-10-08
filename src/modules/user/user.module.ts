import { Module } from '@nestjs/common';
import { UserController } from './user.contoller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entity/user.entity';
import { AuthService } from '../auth/auth.service';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [UserController],
    providers: [UserService, AuthService],
    exports: [MongooseModule]
})

export class UserModule {}
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config'; 

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [AuthService]
})

export class AuthModule {}
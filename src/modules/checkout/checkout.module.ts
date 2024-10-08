import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.contoller';
import { CheckoutService } from './checkout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Checkout, CheckoutSchema } from './entity/checkout.entity';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Checkout.name, schema: CheckoutSchema }])
    ],
    controllers: [CheckoutController],
    providers: [CheckoutService],
    exports: [MongooseModule]
})

export class CheckoutModule {}
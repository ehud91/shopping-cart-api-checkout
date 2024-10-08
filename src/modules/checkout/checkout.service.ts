import { Injectable, Inject, InternalServerErrorException  } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Checkout } from './entity/checkout.entity';


@Injectable()
export class CheckoutService {

    constructor(@InjectModel(Checkout.name) private checkoutModel: Model<Checkout>) {}

    
    async checkout(fullname: string, address: string, email:string, checkoutProducts: object) : Promise<Document | Checkout | InternalServerErrorException> {
        /* Not yet Implemented completlly */

        try {
            let createResult: Document | Checkout = await this.checkoutModel.create({ fullname, address, email, checkoutProducts });
            createResult.save();
            return createResult;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
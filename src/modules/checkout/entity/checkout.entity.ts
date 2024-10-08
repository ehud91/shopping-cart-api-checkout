import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuid } from "uuid";
import { Type } from "class-transformer";

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})

export class Checkout extends Document {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  email: string;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
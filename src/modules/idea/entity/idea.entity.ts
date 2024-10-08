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

export class Idea extends Document {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  @Prop({ required: true })
  ideaId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
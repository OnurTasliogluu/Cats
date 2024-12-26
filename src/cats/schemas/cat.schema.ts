import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: [String], required: true })
  food: string[];

  @Prop({ type: [String], required: true })
  chronicHealthIssues: string[];

  @Prop({ required: false })
  age?: number;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
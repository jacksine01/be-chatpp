import { Schema } from 'mongoose';
export class IBook {
  title: string;
  description: string;
  author: string;
  price: number;
}

export const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

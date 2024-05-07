import { Schema } from 'mongoose';
export const RandomNumberSchema = new Schema<IRandomNumberLedger>(
  {
    randomNumber: {
      type: Number,
    },
    hash: {
      type: String,
    },
  },
  { timestamps: true },
);
export class IRandomNumberLedger {
  randomNumber: Number;
  hash: String;
}

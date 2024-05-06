import { Schema } from 'mongoose';
export const RandomNumberSchema = new Schema<IRandomNumberLedger>(
  {
    randomNumber: {
      type: Number,
    },
  },
  { timestamps: true },
);
export class IRandomNumberLedger {
  randomNumber: Number;
}

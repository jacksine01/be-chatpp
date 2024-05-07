import { Schema } from 'mongoose';
export const GameControlSchema = new Schema<IGameControlLedger>(
  {
    betAmount: {
      type: String,
    },
    payoutNumber: {
      type: String,
    },
  },
  { timestamps: true },
);
export class IGameControlLedger {
  betAmount: String;
  payoutNumber: String;
}

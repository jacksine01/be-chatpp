import { Schema } from 'mongoose';
export const ChatSchema = new Schema<IChatLedger>(
  {
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export class IChatLedger {
  message: string;
}

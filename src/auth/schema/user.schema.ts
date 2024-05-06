import { Schema, Types } from 'mongoose';
export class IUser {
  name: string;
  email: string;
  password: string;
}

export const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
  },
  { timestamps: true },
);

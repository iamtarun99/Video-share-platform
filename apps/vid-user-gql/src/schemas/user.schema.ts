import * as mongoose from 'mongoose';
import { User } from '../dtos/vid-user.dto'; // Import the UserDTO

export const UserSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    userId: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
  });
  
export const UserModel = mongoose.model<User>('User', UserSchema);
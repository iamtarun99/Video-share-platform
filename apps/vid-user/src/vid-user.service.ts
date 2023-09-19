import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dtos/vid-user.dto';
@Injectable()
export class VidUserService {
  
  constructor(@InjectModel('User') private readonly userModel: Model<User>){}
  
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Method to fetch user data from database
   * @param currentuser Object containing user's id
   * @returns Logged in User's profile
   */
  async getProfile(currentuser): Promise<User> {
    const fetchedData = await this.userModel.findOne({userId: currentuser.userId}).exec() || null;
    const userProfile = {
      userId: fetchedData?.userId,
      firstName: fetchedData?.firstName,
      lastName: fetchedData?.lastName,
      email: fetchedData?.email
    }
    return userProfile;
  }

  /**
   * Method to fetch user's data from database and validate his credentials
   * @param param0 credentials - email, pwd
   * @returns user's data after validation
   */
  async validateUser({email, password}): Promise<Partial<User>> {
    const user = await this.userModel.findOne({email: email}).exec() || null;
    if (user && user.password === password) {
      const result = {
        userId: user?.userId,
        email: user?.email
      };
      return result;
    }
    return null;
  }
}
 
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
}
 
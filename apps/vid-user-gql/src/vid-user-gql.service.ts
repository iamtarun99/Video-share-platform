import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './dtos/vid-user.dto';

@Injectable()
export class VidUserGqlService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>){}

  async executeGraphQLQuery(query: string): Promise<User[]> {
    console.log('executeGraphQLQuery',query);
    return this.findAll();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async findById(userId: string): Promise<User> {
    const fetchedData = await this.userModel.findOne({userId: userId}).exec() || null;
    const userProfile = {
      userId: fetchedData?.userId,
      firstName: fetchedData?.firstName,
      lastName: fetchedData?.lastName,
      email: fetchedData?.email
    }
    return userProfile;
  }
  async findAll(): Promise<User[]> {
    const fetchedData = await this.userModel.find().exec() || [];
    const userProfile = fetchedData?.map(item => ({
      userId: item?.userId,
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email
    }));
    return userProfile;
  }
}


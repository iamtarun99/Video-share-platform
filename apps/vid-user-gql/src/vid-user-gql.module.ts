import { Module } from '@nestjs/common';
import { VidUserGqlResolver } from './vid-user-gql.resolver';
import { VidUserGqlService } from './vid-user-gql.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bxwcgdk.mongodb.net/video-share?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema, collection: 'users' }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // Use the 'forRoot' method with 'typeDefs' to specify your schema file
      typePaths: ['**/*.graphql'], // Adjust the path as needed
      definitions: {
        path: join(process.cwd(), 'src/dtos/graphql.ts'),
      },
      driver: ApolloDriver,
      playground: true
    }),
  ],
  controllers: [],
  providers: [VidUserGqlResolver, VidUserGqlService, UserModel],
})
export class VidUserGqlModule {}
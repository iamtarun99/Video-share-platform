import * as mongoose from 'mongoose';
import { Video } from '../dtos/video-browse.dto'; // Import the VideoDTO

export const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: false }
  });
  
export const VideoModel = mongoose.model<Video>('Video', VideoSchema);
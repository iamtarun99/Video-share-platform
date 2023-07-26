export interface Video {
    id: number;
    title: string;
    description: string;
    tags: string[];
    thumbnailUrl: string;
    videoUrl?: string;
  }
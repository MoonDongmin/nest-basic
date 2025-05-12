import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
export interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
}
export declare class PostsService {
    private readonly postsRepository;
    constructor(postsRepository: Repository<PostsModel>);
    getAllPosts(): Promise<PostsModel[]>;
    getPostById(id: number): Promise<PostsModel>;
    createPost(authorId: number, title: string, content: string): Promise<PostsModel>;
    updatePost(postId: number, title: string, content: string): Promise<PostsModel>;
    deletePost(postId: number): Promise<number>;
}

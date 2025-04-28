import { PostsService } from './posts.service';
interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
}
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(): PostModel[];
    getPost(id: string): PostModel;
    postPosts(author: string, title: string, content: string): PostModel;
    patchPost(id: string, author?: string, title?: string, content?: string): PostModel;
    deletePost(id: string): string;
}
export {};

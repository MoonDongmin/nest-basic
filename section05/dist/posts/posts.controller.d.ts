import { PostsService } from './posts.service';
interface Post {
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
}
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPost(): Post;
}
export {};

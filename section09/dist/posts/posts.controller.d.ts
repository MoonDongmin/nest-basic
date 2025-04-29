import { PostModel, PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(): PostModel[];
    getPost(id: string): PostModel;
    postPosts(author: string, title: string, content: string): PostModel;
    patchPost(id: string, author?: string, title?: string, content?: string): PostModel;
    deletePost(id: string): number;
}

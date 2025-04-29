import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(): Promise<import("./entities/posts.entity").PostsModel[]>;
    getPost(id: string): Promise<import("./entities/posts.entity").PostsModel>;
    postPosts(author: string, title: string, content: string): Promise<import("./entities/posts.entity").PostsModel>;
    patchPost(id: string, author?: string, title?: string, content?: string): Promise<import("./entities/posts.entity").PostsModel>;
    deletePost(id: string): Promise<number>;
}

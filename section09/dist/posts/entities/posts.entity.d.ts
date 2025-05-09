import { UsersModel } from '../../users/entities/users.entity';
export declare class PostsModel {
    id: number;
    author: UsersModel;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
}

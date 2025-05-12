import { RolesEnum } from '../const/roles.const';
import { PostsModel } from '../../posts/entities/posts.entity';
export declare class UsersModel {
    id: number;
    nickname: string;
    email: string;
    password: string;
    role: RolesEnum;
    posts: PostsModel[];
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const posts_entity_1 = require("./entities/posts.entity");
const typeorm_2 = require("@nestjs/typeorm");
let posts = [
    {
        id: 1,
        author: 'newjeans_official',
        title: '뉴진스 민지',
        content: '메이크업 고치고 있는 민지',
        likeCount: 100000,
        commentCount: 99999,
    },
    {
        id: 2,
        author: 'newjeans_official',
        title: '뉴진스 해린',
        content: '노래 연습하고 있는 민지',
        likeCount: 100000,
        commentCount: 99999,
    },
    {
        id: 3,
        author: 'blackpink_official',
        title: '블랙핑크 로제',
        content: '공연하고 있는 로제',
        likeCount: 100000,
        commentCount: 99999,
    },
];
let PostsService = class PostsService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    async getAllPosts() {
        return this.postsRepository.find();
    }
    async getPostById(id) {
        const post = await this.postsRepository.findOne({
            where: {
                id,
            },
        });
        if (!post) {
            throw new common_1.NotFoundException();
        }
        return post;
    }
    async createPost(authorId, title, content) {
        const post = this.postsRepository.create({
            author: {
                id: authorId,
            },
            title,
            content,
            likeCount: 0,
            commentCount: 0,
        });
        const newPost = await this.postsRepository.save(post);
        return newPost;
    }
    async updatePost(postId, title, content) {
        const post = await this.postsRepository.findOne({
            where: { id: postId },
        });
        if (!post) {
            throw new common_1.NotFoundException();
        }
        if (title) {
            post.title = title;
        }
        if (content) {
            post.content = content;
        }
        const newPost = await this.postsRepository.save(post);
        return newPost;
    }
    async deletePost(postId) {
        const post = await this.postsRepository.findOne({
            where: {
                id: postId,
            },
        });
        if (!post) {
            throw new common_1.NotFoundException();
        }
        await this.postsRepository.delete(postId);
        return postId;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(posts_entity_1.PostsModel)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map
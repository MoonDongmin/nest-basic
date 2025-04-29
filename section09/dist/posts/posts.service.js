"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
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
    getAllPosts() {
        return posts;
    }
    getPostById(id) {
        const post = posts.find((post) => post.id === +id);
        if (!post) {
            throw new common_1.NotFoundException();
        }
        return post;
    }
    createPost(author, title, content) {
        const post = {
            id: posts[posts.length - 1].id + 1,
            author,
            title,
            content,
            likeCount: 0,
            commentCount: 0,
        };
        posts = [...posts, post];
        return post;
    }
    updatePost(postId, author, title, content) {
        const post = posts.find((post) => post.id === postId);
        if (!post) {
            throw new common_1.NotFoundException();
        }
        if (author) {
            post.author = author;
        }
        if (title) {
            post.title = title;
        }
        if (content) {
            post.content = content;
        }
        posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));
        return post;
    }
    deletePost(postId) {
        posts = posts.filter((post) => post.id !== postId);
        return postId;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
//# sourceMappingURL=posts.service.js.map
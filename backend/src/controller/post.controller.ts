// import { PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";
// import prisma from "../utils/database";


// class PostController {
//     static createPost = async (req: Request, res: Response) => {
//         const { title, content } = req.body;
//         const authorId = res.locals.userId;
//         const post = await prisma.post.create({
//             data: {
//                 title,
//                 content,
//                 authorId,
//             },
//         });
//         res.status(201).json(post);
//     }

//     static getPosts = async (req: Request, res: Response) => {
//         const posts = await prisma.post.findMany();
//         res.status(200).json(posts);
//     }

//     static getPost = async (req: Request, res: Response) => {
//         const { id } = req.params;
//         const posts = await prisma.post.findUnique({
//             where: {
//                 id: Number(id)
//             }
//         });
//         res.status(200).json(posts);
//     }

//     static updatePost = async (req: Request, res: Response) => {
//         const { id } = req.params;
//         const { title, content, published } = req.body
//         const posts = await prisma.post.update({
//             where: {
//                 id: Number(id)
//             },
//             data: {
//                 title, content, published
//             }
//         })
//         res.status(200).json(posts);
//     }


//     static deletePost = async (req: Request, res: Response) => {
//         const { id } = req.params;
//         const userId  = res.locals.userId;

        
//         const post = await prisma.post.findUnique({
//             where: {
//                 id: Number(id),
//             },
//         });
        

//         if (post?.authorId !== userId) {
//             return res.status(401).json({
//                 error: "You don't have permission",
//             });
//         }
        
//         const deletedPost = await prisma.post.delete({
//             where: {
//                 id: Number(id),
//             },
//         });
        
//         res.status(200).json({
//             msg: "Post deleted!",
//         });
        
//     }

// }

// export default PostController
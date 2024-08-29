import { Request, Response } from "express";
import prisma from "../utils/database";
import { Prisma } from "@prisma/client";

class GymController {

    static createGym = async (req: Request, res: Response) => {
        const { name, address } = req.body;

        try {
            const gym = await prisma.gym.create({
                data: {
                    name,
                    address
                }
            })
            res.status(201).json({ data: gym });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(400).json({ error: error.message });
            }
        }

    }



    static getAllGym = async (req: Request, res: Response) => {

        try {
            const gym = await prisma.gym.findMany({
                include: {
                    users: {
                        select: {
                            id: true,
                            name:true,
                            email: true,
                            role: true,
                            
                        }
                    },
                    membershipPlans: true,
                   
                }
            });
            res.status(201).json({ data: gym });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(400).json({ error: error.message });
            }
        }

    }
    static getGym = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const gym = await prisma.gym.findUnique({
                where: {
                    id: Number(id)
                }
            })
            res.status(201).json({ data: gym });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(400).json({ error: error.message });
            }
        }
    }


    static addMemberToGym = async (req: Request, res: Response) => {

        try {
            const { gymId } = req.body;
            const userId = res.locals.userId
        

            // Validate input
            if (!gymId || !userId) {
                return res.status(400).json({ error: "Gym ID and User ID are required." });
            }

            // Find the user and update their gym association
            const updatedUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    gym: {
                        connect: { id: gymId },
                    },
                },
            });

            // Respond with the updated user
            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error adding member to gym:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }


    }

}

export default GymController;
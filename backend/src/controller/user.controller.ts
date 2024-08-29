import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/database';

const JWT_SECRET = process.env.JWT_SECRET || ''; // Replace with your actual secret

class UserController {
    static createUser = async (req: Request, res: Response) => {
        const { email, name, password, gymId } = req.body;
        try {

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    gym: {
                        connect: { id: gymId }  // assuming you have gymId available
                    },
                    role: 'MEMBER'  // or another role based on your application logic
                },
            });

            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ user, token });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(400).json({ error: "A user with this email already exists." });
            } else {
                res.status(500).json({ error: error });
            }
        }

    }

    
}

export default UserController;
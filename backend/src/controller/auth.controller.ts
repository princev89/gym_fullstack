import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import prisma from '../utils/database';

const JWT_SECRET = process.env.JWT_SECRET || ''; // Replace with your actual secret

class AuthController {

  
    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({ error: "Invalid email or password." });
            }

            // Check if the password is correct
            const isPasswordValid = bcrypt.compare(password, user?.password || '');
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid email or password." });
            }

            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

            // Return the token and user info
            res.status(200).json({ user: { id: user.id, email: user.email, name: user.name }, token });

        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                res.status(500).json({ error: error.message || "An error occurred while logging in." });
            }
        }
    }


    static getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany()
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                res.status(500).json({ error: error.message || "An error occurred while retrieving users." });
            }
        }
    }
}

export default AuthController
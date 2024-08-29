import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/database';



export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ error: "No Token Provided" });
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.userId },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        
        res.locals.userId = decodedToken.userId;
        

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Invalid or Expired Token" });
        }
        res.status(500).json({ error: "An error occurred during token verification." });
    }
};

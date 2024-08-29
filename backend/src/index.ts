import express from 'express';
import prisma from './utils/database';
import cors from 'cors'
const app = express();

app.use(express.json());

import AuthRouter from './routes/auth.route';
import PostRouter from './routes/post.route';
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
}));
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/post', PostRouter);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Explicitly connect to the database
        await prisma.$connect();
        console.log('Connected to the database');

        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        );
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process with failure
    }
}

// Gracefully shut down Prisma when the process exits
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

startServer();

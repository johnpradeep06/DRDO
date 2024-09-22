const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); 

dotenv.config();

const prisma = new PrismaClient();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const loginUser = async (email, password, role, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.role !== role) {
            return res.status(401).json({ error: `${role} not found or invalid role` });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        console.log(`Successful login for ${role}!`);
        res.status(200).json({ message: 'Sign in successful', user: { email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

app.post('/api/recruiter/', async (req, res) => {
    const { email, password } = req.body;
    loginUser(email, password, 'RECRUITER', res);
});

app.post('/api/candidate/', async (req, res) => {
    const { email, password } = req.body;
    loginUser(email, password, 'CANDIDATE', res);
});

app.post('/api/register', async (req, res) => {
    const { fullName, email, phoneNumber, password, role } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                fullName,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
            },
        });

        console.log(newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                fullName: true,
                role: true,
            },
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

const startServer = async () => {
    try {
        await prisma.$connect();
        const mongoUrl = process.env.DATABASE_URL;
        const dbHost = new URL(mongoUrl).host;
        console.log(`Connected to MongoDB at host: ${dbHost}`);
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

startServer();

const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
});

app.post('/api/recruiter/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const recruiter = await prisma.user.findUnique({
            where: { email },
        });

        if (!recruiter || recruiter.role !== 'RECRUITER') {
            return res.status(401).json({ error: 'Recruiter not found or invalid role' });
        }

        if (recruiter.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        console.log("Successful da!!");
        res.status(200).json({ message: 'Sign in successful', recruiter: { email: recruiter.email, role: recruiter.role } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
app.post('/api/register', async (req, res) => {
    console.log("Hi");
    const { fullName, email, phoneNumber, password, role } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = await prisma.user.create({
            data: {
                fullName,
                email,
                phoneNumber,
                password,
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

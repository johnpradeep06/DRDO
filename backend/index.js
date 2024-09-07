import express from 'express';
import prisma from './prisma/prismaClient.js'; 
import { checkDB } from './prisma/checkDB.js';

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
    const { fullName, email, phoneNumber, password, role } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                fullName,
                email,
                phoneNumber,
                password,
                role,
            },
        });
        
        res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "User registration failed." });
    }
});

app.get("/", (req, res) => {
    console.log("Jo");
});

const PORT = process.env.PORT || 5252;

app.listen(PORT, async () => {
  console.log(`Backend running at server: ${PORT}`);
  await checkDB();
});
import express from 'express';
import cors from 'cors';
import prisma from './prisma/prismaClient.js'; 
import { checkDB } from './prisma/checkDB.js'; 

const app = express();
const PORT = process.env.PORT || 5353; 

app.use(cors({origin: '*'}));
app.use(express.json());

app.post('/register', async (req, res) => {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({ error: "All fields are required." });
    }

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
        
        console.log("User registered:", newUser);

        return res.status(201).json({ message: "User registered successfully!", user: newUser });

    } catch (error) {
        console.error("Error registering user:", error);

        if (error.code === 'P2002') {
            return res.status(409).json({ error: "Email already exists." });
        }

        return res.status(500).json({ error: "User registration failed." });
    }
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Registration API" });
});

app.listen(PORT, async () => {
    console.log(`Backend running on server: ${PORT}`);
    await checkDB();
});

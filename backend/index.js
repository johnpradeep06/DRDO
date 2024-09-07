import express from 'express';
import cors from 'cors';
import prisma from './prisma/prismaClient.js'; 
import { checkDB } from './prisma/checkDB.js'; 

const app = express();
const PORT = process.env.PORT || 5353; 

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/register', async (req, res) => {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newUser = await prisma.user.create({
            data: { fullName, email, phoneNumber, password, role },
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

const loginUser = async (req, res, role) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password || user.role !== role) {
            return res.status(401).json({ success: false, message: "Invalid credentials or unauthorized access" });
        }

        return res.status(200).json({ success: true, message: "Login successful", user });
    } catch (error) {
        console.error(`Error during ${role.toLowerCase()} login:`, error);
        return res.status(500).json({ success: false, message: "Login failed" });
    }
};

app.post('/admin', (req, res) => loginUser(req, res, 'ADMIN'));
app.post('/scientist', (req, res) => loginUser(req, res, 'SCIENTIST'));
app.post('/candidate', (req, res) => loginUser(req, res, 'CANDIDATE'));

app.post('/register-details', async (req, res) => {
    const {
        highestDegree, institution, graduationYear, major, jobTitle, company, yearsOfExperience,
        skills, researchTitle, researchField, researchSummary, areasOfExpertise,
        interviewMode, availabilityDate, linkedInURL, userId
    } = req.body;

    console.log("Incoming request:", req.body);

    if (!highestDegree || !institution || !graduationYear || !major || !interviewMode || !availabilityDate || !userId) {
        return res.status(400).json({ error: "All required fields must be provided." });
    }

    try {
        const candidateDetails = await prisma.candidateDetails.create({
            data: {
                highestDegree, institution, graduationYear, major, jobTitle, company, 
                yearsOfExperience, skills, researchTitle, researchField, researchSummary, 
                areasOfExpertise, interviewMode, availabilityDate: new Date(availabilityDate), 
                linkedInURL, userId
            }
        });

        console.log("Candidate details registered:", candidateDetails);
        return res.status(201).json({ message: "Candidate details registered successfully!", candidateDetails });
    } catch (error) {
        console.error("Error registering candidate details:", error);
        return res.status(500).json({ error: "Failed to register candidate details." });
    }
});


app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Role-Based Login API" });
});

app.listen(PORT, async () => {
    console.log(`Backend running on server: ${PORT}`);
    await checkDB();
});

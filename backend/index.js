const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

dotenv.config();

const prisma = new PrismaClient();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' }); 
        }

        req.user = decoded;
        next();  
    });
};

const verifyRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    next();  
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

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }     
        );
        console.log(user.fullName);
        console.log(token);
        res.status(200).json({ 
            message: 'Sign in successful', 
            token, 
            user: { email: user.email, role: user.role, fullName: user.fullName} 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

app.get('/api/user', verifyToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { fullName: true },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log("RETURNING THE NAME");
        res.status(200).json({ name: user.fullName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/recruiter', async (req, res) => {
    const { email, password } = req.body;
    loginUser(email, password, 'RECRUITER', res);
});

app.post('/api/candidate', async (req, res) => {
    const { email, password } = req.body;
    loginUser(email, password, 'CANDIDATE', res);
});

app.post('/api/job-posting', async (req, res) => {
    try {
      const {
        recruiterName,
        jobTitle,
        jobDescription,
        employmentType,
        requiredSkills,
        requiredExperience,
        educationalLevel,
        contactInfo,
        location,
        companyName,
        salary
      } = req.body;
      
      const newJob = await prisma.job.create({
        data: {
          recruiterName,
          jobTitle,
          jobDescription,
          employmentType,
          requiredSkills,
          requiredExperience,
          educationalLevel,
          contactInfo,
          location,
          companyName,
          salary
        }
      });
      console.log(newJob);
      res.status(201).json(newJob);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating job posting' });
    }
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

app.get('/api/recruiter/dashboard', verifyToken, verifyRole('RECRUITER'), (req, res) => {
    res.status(200).json({ message: 'Welcome to the recruiter dashboard' });
});

app.get('/api/candidate/dashboard', verifyToken, verifyRole('CANDIDATE'), (req, res) => {
    res.status(200).json({ message: 'Welcome to the candidate dashboard' });
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

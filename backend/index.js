const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const winston = require('winston');

dotenv.config();

const prisma = new PrismaClient();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        logger.warn('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.warn('Invalid or expired token');
            return res.status(403).json({ error: 'Invalid or expired token' }); 
        }

        req.user = decoded;
        next();  
    });
};

const verifyRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        logger.warn('Access denied. Insufficient permissions.')
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
            logger.warn(`${role} not found or invalid role for email: ${email}`);
            return res.status(401).json({ error: `${role} not found or invalid role` });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn('Invalid password attempt for email: ' + email);
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }     
        );
        // console.log(user.fullName);
        // console.log(token);
        logger.info('User signed in successfully: ' + user.fullName);
        res.status(200).json({ 
            message: 'Sign in successful', 
            token, 
            user: { email: user.email, role: user.role, fullName: user.fullName} 
        });
    } catch (error) {
        logger.error('Error during user login: ' + error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

app.get('/api/jobposts', async (req, res) => {
    try {
      const jobPosts = await prisma.job.findMany(); 
      res.status(200).json(jobPosts); 
    } catch (error) {
      logger.error('Error fetching job posts: ' + error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.get('/api/user', verifyToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: { fullName: true },
        });
        if (!user) {
            logger.warn('User not found for ID: ' + req.user.userId);
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ name: user.fullName });
    } catch (error) {
        logger.error('Error fetching user info: ' + error.message);
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
        logger.info('New job created: ' + newJob.jobTitle);
        res.status(201).json(newJob);
    } catch (error) {
        logger.error('Error creating job posting: ' + error.message);
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
            logger.warn('User already exists: ' + email);
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
        logger.info('User registered successfully: ' + newUser.fullName)
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        logger.error('Error during user registration: ' + error.message);
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
        logger.error('Failed to fetch users: ' + error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/api/recruiter/dashboard', verifyToken, verifyRole('RECRUITER'), (req, res) => {
    res.status(200).json({ message: 'Welcome to the recruiter dashboard' });
});

app.get('/api/candidate/dashboard', verifyToken, verifyRole('CANDIDATE'), (req, res) => {
    res.status(200).json({ message: 'Welcome to the candidate dashboard' });
});

// Recruiter: Get jobs posted by them
app.get('/api/recruiter/jobs', verifyToken, verifyRole('RECRUITER'), async (req, res) => {
  try {
      const jobs = await prisma.job.findMany({
          where: { recruiterId: req.user.id },
      });
      res.json(jobs);
  } catch (error) {
      logger.error('Error fetching recruiter jobs:', error);
      res.status(500).json({ error: 'Error fetching jobs' });
  }
});

// Recruiter: Delete a job
app.delete('/api/recruiter/jobs/:id', verifyToken, verifyRole('RECRUITER'), async (req, res) => {
  const jobId = req.params.id;

  try {
      const job = await prisma.job.findUnique({
          where: { id: jobId }
      });

      if (job.recruiterId !== req.user.id) {
          return res.status(403).json({ error: 'You can only delete your own jobs' });
      }

      await prisma.job.delete({
          where: { id: jobId }
      });

      res.json({ message: 'Job deleted successfully' });
  } catch (error) {
      logger.error('Error deleting job:', error);
      res.status(500).json({ error: 'Error deleting job' });
  }
});

// Candidate: Get available jobs excluding applied ones
app.get('/api/candidate/jobs', verifyToken, verifyRole('CANDIDATE'), async (req, res) => {
  try {
      const appliedJobs = await prisma.application.findMany({
          where: { candidateId: req.user.id },
          select: { jobId: true }
      });

      const appliedJobIds = appliedJobs.map(app => app.jobId);

      const jobs = await prisma.job.findMany({
          where: {
              id: { notIn: appliedJobIds }
          }
      });

      res.json(jobs);
  } catch (error) {
      logger.error('Error fetching available jobs:', error);
      res.status(500).json({ error: 'Error fetching jobs' });
  }
});

// Candidate: Apply for a job
app.post('/api/candidate/jobs/:id/apply', verifyToken, verifyRole('CANDIDATE'), async (req, res) => {
  const jobId = req.params.id;

  try {
      // Check if already applied
      const existingApplication = await prisma.application.findUnique({
          where: {
              candidateId_jobId: { candidateId: req.user.id, jobId }
          }
      });

      if (existingApplication) {
          return res.status(400).json({ error: 'You have already applied for this job' });
      }

      // Apply for the job
      await prisma.application.create({
          data: {
              candidateId: req.user.id,
              jobId
          }
      });

      res.json({ message: 'Successfully applied for the job' });
  } catch (error) {
      logger.error('Error applying for job:', error);
      res.status(500).json({ error: 'Error applying for job' });
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
            logger.info(`Server started on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to connect to MongoDB: ' + error.message);
    }
};

startServer();
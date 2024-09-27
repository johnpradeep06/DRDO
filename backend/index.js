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

//winston logger
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

//hashing
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

//jwt
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

//verifying role
const verifyRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        logger.warn('Access denied. Insufficient permissions.')
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    next();  
};

//login 
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
        console.log(token);
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

//registering role
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

//recruiter login
app.post('/api/recruiter-login', async (req, res) => {
    const { email, password } = req.body;
    loginUser(email, password, 'RECRUITER', res);
});

//candidate login
app.post('/api/candidate-login', async (req, res) => {
    const { email, password } = req.body;
    loginUser(email, password, 'CANDIDATE', res);
});

//for jwt authentication
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


//posting job posts
app.post('/api/recruiter/post-jobposts', verifyToken, verifyRole('RECRUITER'), async (req, res) => {
    try {
      const recruiterId = req.user.userId;
      console.log(recruiterId); // Get recruiter ID from JWT token
      const {
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
          recruiterId,
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
      logger.info('New job created: ' + newJob.jobTitle);
      res.status(201).json(newJob);
    } catch (error) {
      logger.error('Error creating job posting: ' + error.message);
      res.status(500).json({ message: 'Error creating job posting' });
    }
});

//fetching jobs for the recruiter
app.get('/api/get-jobposts', async (req, res) => {
    try {
      const jobPosts = await prisma.job.findMany();
      res.status(200).json(jobPosts); 
    } catch (error) {
      logger.error('Error fetching job posts: ' + error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
//fetching all the users
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                fullName: true,
                role: true,
            },
        });
        logger.info(users);
        res.status(200).json(users);
    } catch (error) {
        logger.error('Failed to fetch users: ' + error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

//recruiter dashboard
app.get('/api/recruiter/dashboard', verifyToken, verifyRole('RECRUITER'), (req, res) => {
    res.status(200).json({ message: 'Welcome to the recruiter dashboard' });
});

//candidate dashboard
app.get('/api/candidate/dashboard', verifyToken, verifyRole('CANDIDATE'), (req, res) => {
    res.status(200).json({ message: 'Welcome to the candidate dashboard' });
});

// View job posts to the recruiter
app.get('/api/recruiter/get-jobposts', verifyToken, verifyRole('RECRUITER'), async (req, res) => {
    try {
      const recruiterId = req.user.userId; // Get recruiter ID from JWT token
      const jobPosts = await prisma.job.findMany({
        where: { recruiterId },
      });
      res.status(200).json(jobPosts);
    } catch (error) {
      logger.error('Error fetching job posts for recruiter: ' + error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
// Delete a job post by ID (requires recruiter verification)
app.delete('/api/recruiter/delete-jobpost/:id', verifyToken, verifyRole('RECRUITER'), async (req, res) => {
  const jobId = req.params.id;
  try {
    const deletedJob = await prisma.job.delete({
      where: { id: jobId },
    });
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job post not found' });
    }
    logger.info('Job post deleted successfully: ' + deletedJob.jobTitle);
    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (error) {
    logger.error('Error deleting job post: ' + error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
// View list of applicants for a job post (requires recruiter verification)
app.get('/api/recruiter/view-applied/:jobId', verifyToken, verifyRole('RECRUITER'), async (req, res) => {
    const jobId = req.params.jobId;
    const recruiterId = req.user.userId; // Get recruiter ID from JWT token
    try {
      // First, verify that the job belongs to this recruiter
      const job = await prisma.job.findFirst({
        where: { id: jobId, recruiterId: recruiterId },
      });
      
      if (!job) {
        return res.status(403).json({ error: 'You do not have permission to view applications for this job' });
      }
      
      const applications = await prisma.application.findMany({
        where: { jobId },
        include: { candidate: true }, // Include applicant details
      });
      res.status(200).json(applications);
    } catch (error) {
      logger.error('Error fetching applicants for job post: ' + error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Update application status (requires recruiter verification)
app.patch('/api/recruiter/update-application/:applicationId', verifyToken, verifyRole('RECRUITER'), async (req, res) => {
  const applicationId = req.params.applicationId;
  const { status } = req.body; // Expected status in request body

  if (!status || !['PENDING', 'QUALIFIED_FOR_INTERVIEW', 'REJECTED', 'WAITING'].includes(status)) {
    return res.status(400).json({ error: 'Invalid application status' });
  }

  try {
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });
    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }
    logger.info('Application status updated successfully: ' + updatedApplication.id);
    res.status(200).json({ message: 'Application status updated successfully' });
  } catch (error) {
    logger.error('Error updating application status: ' + error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
// Candidate endpoints  
// Get all job posts
app.get('/api/candidate/get-jobposts', async (req, res) => {
  try {
    const jobPosts = await prisma.job.findMany();
    console.log(jobPosts);
    res.status(200).json(jobPosts); 
  } catch (error) {
    logger.error('Error fetching job posts: ' + error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
// View applied job posts
app.get('/api/candidate/view-applied', verifyToken, verifyRole('CANDIDATE'), async (req, res) => {
  try {
    const candidateId = req.user.userId; // Get candidate ID from JWT token
    const applications = await prisma.application.findMany({
      where: { candidateId },
      include: { job: true }, // Include job details
    });
    res.status(200).json(applications);
  } catch (error) {
    logger.error('Error fetching applied job posts for candidate: ' + error.message);
    res.status(500).json({ error: 'Internal Server Error' });
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
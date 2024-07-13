const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const axios = require('axios');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const session = require('express-session');
const nodemailer = require('nodemailer');


const crypto = require('crypto');
require('dotenv').config();

const sessionSecret = 'HAYDENBRODEY';
const JWTSecret = 'EPSTEINDKHS';



const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    console.log('Session data:', req.session);
    next();
});

///////////////////////////////////////////////////////////////////////////////////////////

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'awesomapp', //awesomapp
    password: '' //''
    
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + db.threadId);
});

/////////////////////////////////////////////////////////////////////////////////////////////


let temporaryResetToken; // Server-side variable to store the reset token temporarily

app.post('/forgot-password', (req, res) => {
    console.log('Received forgot password request for email:', req.body.email);
    const { email } = req.body;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour
    console.log(resetToken);
    console.log('Attempting to update user with email:', email);

    temporaryResetToken = resetToken; // Store the reset token temporarily

    db.query('UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?', [resetToken, expires, email], (err) => {
        if (err) {
            return res.status(500).send('Error saving token');
        }

        console.log('Token saved successfully for email:', email);

        res.status(200).send('An email has been sent with further instructions.');
    });
});

app.post('/reset-password', (req, res) => {
    const { password } = req.body;
    console.log(temporaryResetToken, password); // Use the temporarily stored reset token

    // Use the temporarily stored reset token to reset the password
    db.query('SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expires > ?', [temporaryResetToken, Date.now()], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('Password reset token is invalid or has expired.');
        }

        const user = results[0];

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).send('Error hashing password');
            }

            db.query('UPDATE users SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedPassword, user.id], (err) => {
                if (err) {
                    return res.status(500).send('Error updating password');
                }

                res.status(200).send('Password has been updated');

                temporaryResetToken = null; // Clear the temporary reset token variable
                console.log(temporaryResetToken);

            });
        });
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////

// API registers new user and adds info to mySQL
app.post('/register', async (req, res) => {
    const { userName, email, password, referrer, pin } = req.body;
    if (!userName || !email || !password || !referrer || !pin) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const referrerQuery = 'SELECT * FROM users WHERE username = ?';
        db.query(referrerQuery, [referrer], (refErr, refResult) => {
            if (refErr) {
                console.error('Error checking referrer:', refErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (refResult.length === 0) {
                return res.status(400).json({ error: 'Invalid referrer' });
            }
            const insertQuery = 'INSERT INTO users (username, email, password, referrer, pin) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [userName, email, hashedPassword, referrer, pin], (err, result) => {
                if (err) {
                    console.error('Error inserting user data:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                const updateQuery = 'UPDATE users SET team = IFNULL(team, 0) + 1 WHERE username = ?';
                db.query(updateQuery, [referrer], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.error('Error updating referrer team size:', updateErr);
                        return res.status(200).json({ message: 'Registration successful, but failed to update referrer team size' });
                    }
                    console.log('Referrer team size updated successfully');
                    res.status(200).json({ message: 'User registered successfully' });
                });
            });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

////////////////////////////////////////////////////////////////////////////

// Generate JWT login token using username and userId
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, JWTSecret, { expiresIn: '10y' });
    return token;
};

////////////////////////////////////////////////////////////////////////////////

// Login function, compares hashed passwords
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const user = results[0];
            try {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }

                const token = generateToken(user.id);
                console.log('Generated token:', token);

                req.session.userId = user.id;
                console.log('aliensman', req.session.userId);

                const userData = { id: user.id, username: user.username, email: user.email }; 
                res.json({ token, userData });
            } catch (error) {
                console.error('Error comparing passwords:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    );
});


// Use the custom middleware for all routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Authorization header:', authHeader); // Log the entire Authorization header
    console.log('Token:', token); // Log the extracted token
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWTSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        console.log('User ID extracted from token:', user.userId);

        req.userId = user.userId;
        req.token = token;
        next();
    });
};

// Endpoint to get user data dynamically based on user ID from token
app.get('/user', authenticateToken, async (req, res) => {
    const userId = req.userId; // Extracted user ID from token
    console.log('User ID at start of user call', userId);
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    
    db.query(query, async (error, results, fields) => {
        if (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const userData = results[0];

        try {
            // Fetch team size dynamically (if needed)
            const teamSize = await mining.fetchTeamSizeFromDatabase(userId); 
            let multiplier = 1; // Initialize multiplier with base rate of 1
            multiplier += teamSize * 0.2; // Add 0.2 for each team member
            multiplier = Math.min(multiplier, 4); // Cap the multiplier at 4

            multiplier = parseFloat(multiplier.toFixed(1));

            userData.multiplier = multiplier; // Add multiplier to user data
            const updateQuery = `UPDATE users SET multiplier = ${multiplier} WHERE id = ${userId}`;
            db.query(updateQuery, (updateError, updateResults, updateFields) => {
                if (updateError) {
                    console.error('Error updating multiplier in the database:', updateError);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                
                console.log('Multiplier updated in the database');

                console.log('Retrieved user data:', userData);
                res.status(200).json({ userData }); // Send user data along with multiplier back as response
            });
        } catch (error) {
            console.error('Error fetching team size:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

app.post('/updateBalance', (req, res) => {
    const { miningBalance, userId } = req.body;
    console.log('Session data at updateBalance:', req.session);
    console.log('Received mining balance update:', miningBalance);

    // Get the current timestamp
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Update the balance in the database using the extracted user ID
    const updateQuery = `UPDATE users SET balance = ${miningBalance}, balance_update_time = '${currentTimestamp}' WHERE id = ${userId}`;
    db.query(updateQuery, (updateError, updateResults) => {
        if (updateError) {
            console.error('Error updating user balance:', updateError);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('User balance updated successfully');
        res.status(200).json({ message: 'User balance updated successfully' });
    });
});

app.get('/totalUsers', (req, res) => {
    const query = `SELECT COUNT(*) AS totalUsers FROM users`;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching total users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const totalUsers = results[0].totalUsers;
        res.status(200).json({ totalUsers });
    });
});

////////////////////////////////////////////////////////////////////////////

class Mining {
    constructor() {
        this.baseRate = 1; // Base mining rate per hour
        this.miningStatusByUser = {}; // Mapping of user IDs to their mining state
        this.miningIntervalsByUser = {}; // Mapping of user IDs to their mining intervals

        // Bind class methods to the current instance
        this.startMining = this.startMining.bind(this);
        this.calculateMiningRate = this.calculateMiningRate.bind(this);
        this.calculateMiningBalance = this.calculateMiningBalance.bind(this);
        this.stopMining = this.stopMining.bind(this);
        this.fetchCurrentBalanceFromDatabase = this.fetchCurrentBalanceFromDatabase.bind(this);
        this.fetchTeamSizeFromDatabase = this.fetchTeamSizeFromDatabase.bind(this);
    }

    async calculateMiningRate(userId) {
        let rate = this.baseRate;
        console.log('Rate calculation for user:', userId, 'base rate:', rate);

        try {
            const teamSize = await this.fetchTeamSizeFromDatabase(userId); // Fetch team size dynamically
            rate += (teamSize * 0.2); // Increase by 0.2 for each team member
        } catch (error) {
            console.error('Error fetching team size:', error);
        }

        rate = Math.min(rate, 4); // Cap the rate at 4 per hour

        // Apply halving based on milestones
        const totalUsers = await this.fetchTotalUsers();
        if (totalUsers >= 100000) {
            rate /= 2;
        }
        if (totalUsers >= 1000000) {
            rate /= 2;
        }
        if (totalUsers >= 10000000) {
            rate /= 2;
        }
        if (totalUsers >= 100000000) {
            rate /= 2;
        }

        const query = `SELECT bonus FROM users WHERE id = ?`;

        db.query(query, [userId], async (error, results, fields) => {
            if (error) {
                console.error('Error fetching user bonus:', error);
                return;
            }
            if (results.length === 0) {
                console.error('User not found');
                return;
            }

            const bonus = results[0].bonus;
            rate *= bonus; // Multiply the rate by bonus

            this.miningStatusByUser[userId].miningRate = rate;
        });

        return rate;
    }

    calculateMiningBalance(userId, timePeriod) {
        // Calculate the total amount mined in the given time period
        const totalMined = this.miningStatusByUser[userId].miningRate * (timePeriod / 3600000); // Convert time period to hours
        return totalMined;
    }

    async startMining(userId) {
        if (!this.miningStatusByUser[userId] || !this.miningStatusByUser[userId].isMining) {
            this.miningStatusByUser[userId] = { isMining: true };

            try {
                await this.updateMiningStatusToActive(userId);
                console.log('Mining status updated successfully for user:', userId);

                await this.updateCurrentRate(userId, 1);
                console.log('Current rate updated successfully for user:', userId);

                await this.updateBaseRate(userId, 1);
                console.log('Base rate updated successfully for user:', userId);

                const teamSize = await this.fetchTeamSizeFromDatabase(userId); // Fetch team size dynamically
                const rate = await this.calculateMiningRate(userId); // Calculate mining rate

                this.miningStatusByUser[userId].miningRate = rate;

                this.miningStatusByUser[userId].miningStartTime = Date.now(); // Record the start time of the current mining epoch
                const currentBalance = await this.fetchCurrentBalanceFromDatabase(userId);
                this.miningStatusByUser[userId].totalMined = currentBalance; // Initialize totalMined with the current balance

                this.miningIntervalsByUser[userId] = setInterval(async () => {
                    const elapsedTime = Date.now() - this.miningStatusByUser[userId].miningStartTime;
                    if (elapsedTime >= 86400000) { // If 24 hours have elapsed
                        this.stopMining(userId);
                        return;
                    }
                    const miningAmount = this.calculateMiningBalance(userId, 30000); // Calculate balance every 30 seconds
                    this.miningStatusByUser[userId].totalMined += miningAmount;

                    const postData = {
                        miningBalance: this.miningStatusByUser[userId].totalMined,
                        userId: userId
                    };
                    const url = 'http://77.68.102.168:4000/updateBalance';  //  77.68.102.168
                    axios.post(url, postData, { withCredentials: true })
                        .then(response => {
                            console.log('Balance updated successfully for user:', userId, response.data);
                        })
                        .catch(error => {
                            console.error('Error updating balance for user:', userId, error);
                        });
                }, 30000); // Update mining balance every 30 seconds
            } catch (error) {
                console.error('Error starting mining for user:', userId, error);
                this.miningStatusByUser[userId].isMining = false;
            }
        }
    }

    stopMining(userId) {
        clearInterval(this.miningIntervalsByUser[userId]);
        this.miningStatusByUser[userId].isMining = false;
    }

    async fetchTeamSizeFromDatabase(userId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT team FROM users WHERE id = ?`;
            db.query(query, [userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0].team || 0); // Return team size, default to 0 if null
                    } else {
                        resolve(0); // Return 0 if no team size found for the user
                    }
                }
            });
        });
    }

    async fetchCurrentBalanceFromDatabase(userId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT balance FROM users WHERE id = ?`;
            db.query(query, [userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0].balance);
                    } else {
                        resolve(0); // Return 0 if no balance found for the user
                    }
                }
            });
        });
    }

    async updateMiningStatusToActive(userId) {
        return new Promise((resolve, reject) => {
            const updateQuery = `UPDATE users SET mining_status = 'active' WHERE id = ?`;
            db.query(updateQuery, [userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async updateCurrentRate(userId, currentRate) {
        return new Promise((resolve, reject) => {
            const updateQuery = `UPDATE users SET current_rate = ? WHERE id = ?`;
            db.query(updateQuery, [currentRate, userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async updateBaseRate(userId, baseRate) {
        return new Promise((resolve, reject) => {
            const updateQuery = `UPDATE users SET base_rate = ? WHERE id = ?`;
            db.query(updateQuery, [baseRate, userId], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async fetchTotalUsers() {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) AS totalUsers FROM users`;
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0].totalUsers);
                }
            });
        });
    }
}

const mining = new Mining();

app.get('/startMining', authenticateToken, (req, res) => {
    const userId = req.userId;
    mining.startMining(userId);
    res.send('Mining started successfully');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

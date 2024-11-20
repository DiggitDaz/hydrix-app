const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const axios = require('axios');
const fs = require('fs');
const https = require('https');
const path = require('path')
require('dotenv').config();

// HTTPS server setup
const app = express();

const sessionSecret = process.env.SESSION_SECRET;
const JWTSecret = process.env.JWT_SECRET;
const PORT = 4000;

app.use('/images', express.static(path.join(__dirname, 'images')));


// Paths to SSL certificate and key files
const certPaths = {
    privateKeyPath: process.env.PRIVATE_KEY_PATH,
    certificatePath: process.env.CERTIFICATE_PATH,
};

let privateKey, certificate;

try {
    privateKey = fs.readFileSync(certPaths.privateKeyPath, 'utf8');
} catch (err) {
    console.error('Error loading private key:', err);
}

try {
    certificate = fs.readFileSync(certPaths.certificatePath, 'utf8');
} catch (err) {
    console.error('Error loading certificate:', err);
}


// HTTPS options
const credentials = { key: privateKey, cert: certificate };

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Ensure cookies are only sent over HTTPS
}));

app.use((req, res, next) => {
    next();
});





// MySQL connection configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
});

// Define a route example
app.get('/', (req, res) => {
    
    res.send('Hello, HTTPS world!');
});

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    
});

// Error handling for server
httpsServer.on('error', (err) => {
    console.error('HTTPS server error:', err);
});

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});

const http = require('http'); // Make sure to include this if not already present

// Create an Express app for HTTP redirection
const httpApp = express();

// Redirect all HTTP requests to HTTPS
httpApp.use((req, res) => {
    const secureUrl = `https://${req.headers.host}${req.url}`;
    res.redirect(301, secureUrl); // Permanent redirect
});

const HTTP_PORT = 4000; // Port for HTTP
http.createServer(httpApp).listen(HTTP_PORT, () => {
    
});



/////////////////////////////////////////////////////////////////////////////////////////////

// Pull updates from Community-updates

app.get('/community_update', (req, res) => {
    // SQL Query to select all rows
    const query = `SELECT * FROM community_updates`;
    
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching rows:', err);
        return res.status(500).send('Error fetching data');
      }
  
      // Send the fetched rows as JSON response
      res.json(result);
    });
  });

  /////////////////////////////////////////////////////////

// add emails to launch promo mailing list

app.post('/promoemail', (req, res) => {
    const email = req.body.email;
    const filePath = path.join(__dirname, 'promoemail.json');
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    // Read existing emails from file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading file' });
      }
  
      let emailList = [];
  
      // Parse existing data if the file has content
      if (data) {
        emailList = JSON.parse(data);
      }
  
      // Add new email to the list
      emailList.push({ email });
  
      // Write updated email list to the file
      fs.writeFile(filePath, JSON.stringify(emailList, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error writing to file' });
        }
  
        res.json({ message: 'Email saved successfully!' });
      });
    });
  });

/////////////////////////////////////////////////


let temporaryResetToken; // Server-side variable to store the reset token temporarily

app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour

    temporaryResetToken = resetToken; // Store the reset token temporarily

    db.query('UPDATE users SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?', [resetToken, expires, email], (err) => {
        if (err) {
            return res.status(500).send('Error saving token');
        }


        res.status(200).send('An email has been sent with further instructions.');
    });
});

app.post('/reset-password', (req, res) => {
    const { password } = req.body;

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
                

            });
        });
    });
});

// returns activity status of team members

app.post('/api/getUserActivityStatus', (req, res) => {
    const { usernames } = req.body;

    if (!usernames || !Array.isArray(usernames)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    // Create a query to get the activity status of the given usernames
    const query = 'SELECT username, activity_status FROM users WHERE username IN (?)';
    db.query(query, [usernames], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////

// API registers new user and adds info to mySQL
app.post('/register', (req, res) => {
    const { userName, email, password, referrer } = req.body;

    if (!userName || !email || !password || !referrer) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the username already exists
    const duplicateCheckQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(duplicateCheckQuery, [userName], (dupErr, dupResult) => {
        if (dupErr) {
            console.error('Error checking duplicate username:', dupErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (dupResult.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // If no duplicate, hash the password and proceed with referrer check
        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error('Error hashing password:', hashErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Check if the referrer exists
            const referrerQuery = 'SELECT * FROM users WHERE username = ?';
            db.query(referrerQuery, [referrer], (refErr, refResult) => {
                if (refErr) {
                    console.error('Error checking referrer:', refErr);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (refResult.length === 0) {
                    return res.status(400).json({ error: 'Invalid referrer' });
                }

                // Insert the new user
                const insertQuery = 'INSERT INTO users (username, email, password, referrer) VALUES (?, ?, ?, ?)';
                db.query(insertQuery, [userName, email, hashedPassword, referrer], (insertErr, result) => {
                    if (insertErr) {
                        console.error('Error inserting user data:', insertErr);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    // Update referrer's team size
                    const updateQuery = 'UPDATE users SET team = IFNULL(team, 0) + 1 WHERE username = ?';
                    db.query(updateQuery, [referrer], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error('Error updating referrer team size:', updateErr);
                            return res.status(200).json({ message: 'Registration successful, but failed to update referrer team size' });
                        }
                        
                        res.status(200).json({ message: 'User registered successfully' });
                    });
                });
            });
        });
    });
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
                

                req.session.userId = user.id;
                

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
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWTSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        

        req.userId = user.userId;
        req.token = token;
        next();
    });
};

// Endpoint to get user data dynamically based on user ID from token
app.get('/user', authenticateToken, async (req, res) => {
    const userId = req.userId; // Extracted user ID from token
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

// Mining class constructor with class binding
    constructor() {
// Base mining rate
        this.baseRate = 1;
// map user ID to mining state
        this.miningStatusByUser = {}; // Dev /Mapping of user IDs to their mining state
        this.miningIntervalsByUser = {}; // DevMapping of user IDs to their mining intervals

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
                

                await this.updateCurrentRate(userId, 1);
                

                await this.updateBaseRate(userId, 1);
                

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
                    const url = 'https://chainfree.info:4000/updateBalance';  //  77.68.102.168
                    axios.post(url, postData, { withCredentials: true })
                        .then(response => {
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

    
    
    // Function to fetch balance history from the database
    
    

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

app.post('/logs', (req, res) => {
    const { message, additionalInfo } = req.body;
    const logEntry = `${new Date().toISOString()} - ${message} - ${JSON.stringify(additionalInfo)}\n`;

    fs.appendFile('logs.txt', logEntry, (err) => {
        if (err) {
            console.error('Failed to write log entry:', err);
            return res.status(500).json({ message: 'Failed to write log entry' });
        }
        res.status(200).json({ message: 'Log entry recorded' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

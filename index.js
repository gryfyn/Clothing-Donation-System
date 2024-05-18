const express = require('express');
const app = express();
const port = 3800;
const mysql = require('mysql');
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const filestore = require("session-file-store")(sessions);
const cors = require('cors');
const bcrypt = require('bcrypt');
const moment = require('moment');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

app.use(sessions({
  name: "User_Session",
  secret: "8Ge2xLWOImX2HP7R1jVy9AmIT0ZN68oSH4QXIyRZyVqtcl4z1Iu12345678191234578687",
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false },
  resave: false,
  store: new filestore({ logFn: function () {} }),
  path: "/sessions/"
}));


var session;

app.use(cors());
app.use(express.static('public'));
// Setting up the project
app.set('views', 'views') // Where the pages are going to be stored
app.set('view engine', 'hbs') // The view engine used
app.use(express.static('public')) //The folder for the assests

// mysql connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'donationhub',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});


//FUNCTIONS MODULE
// Function to check if the user with given userID exists
async function checkUserExists(userID) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as count FROM donors WHERE donorid = ?';
    connection.query(query, [userID], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
}

// Function to check if the volunteer with given volunteerID exists
async function checkVolunteerExists(volunteerID) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) as count FROM volunteers WHERE volunteerID = ?';
    connection.query(query, [volunteerID], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
}

// Middleware to check if the user is authenticated
function authenticateUser(req, res, next) {
  const userCookie = req.cookies.user;

  // Check if the user cookie exists and is not empty
  if (userCookie) {
    req.user = { email: userCookie };
    return next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    return res.status(401).send('/'); // User is not authenticated, returns to login page
  }
}

//function to get user by email id
async function getUserByEmail(email) {
  const query = 'SELECT * FROM donors WHERE email = ?';
  const results = await queryAsync(query, [email]);

  // Assuming the query returns an array of user objects
  return results[0];
}

//function to get user by email id
async function getVolunteerByEmail(email) {
  const query = 'SELECT * FROM volunteers WHERE email = ?';
  const results = await queryAsync(query, [email]);

  // Assuming the query returns an array of user objects
  return results[0];
}

//Function to generate user id
async function generateUserID() {
  let counter = 1000; // Starting counter

  while (true) {
    const userID = 'DH' + (counter + 1);
    const userExists = await checkUserExists(userID);
    if (!userExists) {
      return userID;
    }
    counter++;
  }
}



//Function to generate volunteer id
async function generateVolunteerID() {
  let counter = 1000; // Starting counter

  while (true) {
    const volunteerID = 'VI' + (counter + 1);
    const volunteerExists = await checkVolunteerExists(volunteerID);
    if (!volunteerExists) {
      return volunteerID;
    }
    counter++;
  }
}

//function to insert user 
async function insertUser(userID, email, password) {
  const query = 'INSERT INTO donors (donorid, email, password) VALUES (?, ?, ?)';
  await queryAsync(query, [userID, email, password]);
}

//function to insert volunteer 
async function insertVolunteer(volunteerID, email, password) {
  const query = 'INSERT INTO volunteers (volunteerID, email, password) VALUES (?, ?, ?)';
  await queryAsync(query, [volunteerID, email, password]);
}

//function to create promises.
async function queryAsync(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Helper function to convert callback-based queries to promises
function promisifyQuery(query, params) {
  return new Promise((resolve, reject) => {
      connection.query(query, params, (error, results, fields) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
}


// Helper function to generate donation ID
async function generateDonationID(donorID) {
  let counter = 1000; // Starting counter

  while (true) {
      const donationID = 'DN' + (counter + donorID);
      const donationExists = await checkDonationExists(donationID);
      if (!donationExists) {
          return donationID;
      }
      counter++;
  }
}

// Function to check if the donation ID already exists
async function checkDonationExists(donationID) {
  return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) as count FROM donordonations WHERE donationID = ?';
      connection.query(query, [donationID], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results[0].count > 0);
          }
      });
  });
}

// Function to get donor ID by email
async function searchDonorByEmail(email) {
  return new Promise((resolve, reject) => {
      const query = 'SELECT donorid FROM donors WHERE email = ?';
      connection.query(query, [email], (error, results) => {
          if (error) {
              reject(error);
          } else {
              if (results.length > 0) {
                  resolve(results[0].donorid);
              } else {
                  reject('No donor found with that email');
              }
          }
      });
  });
}


//ROUTES//

//ADMIN ROUTES//

//admin login route
app.get('/', (request, response) => {
  response.render('./user/index');
  });

//admin dashboard route

app.get('/admin-login', (request, response) => {
  response.render('./admin/adminlogin');
});


app.get('/admin-dashboard', (request, response) => {
  response.render('./admin/adminDashBoard');
});

//admin system configuration route
app.get('/sys-config', (request, response) => {
  response.render('./admin/systemconfig');
});

//admin account management route
app.get('/account-mgt', (request, response) => {
  response.render('./admin/accountmgt');
});

app.get('/vol-list', (request, response) => {
  response.render('./admin/volunteerlist');
});

app.get('/sys-performance', (request, response) => {
  response.render('./admin/adminDashboard');
});


//USER ROUTES//

//index page
app.get('/index-page', (request, response) => {
  response.render('./user/index');
});

app.get('/register-page', (request, response) => {
  response.render('./user/register')
})

//login page
app.get('/login-page', (request, response) => {
  response.render('./user/login');
});

//home page
app.get('/home-page', authenticateUser,(request, response) => {
  response.render('./user/home')
})

//centers page
app.get('/centers-page', authenticateUser,(request, response) => {
  response.render('./user/centers')
})

//donate page
app.get('/donate-page', authenticateUser,(request, response) => {
  response.render('./user/donate')
})

//contact-us page
app.get('/contact-us-page', authenticateUser,(request, response) => {
  response.render('./user/contact-us')
})

//about us page
app.get('/aboutus-page', authenticateUser,(request, response) => {
  response.render('./user/aboutus')
})

//profile page
app.get('/profile-page', authenticateUser,(request, response) => {
  response.render('./user/profile')
})

//send user session info
app.get('/get-session-user', authenticateUser, (request, response) => {
  
});

//previous donations
app.get('/previous-donations', authenticateUser, (request, response) => {
  response.render('./user/previousdonations')
  
});

app.get('/leaderboard-page', authenticateUser, (request, response) => {
  response.render('./user/leaderboard')
  
});


//Volunteer Routes//

//volunteer page
app.get('/join-volunteer', (request, response) => {
  response.render('./volunteer/volunteer');
});

//Volunteer Home Page
app.get('/volunteer-home', (request, response) => {
  response.render('./volunteer/volunteerHome');
});

//Register Volunteer
app.get('/volunteer-signup', (request, response) => {
  response.render('./volunteer/volunteerRegister');
});

//Volunteer Login
app.get('/volunteer-login', (request, response) => {
  response.render('./volunteer/volunteerLogin');
});

//Volunteer Login
app.get('/receive-donation', (request, response) => {
  response.render('./volunteer/receivedonation');
});





//LOGIN MODULE//
//Admin login//
app.post('/admin-login', (req, res) => {
  const { email, password } = req.body;

  // Query the admin table to check if the provided credentials match any record
  const query = 'SELECT * FROM admin WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Check if any records were found
    if (results.length > 0) {
      // Admin authenticated successfully
      res.redirect('/admin-dashboard'); // Redirect to the admin dashboard
    } else {
      // No matching records found, render an error message
      res.status(401).send('Invalid email or password');
    }
  });
});

// Volunteer Login
app.post('/volunteer-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await getVolunteerByEmail(email);

    if (!volunteer) {
      return res.status(404).send('No volunteer found with that email');
    }

    const passwordMatch = await bcrypt.compare(password, volunteer.password);

    if (passwordMatch) {
      session = req.session;
      session.volunteer = volunteer;
      console.log(session);
      session.save();
      res.cookie('volunteer', volunteer.email);
      message = null;
      res.render('./volunteer/volunteerHome');
    } else {
      console.log('Incorrect password');
      res.status(401).send('Incorrect password');
    }
  } catch (error) {
    console.error('Error during login:', error.stack);

    // Handle the case where setting the cookie or redirecting fails
    res.status(500).send('Error during login. Please try again.');
  }
});



// User Login//
app.post('/login', async (req, res) => {
  try {
     const { email, password } = req.body;
 
     const user = await getUserByEmail(email);
 
     if (!user) {
       return res.status(404).send('No user found with that email');
     }
 
     const passwordMatch = await bcrypt.compare(password, user.password);
 
     if (passwordMatch) {
      session = req.session
      session.user = req.body
      console.log(session);
      session.save()
      res.cookie('user', user.email)
      message = null
     return res.redirect('/home-page')
      
              
       
     } else {
       console.log('Incorrect password');
       res.status(401).send('Incorrect password');
     }
  } catch (error) {
     console.error('Error during login:', error.stack);
 
     // Handle the case where setting the cookie or redirecting fails
     res.status(500).send('Error during login. Please try again.');
  }
 });
 

//SIGNUP MODULE//
//User Signup Page
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      console.log('User with that email already exists');
      res.status(409).send('User with that email already exists');
      return;
    }

    const userID = await generateUserID();
    const hashedPassword = await bcrypt.hash(password, 10);

    await insertUser(userID, email, hashedPassword);

    // Store the user's data in the session
    req.session.userID = userID;
    req.session.userEmail = email;

    console.log('User created successfully');
    res.render('./user/user');
  } catch (error) {
    console.error('Error during signup:', error.stack);
    res.status(500).send('Error during signup');
    
  }
});

// Volunteer Signup
app.post('/volunteer-signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await getVolunteerByEmail(email);

    if (existingUser) {
      console.log('User with that email already exists');
      res.status(409).send('User with that email already exists');
      return;
    }

    const volunteerID = await generateVolunteerID();
    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password using bcrypt

    await insertVolunteer(volunteerID, email, hashedPassword); // Store hashed password in the database

    // Store the user's data in the session
    req.session.volunteerID = volunteerID;
    req.session.userEmail = email;

    console.log('Volunteer created successfully');
    res.render('./volunteer/volunteer');
  } catch (error) {
    console.error('Error during signup:', error.stack);
    res.status(500).send('Error during signup');
  }
});


//PROFILE PAGE MODULE//
//Get user profile
app.get('/get-user-profile', authenticateUser, (req, res) => {
  const userEmail = req.user.email;

  // SQL query to retrieve the donor ID associated with the user's email
  const donorIdQuery = 'SELECT donorid FROM donors WHERE email = ?';

  // SQL query to count the number of donations associated with the user's email
  const donationCountQuery = 'SELECT COUNT(*) AS donationNumber FROM donordonations WHERE email = ?';

  // Execute the first query to retrieve the donor ID
  connection.query(donorIdQuery, [userEmail], (error, donorIdResults, fields) => {
    if (error) {
      console.error('Error querying database for donor ID:', error.stack);
      res.status(500).send('Error querying database for donor ID');
      return;
    }

    // Extract the donor ID from the query results
    const donorId = donorIdResults[0].donorid;

    // Execute the second query to count the number of donations
    connection.query(donationCountQuery, [userEmail], (error, donationCountResults, fields) => {
      if (error) {
        console.error('Error querying database for donation count:', error.stack);
        res.status(500).send('Error querying database for donation count');
        return;
      }

      // Extract the donation number from the query results
      const donationNumber = donationCountResults[0].donationNumber;

      // Create the user information object with the donor ID and donation number
      const userInfo = {
        donorid: donorId,
        email: userEmail,
        donationNumber: donationNumber
      };

      res.status(200).json(userInfo);
    });
  });
});



//USER DETAILS PAGE//

//Add user details

app.post('/add-user-details', (req, res) => {
  // Extract user details from the request body
  const { fName, lName, address, email } = req.body;

  // Construct SQL query to insert user details into the new table
  const sql = `INSERT INTO donordetails (firstname, lastname, address, email) VALUES (?, ?, ?, ?)`;
  const values = [fName, lName, address, email];

  // Execute the SQL query
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding user details:', err);
      res.status(500).send('Error adding user details');
      return;
    }
    console.log('User details added successfully');
    res.render('./user/login');
  });
});



//Add volunteer details

app.post('/add-volunteer-details', (req, res) => {
  // Extract volunteer details from the request body
  const { fName, lName, address, email, nearestcenter } = req.body;

  // Construct SQL query to insert user details into the new table
  const sql = `INSERT INTO volunteerdetails (firstname, lastname, address, email, nearestcenter) VALUES (?, ?, ?, ?, ?)`;
  const values = [fName, lName, address, email, nearestcenter];

  // Execute the SQL query
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding volunteer details:', err);
      res.status(500).send('Error adding user details');
      return;
    }
    console.log('User details added successfully');
    res.render('./volunteer/volunteerLogin');
  });
});



//Add Donation

// Routes
// Backend: Add Donation Endpoint
app.post('/add-donation', async (req, res) => {
  const { email, location } = req.body;

  try {
    // Search for donor by email
    const searchResults = await searchDonorByEmail(email);

    // Check if any donors were found with the provided email
    if (searchResults.length === 0) {
      res.status(404).json({ message: 'No donors found with the provided email.' });
      return;
    }

    // Extract donor ID from search results
    const donorID = searchResults[0].donorid;

    // Generate unique donation ID
    const donationID = await generateDonationID(donorID);

    // Get current date and time
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Insert donation into database
    const sql = `INSERT INTO donordonations (donorid, email, donationID, date, location) 
                 VALUES (?, ?, ?, ?, ?)`;
    const values = [donorID, email, donationID, date, location];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error adding donation:', error);
        return;
      }
      console.log('Donation added successfully');
      // Reload the page after donation is added
      res.redirect(req.get('referer'));
    });
  } catch (error) {
    console.error('Error searching for donor:', error);
  }
});


// Function to search for donors by email
async function searchDonorByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM donors WHERE email = ?';
    connection.query(query, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}


// Endpoint to retrieve past donations
app.get('/get-past-donations', authenticateUser, (req, res) => {
  const userEmail = req.user.email;

  // SQL query to select past donations based on user's email
  const sql = 'SELECT donorid, email, donationID, date, location FROM donordonations WHERE email = ?';

  // Execute the SQL query
  connection.query(sql, [userEmail], (err, results) => {
    if (err) {
      console.error('Error retrieving past donations:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Send the fetched past donations as JSON response
    res.status(200).json(results);
  });
});



// Backend route to search for donors by email
app.get('/search-donor', (req, res) => {
  const { email } = req.query;

  // Query the database to search for donors with the provided email
  const query = 'SELECT donors.email, donordetails.firstname, donordetails.lastname FROM donors JOIN donordetails ON donors.email = donordetails.email WHERE donors.email = ?;';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error searching for donor:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Check if any donors were found with the provided email
    if (results.length === 0) {
      res.status(404).json({ message: 'No donors found with the provided email.' });
    } else {
      res.status(200).json(results);
    }
  });
});


//Endpoint for leaderboard
// Backend route for leaderboard page
app.get('/leaderboard', (req, res) => {
  const sql = `
    SELECT donorid, 
           COUNT(*) AS donationCount
    FROM donordonations 
    GROUP BY donorid 
    ORDER BY donationCount DESC 
    LIMIT 10`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching leaderboard data:', error);
      res.status(500).send('Error fetching leaderboard data');
    } else {
      // Calculate level for each user based on donation count
      const leaderboardWithLevel = results.map(user => {
        const level = getLevel(user.donationCount);
        return { ...user, level };
      });
      
      res.json(leaderboardWithLevel);
    }
  });
});

function getLevel(donations) {
  if (donations >= 0 && donations <= 2) {
    return "Level 1";
  } else if (donations >= 3 && donations <= 5) {
    return "Level 2";
  } else if (donations >= 6 && donations <= 10) {
    return "Level 3";
  } else if (donations >= 11 && donations <= 15) {
    return "Level 4";
  } else {
    return "Level 5";
  }
}



// Endpoint to retrieve volunteers
app.get('/volunteers', (req, res) => {
  const sql = 'SELECT firstname, lastname, nearestcenter FROM volunteerdetails';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching volunteers:', error);
      res.status(500).send('Error fetching volunteers');
    } else {
      res.json(results);
    }
  });
});


//Admin endpoint to delete user
app.delete('/users/:email', (req, res) => {
  const email = req.params.email;

  // SQL query to delete user by email from users table
  const deleteUserQuery = 'DELETE FROM donors WHERE email = ?';

  // Execute the deletion query
  connection.query(deleteUserQuery, [email], (error, results) => {
      if (error) {
          console.error('Error deleting user:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (results.affectedRows > 0) {
              // User deleted successfully
              res.status(200).json({ message: 'User deleted successfully' });
          } else {
              // User not found
              res.status(404).json({ error: 'User not found' });
          }
      }
  });
});



//Delete User 
app.delete('/delete-user', authenticateUser, (req, res) => {
  const userEmail = req.session.email;

  if (!userEmail) {
    return res.status(401).send('Unauthorized');
  }

  const query = 'DELETE FROM donors WHERE email = ?';

  connection.query(query, [userEmail], (error, results, fields) => {
    if (error) {
      console.error('Error deleting user from the database:', error.stack);
      res.status(500).send('Error deleting user from the database');
      return;
    }

    console.log('User deleted successfully');
    req.session.destroy(); // Destroy the session after deleting the user
    res.render("/");
  });
});



//LOGOUT MODULE//
app.get('/logout', (request, response) => {
  session = request.session
  session.destroy((err) => {
      message = null

      if (err) throw err;
      session = null;
      response.clearCookie('user')
      response.clearCookie('User_Session')
      response.redirect('/')
  })
})


//SYSTEM CONFIGURATION//
//Turn off and on server//



//CONNECTION MODULE//
//server listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

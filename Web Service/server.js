
// Setup
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Data model and persistent store
const manager = require("./manager.js");

//getting database from atlas
const m = manager(
  "mongodb+srv://PrivateInfo@romanweb-oyc5d.mongodb.net/coursedbweek2?retryWrites=true"
);

// This one works for MongoDB Atlas...
// Replace the database user name and password, and cluster name, with your own values
//const m = manager("mongodb+srv://<database-user-name>:<database-user-password>@<your-atlas-cluster-name-abcde>.mongodb.net/coursedbweek2?retryWrites=true");

// Add support for incoming JSON entities
app.use(bodyParser.json());

// Add support for CORS
app.use(cors());

// ############################################################
// Add the following code just below these statements in the"server.js" source code
//     // Add support for CORS
//     app.use(cors());

// Passport.js components
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

// JSON Web Token Setup
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Configure its options
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
// IMPORTANT - this secret should be a long, unguessable string 
// (ideally stored in a "protected storage" area on the 
// web server, a topic that is beyond the scope of this course)
// We suggest that you generate a random 64-character string
// using the following online tool:
// https://lastpass.com/generatepassword.php 
jwtOptions.secretOrKey = 'A_8&tGnxV++PTL3yRBcg-x2t&f2KchThk^f!n69_LX=pVT2=HARvuAkJbAU@J4W-';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);

  if (jwt_payload) {
    // The following will ensure that all routes using 
    // passport.authenticate have a req.user._id value 
    // that matches the request payload's _id
    next(null, { _id: jwt_payload._id });
  } else {
    next(null, false);
  }
});

// Activate the security system
passport.use(strategy);
app.use(passport.initialize());


// Deliver the app's home page to browser clients
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// API FOR ASSIGNMENT 1 PERSOSN ------------------------------------------------------
// Get all
app.get("/api/persons", (req, res) => {
  // Call the manager method
  m.personGetAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: err })
        .end();
    });
});

// Get one
app.get("/api/persons/:personId", (req, res) => {
  // Call the manager method
  m.personGetById(req.params.personId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Add new
app.post("/api/persons", (req, res) => {
  // Call the manager method
  m.personAdd(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

// Edit existing
app.put("/api/persons/:personId", (req, res) => {
  m.personEditExisting(req.params.personId, req.body)
    .then(() => {
      res.json({
        message:
          "update user with Id: " +
          req.params.personId +
          " to " +
          req.body.firstName +
          " " +
          req.body.lastName
      });
    })
    .catch(err => {
      res.status(404).json({ message: "Could not update person" + err });
    });
});

// Delete item
app.delete("/api/persons/:personId", (req, res) => {
  // Call the manager method
  m.personDelete(req.params.personId)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// API FOR ASSIGNMENT 2 STUDENTS #######################################################
// Get all for students
app.get("/api/students", (req, res) => {
  // Call the manager method
  m.studentGetAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: err })
        .end();
    });
});


//Get student username
app.get("/api/students/username/:username", passport.authenticate('jwt', { session: false }), (req, res) => {
  // Call the manager method
  m.studentGetByUsername(req.params.username)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Get one
app.get("/api/students/:studentId", passport.authenticate('jwt', { session: false }), (req, res) => {
  // Call the manager method
  m.studentGetById(req.params.studentId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Add new currently not used
//just in case I will need it in Asmnt 3
app.post("/api/students", (req, res) => {
  // Call the manager method
  m.studentAdd(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

// Edit existing student Cart Save
app.put("/api/students/:studentId/cart-save", (req, res) => {
  m.studentCartSave(req.params.studentId, req.body)
    .then(() => {
      res.json({ message: "Cart saved" });
    })
    .catch(err => {
      res.status(404).json({ message: "Could not update Student" + err });
    });
});

// Edit existing student Cart Confirm
app.put("/api/students/:studentId/cart-confirmed", (req, res) => {
  m.studentCartConfirmed(req.params.studentId, req.body)
    .then(() => {
      res.json({ message: "Timetable Confirmed" });
    })
    .catch(err => {
      res.status(404).json({ message: "Could not update Student" + err });
    });
});

// Delete item not currently used
// keeping it for now just in case.
app.delete("/api/students/:studentId", (req, res) => {
  // Call the manager method
  m.studentDelete(req.params.studentId)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// API FOR ASSIGNMENT 2 COURSES #################################################################
// Get all
app.get("/api/courses", (req, res) => {
  // Call the manager method
  m.courseGetAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: err })
        .end();
    });
});

// Get all courses that match the program
app.get("/api/courses/:academicProgram", (req, res) => {
  // Call the manager method
  m.courseGetByProgram(req.params.academicProgram)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: err })
        .end();
    });
});

// Get one not currently used.
app.get("/api/courses/:courseId", (req, res) => {
  // Call the manager method
  m.courseGetById(req.params.courseId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Add new not currently used by angular app.
app.post("/api/courses", (req, res) => {
  // Call the manager method
  m.courseAdd(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

// Edit existing not currently used by angular app
app.put("/api/courses/:courseId", (req, res) => {
  m.courseEditExisting(req.params.courseId, req.body)
    .then(() => {
      res.json({ message: "updated course with Id: " + req.params.courseId });
    })
    .catch(err => {
      res.status(404).json({ message: "Could not update person" + err });
    });
});

// Delete item not currently used by angular app
app.delete("/api/courses/:courseId", (req, res) => {
  // Call the manager method
  m.courseDelete(req.params.courseId)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});


// API FOR ASSIGNMENT 3 userAccount #####################################################################

// Example of a protected function
// Only requests that include a token will succeed
//app.get("/api/products", passport.authenticate('jwt', { session: false }), (req, res) => {

// Get all
app.get("/api/useraccounts", (req, res) => {
  // Call the manager method
  m.userAccountGetAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: err })
        .end();
    });
});


// User account activate
app.post("/api/useraccounts/activate", (req, res) => {
  m.useraccountsActivate(req.body)
    .then((data) => {
      res.json({ "message": data });
    }).catch((msg) => {
      res.status(400).json({ "message": msg });
    });
});

// User account create
app.post("/api/useraccounts/create", (req, res) => {
  m.useraccountsRegister(req.body)
    .then((data) => {
      res.json({ "message": data });
    }).catch((msg) => {
      res.status(400).json({ "message": msg });
    });
});

// User account login
app.post("/api/useraccounts/login", (req, res) => {
  m.useraccountsLogin(req.body)
    .then((data) => {

      // Configure the payload with data and claims
      var payload = {
        _id: data._id,
        userName: data.userName,
        fullName: data.fullName,
        role: data.role
      };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      // Return the result
      res.json({ "message": "Login was successful", token: token });

    }).catch((msg) => {
      res.status(400).json({ "message": msg });
    });
});


//################################################################################

// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Attempt to connect to the database, and
// tell the app to start listening for requests
m.connect()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("Ready to handle requests on port " + HTTP_PORT);
    });
  })
  .catch(err => {
    console.log("Unable to start the server:\n" + err);
    process.exit();
  });

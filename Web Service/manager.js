// Data service operations

// Setup
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// Load the schemas
const personSchema = require("./schema.js");
const studentSchema = require("./studentSchema.js");
const coursesSchema = require("./coursesSchema");
const userAccountSchema = require("./userAccountSchema");

module.exports = function(mongoDBConnectionString) {
  // defined on connection to the new db instance
  let Person;
  let Student;
  let Course;
  let userAccount;

  return {
    connect: function() {
      return new Promise(function(resolve, reject) {
        let db = mongoose.createConnection(mongoDBConnectionString);

        db.on("error", err => {
          reject(err);
        });
        db.once("open", () => {
          Person = db.model("person", personSchema, "person");
          Student = db.model("StudentsV1", studentSchema, "StudentsV1");
          Course = db.model("CoursesV2", coursesSchema, "CoursesV2");
          userAccount = db.model("userAccounts",userAccountSchema,"userAccounts");
          resolve();
        });
      });
    },

    // PERSONS FUNCTIONS ------------------------------------------------------------------
    //Get All
    personGetAll: function() {
      return new Promise(function(resolve, reject) {
        Person.find()
          .sort({ lastName: "asc", firstName: "asc" })
          .exec()
          .then(persons => {
            // Found, a collection will be returned
            resolve(persons);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //Get One
    personGetById: function(personId) {
      return new Promise(function(resolve, reject) {
        Person.findById(personId)
          .exec()
          .then(person => {
            // Found, one object will be returned
            resolve(person);
          })
          .catch(err => {
            // Find/match is not found
            reject(err);
          });
      });
    },

    //add new person
    personAdd: function(newItem) {
      return new Promise(function(resolve, reject) {
        Person.create(newItem, (error, item) => {
          if (error) {
            // Cannot add item
            return reject(error.message);
          }
          //Added object will be returned
          return resolve(item);
        });
      });
    },

    //Update existing
    personEditExisting: function(personId, body) {
      return new Promise(function(resolve, reject) {
        let person = body;
        Person.updateOne(
          { _id: personId },
          {
            $set: {
              firstName: person.firstName,
              lastName: person.lastName,
              birthDate: person.birthDate,
              email: person.email,
              creditScore: person.creditScore,
              rating: person.rating
            }
          },
          { multi: false }
        )
          .exec()
          .then(() => {
            // Found, one object will be returned
            console.log("Success Update.");
            resolve();
          })
          .catch(err => {
            // Find/match is not found
            console.log("Update Failed.");
            console.log(err);
            reject();
          });
      });
    },

    //Remove one function
    personDelete: function(itemId) {
      return new Promise(function(resolve, reject) {
        Person.findByIdAndRemove(itemId, error => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        });
      });
    },

    // STUDENTS FUNCTIONS #########################################################

    //Get All
    studentGetAll: function() {
      return new Promise(function(resolve, reject) {
        Student.find()
          .sort({ familyName: "asc", givenName: "asc" })
          .exec()
          .then(students => {
            // Found, a collection will be returned
            resolve(students);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //Get One by username
    studentGetByUsername: function(username) {
      console.log(username);
    return new Promise(function(resolve, reject) {
      Student.findOne({email: username})
        .exec()
        .then(student => {
          // Found, one object will be returned
          resolve(student);
        })
        .catch(err => {
          // Find/match is not found
          reject(err);
        });
    });
  },

    //Get One
    studentGetById: function(studentId) {
      return new Promise(function(resolve, reject) {
        Student.findById(studentId)
          .exec()
          .then(student => {
            // Found, one object will be returned
            resolve(student);
          })
          .catch(err => {
            // Find/match is not found
            reject(err);
          });
      });
    },

    //add new student currently not used by angular app
    studentAdd: function(newStudent) {
      return new Promise(function(resolve, reject) {
        Student.create(newStudent, (error, student) => {
          if (error) {
            // Cannot add item
            return reject(error.message);
          }
          //Added object will be returned
          return resolve(student);
        });
      });
    },

    //Update existing Cart Save
    studentCartSave: function(sId, s) {
      return new Promise(function(resolve, reject) {
        //How to filter so that we would be able to update only some properties
        Student.findOneAndUpdate({ _id: sId }, s)
          .exec()
          .then(() => {
            // Found, one object will be returned
            console.log("Success Update.");
            resolve();
          })
          .catch(err => {
            // Find/match is not found
            console.log("Update Failed.");
            console.log(err);
            reject();
          });
      });
    },

    //Update existing updating cart saved of the student
    studentCartConfirmed: function(sId, s) {
      return new Promise(function(resolve, reject) {
        //How to filter so that we would be able to update only some properties
        Student.findOneAndUpdate({ _id: sId }, s)
          .exec()
          .then(() => {
            // Found, one object will be returned
            console.log("Success Update.");
            resolve();
          })
          .catch(err => {
            // Find/match is not found
            console.log("Update Failed.");
            console.log(err);
            reject();
          });
      });
    },

    //Remove one function
    studentDelete: function(studentId) {
      return new Promise(function(resolve, reject) {
        Student.findByIdAndRemove(studentId, error => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        });
      });
    },

    // COURSES FUNCTIONS #########################################################
    //Get All
    courseGetAll: function() {
      return new Promise(function(resolve, reject) {
        Course.find()
          .sort({ academicProgram: "asc", level: "asc" })
          .exec()
          .then(courses => {
            // Found, a collection will be returned
            resolve(courses);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //Get All Courses that match the academic program 
    courseGetByProgram: function(aProg) {
      return new Promise(function(resolve, reject) {
        Course.find({ academicProgram: aProg })
          .sort({ level: "asc" })
          .exec()
          .then(courses => {

            // Found, a collection will be returned
            resolve(courses);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //Get One currently not used by angular app
    courseGetById: function(cId) {
      return new Promise(function(resolve, reject) {
        Course.findById(cId)
          .exec()
          .then(course => {
            // Found, one object will be returned
            resolve(course);
          })
          .catch(err => {
            // Find/match is not found
            reject(err);
          });
      });
    },

    //add new course currently not used by angular app
    courseAdd: function(newCourse) {
      return new Promise(function(resolve, reject) {
        Course.create(newCourse, (error, course) => {
          if (error) {
            // Cannot add item
            return reject(error.message);
          }
          //Added object will be returned
          return resolve(course);
        });
      });
    },

    //Update existing course currently not used by angular app
    courseEditExisting: function(cId, body) {
      return new Promise(function(resolve, reject) {
        let course = body;
        Course.updateOne(
          { _id: cId },

          {
            $set: {
              courseId: course.courseId,
              term: course.term,
              academicProgram: course.academicProgram,
              level: course.level,
              prerequisite: course.prerequisite,
              courseCode: course.courseCode,
              section: course.section,
              termSectionId: course.termSectionId,
              enrolCapacity: course.enrolCapacity,
              enrolTotal: course.enrolTotal,
              room: course.room,
              roomCapacity: course.roomCapacity,
              classStart: course.classStart,
              classEnd: course.classEnd,
              classMon: course.classMon,
              classTue: course.classTue,
              classWed: course.classWed,
              classThu: course.classThu,
              classFri: course.classFri,
              dateStart: course.dateStart,
              dateEnd: course.dateEnd,
              professor: course.professor
            }
          },
          { multi: false }
        )
          .exec()
          .then(() => {
            // Found, one object will be returned
            console.log("Success Update.");
            resolve();
          })
          .catch(err => {
            // Find/match is not found
            console.log("Update Failed.");
            console.log(err);
            reject();
          });
      });
    },

    //Remove one course currently not used by angular app
    courseDelete: function(cId) {
      return new Promise(function(resolve, reject) {
        Course.findByIdAndRemove(cId, error => {
          if (error) {
            // Cannot delete item
            return reject(error.message);
          }
          // Return success, but don't leak info
          return resolve();
        });
      });
    },

//USER ACCOUNT Assignment 3 FUNCTIONS ---------------------------------------------------------

    //Get All for testing
    userAccountGetAll: function() {
      return new Promise(function(resolve, reject) {
        userAccount.find()
          .exec()
          .then(userAcc => {
            // Found, a collection will be returned
            resolve(userAcc);
          })
          .catch(err => {
            reject(err);
          });
      });
    },


useraccountsActivate: function (userData) {
  return new Promise(function (resolve, reject) {

    // Incoming data package has user name (email address),
    // two identical passwords, and a role (string)
    // { userName: xxx, password: yyy, passwordConfirm: yyy, role: zzz }

    if (userData.password != userData.passwordConfirm) {
      return reject("Passwords do not match");
    }

    // Generate a "salt" value
    var salt = bcrypt.genSaltSync(10);
    // Hash the result
    var hash = bcrypt.hashSync(userData.password, salt);

    // Attempt to update the user account
    userAccount.findOneAndUpdate(
      { userName: userData.userName },
      { password: hash, statusActivated: true, role: userData.role },
      { new: true }, (error, item) => {
        if (error) {
          // Cannot edit item
          return reject(`User account activation - ${error.message}`);
        }
        // Check for an item
        if (item) {
          // Edited object will be returned
          //return resolve(item);
          // Alternatively...
          return resolve('User account was activated');
        } else {
          return reject('User account activation - not found');
        }

      }); // UserAccounts.findOneAndUpdate
  }); // return new Promise
}, // useraccountsActivate

useraccountsRegister: function (userData) {
  return new Promise(function (resolve, reject) {

    // Incoming data package has user name (email address), full name, 
    // two identical passwords, and a role (string)
    // { userName: xxx, fullName: aaa, password: yyy, passwordConfirm: yyy, role: zzz }

    if (userData.password != userData.passwordConfirm) {
      return reject("Passwords do not match");
    }

    // Generate a "salt" value
    var salt = bcrypt.genSaltSync(10);
    // Hash the result
    var hash = bcrypt.hashSync(userData.password, salt);
    // Update the incoming data
    userData.password = hash;

    // Create a new user account document
    let newUser = new userAccount(userData);

    newUser.statusActivated = true;
    newUser.statusLocked = false;
    // Attempt to save
    newUser.save((error) => {
      if (error) {
        if (error.code == 11000) {
          reject("User account creation - cannot create; user already exists");
        } else {
          reject(`User account creation - ${error.message}`);
        }
      } else {
        resolve("User account was created");
      }
    }); //newUser.save
  }); // return new Promise
}, // useraccountsRegister

useraccountsLogin: function (userData) {
  return new Promise(function (resolve, reject) {

    // Incoming data package has user name (email address) and password
    // { userName: xxx, password: yyy }

    userAccount.findOne(
      { userName: userData.userName }, (error, item) => {
        if (error) {
          // Query error
          return reject(`Login - ${error.message}`);
        }
        // Check for an item
        if (item) {
          // Compare password with stored value
          let isPasswordMatch = bcrypt.compareSync(userData.password, item.password);
          if (isPasswordMatch) {
            return resolve(item);
          }
          else {
            return reject('Login was not successful');
          }
        } else {
          return reject('Login - not found');
        }

      }); // UserAccounts.findOneAndUpdate
  }); // return new Promise
} // useraccountsLogin

  };
};



import { Component, OnInit } from "@angular/core";
import { Course } from "../dataModelClasses";
import { Student } from "../dataModelClasses";
import { DataModelManagerService } from "../data-model-manager.service";
import { Router } from "@angular/router";

// filtering courses by students credits
function filterByCredits(crs, student) {

  var matched = [];
  var check = new Boolean(true);
  var check2 = new Boolean(true);

  for (var i = 0; i < crs.length; i++) {
    check = true;
    check2 = false;

    //checking for pre requisits
    for (var u = 0; u < crs[i].prerequisite.length; u++) {
      for (var k = 0; k < student.credits.length; k++) {
        if (
          crs[i].prerequisite.length > 0 &&
          student.credits[k].courseCode === crs[i].prerequisite[u]) {
          check2 = true; 
          console.log("here1");
         }
         else if (crs[i].prerequisite.length < 1) {
            console.log("here2");
          check2 = true;
        }
      }
    }

    //checking for credits already completed or term of winter 2019
    for (var j = 0; j < student.credits.length; j++) {
      if (
        crs[i].courseCode === student.credits[j].courseCode ||
        crs[i].term != "2019 Winter"
      ) {
        check = false;
      }
    }

    if (check && check2) {
      crs[i].classStart = crs[i].classStart.slice(0, crs[i].classStart.length - 3);
      crs[i].classEnd = crs[i].classEnd.slice(0, crs[i].classEnd.length - 3);
      matched.push(crs[i]);
    }
  }

  return matched;
}

@Component({
  selector: "app-cart-select",
  templateUrl: "./cart-select.component.html",
  styleUrls: ["./cart-select.component.css"]
})
export class CartSelectComponent implements OnInit {
  //message to hold the message after button clicked
  message: String;
  // Property to hold the current student
  student: Student;

  // Property to hold the data fetched from the web service
  coursesByProgram: Course[] = [];
  // courses that the student needs to take
  matchedCourses: Course[] = [];
  //courses that student added to cart
  coursesSelected: Course[] = [];

  // injected service and router 
  constructor(private route: Router, private m: DataModelManagerService) {
    // Initialize the property if student is selected otherwise 
    //redirect to students list
    if (this.m.curStudent) {
      this.student = this.m.curStudent;
    } else {
      this.route.navigateByUrl("/login");
    }
  }

  ngOnInit() {
    // call courses route
    //Extract the data from the returned Observable<Courses>
    this.m.coursesGetByProgram(this.student.academicProgram).subscribe(c => {
      this.coursesByProgram = c;

    //filter the courses based on courses taken, pre-requisites and winter term
      this.matchedCourses = filterByCredits(
        this.coursesByProgram,
        this.student
      );
      console.log(this.matchedCourses);
      //making sure that after courses been saved and user left the page
      //the saved courses will render in the cart again 
      if (this.student.coursesSaved.length != 0) {
        this.coursesSelected = this.student.coursesSaved;
      }
    });
  }

  //selected courses
  courseSelect(crs) {
    var check = new Boolean(false);
    var index = 0;

    // checking if course is already in courses selected
    if (this.coursesSelected != undefined && this.coursesSelected.length != 0) {
      check = false;
      for (var i = 0; i < this.coursesSelected.length; i++) {
        if (this.coursesSelected[i]._id === crs._id) {
          check = true;
          index = i;
        }
      }

      if (check) {
        this.coursesSelected.splice(index, 1);
      } else {
        this.coursesSelected.push(crs);
      }
    } else {
      this.coursesSelected.push(crs);
    }
  }

  // check if courses selected
  isCourseSelected(course) {
    var check = new Boolean(true);
    check = false;

    //checking if course clicked is already in courses selected
    if (this.coursesSelected != undefined && this.coursesSelected.length != 0) {
      for (var i = 0; i < this.coursesSelected.length; i++) {
        if (this.coursesSelected[i]._id === course._id) {
          check = true;
        }
      }
    }
    return check;
  }

  //SAVE the cart saves the courses selected
  taskSaveCart() {
    this.student.coursesSaved = this.coursesSelected;

    //call web api to apply changes to database 
    this.m.studentCartSave(this.student._id, this.student).subscribe();
      this.message = "Cart saved"
  }

  // CLEAR the cart clears the courses selected and students courses saved
  taskClear() {
    this.coursesSelected = [];
    this.student.coursesSaved = [];

    //call web api to apply changes to the database of students courses saved
    this.m.studentCartSave(this.student._id, this.student).subscribe();
      this.message = "Cart cleared"
  }

  //CONFIRM confirms the timetable for the student
  taskConfirmTimeTable() {
    this.student.coursesSaved = [];
    this.student.coursesConfirmed = this.coursesSelected;
    this.coursesSelected = [];
    //call web api to apply changes to databaseto update coursesConfirmed
    this.m.studentCartConfirmed(this.student._id, this.student).subscribe();
    this.message = "Timetable confirmed";
  }
}

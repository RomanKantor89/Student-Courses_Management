import { Component, OnInit } from "@angular/core";
import { Course } from "../dataModelClasses";
import { DataModelManagerService } from "../data-model-manager.service";

@Component({
  selector: "app-available-courses",
  templateUrl: "./available-courses.component.html",
  styleUrls: ["./available-courses.component.css"]
})
export class AvailableCoursesComponent implements OnInit {
  // Property to hold the data fetched from the web service
  courses: Course[];

  //injected service
  constructor(private m: DataModelManagerService) {}

  ngOnInit() {
    // Call the service method
    // Extract the data from the returned Observable<Course[]>
    this.m.coursesGetAll().subscribe(p => {
      this.courses = p;
    });
  }
}

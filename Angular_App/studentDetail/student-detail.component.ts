import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Student } from "./dataModelClasses";
import { DataModelManagerService } from "./data-model-manager.service";

@Component({
  selector: "app-student-detail",
  templateUrl: "./student-detail.component.html",
  styleUrls: ["./student-detail.component.css"]
})
export class StudentDetailComponent implements OnInit {
  // Property to hold the identifier
  email: string;

  // Property to hold the data fetched from the web service
  student: Student;

  // Notice the injected router bit and the service
  constructor(private route: ActivatedRoute, private m: DataModelManagerService)
  {
    // Initialize the property
    this.student = new Student();
  }

  ngOnInit() {
    // Get the identifier from the URL
    this.email = this.route.snapshot.paramMap.get("email");

    // Call the service method
    // Extract the data from the returned Observable<Student>
    this.m.studentsGetByUsername(this.email).subscribe(p => {
      this.student = p;

      //assigning current student to the variable in service
      this.m.curStudent = this.student;
    });

    
  }
}

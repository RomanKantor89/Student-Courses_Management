import { Component, OnInit } from "@angular/core";
import { Student } from "./dataModelClasses";
import { DataModelManagerService } from "./data-model-manager.service";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  // Property to hold the data fetched from the web service
  students: Student[];

  //injected service
  constructor(private m: DataModelManagerService) {}

  ngOnInit() {
    // Call the service method
    // Extract the data from the returned Observable<Student[]>
    this.m.studentsGetAll().subscribe(p => (this.students = p));
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Student, StudentAdd, Course, userAccountCreate, userAccountActivate,} from "./dataModelClasses";
import { Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataModelManagerService {
  curStudent: Student;

  //injected httpClient
  constructor(private http: HttpClient) {}

  //the url of my web api for assignment 3
  private url: string = "https://polar-peak-76826.herokuapp.com/api/";

  //STUDENT #############################################################
  //Get all
  studentsGetAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + "students");
  }

  // Get one
  studentsGetById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.url + "students"}/${id}`);
  }

    // Get one by username(email)
    studentsGetByUsername(email: string): Observable<Student> {
      console.log(email);
      return this.http.get<Student>(`${this.url + "students/username"}/${email}`);
    }

  // Not fully implemented not being used in this app 
  //keeping for possible use in assignment 3
  personsAddNew(newItem: StudentAdd) {
    console.log("in manager");
    console.log(newItem);
  }

  // Saves Selected courses for student
  studentCartSave(id: String, newStudent: Student): Observable<any> {
    return this.http.put<any>(
      `${this.url + "students"}/${id}/cart-save`, newStudent);
  }

  // Confirm Selected courses for student
  studentCartConfirmed(id: String, newStudent: Student): Observable<any> {
    return this.http.put<any>(
      `${this.url + "students"}/${id}/cart-confirmed`, newStudent);
  }

  //COURSES ############################################
  //Get all
  coursesGetAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url + "courses");
  }

  //Get courses by academic program
  coursesGetByProgram(program: String): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.url + "courses"}/${program}`);
  }


//USER ACCOUNT###################################################
  // create user account
  createUserAccount(newAccount: userAccountCreate): Observable<any> {
    return this.http.post<any>(
      `${this.url + "useraccounts"}/create`, newAccount);
  }

    // create user account
    activateUserAccount(newAccount: userAccountActivate): Observable<any> {
      return this.http.post<any>
      (`${this.url + "useraccounts"}/activate`, newAccount);
    }

}


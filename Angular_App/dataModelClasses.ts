// Data shapes

//export interface Credits
export class Credit {
  courseCode: String;
  courseName: String;
  termCompleted: String;
  gradeEarned: String;
}

//export interface userAccountCreate
export class userAccountCreate {
  userName: String;
  fullName: String;
  password: String;
  passwordConfirm: String;
  role: String;
}

//export interface userAccountActivate
export class userAccountActivate {
  userName: String;
  password: String;
  passwordConfirm: String;
  role: String;
}


//export interface Student
export class Student {
  _id?: string;
  id?: number;
  academicProgram: String;
  studentId: String;
  familyName: String;
  givenName: String;
  birthDate: Date;
  email: String;
  academicLevel: Number;
  gpa: Number;
  credits: [Credit];
  coursesSaved?: Course[];
  coursesConfirmed?: Course[];
}

//export interface courses
export class Course {
  _id?: string;
  id?: number;
  courseId: Number;
  term: String;
  academicProgram: String;
  level: Number;
  prerequisite: [String];
  courseCode: String;
  section: String;
  termSectionId: Number;
  enrolCapacity: Number;
  enrolTotal: Number;
  room: String;
  roomCapacity: Number;
  classStart: String;
  classEnd: String;
  classMon: String;
  classTue: String;
  classWed: String;
  classThu: String;
  classFri: String;
  dateStart: String;
  dateEnd: String;
  professor: String;
}

//not being used in this application keeping it for possible use in assignment 3
export class StudentAdd implements Student {
  _id?: string;
  id?: number;
  academicProgram: String;
  studentId: String;
  familyName: String;
  givenName: String;
  birthDate: Date;
  email: String;
  academicLevel: Number;
  gpa: Number;
  credits: [Credit];
}

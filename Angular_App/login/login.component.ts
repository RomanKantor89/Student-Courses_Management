import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private url: string = "https://polar-peak-76826.herokuapp.com/api/";
  // Properties

  credentials: Credentials;
  loginError: string;

  // Initialization

  constructor(

    private router: Router,
    private a: AuthService,
    private jwtHelper: JwtHelperService
  ) {

    this.credentials = new Credentials();
    this.credentials.userName = '';
    this.credentials.password = '';

    this.loginError = '';
  }

  ngOnInit() {
  }

  // Methods

  //submit form
  onSubmit(): void {

    // Complete this method...

    // Clear the existing token
    localStorage.removeItem('access_token');


    // Attempt to login, by calling the login method of the auth service
    this.a.login(this.credentials).subscribe(data => {

      if (data) {
        // If successful...
        //   Save the token in the browser's local storage
        localStorage.setItem('access_token', data.token);

        //   Navigate to a landing/info view (home page?)
        let tokenDecoded = this.jwtHelper.decodeToken(data.token);
        this.router.navigate(['students/username/', tokenDecoded.userName]);
      }
      // If not successful...
      else {
        //console.log the error
        //Write an info message in the loginError property
        this.loginError = "error";
        console.log(this.loginError);
      }

    })

  }
}

// User name and password

export class Credentials {
  userName: string;
  password: string;
}

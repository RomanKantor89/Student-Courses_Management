import { Component, OnInit } from '@angular/core';
import { DataModelManagerService } from "../data-model-manager.service";
import { userAccountActivate } from '../dataModelClasses';

@Component({
  selector: 'app-user-account-activate',
  templateUrl: './user-account-activate.component.html',
  styleUrls: ['./user-account-activate.component.css']
})
export class UserAccountActivateComponent implements OnInit {
  userAccount: userAccountActivate;
  message: String;

  constructor(private m: DataModelManagerService) {
    this.message = "";
    this.userAccount = new userAccountActivate();
  }

  ngOnInit() {


  }

  //bind the userAccount to the form and then send it to the route that calls appropriate web api
  //call the route create userAccount
  userActivate() {

    this.m.activateUserAccount(this.userAccount).subscribe(c => {
      console.log(c);
      this.message = c;

    });

  }
}
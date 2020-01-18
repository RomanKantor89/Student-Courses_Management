import { Component, OnInit } from '@angular/core';
import { DataModelManagerService } from "../data-model-manager.service";
import { userAccountCreate } from '../dataModelClasses';

@Component({
  selector: 'app-user-account-create',
  templateUrl: './user-account-create.component.html',
  styleUrls: ['./user-account-create.component.css']
})
export class UserAccountCreateComponent implements OnInit {

  userAccount: userAccountCreate;
  message: String;

  constructor(private m: DataModelManagerService) {
    this.userAccount = new userAccountCreate();
    this.message = "";
  }

  ngOnInit() {

  }


  userCreate() {
    //bind the userAccount to the form and then send it to the route that calls appropriate web api
 
    this.m.createUserAccount(this.userAccount).subscribe(c => {
      console.log(c);
      this.message = c;

    });

  }

}

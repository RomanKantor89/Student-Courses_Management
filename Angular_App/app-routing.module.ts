import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { AboutComponent } from "./about.component";
import { HelpInfoComponent } from "./help-info.component";
import { NotFoundComponent } from "./not-found.component";
import { StudentListComponent } from "./student-list.component";
import { StudentDetailComponent } from "./student-detail.component";
import { AvailableCoursesComponent } from "./available-courses/available-courses.component";
import { CartSelectComponent } from "./cart-select/cart-select.component";
import { TokenViewComponent } from './token-view/token-view.component';
import { LoginComponent } from './login/login.component';
import { GuardAuthService } from './guard-auth.service';
import { UserAccountActivateComponent } from './user-account-activate/user-account-activate.component';
import { UserAccountCreateComponent } from './user-account-create/user-account-create.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "help-info", component: HelpInfoComponent },
  { path: "students", component: StudentListComponent },
  { path: "students/username/:email", component: StudentDetailComponent, canActivate: [GuardAuthService] },
  { path: "available-courses", component: AvailableCoursesComponent },
  { path: "cart-select", component: CartSelectComponent },
  { path: "view-token", component: TokenViewComponent },
  { path: "login", component: LoginComponent },
  { path: "activate-account", component: UserAccountActivateComponent },
  { path: "create-account", component: UserAccountCreateComponent  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

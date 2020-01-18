import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";
import { AboutComponent } from "./about.component";
import { HelpInfoComponent } from "./help-info.component";
import { NotFoundComponent } from "./not-found.component";
import { NavMainComponent } from "./nav-main.component";
import { StudentListComponent } from "./student-list.component";
import { StudentDetailComponent } from "./student-detail.component";
import { AvailableCoursesComponent } from "./available-courses/available-courses.component";
import { CartSelectComponent } from "./cart-select/cart-select.component";
import { CartSelectedCellComponent } from "./cart-selected-cell/cart-selected-cell.component";
import { CartSelectedGridComponent } from "./cart-selected-grid/cart-selected-grid.component";
import { CartSelectedListComponent } from "./cart-selected-list/cart-selected-list.component";
import { FooterComponent } from "./footer/footer.component";
import { JwtModule } from "@auth0/angular-jwt";
import { TokenViewComponent } from './token-view/token-view.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { GuardAuthService } from './guard-auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptTokenService } from "./intercept-token.service";
import { UserAccountActivateComponent } from './user-account-activate/user-account-activate.component';
import { UserAccountCreateComponent } from './user-account-create/user-account-create.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HelpInfoComponent,
    NotFoundComponent,
    NavMainComponent,
    StudentListComponent,
    StudentDetailComponent,
    AvailableCoursesComponent,
    CartSelectComponent,
    CartSelectedCellComponent,
    CartSelectedGridComponent,
    CartSelectedListComponent,
    FooterComponent,
    TokenViewComponent,
    LoginComponent,
    UserAccountActivateComponent,
    UserAccountCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule, 
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'JWT'
      }
    })
  ],
  providers: [
    AuthService,
    GuardAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptTokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

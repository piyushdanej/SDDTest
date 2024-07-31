import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
username: string = "";
pass: string = ""
isUserAuthenticated = false;
showError = false;

constructor(private authService : AuthenticateService,
  private router : Router
){}

  authenticateUser(){
    this.isUserAuthenticated = this.authService.isCredentialsAccurate(this.username , this.pass);
    this.showError = !this.isUserAuthenticated;

    if(this.isUserAuthenticated){
      this.routeToEmployeesPage();
    }
  }

  private routeToEmployeesPage() {
    this.router.navigate(['/employees']);
  }

}

import { Injectable } from '@angular/core';
import { LoginUser, users } from 'src/data/users';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  users = users;
  loggedInUser : LoginUser;
  
  private isAuthenticated = false;

  constructor() { }

  public isCredentialsAccurate(username : string, pass: string) : boolean {
    this.isAuthenticated = users.some(user => user.username === username && user.password === pass)

    if(this.isAuthenticated) {
      this.loggedInUser = this.users.find(user => user.username === username);
    }

    return this.isAuthenticated;
  }

  public isUserAuthenticated() : boolean {
    return this.isAuthenticated;
  }

  public isUserSOP1() : boolean {
    return this.loggedInUser.role.includes("SOP1");
  }

  public isUserSOP2() : boolean {
    return this.loggedInUser.role.includes("SOP2");
  }


}

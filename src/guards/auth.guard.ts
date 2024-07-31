import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from 'src/services/authenticate.service';

@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private authService : AuthenticateService,
  private snackBar : MatSnackBar,
  private router: Router
 ){}

 canActivate(
 route: ActivatedRouteSnapshot,
 state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isUserAuthenticated();
    
    if(!isAuthenticated) {
      this.snackBar.open("Unable to access the Page." , "" ,  {
        duration : 3000,
        panelClass : 'my-snackbar'
      });
      
      this.router.navigate(['/login']);
    }

    return isAuthenticated;
 }
 
}
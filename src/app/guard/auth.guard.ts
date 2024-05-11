import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private token= 'token';

  private id_user='id_user';

  constructor(private loginService: LoginService, private router:Router){}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.loginService.isLoggedToken()){

        console.log(this.loginService.expJwtToken());

        return true;
      }

      if(this.loginService.expJwtToken()){

        this.loginService.logOut().subscribe(()=>{
          localStorage.removeItem(this.id_user);
        localStorage.removeItem(this.token);
        })
      }

      this.router.navigate(['/login']);

      return false;
  }

}

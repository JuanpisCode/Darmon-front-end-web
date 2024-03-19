import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private token= 'token';

  private id_user='id_user';

    constructor(private login:LoginService,private router:Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([409].includes(err.status) && this.login.getJwtToken()) {
                this.login.logOut().subscribe(()=>{
                  localStorage.removeItem(this.id_user);
                  localStorage.removeItem(this.token);
                  this.router.navigate(['/login'])
                });
              Swal.fire("Error!","La sesión fue desabilitada","error");
            }

            if ([400].includes(err.status)) {
              Swal.fire("Error!","El correo o la contraseña son incorrectos","error");
            }

            if ([401].includes(err.status)) {
              Swal.fire("Error!","No existe ningun toquen de seguridad","error");

            }

            if ([403].includes(err.status)) {
              Swal.fire("Error!","El usuario no tiene los permisos para este módulo","error");

            }

            if ([424].includes(err.status)) {
              Swal.fire("Error!","Ya existe una sesión habierta con este usuario","error");

            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }))
    }

}

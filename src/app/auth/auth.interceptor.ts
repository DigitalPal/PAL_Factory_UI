import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
// http://www.dotnetmob.com/angular-5-tutorial/angular-5-login-and-logout-with-web-api-using-token-based-authentication/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    if (localStorage.getItem('DigitalPalToken') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('DigitalPalToken'))
      });
      return next.handle(clonedreq)
        .do(
          succ => {},
          err => {
            if (err.status === 401) {
              this.router.navigateByUrl('/login');
            }
          }
        );
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}

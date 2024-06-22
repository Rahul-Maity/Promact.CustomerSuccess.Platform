import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.idTokenClaims$.pipe(
        switchMap((claims) => {
            const accessToken = claims?.__raw; // Ensure claims are available
            if (accessToken) {
                const authReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                return next.handle(authReq);
            } else {

                return next.handle(req);
            }
        })
    );
}
}

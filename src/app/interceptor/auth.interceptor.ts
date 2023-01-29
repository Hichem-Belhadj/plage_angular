import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const idToken = localStorage.getItem("access_token");
	if (request.url.includes("/login")) {
		return next.handle(request);
	} else if (idToken) {
		const cloned = request.clone({
			headers: request.headers.set("Authorization","Bearer " + idToken)
		});
		return next.handle(cloned);
	}
	else {
		return next.handle(request);
	}
  }
}

export const tokenInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: AuthInterceptor,
	multi: true,
};

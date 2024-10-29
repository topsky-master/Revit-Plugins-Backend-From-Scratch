import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { ApisService } from "../services/apis.service";
import { environment } from 'src/environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // add auth header with jwt if user is logged in and request is to the api url
  const user = inject(ApisService).userValue;
  const isLoggedIn = user && user.token;
  const isApiUrl = req.url.startsWith(environment.apiEndpoint);
  if (isLoggedIn && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }

  return next(req);
};

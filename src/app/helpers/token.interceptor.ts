import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { JwtService } from "../services/jwt.service";
import { environment } from 'src/environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(JwtService).getToken();

  console.log("token =>", token);
  
  const isApiUrl = req.url.startsWith(environment.apiEndpoint);
  if (token && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

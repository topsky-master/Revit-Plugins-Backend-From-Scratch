import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from 'src/environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `${environment.apiEndpoint}${req.url}` });
  return next(apiReq);
};

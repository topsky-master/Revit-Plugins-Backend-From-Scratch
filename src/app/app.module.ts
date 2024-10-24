// angular import
import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";

// project import
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { JwtService } from "./pages/authentication/services/jwt.service";
import { UserService } from "./pages/authentication/services/user.service";
import { apiInterceptor } from "./pages/authentication/interceptors/api.interceptor";
import { tokenInterceptor } from "./pages/authentication/interceptors/token.interceptor";
import { errorInterceptor } from "./pages/authentication/interceptors/error.interceptor";
import { EMPTY } from "rxjs";

export function initAuth(jwtService: JwtService, userService: UserService) {
  return () => (jwtService.getToken() ? userService.getCurrentUser() : EMPTY);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient(
      withInterceptors([apiInterceptor, tokenInterceptor, errorInterceptor]),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [JwtService, UserService],
      multi: true,
    },
  ]
})
export class AppModule {}

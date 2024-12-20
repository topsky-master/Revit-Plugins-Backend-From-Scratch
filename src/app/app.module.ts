// angular import
import { APP_INITIALIZER, ApplicationConfig } from "@angular/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";

// project import
import { AppComponent } from './app.component';

import { AppRoutes } from './app.routing';

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiInterceptor } from "./helpers/api.interceptor";
import { errorInterceptor } from "./helpers/error.interceptor";
import { tokenInterceptor } from "./helpers/token.interceptor";
import { ApisService } from "./services/apis.service";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
			useHash: true
		}),
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    provideHttpClient( withInterceptors([apiInterceptor, tokenInterceptor, errorInterceptor])),
  ]
  
})
export class AppModule {}

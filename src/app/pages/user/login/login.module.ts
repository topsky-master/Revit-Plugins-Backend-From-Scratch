import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		LoginRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class LoginModule { }

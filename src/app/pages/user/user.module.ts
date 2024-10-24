import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TableModule } from "src/app/shared/table/table.module";
import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user.routing.module";

@NgModule({
	declarations: [
		UserComponent
	],
	imports: [
		UserRoutingModule,
		SharedModule,
		TableModule
	]
})
export class UserModule { }

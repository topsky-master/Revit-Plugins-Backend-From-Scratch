import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TableModule } from "src/app/shared/table/table.module";
import { SubscriptionListComponent } from "./list.component";
import { SubscriptionListRoutingModule } from "./list.routing.module";

@NgModule({
	declarations: [
		SubscriptionListComponent
	],
	imports: [
		SubscriptionListRoutingModule,
		SharedModule,
		TableModule
	]
})
export class SubscriptionListModule { }

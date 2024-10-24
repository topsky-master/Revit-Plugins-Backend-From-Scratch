import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TableModule } from "src/app/shared/table/table.module";
import { FileListComponent } from "./list.component";
import { FileListRoutingModule } from "./list.routing.module";

@NgModule({
	declarations: [
		FileListComponent
	],
	imports: [
		FileListRoutingModule,
		SharedModule,
		TableModule
	]
})
export class FileListModule { }

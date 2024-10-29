// angular import
import { Component } from '@angular/core';
import { User } from './models/user.model';
import { ApisService } from './services/apis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public props
  title = 'architexor-free-version';
  user: User;

	constructor(private apiService: ApisService) {
		this.apiService.currentUser.subscribe(x => this.user = x);
	}

	logout() {
		this.apiService.logout();
	}
}

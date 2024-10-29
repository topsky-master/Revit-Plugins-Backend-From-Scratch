import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map, distinctUntilChanged, tap, shareReplay } from "rxjs/operators";
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { JwtService } from "./jwt.service";

@Injectable({
	providedIn: 'root'
})
export class ApisService {
	apiEndpoint: string = '';
	
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

	constructor(
		private http: HttpClient,
		private router: Router,
    private readonly jwtService: JwtService,
		private util: UtilsService
	) {

	}
	
	public get userValue(): User {
		return this.currentUserSubject.value;
	}

	login(email, password) {
		return this.http.post<User>(`user/login`, { email, password})
			.pipe(map(user => {
				this.setAuth(user);
				this.currentUserSubject.next(user);
				return user;
			}));
  }

	public logout() {
		// remove user from local storage and set current user to null
		localStorage.removeItem('user');
		this.currentUserSubject.next(null);
		this.router.navigate(['/login']);
	}

  getCurrentUser(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>("user").pipe(
      tap({
        next: ({ user }) => this.setAuth(user),
        error: () => this.purgeAuth(),
      }),
      shareReplay(1),
    );
  }

  update(user: Partial<User>): Observable<{ user: User }> {
    return this.http.put<{ user: User }>("user", { user }).pipe(
      tap(({ user }) => {
        this.currentUserSubject.next(user);
      }),
    );
  }
	
  setAuth(user: User): void {
		// console.log(`user => ${JSON.stringify(user)}`);
		if(user) {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			localStorage.setItem('user', JSON.stringify(user));
			this.jwtService.saveToken(user.token);
			this.currentUserSubject.next(user);
		}
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

	sendNotification(msg, title) {
		// const body = {
		// 	app_id: environment.onesignal.appId,
		// 	included_segments: ['Active Users', 'Inactive Users"'],
		// 	headings: { en: title },
		// 	contents: { en: msg },
		// 	data: { task: msg }
		// };
		// const header = {
		// 	headers: new HttpHeaders()
		// 		.set('Content-Type', 'application/json')
		// 		.set('Authorization', `Basic ${environment.onesignal.restKey}`)
		// };
		// return this.http.post('https://onesignal.com/api/v1/notifications', body, header);
	}

	JSON_to_URLEncoded(element, key?, list?) {
		let new_list = list || [];
		if (typeof element === 'object') {
			for (let idx in element) {
				this.JSON_to_URLEncoded(
					element[idx],
					key ? key + '[' + idx + ']' : idx,
					new_list
				);
			}
		} else {
			new_list.push(key + '=' + encodeURIComponent(element));
		}
		return new_list.join('&');
	}

	upload(files: File[]): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Basic', `${environment.authToken}`)
				};
			}

			const formData = new FormData();
			Array.from(files).forEach(f => formData.append('file', f));
			this.http.post(this.apiEndpoint + 'upload', formData).subscribe((data) => {
				this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
		});
	}

	public post(url, body): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Basic', `${environment.authToken}`)
				};
			}
			const param = this.JSON_to_URLEncoded(body);
			this.http.post(this.apiEndpoint + url, param, header).subscribe((data) => {
				this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
			// return this.http.post(this.baseUrl + url, param, header);
		});
	}

	public put(url, body): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Basic', `${environment.authToken}`)
				};
			}
			const param = this.JSON_to_URLEncoded(body);
			this.http.put(this.apiEndpoint + url, param, header).subscribe((data) => {
				this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
			// return this.http.post(this.baseUrl + url, param, header);
		});
	}

	public get(url, params = null, hasNext = false): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Basic', `${environment.authToken}`)
				};
			}
			if(params) {
				header.params = new HttpParams();
				for(var p in params) {
					header.params = header.params.append(p, params[p]);
				}
			}
			this.http.get(this.apiEndpoint + url, header).subscribe((data) => {
				if(!hasNext)
					this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
		});
	}

	public delete(url, params = {}): Promise<any> {
		this.util.showSpinner();
		return new Promise<any>((resolve, reject) => {
			let header;
			if (localStorage.getItem('token')) {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
				};
			}
			else {
				header = {
					headers: new HttpHeaders()
						.set('Content-Type', 'application/x-www-form-urlencoded')
						.set('Basic', `${environment.authToken}`)
				};
			}
			if(params) {
				header.params = new HttpParams();
				for(var p in params)
					header.params.set(p, params[p]);
			}
			this.http.delete(this.apiEndpoint + url, header).subscribe((data) => {
				this.util.hideSpinner();
				resolve(data);
			}, error => {
				this.util.hideSpinner();
				reject(error);
			});
			// return this.http.post(this.baseUrl + url, param, header);
		});
	}
}

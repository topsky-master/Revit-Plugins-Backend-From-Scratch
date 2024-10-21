// angular import
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink, RouterModule } from "@angular/router";

import {
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from "@angular/forms";

import { NgIf } from "@angular/common";
import { Errors } from "src/app/models/errors.model";
import { UserService } from "../services/user.service";
import { ApisService } from "src/app/services/apis.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { first } from "rxjs";
import { ToastrService } from "ngx-toastr";

interface AuthForm {
  email: FormControl<string>;
  password: FormControl<string>;
  username?: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, RouterLink, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export default class LoginComponent implements OnInit {
  authType = "";
  title = "";
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: FormGroup<AuthForm>;
  destroyRef = inject(DestroyRef);

  form: FormGroup;
  loading = false;
	submitted = false;
	returnUrl: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly apiService: ApisService,
		private toastr: ToastrService
  ) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    // get return url from route parameters or default to '/'
		//		this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';
		this.returnUrl = '/dashboard/default';
		if (this.apiService.userValue) {
			this.router.navigate(['/dashboard/default']);
		}
  }

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path;
    this.title = this.authType === "login" ? "Sign in" : "Sign up";
    if (this.authType === "register") {
      this.authForm.addControl(
        "username",
        new FormControl("", {
          validators: [Validators.required],
          nonNullable: true,
        }),
      );
    }
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    // let observable =
    //   this.authType === "login"
    //     ? this.apiService.login(
    //         this.authForm.value as { email: string; password: string },
    //       )
    //     : this.apiService.register(
    //         this.authForm.value as {
    //           email: string;
    //           password: string;
    //           username: string;
    //         },
    //       );

    // observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    //   next: () => void this.router.navigate(["/"]),
    //   error: (err) => {
    //     this.errors = err;
    //     this.isSubmitting = false;
    //   },
    // });

    // stop here if form is invalid
		if (this.authForm.invalid) {
			return;
		}

		this.loading = true;
		this.apiService.login(this.authForm.value as { email: string; password: string })
			.pipe(first())
			.subscribe(
				data => {
          console.log(`data => ${data}`);

					this.router.navigate([this.returnUrl]);
				},
				error => {
					this.toastr.error(
						'<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Invalid credentials</span>',
						"",
						{
							timeOut: 4000,
							enableHtml: true,
							closeButton: true,
							toastClass: "alert alert-danger alert-with-icon",
							positionClass: "toast-top-right"
						}
					);
					this.loading = false;
				});

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isSubmit = false;
  selectedRole!: string;
  isLogin: any;
  profileInfo: any;
  profile: any;
  error: any;
  non: String = `Don't have an account? `;
  banques: any = ['BMCI', 'BNM'];
  role: any;
  constructor(
    private builder: FormBuilder,
    private service_auth: AuthService,
    private route: Router,
    private toastr: ToastrService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 600px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  motPasseForm = this.builder.group({
    password: ['', Validators.required],
    email: ['', Validators.required],
  });
  professeurForm = this.builder.group({
    accountNumero: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    banque: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  isEditable = true;
  isDisabled = true;
  ngOnInit(): void {}

  errorMessage: any;

  signup() {
    if (this.motPasseForm.valid) {
      let data = {
        password: this.motPasseForm.value.password,
        email: this.motPasseForm.value.email,
        banque: this.professeurForm.value.banque,
        accountNumero: this.professeurForm.value.accountNumero,
      };

      this.service_auth.signup(data).subscribe({
        next: (res: any) => {
          this.route.navigate(['../auth/login']);
          this.toastr.success(`${res.message}`, `${res.status}`);
        },
        error: (err: any) => {
          this.toastr.error(`${err.error.message}`, `${err.error.status}`);
        },
      });
    }
  }

  verification() {
    this.isSubmit = true;
    if (this.motPasseForm.invalid) return;
    this.profile = this.service_auth
      .verification(this.motPasseForm.value)
      .subscribe({
        next: (res) => {
          this.role = res.data.user.role;
          this.toastr.success(`${res.message}`, `${res.status}`);
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'échec');
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  isSubmit = false;
  isLogin: any;
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.builder.group({
      password: this.builder.control('', Validators.required),
      passwordConfirm: this.builder.control('', Validators.required),
      token: this.builder.control('', Validators.required),
    });
  }

  reset() {
    this.isSubmit = true;
    if (this.resetForm.invalid) return;
    this.service
      .reset(this.resetForm.value, this.resetForm.value.token)
      .subscribe(
        (res: any) => {
          this.route.navigate(['admin/login']);
          this.toastr.success(
            `Welcome  ${localStorage.getItem('role')} !`,
            `${res.status}`
          );
        },
        (err) => {
          this.toastr.error(err.error, 'échec');
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {
  forgetForm!: FormGroup;
  isSubmit = false;
  constructor(
    private builder: FormBuilder,
    private auth_service: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.forgetForm = this.builder.group({
      email: this.builder.control('', [Validators.required, Validators.email]),
    });
  }
  ngOnInit(): void {}

  forget() {
    this.isSubmit = true;
    if (this.forgetForm.invalid) return;
    this.auth_service.forgetPassword(this.forgetForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(`${res.message}`, `${res.status}`);
        this.forgetForm.reset();
      },
      error: (err: any) => {
        this.toastr.error(`${err.error.message}`, `${err.error.status}`);
      },
    });
  }
}

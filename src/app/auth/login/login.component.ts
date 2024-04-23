import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SideNavInterface } from 'src/app/sidenav/types/side-nav.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, AfterViewInit {
  // @ViewChild(SidenavComponent) sideNavData?: SidenavComponent;
  isSideNavCollapsed = false;
  screenWidth = 0;
  loginForm!: FormGroup;
  collapsed = true;
  isSubmit = false;
  isLogin: any;
  error: any;
  non: String = `Don't have an account? `;
  role: any;
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {
    this.loginForm = this.builder.group({
      email: this.builder.control('', [Validators.required, Validators.email]),
      password: this.builder.control('', Validators.required),
    });
  }
  ngAfterViewInit(): void {
    //console.log(this.sideNavData?.datafromSideBare);
  }

  getBodyClass(): string {
    let styleClass = '';

    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.isSideNavCollapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
  onToggleSideNav(data: SideNavInterface): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    console.log('collapsed', this.collapsed);
    console.log('screenWidth', this.screenWidth);
  }
  ngOnInit(): void {}

  login() {
    this.isSubmit = true;
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('data', res.data);
        localStorage.setItem('token', res.token);
        this.route.navigate(['homme']);
        /*    if (localStorage.getItem('role') == 'professeur') {
          this.prof_service
            .getProfesseurByEmail(localStorage.getItem('email'))
            .subscribe({
              next: (re: any) => {
                localStorage.setItem('prof_id', re.professeur._id);
              },
              error: (err: any) => {
                console.log(err);
              },
            });
        } */
        this.isLogin = true;

        /*   this.toastr.success(
          `Welcome  ${localStorage.getItem('role')} !`,
          `${res.status}`
        ); */
      },
      error: (err) => {
        console.log(err.message);
        // this.toastr.error(this.error, 'fail');
      },
    });
  }
}

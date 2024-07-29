import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  userForm: FormGroup;
  isSubmit = false;
  selectedRole!: string;
  isLogin: any;
  profileInfo: any;
  profile: any;
  error: any;
  non: String = `Don't have an account? `;
  banques: any = ['BMCI', 'BNM'];
  role: any;
  photo: any;
  fileIsSelected = false;
  selectedFileName = null;
  file: any;
  constructor(
    private builder: FormBuilder,
    private service: UserService,
    private route: Router,
    private toastr: ToastrService,
    private store_service: StoreService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 600px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.userForm = this.builder.group({
      nom: this.builder.control('', Validators.required),
      prenom: this.builder.control('', Validators.required),
      mobile: this.builder.control('', Validators.required),
      email: this.builder.control('', [Validators.required, Validators.email]),
    });
  }
  motPasseForm = this.builder.group({
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    role: ['', Validators.required],
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
  ngOnInit(): void {
    this.store_service.changeBarDataAction(
      'Ajouter un(e) utilisateur',
      'button',
      ['filter_list', 'add'],
      ['', 'ajouter'],
      [false, false],
      [true, true]
    );
  }
  uploads(event: any) {
    const file = event.currentTarget.files[0];
    const file_name = file.name;
    const file_type = file.type;
    const file_size = file.size;
    this.selectedFileName = file_name;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.photo = reader.result;
    };
    if (['image/png', 'image/jpeg'].includes(file_type)) {
      this.fileIsSelected = true;
      this.file = file;
    } else {
      this.toastr.error(
        `Le type de fichier sélectionné doit ètre xlsx`,
        'échec'
      );
      this.selectedFileName = null;
      this.file = null;
      this.fileIsSelected = false;
    }
    debugger;
  }
  errorMessage: any;

  onFormSubmit() {
    console.log(this.file);
    const formdata = new FormData();
    formdata.append('image', this.file);
    formdata.append('nom', this.userForm.value.nom);
    formdata.append('prenom', this.userForm.value.prenom);
    formdata.append('email', this.userForm.value.email);
    formdata.append('mobile', this.userForm.value.mobile);

    if (this.userForm.valid && this.motPasseForm.valid) {
      let data = {
        nom: this.userForm.value.nom,
        prenom: this.userForm.value.prenom,
        email: this.userForm.value.email,
        mobile: this.userForm.value.mobile,
        password: this.motPasseForm.value.password,
        passwordConfirm: this.motPasseForm.value.passwordConfirm,
        role: this.motPasseForm.value.role,
        banque: this.professeurForm.value.banque,
        accountNumero: this.professeurForm.value.accountNumero,
      };
      this.service.addUser(data).subscribe({
        next: (res: any) => {
          this.route.navigate(['../admin/users']);
          this.toastr.success(`${res.message}`, `${res.status}`);
        },
        error: (err: any) => {
          console.warn(err);
          console.warn(
            '-----------------------------------------------------err.error'
          );

          if (err.error.error) {
            if (err.error.error.errors) {
              let ms = '';
              ms = err.error.error.errors.passwordConfirm
                ? `${err.error.error.errors.passwordConfirm.message}`
                : '';
              if (ms === '') {
                ms = err.error.error.errors.accountNumero
                  ? `${err.error.error.errors.accountNumero.message}`
                  : 'Erreur de validation !';
              }

              this.toastr.error(ms, `erreur`);
            } else if (err.error.error.code === 11000) {
              // Duplicate key error
              let ms =
                err.error.error.keyValue.email ||
                err.error.error.keyValue.mobile
                  ? 'Veuillez vérifier votre e-mail et votre numéro de téléphone !'
                  : '';
              this.toastr.error(ms, `erreur`);
            } else {
              this.toastr.error(`${err.error.message}`, `${err.error.status}`);
            }
          } else {
            // Other errors
            this.toastr.error(`${err.error}`, `erreur`);
          }
        },
      });
    }
  }
}

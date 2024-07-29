import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss'],
})
export class UserAddEditComponent implements OnInit {
  userForm: FormGroup;
  banques: any = ['BMCI', 'BNM'];
  photo: any;
  isSubmit = false;
  fileIsSelected = false;
  selectedRole!: string;
  role: any;
  selectedFileName = null;
  file: any;
  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private _dialog: MatDialogRef<UserAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.photo = data ? data.photo : '';
    this.selectedRole = data ? data.role : '';
    this.file = data ? data.photo : '';
    this.userForm = this.builder.group({
      nom: this.builder.control('', Validators.required),
      prenom: this.builder.control('', Validators.required),
      mobile: this.builder.control('', Validators.required),
      email: this.builder.control('', [Validators.required, Validators.email]),
      role: this.builder.control('', Validators.required),
      password: this.builder.control('', Validators.required),
      passwordConfirm: this.builder.control('', Validators.required),
      accountNumero: this.builder.control(
        data && data.professeur ? data.professeur.accountNumero : '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]
      ),
      banque: this.builder.control(
        data && data.professeur ? data.professeur.banque : '',
        Validators.required
      ),
    });
  }
  uploads(event: any) {
    const file = event.currentTarget.files[0];
    const file_name = file.name;
    console.log(file);
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
        `Le type de fichier sélectionné doit ètre png ou jpeg`,
        'échec'
      );
      this.selectedFileName = null;
      this.file = null;
      this.fileIsSelected = false;
    }
    // debugger;
  }
  onFormSubmit() {
    this.isSubmit = true;
    console.log(this.userForm.value);
    console.log(this.file);
    const formdata = new FormData();
    formdata.append('image', this.file);
    formdata.append('nom', this.userForm.value.nom);
    formdata.append('prenom', this.userForm.value.prenom);
    formdata.append('email', this.userForm.value.email);
    formdata.append('mobile', this.userForm.value.mobile);
    formdata.append('accountNumero', this.userForm.value.accountNumero);
    formdata.append('banque', this.userForm.value.banque);
    if (!this.data) {
      formdata.append('password', this.userForm.value.password);
      formdata.append('passwordConfirm', this.userForm.value.passwordConfirm);
    }

    if (this.userForm.valid && !this.data) {
      this.userService.addUser(formdata).subscribe({
        next: (res) => {
          this.toastr.success(`${res.message} `, `${res.status}`);
          this._dialog.close(true);
        },
        error: (err) => {
          this.toastr.error(`${err.error.message}`, `échec`);
        },
      });
      // console.log(this.userForm.value);
    } else if (
      this.data &&
      this.userForm.get('nom')?.valid &&
      this.userForm.get('prenom')?.valid &&
      this.userForm.get('email')?.valid &&
      this.userForm.get('mobile')?.valid &&
      this.file
    ) {
      this.userService.updateUser(this.data._id, formdata).subscribe({
        next: (val: any) => {
          this.toastr.success(`${val.message} `, `${val.status}`);
          this._dialog.close(true);
        },
        error: (err) => {
          this.toastr.error(`${err.error.message}`, `échec`);
        },
      });
    }
  }
  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }
}

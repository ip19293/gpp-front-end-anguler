import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfesseurService } from '../../services/professeur.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-professeur-add-edit',
  templateUrl: './professeur-add-edit.component.html',
  styleUrls: ['./professeur-add-edit.component.scss'],
})
export class ProfesseurAddEditComponent implements OnInit {
  faCloudUpload = faCloudUpload;
  selectedFileName = null;
  selectedType: String = 'un';
  Types: string[] = ['un', 'plusieurs'];
  fileIsSelected = false;
  validSelectedFileType = false;
  file: any;
  users: any;
  professeurForm!: FormGroup;
  fileForm!: FormGroup;
  banques: any = ['BMCI', 'BNM'];

  constructor(
    private builder: FormBuilder,
    private service: ProfesseurService,
    private user_services: UserService,
    private toastr: ToastrService,
    private _dialog: MatDialogRef<ProfesseurAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.getUsers();
    this.professeurForm = this.builder.group({
      user: ['', Validators.required],
      accountNumero: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      banque: ['', Validators.required],
    });
    this.professeurForm.patchValue(this.data);
    this.fileForm = this.builder.group({
      file: ['', Validators.required],
    });
  }
  getUsers() {
    this.user_services.getAllUsers({ role: 'professeur' }).subscribe((res) => {
      this.users = res.users;
    });
  }
  beforUpload(event: any): void {
    this.file = event.currentTarget.files[0];
    const file_name = event.currentTarget.files[0].name;
    const file_type = event.currentTarget.files[0].type;
    this.selectedFileName = file_name;
    if (
      file_type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      this.validSelectedFileType = true;
    }
  }
  uploads() {
    if (this.fileForm.valid) {
      if (this.validSelectedFileType) {
        this.fileIsSelected = true;
        const formdata = new FormData();
        formdata.append('file', this.file);
        this.service.uploadProfesseurs(formdata).subscribe({
          next: (res) => {
            this.toastr.success(`${res.message}`, `${res.status}`);
          },
          error: (err) => {
            this.toastr.error(`${err.error.message}`, 'échec');
          },
        });
      } else {
        this.toastr.error(
          `Le type de fichier sélectionné doit ètre xlsx`,
          'échec'
        );
        this.selectedFileName = null;
        this.file = null;
        this.fileIsSelected = false;
      }
    }
  }
  onTypeChange(event: any) {
    // console.log(event.value);
    let type = event.value;
  }
  onFormSubmit() {
    if (this.professeurForm.valid) {
      if (this.data) {
        this.service
          .updateProfesseur(this.data._id, this.professeurForm.value)
          .subscribe({
            next: (res: any) => {
              this.toastr.success(`${res.message}`, `${res.status}`);
              this._dialog.close(true);
            },
            error: (err: any) => {
              this.toastr.error(`${err.error.message}`, `échec`);
            },
          });
      } else {
        this.service.addProfesseur(this.professeurForm.value).subscribe({
          next: (res: any) => {
            this.toastr.success(`${res.message}`, `${res.status}`);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `échec`);
          },
        });
      }
    } else {
      this.toastr.error(`Le donnee n'est pas valide`, `échec`);
    }
  }
}

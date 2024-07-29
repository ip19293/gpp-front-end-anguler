import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiliereService } from '../../services/filiere.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filiere-add-edit',
  templateUrl: './filiere-add-edit.component.html',
  styleUrls: ['./filiere-add-edit.component.scss'],
})
export class FiliereAddEditComponent implements OnInit {
  filliereForm!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: FiliereService,
    private _dialog: MatDialogRef<FiliereAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.filliereForm = this.builder.group({
      name: ['', Validators.required],
      niveau: ['', Validators.required],
      isPaireSemestre: ['', Validators.required],
      semestres: ['', Validators.required],
    });
    this.filliereForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.filliereForm.valid) {
      if (this.data) {
        this.service
          .updateFilliere(this.data._id, this.filliereForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success(`${val.message}`, `${val.status} `);
              this._dialog.close(true);
            },
            error: (err: any) => {
              let er = err.error.error;
              if (er.code == 11000) {
                this.toastr.error(
                  `duplicate filliere name ${er.keyValue.name} !`,
                  `${err.error.status} `
                );
              } else {
                console.warn(err.error.error.code);
                this.toastr.error(
                  `${err.error.message}`,
                  `${err.error.status} `
                );
              }
            },
          });
      } else {
        this.service.addFilliere(this.filliereForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(`${val.message}`, `${val.status} `);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status} `);
          },
        });
      }
      console.log(this.filliereForm.value);
    }
  }
}

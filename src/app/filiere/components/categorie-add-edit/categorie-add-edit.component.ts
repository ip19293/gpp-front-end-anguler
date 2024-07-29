import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../../services/categorie.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorie-add-edit',
  templateUrl: './categorie-add-edit.component.html',
  styleUrls: ['./categorie-add-edit.component.scss'],
})
export class CategorieAddEditComponent implements OnInit {
  categorieForm!: FormGroup;
  constructor(
    private builder: FormBuilder,
    private service: CategorieService,
    private _dialog: MatDialogRef<CategorieAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.categorieForm = this.builder.group({
      name: ['', Validators.required],
      prix: ['', Validators.required],
    });
    this.categorieForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.categorieForm.valid) {
      if (this.data) {
        this.service
          .updateCategorie(this.data._id, this.categorieForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success(`${val.message}`, `${val.status} `);
              this._dialog.close(true);
            },
            error: (err: any) => {
              let er = err.error.error;
              if (er.code == 11000) {
                this.toastr.error(
                  `Le nom de categorie dupliquée ${er.keyValue.name} !`,
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
        this.service.addCategorie(this.categorieForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(`${val.message}`, `${val.status} `);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status} `);
          },
        });
      }
      console.log(this.categorieForm.value);
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementService } from 'src/app/filiere/services/element.service';
import { ProfesseurService } from '../../services/professeur.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FiliereService } from 'src/app/filiere/services/filiere.service';

@Component({
  selector: 'app-prof-elements-add-edit',
  templateUrl: './prof-elements-add-edit.component.html',
  styleUrls: ['./prof-elements-add-edit.component.scss'],
})
export class ProfElementsAddEditComponent implements OnInit {
  elementForm: FormGroup;
  filieres: any;
  elements: any;
  filiereSelected: any;
  id: any;
  constructor(
    private builder: FormBuilder,
    private service_element: ElementService,
    private service_filiere: FiliereService,
    private service_professeur: ProfesseurService,
    private toastr: ToastrService,
    private _dialog: MatDialogRef<ProfElementsAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = localStorage.getItem('prof_id');
    this.elementForm = this.builder.group({
      element: ['', Validators.required],
      filiere: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getfilieres();
  }
  onFormSubmit() {
    if (this.elementForm.valid) {
      console.log(this.id);
      this.service_professeur
        .addMatiereToProfesseur(
          this.id,
          this.elementForm.value.element,
          this.elementForm.value
        )
        .subscribe({
          next: (val: any) => {
            this.toastr.success(`${val.message}`, `${val.status}`);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status}`);
          },
        });

      // console.log(this.elementForm.value);
    }
  }

  getfilieres() {
    this.service_filiere.getAllFillieres().subscribe((res: any) => {
      this.filieres = res.filieres;
      //console.log(this.filieres);
    });
  }

  onFiliereSelected(filiereSelected: any) {
    if (this.filiereSelected != null) {
      this.service_element
        .getAllElements({ filiere: this.filiereSelected })
        .subscribe((res: any) => {
          this.elements = res.elements;
        });
    }
  }
}

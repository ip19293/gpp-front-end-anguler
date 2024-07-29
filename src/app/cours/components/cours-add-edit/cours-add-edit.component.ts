import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ElementService } from 'src/app/filiere/services/element.service';
import { ProfesseurService } from 'src/app/user/services/professeur.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cours-add-edit',
  templateUrl: './cours-add-edit.component.html',
  styleUrls: ['./cours-add-edit.component.scss'],
})
export class CoursAddEditComponent implements OnInit {
  coursForm!: FormGroup;
  elements: any;
  groupes: any;
  professeurSelected: any;
  professeurs: any;
  matiere: any;
  debit_cours: any;
  typeSelected: any;
  elementSelected: any;
  CM: any;
  TP: any;
  TD: any;
  constructor(
    private builder: FormBuilder,
    private service: CoursService,
    private _dialog: MatDialogRef<CoursAddEditComponent>,
    private service_element: ElementService,
    private service_professeur: ProfesseurService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.debit_cours = [
      {
        date: '8H:00',
        value: '8:00',
      },
      {
        date: '8H:30',
        value: '8:30',
      },

      {
        date: '8H:45',
        value: '8:45',
      },
      {
        date: '9H',
        value: '9:00',
      },
      {
        date: '9H:30',
        value: '9:30',
      },
      {
        date: '9H:45',
        value: '9:45',
      },
      {
        date: '10H',
        value: '10:00',
      },
      {
        date: '10H:30',
        value: '10:30',
      },
      {
        date: '10H:45',
        value: '10:45',
      },
      {
        date: '11H',
        value: '11:00',
      },
      {
        date: '11H:30',
        value: '11:30',
      },
      {
        date: '11H:45',
        value: '11:45',
      },
      {
        date: '12H',
        value: '12:00',
      },
      {
        date: '12H:30',
        value: '12:30',
      },
      {
        date: '12H:45',
        value: '12:45',
      },
      {
        date: '13H',
        value: '13:00',
      },
      {
        date: '13H:30',
        value: '13:30',
      },
      {
        date: '13H:45',
        value: '13:45',
      },
      {
        date: '14H',
        value: '14:00',
      },
      {
        date: '14H:30',
        value: '14:30',
      },
      {
        date: '14H:45',
        value: '14:45',
      },
      {
        date: '15H',
        value: '15:00',
      },
      {
        date: '15H:30',
        value: '15:30',
      },
      {
        date: '15H:45',
        value: '15:45',
      },
      {
        date: '16H',
        value: '16:00',
      },
      {
        date: '16H:30',
        value: '16:30',
      },
      {
        date: '16H:45',
        value: '16:45',
      },
      {
        date: '17H',
        value: '17:00',
      },
      {
        date: '17H:30',
        value: '17:30',
      },
      {
        date: '17H:45',
        value: '17:45',
      },
    ];

    this.coursForm = this.builder.group({
      date: this.builder.control('', Validators.required),
      nbh: this.builder.control(data ? data.nbh : 1.5, Validators.required),
      startTime: this.builder.control(
        data ? data.startTime : '8:30',
        Validators.required
      ),
      professeur: this.builder.control('', Validators.required),
      groupe: this.builder.control('', Validators.required),
      element: this.builder.control('', Validators.required),
      type: this.builder.control('', Validators.required),
    });

    this.coursForm
      .get('professeur')
      ?.valueChanges.subscribe(async (res: any) => {
        if (res != '') {
          this.service_professeur.getElements(res).subscribe((res: any) => {
            this.elements = res.elements;
            this.cd.detectChanges();
          });
        }
      });

    this.coursForm.get('type')?.valueChanges.subscribe(async (res: any) => {
      this.elementSelected = this.coursForm.value.element;
      if (res != '') {
        let element = this.elements?.filter(
          (EE: any) => EE._id === this.elementSelected
        );
        if (element) {
          this.groupes = element[0][res];
        }

        this.cd.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    this.getProfesseurs();
    if (this.data) {
      this.getElements();
    }
    this.coursForm.patchValue(this.data);
  }
  onFormSubmit() {
    console.log(this.coursForm.value);
    if (this.coursForm.valid) {
      if (this.data) {
        console.log(this.coursForm.value);
        this.service
          .updateCours(this.data._id, this.coursForm.value)
          .subscribe({
            next: (val: any) => {
              this.toastr.success(`${val.message}`, `${val.status}`);
              this._dialog.close(true);
            },
            error: (err: any) => {
              this.toastr.error(`${err.error.message}`, `${err.error.status}`);
            },
          });
      } else {
        this.service.addCours(this.coursForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(`cours create success !`, `${val.status}`);
            this._dialog.close(true);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status}`);
          },
        });
      }
      console.log(this.coursForm.value);
    } else {
      this.toastr.error('invalid! data');
    }
  }

  getProfesseurs() {
    this.service_professeur.getAllProfesseurs({}).subscribe((res: any) => {
      this.professeurs = res.professeurs;
    });
  }
  getElements() {
    this.service_professeur
      .getElements(this.data.professeur)
      .subscribe((res: any) => {
        console.log(res);
        let element = res.elements.filter(
          (EE: any) => EE._id === this.data.element
        );
        console.log(element);
        this.groupes = element[0][this.data.type];
      });
  }

  onprofesseurSelected(professeurSelected: any) {
    if (this.professeurSelected != null) {
      this.service_professeur
        .getProfesseur(this.professeurSelected)
        .subscribe((res: any) => {
          this.elements = res.elements;
        });
    }
  }

  onTypeSelected(typeSelected: any) {
    if (this.typeSelected != null && this.coursForm.value.element != null) {
      if (typeSelected != null && this.elementSelected != null) {
        let element = this.elements.filter(
          (EE: any) => EE._id === this.coursForm.value.element
        );
        this.groupes = element[0][typeSelected];
      }
    }
  }
}

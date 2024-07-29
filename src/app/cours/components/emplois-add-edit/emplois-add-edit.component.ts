import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ElementService } from 'src/app/filiere/services/element.service';
import { EmploiService } from 'src/app/filiere/services/emploi.service';
import { FiliereService } from 'src/app/filiere/services/filiere.service';

@Component({
  selector: 'app-emplois-add-edit',
  templateUrl: './emplois-add-edit.component.html',
  styleUrls: ['./emplois-add-edit.component.scss'],
})
export class EmploisAddEditComponent implements OnInit {
  emploiForm!: FormGroup;
  daysOfWeek: string[] = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];

  elements: any;
  filieres: any;
  categorie: any;
  categorieSelected: any;
  professeurs: any;
  groupes: any[] = [];
  emploi_types: any[] = [];
  semestres: any;
  matieres: any;
  matiere: any;
  debit_plan: any;
  elementSelected: any;
  semestreSelected: any;
  data2: any;
  id: any;
  idS: any;
  CM: any;
  TP: any;
  TD: any;
  constructor(
    private builder: FormBuilder,
    private _dialog: MatDialogRef<EmploisAddEditComponent>,
    private service: EmploiService,
    private service_element: ElementService,
    private service_filiere: FiliereService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.debit_plan = [
      {
        date: '8H:00',
        value: '8:00',
      },

      {
        date: '9H:45',
        value: '9:45',
      },
      {
        date: '11H:30',
        value: '11:30',
      },
      {
        date: '15H:00',
        value: '15:00',
      },
      {
        date: '17H:00',
        value: '17:00',
      },
    ];
    this.emploiForm = this.builder.group({
      filiere: [this.data ? this.data.filiere : '', Validators.required],
      element: [this.data ? this.data.element : '', Validators.required],
      type: [this.data ? this.data.type : '', Validators.required],
      groupe: [this.data ? this.data.groupe : '', Validators.required],
      dayNumero: [this.data ? this.data.dayNumero : '', Validators.required],
      startTime: [this.data ? this.data.startTime : '', Validators.required],
      nbh: [1.5, Validators.required],
    });
    this.emploiForm.get('filiere')?.valueChanges.subscribe(async (res: any) => {
      if (res != '') {
        this.service_element
          .getAllElements({
            filiere: res,
          })
          .subscribe(async (el: any) => {
            this.elements = el.elements;
            this.cd.detectChanges();
          });
      }
    });

    this.emploiForm
      .get('element')
      ?.valueChanges.subscribe(async (element: any) => {
        if (element != '') {
          this.emploi_types = ['CM', 'TP', 'TD'];
          this.cd.detectChanges();
        }
      });
    this.emploiForm
      .get('type')
      ?.valueChanges.subscribe(async (emploi_type: any) => {
        if (emploi_type != '') {
          let element = this.elements?.filter(
            (EE: any) => EE._id === this.emploiForm.value.element
          );
          if (element) {
            this.groupes = element[0][emploi_type];
          }

          this.cd.detectChanges();
        }
      });
  }
  ngOnInit(): void {
    this.getFillieres();
    if (this.data) {
      this.getElements();
    }
  }

  getFillieres() {
    this.service_filiere.getAllFillieres().subscribe((res) => {
      this.filieres = res.filieres;
    });
  }
  getElements() {
    this.service_element
      .getAllElements({
        filiere: this.data.filiere,
      })
      .subscribe(async (el: any) => {
        this.elements = el.elements;
        let element = el.elements.filter(
          (EE: any) => EE._id === this.data.element
        );
        this.emploi_types = ['CM', 'TP', 'TD'];
        this.groupes = element[0][this.data.type];
      });
  }
  onFormSubmit() {
    if (this.emploiForm.valid) {
      console.log(this.data);
      if (this.data) {
        this.service
          .updateEmploi(this.data._id, this.emploiForm.value)
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
        for (let emploi of this.emploiForm.value.emplois) {
          this.service.addEmploi(emploi).subscribe({
            next: (val: any) => {
              this.toastr.success(`${val.message}`, `${val.status}`);
              this._dialog.close(true);
            },
            error: (err: any) => {
              this.toastr.error(`${err.error.message}`, `${err.error.status}`);
            },
          });
        }
      }
      console.log(this.emploiForm.value);
    } else {
      this.toastr.error('invalid! data');
    }
  }
}

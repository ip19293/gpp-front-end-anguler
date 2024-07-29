import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ElementService } from 'src/app/filiere/services/element.service';
import { EmploiService } from 'src/app/filiere/services/emploi.service';
import { FiliereService } from 'src/app/filiere/services/filiere.service';
import { ProfesseurService } from 'src/app/user/services/professeur.service';

@Component({
  selector: 'app-emplois-form',
  templateUrl: './emplois-form.component.html',
  styleUrls: ['./emplois-form.component.scss'],
})
export class EmploisFormComponent implements OnInit {
  elementsByFiliere: { [key: number]: any[] } = {};
  typesByElements: { [key: number]: any[] } = {};
  groupesByElementType: { [key: number]: any[] } = {};
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
    private _dialog: MatDialogRef<EmploisFormComponent>,
    private service: EmploiService,
    private service_element: ElementService,
    private service_filiere: FiliereService,
    private service_professeur: ProfesseurService,
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
      emplois: this.builder.array([this.createEmploi()]),
    });
  }
  ngOnInit(): void {
    this.getFillieres();
  }

  onFiliereChange(value: any, index: number) {
    if (value != '') {
      this.service_element
        .getAllElements({
          filiere: value,
        })
        .subscribe(async (el: any) => {
          this.elementsByFiliere[index] = el.elements;
          this.cd.detectChanges();
        });
      const emploisFormArray = this.emploiForm.get('emplois') as FormArray;
      const emploisFormGroup = emploisFormArray.at(index) as FormGroup;
      emploisFormGroup.get('element')?.setValue('');
      emploisFormGroup.get('element')?.enable();
      emploisFormGroup.get('element')?.setValidators(Validators.required);
      //--------------------------------------------------
      emploisFormGroup.get('type')?.setValue('');
      emploisFormGroup.get('type')?.enable();
      emploisFormGroup.get('type')?.setValidators(Validators.required);
      //--------------------------------------------------------
      emploisFormGroup.get('groupe')?.setValue('');
      emploisFormGroup.get('groupe')?.enable();
      emploisFormGroup.get('groupe')?.setValidators(Validators.required);
    }
  }

  onElementChange(value: any, index: number) {
    if (value != '') {
      const emploisFormArray = this.emploiForm.get('emplois') as FormArray;
      const emploisFormGroup = emploisFormArray.at(index) as FormGroup;
      this.typesByElements[index] = ['CM', 'TP', 'TD'];
      //--------------------------------------------------
      emploisFormGroup.get('type')?.setValue('');
      emploisFormGroup.get('type')?.enable();
      emploisFormGroup.get('type')?.setValidators(Validators.required);
      //--------------------------------------------------------
      emploisFormGroup.get('groupe')?.setValue('');
      emploisFormGroup.get('groupe')?.enable();
      emploisFormGroup.get('groupe')?.setValidators(Validators.required);
    }
  }
  onTypeChange(emploiType: any, elementID: any, index: number) {
    const emploisFormArray = this.emploiForm.get('emplois') as FormArray;
    const emploisFormGroup = emploisFormArray.at(index) as FormGroup;

    if (elementID != '' && emploiType != '') {
      let elem: any;
      let element = this.getElementsForEmploi(index).filter(
        (EE: any) => EE._id === elementID
      );
      console.log(element[0][emploiType]);
      this.groupesByElementType[index] = element[0][emploiType];
      /*
      emploisFormGroup.get('groupe')?.setValue('');
      emploisFormGroup.get('groupe')?.enable();
      emploisFormGroup.get('groupe')?.setValidators(Validators.required); */
      this.cd.detectChanges();
    }
  }
  getElementsForEmploi(index: number): any[] {
    return this.elementsByFiliere[index] || [];
  }
  getTypesForEmploi(index: number): any[] {
    return this.typesByElements[index] || [];
  }
  getGroupesForEmploi(index: number): any[] {
    return this.groupesByElementType[index] || [];
  }

  getGroupeForEmploi(index: number): any {
    const emploisFormArray = this.emploiForm.get('emplois') as FormArray;
    const emploisFormGroup = emploisFormArray.at(index) as FormGroup;
    if (
      emploisFormGroup.get('element')?.value != '' &&
      emploisFormGroup.get('type')?.value != ''
    ) {
      let elm = this.elements?.filter(
        (element: any) => (element._id = emploisFormGroup.get('element')?.value)
      );
      //console.log(elm[0][emploisFormGroup.get('type')?.value]);
      return elm[0][emploisFormGroup.get('type')?.value];
    } else {
      return [];
    }
  }

  getFillieres() {
    this.service_filiere.getAllFillieres().subscribe((res) => {
      this.filieres = res.filieres;
    });
  }

  getProfesseurs() {
    this.service_professeur.getAllProfesseurs().subscribe((res) => {
      this.professeurs = res.professeurs;
    });
  }
  get emplois() {
    return this.emploiForm.get('emplois') as FormArray;
  }
  addEmploi() {
    this.emplois.push(this.createEmploi());
  }
  createEmploi(): FormGroup {
    return this.builder.group({
      filiere: [this.data ? this.data.filiere : '', Validators.required],
      element: [this.data ? this.data.element : '', Validators.required],
      type: [this.data ? this.data.type : '', Validators.required],
      groupe: [this.data ? this.data.groupe : '', Validators.required],
      dayNumero: [this.data ? this.data.dayNumero : '', Validators.required],
      startTime: [this.data ? this.data.startTime : '', Validators.required],
      nbh: [1.5, Validators.required],
    });
  }
  removeEmploi(index: number) {
    this.emplois.removeAt(index);
  }

  onFormSubmit() {
    if (this.emploiForm.valid) {
      console.log(this.data);
      if (this.data) {
        this.service
          .updateEmploi(this.data._id, this.emploiForm.value.emplois[0])
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

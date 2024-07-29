import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ElementService } from '../../services/element.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-groupe-affectation',
  templateUrl: './groupe-affectation.component.html',
  styleUrls: ['./groupe-affectation.component.scss'],
})
export class GroupeAffectationComponent implements OnInit {
  elementForm!: FormGroup;
  id: any;

  constructor(
    private builder: FormBuilder,
    private _dialog: MatDialogRef<GroupeAffectationComponent>,
    private service_element: ElementService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = localStorage.getItem('filiere');
  }

  ngOnInit(): void {
    // this.elementForm.patchValue(this.data);
    this.elementForm = this.builder.group({
      CM: this.builder.array([]),
      TP: this.builder.array([]),
      TD: this.builder.array([]),
    });
    this.setFormData();
  }

  get CM(): FormArray {
    return this.elementForm.get('CM') as FormArray;
  }

  get TP(): FormArray {
    return this.elementForm.get('TP') as FormArray;
  }

  get TD(): FormArray {
    return this.elementForm.get('TD') as FormArray;
  }

  parseData(data: string[]): any[] {
    const groupedData = data.reduce((acc: any, item: any) => {
      //const [professeur, group, groupNumber] = item.groupe.split('-');
      const [professeur, group, groupNumber] = item.split('-');
      const groupNumberInt = parseInt(groupNumber);

      // If the professeur is already in the accumulator, push the new group number
      if (acc[professeur]) {
        acc[professeur].groupe.push(groupNumberInt);
      } else {
        // Otherwise, create a new entry for the professeur
        acc[professeur] = { professeur, groupe: [groupNumberInt] };
      }

      return acc;
    }, {});

    // Convert the groupedData object back to an array
    return Object.values(groupedData);
  }

  setFormData(): void {
    const cmData = this.parseData(this.data.CM);
    const tpData = this.parseData(this.data.TP);
    const tdData = this.parseData(this.data.TD);
    cmData.forEach((cm: any) => {
      this.CM.push(
        this.builder.group({
          professeur: this.builder.control(cm.professeur),
          groupe: this.builder.array(
            cm.groupe.map((g: any) => this.builder.control(g))
          ),
        })
      );
    });
    //add input for professeur that not have any groupe CM
    this.data.professeurCM.forEach((pr: any) => {
      const hasGroupe = this.data.CM.some(
        (el: any) => el.split('-')[0] === pr._id
      );
      if (!hasGroupe) {
        this.CM.push(
          this.builder.group({
            professeur: this.builder.control(pr._id),
            groupe: this.builder.array([]),
          })
        );
      }
    });

    tpData.forEach((tp) => {
      this.TP.push(
        this.builder.group({
          professeur: this.builder.control(tp.professeur),
          groupe: this.builder.array(
            tp.groupe.map((g: any) => this.builder.control(g))
          ),
        })
      );
    });

    //add input for professeur that not have any groupe TP
    this.data.professeurTP.forEach((pr: any) => {
      const hasGroupe = this.data.TP.some(
        (el: any) => el.split('-')[0] === pr._id
      );
      if (!hasGroupe) {
        this.TP.push(
          this.builder.group({
            professeur: this.builder.control(pr._id),
            groupe: this.builder.array([]),
          })
        );
      }
    });

    tdData.forEach((td) => {
      this.TD.push(
        this.builder.group({
          professeur: this.builder.control(td.professeur),
          groupe: this.builder.array(
            td.groupe.map((g: any) => this.builder.control(g))
          ),
        })
      );
    });

    //add input for professeur that not have any groupe TD
    this.data.professeurTD.forEach((pr: any) => {
      const hasGroupe = this.data.TD.some(
        (el: any) => el.split('-')[0] === pr._id
      );
      if (!hasGroupe) {
        this.TD.push(
          this.builder.group({
            professeur: this.builder.control(pr._id),
            groupe: this.builder.array([]),
          })
        );
      }
    });
  }

  getGroupeControls(formGroup: any): FormArray {
    return formGroup.get('groupe') as FormArray;
  }
  addGroupe(index: number, type: string): void {
    let groupeArray: FormArray;

    switch (type) {
      case 'CM':
        groupeArray = this.getGroupeControls(this.CM.at(index) as FormGroup);
        break;
      case 'TP':
        groupeArray = this.getGroupeControls(this.TP.at(index) as FormGroup);
        break;
      case 'TD':
        groupeArray = this.getGroupeControls(this.TD.at(index) as FormGroup);
        break;
      default:
        throw new Error('Unknown type');
    }

    groupeArray.push(this.builder.control(''));
  }

  removeGroupe(cmIndex: number, groupIndex: number, type: string): void {
    let groupeArray: FormArray;

    switch (type) {
      case 'CM':
        groupeArray = this.getGroupeControls(this.CM.at(cmIndex) as FormGroup);
        break;
      case 'TP':
        groupeArray = this.getGroupeControls(this.TP.at(cmIndex) as FormGroup);
        break;
      case 'TD':
        groupeArray = this.getGroupeControls(this.TD.at(cmIndex) as FormGroup);
        break;
      default:
        throw new Error('Unknown type');
    }

    groupeArray.removeAt(groupIndex);
  }
  onFormSubmit() {
    console.log(this.elementForm.value);
    if (this.elementForm.valid) {
      this.service_element
        .addGroupesToElement(this.data._id, this.elementForm.value)
        .subscribe({
          next: (val) => {
            this.toastr.success(`${val.message}`, `${val.status}`);
            this._dialog.close(true);
          },
          error: (err) => {
            this.toastr.error(`${err.error.message}`, `${err.error.status}`);
          },
        });
    }
  }
}

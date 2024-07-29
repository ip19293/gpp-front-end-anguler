import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from '../../services/categorie.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ElementService } from '../../services/element.service';
import { ProfesseurService } from 'src/app/user/services/professeur.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-edit-element',
  templateUrl: './add-edit-element.component.html',
  styleUrls: ['./add-edit-element.component.scss'],
})
export class AddEditElementComponent implements OnInit {
  faCloudUpload = faCloudUpload;
  selectedFileName = null;
  validSelectedFileType = false;
  fileIsSelected = false;
  selectedType: String = 'un';
  Types: string[] = ['un', 'plusieurs'];
  file: any;
  elementForm!: FormGroup;
  fileForm!: FormGroup;
  id: any;
  categories: any;
  categorie: any;
  categorieSelected: any;
  professeurs: any;
  elements: any;
  matiere: any;
  debit_cours: any;
  matiereSelected: any;
  data2: any;
  CM: any;
  TP: any;
  TD: any;
  selectedProfesseurs: any = [];
  semestreList = [
    { name: 'S1', value: 1 },
    { name: 'S2', value: 2 },
    { name: 'S3', value: 3 },
    { name: 'S4', value: 4 },
    { name: 'S5', value: 5 },
    { name: 'S6', value: 6 },
  ];
  constructor(
    private builder: FormBuilder,
    private _dialog: MatDialogRef<AddEditElementComponent>,
    private service_categorie: CategorieService,
    private service_element: ElementService,
    private service_professeur: ProfesseurService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private active: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = localStorage.getItem('filiere');
  }

  ngOnInit(): void {
    console.log(this.selectedProfesseurs);
    this.elementForm = this.builder.group({
      filiere: this.builder.control(''),
      name: this.builder.control('', Validators.required),
      semestre: this.builder.control('', Validators.required),
      categorie: this.builder.control('', Validators.required),
      professeurCM: [this.data ? this.data.professeurCM : ''],
      professeurTP: [this.data ? this.data.professeurTP : ''],
      professeurTD: [this.data ? this.data.professeurTD : ''],
      heuresCM: this.builder.control('', Validators.required),
      heuresTP: this.builder.control('', Validators.required),
      heuresTD: this.builder.control('', Validators.required),
      // groupeCM: this.builder.control('', Validators.required),
    });
    this.fileForm = this.builder.group({
      file: ['', Validators.required],
    });
    this.elementForm.get('name')?.valueChanges.subscribe(async (res: any) => {
      if (res != '') {
        // console.log(res);
      }
    });
    this.elementForm
      .get('categorie')
      ?.valueChanges.subscribe(async (res: any) => {
        if (res != '') {
          this.service_element
            .getElementsByCategorieId(res)
            .subscribe((res) => {
              this.elements = res.elements;
              this.cd.detectChanges();
            });
        }
      });
    console.log(this.data);
    this.getData();
    this.elementForm.patchValue(this.data);
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
        this.service_element.uploadElements(this.id, formdata).subscribe({
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
  compareObjects(obj1: any, obj2: any): boolean {
    return obj1 && obj2 && obj1 === obj2._id;
  }
  onFormSubmit() {
    if (this.selectedType === 'plusieurs') {
      this.uploads();
    } else {
      this.elementForm.value.filiere = localStorage.getItem('filiere');
      console.log(this.elementForm.value);

      if (this.data) {
        console.log(this.elementForm.value);
        this.service_element
          .updateElement(this.data._id, this.elementForm.value)
          .subscribe({
            next: (val) => {
              this.toastr.success(`${val.message}`, `${val.status}`);
              this._dialog.close(true);
            },
            error: (err) => {
              this.toastr.error(`${err.error.message}`, `${err.error.status}`);
            },
          });
      } else {
        this.service_element.addElement(this.elementForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(`cours create success !`, `${val.status}`);
            this._dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error(`${err.error.message}`, `echec`);
          },
        });
      }
    }
  }

  getData() {
    //GET ALL CATEGORIES --------------------------------------------
    this.service_categorie.getAllCategories().subscribe((res: any) => {
      this.categories = res.categories;
    });
    // GET ALL PROFESSEURS -----------------------------------------
    this.service_professeur.getAllProfesseurs().subscribe((res: any) => {
      this.professeurs = res.professeurs;
    });
  }

  onCategorieSelected(categorieSelected: any) {
    if (this.categorieSelected != null) {
      this.service_element
        .getElementsByCategorieId(this.categorieSelected)
        .subscribe((res: any) => {
          this.elements = res.elements;
        });
    }
  }
}

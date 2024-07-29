import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AddEditElementComponent } from '../add-edit-element/add-edit-element.component';
import { ElementService } from '../../services/element.service';
import { FiliereService } from '../../services/filiere.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  faCloudUpload,
  faFileExcel,
  faMeh,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { FilterInterface } from 'src/app/filter/store/filter.state';

import { StoreService } from 'src/app/shared/services/store.service';
import { GroupeAffectationComponent } from '../groupe-affectation/groupe-affectation.component';

@Component({
  selector: 'app-filiere-detail',
  templateUrl: './filiere-detail.component.html',
  styleUrls: ['./filiere-detail.component.scss'],
})
export class FiliereDetailComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  faFileExcel = faFileExcel;
  faCloudUpload = faCloudUpload;
  faMeh = faMeh;
  id: any;
  fileIsSelected = false;
  selectedFileName = null;
  data_length = 0;
  file: any;
  displayedColumns: string[] = [
    'name_EM',
    'code_EM',
    /*   'credit', */
    'professeurCM',
    'professeurTD',
    'professeurTP',
    'action',
  ];

  filliere_id: any;
  filiere: any;
  description: any;
  niveau: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: ElementService,
    private service_filiere: FiliereService,
    private router: Router,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService,
    private active: ActivatedRoute,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    this.active.params.subscribe((res: any) => {
      this.id = res.id;
      //console.log(res.id);
    });
    localStorage.setItem('filiere', this.id);
  }
  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.getElementsByfiliereId();
  }
  ngAfterViewInit() {
    this.filterAction();
    this.selectAddButtonAction();
  }

  ngOnDestroy(): void {
    this.specificActionSubscription.unsubscribe();
  }
  filterAction(): void {
    this.store.select('filter').subscribe((data: FilterInterface) => {
      this.dataSource!.filter = data.filterValue.trim().toLowerCase();
      if (this.dataSource!.paginator) {
        this.dataSource!.paginator.firstPage();
      }
    });
  }
  selectAddButtonAction(): void {
    this.specificActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'add')
      )
      .subscribe((action: any) => {
        this.openAddElementComp(this.id);
      });
  }
  /* ---------------------------------------------------------------------------------------------------- */

  uploads(event: any) {
    const file = event.currentTarget.files[0];
    const file_name = file.name;
    const file_type = file.type;
    const file_size = file.size;
    this.selectedFileName = file_name;
    if (
      file_type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      this.fileIsSelected = true;
      this.file = file;
      const formdata = new FormData();
      formdata.append('file', this.file);
      this.service.uploadElements(this.id, formdata).subscribe({
        next: (res) => {
          this.toastr.success(`${res.message}`, `${res.status}`);
          this.getElementsByfiliereId();
        },
        error: (err) => {
          this.toastr.error(`${err.error.message}`, 'failed');
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
    // debugger;
  }
  onFormSubmit() {
    const formdata = new FormData();
    formdata.append('file', this.file);
    this.service.uploadElements(this.id, formdata).subscribe({
      next: (res) => {
        this.toastr.success(`${res.message}`, `${res.status}`);
        this.getElementsByfiliereId();
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, 'failed');
      },
    });
  }
  getElementsByfiliereId() {
    this.service_filiere.getFilliereById(this.id).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.elements);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.filiere = res.filiere;
      this.filliere_id = res._id;
      this.description = res.description;
      this.filiere = res.filiere;
      this.niveau = res.niveau;
      this.store_service.changeBarDataAction(
        res.filiere.toUpperCase() + ' : ' + res.niveau + ' > elements',
        'button',
        ['filter_list', 'add'],
        ['', 'ajouter'],
        [true, true],
        [true, true]
      );

      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      console.warn(this.dataSource.filteredData.length);
      this.data_length = this.dataSource.filteredData.length;
    });
  }
  delete(event: any, id: string) {
    this.dialog
      .confirmDialog({
        title: 'Cette action est irréversible !',
        message: `Voulez-vous confirmer la suppression ?`,
        confirmText: 'Oui',
        cancelText: 'Annuler',
      })
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.deletEelement(id).subscribe({
              next: (res) => {
                this.toastr.success(`${res.message}`, `${res.status}`);
                this.getElementsByfiliereId();
              },
              error: (err) => {
                this.toastr.error(`${err.error.message}`, `échec`);
              },
            });
          } else {
          }
        },
      });
  }
  openAddElementComp(id: any) {
    const dialogFef = this._dialog.open(AddEditElementComponent, {
      width: '600px',

      id,
    });
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getElementsByfiliereId();
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  openEditElementComp(data: any) {
    const dialogFef = this._dialog.open(AddEditElementComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getElementsByfiliereId();
        }
      },
    });
  }
  groupeAffectation(data: any) {
    const dialogFef = this._dialog.open(GroupeAffectationComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getElementsByfiliereId();
        }
      },
    });
  }
}

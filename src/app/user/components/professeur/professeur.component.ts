import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfesseurService } from '../../services/professeur.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ProfesseurAddEditComponent } from '../professeur-add-edit/professeur-add-edit.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { FilterInterface } from 'src/app/filter/store/filter.state';
import { AppState } from 'src/app/store/app.state';

import { Subscription, filter } from 'rxjs';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.scss'],
})
export class ProfesseurComponent implements OnInit, AfterViewInit, OnDestroy {
  private specificActionSubscription!: Subscription;
  fileIsSelected = false;
  selectedFileName = null;
  faCloudUpload = faCloudUpload;
  file: any;
  data: any;
  displayedColumns: string[] = [
    'nom',
    /*  'email', */
    /*  'mobile', */
    'banque',
    'account',
    'action',
  ];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedColumnsDataSource: any;
  constructor(
    public service: ProfesseurService,
    private router: Router,
    private _dialog: MatDialog,
    private toastr: ToastrService,
    private dialog: DialogService,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    this.getProfesseurs({});
  }
  ngOnInit(): void {
    this.getProfesseurs({});
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
        this.openAddProfesseurComp();
        //console.log('Specific action detected:', action);
      });
  }

  /* ---------------------------------------------------------------------------------------------- */
  exportTable() {}
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
      this.service.uploadProfesseurs(formdata).subscribe({
        next: (res) => {
          this.toastr.success(`${res.message}`, `${res.status}`);
          this.getProfesseurs({});
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
    this.service.uploadProfesseurs(formdata).subscribe({
      next: (res) => {
        this.toastr.success(`${res.message}`, `${res.status}`);
        this.fileIsSelected = false;
        this.file = null;
        this.selectedFileName = null;
        this.getProfesseurs({});
      },
      error: (err) => {
        this.toastr.error(`${err.error.message}`, 'failed');
      },
    });
  }
  getProfesseurs(query: any) {
    query = query != undefined ? query : {};
    this.service.getAllProfesseurs(query).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.professeurs);
      this.dataSource.sort = this.sort;
      this.data = res.professeurs;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page";
      this.store_service.changeBarDataAction(
        'Liste des professeurs',
        'button',
        ['filter_list', 'add'],
        ['', 'ajouter'],
        [true, true],
        [true, true]
      );
    });
  }

  deleteProfesseur(event: any, id: string) {
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
            this.service.deleteProfesseur(id).subscribe({
              next: (res: any) => {
                this.getProfesseurs({});
                this.toastr.success(`${res.message}`, `${res.status}`);
              },
              error: (err: any) => {
                this.toastr.error(`${err.error.message}`, `failed`);
              },
            });
          } else {
          }
        },
      });
  }

  openAddProfesseurComp() {
    const dialogFef = this._dialog.open(ProfesseurAddEditComponent, {
      width: '50%',
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurs({});
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  openEditProfesseurComp(data: any) {
    const dialogFef = this._dialog.open(ProfesseurAddEditComponent, {
      width: '50%',
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfesseurs({});
        }
      },
    });
  }
}

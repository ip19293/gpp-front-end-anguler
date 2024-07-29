import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmploisAddEditComponent } from '../emplois-add-edit/emplois-add-edit.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { EmploiService } from 'src/app/filiere/services/emploi.service';
import { FiliereService } from 'src/app/filiere/services/filiere.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/store/app.state';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store, select } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FilterInterface } from 'src/app/filter/store/filter.state';
import { EmploisFormComponent } from '../emplois-form/emplois-form.component';

@Component({
  selector: 'app-emplois',
  templateUrl: './emplois.component.html',
  styleUrls: ['./emplois.component.scss'],
})
export class EmploisComponent implements OnInit, AfterViewInit, OnDestroy {
  today = new Date().getDay();
  daysOfWeek: string[] = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  startTime_List = [
    { startTime: '8:00', finishTime: '9:30' },
    { startTime: '9:45', finishTime: '11:15' },
    { startTime: '11:30', finishTime: '13' },
    { startTime: '15:00', finishTime: '16:30' },
    { startTime: '17:00', finishTime: '18:30' },
  ];
  displayedColumns: string[] = [
    'jour',
    'matiere',
    'type',
    'startTime',
    'finishTime',
    'professeur',
    'action',
  ];
  data: any;
  filieres: any;
  niveau: any;
  annee: any;
  description: any;
  dayName: any;
  fb = Inject(FormBuilder);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public service: EmploiService,
    private service_filiere: FiliereService,
    private _dialog: MatDialog,
    private dialog: DialogService,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private store_service: StoreService
  ) {
    this.getFillieres();
    this.getEmplois();
  }
  /* ---------------------------------------------------------------------------------------------------- */
  private specificActionSubscription!: Subscription;
  dataSource = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.getFillieres();
    this.getEmplois();
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
      /*  this.data = this.data.filter(
        (el: any) => (el.code = data.filterValue.trim().toLowerCase())
      ); */
    });
  }
  selectAddButtonAction(): void {
    this.specificActionSubscription = this.store
      .pipe(
        select('button'),
        filter((action: any) => action.name === 'add')
      )
      .subscribe((action: any) => {
        this.openAddEmploiComp();
      });
  }
  /* ---------------------------------------------------------------------------------------------------- */
  getFillieres(data?: any) {
    this.service_filiere.getAllFillieres(data).subscribe((res) => {
      this.filieres = res.filieres;
      this.store_service.changeBarDataAction(
        `L'emploi du temps`,
        'button',
        ['filter_list', 'add'],
        ['', 'ajouter'],
        [res.filieres.length > 0 ? true : false, true],
        [true, true]
      );
    });
  }
  getEmplois(): void {
    this.service.getAllEmplois().subscribe((res) => {
      //  console.log(res.emplois);
      this.data = res.emplois;
    });
  }
  getFiliereEmploisByTimes(day: any, filiere: any) {
    const res = this.data.filter(
      (emploi: any) => emploi.dayNumero === day && emploi.filiere === filiere
    );
    return res;
  }
  getFiliereEmploisByDay(id: any, day: any, semestre: any) {
    const res = this.data?.filter(
      (emploi: any) =>
        emploi.filiere === id &&
        emploi.dayNumero === day &&
        semestre === emploi.semestre
    );
    // this.dataSource = new MatTableDataSource(res.emplois);

    /* this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Nombre d'eléments par page"; */
    /*       this.store_service.changeBarDataAction(
        ' > Empoi du temps > ' + res.filiere + ' : ' + res.niveau,
        'button',
        ['filter_list', 'add'],
        ['', 'ajouter'],
        [res.emplois.length > 0 ? true : false, true],
        [res.emplois.length > 0 ? true : false, true]
      ); */
    return res;
  }
  removeEmploi(event: any, id: string) {
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
            this.service.deleteEmploi(id).subscribe({
              next: (res) => {
                this.toastr.success(
                  `emploi delete ssuccesfully ...`,
                  `success`
                );
                // this.getFilliereById();
              },
              error: (err) => {
                this.toastr.error(`cann't deleted emploi !`, `faild`);
              },
            });
          } else {
          }
        },
      });
  }
  openAddEmploiComp() {
    const dialogFef = this._dialog.open(EmploisFormComponent);
    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmplois();
        }
      },
    });
    this.store_service.renameButtonAction('button');
  }
  openEditEmploiComp(data: any) {
    const dialogFef = this._dialog.open(EmploisAddEditComponent, {
      data,
    });

    dialogFef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmplois();
        }
      },
    });
  }

  deleteEmploi(event: any, id: string) {
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
            this.service.deleteEmploi(id).subscribe({
              next: (res) => {
                this.toastr.success(
                  `emploi delete ssuccesfully ...`,
                  `success`
                );
                this.getEmplois();
              },
              error: (err) => {
                this.toastr.error(`cann't deleted emploi !`, `faild`);
              },
            });
          } else {
          }
        },
      });
  }
}

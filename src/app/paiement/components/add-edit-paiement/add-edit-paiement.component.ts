import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PaiementService } from '../../services/paiement.service';
import { ToastrService } from 'ngx-toastr';
import { ChangePeriodeDialogComponent } from '../dialogs/change-periode-dialog/change-periode-dialog.component';

@Component({
  selector: 'app-add-edit-paiement',
  templateUrl: './add-edit-paiement.component.html',
  styleUrls: ['./add-edit-paiement.component.scss'],
})
export class AddEditPaiementComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditPaiementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service_payement: PaiementService,
    private _dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(ChangePeriodeDialogComponent, {
      data: {
        fromDate: this.data.fromDate,
        toDate: this.data.toDate,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.data.fromDate = result.fromDate;
      this.data.toDate = result.toDate;
      let dt = {
        debit: result.fromDate,
        fin: result.toDate,
      };
      this.service_payement.getPaiementInformation(dt).subscribe({
        next: (res) => {
          this.data.fromDate = res.info.fromDate;
          this.data.toDate = res.info.toDate;
          this.data.nombresProfesseurs = res.info.nombresProfesseurs;
          this.data.nbc = res.info.nbc;
          this.data.somme = res.info.somme;
          this.data.months = res.info.months | 0;
          this.data.weeks = res.info.weeks | 0;
          this.data.days = res.info.days | 0;
        },
        error: (err) => {
          this.toastr.error(`${err.error.message}`, `${err.error.status} `);
        },
      });
    });
  }
}

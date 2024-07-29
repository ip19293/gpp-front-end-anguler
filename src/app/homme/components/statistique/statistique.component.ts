import { Component, OnInit } from '@angular/core';
import { PaiementService } from 'src/app/paiement/services/paiement.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss'],
})
export class StatistiqueComponent implements OnInit {
  data: any;
  userData: any;
  role: any;

  constructor(private paiement_service: PaiementService) {
    /*   this.paiement_service.Statistique().subscribe((data) => {
      this.data = data;
    }); */

    this.userData = JSON.stringify(localStorage.getItem('data'));
    this.role = localStorage.getItem('role');
  }
  ngOnInit(): void {
    if (localStorage.getItem('role') != 'professeur') {
      this.paiement_service.Statistique().subscribe((data) => {
        this.data = data;
      });
    } else {
      this.paiement_service
        .ProfesseurStatistique(localStorage.getItem('prof_id'))
        .subscribe((data) => {
          this.data = data;
        });
    }
  }
}

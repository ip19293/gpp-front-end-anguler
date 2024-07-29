import { Component, OnInit } from '@angular/core';
import { EmploiService } from 'src/app/filiere/services/emploi.service';
import { ProfesseurService } from '../../services/professeur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-prof-emploi',
  templateUrl: './prof-emploi.component.html',
  styleUrls: ['./prof-emploi.component.scss'],
})
export class ProfEmploiComponent implements OnInit {
  today: any;
  id: any;
  emplois: any = [];
  lundi: any;
  data: any;
  groupedEmploi: any;
  role = localStorage.getItem('role');
  isVide: any;
  daysOfWeek = [
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
  ];
  constructor(
    public emploi_service: EmploiService,
    public prof_service: ProfesseurService,
    private router: Router,
    private toastr: ToastrService,
    private active: ActivatedRoute,
    private store_service: StoreService
  ) {
    this.id = localStorage.getItem('prof_id');
    let toDay = new Date();
    this.today = toDay.getDay();
    console.log(this.today);
    this.getData();
  }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.prof_service.getProfesseurEmplois(this.id).subscribe({
      next: (res) => {
        this.emplois = res.emplois;
        this.data = res.emplois;
        this.store_service.changeBarDataAction(
          `l'horloge`,
          'button',
          ['filter_list', 'add'],
          ['', 'ajouter'],
          this.role != 'professeur' ? [true, true] : [false, false],
          [true, true]
        );
      },
      error: (err) => {},
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { ParametreService } from "../../services/parametre.service";

import { StoreService } from "src/app/shared/services/store.service";

@Component({
  selector: "app-parametres",
  templateUrl: "./parametres.component.html",
  styleUrls: ["./parametres.component.scss"],
})
export class ParametresComponent implements OnInit {
  PAIEMENT_EXPIRATION: any;
  constructor(
    public service: ParametreService,
    private store_service: StoreService
  ) {}

  ngOnInit(): void {
    this.getAppSettings();
  }

  getAppSettings() {
    this.service.getAppSettings().subscribe((res) => {
      this.PAIEMENT_EXPIRATION = res.PAIEMENT_EXPIRATION;

      this.store_service.changeBarDataAction(
        "Paramètres",
        "button",
        ["filter_list", "edit"],
        ["", "modifier"],
        [false, true],
        [false, true]
      );
    });
  }
}

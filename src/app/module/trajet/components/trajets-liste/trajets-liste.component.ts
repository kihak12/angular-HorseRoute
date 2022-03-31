import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/module/map/interface/map.interface';
import { Trajet } from '../../interface/trajet.interface';
import { TrajetService } from '../../service/trajet.service';
import { SearchBarComponent } from 'src/app/module/map/components/search-bar/search-bar.component';

@Component({
  selector: 'app-trajets-liste',
  templateUrl: './trajets-liste.component.html',
  styleUrls: ['./trajets-liste.component.scss']
})
export class TrajetsListeComponent implements OnInit {
  @ViewChild(SearchBarComponent, { static: true }) child: SearchBarComponent;

  SetPointOnMap(locationStart: Location, locationEnd: Location) {
    this.child.SetPointOnMap(locationStart, locationEnd);
  }

  panelOpenState = false;
  trajets: Trajet[] = [];
  error = false;

  constructor(
    private trajetService: TrajetService,
  ) { }

  ngOnInit(): void {
    this.getTrajets();
  }

  getTrajets() {
    this.trajetService.getAllTrajets().subscribe(trajets => {
      trajets.forEach((element: Trajet) => {
        this.trajetService.getTrajetDetails(element.trajetId).subscribe(a => {
          this.trajets.push(a);
          console.log(a);
        });
      });
    });
  }

  getDateFlexibility(trajetDate: string, dayFlexibility: number): string {
    return this.trajetService.getDateFlexibility(trajetDate, dayFlexibility)
  }
}
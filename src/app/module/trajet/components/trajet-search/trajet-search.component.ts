import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Trajet } from '../../interface/trajet.interface';
import { TrajetService } from '../../service/trajet.service';
import { SearchBarComponent } from 'src/app/module/map/components/search-bar/search-bar.component';
import { Location } from 'src/app/module/map/interface/map.interface';

@Component({
  selector: 'app-trajet-search',
  templateUrl: './trajet-search.component.html',
  styleUrls: ['./trajet-search.component.scss']
})
export class TrajetSearchComponent implements OnInit {
  trajets: Trajet[] = [];
  data: any;
  panelOpenState = false;
  trajetFound = true;

  @ViewChild(SearchBarComponent, { static: true }) child: SearchBarComponent;

  SetPointOnMap(locationStart: Location, locationEnd: Location) {
    this.child.SetPointOnMap(locationStart, locationEnd);
  }



  constructor(
    private route: Router,
    private trajetService: TrajetService,
  ) {
    this.data = this.route.getCurrentNavigation()?.extras.state

  }

  ngOnInit(): void {
    if (this.data != null) {
      this.trajetService.getTrajetsSearch(this.data)
        .subscribe(
          trajets => {
            trajets.forEach((element: Trajet) => {
              this.trajetService.getTrajetDetails(element.trajetId).subscribe(a => {
                this.trajets.push(a);
                console.log("response a:", a);
              });
            });
          },
          error => {
            this.trajetFound = false;
          }
        )
    } else {
      this.route.navigate(["/trajets"]);
    }

  }

  getDateFlexibility(trajetDate: string, dayFlexibility: number): string {
    return this.trajetService.getDateFlexibility(trajetDate, dayFlexibility)
  }
}

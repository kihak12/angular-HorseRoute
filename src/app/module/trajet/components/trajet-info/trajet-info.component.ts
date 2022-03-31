import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Trajet } from '../../interface/trajet.interface';
import { TrajetService } from '../../service/trajet.service';
import { ActivatedRoute } from '@angular/router';
import { SearchBarComponent } from 'src/app/module/map/components/search-bar/search-bar.component';
import { Location } from 'src/app/module/map/interface/map.interface';

@Component({
  selector: 'app-trajet-info',
  templateUrl: './trajet-info.component.html',
  styleUrls: ['./trajet-info.component.scss']
})
export class TrajetInfoComponent implements OnInit {
  trajetDetails: Trajet;
  availableSits: string = "0";
  btnIsDisabled: boolean = false;

  @ViewChild(SearchBarComponent, { static: true }) child: SearchBarComponent;
  
  SetPointOnMap(locationStart: Location, locationEnd: Location) {
    this.child.SetPointOnMap(locationStart, locationEnd);
  }


  constructor(
    private route: ActivatedRoute,
    private trajetService: TrajetService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id != null) {
      this.getTrajetDetails(id);
    }
  }

  getTrajetDetails(trajetId: string) {
    this.trajetService.getTrajetDetails(trajetId).subscribe(trajetDetails => {
      this.trajetDetails = trajetDetails;
      this.SetPointOnMap(this.trajetDetails.adresseStart, this.trajetDetails.adresseEnd);
      this.availableSits = this.getAvailableSits();
    })
  }

  getDateFlexibility(trajetDate: string, dayFlexibility: number): string {
    return this.trajetService.getDateFlexibility(trajetDate, dayFlexibility)
  }

  getAvailableSits():string{
    let sits:string;
    let place = this.trajetDetails.availableSits - this.trajetDetails.passagers.length;

    if(place > 1){
      sits = place + " places";
    }else{
      sits = place + " place";
    }
    if(place == 0){
      this.btnIsDisabled = true;
    }
    return sits;
  }

}

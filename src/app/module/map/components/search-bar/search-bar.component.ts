import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchMapComponent } from '../search-map/search-map.component';
import { Location } from '../../interface/map.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @ViewChild(SearchMapComponent, { static: true }) child: SearchMapComponent;

  minDate: Date;
  selected = '';

  constructor() { }

  ngOnInit(): void {
  }

  SetPointOnMap(locationStart: Location, locationEnd: Location) {
    if(this.child.trajetSearchForm.value.depart != locationStart.adresse+", "+locationStart.city &&
    this.child.trajetSearchForm.value.arriver != locationEnd.adresse+", "+locationEnd.city){
      this.child.AwaitMapLoad(locationStart, 'start', 1);
      this.child.AwaitMapLoad(locationEnd, 'end', 1);
    }
  }

}

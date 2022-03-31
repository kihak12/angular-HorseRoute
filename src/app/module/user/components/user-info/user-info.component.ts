import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interface/user.interface';
import { UserService } from '../../service/user.service';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { Observable } from 'rxjs';
import { Trajet } from 'src/app/module/trajet/interface/trajet.interface';
import { SearchBarComponent } from 'src/app/module/map/components/search-bar/search-bar.component';
import { Location } from 'src/app/module/map/interface/map.interface';
import { TrajetService } from 'src/app/module/trajet/service/trajet.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: [
    "./user-info.component.scss",
    "../../../../../../node_modules/keen-slider/keen-slider.min.css"]
})
export class UserInfoComponent implements OnInit, AfterViewInit {
  @ViewChild("sliderRef")
  private sliderRef: ElementRef<HTMLElement>

  @ViewChild(SearchBarComponent, { static: true }) child: SearchBarComponent;

  SetPointOnMap(locationStart: Location, locationEnd: Location) {
    this.child.SetPointOnMap(locationStart, locationEnd);
  }

  userDetails: User;
  currentSlide: number = 0;
  slider: KeenSliderInstance;
  trajets: Trajet[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private trajetService: TrajetService,
  ) { }

  ngAfterViewInit() {    
    if(this.sliderRef){
      setTimeout(() => {
        this.slider = new KeenSlider(this.sliderRef.nativeElement, {
          initial: 0,
          mode: "snap",
          rtl: false,
          slides: { perView: "auto" },
          slideChanged: (s) => {
            this.currentSlide = s.track.details.rel
          },
        })
      })
    }
  }

  getUserTrajet() {
    this.userService.getUserTrajets(this.userDetails.userId).subscribe(_ => {
      _.forEach(trajet => {
        this.trajetService.getTrajetDetails(trajet.trajetId).subscribe(a => {
          this.trajets.push(a);
        });
      })
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.getUserDetails(id);
    }
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  getUserDetails(userId: string) {
    this.userService.getUserDetails(userId).subscribe(_ => {
      this.userDetails = _;
      this.getUserTrajet();
    });
  }

  getDateFlexibility(trajetDate: string, dayFlexibility: number): string {
    return this.trajetService.getDateFlexibility(trajetDate, dayFlexibility)
  }

}

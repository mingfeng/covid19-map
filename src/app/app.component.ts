import { AfterViewInit, Component } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  target = 'map';

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.initialize(this.target);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/modals/car.modal';

@Component({
  selector: 'admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {
  filter = new FormControl('');
  cars: Car[];
  filteredCars: Car[];
  page = 1;
  pageSize = 5;
  collectionSize: number;
  
  constructor(private router: Router, private route: ActivatedRoute, private carService: CarService) {
    // this.countries$ = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => console.log(text))
    // );
  }

  refreshList() {
    this.carService.getCars(this.pageSize, this.page).subscribe((carData) => {
      this.cars = carData.cars;
      this.collectionSize = carData.totalCount;
    });
  }

  ngOnInit(): void {
    this.refreshList();
  }

  onAddCar() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditCar(id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }
}

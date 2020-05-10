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
  countries$: Observable<void>;
  cars: Car[];
  filteredCars: Car[];
  page = 1;
  pageSize = 4;
  collectionSize: number;
  
  constructor(private router: Router, private route: ActivatedRoute, private carService: CarService) {
    // this.countries$ = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => console.log(text))
    // );
  }

  refreshList() {
    this.filteredCars = this.cars
      // .map((car, i) => ({id: i + 1, ...car}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.collectionSize = this.cars.length;
    this.refreshList();
  }

  onAddCar() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditCar(id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }
}

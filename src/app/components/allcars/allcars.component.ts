import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-allcars',
  templateUrl: './allcars.component.html',
  styleUrls: ['./allcars.component.css']
})
export class AllcarsComponent implements OnInit {

  cars:Car [] = [];
  carImages:CarImage[];
  dataLoaded:boolean = false;
  imgUrl ="https://localhost:44349/";
  defaultImage="Images/default.JPG";

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
      }
      else if(params["id"]){
        this.getByBrandId(params["id"])
      }else{
        this.getCarDetails();
      }
    })
  }

  getCarDetails(){
    this.carService.getCarDetails().subscribe(response => {
    this.cars = response.data;
    })
  }

  getByBrandId(id:number){
    this.carService.getByBrandId(id).subscribe(response => {
    this.cars = response.data;
    })
  }
  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response =>{
      this.cars = response.data
    })
  }
}
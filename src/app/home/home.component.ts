import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  ageValue: number = 0;
  searchValue: string = "";

  constructor(public firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.firebaseService.getUsers()
      .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
}

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    })
  }

  rangeChange(event){
    this.firebaseService.searchUsersByAge(event.value)
    .subscribe(result =>{
      console.log(result)
      this.age_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
  })
}

combineLists(a, b){
  let result = [];

  a.filter(x => {
    return b.filter(x2 =>{
      if(x2.payload.doc.id == x.payload.doc.id){
        result.push(x2);
      }
    });
  });
  return result;
}



}

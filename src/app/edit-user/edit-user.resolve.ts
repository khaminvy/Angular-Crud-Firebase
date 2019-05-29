import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class EditUserResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      //console.log(userId)
      return this.firebaseService.getUser(userId)
      .subscribe(
        data => {
        //console.log(data.payload.data())
         resolve(data)
        }
      );
    })
  }
}
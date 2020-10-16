import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';

/*
  Generated class for the RateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RateProvider {
  constructor(public http: HttpClient) {
  }

  getInterestRates() {
    return new Promise(resolve => {
      firebase.firestore().collection('interestRates').doc('rates').get().
      then(data => {
        if(data.exists){
          resolve(data.data());
        }
      }, err => {
        console.log(err);
      });
    });
  }
}

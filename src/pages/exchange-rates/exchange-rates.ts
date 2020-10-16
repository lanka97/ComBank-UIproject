import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
/**
 * Generated class for the ExchangeRatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exchange-rates',
  templateUrl: 'exchange-rates.html',
})
export class ExchangeRatesPage {

  db: any;
  exchangeRates: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = firebase.firestore();
    this.loadData();
  }

  ionViewDidLoad() {
    this.loadData();
  }


  loadData(){
    this.getRates().then((data)=>{
      this.exchangeRates = data;
  });
  }

  getRates() {
    return new Promise((resolve, reject) => {
      this.db.collection('exchangeRates')
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach(function (doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id
            arr.push(obj);
          });

          if (arr.length > 0) {
            resolve(arr);
          } else {
            resolve(null);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addDocument( dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.db.collection('exchangeRates').add(dataObj)
            .then((obj: any) => {
                resolve(obj);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
  }

  openNotificationPage() {
    this.navCtrl.push('NotificationsPage');
  }
}

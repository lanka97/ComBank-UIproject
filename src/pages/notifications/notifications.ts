import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  db: any;
  segment: string = "t";
  offers: any;
  transactions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'menuSlider');
    this.db = firebase.firestore();
    this.loadData();
    // this.offers = [
    //   { "heading": "Pizza Hut Offer", "content": "Buy one large pizza at Pizza Hut and get regular pizza free", "date": "28-Aug-2019 09:30" },
    //   { "heading": "Pizza Hut Offer", "content": "Buy one large pizza at Pizza Hut and get regular pizza free", "date": "28-Aug-2019 09:30" },
    //   { "heading": "Pizza Hut Offer", "content": "Buy one large pizza at Pizza Hut and get regular pizza free", "date": "28-Aug-2019 09:30" }
    // ];

    // this.transactions = [
    //   { "heading": "Pos Transaction", "content": "REV POS trans 205000389340 13/08/2019 was performed on your FriMi ID 2222***950 for LKR 315.33", "date": "28-Aug-2019 09:30" },
    //   { "heading": "Pos Transaction", "content": "Thank you for paying Uber BV Vorden from your FriMi ID 2222XXXX50 LKR 327.66", "date": "28-Aug-2019 09:30" },
    //   { "heading": "Fund Transfer", "content": "FUNDTRANSFER TO 2003**688 was performed on your FriMi ID 2222**950 for LKR 4,760.00", "date": "28-Aug-2019 09:30" },
    //   { "heading": "Cash Deposit", "content": "Fund Transfer From  was performed on your FriMi ID 2222***950 for LKR 10,000.00", "date": "28-Aug-2019 09:30" }
    // ];


  }
  loadData() {
    this.getData('offers').then((data) => {
      this.offers = data;
    });
    this.getData('transactions').then((data) => {
      this.transactions = data;
    });
  }

  getData(collectionName: String) {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName)
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
    this.loadData();
  }

}

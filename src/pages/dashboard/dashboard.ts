import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  db: any;
  total: any = 0;
  account1: any;
  account2: any;

  currentLogin: Date;
  lastVisit: Date;

  userAccounts: any;
  cardColours: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // this.userAccounts = [
    //   { 'currency': 'LKR', 'accountBalance': 107458.14, 'accountNumber': '8480025479', 'cardNumber': '5247 8745 6598 3541', 'cardName': 'Godamune G.A.P.J.', 'expiry': '05/24', 'accountType': 'Savings Account', 'cardType': 'VISA' },
    //   { 'currency': 'LKR', 'accountBalance': 107458.25, 'accountNumber': '8480025479', 'cardNumber': '5247 8745 6598 3541', 'cardName': 'Godamune G.A.P.J.', 'expiry': '05/24', 'accountType': 'Savings Account', 'cardType': 'MASTER' },
    //   { 'currency': 'LKR', 'accountBalance': 107458.25, 'accountNumber': '8480025479', 'cardNumber': '5247 8745 6598 3541', 'cardName': 'Godamune G.A.P.J.', 'expiry': '05/24', 'accountType': 'Savings Account', 'cardType': 'VISA' }
    // ];
    this.db = firebase.firestore();
    this.loadData();
    this.cardColours = [
      "background: transparent linear-gradient(295deg, #001848 0%, #004093 100%) 0% 0% no-repeat padding-box;"
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.loadData();
    this.currentLogin = new Date();
    this.lastVisit = new Date();

  }
  
  loadData() {
    this.getData('userAccounts').then((data) => {
      this.userAccounts = data;
      this.calculateTotalBalance(this.userAccounts);
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

  calculateTotalBalance(userAccounts: any) {
    var temp = 0
    userAccounts.forEach(function (account) {
      temp += account.accountBalance;
    });
    this.total = temp;
  }

  openNotificationPage() {
    this.navCtrl.push('NotificationsPage');
  }
}

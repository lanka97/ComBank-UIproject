import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import AccountProvider from '../../providers/account/account';
import * as firebase from 'firebase';
import 'firebase/firestore';

/**
 * Generated class for the AccountListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-list',
  templateUrl: 'account-list.html',
})
export class AccountListPage {

  accounts:any;
  db: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    // this.accounts = [
    //   {"heading":"Account One", "type":"Savings Account","number": "127627813","balance": "1254.00", "date":"28-Aug-2019 09:30"},
    //   {"heading":"Account Two", "type":"Savings Account","number": "127627813","balance": "1254.00", "date":"28-Aug-2019 09:30"},
    //   {"heading":"Account Three", "type":"Current Account","number": "127627813","balance": "1254.00", "date":"28-Aug-2019 09:30"},
    //   {"heading":"Account Four", "type":"Current Account","number": "127627813","balance": "1254.00", "date":"28-Aug-2019 09:30"}
    // ];
    this.db = firebase.firestore();
    this.presentLoadingDefault();
    // this.getAccounts();
  }

  navAcc( account: any ){
    this.navCtrl.push('AccountsPage', {
      account: account
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountListPage');
  }
  openNotificationPage(){
    this.navCtrl.push('NotificationsPage');
  }

  openPage(){
    this.navCtrl.push('AccountsPage')
  }

  loadData(){
    this.getRates().then((data)=>{
      console.log(data);
      this.accounts = data;
  });
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

    this.getRates().then((data)=>{
      // console.log(data);
      this.accounts = data;
      loading.dismiss();
  });
    
  }

  getRates() {
    return new Promise((resolve, reject) => {
      this.db.collection('accounts')
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach(function (doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id
            console.log(obj)
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

  // getAccounts(){
  //   this.accountProvider.getAccounts().then( (res)  => {
  //     console.log(res);
  //   }).catch((error: any) => {
         
  //       });
  // }
}

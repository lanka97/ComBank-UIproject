import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

/**
 * Generated class for the TransactionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-Etransactions',
  templateUrl: 'Etransactions.html',
})
export class ETransactionsPage {

  transactions: any;
  account: any;
  db: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.account = navParams.get('account');
    this.db = firebase.firestore();
    this.presentLoadingDefault();

    // this.transactions = [
    //   { "heading": "Pos Transaction", "ammount": "10000.00", "date": "28-Aug-2019 09:30", "type": "debit", "description": "from account 100019822" },
    //   { "heading": "Pos Transaction", "ammount": "1500.00", "date": "28-Aug-2019 09:30", "type": "credit", "description": "from malabe branch" },
    //   { "heading": "Fund Transfer", "ammount": "8000.00", "date": "28-Aug-2019 09:30", "type": "credit", "description": "from malabe branch" },
    //   { "heading": "Cash Deposit", "ammount": "1400.00", "date": "28-Aug-2019 09:30", "type": "debit", "description": "intrest" }
    // ];
  }

  loadData(){
    this.getRates().then((data)=>{
      this.transactions = data;
  });

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();

      this.getRates().then((data)=>{
        this.transactions = data;
        loading.dismiss();
    });
    
  }

  getRates() {
    return new Promise((resolve, reject) => {
      this.db.collection('accounts/1Kvy0ICE5xgytjQCJLvA/transactions')
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionsPage');
  }

  showAlert(transaction: any) {
    const alert = this.alertCtrl.create({
      title: 'Transaction:' + transaction.heading,
      subTitle: '<div>Type: ' + transaction.type + '</div>' +
        '<div>Description: ' + transaction.description + '</div>' +
        '<div>Date: ' + transaction.date + '</div>' +
        '<div>Ammount: LKR ' + transaction.ammount + '</div>',
      buttons: ['OK']
    });
    alert.present();
  }
  openNotificationPage() {
    this.navCtrl.push('NotificationsPage');
  }
}

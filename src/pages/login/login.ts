import { Component } from '@angular/core';
import { Events, IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  db: any;
  ePassbook: boolean;
  segment: string = "passbook";
  public data: any = {
    id: '',
    password: '',
    isChecked: false
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public menuCtrl: MenuController, public alertCtrl: AlertController) {
    this.menuCtrl.enable(false, 'menuSlider');
    this.db = firebase.firestore();
  }

  ionViewDidLoad() {
    this.ePassbook = true;
  }

  segmentChanged(ev: any) {
    this.ePassbook = this.segment === 'passbook';
    this.data = {
      id: '',
      password: '',
      isChecked: false
    };
  }

  login() {
    console.log(this.data);
    if (this.ePassbook) {
      this.db.collection('users')
        .where('username', '==', this.data.id)
        .where('password', '==', this.data.password)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            this.showAlert();
            return;
          }

          snapshot.forEach(doc => {
            var user = doc.data();
            console.log(user);
            this.navCtrl.push('MenuSliderPassbookPage');
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

    } else {
      this.db.collection('users')
        .where('username', '==', this.data.id)
        .where('password', '==', this.data.password)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            this.showAlert();
            return;
          }

          snapshot.forEach(doc => {
            var user = doc.data();
            console.log(user);
            this.navCtrl.push('MenuSliderMobilebankingPage');

          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });


    }
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '<center><img src="../../assets/imgs/failed.png" alt="unsuccess img" height="62" width="62"></center><br/>Invalid Credentials',
      subTitle: 'Please enter correct login credentials!',
      buttons: ['OK']
    });
    alert.present();
  }
}

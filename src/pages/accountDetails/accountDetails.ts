import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  MenuController  } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-accountDetails',
  templateUrl: 'accountDetails.html',
})
export class AccountDetailsPage {

  account: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public alertCtrl: AlertController) {
    
    this.account = navParams.get('account');
    //this.menuCtrl.enable(false, 'menuSlider');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersPage');
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '<center> Success!</center>',
      subTitle: '<center><img src="../../assets/imgs/Download-Success-PNG-Image.png" alt="success img" height="62" width="62"></center>',
      buttons: ['OK']
    });
    alert.present();
  }
  openNotificationPage(){
    this.navCtrl.push('NotificationsPage');
  }
}

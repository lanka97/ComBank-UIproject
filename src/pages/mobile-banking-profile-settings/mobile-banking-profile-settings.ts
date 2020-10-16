import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MobileBankingProfileSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mobile-banking-profile-settings',
  templateUrl: 'mobile-banking-profile-settings.html',
})
export class MobileBankingProfileSettingsPage {


  savings: any;
  deposits: any;
  others: any;
  data: any;
  aliveSaving: any;
  aliveDeposits: any;
  aliveOthers: any;
  segment: string = "s";

  items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = new Array(3).fill(false)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobileBankingProfileSettingsPage');
  }

  showSettings(index) {
    this.items[index] = !this.items[index];
  }

}

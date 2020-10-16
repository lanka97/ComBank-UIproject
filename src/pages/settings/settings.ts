import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items = new Array(3).fill(false)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  showSettings(index){
    this.items[index] = !this.items[index];
  }
}

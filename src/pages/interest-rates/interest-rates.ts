import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {RateProvider} from "../../providers/rate/rate";

/**
 * Generated class for the InterestRatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-interest-rates',
  templateUrl: 'interest-rates.html',
})
export class InterestRatesPage {

  savings: any;
  deposits: any;
  others: any;
  data: any;
  aliveSaving: any;
  aliveDeposits: any;
  aliveOthers: any;
  segment: string = "s";

  constructor(public navCtrl: NavController, public navParams: NavParams, private rateProvider: RateProvider, public loadingCtrl: LoadingController) {
    this.getInterestRates();
  }

  getInterestRates() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.rateProvider.getInterestRates()
      .then(data => {
        this.data = data;

        this.savings = this.data.savings_accounts;
        this.deposits = this.data.deposits;
        this.others = this.data.other;

        loading.dismiss();

        //declaring alive arrays for show/hide
        this.aliveSaving = new Array(this.data.savings_accounts.length).fill(false);
        this.aliveDeposits = new Array(this.data.deposits.length).fill(false);
        this.aliveOthers = new Array(this.data.other.length).fill(false);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestRatesPage');
  }

  onListClick(type, index) {
    switch (type) {
      case 's':
        this.aliveSaving[index] = !this.aliveSaving[index];
        break;
      case 'd':
        this.aliveDeposits[index] = !this.aliveDeposits[index];
        break;
      default:
        this.aliveOthers[index] = !this.aliveOthers[index];
        break;
    }
  }

  openNotificationPage(){
    this.navCtrl.push('NotificationsPage');
  }
}

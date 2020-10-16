import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {

  transactionsRoot = 'ETransactionsPage';
  accountDetailRoot = 'AccountDetailsPage';
  account:any;


  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public navParams: NavParams) {
    this.menuCtrl.enable(true, 'menuSlider');
    this.account = navParams.get('account');
  }

}

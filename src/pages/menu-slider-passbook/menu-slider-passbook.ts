import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, App } from 'ionic-angular';

/**
 * Generated class for the MenuSliderPassbookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-slider-passbook',
  templateUrl: 'menu-slider-passbook.html',
})
export class MenuSliderPassbookPage {
  rootPage = 'AccountListPage';

  @ViewChild(Nav) nav: Nav;

  pages: any;

  constructor(public navCtrl: NavController, public appCtrl: App) {
  }

  ionViewDidLoad() {
    this.pages = [
      { title: 'ACCOUNT LIST', pageName: 'AccountListPage', icon: 'md-analytics' },
      { title: 'NOTIFICATIONS', pageName: 'NotificationsPage', icon: 'md-notifications' },
      { title: 'LOCATE US', pageName: 'LocateUsPage', icon: 'md-pin' },
      { title: 'EXCHANGE RATES', pageName: 'ExchangeRatesPage', icon: 'md-trending-up' },
      { title: 'INTEREST RATES', pageName: 'InterestRatesPage', icon: 'md-podium' },
      { title: 'HELP', pageName: 'HelpPage', icon: 'md-help-circle' },
      // { title: 'PRIVACY POLICY', pageName: 'PrivacyPolicyPage', icon: 'md-lock' },
      { title: 'CONTACT US', pageName: 'ContactUsPage', icon: 'md-information-circle' },
      { title: 'ePASSBOOK SETTINGS', pageName: 'SettingsPage', icon: 'md-settings' },
    ];
  }

  openPage(page: any) {
    let params = {};
    this.nav.push(page.pageName, params);
  }

  isActive(page: any) {
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }
  logout() {
    this.appCtrl.getRootNav().setRoot('LoginPage');
  }
}

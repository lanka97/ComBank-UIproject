import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

// import { CallNumber } from '@ionic-native/call-number/ngx';

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
  // providers : [CallNumber]
})
export class ContactUsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

  makeCall(number) {
    // this.callNumber.callNumber(number, true)
    //   .then(res => console.log('Launched dialer!', res))
    //   .catch(err => console.log('Error launching dialer', err));
    console.log("calling", number)
  }

  openNotificationPage(){
    this.navCtrl.push('NotificationsPage');
  }
}

import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {InterestRatesPage} from './interest-rates';

@NgModule({
  declarations: [
    InterestRatesPage,
  ],
  imports: [
    IonicPageModule.forChild(InterestRatesPage),
  ],
})
export class InterestRatesPageModule {
}

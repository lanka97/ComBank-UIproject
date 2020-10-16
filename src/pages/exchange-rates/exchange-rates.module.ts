import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangeRatesPage } from './exchange-rates';

@NgModule({
  declarations: [
    ExchangeRatesPage,
  ],
  imports: [
    IonicPageModule.forChild(ExchangeRatesPage),
  ],
})
export class ExchangeRatesPageModule {}

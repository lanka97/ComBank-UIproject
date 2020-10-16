import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundTransferPage } from './fund-transfer';

@NgModule({
  declarations: [
    FundTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(FundTransferPage),
  ],
})
export class FundTransferPageModule {}

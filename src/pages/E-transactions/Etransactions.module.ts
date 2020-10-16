import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ETransactionsPage } from './Etransactions';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ETransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ETransactionsPage),
    NgxPaginationModule
  ],
})
export class TransactionsPageModule {}

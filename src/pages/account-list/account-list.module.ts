import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountListPage } from './account-list';

@NgModule({
  declarations: [
    AccountListPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountListPage),
  ],
})
export class AccountListPageModule {}

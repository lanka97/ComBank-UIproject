import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MobileBankingProfileSettingsPage} from './mobile-banking-profile-settings';

@NgModule({
  declarations: [
    MobileBankingProfileSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileBankingProfileSettingsPage),
  ],
})
export class MobileBankingProfileSettingsPageModule {
}

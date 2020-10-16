import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import {RateProvider} from '../providers/rate/rate';
import { Geolocation }              from '@ionic-native/geolocation';
import { HttpModule }               from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Network }                  from '@ionic-native/network';
import { FIREBASE_CONFIG }          from './app.firebase.config';
import * as firebase from 'firebase';


firebase.initializeApp(FIREBASE_CONFIG);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
    }),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityServiceProvider,
    Geolocation,
    Network,
    RateProvider
  ]
})
export class AppModule {}

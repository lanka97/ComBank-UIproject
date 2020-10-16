import {
  NavController,
  Platform,
  ViewController,
  IonicPage,
  NavParams
} from 'ionic-angular';

import {
  Component,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core';


import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';

declare var google;

@IonicPage()
@Component({
  selector: 'page-locate-us',
  templateUrl: 'locate-us.html',
})
export class LocateUsPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  locations: any;
  userPosition: any;
  searchText = 'Search for a Location'

  //
  mapElementi: any;
  pleaseConnecti: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  //free map api :D
  apiKey: string = "yourkey";
  markers: any = [];

  segment: string = "branch";

  //
  constructor(public navCtrl: NavController,
    public zone: NgZone,
    //  public maps: GoogleMapsProvider,
    public platform: Platform,
    public geolocation: Geolocation,
    public navparams: NavParams,
    public viewCtrl: ViewController,
    public http: Http, public connectivityService: ConnectivityServiceProvider) {
    this.saveDisabled = true;


  }

  changeMap() {
    console.log(this.segment);
    this.ionViewDidLoad();
  }

  ionViewDidLoad(): void {

    console.log('view loaded');

    if (this.segment == 'branch') {
      this.locations = [
        { "name": "Kaduwela", "lat": 6.9374181, "lng": 79.9773131 },
        { "name": "Malabe", "lat": 6.9046903, "lng": 79.9498657 },
        { "name": "Battaramulla", "lat": 6.9064142, "lng": 79.9076729 },
        { "name": "Thalawathugoda", "lat": 6.9055815, "lng": 79.9141319 },
        { "name": "Athurugiriya", "lat": 6.8762975, "lng": 79.9234651 }
        // {"name": "Thalawathugoda", "lat":},
      ]
    }

    if (this.segment == 'atm') {
      this.locations = [
        { "name": "Kaduwela", "lat": 6.9374181, "lng": 79.9773131 },
        { "name": "Malabe", "lat": 6.9046903, "lng": 79.9498657 },
        { "name": "Battaramulla", "lat": 6.9064142, "lng": 79.9076729 },
        { "name": "Thalawathugoda", "lat": 6.9055815, "lng": 79.9141319 },
        { "name": "Athurugiriya", "lat": 6.8762975, "lng": 79.9234651 }
        // {"name": "Thalawathugoda", "lat":},
      ]
    }
    this.searchDisabled = false;

    this.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

      this.zone.run(() => {
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.searchDisabled = false;
      });

      console.log('map provider');

      this.addUserMarker();

      for (let location of this.locations) {
        //console.log('marking',location.location.lat);
        this.addMarker(location);
        console.log(location);
      }


    });

  }

  //-------------------------------------------------------------------------

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElementi = mapElement;
    this.pleaseConnecti = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit&libraries=places';
          }

          document.body.appendChild(script);

        }
      } else {

        if (this.connectivityService.isOnline()) {
          this.initMap().then(() => {
            resolve(true);
          });
          this.enableMap();

          //resolve(true);
          console.log('second')


        }
        else {
          this.disableMap();
        }

        //resolve(true);

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition().then((position) => {

        //console.log('got position',position);
        this.userPosition = position;
        // this.addUserMarker(position);

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElementi, mapOptions);
        resolve(true);

      });

    });

  }

  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnecti.style.display = "block";
    }

  }

  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnecti.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      this.disableMap();

    });

  }

  addMarker(location: any): void {
    var image;
    // console.log(location);
    if (this.segment == 'branch') {
      image = {
        url: 'assets/imgs/bank.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      };
    }
    if (this.segment == 'atm') {
      image = {
        url: 'assets/imgs/atm.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      };
    }

    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };

    //console.log('inside add marker')
    let latLng = new google.maps.LatLng(location.lat, location.lng);

    let marker = new google.maps.Marker({
      icon: image,
      shape: shape,
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      title: location.name
    });
    //this.map.addMarker(marker);
    this.markers.push(marker);

  }

  addUserMarker(): void {

    var image = {
      url: 'assets/imgs/marker.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };

    //console.log('inside add marker')
    let latLng = new google.maps.LatLng(this.userPosition.coords.latitude, this.userPosition.coords.longitude);

    let marker = new google.maps.Marker({
      icon: image,
      shape: shape,
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    //this.map.addMarker(marker);
    this.markers.push(marker);

  }


  //-------------------------------------------------------------------------
  selectPlace(place) {

    this.places = [];
    this.placesService = new google.maps.places.PlacesService(this.map);

    let location = {
      lat: null,
      lng: null,
      name: place.name
    };

    this.placesService.getDetails({ placeId: place.place_id }, (details) => {

      this.zone.run(() => {

        location.name = details.name;
        this.query = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        this.saveDisabled = false;

        this.map.setCenter({ lat: location.lat, lng: location.lng });

        this.location = location;

      });

    });

  }

  searchPlace() {

    this.saveDisabled = true;

    if (this.query.length > 0 && !this.searchDisabled) {

      let config = {
        types: ['geocode'],
        input: this.query,
        componentRestrictions: { country: 'lk' }
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {

          this.places = [];

          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }

      });

    } else {
      this.places = [];
    }

  }

  save() {


    this.viewCtrl.dismiss(this.location);
  }

  close() {
    //typeof google ==null;
    // this.disableMap();
    this.viewCtrl.dismiss();
  }

  openNotificationPage(){
    this.navCtrl.push('NotificationsPage');
  }
}

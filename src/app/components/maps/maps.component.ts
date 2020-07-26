import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

declare const google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent extends BaseComponent {

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router
  ) { super(toastr, router, authService) }

  onInit() {
    const myLatlng = [
      [new google.maps.LatLng(-8.05428, -34.8813), 'Estacionamento do Seu zé'],
      [new google.maps.LatLng(-8.11208, -35.0154), 'Estacionamento de Dona Marieta'],
      [new google.maps.LatLng(-8.02044, -34.9817), 'Estacionamento Gusgay']
    ];
    const mapOptions = {
      zoom: 13,
      center: myLatlng[0][0],
      scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [{
        'featureType': 'water',
        'stylers': [{
          'saturation': 43
        }, {
          'lightness': -11
        }, {
          'hue': '#0088ff'
        }]
      }, {
        'featureType': 'road',
        'elementType': 'geometry.fill',
        'stylers': [{
          'hue': '#ff0000'
        }, {
          'saturation': -100
        }, {
          'lightness': 99
        }]
      }, {
        'featureType': 'road',
        'elementType': 'geometry.stroke',
        'stylers': [{
          'color': '#808080'
        }, {
          'lightness': 54
        }]
      }, {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.fill',
        'stylers': [{
          'color': '#ece2d9'
        }]
      }, {
        'featureType': 'poi.park',
        'elementType': 'geometry.fill',
        'stylers': [{
          'color': '#ccdca1'
        }]
      }, {
        'featureType': 'road',
        'elementType': 'labels.text.fill',
        'stylers': [{
          'color': '#767676'
        }]
      }, {
        'featureType': 'road',
        'elementType': 'labels.text.stroke',
        'stylers': [{
          'color': '#ffffff'
        }]
      }, {
        'featureType': 'poi',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'landscape.natural',
        'elementType': 'geometry.fill',
        'stylers': [{
          'visibility': 'on'
        }, {
          'color': '#b8cb93'
        }]
      }, {
        'featureType': 'poi.park',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'poi.sports_complex',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'poi.medical',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'poi.business',
        'stylers': [{
          'visibility': 'simplified'
        }]
      }]
    };

    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    myLatlng.forEach(position => {

      const infowindow = new google.maps.InfoWindow({
        content: position[1]
      });

      const marker = new google.maps.Marker({
        position: position[0],
        map: map,
        shape: shape,
        animation: google.maps.Animation.DROP,
        draggable: true,
        title: 'Estacionamento do seu zé'
      });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });
    });
  }

}

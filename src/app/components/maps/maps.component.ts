import { Component } from '@angular/core';
import { BaseComponent } from 'app/base.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { } from 'googlemaps';
import { ParkingService } from 'app/services/parking.service';
import Parking from 'app/models/parking.model';
import { Utils } from 'app/commons/core/utils';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

interface MapContent {
  position: google.maps.LatLng;
  parking: Parking;
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
    public parkingService: ParkingService,
    public router: Router
  ) { super(toastr, router, authService) }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onInit() {
    this.onLoadList()
      .then((mapContents: MapContent[]) => {
        if (mapContents.length > 0) {
          const mapOptions: google.maps.MapOptions = this.onLoadMapOptions(mapContents);
          const shape: google.maps.MarkerShape = this.onLoadMapShape();
          const map: google.maps.Map = new google.maps.Map(document.getElementById('map'), mapOptions);

          mapContents.forEach((mapContent: MapContent) => {

            let _content = '<div id="iw-container">' +
              `<div class="iw-title">${mapContent.parking.name}</div>` +
              '<div class="iw-content">' +
              '<br>' +
              '<div class="iw-subTitle">Contact</div>' +
              `<p>${mapContent.parking.address.street}, <br>${mapContent.parking.address.district} - ${mapContent.parking.address.country}<br>` +
              `<br>Tel. ${mapContent.parking.phone}<br>email: ${mapContent.parking.email}</p>` +
              '</div>' +
              '<div class="iw-bottom-gradient"></div>' +
              '</div>';

            const infowindow = new google.maps.InfoWindow({
              content: _content,
              maxWidth: 350
            });

            const marker = new google.maps.Marker({
              position: mapContent.position,
              map: map,
              animation: google.maps.Animation.DROP,
              draggable: true,
              title: mapContent.parking.name,
              icon: '../../../assets/img/favicon.ico',
            });

            marker.addListener('dragend', () => {
              let parking = new Parking(mapContent.parking);
              parking.address.latitude = marker.getPosition().toJSON().lat;
              parking.address.longitude = marker.getPosition().toJSON().lng;
              this.save(parking);
            });

            marker.addListener('click', function () {
              infowindow.open(map, marker);
            });

            google.maps.event.addListener(infowindow, 'domready', function () {

              // Referência ao DIV que agrupa o fundo da infowindow
              var iwOuter = $('.gm-style-iw');
              var iwBackground = iwOuter.prev();

              // Remover o div da sombra do fundo
              iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

              // Remover o div de fundo branco
              iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

              // Desloca a sombra da seta a 76px da margem esquerda 
              iwBackground.children(':nth-child(1)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

              // Desloca a seta a 76px da margem esquerda 
              iwBackground.children(':nth-child(3)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

              // Altera a cor desejada para a sombra da cauda
              iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });

              // Se o conteúdo da infowindow não ultrapassar a altura máxima definida, então o gradiente é removido.
              if ($('.iw-content').height() < 140) {
                $('.iw-bottom-gradient').css({ display: 'none' });
              }
            });

          });
        }
      });
  }

  private onLoadMapShape(): google.maps.MarkerShape {
    return {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
  }


  private onLoadList() {
    return new Promise((resolve, reject) => {
      let mapContents: MapContent[] = [];
      this.parkingService.toList()
        .then((result: Parking[]) => {
          result.forEach((parking: Parking) => {
            if (Utils.isValid(parking.address)) {
              let latitude = parking.address.latitude;
              let longitude = parking.address.longitude;
              if (latitude != 0 && longitude != 0) {
                mapContents.push(
                  {
                    position: new google.maps.LatLng(latitude, longitude),
                    parking: parking
                  }
                );
              }
            }
          });

          resolve(mapContents);
        }).catch(error => reject(this.toastr.error(error, 'Error')));
    });
  }

  private onLoadMapOptions(mapContents: MapContent[]): google.maps.MapOptions {
    return {
      zoom: 13,
      center: mapContents[0].position,
      scrollwheel: false,
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
  }

  public save(parking: Parking) {
    this.onBuildConfirmMessage({
      title: 'Are you sure?',
      text: `The parking location '${parking.name}' will be changed!`,
      confirmButtonText: 'Yes, do it!',
      icon: 'question'
    })
      .then((btn) => {
        if (btn.isConfirmed) {
          this.onStartLoading();
          this.parkingService.update(parking)
            .then(result => {
              this.onStopLoading();
              this.onSuccessMessage('Saved Successfully!', result);
            }).catch(error => {
              this.onErrorMessage('Error', error.message);
              this.onStopLoading();
            });
        }
      });
  }

}

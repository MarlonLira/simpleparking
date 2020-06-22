import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.userProfileForm = new FormGroup({
      name: new FormControl('Marlon Lira'),
      registryCode: new FormControl('091.773.504-80'),
      phone: new FormControl('(81) 9 85856666'),
      email: new FormControl('marlon@gmail.com'),
      adress: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
      company: new FormControl({ value: 'SSTEC', disabled: true })
    });
  }

}

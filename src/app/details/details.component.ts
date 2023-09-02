import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article>
      <img [src]="'https://angular.io/assets/images/tutorials/faa/'+housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}" class="listing-photo">
      <section class="listing-description">
        <h2 class="listing-description">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input type="text" id="first-name" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName">

          <label for="email">Email</label>
          <input type="text" id="email" formControlName="email">

          <button type="submit" class="primary">Apply Now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocationId = -1;
  housingLocation?: HousingLocation;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(this.housingLocationId)
      .then(data => this.housingLocation = data)
  }
}

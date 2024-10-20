import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage {
  isChecked = false;

  constructor(private router: Router) {}

  onAccept() {
    const cellNumber = localStorage.getItem('phoneNumber');
    const accountDetails = localStorage.getItem('accountForm');
    const dataToSend = {
      cellNumber: cellNumber ? JSON.parse(cellNumber) : null,
      accountDetails: accountDetails ? JSON.parse(accountDetails) : null,
    };

    console.log('Datos del registro exitoso:', dataToSend);

    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('accountForm');

    this.router.navigate(['/home']);
  }
}

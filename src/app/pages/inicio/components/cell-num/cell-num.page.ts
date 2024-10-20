import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-cell-num',
  templateUrl: './cell-num.page.html',
  styleUrls: ['./cell-num.page.scss'],
})
export class CellNumPage implements OnInit {
  phoneNumber: string = '';
  max_length: number = 10;

  constructor(private router: Router) {}

  ngOnInit() {
    // Recuperar el número de teléfono desde localStorage si existe
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
      this.phoneNumber = storedPhoneNumber;
    }
  }

  add(num: string) {
    if (this.phoneNumber.length < this.max_length) {
      this.phoneNumber += num;
      // Guardar el número de teléfono actualizado en localStorage
      localStorage.setItem('phoneNumber', this.phoneNumber);
    }
  }

  dele() {
    this.phoneNumber = this.phoneNumber.slice(0, -1);
    // Actualizar el número de teléfono en localStorage
    localStorage.setItem('phoneNumber', this.phoneNumber);
  }

  get formattedPhoneNumber(): string {
    const s = this.phoneNumber;
    if (s.length > 0) {
      let formatted = '';
      if (s.length <= 3) {
        formatted = s;
      } else {
        formatted = s.substring(0, 3) + '  ' + s.substring(3);
      }
      return formatted;
    } else {
      return '';
    }
  }

  submitPhoneNumber() {
    // Navegar a la siguiente página sin pasar parámetros
    this.router.navigate(['/inicio/cell-num/account-details']);
  }
}

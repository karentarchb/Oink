import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AccountDetailsService } from 'src/app/services/account-details.service';
import { DocumentType, Gender } from './models/account-detail.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.page.html',
  styleUrls: ['./account-details.page.scss'],
})
export class AccountDetailsPage implements OnInit {
  accountForm: FormGroup;
  documentTypes: DocumentType[] = [];
  genders: Gender[] = [];
  hidePassword1 = true;
  hidePassword2 = true;

  @ViewChild('picker1') picker1!: MatDatepicker<any>;
  @ViewChild('picker2') picker2!: MatDatepicker<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountDetailsService: AccountDetailsService,
    private loadingCtrl: LoadingController
  ) {
    this.accountForm = this.fb.group(
      {
        documentType: ['', Validators.required],
        documentNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        documentIssueDate: ['', Validators.required],
        birthDate: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
        pin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
        confirmPin: ['', [Validators.required, this.matchOtherValidator('pin')]],
      },
      {
        validators: [this.matchEmails],
      }
    );
  }

  ngOnInit() {
    this.loadDocumentTypes();
    this.loadGenders();
    this.loadFormDataFromLocalStorage();
  }

  loadDocumentTypes() {
    this.showLoading();
    this.accountDetailsService.getDocumentTypes().subscribe(
      (res: DocumentType[]) => {
      this.documentTypes = res;
    },err =>{
      console.log('Algo salió mal:', err);
    });
  }

  loadGenders() {
    this.accountDetailsService.getGenders().subscribe(
      (res: Gender[]) => {
      this.genders = res;
    },err =>{
      console.log('Algo salió mal:', err);
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: '<img src="../../../assets/icon/OinkPolicia.svg"/><br><br>Espera...',
      spinner: null,
      duration: 1000,
      translucent: true,
      cssClass:"loading"
    });

    loading.present();
  }

  loadFormDataFromLocalStorage() {
    const savedForm = localStorage.getItem('accountForm');
    if (savedForm) {
      const formValues = JSON.parse(savedForm);

      if (formValues.documentIssueDate) {
        formValues.documentIssueDate = new Date(formValues.documentIssueDate);
      }
      if (formValues.birthDate) {
        formValues.birthDate = new Date(formValues.birthDate);
      }

      this.accountForm.setValue(formValues);
    }
  }

  saveFormDataToLocalStorage() {
    const formValues = this.accountForm.value;

    if (formValues.documentIssueDate) {
      const date = new Date(formValues.documentIssueDate);
      if (!isNaN(date.getTime())) {
        formValues.documentIssueDate = date.toISOString();
      } else {
        formValues.documentIssueDate = null;
      }
    }

    if (formValues.birthDate) {
      const date = new Date(formValues.birthDate);
      if (!isNaN(date.getTime())) {
        formValues.birthDate = date.toISOString();
      } else {
        formValues.birthDate = null;
      }
    }

    localStorage.setItem('accountForm', JSON.stringify(formValues));
  }

  matchEmails: ValidatorFn = (group: AbstractControl) => {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { emailsMismatch: true };
  };

  matchOtherValidator(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control.parent;
      if (!formGroup) return null;
      const otherControl = formGroup.get(otherControlName);
      if (!otherControl) return null;
      if (control.value !== otherControl.value) {
        return { notMatch: true };
      }
      return null;
    };
  }

  toggleHidePassword1() {
    this.hidePassword1 = !this.hidePassword1;
  }

  toggleHidePassword2() {
    this.hidePassword2 = !this.hidePassword2;
  }

  onlyNumber(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onInputPin(event: any) {
    const input = event.target;
    if (input.value.length > 4) {
      input.value = input.value.slice(0, 4);
      const controlName = input.getAttribute('formcontrolname');
      this.accountForm.get(controlName)?.setValue(input.value);
    }
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.saveFormDataToLocalStorage();
      this.router.navigate(['/inicio/cell-num/account-details/terms']);
    } else {
      this.accountForm.markAllAsTouched();
    }
  }
}

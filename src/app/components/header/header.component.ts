import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string = '';

  radioBtn: FormGroup;

  constructor(private fb : FormBuilder) {
    this.radioBtn = this.fb.group({
      radioOne: ['cell-num'],
      radioTwo: [''],
      radioTre: ['']
    })
  }

  ngOnInit() {
    if(this.title === 'DATOS DE CUENTA'){
      this.radioBtn = this.fb.group({
        radioOne: ['cell-num'],
        radioTwo: ['account-details'],
        radioTre: ['']
      })
    } else if(this.title === 'FINALIZAR'){
      this.radioBtn = this.fb.group({
        radioOne: ['cell-num'],
        radioTwo: ['account-details'],
        radioTre: ['terms']
      })
    }
  }

  handleChange(ev: any) {
    let route = ev.detail.value;
    console.log('Current value:', route);

    this.radioBtn.patchValue({
      radioSelection: 'cell-num'
    });
  }

  trackItems(index: number, item: any) {
    return item.id;
  }
}

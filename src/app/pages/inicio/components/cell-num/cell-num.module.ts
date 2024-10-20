import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CellNumPageRoutingModule } from './cell-num-routing.module';

import { CellNumPage } from './cell-num.page';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CellNumPageRoutingModule,
    ComponentsModule
],
  declarations: [CellNumPage]
})
export class CellNumPageModule {}

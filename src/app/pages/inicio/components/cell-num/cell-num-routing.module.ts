import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CellNumPage } from './cell-num.page';

const routes: Routes = [
  {
    path: '',
    component: CellNumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CellNumPageRoutingModule {}

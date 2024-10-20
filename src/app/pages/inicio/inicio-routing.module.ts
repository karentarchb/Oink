import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  },
  {
    path: 'cell-num',
    loadChildren: () => import('./components/cell-num/cell-num.module').then( m => m.CellNumPageModule)
  },
  {
    path: 'cell-num/account-details',
    loadChildren: () => import('./components/account-details/account-details.module').then( m => m.AccountDetailsPageModule)
  },
  {
    path: 'cell-num/account-details/terms',
    loadChildren: () => import('./components/terms/terms.module').then( m => m.TermsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}

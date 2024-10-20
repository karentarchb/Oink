import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopFinishComponent } from 'src/app/components/pop-finish/pop-finish.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.openDialog()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopFinishComponent, {
      height: '349px',
      width:'269px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

}

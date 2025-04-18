import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { BreadcurumbComponent } from 'src/app/components/breadcurumb/breadcurumb.component';
import { ClientTableListComponent } from 'src/app/components/client-table-list/client-table-list.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    BreadcurumbComponent,
    ClientTableListComponent,
    CommonModule
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {
  userRole: any = '';
  ngOnInit(): void {
  }
}

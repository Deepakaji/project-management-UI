import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcurumb',
  imports: [CommonModule],
  templateUrl: './breadcurumb.component.html',
  styleUrl: './breadcurumb.component.scss'
})
export class BreadcurumbComponent {
  @Input() userRole: string = '';
}

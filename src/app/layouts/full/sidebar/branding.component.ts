import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  imports: [],
  template: `
    <div class="branding-title d-none d-lg-flex align-items-center">
        <span>Project Mangement</span>
    </div>
  `,
  styleUrls: ['./branding.component.scss'],
})
export class BrandingComponent {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {}
}

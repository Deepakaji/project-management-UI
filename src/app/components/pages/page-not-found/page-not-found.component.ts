import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [CommonModule,RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})

export class PageNotFoundComponent implements OnInit {
  stars: any[] = [];

  ngOnInit(): void {
    this.generateStars(30);

    setInterval(() => {
      const newStars = this.generateStars(10);
      this.stars = [...this.stars.slice(-20), ...newStars];
    }, 4000);
  }

  generateStars(count: number): any[] {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 4,
      direction: Math.random() > 0.5 ? 'topLeft' : 'topRight'
    }));
  }
}

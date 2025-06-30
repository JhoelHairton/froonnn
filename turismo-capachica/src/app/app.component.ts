import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
  <app-navbar></app-navbar>
  <div class="pt-[80px]">
    <router-outlet />
  </div>
`,
})
export class AppComponent {
  title = 'turismo-capachica';
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => window.scrollTo(0, 0));
  }

  
}

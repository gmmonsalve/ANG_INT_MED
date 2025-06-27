import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'courseManager';
  private router: Router = inject(Router);
  isAdminView: boolean = false;

  toggleAdminView() {
    this.isAdminView = !this.isAdminView;
    if (this.isAdminView) {
     this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/cursos']);
    }
  }
}

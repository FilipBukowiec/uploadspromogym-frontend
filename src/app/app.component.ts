import { Component } from '@angular/core';
import { FormComponent } from './components/form/form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ FormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'form';
}

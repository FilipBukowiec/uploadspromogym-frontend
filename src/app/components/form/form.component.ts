import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { FormsModule } from '@angular/forms';
import { EventForm } from '../../models/event-form.model';
import { FormService } from '../../services/form.service';


@Component({
  selector: 'app-form',
  imports: [CommonModule, LoaderComponent, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
loader: boolean = false;
  eventTypes = ["Hyrox", "CrossFit"];
  focused: boolean = false;


  event: EventForm = {
    type: '',
    city: '',
    date: null,
    clubCity: '',
    files: null,
    terms: false,
  };

  constructor(private formService: FormService) { }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.event.files = input.files ? Array.from(input.files) : null;
  }

  more() {
    console.log("more")
  }

  onSubmit() {
    if (!this.event.files?.length) return alert("Wybierz co najmniej 1 plik");
    if (!this.event.terms) return alert("Zaakceptuj warunki");

    const requiredFields = [
      { value: this.event.type, name: 'Rodzaj wydarzenia' },
      { value: this.event.city, name: 'Miasto' },
      { value: this.event.clubCity, name: 'Nazwa klubu i miasto' },
      { value: this.event.date, name: 'Data wydarzenia' }
    ];

    const emptyField = requiredFields.find(f => !f.value?.toString().trim());
    if (emptyField) return alert(`Wypełnij pole: ${emptyField.name}`);

    this.loader = true;
    const formData = new FormData();
    formData.append("type", this.event.type);
    formData.append("city", this.event.city);
    formData.append("date", this.event.date || "");
    formData.append("clubCity", this.event.clubCity);
    formData.append("terms", this.event.terms.toString());

    this.event.files.forEach(file => {
      formData.append("files", file);
    })


    this.formService.uploadEvent(formData).subscribe({
      next: (data) => {
        console.log("backend:", data);
        this.loader = false;
        setTimeout(() => {
          alert("Pliki wysłane");
        }, 50);
      },
      error: (err) => {
        console.error("Błąd wysyłki", err);
        alert("Wystąpił błąd przy wysyłce plików")
      }
    })
  }
}





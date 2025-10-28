import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { NgbModal, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-form',
  imports: [CommonModule, LoaderComponent, NgbToastModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private modalService = inject(NgbModal);

  loader = false;
  focused = false;
  eventTypes = ['Hyrox', 'CrossFit'];

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      city: ['', Validators.required],
      date: ['', Validators.required],
      clubCity: ['', Validators.required],
      files: [null, Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : null;
    this.form.patchValue({ files });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastService.show('warning', 'Uzupełnij wszystkie wymagane pola', 'Błąd',)
      this.form.markAllAsTouched();
      return;
    }

    this.loader = true;
    const formData = new FormData();
    const formValue = this.form.value;

    formData.append('type', formValue.type);
    formData.append('city', formValue.city);
    formData.append('date', formValue.date || '');
    formData.append('clubCity', formValue.clubCity);
    formData.append('terms', formValue.terms.toString());

    formValue.files.forEach((file: File) => {
      formData.append('files', file);
    });

    this.formService.uploadEvent(formData).subscribe({
      next: (data) => {
        this.loader = false;
        this.toastService.show('success', 'Pliki wysłane pomyślnie!', 'Sukces');
        this.form.reset();
        this.form.get('type')?.setValue('');
        this.fileInput.nativeElement.value = "";

      },
      error: (err) => {
        this.loader = false;
        console.error('Błąd wysyłki', err);
        this.toastService.show('error', 'Nie udało się wysłać danych', 'Błąd');
      },
    });

  }

  openTermsModal(content: TemplateRef<any>) {
    this.modalService.open(content, {
      centered: true,
      scrollable: true,
      modalDialogClass: 'dark-modal',
    });
  }
}



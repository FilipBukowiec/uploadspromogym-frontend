import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  show(type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) {
    const options = {
      positionClass: "toast-top-right",
    }
    this.toastr[type](title, message, options)
  }
}

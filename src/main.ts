import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig = {
  providers: [
    provideHttpClient(),
    NgbModule,
    BrowserAnimationsModule,
   provideAnimations(),
  provideToastr()]
};


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

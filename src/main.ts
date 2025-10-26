import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig = {
  providers: [
    provideHttpClient(),
    NgbModule,
    BrowserAnimationsModule]
};


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

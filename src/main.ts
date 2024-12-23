import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BannerComponent} from './app/banner/banner.component';

appConfig.providers.push(BrowserAnimationsModule);
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
bootstrapApplication(BannerComponent)
  .catch(err => console.error(err));

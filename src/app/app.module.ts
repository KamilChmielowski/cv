import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SectionTitleComponent } from './section-title/section-title.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularSvgIconModule.forRoot(),
    BrowserModule,
    HeaderComponent,
    HttpClientModule,
    SectionTitleComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

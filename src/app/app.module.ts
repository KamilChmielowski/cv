import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularSvgIconModule.forRoot(),
    ArticleComponent,
    AsideComponent,
    BrowserModule,
    HeaderComponent,
    HttpClientModule,
    SectionTitleComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

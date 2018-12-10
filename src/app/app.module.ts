import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgVkUiModule } from 'projects/ng-vk-ui/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgVkUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { ScrollComponent } from './scroll.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ScrollComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollComponent
  ]
})
export class ScrollModule { }

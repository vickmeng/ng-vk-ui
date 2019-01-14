import { NgModule } from '@angular/core';
import { RichtextModule } from './richtext/richtext.module';
import { ScrollModule } from './scroll/scroll.module';

const UIModules = [
  RichtextModule,
  ScrollModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...UIModules,
  ],
  exports: [
    ...UIModules,
  ]
})
export class NgVkUiModule { }

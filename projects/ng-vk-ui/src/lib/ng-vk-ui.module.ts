import { NgModule } from '@angular/core';
import { RichtextModule } from './richtext/richtext.module';
const UIModules = [
  RichtextModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...UIModules
  ],
  exports: [
    ...UIModules
  ]
})
export class NgVkUiModule { }

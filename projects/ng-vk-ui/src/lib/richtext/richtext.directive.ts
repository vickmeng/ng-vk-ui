import { Directive, OnInit, Input, AfterViewInit, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as wangEditor from 'wangeditor/release/wangEditor.min.js';

@Directive({
  selector: '[vkRichtext]',
  providers: [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichtextDirective),
      multi      : true,
    }
  ]
})
export class RichtextDirective implements OnInit , AfterViewInit, ControlValueAccessor {
  editor;
  isDisabled = false;

  _onChange: (_: any) => void = () => null;
  _onTouched: () => void = () => null;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.editor = new wangEditor(this.elementRef.nativeElement);
  }

  ngAfterViewInit() {
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.customConfig.onchange = this.onChange;
    this.editor.create();
  }

  onChange = (value: string) => {
    this._onChange(value);
  }

  writeValue = (value: string) => {
    if (value) {
      this.editor.txt.html(value);
    }
  }

  registerOnChange(fn: (_: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}

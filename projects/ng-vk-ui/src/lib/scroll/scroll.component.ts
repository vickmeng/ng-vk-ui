import { Component, Input, ViewChild, ElementRef , AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

import {fromEvent, interval, of, Subscription} from 'rxjs';
import { switchMap, take, mapTo} from 'rxjs/operators';


export interface Scroll {
  event: Event;
  state: 'start' | 'end';
}

@Component({
  selector: 'vk-scroll',
  template: `
    <div #scrollBox class="scrollBox" [ngStyle]="{'height': height}">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .scrollBox{overflow-y:scroll}
  `]
})
export class ScrollComponent implements AfterViewInit {
  @Input()height = 'auto';

  @Output()scrollStart = new EventEmitter<Scroll>();
  @Output()scrollEnd = new EventEmitter<Scroll>();

  @ViewChild('scrollBox')scrollBox: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.createScrollEvent();
  }

  createScrollEvent(): Subscription {
    const scrollEvent$ = fromEvent(this.scrollBox.nativeElement, 'scroll').pipe(
      switchMap((ev, i) => i ? interval(200).pipe(
            mapTo({event: ev, state: 'end'}),
          ) : of({event: ev, state: 'start'})
      ),
      take(2)
    );

    return scrollEvent$
      .subscribe(
        this.handleNext,
        () => {},
        () => this.createScrollEvent(),
      );
  }

  handleNext = (scroll: Scroll) => {
    switch (scroll.state) {
      case 'start':
        return this.scrollStart.emit(scroll);
      case 'end':
        return this.scrollEnd.emit(scroll);
    }
  }


}

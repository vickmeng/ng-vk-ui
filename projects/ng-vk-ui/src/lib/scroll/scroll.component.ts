import {
  Component,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  fromEvent,
  interval,
  Subscription,
  timer,
  Observable
} from 'rxjs';

import {
  switchMap,
  take,
  mapTo,
  map
} from 'rxjs/operators';

export interface ScrollStart {
  event: Event;
  state: 'start';
}

export interface ScrollEnd {
  event: Event;
  state: 'end';
}

export type Scroll = ScrollStart | ScrollEnd;

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
export class ScrollComponent implements AfterViewInit , OnDestroy {
  scrollSubscription: Subscription;

  @Input()height = 'auto';
  @Output()scrollStart = new EventEmitter<Scroll>();
  @Output()scrollEnd = new EventEmitter<Scroll>();
  @ViewChild('scrollBox')scrollBox: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.handleDefineScrollEvent();
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  handleDefineScrollEvent = () => this.scrollSubscription = this.getScrollScrollSubscription();

  getScrollStart = (ev: Event): Observable<any> => timer(0 , 200).pipe(
    map<number, Scroll>((v, i ) => i ? {event: ev, state: 'end'} : {event: ev, state: 'start'}),
    take(2),
  )

  getScrollEnd = (ev: Event): Observable<any> => interval(200).pipe(
    mapTo<number, Scroll>({event: ev, state: 'end'}),
    take(2),
  )

  getScrollScrollSubscription = (): Subscription => {
    const scroll$ = fromEvent(this.scrollBox.nativeElement, 'scroll').pipe(
      switchMap(
        (ev: Event, i: number) => i ? this.getScrollEnd(ev) : this.getScrollStart(ev)
      ),
      take(2)
    );

    return scroll$
      .subscribe(
        this.handleNext,
        () => {},
        this.handleDefineScrollEvent,
      );
  }

  handleNext = (scroll: Scroll) => {
    switch (scroll.state) {
      case 'start':
        return this.scrollStart.emit(scroll);
      case 'end':
        return this.scrollEnd.emit(scroll);
      default:
        return ;
    }
  }
}

import { Component} from '@angular/core';
import { Scroll } from 'projects/ng-vk-ui/src/lib/scroll/scroll.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  a = 1;

  show = true;

  constructor() {
  }

  onScrollStart(e: Scroll) {
    console.log(e);
  }

  onScrollEnd(e: Scroll) {
    console.log(e);
  }

}

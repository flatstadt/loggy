import { Component } from '@angular/core';
import { LoggyMethod, LoggyProperty } from '@lapita/loggy';

import { log } from '../logger';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

  @LoggyProperty((t) => log.global(t), {logValue: true, accessType: 'set'})
  title = 'Loggy! Open the console.';

    constructor() {
        log.global('It preserves the line numbers', {obj: 'test'});
        log.auth('auth failed');
        log.dashboard('dashboard init');
        this.testMethod();
    }

    @LoggyMethod((t) => log.global(t))
    testMethod() {
      for (let index = 0; index < 1000000; index++) {
          const text = String(index);
          const number = +text;
      }
    }
}

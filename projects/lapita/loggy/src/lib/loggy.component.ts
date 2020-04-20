import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-loggy',
  template: `
    <p>
      loggy works!
    </p>
  `,
  styles: []
})
export class LoggyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Injectable, Injector, InjectionToken } from '@angular/core';

import { Observable, Subject, Subscriber } from 'rxjs/Rx';

export const DIALOG_TOKEN = new InjectionToken<Dialog>("dialog");

export class Dialog {

  private value: Subject<any> = new Subject();
  private preclosing: Function;

  readonly afterClose: Observable<any> = Observable.from(this.value);
  readonly component: any;
  readonly data: any;

  constructor({
    component,
    preclosing = (() => true),
    data = {}
  }) {
    this.component = component;
    this.preclosing = preclosing;
    this.data = data;
  }

  prepareClosing(value?) {
    let conclusion = this.preclosing(value);
    
    return ((conclusion instanceof Promise)
      ? conclusion
      : (conclusion ? Promise.resolve() : Promise.reject(value)));
  }

  complete(value?) {
    this.value.next(value);
    this.value.complete();
  }

  close(value?): Observable<any> {

    this.prepareClosing(value).then(() => {
      this.complete(value);
    }, () => {});

    return this.afterClose;
  }
}



@Injectable()
export class DialogService {

  readonly dialogs = new Set<Dialog>();

  constructor() { }

  open(option) {

    let dialog = new Dialog(option);

    dialog.afterClose.subscribe(() => {
      this.dialogs.delete(dialog);
    })

    this.dialogs.add(dialog);

    return dialog;
  }

  closeAll() {
    let dialogs = Array.from(this.dialogs);

    return Promise.all(dialogs.map(dialog => dialog.prepareClosing())).then(() => {
      this.completeAll();
    });
  }

  completeAll() {
    this.dialogs.forEach(dialog => {
      dialog.complete();
    });
  }

}

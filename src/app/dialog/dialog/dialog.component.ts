import {
  Component,
  Directive,
  Input,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  EventEmitter,
  Injector
} from '@angular/core';

import { Dialog, DIALOG_TOKEN } from '../dialog.service';


class DialogInjector implements Injector {
  constructor(
    private parentInjector: Injector,
    private dialog: Dialog
  ) { }

  get(token: any, notFoundValue?: any) {
    if (token == DIALOG_TOKEN) {
      return this.dialog;
    }
    return this.parentInjector.get(token, notFoundValue);
  }
}



@Directive({
  selector: '[dl-dialog]'
})
export class DialogComponent implements OnInit {

  @Input("dl-dialog") dialog;

  constructor(
    private resolver:ComponentFactoryResolver,
    private viewContainer:ViewContainerRef
  ) { }

  ngOnInit() {
    let dialog = this.dialog;
    let data = dialog.data;
    let factory = this.resolver.resolveComponentFactory(dialog.component);
    let component = this.viewContainer.createComponent(factory, null, new DialogInjector(this.viewContainer.injector, dialog));
    let instance = component.instance;

    factory.inputs.forEach(({ propName, templateName }) => {
      if (templateName in data) {
        instance[propName] = data[templateName];
      }
    });

    factory.outputs.forEach(({ propName, templateName }) => {
      if (instance[propName] && (templateName in data)) {
        (<EventEmitter<any>>instance[propName]).subscribe(event => {
          data[templateName](event);
        });
      }
    });
  }

}

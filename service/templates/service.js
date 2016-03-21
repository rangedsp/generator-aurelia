import {inject} from 'aurelia-framework';

@inject(dependency)
export class <%= ServiceName %> {
  constructor(dependency) {
    this.dependency = dependency;
  }

  method() {
  }
}


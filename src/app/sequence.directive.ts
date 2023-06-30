import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[sequence]'
})
export class SequenceDirective implements OnInit{
  @Input('sequence') amount: number = 0;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    for (let i = 0; i < this.amount; i++) {
      // add element to the DOM
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}

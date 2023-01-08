export const TEMPLATE = `
<ng-template #content><ng-content></ng-content></ng-template>

<ng-template #viewer>
  <div *ngIf="container === true; else noContainer" #containerRef>
    <ng-template [ngTemplateOutlet]="content"></ng-template>
  </div>

  <ng-template #noContainer>
    <ng-template [ngTemplateOutlet]="content"></ng-template>
  </ng-template>
</ng-template>

<div *ngIf="elementRef.nativeElement.tagName.indexOf('NGX-') === 0; else noWrapper" #wrapperRef>
  <ng-template [ngTemplateOutlet]="viewer"></ng-template>
</div>

<ng-template #noWrapper>
  <ng-template [ngTemplateOutlet]="viewer"></ng-template>
</ng-template>
`;

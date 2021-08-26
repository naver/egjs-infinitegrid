export const TEMPLATE = `
<ng-template #content><ng-content></ng-content></ng-template>

<ng-template #viewer>
  <ng-template [ngIf]="container === true" [ngIfElse]="noContainer">
    <div #containerRef>
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </div>
  </ng-template>
  <ng-template #noContainer>
    <ng-container *ngTemplateOutlet="content"></ng-container>
  </ng-template>
</ng-template>

<ng-template [ngIf]="elementRef.nativeElement.tagName.indexOf('NGX-') === 0" [ngIfElse]="noWrapper">
  <div #wrapperRef>
    <ng-container *ngTemplateOutlet="viewer"></ng-container>
  </div>
</ng-template>

<ng-template #noWrapper>
  <ng-container *ngTemplateOutlet="viewer"></ng-container>
</ng-template>
`;

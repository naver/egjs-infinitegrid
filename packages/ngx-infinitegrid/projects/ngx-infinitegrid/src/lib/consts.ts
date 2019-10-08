import { CONTAINER_CLASSNAME } from '@egjs/infinitegrid';

export const TEMPLATE = `
  <ng-template #content><ng-content></ng-content></ng-template>
  <ng-template #viewer>
    <ng-template [ngIf]="options.isOverflowScroll" [ngIfElse]="noContainer">
      <div class="${CONTAINER_CLASSNAME}">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </div>
    </ng-template>
    <ng-template #noContainer>
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </ng-template>
  </ng-template>
  <ng-template [ngIf]="elRef.nativeElement.tagName==='NGX-INFINITEGRID'" [ngIfElse]="noWrapper">
    <div #wrapper>
      <ng-container *ngTemplateOutlet="viewer"></ng-container>
    </div>
  </ng-template>
  <ng-template #noWrapper>
    <ng-container *ngTemplateOutlet="viewer"></ng-container>
  </ng-template>
  `

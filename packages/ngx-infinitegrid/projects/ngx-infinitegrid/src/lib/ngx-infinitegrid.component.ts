import {
  Component, OnInit, ViewChild, ElementRef,
  Input, Output, EventEmitter, OnDestroy, OnChanges,
  AfterViewInit, AfterViewChecked,
} from '@angular/core';

import NativeInfiniteGrid, {
  GridLayout,
  ILayout,
  categorize,
  ItemManager,
  IItem,
  IInfiniteGridStatus,
  IInfiniteGridItem,
  StyleType,
  IGNORE_CLASSNAME,
  IInfiniteGridOptions,
  INFINITEGRID_EVENTS,
} from '@egjs/infinitegrid';
import ListDiffer from '@egjs/list-differ';
import { TEMPLATE } from './consts';
import NgxinfiniteGridInterface from './ngx-infinitegrid.interface';
import { InfiniteGridType } from './types';

@Component({
  selector: 'ngx-infinitegrid, [NgxInfiniteGrid]',
  template: TEMPLATE,
  styles: []
})
export class NgxInfiniteGridComponent
  extends NgxinfiniteGridInterface
  implements OnInit, AfterViewInit, AfterViewChecked,
  OnDestroy, OnChanges {

  @Input() public trackBy: ((index: number, item: any) => any) = ((_, item) => item.key);
  @Input() public groupBy: ((index: number, item: any) => any) = ((_, item) => item.groupKey);
  @Input() public items: IItem[] = [];
  @Input() public status!: IInfiniteGridStatus;
  @Input() public loading!: HTMLElement;
  @Input() public useFirstRender = false;
  @Input() public layoutType: new () => ILayout = GridLayout;
  @Input() public options: Partial<IInfiniteGridOptions> = {};
  @Input() public layoutOptions: Partial<ILayout['options']> = {};

  @Output() public append: EventEmitter<any> = new EventEmitter();
  @Output() public prepend: EventEmitter<any> = new EventEmitter();
  @Output() public imageError: EventEmitter<any> = new EventEmitter();
  @Output() public contentError: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-native
  @Output() public change: EventEmitter<any> = new EventEmitter();
  @Output() public layoutComplete: EventEmitter<any> = new EventEmitter();
  @Output() public visibleChange: EventEmitter<any> = new EventEmitter();
  @Output() public render: EventEmitter<any> = new EventEmitter();

  @ViewChild('wrapper', { static: false }) wrapperRef: ElementRef;
  @ViewChild('container', { static: false }) containerRef: ElementRef;

  public visibleItems: IItem[] = [];

  private layoutState = '';
  private isChange = false;
  private visibleDiffer: ListDiffer<IItem> = new ListDiffer<IItem>([], item => item.itemKey);
  private nextFunction = () => { };

  constructor(public elRef: ElementRef) {
    super();
  }
  ngOnInit() {
    const groups = categorize(this.items);

    if (this.status) {
      const { startCursor, endCursor } = this.status._infinite;

      this.updateVisibleItems(ItemManager.pluck(groups.slice(startCursor, endCursor + 1), 'items').map(item => item.data));
    } else if (this.useFirstRender && groups[0]) {
      this.updateVisibleItems(groups[0].items.map(item => item.data));
    }
  }
  ngOnChanges(changes) {
    const ig = this.ig;
    if (!ig) {
      return;
    }
    const result = ig.beforeSync(this.toItems());

    this.layoutState = result === 'relayout' ? result : this.layoutState || result;
    this.updateVisibleItems(this.getVisibleItems());
    this.isChange = true;

    if (changes.loading) {
      ig.setLoadingBar({
        append: this.loading,
        prepend: this.loading,
      });
    }
  }
  ngAfterViewChecked() {
    if (!this.isChange) {
      return;
    }
    this.isChange = false;
    this.ig.sync(this.getElements());

    const layoutState = this.layoutState;
    if (layoutState) {
      this.layoutState = '';
      this.ig.layout(layoutState === 'relayout');
    }
    this.nextFunction();
    this.nextFunction = () => { };
  }
  ngAfterViewInit() {
    const ref = this.wrapperRef || this.elRef;

    this.ig = new NativeInfiniteGrid(ref.nativeElement, {
      ...this.options,
      renderExternal: true,
    }).on('render', ({ next }) => {
      setTimeout(() => {
        this.nextFunction = next;
        this.updateVisibleItems(this.getVisibleItems());
        this.isChange = true;
      });
    });
    const ig = this.ig;

    INFINITEGRID_EVENTS.forEach(name => {
      if (!this[name]) {
        return;
      }
      ig.on(name as any, e => {
        (this as any)[name].emit({ ...e, currentTarget: this });
      });
    });
    ig.setLayout(this.layoutType, { ...this.layoutOptions });


    if (this.loading) {
      ig.setLoadingBar({
        prepend: this.loading,
        append: this.loading,
      });
    }
    if (this.status) {
      this.setStatus(this.status, true);
    } else {
      ig.beforeSync(this.toItems());
      ig.layout(true);
    }
  }
  public setStatus = (status: IInfiniteGridStatus, applyScrollPos?: boolean, syncElements: HTMLElement[] = this.getElements()): NgxInfiniteGridComponent => {
    this.ig.setStatus(status, applyScrollPos, syncElements);
    return this;
  }
  public ngOnDestroy() {
    this.ig.destroy();
  }
  private getElements() {
    const ref = this.containerRef || this.wrapperRef || this.elRef;

    const elements = [].slice.call(ref.nativeElement.children);

    if (this.loading) {
      return elements.filter(el => {
        return el.className.indexOf(IGNORE_CLASSNAME) < 0;
      });
    }
    return elements;
  }
  private getVisibleItems() {
    return this.ig.getRenderingItems().map(item => item.data);
  }
  private toItems() {
    const groupBy = this.groupBy;
    const trackBy = this.trackBy;
    return this.items.map((item, i) => ({
      groupKey: groupBy(i, item),
      itemKey: trackBy(i, item),
      data: item,
    }));
  }
  private updateVisibleItems(items: IItem[]) {
    const { added, changed, removed } = this.visibleDiffer.update(items);

    this.visibleItems = items;
    if (added.length || changed.length || removed.length) {
      this.visibleChange.emit(items);
    }
  }
}

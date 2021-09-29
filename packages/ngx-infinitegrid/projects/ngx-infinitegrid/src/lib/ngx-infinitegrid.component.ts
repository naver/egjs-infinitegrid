/**
 * egjs-infinitegrid
 * Copyright (c) 2021-present NAVER Corp.
 * MIT license
 */
import {
  AfterViewChecked, AfterViewInit, Component, ElementRef,
  EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild,
  PLATFORM_ID, Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  getRenderingItems,
  InfiniteGridFunction,
  InfiniteGridItem,
  InfiniteGridItemInfo,
  InfiniteGridOptions,
  INFINITEGRID_EVENTS,
  mountRenderingItems,
  OnContentError,
  OnRenderComplete,
  OnRequestAppend,
  OnRequestPrepend,
  OnChangeScroll,
  Renderer,
} from '@egjs/infinitegrid';
import { NgxInfiniteGridInterface } from './ngx-infinitegrid.interface';
import { NgxInfiniteGridProps } from './types';

// @dynamic
@Component({
  selector: 'ngx-infinite-grid, [NgxInfiniteGrid]',
  template: '<slot></slot>',
  styles: [
    ':host { display: block }',
  ],
})
export class NgxInfiniteGridComponent
  extends NgxInfiniteGridInterface
  implements Required<InfiniteGridOptions>,
  NgxInfiniteGridProps,
  AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {
  public static GridClass: InfiniteGridFunction;
  @Input() gridConstructor!: NgxInfiniteGridProps['gridConstructor'];
  @Input() renderer!: NgxInfiniteGridProps['renderer'];
  @Input() container!: NgxInfiniteGridProps['container'];
  @Input() containerTag!: NgxInfiniteGridProps['containerTag'];
  @Input() threshold!: NgxInfiniteGridProps['threshold'];
  @Input() useRecycle!: NgxInfiniteGridProps['useRecycle'];
  @Input() horizontal!: NgxInfiniteGridProps['horizontal'];
  @Input() percentage!: NgxInfiniteGridProps['percentage'];
  @Input() isEqualSize!: NgxInfiniteGridProps['isEqualSize'];
  @Input() isConstantSize!: NgxInfiniteGridProps['isConstantSize'];
  @Input() gap!: NgxInfiniteGridProps['gap'];
  @Input() attributePrefix!: NgxInfiniteGridProps['attributePrefix'];
  @Input() resizeDebounce!: NgxInfiniteGridProps['resizeDebounce'];
  @Input() maxResizeDebounce!: NgxInfiniteGridProps['maxResizeDebounce'];
  @Input() autoResize!: NgxInfiniteGridProps['autoResize'];
  @Input() useFit!: NgxInfiniteGridProps['useFit'];
  @Input() useTransform!: NgxInfiniteGridProps['useTransform'];
  @Input() renderOnPropertyChange!: NgxInfiniteGridProps['renderOnPropertyChange'];
  @Input() preserveUIOnDestroy!: NgxInfiniteGridProps['preserveUIOnDestroy'];
  @Input() defaultDirection!: NgxInfiniteGridProps['defaultDirection'];
  @Input() externalItemRenderer!: NgxInfiniteGridProps['externalItemRenderer'];
  @Input() externalContainerManager!: NgxInfiniteGridProps['externalContainerManager'];
  @Input() usePlaceholder!: NgxInfiniteGridProps['useFirstRender'];
  @Input() useLoading!: NgxInfiniteGridProps['useLoading'];
  @Input() status!: NgxInfiniteGridProps['status'];
  @Input() useFirstRender!: NgxInfiniteGridProps['useFirstRender'];
  @Input() items: NgxInfiniteGridProps['items'] = [];
  @Input() trackBy: NgxInfiniteGridProps['trackBy'] = ((_, item) => item.key);
  @Input() groupBy: NgxInfiniteGridProps['groupBy'] = ((_, item) => item.groupKey);
  @Output() renderComplete!: EventEmitter<OnRenderComplete>;
  @Output() contentError!: EventEmitter<OnContentError>;
  @Output() changeScroll!: EventEmitter<OnChangeScroll>;
  @Output() requestAppend!: EventEmitter<OnRequestAppend>;
  @Output() requestPrepend!: EventEmitter<OnRequestPrepend>;
  public visibleItems: InfiniteGridItem[] = [];
  @ViewChild('wrapperRef', { static: false }) _wrapperRef!: ElementRef;
  @ViewChild('containerRef', { static: false }) _containerRef!: ElementRef;
  private _renderer = new Renderer();
  private _isChange = false;

  constructor(protected elementRef: ElementRef, @Inject(PLATFORM_ID) private _platform: Object) {
    super();
    for (const name in INFINITEGRID_EVENTS) {
      const eventName = (INFINITEGRID_EVENTS as any)[name];
      (this as any)[eventName] = new EventEmitter();
    }
  }

  ngOnInit() {
    this._updateVisibleChildren();
  }
  ngOnChanges() {
    this._isChange = true;
    this._updateVisibleChildren();
  }
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this._platform)) {
      return;
    }
    const GridClass = (this.constructor as typeof NgxInfiniteGridComponent).GridClass;
    const defaultOptions = GridClass.defaultOptions;
    const options: Partial<InfiniteGridOptions> = {};
    const containerElement = this._containerRef?.nativeElement;

    for (const name in defaultOptions) {
      if (name in this && typeof (this as any)[name] !== "undefined") {
        (options as any)[name] = (this as any)[name];
      }
    }
    if (containerElement) {
      options.container = containerElement;
    }
    options.renderer = this._renderer;
    const wrapper = this._wrapperRef! || this.elementRef;

    const grid = new GridClass(wrapper.nativeElement, options);

    for (const name in INFINITEGRID_EVENTS) {
      const eventName = (INFINITEGRID_EVENTS as any)[name];

      grid.on(eventName, (e: any) => {
        (this as any)[eventName].emit(e as any);
      });
    }

    this.vanillaGrid = grid;
    this._renderer.on("requestUpdate", () => {
      this._isChange = true;
      this._updateVisibleChildren();
    });

    mountRenderingItems(this._getItemInfos(), {
      grid,
      useFirstRender: this.useFirstRender,
      useLoading: this.useLoading,
      usePlaceholder: this.usePlaceholder,
      horizontal: this.horizontal,
      status: this.status,
    });
    this._renderer.updated();
  }
  ngAfterViewChecked() {
    if (!this._isChange || !this.vanillaGrid) {
      return;
    }
    this._isChange = false;
    const GridClass = (this.constructor as typeof NgxInfiniteGridComponent).GridClass;
    const propertyTypes = GridClass.propertyTypes;
    const grid = this.vanillaGrid;

    for (const name in propertyTypes) {
      if (name in this) {
        (grid as any)[name] = (this as any)[name];
      }
    }

    this._renderer.updated();
  }
  ngOnDestroy() {
    this.vanillaGrid?.destroy();
  }

  private _getItemInfos(): InfiniteGridItemInfo[] {
    const items = this.items;
    const trackBy = this.trackBy;
    const groupBy = this.groupBy;

    return items.map((item, i) => {
      return {
        groupKey: groupBy(i, item),
        key: trackBy(i, item),
        data: item,
      };
    });
  }
  private _updateVisibleChildren() {
    this.visibleItems = getRenderingItems(this._getItemInfos(), {
      grid: this.vanillaGrid,
      useFirstRender: this.useFirstRender,
      useLoading: this.useLoading,
      usePlaceholder: this.usePlaceholder,
      horizontal: this.horizontal,
      status: this.status,
    });
  }
}

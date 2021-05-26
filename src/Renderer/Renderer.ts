import Component from "@egjs/component";
import { diff } from "@egjs/list-differ";


export class Renderer<T> extends Component<{}> {
  items: T[] = [];
  syncItems(nextItems: T[]) {
    return diff(this.items, items, item => item.key);
  }
  syncElements() {
    
  }
}

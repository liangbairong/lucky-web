import { Node, LuckyTouchEvent } from './Node';
// import { updateLayout } from './css-layout'
import { updateLayout } from './yoga-layout';
import { promise } from './yoga-layout/init';
import { drawNode } from './draw';
import { getNodeByTouch, emitTouch } from './touch';
import { LuckCanvas } from './Canvas';
import { AppContextType } from '../components/Context';
import {_requestIdleCallback} from "./utils";

export class Container {
  private _ready = false;
  private _next = false;
  private _reflow = false;
  private _root?: Node<AppContextType>;

  get canvas(): LuckCanvas | void {
    return this._root?.props.canvas;
  }

  get width() {
    return this._root?.props.clientWidth || 0;
  }

  get height() {
    return this._root?.props.clientHeight || 0;
  }

  get scale() {
    return this._root?.props.deviceRatio || 1;
  }

  constructor() {
    promise.then(this.ready);
  }

  public setRoot(root?: Node<AppContextType>) {
    this._root = root;
  }

  public handleTouch = (evt: LuckyTouchEvent) => {
    const { _root } = this;
    if (_root) {
      const emitted = new WeakSet<Node>();
      Object.values(evt.touches).forEach(touch => {
        const node = getNodeByTouch(_root, evt.type, touch);
        // check if node is unmounted
        if (node.parent && !emitted.has(node)) {
          emitted.add(node);
          emitTouch(node, evt);
        }
      });
    }
  };

  public draw = (reflow = false) => {
    this._reflow = this._reflow || reflow;
    if (!this._ready) {
      this._next = true;
      return;
    }
    this._ready = false;
    const { _root, canvas } = this;
    if (canvas) {
      if (this._reflow) {
        _requestIdleCallback(()=>{
          console.log('计算布局')
          updateLayout(_root!)();
          this._reflow = false;
          canvas.context.clearRect(0, 0, this.width, this.height);
          drawNode(canvas, _root!, this);
          requestAnimationFrame(this.ready);
        })
      }else{
        canvas.context.clearRect(0, 0, this.width, this.height);
        drawNode(canvas, _root!, this);
        requestAnimationFrame(this.ready);
      }

    }
  };

  private ready = () => {
    this._ready = true;
    if (this._next) {
      this._next = false;
      this.draw();
    }
  };
}

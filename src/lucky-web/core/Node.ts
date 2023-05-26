import { ReactNode } from 'react';
import {RevasCanvas} from "./Canvas";

export class Frame {
  constructor(public x = 0, public y = 0, public width = 0, public height = 0) {}
}

export class Node<T = any> {
  public readonly children: Node[] = [];
  public frame = new Frame();
  public isNoRender:boolean =false;
  public inScroll:boolean= false;
  public views?: any;
  public parent?: Node;
  constructor(public readonly type: string, public props: NodeProps & T) {}
  get $ready() {
    if (this.props.$ready === false) {
      return false;
    }
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.$ready === false) {
        return false;
      }
    }
    return true;
  }
}

export interface RevasTouch {
  identifier: number;
  x: number;
  y: number;
}

export type RevasTouchType = 'touchstart' | 'touchmove' | 'touchend';

export interface RevasTouchEvent {
  type: RevasTouchType;
  touches: { [key: string]: RevasTouch };
  timestamp: number;
  [key: string]: any;
}

export type RevasTouchEventListener = (event: RevasTouchEvent) => any;

export interface BaseProps {
  children?: ReactNode;
  /**
   * @description 样式
   * @default
   */
  style?: any | any[];
  /**
   * @description 开启离屏缓存
   * @default false
   */
  cache?: string | boolean;
  /**
   * @description 不等待子组件加载完毕就缓存
   * @default false
   */
  forceCache?: boolean;
}

export interface NodeProps extends BaseProps {
  /**
   * @description 开始触碰回调
   * @default
   */
  onTouchStart?: RevasTouchEventListener;
  /**
   * @description 触摸滑动回调
   * @default
   */
  onTouchMove?: RevasTouchEventListener;
  /**
   * @description 触摸结束回调
   * @default
   */
  onTouchEnd?: RevasTouchEventListener;
  /**
   * @description 获取当前布局
   * @default
   */
  onLayout?: (frame: Frame) => any;
  /**
   * @description 自定义canvas绘制
   * @default
   */
  customDrawer?:(canvas: RevasCanvas, node: Node)=>void;
  /**
   * @description 点击事件接受类型
   * @default
   */
  pointerEvents?: 'auto' | 'none' | 'box-none';
  $ready?: boolean;
  cRef?:any
}

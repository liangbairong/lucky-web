import { Node } from './Node';
import { LuckCanvas } from './Canvas';

export function noop(): any {}
export const EMPTY_OBJECT: any = Object.freeze({});
export const EMPTY_ARRAY: any[] = Object.freeze([]) as any;

export function flatten(array: any[]) {
  const flattend: any[] = [];
  (function flat(array) {
    array.forEach(function (el) {
      if (Array.isArray(el)) {
        flat(el);
      } else {
        flattend.push(el);
      }
    });
  })(array);
  return flattend;
}

export const now =
  typeof performance === 'object' && typeof performance.now === 'function' ? () => performance.now() : () => Date.now();

function observeAnimatedValue(value: any, observer?: Function, defaultValue?: number) {
  if (value === undefined) {
    return defaultValue!;
  }
  if (value && value.getValue) {
    return value.getValue(observer);
  }
  return value;
}

export function applyAnimated(style: any, callback?: Function) {
  if (style.animated) {
    // Animated Styles
    for (const key in style) {
      style[key] = observeAnimatedValue(style[key], callback);
    }
  }
  return style;
}

export function getMergedStyleFromNode(node: Node, callback?: Function) {
  const {
    props: { style = EMPTY_ARRAY },
  } = node;
  return applyAnimated(Object.assign({}, ...flatten([style])), callback);
}

export function getFrameFromNode(node: Node) {
  const { frame } = node;
  return frame;
}

export function sortByZIndexAscending(a: Node, b: Node) {
  const styleA = getMergedStyleFromNode(a);
  const styleB = getMergedStyleFromNode(b);
  return (styleA.zIndex || 0) - (styleB.zIndex || 0);
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

const ASTRAL_RANGE = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]?|[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g;
const WORD_RANGE = /\w+|\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]?|[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g;

export function getChars(str: string): readonly string[] {
  return str.match(ASTRAL_RANGE) || EMPTY_ARRAY;
}

export function getWords(str: string): readonly string[] {
  return str.match(WORD_RANGE) || EMPTY_ARRAY;
}

export function setShadow(canvas: LuckCanvas, color: string, x = 0, y = 0, blur = 0) {
  if (color && (x || y || blur)) {
    const { context: ctx } = canvas;
    const { shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY } = ctx;
    ctx.shadowBlur = blur;
    ctx.shadowColor = color;
    ctx.shadowOffsetX = x;
    ctx.shadowOffsetY = y;
    return function resetShadow() {
      ctx.shadowBlur = shadowBlur;
      ctx.shadowColor = shadowColor;
      ctx.shadowOffsetX = shadowOffsetX;
      ctx.shadowOffsetY = shadowOffsetY;
    };
  }
  return noop;
}


export function setTextBorder(canvas: LuckCanvas, textBorderWidth=1, textBorderColor:string) {
  if (textBorderColor) {
    const { context: ctx } = canvas;
    const { lineWidth,strokeStyle } = ctx;
    ctx.lineWidth = textBorderWidth;
    ctx.strokeStyle = textBorderColor;
    return function resetTextBorder() {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeStyle;
    };
  }
  return noop;
}

export function pushOpacity(canvas: LuckCanvas, opacity: number) {
  if (opacity !== null && opacity < 1 && opacity >= 0) {
    const cachedOpacity = canvas.context.globalAlpha || 1;
    canvas.context.globalAlpha = cachedOpacity * opacity;
    return function popOpacity() {
      canvas.context.globalAlpha = cachedOpacity;
    };
  }
  return noop;
}

export type RevasAdapter = {
  createImage: () => HTMLImageElement;
  createOffscreenCanvas?: (width: number, height: number,deviceRatio:number) => LuckCanvas;
  resetOffscreenCanvas?: (ctx: LuckCanvas, width: number, height: number,deviceRatio:number) => LuckCanvas;
};

export const adapter: RevasAdapter = {
  createImage: () => new Image(),
};

//兼容性requestIdleCallback
export const _requestIdleCallback = (callback: Function) => {
  const start = Date.now()
  requestAnimationFrame(() => {
    if (Date.now() - start < 16.6) {
      callback && callback()
    } else {
      _requestIdleCallback(callback)
    }
  })
}

export function hasScrollContent(node: any, func: (obj: any) => void) {
  if (node.type === 'ScrollContent') {
      func(node.views)
  } else {
      if (node.parent) {
          hasScrollContent(node.parent, func)
      }
  }

}
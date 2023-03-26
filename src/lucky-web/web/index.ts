import { adapter } from '../core/utils';
import { RevasCanvas } from '../core/Canvas';

export * from './render';

adapter.createOffscreenCanvas = (width: number, height: number,deviceRatio:number) => {
  const dom = document.createElement('canvas');
  const scale =deviceRatio|| window.devicePixelRatio;  //TODO:得修改为从外面传参
  dom.width = width * scale;
  dom.height = height * scale;
  const context = dom.getContext('2d')!;
  const canvas = new RevasCanvas(context);
  canvas.transform.scale(scale, scale);
  return canvas;
};

adapter.resetOffscreenCanvas = (prev: RevasCanvas, width: number, height: number,deviceRatio:number) => {
  const { context, element } = prev;
  const scale =deviceRatio || window.devicePixelRatio; //TODO:得修改为从外面传参
  element.width = width * scale;
  element.height = height * scale;
  const canvas = new RevasCanvas(context);
  canvas.transform.scale(scale, scale);
  return canvas;
};

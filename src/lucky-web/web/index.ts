import {adapter} from '../core/utils';
import {LuckCanvas} from '../core/Canvas';

export * from './render';


export function lpx(num: number,base:number=750):number {
    const w = document.documentElement.clientWidth || document.body.clientWidth || window.screen.width
    return num * (w / base)
}


adapter.createOffscreenCanvas = (width: number, height: number, deviceRatio: number) => {
    const dom = document.createElement('canvas');
    const scale = deviceRatio || window.devicePixelRatio;  
    dom.width = width * scale;
    dom.height = height * scale;
    const context = dom.getContext('2d')!;
    const canvas = new LuckCanvas(context);
    canvas.transform.scale(scale, scale);
    return canvas;
};

adapter.resetOffscreenCanvas = (prev: LuckCanvas, width: number, height: number, deviceRatio: number) => {
    const {context, element} = prev;
    const scale = deviceRatio || window.devicePixelRatio; 
    element.width = width * scale;
    element.height = height * scale;
    const canvas = new LuckCanvas(context);
    canvas.transform.scale(scale, scale);
    return canvas;
};

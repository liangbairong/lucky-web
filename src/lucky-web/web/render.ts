import {Component, createElement} from 'react';
import renderer from '../core/reconciler';
import {noop} from '../core/utils';
import {Container} from '../core/Container';
import {RevasTouch, RevasTouchEvent} from '../core/Node';
import {RevasCanvas} from '../core/Canvas';
import {clearCache} from '../core/offscreen';
import {Root} from '../components/Context';

function getNodePosition(node: any): [number, number] {
    let top = 0;
    let left = 0;

    while (node) {
        top += node.offsetTop;
        left += node.offsetLeft;
        node = node.offsetParent;
    }
    return [top, left];
}

function createRevasTouchEvent(e: TouchEvent,dom:HTMLElement,option:any): RevasTouchEvent {
    e.preventDefault();
    e.stopPropagation();
    const touches: { [key: number]: RevasTouch } = {};
    const type: any = e.type === 'touchcancel' ? 'touchend' : e.type;
    const input= document.querySelectorAll('input')
    if(input.length>0){
        input.forEach(item=>{
            item.blur()
        })
    }


    Object.keys(e.changedTouches).forEach((key: any) => {
        const touch = e.changedTouches[key];
        if (touch && touch.target) {
            const [offsetTop, offsetLeft] = getNodePosition(touch.target);
            const nx= option.width ? touch.clientX / dom.clientWidth *option.width : touch.clientX
            const ny= option.height ? touch.clientY / dom.clientHeight *option.height :  touch.clientY
            touches[touch.identifier] = {
                identifier: touch.identifier,
                x: nx - offsetLeft,
                y: ny - offsetTop,
            };
        }
    });
    return {type, touches, timestamp: e.timeStamp || Date.now()};
}

function createCanvas(parent: HTMLElement, scale: number, w: number, h: number,) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('style', 'width: 100%; height: 100%;');
    parent.appendChild(canvas);
    canvas.width = w || canvas.clientWidth * scale;
    canvas.height = h || canvas.clientHeight * scale;
    return canvas;
}

function createRoot(app: React.ReactNode, dom: HTMLElement, canvas: RevasCanvas, w: number, h: number, scale: number) {
    return createElement(
        Root,
        {
            clientWidth: w || dom.clientWidth,
            clientHeight: h || dom.clientHeight,
            deviceRatio: scale || window.devicePixelRatio,
            canvas,
        },
        app
    );
}

function initTouch(dom: HTMLElement, handler: (e: any) => any) {
    dom.addEventListener('touchstart', handler, false);
    dom.addEventListener('touchmove', handler, false);
    dom.addEventListener('touchend', handler, false);
    dom.addEventListener('touchcancel', handler, false);
    return () => {
        dom.removeEventListener('touchstart', handler, false);
        dom.removeEventListener('touchmove', handler, false);
        dom.removeEventListener('touchend', handler, false);
        dom.removeEventListener('touchcancel', handler, false);
    };
}

interface IOption {
    width?: number;
    height?: number
    devicePixelRatio?: number
}

export function render(app: React.ReactNode, parent: HTMLElement, option: IOption | any = {}, parentComponent?: Component<any>| any, callback = noop) {
    const scale = option.devicePixelRatio || window.devicePixelRatio;
    const dom = createCanvas(parent, scale, option.width, option.height);
    const canvas = new RevasCanvas(dom.getContext('2d')!);
    const container = new Container();
    const destroyTouch = initTouch(dom, e => container.handleTouch(createRevasTouchEvent(e,dom,option)));
    const fiber = renderer.createContainer(container, false, false);
    canvas.transform.scale(scale, scale);
    renderer.updateContainer(createRoot(app, dom, canvas, option.width, option.height, option.devicePixelRatio), fiber, parentComponent, callback);

    return {
        get $() {
            return dom;
        },
        update(params:any={}, next = app, callback = noop) {
            dom.width =params.width || option.width || dom.clientWidth * scale;
            dom.height =params.height || option.height || dom.clientHeight * scale;
            clearCache();

            canvas.transform.scale(scale, scale);
            //@ts-ignore
            renderer.updateContainer(createRoot(next, dom, canvas, option.width, option.height, option.devicePixelRatio), fiber, parentComponent, callback);
        },
        unmount(callback = noop) {
            renderer.updateContainer(null, fiber, null, callback);
            destroyTouch();
            clearCache();
            dom.remove();
        },
    };
}

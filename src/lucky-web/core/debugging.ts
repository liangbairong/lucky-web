import {LuckCanvas} from "./Canvas";
import {Node} from "./Node";

export default class Debugging{
    dom:any=null
    oldY:number=0
    constructor() {
        this.dom = document.createElement('div');
        this.dom.class = 'debugging-class';
        this.dom.style.pointerEvents = 'none'
        this.dom.style.position = "absolute";
        this.dom.style.border = "1px dashed red";
        this.dom.style.boxSizing='border-box'
        const app: any = document.querySelector('#canvas')

        app.appendChild(this.dom)
    }
     hasScrollContent(node: any, func: (obj: any) => void) {
        if (node.type === 'ScrollContent') {
            func(node.views)
        } else {
            if (node.parent) {
                this.hasScrollContent(node.parent, func)
            }
        }

    }
    draw(canvas: LuckCanvas, node: Node){
        if (this.dom) {
            if (node?.frame?.y !== this.oldY) {
                this.oldY = node.frame.y
                this.dom.style.width=node.frame.width+"px"
                this.dom.style.height=node.frame.height+"px"
                this.dom.style.top = node.frame.y  + "px"
                this.dom.style.left = node.frame.x  + "px"
                if(node.frame.height===0){
                    // @ts-ignore
                    document.querySelector('#canvas').removeChild(this.dom)
                }
            }
            this.hasScrollContent(node, (scroll) => {
                if(scroll){
                    this.dom.style.transform = `translate3d(0,-${scroll.scrollY}px,0)`
                }
            })
        }
    }
}

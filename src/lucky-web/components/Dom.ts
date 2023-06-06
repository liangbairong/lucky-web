import * as React from 'react'
import {Node, BaseProps, RevasTouchEvent} from '../core/Node'
import {useCallback, useEffect, useRef, useState} from "react";
import {RevasCanvas} from "../core/Canvas";
import { lpx } from '../web';
import { hasScrollContent } from '../common';
export type IDom = {
    html?: string
} & BaseProps;


export default function Dom(props: IDom) {
    const {style, html} = props;
    const oldY = useRef(0);
    const dom = useRef<any>(null)

    useEffect(() => {
        dom.current = document.createElement('div');
        dom.current.id = 'div-' + Date.now()
        dom.current.innerHTML = html
        // dom.current.style=style
        // dom.current.style.pointerEvents = 'none'
        dom.current.style.position = "absolute";
        const app: any = document.querySelector('#canvas')

        app.appendChild(dom.current)

        return () => {
            app.removeChild(dom.current)
            dom.current = null
        }
    }, [])


    const _customDrawer = (canvas: RevasCanvas, node: Node) => {
        //有动画会一直执行，需要做新旧数据判断处理
        if (dom?.current) {
            if (node?.frame?.y !== oldY?.current) {
                oldY.current = node.frame.y
                dom.current.style.top = node.frame.y+ lpx(100) + "px"
                dom.current.style.left = node.frame.x  + "px"
            }
            hasScrollContent(node, (scroll) => {
                if(scroll){
                    dom.current.style.transform = `translate3d(0,-${scroll.scrollY}px,0)`
                }
            })
        }
    }


    return React.createElement('Dom', {
            ...props,
            customDrawer: _customDrawer,
            style: {
                height: 160,
                position: 'relative',
                ...style
            },
        },
    )
}

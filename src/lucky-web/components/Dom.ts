import * as React from 'react'
import {Node, BaseProps, RevasTouchEvent} from '../core/Node'
import {useCallback, useEffect, useRef, useState} from "react";
import {RevasCanvas} from "../core/Canvas";


export type IInput = {
    html?: React.ReactNode
} & BaseProps;

function hasScrollContent(node: any, func: (obj: any) => void) {
    if (node.type === 'ScrollContent') {
        func(node.views)
    } else {
        if (node.parent) {
            hasScrollContent(node.parent, func)
        }
    }

}

export default function Dom(props: IInput) {
    const {style, html} = props;
    const oldY = useRef(0);
    const input = useRef<any>(null)

    useEffect(() => {
        input.current = document.createElement('div');
        input.current.id = 'div-' + Date.now()
        input.current.innerHTML = html
        input.current.style.pointerEvents = 'none'
        input.current.style.position = "absolute";
        const app: any = document.querySelector('#canvas')

        app.appendChild(input.current)

        return () => {
            app.removeChild(input.current)
            input.current = null
        }
    }, [])


    const _customDrawer = (canvas: RevasCanvas, node: Node) => {
        //有动画会一直执行，需要做新旧数据判断处理
        if (input?.current) {
            if (node?.frame?.y !== oldY?.current) {
                oldY.current = node.frame.y
                input.current.style.top = node.frame.y  + "px"
                input.current.style.left = node.frame.x  + "px"
            }
            hasScrollContent(node, (scroll) => {
                if(scroll){
                    input.current.style.transform = `translate3d(0,-${scroll.scrollY}px,0)`
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

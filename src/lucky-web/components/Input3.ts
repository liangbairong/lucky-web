import * as React from 'react'
import {Node, BaseProps, RevasTouchEvent} from '../core/Node'
import {useCallback, useEffect, useRef, useState} from "react";
import {RevasCanvas} from "../core/Canvas";
import Click from "./common/click";
import Text from "./Text";
import canvasUtils from "./common/canvasUtils";

export type IInput = {
    value?: string
    onGetValue?: Function;
} & BaseProps;



export default function Input(props: IInput) {
    const {style, value} = props;
    const [text, setText] = useState<string>(value || '')
    //容器宽度
    const [boxWidth, setBoxWidth] = useState<number>(style?.width || 400)
    const oldY = useRef(0);
    const input = useRef<any>(null)

    useEffect(() => {
        input.current = document.createElement('input');
        input.current.id = 'input-' + Date.now()
        input.current.value = text
        document.body.appendChild(input.current)
        // input.current.addEventListener('input', getValue)
        // input.current.addEventListener('focus', showLabel)
        // input.current.addEventListener('blur', hideLabel)
        return () => {
            // input.current.removeEventListener('input', getValue)
            // input.current.removeEventListener('focus', showLabel)
            // input.current.removeEventListener('blur', hideLabel)
            document.body.removeChild(input.current)
            input.current = null
        }
    }, [])








    const _customDrawer = (canvas: RevasCanvas, node: Node) => {
        //有动画会一直执行，需要做新旧数据判断处理
        if (input?.current) {
            if (node?.frame?.y !== oldY?.current) {
                input.current.style.position = "fixed";
                input.current.style.border='none'
                input.current.style.background='none'
                input.current.style.boxSizing='border-box'
                input.current.style.width=node.frame.width * (document.body.clientWidth / 750) + "px"
                input.current.style.height=node.frame.height * (document.body.clientWidth / 750) + "px"
                oldY.current = node.frame.y
                input.current.style.top = node.frame.y * (document.body.clientWidth / 750) + "px"
                input.current.style.left = node.frame.x * (document.body.clientWidth / 750) + "px"
            }

        }
    }


    const onPress = () => {
        input.current.focus()
    };


    const childList: any = [
    ]



    return React.createElement('Input', {
            ...props,
            customDrawer: _customDrawer,
            style: {
                width: boxWidth,
                height: 60,
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 5,
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
                ...style
            },
        },
        childList
    )
}

import * as React from 'react'
import {Node, BaseProps, RevasTouchEvent} from '../core/Node'
import {useCallback, useEffect, useRef, useState} from "react";
import {RevasCanvas} from "../core/Canvas";
import Click from "./common/click";
import Text from "./Text";
import { hasScrollContent } from '../common';
export type IInput = {
    value?: string
    onGetValue?: Function;
} & BaseProps;

const click = new Click()

export default function Input(props: IInput) {
    const {style, value} = props;
    const [isShowLabel, setIsShowLabel] = useState<boolean>(false)
    const [text, setText] = useState<string>(value || '')

    const oldY = useRef(0);
    const input = useRef<any>(null)

    useEffect(() => {
        input.current = document.createElement('input');
        input.current.id = 'input-' + Date.now()
        input.current.value = text

        input.current.style.cssText=`position:fixed;border:none;background:transparent;box-sizing:border-box;outline:none;font-family:"PingFang SC, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB','Microsoft YaHei', SimSun, sans-serif";`
        input.current.style.visibility = 'hidden'
        input.current.style.fontSize=(style?.fontSize || 30)+'px'
        input.current.style.paddingLeft=(style?.paddingLeft || 10)+'px'
        input.current.style.paddingRight=(style?.paddingRight || 10)+'px'
        input.current.style.color=(style?.color || '#000')
        document.body.appendChild(input.current)
        input.current.addEventListener('input', getValue)
        input.current.addEventListener('focus', showLabel)
        input.current.addEventListener('blur', hideLabel)
        return () => {
            input.current.removeEventListener('input', getValue)
            input.current.removeEventListener('focus', showLabel)
            input.current.removeEventListener('blur', hideLabel)
            document.body.removeChild(input.current)
            input.current = null
        }
    }, [])

    useEffect(() => {
        if (isShowLabel) {
            input.current.style.visibility = 'inherit'
        }else{
            input.current.style.visibility = 'hidden'
        }
    }, [isShowLabel])

 


    const getValue = (e: any) => {
        setText(e.target.value)
        props.onGetValue && props.onGetValue(e.target.value)
    }
    const showLabel = useCallback(() => {
        setIsShowLabel(true)
    }, [])

    const hideLabel = useCallback(() => {
        setIsShowLabel(false)
    }, [])


    const _customDrawer = (canvas: RevasCanvas, node: Node) => {
        //有动画会一直执行，需要做新旧数据判断处理
        if (input?.current) {
            if (node?.frame?.y !== oldY?.current) {
                oldY.current = node.frame.y
                input.current.style.width = node.frame.width  + "px"
                input.current.style.height = node.frame.height  + "px"
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


    const onPress = () => {
        input.current.style.visibility = 'inherit'
        input.current.focus()
    };


    const childList: any = [
        React.createElement(Text, {
            key: 'InputText',
            style: [{
                width: '100%',
                paddingLeft: 10,
                paddingRight: 10,
                color:style?.color || '#000',
                fontSize: style?.fontSize || 30,
                wordBreak: 'keep-all',
                position: 'absolute',
            },{
                opacity: !isShowLabel
            }],
        }, text),

    ]


    return React.createElement('Input', {
            onTouchStart: (e: RevasTouchEvent) => {
                click.touchStart(e, () => {
                })
            },
            onTouchEnd: (e: RevasTouchEvent) => {
                click.touchEnd(e, onPress)
            },
            ...props,
            customDrawer: _customDrawer,
            style: [{
                height: 60,
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 5,
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
        
            },style],
        },
        childList
    )
}

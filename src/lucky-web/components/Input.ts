import * as React from 'react'
import {Node, BaseProps, RevasTouchEvent} from '../core/Node'
import {useEffect, useRef, useState} from "react";
import {RevasCanvas} from "../core/Canvas";
import Click from "./common/click";
import Text from "./Text";
// import {AnimatedValue,timing,Easing} from "../core/Animated";
const click = new Click()


function getActualWidthOfChars(text: string, options: any = {}) {
    const {
        size = 30,
        family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'"
    } = options;
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    ctx.font = `${size}px ${family}`;
    const metrics = ctx.measureText(text);
    const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
    return Math.max(metrics.width, actual);
}

export type IInput = {
    onGetValue?: Function;
} & BaseProps;

export default function Input(props: IInput) {
    const op = useRef(0.001);
    const op2 = useRef(true);
    const {style} = props;
    const [isShowLabel, setIsShowLabel] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    //容器宽度
    const [boxWidth, setBoxWidth] = useState<number>(style?.width || 400)
    const [textWidth, setTextWidth] = useState<number>(0)
    const [textLeft, setTextLeft] = useState<number>(0)
    const old = useRef(0);
    const input = useRef<any>(null)


    // const [op,setOp]=useState(0)
    useEffect(() => {
        // setBoxWidth(true)


        input.current = document.createElement('input');
        input.current.id = 'input-' + Date.now()
        document.body.appendChild(input.current)
        // startAnimated()
        input.current.addEventListener('input', getValue)
        input.current.addEventListener('focus', showLabel)
        input.current.addEventListener('blur', hideLabel)
        return () => {
            input.current.removeEventListener('input', getValue)
            document.body.removeChild(input.current)
        }
    }, [])


    const getValue = (e: any) => {
        setText(e.target.value)
        props.onGetValue && props.onGetValue(e.target.value)
    }
    const showLabel = () => {
        setIsShowLabel(true)
    }
    const hideLabel = () => {
        setIsShowLabel(false)
    }

    const startAnimated = () => {
        setInterval(() => {
            op.current = op2.current ? 0.001 : 1
            op2.current = !op2.current
            // const a=Object.assign(op,{
            //     value:op.value ? 0 : 1
            // })
            console.log(op.current)
            // setOp(op)
            // console.log(a.value)
        }, 500)
    }

    const _customDrawer = (canvas: RevasCanvas, node: Node) => {
        setTimeout(() => {
            // const charWidth = canvas.context.measureText(text).width;
            const charWidth = getActualWidthOfChars(text, {
                size: style.fontSize || 30
            })
            if (boxWidth - 20 < charWidth) {
                setTextLeft(charWidth - boxWidth + 20 + 2)
                setTextWidth(boxWidth - 20)
            } else {
                setTextLeft(0)
                setTextWidth(charWidth)
            }
        }, 10)

        if (input.current) {
            if (node.frame.y !== old.current) {
                console.log(node)
                input.current.style.position = "fixed";
                old.current = node.frame.y
                input.current.style.top = node.frame.y * (document.body.clientWidth / 750) + "px"
                input.current.style.left = "-100%"
            }

        }
    }


    const onPress = () => {
        console.log('aa')
        input.current.focus()
        // op.current =
        // text='23'
        // setText('23')
        // setOp(op ? 0 : 1)
        console.log(op)
    };


    const childList: any = [
        React.createElement(Text, {
            style: {
                width: '100%',
                // backgroundColor: '#ccc',
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: style?.fontSize || 30,
                wordBreak: 'keep-all',
                position: 'absolute',
                left: -textLeft,

            },
        }, text),
    ]

    if (isShowLabel) {
        childList.push(
            React.createElement('View', {
                style: {
                    // opacity: op.current,
                    width: 2,
                    height: '60%',
                    backgroundColor: '#000',
                    position: 'absolute',
                    left: textWidth ? textWidth + 10 : 10,
                    top: '20%',
                },
            }),
        )
    }

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
            style: {
                width: boxWidth,
                height: 60,
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 5,
                // backgroundColor: 'red',
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

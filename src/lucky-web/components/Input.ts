import * as React from 'react'
import {Node, NodeProps} from '../core/Node'
import {useEffect, useRef, useState} from "react";
import {RevasCanvas} from "../core/Canvas";
// import {AnimatedValue,timing,Easing} from "../core/Animated";

export default function Input(props: NodeProps) {
    const op = useRef(0);
    const input = useRef<any>(null)
    console.log(props)
    // const [op,setOp]=useState(0)
    useEffect(() => {
        input.current = document.createElement('input');
        input.current.id = 'input-'+Date.now()
        document.body.appendChild(input.current)
        startAnimated()

        return ()=>{
            document.body.removeChild(input.current)
        }
    }, [])


    const startAnimated = () => {
        setInterval(() => {
            op.current = op.current ? 0 : 1
            // console.log(op)
        }, 1000)
    }

    const _customDrawer = (canvas: RevasCanvas, node: Node) => {
        console.log(node)
        if(input.current){
            input.current.style.position = "fixed";
            input.current.style.top = node.frame.y * (document.body.clientWidth / 750) + "px"
            // input.current.style.left = "-100%"
        }

        // document.body.appendChild(input.current)

    }
    const {style} = props;
    return React.createElement('Touchable', {
        ...props,
        // customDrawer: _customDrawer,
        style: {
            width: 400,
            height: 80,
            backgroundColor: 'red',
            ...style
        },
        onPress:()=>{
            console.log('33')
            // input.current.focus()
        }
    }, React.createElement('View', {
        style: {
            opacity: op.current,
            width: 200,
            height: '60%',
            backgroundColor: '#fff',
            position: 'absolute',
            left: 10,
            top: '20%'
        },
    }))
}

import * as React from 'react'
import {NodeProps} from '../core/Node'
import {useEffect, useRef} from "react";
import {AnimatedValue,timing,Easing} from "../core/Animated";

export default function Input(props: NodeProps) {
    const an = useRef(new AnimatedValue(1));

    useEffect(() => {
        console.log('asas')
        const input = document.createElement('input');

        document.body.appendChild(input)


        startAnimated()

    }, [])


    const startAnimated=()=>{
        an.current.setValue(1);
        timing(an.current, {
            to: 0.00001,
            duration: 1000,
            ease: Easing.out(),
            loop:true
        }).start();
    }

    return React.createElement('View', {
        ...props,
        style: {
            width: 400,
            height: 80,
            backgroundColor: 'red'
        }
    }, React.createElement('View', {
        style: {
            animated: true,
            opacity: an.current,
            width: 2,
            height: '60%',
            backgroundColor: '#fff',
            position: 'absolute',
            left: 10,
            top: '20%'
        },
    }))
}

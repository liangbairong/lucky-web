import * as React from 'react'
import {NodeProps} from '../core/Node'
import {useEffect, useRef} from "react";
import {AnimatedValue, timing, Easing} from "../core/Animated";

export type IAnimateProps = {
    initValue: number;
    afterValue: number;
    duration?: number;
    animateName: string;
    loop?:boolean;
    ease?:any
} & NodeProps;

export default function Animate(props: IAnimateProps) {
    const {
        initValue,
        afterValue,
        duration = 1000,
        animateName,
        loop = false,
        ease=Easing.out(),
        children,
        style,
        ...others
    } = props as any;
    const val = useRef(new AnimatedValue(initValue));
    const timingRef=useRef<any>(null)

    useEffect(() => {
        start()
    }, [initValue, afterValue])

    const start = () => {
        timingRef?.current && timingRef.current.stop();
        val.current.setValue(initValue);
        timingRef.current = timing(val.current, {
            to: afterValue,
            duration,
            ease,
            loop
        }).start();
    }

    return React.createElement(
        'View', {
            style: {
                ...style,
                animated: true,
                [animateName]: val.current,
            },
            others,
        }, children);
}

import * as React from 'react'
import {NodeProps} from '../core/Node'
import {useEffect, useRef, useImperativeHandle} from "react";
import {AnimatedValue, timing, Easing} from "../core/Animated";

export type IAnimateProps = {
    initValue: number;
    afterValue: number;
    duration?: number;
    animateName: string;
    loop?: boolean;
    ease?: any
} & NodeProps;

export default function Animate(props: IAnimateProps) {
    const {
        cRef,
        initValue,
        afterValue,
        duration = 1000,
        animateName,
        loop = false,
        ease = Easing.linear,
        children,
        style,
        ...others
    } = props as any;
    const val = useRef(new AnimatedValue(initValue));
    const timingRef = useRef<any>(null)
    useImperativeHandle(cRef, () => ({
        start,
        stop
    }));
    useEffect(() => {
        start()

        return () => {
            stop()
        }
    }, [initValue, afterValue])

    const start = () => {
        stop()
        val.current.setValue(initValue);
        timingRef.current = timing(val.current, {
            to: afterValue,
            duration,
            ease,
            loop
        }).start();
    }

    const stop = () => {
        timingRef?.current && timingRef.current.stop();
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

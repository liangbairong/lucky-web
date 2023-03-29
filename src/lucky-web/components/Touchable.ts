import * as React from 'react';
import {BaseProps, RevasTouchEvent, RevasTouch} from '../core/Node';
import {AnimatedValue} from '../core/Animated';
import Click from "./common/click";

export type TouchableProps = {
    onPress: Function;
    onPressIn?: Function;
    onPressOut?: Function;
    activeOpacity?: number;
} & BaseProps;

const click = new Click()

export default class Touchable extends React.Component<TouchableProps> {
    static defaultProps = {
        activeOpacity: 0.7
    };

    _style = {
        opacity: new AnimatedValue(1),
        animated: true
    };

    // private _start?: RevasTouch;
    // private _tid = '';

    private _onTouchStart = () => {
        this._style.opacity.setValue(this.props.activeOpacity!);
        this.props.onPressIn && this.props.onPressIn();
    };

    private _onTouchEnd = () => {
        this._style.opacity.setValue(1);
        this.props.onPressOut && this.props.onPressOut();
    };

    render() {
        return React.createElement('Touchable', {
            onTouchStart: (e:RevasTouchEvent) => {
                click.touchStart(e, this._onTouchStart)
            },
            onTouchEnd: (e: RevasTouchEvent) => {
                click.touchEnd(e, () => {
                    this.props.onPress && this.props.onPress();
                }, this._onTouchEnd)
            },
            ...this.props,
            style: [
                this.props.style,
                this._style
            ]
        });
    }
}

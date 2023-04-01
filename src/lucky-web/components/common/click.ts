import {RevasTouch, RevasTouchEvent} from '../../core/Node';

export default class Click{
    private _start?: RevasTouch;
    private _tid = '';

    public touchStart = (e: RevasTouchEvent,onPressIn:Function) => {
        this._tid = Object.keys(e.touches)[0];
        this._start = e.touches[this._tid];
        onPressIn && onPressIn();
    };

    public touchEnd = (e: RevasTouchEvent,onPress:Function,onPressOut:Function=()=>{}) => {
        if (this._start && e.touches[this._tid]) {
            if (Math.abs(this._start.x - e.touches[this._tid].x) < 3 &&
                Math.abs(this._start.y - e.touches[this._tid].y) < 3) {
                onPress && onPress();
            }
        }
        onPressOut && onPressOut();
    };
}

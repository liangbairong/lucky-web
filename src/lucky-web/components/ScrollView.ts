import * as React from 'react';
import {NodeProps, Frame, Node} from '../core/Node';
import Scroller, {RevasScrollEvent} from './common/Scroller';
import {AnimatedValue} from '../core/Animated';
import {LuckCanvas} from "../core/Canvas";
import {_requestIdleCallback} from "../core/utils";

export type ScrollViewOffset = { x?: number; y?: number };

export type ScrollViewProps = {
    /**
     * @description x轴方向滚动或y轴方向滚动，默认y轴
     * @default false
     */
    horizontal?: boolean;
    /**
     * @description 虚拟滚动，开启性能优化
     * @default true
     */
    virtualScrolling?: boolean;
    /**
     * @description 滚动监听
     * @default
     */
    onScroll?: (e: RevasScrollEvent) => any;
    /**
     * @description 滚动开始回调
     * @default
     */
    onScrollStart?: (e: RevasScrollEvent) => any;
    /**
     * @description 滚动结束回调
     * @default
     */
    onScrollEnd?: (e: RevasScrollEvent) => any;
    /**
     * @description 加载更多回调
     * @default
     */
    onLoadMove?: (e: RevasScrollEvent) => any;
    /**
     * @description paging长度
     * @default
     */
    paging?: boolean | number;
    /**
     * @description 相对偏移
     * @default {x:0,y:0}
     */
    offset?: ScrollViewOffset;
} & NodeProps;


export default class ScrollView extends React.Component<ScrollViewProps> {
    private _height = -1;
    private _contentHeight = -1;
    private _width = -1;
    private _contentWidth = -1;
    private _innerStyle = {
        translateX: new AnimatedValue(0),
        translateY: new AnimatedValue(0),
        position: 'absolute',
        animated: true,
    };
    private _offset: ScrollViewOffset = {x: 0, y: 0};

    private scrollY: number = 0; //滚动的y轴
    private scrollX: number = 0; //滚动的轴
    private loadState = true;


    // init(){
    //     this._height = -1;
    //     this._contentHeight = -1;
    //     this._width = -1;
    //     this._contentWidth = -1;
    //     this._innerStyle = {
    //         translateX: new AnimatedValue(0),
    //         translateY: new AnimatedValue(0),
    //         position: 'absolute',
    //         animated: true,
    //     };
    //     this._offset = {x: 0, y: 0};
    //
    //     this.scrollY = 0; //滚动的y轴
    //     this.scrollX = 0; //滚动的轴
    //     this.loadState=true;
    // }

    private _scroller = new Scroller(e => {
        const {x = 0, y = 0} = this._offset;
        if (this.props.horizontal) {
            this.scrollX = e.x
        } else {
            this.scrollY = e.y
        }
        this.props.horizontal ?
            this._innerStyle.translateX.setValue(x - e.x) :
            this._innerStyle.translateY.setValue(y - e.y);


        switch (e.type) {
            case 'scroll':
                if (this._contentHeight - this._height === this.scrollY && this.loadState) {
                    this.loadState = false;
                    // this._scroller.init()
                    // this._scroller.cancel();
                    setTimeout(() => {
                        this.loadState = true
                    }, 100)
                    this.props.onLoadMove && this.props.onLoadMove(e);
                }
                return this.props.onScroll && this.props.onScroll(e);
            case 'start':
                return this.props.onScrollStart && this.props.onScrollStart(e);
            case 'end':
                return this.props.onScrollEnd && this.props.onScrollEnd(e);
            // case 'loadMove':
            //     return this.props.onLoadMove && this.props.onLoadMove(e);
        }
    });

    componentWillUnmount() {
        this._scroller.cancel();
    }

    private _onLayout = (frame: Frame) => {
        if (this._width !== frame.width || this._height !== frame.height) {
            this._height = frame.height;
            this._width = frame.width;
            this._checkLayout();
            if (this.props.paging) {
                if (this.props.horizontal) {
                    this._scroller.pagingX = this.props.paging === true ? frame.width : this.props.paging;
                } else {
                    this._scroller.pagingY = this.props.paging === true ? frame.height : this.props.paging;
                }
            }
        }
        this.props.onLayout && this.props.onLayout(frame);
    };

    private _onContentLayout = (frame: Frame) => {
        const {x = 0, y = 0} = this._offset;
        const width = frame.width + x;
        const height = frame.height + y;
        if (this._contentWidth !== width || this._contentHeight !== height) {
            this._contentHeight = height;
            this._contentWidth = width;
            this._checkLayout();
        }
    };

    private _checkLayout = () => {
        const maxX = this._contentWidth - this._width;
        const maxY = this._contentHeight - this._height;
        if ((maxX > 0 && maxX !== this._scroller.maxX) || (maxY > 0 && maxY !== this._scroller.maxY)) {
            this._scroller.maxX = maxX;
            this._scroller.maxY = maxY;
            this._scroller.emit('none');
        }
    };

    private _customDrawer = (canvas: LuckCanvas, node: Node) => {
        // if (this.props.virtualScrolling) {
            if (node?.views?.scrollY !== this.scrollY) {
                _requestIdleCallback(() => {
                    node.views = {
                        height: this._height,
                        scrollY: this.scrollY,
                    }
                })
            }

        // }
    }

    render() {
        const {children, horizontal, offset, ...others} = this.props;
        this._scroller.horizontal = horizontal;

        if (offset) {
            this._offset = offset;
            this._scroller.emit('none');
        }


        return React.createElement(
            'Scrollable',
            {...others, onLayout: this._onLayout},
            React.createElement('ScrollContent', {
                onTouchStart: this._scroller.touchStart,
                onTouchMove: this._scroller.touchMove,
                onTouchEnd: this._scroller.touchEnd,
                onLayout: this._onContentLayout,
                customDrawer: this._customDrawer,
                style: [
                    this._innerStyle,
                    {
                        flexDirection: horizontal ? 'row' : 'column',
                        [horizontal ? 'height' : 'width']: '100%',
                    },
                ],
                children,
            })
        );
    }
}

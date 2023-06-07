import * as React from 'react';
import { drawText, measureText, applyTextStyle, DrawTextOptions, DEFAULT_MEASURE } from './common/drawText';
import { NodeProps, Node } from '../core/Node';
import { getFrameFromNode, flatten, applyAnimated } from '../core/utils';
import { LuckCanvas } from '../core/Canvas';

export type TextProps = {
  /**
   * @description 最多多少行，溢出显示...
   * @default
   */
  numberOfLines?: number;
  /**
   * @description 文字高亮属性
   * @default
   */
  highlight?:{
    text?:string | Array<string>;
    color?:string
  }
} & NodeProps;

export default class Text extends React.Component<TextProps> {
  state = { height: 0 };

  _measured = DEFAULT_MEASURE;

  _drawed?: DrawTextOptions;

  drawText = (canvas: LuckCanvas, node: Node) => {
    const content = getTextFromNode(node);
    if (content) {
      const options = {
        numberOfLines: node.props.numberOfLines || 0,
        textStyle: getTextStyleFromNode(node),
        highlight:node.props.highlight,
        frame: getFrameFromNode(node),
        content,
      };
      applyTextStyle(canvas, options);
      if (textPropsChanged(options, this._drawed)) {
        this._measured = measureText(canvas, options);
        this._drawed = options;
      }
      const [lines, height] = this._measured;
      if (height !== this.state.height) {
        this.setState({ height });
      } else {
        drawText(canvas, options, lines);
      }
    }
  };
  render() {
    const { children, numberOfLines, ...others } = this.props as any;
    return React.createElement(
      'View',
      others,
      React.createElement('Text', {
        content: children,
        customDrawer: this.drawText,
        textStyle: others.style,
        highlight:others.highlight,
        style: this.state,
        numberOfLines,
        $ready: Boolean(this._drawed),
      })
    );
  }
}

const TEXT_STYLES_LIST = [
  'fontStyle',
  'fontWeight',
  'fontSize',
  'fontFamily',
  'textBaseline',
  'wordBreak',
  'lineHeight',
];

const DEFAULT_TEXTSTYLE = {
  fontFamily:
    "PingFang SC, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB','Microsoft YaHei', SimSun, sans-serif",
  fontWeight: 'normal',
  fontSize: 14,
  color: '#000',
  fontStyle: 'normal',
  textBaseline: 'middle',
};

function textStyleChanged(left: any, right: any) {
  for (let i = 0; i < TEXT_STYLES_LIST.length; i++) {
    const item = TEXT_STYLES_LIST[i];
    if (left[item] !== right[item]) {
      return true;
    }
  }
  return false;
}

function textPropsChanged(left: DrawTextOptions, right?: DrawTextOptions) {
  if (!right) {
    return true;
  }
  if (left.content !== right.content) {
    return true;
  }
  if (left.numberOfLines !== right.numberOfLines) {
    return true;
  }
  if (left.frame.width !== right.frame.width) {
    return true;
  }
  return textStyleChanged(left.textStyle, right.textStyle);
}

function getTextFromNode(node: Node) {
  const frame = getFrameFromNode(node);
  if (frame.width > 0) {
    const { content } = node.props;
    if (typeof content === 'string') {
      return content;
    } else if (Array.isArray(content)) {
      return content.join('');
    }
  }
  return '';
}

function getTextStyleFromNode(node: Node) {
  const style = Object.assign({}, DEFAULT_TEXTSTYLE, ...flatten([node.props.textStyle]));
  style.lineHeight = style.lineHeight || style.fontSize * 1.1;
  return applyAnimated(style);
}
// TODO: nested text support

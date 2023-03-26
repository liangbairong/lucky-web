import { Frame } from '../../core/Node';
import { getChars, getWords, setShadow } from '../../core/utils';
import { RevasCanvas } from '../../core/Canvas';

export interface DrawTextOptions {
  textStyle: any;
  numberOfLines: number;
  highlight:any;
  frame: Frame;
  content: string;
}

export type MeasureLine = { width: number; text?: string; child?:any };

export type MeasureResult = [MeasureLine[], number];

export const DEFAULT_MEASURE: MeasureResult = [[], 0];

function measureLines(canvas: RevasCanvas, chars: readonly string[], boxWidth: number, numberOfLines: number,highlight:any) {
  const lines: MeasureLine[] = [];
  let width = 0;
  let text:any = '';
  let cursor = -1;
  function pushLine(charWidth = 0, char = '', force = false) {
    if (force || text) {
      let c=null
      //处理高亮属性
      let textCon=highlight.text
      if(textCon && text.indexOf(textCon)!==-1){
        const arr = text.split(textCon)
        const w1=  canvas.context.measureText(arr[0]).width;
        const w2=  canvas.context.measureText(textCon).width;
        c=[
          {
            text:arr[0],
            width:0,
          },
          {
            text:textCon,
            width:w1,
            color:highlight.color
          },
          {
            text:arr[1],
            width:w2+w1,
          },
        ]
      }
      lines.push({ width:width, text, child:c });
    }
    if (cursor < chars.length && numberOfLines > 0 && lines.length >= numberOfLines) {
      const lastLine = lines[lines.length - 1];
      // @ts-ignore
      lastLine.text = `${lastLine.text.slice(0, -2)}...`;
      lastLine.width = canvas.context.measureText(lastLine.text).width;
      cursor = chars.length + 1;
    } else {
      width = charWidth;
      text = char.trim();
    }
  }

  while (cursor++ <= chars.length) {
    if (chars.length > cursor) {
      const char = chars[cursor];
      if (char === '\n') {
        pushLine(0, '', true);
      } else {
        const charWidth = canvas.context.measureText(char).width;
        if (charWidth + width > boxWidth) {
          pushLine(charWidth, char);
        } else {
          width += charWidth;
          text += char;
        }
      }
    } else {
      pushLine();
    }
  }
  return lines;
}

function splitContent(content: string, wordBreak: string) {
  switch (wordBreak) {
    case 'break-all':
      return getChars(content);
    case 'keep-all':
      return [content];
    default:
      return getWords(content);
  }
}

export function applyTextStyle(canvas: RevasCanvas, options: DrawTextOptions) {
  const { fontStyle, fontWeight, fontSize, fontFamily, textBaseline, color } = options.textStyle;
  // Apply Styles
  // console.log(canvas.context)
  canvas.context.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
  canvas.context.fillStyle = color;
  canvas.context.textBaseline = textBaseline;
}

export function measureText(canvas: RevasCanvas, options: DrawTextOptions): MeasureResult {
  const lines = measureLines(
    canvas,
    splitContent(options.content, options.textStyle.wordBreak),
    options.frame.width,
    options.numberOfLines,
      options.highlight
  );
  return [lines, options.textStyle.lineHeight * lines.length];
}

export function drawText(canvas: RevasCanvas, options: DrawTextOptions, lines: MeasureLine[]) {
  const { textStyle: style, frame } = options;

  // Shadow:
  const resetShadow = setShadow(
    canvas,
    style.textShadowColor,
    style.textShadowOffsetX,
    style.textShadowOffsetY,
    style.textShadowBlur
  );
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let { x } = frame;
    switch (style.textAlign) {
      case 'center':
        x = x + frame.width / 2 - line.width / 2;
        break;
      case 'right':
        x = x + frame.width - line.width;
        break;
    }
    if(line.child){
      line.child.forEach((item:any)=>{
        if(item.color){
          canvas.context.fillStyle = item.color;
        }else{
          canvas.context.fillStyle = style.color;
        }
        canvas.context.fillText(item.text, x+item.width, style.lineHeight * (i + 0.5) + frame.y);
      })
    }else{
      canvas.context.fillText(<string>line.text, x, style.lineHeight * (i + 0.5) + frame.y);
    }

  }
  resetShadow();
}

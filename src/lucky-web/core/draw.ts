import { Node, Frame } from './Node';
import {
  getMergedStyleFromNode,
  getFrameFromNode,
  sortByZIndexAscending,
  setShadow,
  pushOpacity,
  adapter
} from './utils';
import { Container } from './Container';
import { getCache, createCache, autoCacheId } from './offscreen';
import { LuckCanvas } from './Canvas';
import Debugging from "./debugging";
function getRadius(style: any) {
  return {
    tl: style.borderTopLeftRadius || style.borderRadius || 0,
    tr: style.borderTopRightRadius || style.borderRadius || 0,
    bl: style.borderBottomLeftRadius || style.borderRadius || 0,
    br: style.borderBottomRightRadius || style.borderRadius || 0,
  };
}

//预留距离 避免滑动太快 看到空白
const previewDistance: number = 300
let scrollContent:any=null

const _dg = (node: Node,horizontal:boolean=false) => {
  if (node && scrollContent) {
    return !(scrollContent.scrollY + scrollContent.height + previewDistance > node.frame.y && scrollContent.scrollY - previewDistance < node.frame.y + node.frame.height);
  }

  return false
}

export function drawNode(canvas: LuckCanvas, node: Node, container: Container) {
  if(node.type==='ScrollContent'){
    scrollContent=node.views
  }

  // @ts-ignore
  if(node.inScroll){
    if(_dg(node)){
      return;
    }
  }
  if(node.isNoRender){
    return;
  }


  const style = getMergedStyleFromNode(node, container.draw);  //从节点获得合并样式
  const frame = getFrameFromNode(node);
  if (style.opacity <= 0) {
    return;
  }


  // if(node.type==='View'){
  //   console.log(node)
  //   new Debugging().draw(canvas,node)
  // }

  // flags
  const hasTransform =
    style.translateX || style.translateY || style.rotate || style.scaleX || style.scaleY || style.scale;
  const hasClip = style.overflow === 'hidden';

  if (hasClip) {
    canvas.context.save();
  } else if (hasTransform) {
    canvas.transform.save();
  }
  // Area Range 2

  // Opacity:
  const popOpacity = pushOpacity(canvas, style.opacity);

  // Translation:
  if (style.translateX || style.translateY) {
    canvas.transform.translate(style.translateX || 0, style.translateY || 0);
  }
  // Rotate && Scale
  if (style.rotate || style.scaleX || style.scaleY || style.scale) {
    // Origin Center
    const originX = frame.x + frame.width / 2;
    const originY = frame.y + frame.height / 2;
    canvas.transform.translate(originX, originY);
    if (style.rotate) {
      canvas.transform.rotate(style.rotate);
    }
    if (style.scaleX || style.scaleY || style.scale) {
      canvas.transform.scale(style.scaleX || style.scale, style.scaleY || style.scale);
    }
    canvas.transform.translate(-originX, -originY);
  }

  if (node.props.cache && adapter.createOffscreenCanvas && frame.height > 0 && frame.width > 0) {
    drawCache(canvas, node, container, style, frame, hasClip);
  } else {
    drawContent(canvas, node, container, style, frame, hasClip);
  }




  popOpacity();

  if (hasClip) {
    canvas.context.restore();
  } else if (hasTransform) {
    canvas.transform.restore();
  }
}

function drawCache(canvas: LuckCanvas, node: Node, container: Container, style: any, frame: Frame, hasClip: boolean) {
  const cachedId = node.props.cache === true ? autoCacheId(node) : node.props.cache;
  let cached = getCache(cachedId);
  const { shadowBlur = 0, shadowOffsetX = 0, shadowOffsetY = 0 } = cached ? cached.style : style;
  const spread = shadowBlur * 2;
  const x = frame.x + shadowOffsetX - shadowBlur;
  const y = frame.y + shadowOffsetY - shadowBlur;
  const w = frame.width + spread;
  const h = frame.height + spread;
  if (!cached) {
    if (!node.$ready && !node.props.forceCache) {
      return drawContent(canvas, node, container, style, frame, hasClip);
    }
    // @ts-ignore
    cached = createCache(style, w, h, cachedId, <number>container?._root?.props?.deviceRatio);
    cached.canvas.transform.translate(-x, -y);
    drawContent(cached.canvas, node, container, style, frame, hasClip);
    cached.canvas.transform.translate(x, y);
  }
  canvas.context.drawImage(cached.canvas.element, x, y, w, h);
}

function drawContent(
  canvas: LuckCanvas,
  node: Node,
  container: Container,
  style: any,
  frame: Frame,
  hasClip: boolean
) {
  const hasBG = style.backgroundColor && style.backgroundColor !== 'transparent';
  const hasBorder = style.borderColor && style.borderWidth > 0;
  const hasRadius =
    style.borderRadius ||
    style.borderTopLeftRadius ||
    style.borderTopRightRadius ||
    style.borderBottomLeftRadius ||
    style.borderBottomRightRadius;

  const useFrame = hasBG || hasBorder || hasClip || style.path;
  const usePath = hasRadius || hasClip || style.path;
  if (useFrame) {
    const { context: ctx } = canvas;
    if (usePath) {
      // Draw Path
      ctx.beginPath();
      if (hasRadius) {
        const radius = getRadius(style);
        ctx.moveTo(frame.x + radius.tl, frame.y);
        ctx.arcTo(frame.x + frame.width, frame.y, frame.x + frame.width, frame.y + frame.height, radius.tr);
        ctx.arcTo(frame.x + frame.width, frame.y + frame.height, frame.x, frame.y + frame.height, radius.br);
        ctx.arcTo(frame.x, frame.y + frame.height, frame.x, frame.y, radius.bl);
        ctx.arcTo(frame.x, frame.y, frame.x + frame.width, frame.y, radius.tl);
      } else {
        ctx.rect(frame.x, frame.y, frame.width, frame.height);
      }
      ctx.closePath();

      if (hasClip) {
        ctx.clip();
      }
    }

    if (hasBG || hasBorder) {
      // Shadow:
      const resetShadow = setShadow(
        canvas,
        style.shadowColor,
        style.shadowOffsetX,
        style.shadowOffsetY,
        style.shadowBlur
      );
      // Background color & Shadow
      if (hasBG) {
        ctx.fillStyle = style.backgroundColor;
        if (usePath) {
          ctx.fill();
        } else {
          ctx.fillRect(frame.x, frame.y, frame.width, frame.height);
        }
      }

      // Border with border radius:
      if (hasBorder) {
        ctx.lineWidth = style.borderWidth;
        ctx.strokeStyle = style.borderColor;
        if (usePath) {
          ctx.stroke();
        } else {
          ctx.strokeRect(frame.x, frame.y, frame.width, frame.height);
        }
      }
      resetShadow();
    }
  }

  if (node.props.customDrawer) {
    node.props.customDrawer(canvas, node, { hasRadius, hasClip });
  }

  // Draw child layers, sorted by their z-index.
  node.children
    .slice()
    .sort(sortByZIndexAscending)
    .forEach(function drawChild(child) {
      drawNode(canvas, child, container);
    });
}

使用canvas来布局dom的框架，支持react 17以上的hook

## Install

``` bash
$ npm i lucky-web -S
```

## 使用

```typescript
import React from 'react';
import {render, View, ScrollView} from 'lucky-web';

const style = {
    main: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(49, 24, 124, 1)'
    },
}
const App = () => {
    return (
        <ScrollView style = {style.main} > <Text>HELLO
    WORLD < /Text></
    ScrollView >
)
}
let height = document.body.clientHeight / (document.body.clientWidth / 750)

const app = render(<App / >, document.getElementById('canvas')!, {devicePixelRatio: 1, width: 750, height});

window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
        height = document.body.clientHeight / (document.body.clientWidth / 750)
        app.update({width: 750, height});
    });
});

```

## CSS

| Category | Styles |
| -: | - |
| Flexible Layout | **width**, minWidth, maxWidth, **height**, minHeight, maxHeight, **padding**, paddingLeft, **margin**, marginLeft, position, left, top, **flex**, flexDirection, justifyContent, alignItems |
| Box | borderRadius, borderWidth, borderColor, borderTopLeftRadius, shadowColor, shadowOffsetX, shadowOffsetY, shadowBlur, backgroundColor, overflow, opacity |
| Text | fontFamily, fontSize, fontWeight, color, lineHeight, textAlign, wordBreak, fontStyle, textBaseline, textShadowBlur, textShadowColor, textShadowOffsetX, textShadowOffsetY |
| Image | resizeMode |
| Transform | translateX, translateY, rotate, scale, scaleX, scaleY |
| Other | animated, path |

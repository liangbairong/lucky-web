
## lucky-web

lucky-web是个使用yoga的布局引擎和React，来绘制canvas的渲染框架，支持react 17以上的hook
## Install

``` bash
$ npm i lucky-web -S
```

### [demo](https://liangbairong.gitee.io/lucky-web/)

### [文档](https://liangbairong.gitee.io/lucky-web-ui/)

## 使用
 
```tsx
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
        <ScrollView style={style.main}> 
            <Text>HELLO WORLD </Text>
        </ScrollView >
)
}
const app = render(<App />, document.getElementById('app')!, {});

```

```html
<div id='app'}></div>
```



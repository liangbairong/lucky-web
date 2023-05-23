import React from 'react';
import { render } from './lucky-web';
import App from './develop/App';
import './develop/index.css';

const w = window.screen.width || document.body.clientWidth;
const h = window.screen.height || document.body.clientHeight;
// const app = render(<App />, document.getElementById('canvas')!, { devicePixelRatio: 1, width: 750, height: h / (w / 750) });


const app = render(<App />, document.getElementById('canvas')!, {  });
window.addEventListener('resize', () => {
  requestAnimationFrame(() => {
    app.update();
  });
});


// @ts-ignore
document.querySelector('.loading-box').remove()

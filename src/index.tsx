import React from 'react';
import { render, View,ScrollView } from './revas';
import App from './develop/App';
// import * as serviceWorker from './develop/serviceWorker';

import './develop/index.css';




// eslint-disable-next-line
const app = render(<App />, document.getElementById('canvas')!, { devicePixelRatio: 1, width: 750, height: document.body.clientHeight / (document.body.clientWidth / 750) });
// const app = render(<App />, document.getElementById('canvas')!, {  });
// window.addEventListener('resize', () => {
//   requestAnimationFrame(() => {
//     app.update();
//   });
// });



// serviceWorker.unregister();

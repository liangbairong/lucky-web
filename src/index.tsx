import React from 'react';
import { render, View } from './revas';
// import App from './develop/App';
// import * as serviceWorker from './develop/serviceWorker';

import './develop/index.css';



const App = () => {
  return <View style={{  height: 130, backgroundColor: 'red' }}>
    <View style={{ width: 20, height: 200, backgroundColor: 'blue' }}>


    </View>

  </View>
}

// eslint-disable-next-line
const app = render(<App />, document.getElementById('canvas')!, { devicePixelRatio: 1, width: 750, height: document.body.clientHeight / (document.body.clientWidth / 750) });

// window.addEventListener('resize', () => {
//   requestAnimationFrame(() => {
//     app.update();
//   });
// });

// setTimeout(() => {
//   app.unmount();
// }, 5000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

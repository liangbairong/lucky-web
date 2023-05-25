import Yoga,{Node} from 'yoga-wasm-web/dist/asm'

export const yoga: Node | any = {} ;

export const promise = new Promise((resolve:Function)=>{
  resolve()
}).then(() => {
  Object.assign(yoga, Yoga());
});

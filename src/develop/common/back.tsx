import * as React from 'react';
import { Touchable, Image } from '../../domReactCanvas';
import backIcon from '../back.png';

export default function Back(props: any) {
  return (
    // @ts-ignore
    <Touchable style={styles.back} onPress={props.router.pop}>
      <Image style={styles.backImg} src={backIcon} />
    </Touchable>
  );
}

const styles = {
  back: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
  },
  backImg: {
    width: 49,
    height: 50,
  },
};

import React from 'react';
import { Text, View, Image, Touchable } from '../../lucky-web';
import Interactable from './Interactable';
import Back from '../common/back';
import logo from './logo.png';

export default function About(props: any) {
  return (
    <View style={styles.container}>
      <Interactable style={styles.card} cache>
        <Text style={styles.title}>Drag and Move! </Text>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.text} numberOfLines={3}>
          lucky-web让你可以用React和CSS，在Canvas上绘制高性能交互界面，基于React 17和Yoga Layout～
        </Text>
        {/*@ts-ignore */}
        <Touchable style={styles.btn} onPress={() => props.router.pop()}>
          <Text style={styles.btnText}>Go</Text>
        </Touchable>
      </Interactable>
      <Back {...props} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9254DE',
  },
  card: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffsetX: 0,
    shadowOffsetY: 5,
    shadowBlur: 15,
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 34,
    lineHeight: 40,
    textAlign: 'center',
    padding: 10,
    color: '#333',
  },
  logo: {
    height: 400,
    borderRadius: 10,
    mode: 'contain',
  },
  btn: {
    justifyContent: 'center',
    height: 80,
    backgroundColor: '#9254DE',
  },
  btnText: {
    fontSize: 30,
    textAlign: 'center',
    height: 50,
    lineHeight: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
};

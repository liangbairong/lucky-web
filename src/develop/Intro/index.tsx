import * as React from 'react';
import { View,ScrollView } from '../../lucky-web';
import NavBar from './Navbar';
import Entry from './Entry';
import About from './About';
import Components from './Component';
import ViewComponent from "./ViewComponent";
import TextComponent from "./TextComponent";
import InputComponent from './InputComponent'
import ImageComponent from "./ImageComponent";
import ButtonComponent from "./ButtonComponent";
import Style from './Style';
import Animation from './Animation';

export default function Intro(props: any) {
  return (
    <View style={styles.container}>
      <NavBar {...props} title="Overview" />
      {/*@ts-ignore*/}
      <ScrollView style={styles.entries}>
        <Entry label="View" onPress={() => props.router.push(ViewComponent)} />
        <Entry label="Text" onPress={() => props.router.push(TextComponent)} />
        <Entry label="Input" onPress={() => props.router.push(InputComponent)} />
        <Entry label="Image" onPress={() => props.router.push(ImageComponent)} />
        <Entry label="Button" onPress={() => props.router.push(ButtonComponent)} />
        <Entry label="Component" onPress={() => props.router.push(Components)} />
        <Entry label="Style" onPress={() => props.router.push(Style)} />
        <Entry label="Animation" onPress={() => props.router.push(Animation)} />
        <Entry label="About" onPress={() => props.router.push(About)} />
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  entries: {
    flex: 1,
    justifyContent: 'center',
  },
};

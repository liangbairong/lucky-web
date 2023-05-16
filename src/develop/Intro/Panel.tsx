import * as React from 'react';
import { View, Text,lpx } from '../../lucky-web';

export interface PanelItemProps {
  label: string;
  children?: any;
  style?: any;
}

export function PanelItem(props: PanelItemProps) {
  return (
    <View style={[styles.item, props.style]}>
      {props.children}
      <Text style={styles.itemText}>{props.label}</Text>
    </View>
  );
}

export interface PanelProps {
  label: string;
  children?: any;
  style?: any;
  cache?: boolean;
}

export default function Panel(props: PanelProps) {
  return (
    <View style={[styles.container, props.style]} cache={props.cache} pointerEvents={props.cache ? 'none' : 'auto'}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.line} />
      {props.children}
    </View>
  );
}

const styles = {
  container: {
    padding: lpx(20),
  },
  label: {
    fontSize:lpx(32),
    fontWeight: '600',
    color: '#000',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 10,
    marginBottom: 15,
  },
  item: {
    marginRight: 15,
  },
  itemText: {
    textAlign: 'center',
    fontSize: lpx(25),
    marginTop: 2,
  },
};

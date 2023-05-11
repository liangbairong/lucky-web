import * as React from 'react';
import { View, Text } from '../../lucky-web';

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
    padding: 20,
  },
  label: {
    fontSize:32,
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
    fontSize: 25,
    marginTop: 2,
  },
};

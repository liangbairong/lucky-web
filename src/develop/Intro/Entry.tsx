import * as React from 'react';
import {Touchable, Text, View, Image} from '../../lucky-web';

export interface EntryProps {
    label: string;
    onPress: any;
}

export default function Entry(props: EntryProps) {
    return (
        // @ts-ignore
        <Touchable onPress={props.onPress} style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <Image src={require('./entry.jpg')} style={styles.icon}/>
            <View style={styles.line}/>
        </Touchable>
    );
}


const styles = {
    container: {
        height: 108,
        justifyContent: 'center',
        paddingLeft: 40
    },
    label: {
        color: '#191919',
        fontSize: 25,
        fontWeight: '600'
    },
    line: {
        position: 'absolute',
        left: 20, right: 0, bottom: 0, height: 1,
        backgroundColor: '#000',
        opacity: 0.2
    },
    icon: {
        width: 9, height: 12,
        position: 'absolute',
        right: 36, top: 23
    }
};

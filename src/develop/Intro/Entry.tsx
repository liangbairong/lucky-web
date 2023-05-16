import * as React from 'react';
import {Touchable, Text, View, Image,lpx} from '../../lucky-web';

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
        height: lpx(108),
        justifyContent: 'center',
        paddingLeft: lpx(40)
    },
    label: {
        color: '#191919',
        fontSize: lpx(30),
        fontWeight: '600'
    },
    line: {
        position: 'absolute',
        width: '100%',
        left: lpx(20), right: 0, bottom: 0, height: 1,
        backgroundColor: '#000',
        opacity: 0.2
    },
    icon: {
        width: 9, height: 12,
        position: 'absolute',
        right: 36, top: 23
    }
};

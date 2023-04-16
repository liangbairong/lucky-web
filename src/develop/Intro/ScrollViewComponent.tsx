import * as React from 'react';
import {View, Text, Image, ScrollView, Touchable, LinearGradient, Input} from '../../lucky-web';
import NavBar from './Navbar';
import Panel, {PanelItem} from './Panel';

export default function Components(props: any) {
    // @ts-ignore
    const list=[...new Array(20).keys()]
    return (
        <View style={styles.container}>
            <NavBar title="Component" {...props} />
            {/*@ts-ignore */}
            <ScrollView style={styles.container}>
                <Panel label="ScrollView x轴">
                    {/*@ts-ignore */}
                    <ScrollView horizontal style={styles.scrollView.container}>
                        {
                            list.map((item,i)=>{
                                return <View style={styles.scrollView.box} key={i}>
                                    <Text style={styles.scrollView.text}>{i+''}</Text>
                                </View>
                            })
                        }
                    </ScrollView>
                </Panel>

                <Panel label="ScrollView y轴">
                    {/*@ts-ignore */}
                    <ScrollView style={styles.scrollView.container2}>
                        {
                            list.map((item,i)=>{
                                return <View style={styles.scrollView.box} key={'aaa-'+i}>
                                    <Text style={styles.scrollView.text}>{i+''}</Text>
                                </View>
                            })
                        }
                    </ScrollView>
                </Panel>
                {/*<Panel label="LinearGradient" cache>*/}
                {/*    <LinearGradient style={styles.gradient} colors={['#C48DF1', '#91D5FF', '#40A9FF']}/>*/}
                {/*</Panel>*/}
            </ScrollView>
        </View>
    );
}

const styles = {
    container: {flex: 1,width:'100%'},

    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItem: 'center',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItem: 'center',
    },
    gradient: {
        height: 40,
    },

    scrollView: {
        container: {
            height: 100,
        },
        container2:{
            height:400,
            width:'100%',
            overflow:'hidden',
            backgroundColor:'#ccc'
        },
        box: {
            width: 100,
            height: 100,
            justifyContent: 'center',
            backgroundColor: '#333',
            marginRight: 10,
        },
        text: {
            color: '#fff',
            fontWeight: '600',
            fontSize: 24,
            textAlign: 'center',
        },
    },
};

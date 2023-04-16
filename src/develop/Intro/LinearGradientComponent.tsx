import * as React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    LinearGradient,
    Input,
    RevasCanvas,
    Node,
    Touchable
} from '../../lucky-web';
import NavBar from './Navbar';
import Panel, {PanelItem} from './Panel';

const style = {
    box: {
        width: 200,
        height: 100,
        backgroundColor: '#ffcc99',
        justifyContent: 'center',
        alignItem: 'center',
    },
    height:{
        height:400,
    },
    border:{
        borderWidth:5,
        borderColor:'red'
    },
    shadow: {
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        shadowBlur: 6,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
}

const LinearGradientComponent = (props: any) => {
    //@ts-ignore
    const num = [...new Array(1000).keys()]
    return <View style={{flex: 1}}>
        <NavBar title="LinearGradient" {...props} />
        {/*@ts-ignore*/}
        <ScrollView style={{flex: 1, width: '100%'}}>
            <Panel label="x轴渐变">
                <LinearGradient style={style.height} colors={['#C48DF1', '#91D5FF', '#40A9FF']}/>
            </Panel>
            <Panel label="y轴渐变">
                <LinearGradient style={style.height}
                                start={{x: 0, y:0}} end={{x: 0, y:1}}
                                colors={['#C48DF1', '#91D5FF', '#40A9FF']}/>
            </Panel>
            <Panel label="45°">
                <LinearGradient style={style.height}
                                start={{x: 0, y:0}} end={{x: 1, y:1}}
                                colors={['#C48DF1', '#40A9FF']}/>
            </Panel>
        </ScrollView>
    </View>
}
export default LinearGradientComponent

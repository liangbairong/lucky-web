import * as React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    LinearGradient,
    Input,
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
    radius:{
        borderRadius:20
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

const ViewComponent = (props: any) => {
    //@ts-ignore
    const num = [...new Array(1000).keys()]
    return <View style={{flex: 1}}>
        <NavBar title="View" {...props} />
        {/*@ts-ignore*/}
        <ScrollView style={{flex: 1, width: '100%'}}>
            <Panel label="基本">
                <View style={style.box}/>
            </Panel>
            <Panel label="radius 圆角">
                <View style={[style.box,style.radius]}/>
            </Panel>
            <Panel label="border 边框">
                <View style={[style.box,style.border]}/>
            </Panel>
            <Panel label="shadow 阴影">
                <View style={[style.box,style.shadow]}/>
            </Panel>
        </ScrollView>
    </View>
}
export default ViewComponent

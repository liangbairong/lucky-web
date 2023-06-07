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
        borderRadius:10
    },
    font: {
        fontSize: 38,
        // marginBottom: 10,
        textAlign:'center'
    }
}

const ButtonComponent = (props: any) => {
    //@ts-ignore
    const num = [...new Array(1000).keys()]
    return <View style={{flex: 1}}>
        <NavBar title="Button" {...props} />
        {/*@ts-ignore*/}
        <ScrollView style={{flex: 1, width: '100%'}}>
            <Panel label="Touchable">
                {/*@ts-ignore */}
                <Touchable style={style.box} onPress={() => alert('press')}>
                    <Text style={style.font}>Button</Text>
                </Touchable>
            </Panel>
        </ScrollView>
    </View>
}
export default ButtonComponent

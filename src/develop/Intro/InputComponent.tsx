import * as React from 'react';
import {View, Text, Image, ScrollView, Touchable, LinearGradient, Input, RevasCanvas, Node} from '../../lucky-web';
import NavBar from './Navbar';
import Panel, {PanelItem} from './Panel';

const InputComponent=(props:any)=>{
    return <View>
        <NavBar title="Input" {...props} />
        <Panel label="基本">
            <Input style={{marginTop:10}}  onGetValue={(text:string)=>{
                console.log(text)
            }}/>
        </Panel>
        <Panel label="有默认值">
            <Input style={{marginTop:10}} value="ddsdsd" key={'222'} onGetValue={(text:string)=>{
                console.log(text)
            }}/>
        </Panel>
    </View>
}
export default InputComponent

import * as React from 'react';
import {View, Text, Image, ScrollView, Touchable, LinearGradient, Input, RevasCanvas, Node} from '../../lucky-web';
import NavBar from './Navbar';
import Panel, {PanelItem} from './Panel';

const InputComponent=(props:any)=>{


    return <View>
        <NavBar title="InputComponent" {...props} />

        <Panel label="Input">
            <Input style={{marginTop:10}} key={'222'} onGetValue={(text:string)=>{
                console.log(text)
            }}/>
        </Panel>
        <Panel label="Input">
            <Input style={{marginTop:10}} value="ddsdsd" key={'222'} onGetValue={(text:string)=>{
                console.log(text)
            }}/>
        </Panel>
        <Panel label="Input">
            <Input style={{marginTop:10}} key={'222'} onGetValue={(text:string)=>{
                console.log(text)
            }}/>
        </Panel>
        <Panel label="Input">
            <Input style={{marginTop:10}} key={'222'} onGetValue={(text:string)=>{
                console.log(text)
            }}/>
        </Panel>
        <Panel label="Input">
            <Input style={{marginTop:10}} key={'222'} onGetValue={(text:string)=>{
                console.log(text)
            }}/>
        </Panel>
    </View>
}
export default InputComponent

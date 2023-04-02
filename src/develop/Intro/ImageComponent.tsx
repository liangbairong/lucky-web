import * as React from 'react';
import {View, Text, Image, ScrollView, Touchable, LinearGradient, Input, RevasCanvas, Node} from '../../lucky-web';
import NavBar from './Navbar';
import Panel, {PanelItem} from './Panel';
import logo from './logo.png'
const ImageComponent=(props:any)=>{
    return <View>
        <NavBar title="ImageComponent" {...props} />

        <Panel label="Input">
            <Image style={{width:300,height:300,mode:'repeat',   backgroundColor: '#ccc',}}  src={logo}/>
        </Panel>
    </View>
}
export default ImageComponent

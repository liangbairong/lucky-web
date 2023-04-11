import * as React from 'react';
import {View, Text, Image, ScrollView, Touchable, LinearGradient, Input, RevasCanvas, Node} from '../../lucky-web';
import NavBar from './Navbar';
import Panel, {PanelItem} from './Panel';
import logo from './logo.png'
const style={
    font:{
        fontSize:28,
        marginBottom:10
    }
}

const ImageComponent = (props: any) => {
    return <View style={{flex:1}}>
        <NavBar title="Image" {...props} />
        {/*@ts-ignore*/}
        <ScrollView style={{flex:1,width:'100%'}}>
            <Panel label="默认">
                <Text style={style.font}>缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。</Text>
                <Image style={{width: 300, height: 200, backgroundColor: '#ccc',}} src={logo}/>
            </Panel>
            <Panel label="contain">
                <Text style={style.font}>缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。</Text>
                <Image style={{width: 300, height: 200, mode: 'contain', backgroundColor: '#ccc',}} src={logo}/>
            </Panel>
            <Panel label="over">
                <Text style={style.font}>拉伸</Text>
                <Image style={{width: 300, height: 200, mode: 'over', backgroundColor: '#ccc',}} src={logo}/>
                <Image style={{width: 200, height: 300, mode: 'over', backgroundColor: '#ccc',}} src={logo}/>
            </Panel>
            <Panel label="repeat-x">
                <Text style={style.font}>x重复</Text>
                <Image style={{width: 500, height: 200, mode: 'repeat-x', backgroundColor: '#ccc',}} src={logo}/>
            </Panel>
            <Panel label="repeat-y">
                <Text style={style.font}>y重复</Text>
                <Image style={{width: 200, height: 500, mode: 'repeat-y', backgroundColor: '#ccc',}} src={logo}/>
            </Panel>
        </ScrollView>
    </View>
}
export default ImageComponent

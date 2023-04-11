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
const styles = {
    container: {flex: 1},
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItem: 'center',
    },
    text: {
        base: {
            flex: 1,
            textAlign: 'center',
            lineHeight: 50, fontSize: 34,
        },
        weight: {
            fontWeight: '800',
        },
        color: {
            color: 'red',
        },
        serif: {
            fontFamily: 'serif',
        },
        // 文字描边
        shadow: {
            textShadowOffsetX: 1,  // 偏斜量x
            textShadowOffsetY: 1,// 偏斜量x
            textShadowBlur: 5,  // 粗细
            textShadowColor: 'red',  //颜色
            fontWeight: '600',
            color:'#ffd445',
            fontSize:50
        },
    },
};
const TextComponent = (props: any) => {
    return <View style={{flex:1}}>
        <NavBar title="Image" {...props} />
        {/*@ts-ignore*/}
        <ScrollView style={{flex:1,width:'100%'}}>
            <Panel label="默认">
                <Text style={styles.text.base}>default style</Text>

                <View style={styles.row}>
                    <Text style={styles.text.base}>default style</Text>
                    <Text style={[styles.text.base, styles.text.weight]}>fontWeight</Text>
                    <Text style={[styles.text.base, styles.text.color]}>color: red</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text.base}>textAlign: center</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.text.base, styles.text.serif]}>fontFamily: serif</Text>
                </View>
            </Panel>
            <Panel label="文字描边">
                <Text style={[styles.text.base, styles.text.shadow]}>textShadow</Text>
            </Panel>
            <Panel label="颜色高亮">
                <Text style={{
                    textAlign: 'left',
                    fontSize: 30,
                    color: '#000'
                }}
                      highlight={{
                          text: 'dd试试',
                          color: 'blue'
                      }}
                >dddeeee sas{'dd试试'}家居设计js撒假数据实际上仅仅是dddff计算机视觉</Text>
            </Panel>

        </ScrollView>
    </View>
}
export default TextComponent

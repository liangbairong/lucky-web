import * as React from 'react';
import {View, Text, AnimatedValue, timing, AnimatedTiming, Touchable, withContext} from '../lucky-web';
import Intro from './Intro';
// import Timeline from './Timeline';
// import MusicApp from './Music';


import Top from './top'

import SimpleRouter from './common/simple-router';
function randomInteger(max:number) {
    return Math.floor(Math.random()*(max + 1));
}
function randomRgbColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r,g,b];
}

function randomHexColor() {
    let [r,g,b] =randomRgbColor();

    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');

    return "#" + hr + hg + hb;
}

@withContext
export default class App extends React.Component {
    router = React.createRef<SimpleRouter>();

    push = (Comp: any) => () => {
        this.router.current?.push(Comp);
    };

    open = () => {
        window.open('https://pinqy520.github.io/demo/revas-three/');
    };

    render() {
        const cardHeight = 100;
        return (
            <SimpleRouter ref={this.router} width={this.context.clientWidth}>
                <View style={styles.container}>
                    <Text style={{
                        fontSize: 50, color: '#F759AB',
                        textShadowOffsetX: 8,  // 偏斜量x
                        textShadowOffsetY: 8,// 偏斜量x
                        textShadowBlur: 8,
                        textShadowColor: '#9254DE',  //颜色
                        textAlign: 'center', marginBottom: 50
                    }}>Lucky-web</Text>
                    <View style={styles.cards}>
                        <Card
                            color="#9254DE"
                            shadowColor="rgba(146, 84, 222, 0.5)"
                            height={cardHeight}
                            text="Component"
                            tap={this.push(Intro)}
                        />
                        <Card
                            color="#F759AB"
                            shadowColor="rgba(247, 89, 171, 0.5)"
                            height={cardHeight}
                            text="ScrollView 性能测试"
                            tap={this.push(Top)}
                        />
                        {/*<Card*/}
                        {/*  color="#F759AB"*/}
                        {/*  shadowColor="rgba(247, 89, 171, 0.5)"*/}
                        {/*  height={cardHeight}*/}
                        {/*  text="Timeline App"*/}
                        {/*  tap={this.push(Timeline)}*/}
                        {/*/>*/}
                        {/*<Card*/}
                        {/*  color="#597EF7"*/}
                        {/*  shadowColor="rgba(89, 126, 247, 0.5)"*/}
                        {/*  height={cardHeight}*/}
                        {/*  text="Music App"*/}
                        {/*  tap={this.push(MusicApp)}*/}
                        {/*/>*/}
                        {/*@ts-ignore */}
                        {/*<Touchable style={styles.extra} onPress={this.open}>*/}
                        {/*    <Text style={styles.extraText}>Revas + THREE.js</Text>*/}
                        {/*</Touchable>*/}
                    </View>
                </View>
            </SimpleRouter>
        );
    }
}

interface CardProps {
    color: string;
    shadowColor: string;
    text: string;
    tap: Function;
    height: number;
}

class Card extends React.Component<CardProps> {
    animated = new AnimatedValue(30);
    animating?: AnimatedTiming;

    style = [
        // eslint-disable-next-line
        styles.card,
        {
            height: this.props.height,
            backgroundColor: this.props.color,
            shadowColor: this.props.shadowColor,
            shadowBlur: this.animated,
            shadowOffsetY: this.animated.interpolate([4, 30], [1, 5]),
            animated: true,
        },
    ];

    onPress = () => {
        this.animating?.stop();
        this.animating = timing(this.animated, {
            to: 4,
            duration: (this.animated.getValue() - 4) * 10,
        }).start();
    };

    onPressOut = () => {
        this.animating?.stop();
        this.animating = timing(this.animated, {
            to: 30,
            duration: (30 - this.animated.getValue()) * 10,
        }).start();
    };

    render() {
        return (
            //@ts-ignore
            <Touchable
                activeOpacity={1}
                style={this.style}
                onPress={this.props.tap}
                onPressIn={this.onPress}
                onPressOut={this.onPressOut}
                cache
            >
                <Text style={styles.text}>{this.props.text}</Text>
            </Touchable>
        );
    }
}
function jx(num:number){
    return num * (window.screen.width / 750)
}
const styles = {
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
        color: '#000',
        opacity: 0.56,
        marginBottom: 20,
        fontFamily:
            "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
    },
    cards: {
        alignItems: 'center',
        height:400,
        marginTop:20
    },
    card: {
        width: 280,
        shadowOffsetX: 0,
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
        color: '#fff',
        fontFamily:
            "'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
    },
    extra: {
        width: 280,
        height: 50,
        justifyContent: 'center',
        marginTop: 10,
    },
    extraText: {
        textAlign: 'center',
    },
};

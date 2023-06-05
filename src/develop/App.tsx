import * as React from 'react';
import {
    View,
    Text,
    Image,
    AnimatedValue,
    timing,
    AnimatedTiming,
    Touchable,
    withContext,
    lpx,
} from '../lucky-web';
import Intro from './Intro';
import logo from './Intro/logo.png';

import Top from './top';

import SimpleRouter from './common/simple-router';
function randomInteger(max: number) {
    return Math.floor(Math.random() * (max + 1));
}
function randomRgbColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r, g, b];
}

function randomHexColor() {
    let [r, g, b] = randomRgbColor();

    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');

    return '#' + hr + hg + hb;
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
        const cardHeight = lpx(100);
        return (
            <SimpleRouter ref={this.router} width={this.context.clientWidth}>
                <View style={styles.container}>
                    <View
                        style={{
                            justifyContent: 'center',
                            marginBottom: lpx(50),
                            height: lpx(100),
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <View style={{flex:1,position: 'relative', height: lpx(60),}}>
                            <Image
                                src={logo}
                                style={{
                                    width: lpx(60),
                                    height: lpx(60),
                                    position:'absolute',
                                    right:lpx(20),
                                    top:0
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                fontSize: lpx(50),
                                color: '#F759AB',
                                textShadowOffsetX: 8, // 偏斜量x
                                textShadowOffsetY: 8, // 偏斜量x
                                textShadowBlur: 8,
                                textShadowColor: '#9254DE', //颜色
                                width:lpx(460)
                            }}
                        >
                            Lucky-web
                        </Text>
                    </View>
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
        height: lpx(400),
        marginTop: lpx(20),
    },
    card: {
        width: lpx(280),
        shadowOffsetX: 0,
        borderRadius: lpx(15),
        justifyContent: 'center',
        marginTop: lpx(20),
    },
    text: {
        textAlign: 'center',
        fontSize: lpx(24),
        fontWeight: '500',
        color: '#fff',
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

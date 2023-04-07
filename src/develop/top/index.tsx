import React, {useEffect, useState} from 'react'
import {View, ScrollView, Image, Text} from '../../lucky-web';
import style from './style'
import Box from './box'
import Anchor from './anchor'
import header from '../images/header.png';
import Carousel from "./Carousel";
import NavBar from "../Intro/Navbar";

const list: any = [
    {
        title: '戰隊名稱',
        child: [
            {
                title: '首领',
                name: '啾 專屬守護涵涵',
                anchorId: '11467570'
            },
            {
                title: 'MVP主播',
                name: 'aka丐幫🥑粉穗幸谷澤',
                anchorId: '11669567'
            }
        ]
    },
    {
        title: '戰隊隊員',
        child: [
            {
                name: '🥑美麗射雯雯',
                anchorId: '11027949'
            },
            {
                name: '🥑羽絜🫧',
                anchorId: '11549698'
            },
            {
                name: '🥑湘湘',
                anchorId: '10876365'
            },
            {
                name: '🥑語佳確診中 休',
                anchorId: '12276712'
            },
            {
                name: '🥑白安安🎀',
                anchorId: '10938917'
            }
        ]
    },
    {
        title: '參謀',
        child: [
            {
                name: 'AKA丐幫酒桃',
                anchorId: '12267904'
            },
            {
                name: '榮譽總會長',
                anchorId: '11599454'
            },
            {
                name: '籃子',
                anchorId: '11728934'
            }
        ]
    }
]
const App = (props: any) => {
    const [newList, setNewList] = useState([])

    useEffect(() => {
        list.forEach((item: any) => {
            item.child.forEach((item2: any) => {
                item2.img = `https://showme-livecdn.elelive.net/avatar/${item2?.anchorId}?1=1`
            })
        })
        setNewList(list)
    }, [list])

    return (
        <View style={{flex: 1}}>
            <NavBar title="Top" {...props}/>
            {/*@ts-ignore*/}
            <ScrollView style={style.main} paging={0}>
                <View style={style.header}>
                    <Image src={header} style={style.headerImg}/>
                </View>
                <Carousel/>

                <View style={style.list}>
                    {
                        newList.map((item: any, i) => {
                            return <Box key={'box-' + i} title={item.title}>
                                {
                                    item.child.map((item2: any, i2: number) => {
                                        return <Anchor key={'list-' + i + i2} item={item2}/>
                                    })
                                }
                            </Box>
                        })
                    }
                </View>

            </ScrollView>
        </View>
    )
}


export default App

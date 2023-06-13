import React, {useEffect, useState, memo, useCallback} from 'react'
import {
    View,
    ScrollView,
    Text,
} from '../../lucky-web';
import style from './style'
import Box from './box'
import Anchor from './anchor'
import NavBar from "../Intro/Navbar";


let list: any = [
    // {
    //     title: '戰隊名稱',
    //     child: [
    //         {
    //             title: '首领',
    //             name: '啾 專屬守護涵涵',
    //             anchorId: '11467570'
    //         },
    //         {
    //             title: 'MVP主播',
    //             name: 'aka丐幫🥑粉穗幸谷澤',
    //             anchorId: '11669567'
    //         }
    //     ]
    // },
    // {
    //     title: '戰隊隊員',
    //     child: [
    //         {
    //             name: '🥑美麗射雯雯',
    //             anchorId: '11027949'
    //         },
    //         {
    //             name: '🥑羽絜🫧',
    //             anchorId: '11549698'
    //         },
    //         {
    //             name: '🥑湘湘',
    //             anchorId: '10876365'
    //         },
    //         {
    //             name: '🥑語佳確診中 休',
    //             anchorId: '12276712'
    //         },
    //         {
    //             name: '🥑白安安🎀',
    //             anchorId: '10938917'
    //         }
    //     ]
    // },
    // {
    //     title: '參謀',
    //     child: [
    //         {
    //             name: 'AKA丐幫酒桃',
    //             anchorId: '12267904'
    //         },
    //         {
    //             name: '榮譽總會長',
    //             anchorId: '11599454'
    //         },
    //         {
    //             name: '籃子',
    //             anchorId: '11728934'
    //         }
    //     ]
    // }
]
for(let i=0;i<10;i++){
    list.push({
        title: '參謀'+i,
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
    })
}
let state=true
const App = (props: any) => {
    const [newList, setNewList] = useState<any>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        list.forEach((item: any) => {
            item.child.forEach((item2: any) => {
                item2.img = `https://showme-livecdn.elelive.net/avatar/${item2?.anchorId}?1=1`
                item2.img='https://showme-livecdn.elelive.net/medal/icon/20230505/abd8ed5ce2604336a67b5769ad7f0f3f.webp?1=1&width=330&type=webp&height=330'
            })
        })
        setNewList(JSON.parse(JSON.stringify(list)))
        setLoading(false)
    }, [])
    console.log('ren top')
    const onLoadMove=()=>{
        if(!state) return
        state=false
        setLoading(true)
        setTimeout(()=>{
            const a:any =[...newList,...JSON.parse(JSON.stringify(list)),]
            state=true
            setLoading(false)
            setNewList(a)

        },1000)

    }



    return (
        <View style={{flex: 1}}>
            <NavBar title="ScrollView 性能测试" {...props}/>
            <>
                {/*@ts-ignore*/}
                <ScrollView style={style.main} paging={0} onLoadMove={onLoadMove} virtualScrolling>
                    {/*<View style={style.header}>*/}
                    {/*    <Image src={header} style={style.headerImg}/>*/}
                    {/*</View>*/}
                    {/*<Carousel/>*/}


                    <View style={style.list}>
                        {
                            newList.map((item: any, i:number) => {
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
                    {
                        loading &&  <Text style={style.loading}>Loading...</Text>
                    }
                </ScrollView>
            </>


        </View>
    )
}


export default memo(App)

// let loading=false
// @withContext
// export default class MusicApp extends React.Component {
//     constructor(props:any) {
//         super(props);
//         this.state = {
//             newList: list,
//         };
//         console.log('aaaa')
//     }
//
//     onLoadMove(){
//         if(!state) return
//         state=false
//         console.log('00292992')
//         loading=true
//         setTimeout(()=>{
//             // @ts-ignore
//             const a:any =[...list,...this.state.newList]
//             // setNewList(a)
//             this.setState({
//                 newList:a
//             })
//             state=true
//             loading=false
//         },2000)
//     }
//
//
//     render() {
//
//         return (
//             <View style={{flex: 1}}>
//             {/*    @ts-ignore*/}
//             <NavBar title="ScrollView 性能测试" {...this.props}/>
//             {/*@ts-ignore*/}
//             <ScrollView style={style.main} paging={0} onLoadMove={this.onLoadMove.bind(this)} virtualScrolling>
//                 {/*<View style={style.header}>*/}
//                 {/*    <Image src={header} style={style.headerImg}/>*/}
//                 {/*</View>*/}
//                 {/*<Carousel/>*/}
//
//
//                 <View style={style.list}>
//                     {
//                         // @ts-ignore
//                         this.state.newList.map((item: any, i) => {
//                             return <Box key={'box-' + i} title={item.title}>
//                                 {
//                                     item.child.map((item2: any, i2: number) => {
//                                         return <Anchor key={'list-' + i + i2} item={item2}/>
//                                     })
//                                 }
//                             </Box>
//                         })
//                     }
//                 </View>
//                 {
//                     loading &&  <Text style={style.loading}>Loading...</Text>
//                 }
//             </ScrollView>
//         </View>
//         );
//     }
// }

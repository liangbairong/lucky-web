import React, { useState } from 'react'
import { Touchable, View, Text, Image } from '../../lucky-web';
import style from './style'
import bg from '../images/anchor-bg.png'
const Anchor=({item}:any)=>{

  return (
      // @ts-ignore
    <Touchable style={style.anchor} onPress={()=>{
      console.log('aa')
      // toVide('LIVE', item?.anchorId)
    }}>
      {
        item.title &&  <Text style={style.anchorTitle}>{item.title}</Text>
      }

      <View style={[style.anchorHeader]}>
        <Image src={bg} style={style.anchorHeaderBg} />
        <Image src={item.img} style={style.anchorHeaderImg} />
      </View>
      <Text style={style.anchorTitle}>{item.name}</Text>
    </Touchable>
  )
}


export default Anchor

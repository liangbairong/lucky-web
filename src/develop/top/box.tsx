import React, { useState } from 'react'
import { Text, View, ScrollView, Image } from '../../lucky-web';
import style from './style'
import top from '../images/box-top.png'
import center from '../images/box-center.png'
import bottom from '../images/box-bottom.png'
import titles from '../images/title.png'


const Box=({title,children}:any)=>{
  return (
    <View style={style.box}>
      <Image src={center} style={style.boxCenter} />
      <Image src={top} style={style.boxTop} />
      <Image src={bottom} style={style.boxBottom} />
      <View style={style.boxTitle}>
        <Image src={titles} style={style.boxTitleBg} />
        <Text style={style.boxTitleText}>{title}</Text></View>
      <View style={style.boxMain}>
        {children}
      </View>
    </View>
  )
}


export default Box

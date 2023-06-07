import {View, ScrollView, Image, Text, LuckyTouchEvent} from '../../lucky-web';
import {useRef, useState} from "react";

const Carousel = () => {
    const _tid = useRef<any>(null)
    const startX = useRef<number>(0)

    const moveX = useRef<any>(0)
    const [sty, setSty] = useState<any>({
        left: 0
    })
    const start = (e: LuckyTouchEvent) => {
        // console.log(e)
        console.log('33')
        if (!_tid?.current) {
            _tid.current = Object.keys(e.touches)[0];
            const {x, y} = e.touches[_tid.current];
            startX.current = x
        }
    }

    const move = (e: LuckyTouchEvent) => {
        if (_tid?.current && e.touches[_tid?.current]) {
            const {x, y} = e.touches[_tid.current];
            console.log(x - startX.current)
            setSty({left: x - startX.current})
            // console.log(moveX.current)
        }
    }

    const end = (e: LuckyTouchEvent) => {
        console.log(e)
        _tid.current=null
    }

    return (
        <View style={[{
            width: '100%', height: 300, backgroundColor: '#ccc',
            position: 'absolute',
        }, sty]}
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
        >

        </View>
    )
}

export default Carousel

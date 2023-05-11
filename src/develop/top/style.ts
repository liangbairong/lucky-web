import {lpx} from "../../lucky-web";

const style = {
  main: {
    flex: 1,
    // height:700,
    width: '100%',
    // overflow:'hidden',
    backgroundColor: 'rgba(49, 24, 124, 1)'
  },
  header: {
    height: lpx(760)
  },
  headerImg: {
    height: '100%',
    width: '100%'
  },

  loading:{
    fontSize: lpx(40),
    color:'#fff',
    padding: lpx(40),
    textAlign:'center'
  },
  box: {
    // height:700,
    minHeight: lpx(300),
    width: lpx(698),
    position: 'relative',
    left:  lpx(26),
    marginTop:  lpx(80),
    marginBottom:  lpx(80)
  },
  boxCenter: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    mode: 'over'
  },
  boxTop: {
    height:  lpx(67),
    position: 'absolute',
    top:  lpx(-30),
    width: '100%',
    mode: 'over'
  },
  boxBottom: {
    height:  lpx(76),
    position: 'absolute',
    bottom:  lpx(-30),
    width: '100%',
    mode: 'over'
  },
  boxTitle: {
    width:  lpx(368),
    height:  lpx(68),
    position: 'absolute',
    top:  lpx(-70),
    left: '50%',
    translateX:  lpx(-368 / 2),
    justifyContent: 'center'
  },
  boxTitleBg: {
    position: 'absolute',
    width:  lpx(368),
    height:  lpx(68)
  },
  boxTitleText: {
    fontSize:  lpx(34),
    fontWeight: 600,
    color: '#fff',
    textAlign: 'center'
  },
  boxMain: {
    zIndex: 3,
    left: 0,
    width: '100%',
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  list:{
  },
  anchor: {
    width:  lpx(302),
    marginBottom: lpx(30)
  },
  anchorTitle: {
    textAlign: 'center',
    fontSize:  lpx(27),
    fontWeight: 500,
    color: '#FFFFFF',
    marginBottom:  lpx(10),
    width: lpx(302)
  },
  anchorHeader:{
    width:'100%',
    height: lpx(253),
    // backgroundColor: 'rgba(49, 24, 124, 1)'
  },
  anchorHeaderBg:{
    width:'100%',
    height: lpx(253),
    position:'absolute',
    zIndex: 3,
  },
  anchorHeaderImg:{
    width: lpx(119),
    height: lpx(119),
    position:'absolute',
    left:'50%',
    top: lpx(30),
    translateX:  lpx(-119 / 2),
    borderRadius: lpx(119/2)
  }
}

export default style

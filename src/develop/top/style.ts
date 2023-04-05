const style = {
  main: {
    flex: 1,
    // height:700,
    width: 750,
    // overflow:'hidden',
    backgroundColor: 'rgba(49, 24, 124, 1)'
  },
  header: {
    height: 760
  },
  headerImg: {
    height: '100%',
    width: '100%'
  },


  box: {
    // height:700,
    minHeight:300,
    width: 698,
    position: 'relative',
    left: 26,
    marginTop: 80,
    marginBottom: 80
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
    height: 67,
    position: 'absolute',
    top: -30,
    width: '100%'
  },
  boxBottom: {
    height: 76,
    position: 'absolute',
    bottom: -30,
    width: '100%'
  },
  boxTitle: {
    width: 368,
    height: 68,
    position: 'absolute',
    top: -70,
    left: '50%',
    translateX: -368 / 2,
    justifyContent: 'center'
  },
  boxTitleBg: {
    position: 'absolute',
    width: 368,
    height: 68
  },
  boxTitleText: {
    fontSize: 34,
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
    width: 302,
    marginBottom:30
  },
  anchorTitle: {
    textAlign: 'center',
    fontSize: 27,
    fontWeight: 500,
    color: '#FFFFFF',
    marginBottom: 10,
    width:302
  },
  anchorHeader:{
    width:'100%',
    height:253,
    // backgroundColor: 'rgba(49, 24, 124, 1)'
  },
  anchorHeaderBg:{
    width:'100%',
    height:253,
    position:'absolute',
    zIndex: 3,
  },
  anchorHeaderImg:{
    width:119,
    height:119,
    position:'absolute',
    left:'50%',
    top:30,
    translateX: -119 / 2,
    borderRadius:119/2
  }
}

export default style

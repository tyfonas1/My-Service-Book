import colors from './colors';
import device from './device';

// utility styles
// /////////////////////////////////////////////////////////////////////////////
export default {
  activeOpacity: 0.7,

  // containers
  // ///////////////////////////////////////////////////////////////////////////
  container: {
    dark: {
      backgroundColor: colors.darkHighlightColor,
      flex: 1,
    },
    light: {
      backgroundColor: colors.white,
      flex: 1,
    },
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    // paddingTop: 32,
  },
  contentRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  contentRowCenter: {
    // backgroundColor: colors.white,
    borderTopColor: colors.primary,
    borderTopWidth: 5,
    // paddingVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginVertical: 20,
  },
  contentRowChase: {
    // backgroundColor: colors.white,

    borderTopColor: colors.primary,
    borderTopWidth: 5,
    marginTop: 10,
    paddingBottom: 10,
  },
  loginContainer: {
    alignItems: 'center',
    paddingTop: 32,
    flex: 1,
    // justifyContent: 'space-around',
  },
  loginView: {
    dark: {
      width: 15,
      height: 15,
      borderRadius: 35,
      opacity: 0.3,
      backgroundColor: colors.white,
    },
    light: {
      width: 15,
      height: 15,
      borderRadius: 35,
      opacity: 0.3,
      backgroundColor: colors.darkBlue,
    },
  },
  loginMaskedView: {
    dark: {
      width: 15,
      height: 15,
      borderRadius: 35,

      backgroundColor: colors.white,
    },
    light: {
      width: 15,
      height: 15,
      borderRadius: 35,

      backgroundColor: colors.darkBlue,
    },
  },

  // navigation styles
  // ///////////////////////////////////////////////////////////////////////////
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  headerStyle: {
    backgroundColor: colors.darkBlue,
  },

  // input
  /////////////////////////////////////////////////////////////////////////////
  inputContainer: {
    dark: {
      borderStyle: 'solid',
      borderRadius: 3,
      borderWidth: 0.8,
      borderColor: colors.white20,
      height: 80,
      marginVertical: 5,
      marginHorizontal: 5,
    },
    light: {
      borderStyle: 'solid',
      borderRadius: 3,
      borderWidth: 0.8,
      borderColor: colors.darkColor,
      height: 80,
      marginVertical: 5,
      marginHorizontal: 5,
    },
  },
  textInput: {
    width: device.width - 40,
    alignSelf: 'center',
    marginVertical: 5,

    borderBottomColor: 'red',
  },

  titleStyles: {
    position: 'absolute',
    left: 3,
  },

  // button
  // ///////////////////////////////////////////////////////////////////////////
  btn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 50,
    height: 40,
    marginVertical: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 5, // Android
  },
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
    borderColor: colors.darkBlue,
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
    minWidth: 100,
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  iconStyle: {
    marginRight: 30,
  },

  btnPtt: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 60,
    right: device.width / 2 - 40,
    height: 70,
    backgroundColor: 'red',
    borderRadius: 100,
  },
  groupBtn: {
    alignItems: 'center',
    backgroundColor: colors.darkColor,
    borderColor: colors.darkColor,
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    // marginBottom: 16,
    paddingHorizontal: 24,
    // paddingVertical: 8,
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  btnPrimary: {
    alignSelf: 'center',
    margin: 10,
    width: device.width - 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    backgroundColor: colors.primary,

    elevation: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
    zIndex: 10000,
  },
  // context menu
  //////////////////////////////////////////////////////////////////////////////
  menuContainer: {
    dark: {
      paddingTop: 5,
      backgroundColor: colors.darkHighlightColor,
      borderRadius: 5,
      flex: 1,
    },
    light: {
      paddingTop: 5,
      backgroundColor: colors.white,
      borderRadius: 5,
      flex: 1,
    },
  },
  optionText: {
    dark: {
      color: colors.white,
      alignSelf: 'center',
    },
    light: {
      color: colors.darkColor,
      textAlign: 'center',
    },
  },
  // text
  // ///////////////////////////////////////////////////////////////////////////
  text: {
    dark: {
      color: colors.white,
    },
    light: {
      color: colors.darkColor,
    },
  },
  // Privacy header texts
  ///////////////////////////////////////////////////////////////////////////////
  privacyHeaders: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  // Images
  ///////////////////////////////////////////////////////////////////////////////
  logoImage: {
    paddingTop: 20,
    width: 250,
    height: 120,
  },

  // spacers
  // ///////////////////////////////////////////////////////////////////////////
  spacer16: {
    height: 16,
    width: '100%',
  },
  spacer64: {
    height: 64,
    width: '100%',
  },
  headLineStyle: {alignSelf: 'center', fontSize: 18},
  // Separator with text
  // ///////////////////////////////////////////////////////////////////////////
  separatorWithText: {
    fontWeight: 'bold',
  },
  // Drop Down Pickers
  //////////////////////////////////////////////////////////////////////////////
  pickers: {
    height: 50,
    width: 200,
    alignSelf: 'center',
    // marginTop: 10,
    // marginBottom: 10,
  },
  // Date time pickers
  //////////////////////////////////////////////////////////////////////////////
  dateTimePicker: {
    backgroundColor: colors.surface,
    width: device.width - 20,
    alignSelf: 'center',
  },
  // Dialog alert box
  //////////////////////////////////////////////////////////////////////////////
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
    height: device.height - 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  //Steps wizard
  ///////////////////////////////////////////////////////////////////
  stepsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    width: '100%',
  },
  // Register page container
  ///////////////////////////////////////////////////////////////////
  registerContainer: {
    flex: 1,
    // backgroundColor: colors.background,
    alignItems: 'center',
  },
  // language selector
  //////////////////////////////////////////////////////////////////
  langSelector: {
    paddingTop: 10,
    marginRight: 20,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 15,
  },
  // Login page card wrapper
  ////////////////////////////////////////////////////////////////////
  loginCardWrapper: {
    width: device.width - 32,
    height: 360,
    // backgroundColor: colors.accent,
    // marginBottom: 46,
    paddingBottom: 20,
  },
  // Forgot password page card wrapper
  //////////////////////////////////////////////////////////////////

  forgotCardWrapper: {
    width: device.width - 32,
    height: 200,
    // backgroundColor: colors.accent,
    marginBottom: 46,
    paddingBottom: 20,
  },
  // Chasers suggestions
  //////////////////////////////////////////////////////////////////

  chaseSuggestion: {
    padding: 10,
    height: 200,
    margin: 5,
    width: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  homeChaseSuggestion: {
    padding: 10,
    height: 150,
    margin: 5,
    width: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  // Bordered box
  /////////////////////////////////////////////////////////////////
  borderBox: {
    alignItems: 'center',
    borderWidth: 1,
    width: '50%',
    borderColor: colors.primary,
  },
  // Title / text with border bottom
  //////////////////////////////////////////////////////////////////
  textWithBorderBot: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    marginHorizontal: 10,
  },
  // Post Card Wrapper
  //////////////////////////////////////////////////////////////////
  postCardWrap: {
    height: 'auto',
    // backgroundColor: colors.accent,
    marginBottom: 46,
    paddingBottom: 20,
  },
  // Share , comment, likes badges
  //////////////////////////////////////////////////////////////////
  postBadges: {
    borderWidth: 0.5,
    borderRadius: 3,
    width: 25,
    height: 25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  postBadgeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: 40,
    marginLeft: 10,
  },
};

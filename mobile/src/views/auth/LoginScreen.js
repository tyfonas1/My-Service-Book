import React from 'react';
import {View, Image} from 'react-native';
import {device, images, gStyle} from '../../constants';
import LoginForm from '../../components/forms/LoginForm';
import overlay from '../../components/Overlay';
import {Caption, useTheme} from 'react-native-paper';
// components

const LoginScreen = () => {
  const theme = useTheme();
  const backgroundColor = overlay(2, theme.colors.surface);

  return (
    <View style={gStyle.loginContainer}>
      <Image
        style={[
          gStyle.logoImage,
          {
            marginTop: device.width / 3 - 40,
            marginBottom: 50,
          },
        ]}
        source={images.logo}
      />

      <LoginForm />
    </View>
  );
};

export default LoginScreen;

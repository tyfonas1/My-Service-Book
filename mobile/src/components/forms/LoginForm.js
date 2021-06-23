import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Caption, Card, HelperText, TextInput} from 'react-native-paper';
import {useAppContext} from '../../config/AppProvider';
import {colors, device, func, gStyle, images} from '../../constants';
import useForm from '../../hooks/useForm';

// import {useAppContext} from '../../config/AppProvider';

// components

const LoginForm = () => {
  const {inputs, handleChange} = useForm({
    email: '',
    password: '',
  });
  const {login, loading} = useAppContext();
  return (
    <KeyboardAvoidingView
      style={gStyle.contentContainer}
      behavior={device.iOS == 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card elevation={7} style={gStyle.loginCardWrapper}>
          <Card.Content
            style={{
              flex: 1,
              justifyContent: 'space-around',
              paddingTop: 5,
            }}>
            <TextInput
              mode="outlined"
              label="Email"
              placeholder="Email"
              value={inputs.email}
              onChangeText={e => handleChange('email', e)}
            />
            <TextInput
              mode="outlined"
              label="pass"
              placeholder="pass"
              secureTextEntry={true}
              onChangeText={e => handleChange('password', e)}
              value={inputs.password}
            />
          </Card.Content>

          <Card.Actions style={{justifyContent: 'space-around'}}>
            <Button
              icon="account"
              // loading={ctx.isLoading}
              mode="contained"
              style={{backgroundColor: colors.primary}}
              //   onPress={() => navigation.navigate('RegisterMethod')}
            >
              Εγγραφή
            </Button>
            <Button
              // icon="login"
              // loading={ctx.isLoading}
              mode="text"

              //   onPress={() => navigation.navigate('Forgot')}
            >
              <Caption style={{color: colors.accent}}>Επαναφορά</Caption>
            </Button>
          </Card.Actions>
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Button
              icon="login"
              mode="contained"
              style={{backgroundColor: colors.primary}}
              onPress={() => login(inputs)}>
              Σύνδεση
            </Button>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: '30%',
                  height: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.backdrop,
                }}
              />
              <Caption
                style={{
                  marginHorizontal: '5%',
                  textAlign: 'center',
                  paddingVertical: 10,
                  width: '30%',
                }}>
                Άλλοι τρόποι
              </Caption>
              <View
                style={{
                  width: '30%',
                  height: 1,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.backdrop,
                }}
              />
            </View>
            <View
              style={{
                width: '40%',
                alignSelf: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <TouchableOpacity>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  source={images.facebookicon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    width: 28,
                    height: 29,
                  }}
                  source={images.googleicon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../screens/HomeScreen/constants';
import {ButtonProps} from './ButtonProps';

const Button = ({label, onPress, loading, style, ...rest}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} testID="button">
      <LinearGradient
        {...rest}
        colors={[Colors.LIGHTER_GRAY, Colors.DARK_GRAY]}
        style={[styles.container, style]}>
        {loading ? (
          <ActivityIndicator
            testID="button-loading"
            size={24}
            color={Colors.WHITE}
          />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 19,
    color: Colors.WHITE,
  },
});

export default Button;

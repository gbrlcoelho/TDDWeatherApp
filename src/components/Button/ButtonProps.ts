import {TouchableOpacityProps, ViewProps} from 'react-native';

export type ButtonProps = {
  label: string;
  loading?: boolean;
} & Omit<TouchableOpacityProps, 'hitSlop'> &
  ViewProps;

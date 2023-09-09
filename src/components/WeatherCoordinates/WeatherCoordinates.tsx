import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import * as Yup from 'yup';
import {Colors} from '../../screens/HomeScreen/constants';
import Button from '../Button/Button';

type FormValues = {
  latitude: number;
  longitude: number;
};

const validationSchema = Yup.object().shape({
  latitude: Yup.number().required().min(-90).max(90),
  longitude: Yup.number().required().min(-180).max(180),
});

const WeatherCoordinates = () => {
  const {navigate} = useNavigation();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      latitude: 0,
      longitude: 0,
    },
    mode: 'onChange',
  });

  const handleSubmitCoordinates = handleSubmit((values: FormValues) => {
    navigate('WeatherScreen', {
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
    });
  });

  return (
    <View testID="weather-coordinates">
      <View style={styles.inputs}>
        <Controller
          control={control}
          name="latitude"
          render={({field, ...props}) => (
            <TextInput
              {...props}
              testID="weather-coordinates-latitude"
              onChangeText={field.onChange}
              style={styles.input}
              placeholder="Lat"
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        <View style={styles.errorContainer}>
          {errors.latitude && (
            <Text style={styles.error}>Latitude must be a valid number</Text>
          )}
        </View>
        <Controller
          control={control}
          name="longitude"
          render={({field, ...props}) => (
            <TextInput
              {...props}
              testID="weather-coordinates-longitude"
              onChangeText={field.onChange}
              style={styles.input}
              placeholder="Lon"
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        <View style={styles.errorContainer}>
          {errors.longitude && (
            <Text style={styles.error}>Longitude must be a valid number</Text>
          )}
        </View>
      </View>
      <Button label="Find" onPress={handleSubmitCoordinates} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.WHITE,
  },
  errorContainer: {
    height: 20,
  },

  error: {
    color: Colors.ERROR,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});

export default WeatherCoordinates;

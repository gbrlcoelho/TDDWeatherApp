/* eslint-disable @typescript-eslint/no-shadow */
import {RenderOptions, render} from '@testing-library/react-native';
import React, {ReactElement, ReactNode} from 'react';
import {Provider} from 'react-redux';
import {legacy_createStore as createStore} from 'redux';
import rootReducer from '../store/reducers';

const store = createStore(rootReducer);

type CustomRenderOptions = {
  store?: typeof store;
};

const AllTheProviders =
  (options: CustomRenderOptions) =>
  ({children}: {children: ReactNode}) => {
    const {store} = options;

    return <Provider store={options.store || store!}>{children}</Provider>;
  };

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions & Omit<RenderOptions, 'queries'> = {},
) => {
  const {store, ...renderOptions} = options;

  return render(ui, {
    wrapper: AllTheProviders({store}) as React.ComponentType,
    ...renderOptions,
  });
};

export * from '@testing-library/react-native';

export {customRender as render};
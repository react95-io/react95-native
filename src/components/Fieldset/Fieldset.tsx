import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import type { Theme } from '../../types';
import { withTheme } from '../../core/theming';

import { Border } from '../../styles/styleElements';
import { Text } from '../..';

export const testId = 'fieldset';

type Props = React.ComponentPropsWithRef<typeof View> & {
  children?: React.ReactNode;
  disabled?: boolean;
  label?: React.ReactNode;
  labelStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  theme: Theme;
  variant?: 'default' | 'flat';
};

const Fieldset = ({
  children,
  disabled,
  label,
  labelStyle = {},
  style = {},
  theme,
  variant = 'default',
  ...rest
}: Props) => {
  return (
    <View style={[styles.wrapper, style]} testID={testId} {...rest}>
      {variant === 'flat' ? (
        <Border variant='flat' theme={theme} />
      ) : (
        <>
          <Border
            variant='well'
            invert
            style={[
              { marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 },
            ]}
          />
          <Border variant='well' theme={theme} />
        </>
      )}
      {label && (
        <Text
          theme={theme}
          disabled={disabled}
          style={[
            styles.label,
            {
              backgroundColor:
                variant === 'flat' ? theme.canvas : theme.material,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginVertical: 12,
    padding: 20,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 8,
    // TODO: how to properly center the label?
    transform: [{ translateY: -8 }],
    paddingHorizontal: 8,
    fontSize: 16,
    lineHeight: 16,
  },
});

export default withTheme(Fieldset);

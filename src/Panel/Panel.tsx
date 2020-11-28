import React from 'react';
import { StyleSheet, View } from 'react-native';

import { original as theme } from '../common/themes';
import { Border } from '../common/styleElements';

export const testId = 'panel';

// TODO: common interface with styleElements/Border ?
type Props = {
  children: React.ReactNode;
  variant?: 'default' | 'well' | 'outside';
  style?: Object;
};

const Panel = ({ children, variant = 'default', style = {} }: Props) => {
  return (
    <View style={[styles.container, style]} testID={testId}>
      <Border variant={variant} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: theme.material,
  },
});

export default Panel;

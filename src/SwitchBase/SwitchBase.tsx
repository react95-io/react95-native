import React, { useContext } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Border } from '../common/styleElements';
import { ThemeContext } from '../common/theming/Theme';

import { Text, CheckmarkIcon } from '..';

const checkboxSize = 20;
const radioSize = 20;

export type SwitchStatus = 'checked' | 'unchecked' | 'indeterminate';

export type SwitchProps = {
  disabled?: boolean;
  label?: string;
  onPress?: () => void;
  status: SwitchStatus;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'flat';
};

type Props = SwitchProps &
  React.ComponentPropsWithRef<typeof TouchableHighlight> & {
    component: 'radio' | 'checkbox';
  };

// TODO: see if ref is passed

export const SwitchBase = ({
  component,
  disabled = false,
  label = '',
  variant = 'default',
  onPress = () => {},
  status,
  style = {},
  ...rest
}: Props) => {
  const theme = useContext(ThemeContext);
  const [isPressed, setIsPressed] = React.useState(false);
  const isRadio = component === 'radio';
  const switchSize = component === 'checkbox' ? checkboxSize : radioSize;
  const boxSize = variant === 'flat' ? switchSize - 4 : switchSize;
  const borderRadius = isRadio ? boxSize / 2 : 0;

  const renderCheckmark = () => {
    if (status === 'checked') {
      return component === 'checkbox' ? (
        <CheckmarkIcon disabled={disabled} />
      ) : (
        <View
          style={{
            borderRadius: 6,
            height: 6,
            width: 6,
            backgroundColor: disabled
              ? theme.checkmarkDisabled
              : theme.checkmark,
          }}
        />
      );
    }
    if (status === 'indeterminate') {
      return (
        <ImageBackground
          style={[{ width: '100%', height: '100%' }]}
          imageStyle={{
            resizeMode: 'repeat',
          }}
          source={{
            uri: {
              default:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQoU2NkYGD4z4AKGJG5IA4dFKA5AdVKFAdBVaK4iXIFAEiuCAWq9MdHAAAAAElFTkSuQmCC',
              disabled:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQoU2NsaW35z4AEaqprGJH5jHRQgGwfiI1uJYqDaKMAAHKtGjlbjgHwAAAAAElFTkSuQmCC',
            }[disabled ? 'disabled' : 'default'],
          }}
        />
      );
    }

    return <Text> </Text>;
  };

  const getBackgroundColor = () => {
    if (variant === 'flat') {
      return disabled ? theme.flatLight : theme.canvas;
    }
    return disabled ? theme.material : theme.canvas;
  };

  return (
    <TouchableHighlight
      style={[styles.wrapper]}
      onPress={onPress}
      activeOpacity={1}
      disabled={disabled}
      onHideUnderlay={() => setIsPressed(false)}
      onShowUnderlay={() => setIsPressed(true)}
      // TODO: check if those accessibility properties are correct
      accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
      accessibilityComponentType='button'
      accessibilityRole={component}
      accessibilityState={{ disabled, checked: status === 'checked' }}
      underlayColor='none'
      {...rest}
    >
      <View style={[styles.content, style]} pointerEvents='none'>
        <View
          style={[
            styles.switchSymbol,
            {
              width: boxSize,
              height: boxSize,
              backgroundColor: getBackgroundColor(),
              borderRadius,
              overflow: 'hidden',
            },
          ]}
        >
          {renderCheckmark()}
          <Border
            variant={variant === 'flat' ? 'flat' : 'cutout'}
            radius={borderRadius}
          />
        </View>
        {Boolean(label) && (
          <View
            style={[
              styles.labelWrapper,
              !disabled && isPressed
                ? theme.border.focusOutline
                : { borderWidth: 2, borderColor: 'transparent' },
            ]}
          >
            <Text disabled={disabled} style={[styles.label]}>
              {label}
            </Text>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 'auto',
    alignSelf: 'flex-start',
    padding: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
  },
  switchSymbol: {
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrapper: {
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 16,
  },
});

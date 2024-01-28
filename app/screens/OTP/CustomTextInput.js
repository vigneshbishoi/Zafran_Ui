import React from 'react';
import {StyleSheet, View, ViewPropTypes, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';


const CustomTextInput = function (props) {
  const {
    containerStyle,
    style,
    LeftComponent,
    RightComponent,
    refCallback,
    ...remainingProps
  } = props;

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {LeftComponent}
      <TextInput
        {...remainingProps}
        style={[styles.textInputStyle, styles.fill, style]}
        ref={refCallback}
      />
      {RightComponent}
    </View>
  );
};


CustomTextInput.defaultProps = {
  LeftComponent: <></>,
  RightComponent: <></>,
};

CustomTextInput.propTypes = {
  containerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  LeftComponent: PropTypes.object,
  RightComponent: PropTypes.object,
  refCallback: PropTypes.func,
};

export default CustomTextInput;

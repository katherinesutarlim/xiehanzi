import React, { useRef } from "react";
import { PanResponder, View } from 'react-native';

const GestureRecorder = ({ onPathChanged, onLayout }) => {
  const pathRef = useRef([]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
          pathRef.current = []
      },
      onPanResponderMove: (event) => {
        pathRef.current.push({
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        })
        // Uncomment the next line to draw the path as the user is performing the touch. (A new array must be created so setState recognises the change and re-renders the App)
        onPathChanged([...pathRef.current]);
      },
      onPanResponderRelease: () => { onPathChanged([...pathRef.current]) }
    })
  ).current;

  return (
    <View
      style={{ height: "100%", width: "100%", position: 'absolute' }}
      onLayout={onLayout}
      {...panResponder.panHandlers}
    />
  );
}

export default GestureRecorder;
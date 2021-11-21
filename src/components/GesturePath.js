import React from 'react';
import { Dimensions } from "react-native";
import Svg, { Polyline } from 'react-native-svg';

const GesturePath = ({ path, color, layout = Dimensions.get('window') }) => {
  const { width, height } = layout;
  const points = path.map(path => path.map(p => `${p.x},${p.y}`).join(' '));
  return (
    <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
      {points.map((polypoints, index) => (
        <Polyline
          points={polypoints}
          fill="none"
          stroke={color}
          strokeWidth="8"
          key={`${polypoints}${index}`}
        />
      ))}
    </Svg>    
  );
};

export default GesturePath;
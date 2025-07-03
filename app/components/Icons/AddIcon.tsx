import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

const AddIcon = ({
  width,
  height,
  color = '#fff',
}: {
  width?: number;
  height?: number;
  color?: string;
}) => (
  <Svg
    fill="none"
    width={width || 24}
    height={height || 24}
    viewBox="0 0 36 36">
    <Rect width={35} height={35} x={0.5} y={0.5} fill={color} rx={6.5} />
    <Path
      fill="#220C3A"
      fillRule="evenodd"
      d="M21.529 11.29a3.29 3.29 0 0 0-6.582 0v3.657h-3.656a3.29 3.29 0 1 0 0 6.582h3.656v3.656a3.29 3.29 0 0 0 6.582 0V21.53h3.656a3.29 3.29 0 0 0 0-6.582H21.53v-3.656Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default AddIcon;

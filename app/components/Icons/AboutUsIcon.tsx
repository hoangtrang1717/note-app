import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const AboutUsIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20Zm0-11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-.707 1.793A1 1 0 0 1 13 11v5a1 1 0 0 1-2 0v-5a1 1 0 0 1 .293-.707Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={24.704}
        x2={0.834}
        y1={2}
        y2={22.198}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C724E1" />
        <Stop offset={1} stopColor="#4E22CC" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default AboutUsIcon;

import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const UserAgreementIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M7 3h10a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm10.707 16.707A1 1 0 0 0 18 19V6a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h10a1 1 0 0 0 .707-.293ZM9 8h6a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2Zm6 4H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm-6 4h4a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={22.164}
        x2={0.43}
        y1={3}
        y2={18.486}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C724E1" />
        <Stop offset={1} stopColor="#4E22CC" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default UserAgreementIcon;

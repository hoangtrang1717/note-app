import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const PrivacyPolicyIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M16 2c2.09 0 3.24 0 4.12.88C21 3.76 21 4.91 21 7v10c0 2.09 0 3.24-.88 4.12-.88.88-2.03.88-4.12.88H6.5A3.5 3.5 0 0 1 3 18.5V7c0-2.09 0-3.24.88-4.12C4.76 2 5.91 2 8 2h8Zm2.71 17.71c.29-.3.29-1.26.29-2.71v-.22c-.986.206-1.995.28-3 .22H6.5a1.5 1.5 0 1 0 0 3h9.636c1.375 0 2.293 0 2.574-.29Zm0-5c.29-.3.29-1.26.29-2.71V6.864c0-1.375 0-2.293-.29-2.574C18.41 4 17.45 4 16 4H7.864c-1.375 0-2.293 0-2.574.29C5 4.59 5 5.55 5 7v8.34A3.44 3.44 0 0 1 6.5 15h9.636c1.375 0 2.293 0 2.574-.29ZM9 7h6a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={23.434}
        x2={0.101}
        y1={2}
        y2={19.769}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C724E1" />
        <Stop offset={1} stopColor="#4E22CC" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default PrivacyPolicyIcon;

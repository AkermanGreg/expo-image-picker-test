import { createIcon } from "@gluestack-ui/themed";
import { Path } from "react-native-svg";

const XIcon = createIcon({
  viewBox: '0 0 25 25',
  path: (
    <>
      <Path
        d="M17.5 7.5L7.5 17.5M7.5 7.5L17.5 17.5"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
});

export default XIcon;

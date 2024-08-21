import { createIcon } from "@gluestack-ui/themed";
import { Path } from "react-native-svg";

const SearchIcon = createIcon({
  viewBox: '0 0 24 25',
  path: (
    <>
      <Path
        d="M21 21.5L15.0001 15.5M17 10.5C17 14.366 13.866 17.5 10 17.5C6.13401 17.5 3 14.366 3 10.5C3 6.63401 6.13401 3.5 10 3.5C13.866 3.5 17 6.63401 17 10.5Z"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
});

export default SearchIcon;

// import scss
import "./index.scss";

// import constants
import { constant } from "../../constants";

const Header = () => {
  return <div className="header">{constant.app.userName}</div>;
};

export default Header;

import "../App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div id="Nav">
      <Link to="/">
        <h2>TaskBoard</h2>
      </Link>
    </div>
  );
}

export default Nav;

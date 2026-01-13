import "../App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navbar bg-primary flex-2">
      <Link to="/">
        <h2>TaskBoard</h2>
      </Link>
    </div>
  );
}

export default Nav;

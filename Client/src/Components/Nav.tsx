import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="w-full flex justify-center py-2">
      <Link to="/" className="group relative cursor-pointer">
        <h1 className="md:text-4xl font-black tracking-tighter select-none">
          <span className="text-primary drop-shadow-sm">B</span>
          <span className="text-base-content/20 font-thin mx-1">-</span>
          <span className="text-base-content group-hover:text-base-content/80 transition-colors">
            Productive
          </span>
        </h1>
      </Link>
    </div>
  );
}

export default Nav;

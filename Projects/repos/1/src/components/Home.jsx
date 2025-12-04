import { Link } from "react-router-dom";
import "../home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="heading">
        <h1>Welcome to Wyatt&apos;s Store!</h1>
        <i>Your Daily Adventure in Discovery</i>
      </div>
      <div className="main">
        <div className="left">
          <img src="/welcome.jpeg" alt="" />
          <p>
            This is for placeholder text to explain the stores products, goal, and its origination.
          </p>
        </div>
        <div className="right">
          <Link to={"/shop"}>
            <button>Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
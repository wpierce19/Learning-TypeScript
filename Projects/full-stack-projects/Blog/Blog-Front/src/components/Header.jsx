import {Link} from "react-router-dom";
import MainLogo from "../assets/mainLogo"; //Find Logo to replace this

const Header = () => {


    return (
        <header>
            <nav className="container">
                <ul>
                    <li>
                        <Link to="/" className="mainLogo">
                            <MainLogo /> Idea Forge
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link to="https://blog-member.pages.dev/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
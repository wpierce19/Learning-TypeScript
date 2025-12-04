import {Link, useNavigate} from "react-router-dom";
import MainLogo from "../assets/MainLogo";
import MdiAdd from "../assets/MdiAdd";
import MdiLogout from "../assets/MdiLogout";
import GridiconsPosts from "../assets/GridiconsPosts";
import MdiAccount from "../assets/MdiAccount";

const Header = ({user, setUser, setToken}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser(null);
        setToken(null);
        navigate("/");
    };
    return (
        <header className="pico container">
            <nav>
                <ul>
                    <li>
                        <Link to="/" className="mainLogo">
                            <MainLogo />
                            Idea Forge
                        </Link>
                    </li>
                </ul>
                <ul>
                    {user ? (
                       <>
                        <li>
                            <details className="dropdown">
                                <summary>Hi {user.name.split(" ")[0]}!</summary>
                                <ul>
                                    <li>
                                        <Link to="/profile">
                                            <MdiAccount /> Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/posts/new">
                                            <MdiAdd /> Create New Post
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/posts">
                                            <GridiconsPosts /> Your Posts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            style={{color: "crimson"}}
                                            onClick={handleLogout}
                                        >
                                            <MdiLogout /> Logout
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                       </> 
                    ) : (
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="login">Login</Link>
                            </li>
                            <li>
                                <Link to="/sign-up">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
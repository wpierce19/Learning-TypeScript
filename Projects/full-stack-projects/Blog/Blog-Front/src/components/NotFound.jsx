import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h1>404 Page Not Found</h1>
            <p>The page you're looking for doesn't exist</p>
            <Link to="/" style={{textDecoration: "none", color: "blue"}}>
                Go back to home
            </Link>
        </div>
    );
};

export default NotFound;
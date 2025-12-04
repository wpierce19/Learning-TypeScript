import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h1>Oh no, this route doesnt exist!</h1>
            <Link to="/">
            YOu can go back to the home page by clicking here, though!
            </Link>
        </div>
    );
};

export default ErrorPage;
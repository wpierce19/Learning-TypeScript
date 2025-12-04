import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className="container">
                <h2>Welcome to the Idea Forge!</h2>
                <p>
                    Where you can see posts about hot topics in the tech world!
                </p>
                <Link role="button" to="/posts">View the latest posts &nbsp;&#10140;</Link>
            </section>
        </>
    );
};

export default Home;
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <section className="container-pico">
                <section>
                    <h2>Welcome to your Idea Forge Dashboard!</h2>
                    <p>
                        A dashboard to allow you to easily track posts/comments and to easily write in depth content using our rich text editor.
                    </p>
                </section>
            </section>
            <section>
                <h3>Key Features</h3>
                <ul>
                    <li>
                        Rich easy to use text editor
                    </li>
                    <li>
                        Categorize your posts and schedule content for future publishing
                    </li>
                    <li>
                        Stay up-to date about all the latest topics in the tech field!
                    </li>
                    <li>
                        Enjoy knowing that your data will be kept safe with our secure hosting.
                    </li>
                </ul>
            </section>
            <section>
                <h3>Sign Up Today!</h3>
                <p>
                    Use our custom tailored tools to help express your mind to the whole world!
                </p>
                <Link role="button" to="/sign-up">
                    Become a Member &nbsp;&#10140;
                </Link>
            </section>
        </>
    );
};

export default Home;
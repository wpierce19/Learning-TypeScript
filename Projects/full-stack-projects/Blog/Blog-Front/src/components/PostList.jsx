import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../styles/PostList.css";
import { clipText } from "../utils";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

const PostList = () => {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            const TOKEN = import.meta.env.VITE_BEARER_TOKEN;
            try {
                const response = await fetch("https://blog-api-tjau.onrender.com/posts/published", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error, Status ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError(err.message);
            }
        };
        fetchPosts();
    }, []);

    const RedirectButton = () => (
        <a 
            href="https://blog-member.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <button>Become a Member</button>
        </a>
    );

    if (error) return <section>{error}</section>
    return (
        <>
            <section classname="container">
                <h2>Latest Posts</h2>
                {
                    posts ? (
                        posts.length > 0 ? (
                            <div className="posts">
                                {posts.map((post) => (
                                    <Link to={`/posts/${post.id}`} key={post.id} className="post">
                                        <article>
                                            <header>
                                                <b style={{fontSize: "1.1em"}}>{post.title}</b>
                                            </header>
                                            <Markdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeSanitize]}
                                            >
                                                {clipText(post.content)}
                                            </Markdown>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div>
                                It's empty in here. create a{" "}
                                <Link to="/posts/new">New post</Link>!
                            </div>
                        )
                    ) : (
                        <div aria-busy="true"></div>
                    )
                }
                <div className="redirect-button">
                    <h3>Want to share your creative mind with the world?</h3>
                    <h4>Become a member today!</h4>
                    <RedirectButton />
                </div>
            </section>
        </>
    );
};

export default PostList;
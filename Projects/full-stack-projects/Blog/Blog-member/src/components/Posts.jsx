import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {clipText} from "../utils";
import Markdown from "react-markdown";
import MdiPublish from "../assets/MdiPublish";
import MdiDelete from "../assets/MdiDelete";
import MdiEdit from "../assets/MdiEdit";
import MdiPublishOff from "../assets/MdiPublishOff";
import "../styles/Posts.css";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

const Posts = ({token, user}) => {
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://blog-api-tjau.onrender.com/posts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error. Status ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error("Error fecthing data:", err);
                setError(err.message);
            }
        };

        fetchPosts();
    }, [token]);

    const togglePublished = async (post) => {
        try {
            const response = await fetch(`https://blog-api-tjau.onrender.com/posts/${post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: `{ "publisded: ${!post.published}}`,
            });
            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
            const data = await response.json();
            setPosts((prevPosts) => 
                prevPosts.map((prev) => {
                    return prev.id === post.id ? data:prev;
                })
            );
        } catch (err){
            console.error("Error fetching data:", err);
            setError(err.message);
        }
    };

    const deletePost = async (postId) => {
        try {
            const response = await fetch(`https://blog-api-tjau.onrender.com/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
            const post = await response.json();
            setPosts((prevPosts) => prevPosts.filter((prev) => prev.id != post.id));
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.message);
        }
    };
    if (error) return <section className="pico-container">{error}</section>;
    return (
        <>
            <section className="pico container">
                <h1>Posts</h1>
                {
                    posts ? (
                        posts.length > 0 ? (
                            <div className="posts">
                                {posts.map((post) => (
                                    <div className="post" key={post.id}>
                                        <Link to={`/posts/${post.id}`}>
                                            <article>
                                                <header>
                                                    <div>
                                                        <b>{post.title}</b>
                                                    </div>
                                                    <span
                                                        className="publishedStatus"
                                                        style={{
                                                            backgroundColor: post.published
                                                            ? "green"
                                                            : "#FF9500",
                                                        }}
                                                    >
                                                        &#9679;{" "}
                                                        {post.published ? "Published" : "Unpublished"}
                                                    </span>
                                                </header>
                                                <Markdown
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeSanitize]}
                                                >
                                                    {clipText(post.content)}
                                                </Markdown>
                                            </article>
                                        </Link>
                                        <details className="dropdown postActions">
                                            <summary>Update</summary>
                                            <ul>
                                                {post.author_id === user.id && (
                                                    <>
                                                        <li>
                                                            <Link to={`/posts/${post.id}/edit`}>
                                                                <MdiEdit />
                                                                Edit
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to="#" onClick={() => togglePublished(post)}>
                                                                {post.published ? (
                                                                    <>
                                                                        <MdiPublishOff />
                                                                        Unpublish
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <MdiPublish />
                                                                        Publish
                                                                    </>
                                                                )}
                                                            </Link>
                                                        </li>
                                                    </>
                                                )}

                                                <li>
                                                    <Link
                                                        to="#"
                                                        style={{color: "crimson"}}
                                                        onClick={() => deletePost(post.id)}
                                                    >
                                                        <MdiDelete />
                                                        Delete
                                                    </Link>
                                                </li>
                                            </ul>
                                        </details>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                It's empty in here. Create a{" "}
                                <Link to="/posts/new">new post</Link>!
                            </div>
                        )
                    ) : (
                        <div aria-busy="true"></div>
                    )
                }
            </section>
        </>
    );
};

export default Posts;
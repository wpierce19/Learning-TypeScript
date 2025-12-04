import { useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Markdown from "react-markdown";
import { formatTimestamp } from "../utils";
import "../styles/Post.css";
import Comments from "./Comments";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

const Post = () => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const TOKEN = import.meta.env.VITE_BEARER_TOKEN;
            try {
                const response = await fetch(`https://blog-api-tjau.onrender.com/posts/published/${postId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error. Status ${response.status}`);
                }
                const data = await response.json();
                setPost(data);
            } catch (err) {
                console.error("Error fetching data: ", err);
                setError(err.message)
            }
        };

        fetchPost();
    }, [postId]);

    if (error) return <div>{error}</div>

    return (
        <>
           {post ? (
            <>
            <section className="postContainer container">
                <h1>{post.title}</h1>
                <div className="postMeta">
                    <span>{post.author.name}</span> &#8226;{" "}
                    <span>{formatTimestamp(post.created_at)}</span>
                </div>
                <hr />
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                >
                    {post.content}
                </Markdown>
            </section>
            <hr />
            <section className="commentsSection container">
                <Comments post={post} postId={postId} />
            </section>
            </>
           ) : (
            <div aria-busy="true"></div>
           )} 
        </>
    );
};

export default Post;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import {formatTimestamp} from "../utils";
import "../styles/Post.css";
import Comments from "./Comments";
import NotFound from "./NotFound";

const Post = ({token}) => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] =  useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://blog-api-tjau.onrender.com/posts/${postId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error. Status: ${response.status}`);
                }
                const data = await response.json();
                setPost(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            }
        };

        fetchPost();
    }, [token, postId]);
    if (!parseInt(postId)) return <NotFound />
    if (error) return <div className="pico">{error}</div>;

    return (
        <div className="pico">
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
                    <section className="commentSection container">
                            <Comments post={post} postId={postId} token={token} />
                    </section>
                </>
            ) : (
                <div aria-busy="true"></div>
            )}
        </div>
    );
};

export default Post;
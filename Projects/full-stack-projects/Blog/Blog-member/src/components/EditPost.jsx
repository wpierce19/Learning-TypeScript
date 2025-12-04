import {useParams} from "react-router-dom";
import Editor from "./Editor";
import {useEffect, useState} from "react";

const EditPost = ({token}) => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch (
                    `https://blog-api-tjau.onrender.com/posts/${postId}`,
                    {
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

    if (!parseInt(postId)) return <NotFound />;
    if (error) return <div className="pico">{error}</div>;

    return (
        <>
            {post ? (
                <Editor
                    token={token}
                    editPostId={postId}
                    postTitle={post.title}
                    postContent={post.content}
                />
            ) : (
                <section className="pico">
                    <div aria-busy="true"></div>
                </section>
            )}
        </>
    );
};

export default EditPost;
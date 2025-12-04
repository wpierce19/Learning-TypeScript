import { useState } from "react";

const Comments = ({post, postId}) => {
    const [comments, setComments] = useState(post.comments.toReversed());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newComment, setNewComment] = useState({
        name: "",
        email: "",
        text: "",
    });
    const [error, setError] = useState(null);

    const addComments = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const TOKEN = import.meta.env.VITE_BEARER_TOKEN;
        try {
            const response = await fetch(
                `https://blog-api-tjau.onrender.com/posts/${postId}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    body: JSON.stringify(newComment),
                }
            );

            if (!response.ok){
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
            
            const data = await response.json();
            setComments((prev) => [data, ...prev]);
            setNewComment({name: "", email: "", text: ""});
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    if (error) return <div>{error}</div>;

    return (
        <>
            <h3>Comments</h3>
            <div className="commentsMeta">{comments.length} comments</div>
            <hr />
            <details>
                <summary role="button" className="secondary outline">
                    Add Comment
                </summary>
                <form
                    action={`/posts/${postId}/comments`}
                    method="post"
                    onSubmit={addComments}
                >
                    <input
                        type="text"
                        className="fullname"
                        id="fullname"
                        name="fullname"
                        placeholder="Name"
                        value={newComment.name}
                        onChange={(e) => 
                            setNewComment((prev) => ({...prev, name: e.target.value}))
                        }
                        required
                    />
                    <input
                        type="email"
                        className="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={newComment.email}
                        onChange={(e) => 
                            setNewComment((prev) => ({...prev, email: e.target.value}))
                        }
                        required
                    />
                    <textarea
                        name="commentText"
                        id="commentTextt"
                        placeholder="Write your comment."
                        onChange={(e) => 
                            setNewComment((prev) => ({...prev, text: e.target.value}))
                        }
                        value={newComment.text}
                        required
                    />
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                    >
                        {!isSubmitting && "Submit"}
                    </button>
                </form>
            </details>

            <div className="comments">
                {comments.length > 0 && comments.map((comment) => (
                    <section key={comment.id}>
                        <div className="commentsMeta">
                            <span className="authorName">
                                <b>{comment.author_name}</b>
                            </span>&#10072;
                            <span className="authorEmail">{comment.author_email}</span>
                        </div>
                        <p className="commentText">{comment.text}</p>
                        <hr />
                    </section>
                ))}
            </div>
        </>
    );
};

export default Comments;
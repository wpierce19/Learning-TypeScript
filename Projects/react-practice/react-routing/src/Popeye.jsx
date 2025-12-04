//Now, what if you want to render a section of a page differently, 
//based on different URLs? This is where nested routes come into 
//play! We can add routes nested as the children of one another 
//to ensure that the child gets rendered alongside the parent.

import { Link } from "react-router-dom";

const Popeye = () => {
    return (
        <>
        <p> Hi, I am Popeye! I love to eat Spinach!</p>
        <Link to="/">Click here to go back</Link>
        </>
    );
};

export default Popeye;
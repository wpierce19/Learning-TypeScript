import PropTypes from "prop-types";

/*
const RenderName = (props) => {
    return <div>{props.name}</div>;
};


RenderName.PropTypes = {
    name: PropTypes.string,
};

export default RenderName;
*/

//Default props
const RenderName = (props) => {
  return <div>{props.name}</div>;
};

RenderName.propTypes = {
  name: PropTypes.string,
};

RenderName.defaultProps = {
  name: 'Zach',
};

export default RenderName;

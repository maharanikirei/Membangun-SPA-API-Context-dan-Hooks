import React from "react";
import PropTypes from "prop-types";
import showFormattedDate from "../../utils/date";
import { Link } from "react-router-dom";

const NoteItem = ({ title, createdAt, body, id }) => {
  const renderCircles = () => {
    return null;
  };

  return (
    <Link to={`/note/${id}`} className="w-full">
      <div className="w-full rounded-lg border shadow-md">
        {renderCircles()}
        <div className="p-4">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-sm font-semibold ">
            {showFormattedDate(createdAt)}
          </p>
          <div className="mt-4"></div>
          <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
            {body}
          </p>
        </div>
      </div>
    </Link>
  );
};

NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default NoteItem;

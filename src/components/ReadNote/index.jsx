import React, { useContext } from "react";
import showFormattedDate from "../../utils/date";
import PropTypes from "prop-types";
import LocaleContext from "../../contexts/LocaleContext";

const ReadNote = ({ title, createdAt, body }) => {
  const { locale } = useContext(LocaleContext);

  const renderNotFoundMessage = () => {
    return (
      <div className="text-dark p-4">
        <p>{locale === "id" ? "Data tidak ditemukan" : "No notes found"}</p>
      </div>
    );
  };

  const renderNoteContent = () => {
    return (
      <div className="p-4">
        <h1 className="text-5xl font-bold">{title}</h1>{" "}
        <p className="text-lg font-semibold text-primary">
          {showFormattedDate(createdAt)}
        </p>
        <div className="mt-4">
          <p className="text-lg">{body}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {title && createdAt && body
        ? renderNoteContent()
        : renderNotFoundMessage()}
    </>
  );
};

ReadNote.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
};

export default ReadNote;

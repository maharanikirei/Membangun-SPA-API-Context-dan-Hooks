import React, { useContext } from "react";
import PropTypes from "prop-types";
import NotesItem from "../NoteItem";
import LocaleContext from "../../contexts/LocaleContext";

function NotesList({ notes }) {
  const { locale } = useContext(LocaleContext);

  const renderNotes = () => {
    return notes.map((note) => (
      <div key={note.id} className="overflow-hidden">
        <NotesItem id={note.id} {...note} />
      </div>
    ));
  };

  const renderEmptyMessage = () => {
    return (
      <div className="text-center">
        <h3 className="text-lg">
          {locale === "id" ? "Catatan Tidak Ditemukan" : "No notes found"}
        </h3>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-lg font-semibold py-2">
        {locale === "id" ? "Daftar Catatan" : "Notes List"}
      </h2>
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 w-full">{renderNotes()}</div>
      ) : (
        renderEmptyMessage()
      )}
    </>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NotesList;

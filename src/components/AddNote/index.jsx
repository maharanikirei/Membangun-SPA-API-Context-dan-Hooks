import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import ActionButton from "../ActionButton";
import { addNote } from "../../utils/network-data";
import LocaleContext from "../../contexts/LocaleContext";

const AddNote = ({ onNoteAdded }) => {
  const [note, setNote] = useState({ title: "", body: "" });
  const { locale } = useContext(LocaleContext);

  const Changehandle = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const AddNotehandle = async (event) => {
    event.preventDefault();

    const { title, body } = note;

    if (title && body) {
      try {
        const { data } = await addNote({ title, body });
        const newNote = {
          id: data.id,
          title,
          body,
          createdAt: data.createdAt,
          archived: false,
        };

        onNoteAdded(newNote);
        setNote({ title: "", body: "" });
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const renderPlaceholder = (id, en) => (locale === "id" ? id : en);

  const renderInput = () => (
    <input
      type="text"
      name="title"
      value={note.title}
      onChange={Changehandle}
      className="bg-beige-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
      placeholder={renderPlaceholder("catatan rahasia...", "secret note...")}
      style={{
        fontSize: "18px",
        padding: "12px 20px",
        width: "100%",
      }}
    />
  );

  const renderTextarea = () => (
    <textarea
      name="body"
      value={note.body}
      onChange={Changehandle}
      className="bg-beige-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
      placeholder={renderPlaceholder("ini rahasia...", "This is a secret...")}
      rows="12"
      style={{
        fontSize: "16px",
        padding: "5px 5px",
        width: "100%",
        resize: "vertical",
      }}
    ></textarea>
  );

  return (
    <>
      <div className="rounded-lg border shadow-md p-6">
        <form className="flex flex-col" onSubmit={AddNotehandle}>
          {renderInput()}
          {renderTextarea()}

          <ActionButton type="submit" style={"save"}>
            {renderPlaceholder("Simpan", "Save")}
          </ActionButton>
        </form>
      </div>
    </>
  );
};

AddNote.propTypes = {
  onNoteAdded: PropTypes.func,
};

export default AddNote;

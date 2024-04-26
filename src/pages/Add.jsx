import React, { useContext } from "react";
import AddNote from "../components/AddNote";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

const Add = () => {
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  const handleNoteAdded = () => navigate("/");

  const pageTitle = locale === "id" ? "Catatan Baru" : "New Note";

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-4">{pageTitle}</h1>
      <AddNote onNoteAdded={handleNoteAdded} />
    </div>
  );
};

export default Add;

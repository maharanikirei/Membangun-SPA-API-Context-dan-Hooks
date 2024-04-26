import React, { useEffect, useState, useContext } from "react";
import ReadNote from "../components/ReadNote";
import {
  getNote,
  unarchiveNote,
  archiveNote,
  deleteNote,
} from "../utils/network-data";
import { useParams, useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import LocaleContext from "../contexts/LocaleContext";

const Detail = () => {
  const params = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { error, data } = await getNote(params.id);
        if (!error) {
          setNote(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchNote();
  }, [params]);

  const handleArchiveNote = async () => {
    if (note) {
      await archiveNote(note.id);
      navigate("/");
    }
  };

  const handleUnarchiveNote = async () => {
    if (note) {
      await unarchiveNote(note.id);
      navigate("/archive");
    }
  };

  const handleDeleteNote = async () => {
    if (note) {
      await deleteNote(note.id);
      navigate("/");
    }
  };

  const loadingSpinner = (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );

  if (!note) {
    return loadingSpinner;
  }

  const archiveButtonLabel = locale === "id" ? "Arsipkan" : "Archive";
  const unarchiveButtonLabel = locale === "id" ? "Aktifkan" : "Unarchive";
  const deleteButtonLabel = locale === "id" ? "Hapus" : "Delete";

  return (
    <div className="w-full rounded-lg mt-4 ms-4">
      <ReadNote
        title={note.title}
        createdAt={note.createdAt}
        body={note.body}
      />
      <div className="flex items-center gap-2 p-2">
        {note.archived ? (
          <ActionButton style="unarchive" onClick={handleUnarchiveNote}>
            {unarchiveButtonLabel}
          </ActionButton>
        ) : (
          <ActionButton style="archive" onClick={handleArchiveNote}>
            {archiveButtonLabel}
          </ActionButton>
        )}
        <ActionButton style="delete" onClick={handleDeleteNote}>
          {deleteButtonLabel}
        </ActionButton>
      </div>
    </div>
  );
};

export default Detail;

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getArchivedNotes,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import NotesList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import PropTypes from "prop-types";

function ArchiveComponent() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [notes, setNotes] = useState([]);
  const [defaultKeyword, setDefaultKeyword] = useState(keyword);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getArchivedNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleKeywordChange = (newKeyword) => {
    setDefaultKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  const handleArchiveNote = async (id) => {
    await archiveNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleUnarchiveNote = async (id) => {
    await unarchiveNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) => {
    return (
      note.archived === true &&
      note.title.toLowerCase().includes(defaultKeyword.toLowerCase())
    );
  });

  return (
    <section className="p-4 w-full">
      <SearchBar
        keyword={defaultKeyword}
        onKeywordChange={handleKeywordChange}
      />
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-16 w-18 border-t-5 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <NotesList
          notes={filteredNotes}
          onArchive={handleArchiveNote}
          onUnarchive={handleUnarchiveNote}
        />
      )}
    </section>
  );
}

ArchiveComponent.propTypes = {
  defaultKeyword: PropTypes.string,
  onKeywordChange: PropTypes.func,
};

export default ArchiveComponent;

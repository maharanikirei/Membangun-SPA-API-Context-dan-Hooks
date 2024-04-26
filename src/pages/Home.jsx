import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getActiveNotes,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../utils/network-data";
import NotesList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import PropTypes from "prop-types";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [notes, setNotes] = useState([]);
  const [defaultKeyword, setDefaultKeyword] = useState(keyword);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getActiveNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleKeywordChange = (newKeyword) => {
    setDefaultKeyword(newKeyword);
    setSearchParams({ keyword: newKeyword });
  };

  const handleAction = async (id, action) => {
    try {
      switch (action) {
        case "archive":
          await archiveNote(id);
          break;
        case "unarchive":
          await unarchiveNote(id);
          break;
        case "delete":
          await deleteNote(id);
          break;
        default:
          return;
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredNotes = notes.filter((note) => {
    return (
      !note.archived &&
      note.title.toLowerCase().includes(defaultKeyword.toLowerCase())
    );
  });

  return (
    <section className="p-4 w-full">
      <SearchBar
        keyword={defaultKeyword}
        onKeywordChange={handleKeywordChange}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <NotesList notes={filteredNotes} onAction={handleAction} />
      )}
    </section>
  );
}

Home.propTypes = {
  defaultKeyword: PropTypes.string,
  onKeywordChange: PropTypes.func,
};

export default Home;

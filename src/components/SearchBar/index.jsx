import React, { useContext } from "react";
import PropTypes from "prop-types";
import LocaleContext from "../../contexts/LocaleContext";

function SearchBar({ keyword, onKeywordChange }) {
  const { locale } = useContext(LocaleContext);

  const placeholder =
    locale === "id" ? "cari catatan kamu.." : "Search your notes...";

  return (
    <input
      className="form-control w-full"
      type="search"
      placeholder={placeholder}
      value={keyword}
      onChange={(event) => onKeywordChange(event.target.value)}
    />
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

export default SearchBar;

import React from "react";

interface SearchBarProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchKeyword, setSearchKeyword }) => {
    return (
        <>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="form-control mb-3"
                />
        </>
    );
}

export default SearchBar;
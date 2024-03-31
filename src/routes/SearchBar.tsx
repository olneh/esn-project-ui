import React, {MouseEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";


interface SearchBarProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchKeyword, setSearchKeyword }) => {
    return (
        <>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="form-control mb-3"
                />
        </>
    );
}

export default SearchBar;
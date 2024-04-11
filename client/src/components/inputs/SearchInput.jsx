/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";

const SearchInput = ({ searchvalue, setSearch }) => {
  return (
    <div>
      <div className="search border border-2 border-color borderRadius7px">
        <input
          placeholder="Search..."
          type="search"
          //value={searchvalue}
          defaultValue=""
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 p-2"
        />
        {/* <Button
          //variant="outline-secondary"
          className="border-0 py-2 px-3 bg-white text-dark"
          id="button-addon2"
        >
          <BiSearch size={20} color="dark" />
        </Button> */}
      </div>
    </div>
  );
};

export default SearchInput;

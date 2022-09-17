import { imgProfileSearch } from "assets";

import SingleSearchResult from "../SingleSearchResult/SingleSearchResult";

const SearchResults = () => {
  return (
    // <div className="flex flex-col w-full my-10">
    //   <img
    //     src={imgProfileSearch}
    //     alt="profile-search"
    //     width={150}
    //     height={150}
    //     className="self-center"
    //   />
    //   <p className="self-center font-semibold mt-4">No search term</p>
    //   <p className="self-center mt-2">Input your keywords to start searching</p>
    // </div>
    <div className="mt-4 mb-10">
      <p className="font-semibold">2 Search Results: </p>
      <SingleSearchResult i={0} />
      <SingleSearchResult i={1} />
    </div>
  );
};

export default SearchResults;

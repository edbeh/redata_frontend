import { imgProfileSearch } from "assets";

const SearchResults = () => {
  return (
    <div className="flex flex-col w-full my-10">
      <img
        src={imgProfileSearch}
        alt="profile-search"
        width={150}
        height={150}
        className="self-center"
      />
      <p className="self-center font-semibold mt-4">No search term</p>
      <p className="self-center mt-2">Input your keywords to start searching</p>
    </div>
  );
};

export default SearchResults;

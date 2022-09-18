import { imgProfileSearch } from "assets";
import { getSearchParams } from "utils";

import SingleResultMedical from "./SingleResultMedical/SingleResultMedical";
import SingleResultName from "./SingleResultName/SingleResultName";
import SingleResultPublication from "./SingleResultPublication/SingleResultPublication";

const SearchResults = () => {
  const searchParams = getSearchParams() as any;

  // if (!searchParams?.q) {
  //   return (
  //     <div className="flex flex-col w-full my-10">
  //       <img
  //         src={imgProfileSearch}
  //         alt="profile-search"
  //         width={150}
  //         height={150}
  //         className="self-center"
  //       />
  //       <p className="self-center font-semibold mt-4">No search term</p>
  //       <p className="self-center mt-2">
  //         Input your keywords to start searching
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="mt-8 mb-10">
      <p className="font-semibold">1 Search Result: </p>
      <SingleResultName />
      <SingleResultMedical />
      <SingleResultPublication />
    </div>
  );
};

export default SearchResults;

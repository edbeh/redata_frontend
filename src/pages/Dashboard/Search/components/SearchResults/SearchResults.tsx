import { imgNotFound, imgProfileSearch, ImgCircleLoadingOutline } from "assets";
import { getSearchParams } from "utils";
import {
  useFetchSearchMedicalKeywords,
  useFetchSearchPublications,
  useFetchSearchUsers,
} from "api/hooks";

import SingleResultMedical from "./SingleResultMedical/SingleResultMedical";
import SingleResultName from "./SingleResultName/SingleResultName";
import SingleResultPublication from "./SingleResultPublication/SingleResultPublication";

const SearchResults = () => {
  const searchParams = getSearchParams() as any;
  const q = searchParams?.q;
  const searchIn = searchParams?.searchIn;

  // *Queries
  const fetchSearchUsers = useFetchSearchUsers(
    q,
    !!q && searchIn === "researcherName"
  );

  const fetchSearchMedicalKeywords = useFetchSearchMedicalKeywords(
    q,
    !!q && searchIn === "medicalKeywords"
  );

  const fetchSearchPublications = useFetchSearchPublications(
    q,
    !!q && searchIn === "publications"
  );

  // *JSX
  // handle loading
  if (
    fetchSearchUsers?.isLoading ||
    fetchSearchMedicalKeywords?.isLoading ||
    fetchSearchPublications?.isLoading
  ) {
    return (
      <div className="flex flex-col w-full my-10">
        <ImgCircleLoadingOutline
          width={40}
          height={40}
          className="animate-spin text-primary-500 self-center"
        />
      </div>
    );
  }

  // handle no search term
  if (!searchParams?.q) {
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
        <p className="self-center mt-2">
          Input your keywords to start searching
        </p>
      </div>
    );
  }

  // handle no results
  if (
    (searchIn === "researcherName" &&
      fetchSearchUsers?.data?.data?.data?.length === 0) ||
    (searchIn === "medicalKeywords" &&
      fetchSearchMedicalKeywords?.data?.data?.data?.length === 0) ||
    (searchIn === "publications" &&
      fetchSearchPublications?.data?.data?.data?.length === 0)
  ) {
    return (
      <div className="flex flex-col w-full my-10">
        <img
          src={imgNotFound}
          alt="not-found"
          width={150}
          height={150}
          className="self-center"
        />
        <p className="self-center font-semibold mt-4">No results</p>
        <p className="self-center mt-2">
          Please try again with different keywords
        </p>
      </div>
    );
  }

  // handle display results
  return (
    <div className="mt-8 mb-10">
      {searchIn === "researcherName" && fetchSearchUsers?.data?.data?.data && (
        <>
          <p className="font-semibold">
            {fetchSearchUsers.data.data.data.length} Search Result
            {fetchSearchUsers.data.data.data.length > 1 ? "s" : ""}:
          </p>
          <SingleResultName data={fetchSearchUsers?.data?.data?.data} />
        </>
      )}

      {searchIn === "medicalKeywords" &&
        fetchSearchMedicalKeywords?.data?.data?.data && (
          <>
            <p className="font-semibold">
              {fetchSearchMedicalKeywords.data.data.data.length} Search Result
              {fetchSearchMedicalKeywords.data.data.data.length > 1 ? "s" : ""}:
            </p>
            <SingleResultMedical
              q={q}
              data={fetchSearchMedicalKeywords?.data?.data?.data}
            />
          </>
        )}

      {searchIn === "publications" &&
        fetchSearchPublications?.data?.data?.data && (
          <>
            <p className="font-semibold">
              {fetchSearchPublications.data.data.data.length} Search Result
              {fetchSearchPublications.data.data.data.length > 1 ? "s" : ""}:
            </p>
            <SingleResultPublication
              q={q}
              data={fetchSearchPublications?.data?.data?.data}
            />
          </>
        )}
    </div>
  );
};

export default SearchResults;

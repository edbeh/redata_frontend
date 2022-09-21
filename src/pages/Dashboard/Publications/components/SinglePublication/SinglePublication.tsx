import dayjs from "dayjs";

import { Highlighted } from "components";
import { ImgOpenNewTabOutline } from "assets";
import { getSearchParams } from "utils";
import { Publication } from "api/models";

interface SinglePublicationProps {
  publication: Publication;
  namesToBold: string[];
  isEditable?: boolean;
  isSelected?: boolean;
  handleSelectPublication?: (id: string) => void;

  i: number;
}

const SinglePublication = ({
  publication,
  namesToBold,
  isEditable = false,
  isSelected = false,
  handleSelectPublication,
  i,
}: SinglePublicationProps) => {
  const searchParams = getSearchParams() as any;

  // *Methods
  const nameComponent = (authorName: string, i: number): React.ReactNode => {
    const shouldBoldName = namesToBold.find((nameToBold) =>
      authorName.toLowerCase().includes(nameToBold.toLowerCase())
    );

    if (shouldBoldName) {
      return (
        <b key={authorName + i}>
          {`${authorName}${i < publication.authors.length - 1 ? ", " : ""}`}
        </b>
      );
    } else {
      return (
        <span key={authorName + i}>
          {`${authorName}${i < publication.authors.length - 1 ? ", " : ""}`}
        </span>
      );
    }
  };

  // *JSX
  return (
    <div
      className={`flex mb-6 ${isEditable ? "cursor-pointer" : ""}`}
      onClick={() =>
        isEditable &&
        handleSelectPublication &&
        handleSelectPublication(publication.externalId)
      }
    >
      <div
        className={`flex flex-col items-center cursor-pointer ${
          isEditable ? "min-w-[20px] mt-[5px] mr-2 sm:mr-4" : "min-w-[35px]"
        }`}
      >
        {isEditable && (
          <input
            type="checkbox"
            checked={isSelected}
            className="scale-125"
            readOnly
          />
        )}
        <p className={` ${isEditable ? "text-center mt-2" : ""}`}>{i + 1}.</p>
      </div>
      <div className="space-y-1">
        {publication.elocationId?.includes("doi") ? (
          <a
            className="text-[15px] font-medium text-blue-500 hover:underline"
            href={publication.elocationId.replace("doi: ", "https://doi.org/")}
            target="_blank"
            rel="noreferrer"
          >
            {/* remove html tags */}
            <Highlighted
              text={publication.title?.replace(/(<([^>]+)>)/gi, "")}
              highlight={searchParams?.highlight || ""}
            />{" "}
            <ImgOpenNewTabOutline className="text-blue-500 inline w-4 h-4 mb-1" />
          </a>
        ) : (
          <p className="text-[15px]">
            <Highlighted
              text={publication.title?.replace(/(<([^>]+)>)/gi, "")}
              highlight={searchParams?.highlight || ""}
            />
          </p>
        )}

        <p>
          {publication.authors?.map((author, i) => {
            return nameComponent(author, i);
          })}
        </p>
        <p className="text-green-700">
          {`${publication.source}. ${publication.volume}(${
            publication.issue
          }):${publication.pages}. Published ${dayjs(
            publication.publishedAt
          ).format("YYYY MMM")}`}
        </p>
      </div>
    </div>
  );
};

export default SinglePublication;

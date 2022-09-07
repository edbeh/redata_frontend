import dayjs from "dayjs";

import { Publication } from "../../Publications.model";

interface SinglePublicationProps {
  publication: Publication;
  namesToBold: string[];
  i: number;
}

const SinglePublication = ({
  publication,
  i,
  namesToBold,
}: SinglePublicationProps) => {
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

  return (
    <div className="flex mb-6">
      <p className="min-w-[26px]">{i + 1}.</p>
      <div className="space-y-1">
        {publication.elocationid?.includes("doi") ? (
          <a
            className="text-[15px] font-medium text-blue-500 hover:underline"
            href={publication.elocationid.replace("doi: ", "https://doi.org/")}
            target="_blank"
            rel="noreferrer"
          >
            {publication.title}
          </a>
        ) : (
          <p className="text-[15px]">{publication.title}</p>
        )}

        <p>
          {publication.authors?.map((author, i) => {
            return nameComponent(author.name, i);
          })}
        </p>
        <p className="text-green-700">
          {`${publication.source}. ${publication.volume}(${
            publication.issue
          }):${publication.pages}. Published ${dayjs(
            publication.sortpubdate
          ).format("YYYY MMM")}`}
        </p>
      </div>
    </div>
  );
};

export default SinglePublication;

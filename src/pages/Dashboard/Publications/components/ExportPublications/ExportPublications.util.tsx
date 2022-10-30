import dayjs from "dayjs";
import { Publication } from "api/models";

export const getExportPublicationFormats = () => {
  return [
    {
      key: "ama",
      label: "AMA",
    },
    {
      key: "apa",
      label: "APA",
    },
    {
      key: "mla",
      label: "MLA",
    },
    {
      key: "nlm",
      label: "NLM",
    },
  ];
};

export const renderExportPreview = (
  publication: Publication,
  format: string
) => {
  if (format === "ama") {
    return (
      <div className="w-full border-[1px] border-borderGray p-2 break-all">
        <p>{publication?.authors?.join(", ")}</p>
        <p>
          {`${publication?.title} ${publication?.source} ${dayjs(
            publication?.publishedAt
          ).format("YYYY")} ${publication.source}. ${publication.volume}${
            publication.issue ? "(" + publication.issue + ")" : ""
          }${publication.pages ? ":" + publication.pages + "." : ""}`}
        </p>
        {publication.elocationId && <p>{publication.elocationId}</p>}
      </div>
    );
  }
  return null;
};

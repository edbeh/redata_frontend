import { ImgOpenNewTabOutline } from "assets";
import { Highlighted } from "components";
import { getSearchParams } from "utils";
import { GetStudies } from "api/models";

interface SingleStudyProps {
  study: GetStudies.Datum;
  isEditable?: boolean;
  isSelected?: boolean;
  handleSelectStudy?: (id: string) => void;
  i: number;
}

const SingleStudy = ({
  study,
  isEditable,
  isSelected,
  handleSelectStudy,
  i,
}: SingleStudyProps) => {
  const searchParams = getSearchParams() as any;

  // *JSX
  return (
    <div
      className={`flex mb-10 ${isEditable ? "cursor-pointer" : ""}`}
      onClick={() =>
        isEditable && handleSelectStudy && handleSelectStudy(study.id)
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
      <div className="space-y-2">
        {study.nctId ? (
          <a
            className="text-[15px] font-medium text-blue-500 hover:underline"
            href={`https://clinicaltrials.gov/ct2/show/${study.nctId}`}
            target="_blank"
            rel="noreferrer"
          >
            {/* remove html tags */}
            <Highlighted
              text={study.title?.replace(/(<([^>]+)>)/gi, "")}
              highlight={searchParams?.highlight || ""}
            />
            <ImgOpenNewTabOutline className="text-blue-500 inline w-4 h-4 mb-1" />
          </a>
        ) : (
          <p className="text-[15px]">
            <Highlighted
              text={study.title?.replace(/(<([^>]+)>)/gi, "")}
              highlight={searchParams?.highlight || ""}
            />
          </p>
        )}

        <div className="flex flex-col space-y-1">
          {study.protocolId && (
            <div className="flex flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Study ID:</p>
              <p>{study.protocolId}</p>
            </div>
          )}

          {study.studyType && (
            <div className="flex flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Study Type:</p>
              <p>{study.studyType}</p>
            </div>
          )}

          {study.initiatedBy && (
            <div className="flex flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Initiated By:</p>
              <p>{study.initiatedBy}</p>
            </div>
          )}

          {study.sponsorName && (
            <div className="flex flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Sponsor:</p>
              <p>{study.sponsorName}</p>
            </div>
          )}

          {study.pmid && (
            <div className="flex flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Publication:</p>
              <a
                className="text-blue-500 hover:underline"
                href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}`}
                target="_blank"
                rel="noreferrer"
              >
                {`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}`}
                <ImgOpenNewTabOutline className="text-blue-500 inline w-4 h-4 mb-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleStudy;

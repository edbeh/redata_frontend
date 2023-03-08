import { GetStudiesByKeywords } from "api/models";

interface StudyCardProps {
  index: number;
  study: GetStudiesByKeywords.StudyField;
  handleSelectStudy: (id: string) => void;
  isSelected: boolean;
  isDisabled: boolean;
}

const StudyCard = ({
  index,
  study,
  handleSelectStudy,
  isSelected,
  isDisabled,
}: StudyCardProps) => {
  const {
    LeadSponsorName,
    NCTId,
    OfficialTitle,
    OrgStudyId,
    OverallStatus,
    ReferencePMID,
    ReferenceCitation,
    ResponsiblePartyType,
    StudyType,
    LocationCountry,
    LocationFacility,
  } = study;

  const getStudyStatusColor = (status: GetStudiesByKeywords.OverallStatus) => {
    switch (status) {
      case "Recruiting":
        return "bg-green-500";
      case "Active, not recruiting":
        return "bg-yellow-500";
      case "Completed":
        return "bg-primary-300";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={`flex shadow-md p-4 border-[1px] rounded-lg
      ${isSelected ? "border-primary-600 bg-primary-100" : "border-disabled"}
      ${
        isDisabled
          ? "cursor-not-allowed opacity-50 border-primary-200 bg-primary-100"
          : "cursor-pointer"
      }`}
      onClick={() => {
        if (isDisabled) return;
        if (NCTId?.length > 0) handleSelectStudy(NCTId[0]);
      }}
    >
      <p className="mr-1">{index + 1}.</p>

      <div className="flex flex-col space-y-3">
        {OfficialTitle?.length > 0 && (
          <p className="text-[14px]">{OfficialTitle[0]}</p>
        )}

        <div className="flex flex-col space-y-1">
          {OrgStudyId?.length > 0 && (
            <div className="flex flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Protocol ID:</p>
              <p>{OrgStudyId[0]}</p>
            </div>
          )}

          {StudyType?.length > 0 && (
            <div className="flex flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Study Type:</p>
              <p>{StudyType[0]}</p>
            </div>
          )}

          {ResponsiblePartyType?.length > 0 && (
            <div className="flex flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Initiated By:</p>
              <p>{ResponsiblePartyType[0]}</p>
            </div>
          )}

          {LeadSponsorName?.length > 0 && (
            <div className="flex flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Sponsor Name:</p>
              <p>{LeadSponsorName[0]}</p>
            </div>
          )}

          {LocationCountry?.length > 0 &&
            LocationFacility?.length > 0 &&
            LocationCountry.length === LocationFacility.length && (
              <div className="flex flex-col sm:flex-row w-full text-[13px]">
                <p className="font-semibold sm:min-w-[160px]">Study Sites:</p>
                <div className="flex flex-col space-y-1">
                  {LocationCountry.map((country, i) => {
                    if (country === "Singapore") {
                      return <p key={i}>{LocationFacility[i]}</p>;
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            )}

          {OverallStatus?.length > 0 && (
            <div className="flex items-start sm:items-center flex-col sm:flex-row w-full text-[13px]">
              <p className="font-semibold sm:min-w-[160px]">Status:</p>
              <p
                className={`w-fit py-1 px-2 text-white rounded ${getStudyStatusColor(
                  OverallStatus[0]
                )}`}
              >
                {OverallStatus[0]}
              </p>
            </div>
          )}

          {ReferenceCitation?.length > 0 && (
            <div className="!mt-4 flex flex-col w-full text-[13px]">
              <p className="font-semibold">Publication:</p>
              <p>
                {ReferenceCitation[0]}{" "}
                {ReferencePMID ? `PMID: ${ReferencePMID[0]}` : ""}
              </p>
              <p className="mt-2 text-xs">
                <u>Disclaimer</u>: The publication above was automatically
                linked by ClinicalTrials.gov, it may or may not be about the
                study.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyCard;

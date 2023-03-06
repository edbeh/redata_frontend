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
    ResponsiblePartyType,
    StudyType,
  } = study;
  console.log("study", study);

  return <div />;
};

export default StudyCard;

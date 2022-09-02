import { GetPubmedByIds } from "api/models";

interface PublicationCardProps {
  index: number;
  namesToBold: string[];
  publication: GetPubmedByIds.Publication;
  handleSelectPublication: () => void;
  isSelected: boolean;
}

const PublicationCard = ({
  index,
  namesToBold,
  publication,
  handleSelectPublication,
  isSelected,
}: PublicationCardProps) => {
  return (
    <div
      className={`flex shadow-[3xl] p-4 border-[1px] rounded-lg cursor-pointer
      ${isSelected ? "border-primary-600 bg-primary-100" : "border-disabled"}`}
      onClick={handleSelectPublication}
    >
      <p className="mr-1">{index + 1}.</p>

      <div className="space-y-1">
        <p className="text-base">{publication.title}</p>
        <p className="text-[13px]">
          {publication.authors?.map((author, i) => {
            if (namesToBold.includes(author.name)) {
              return (
                <b>{`${author.name}${
                  i < publication.authors.length - 1 ? ", " : ""
                }`}</b>
              );
            }
            return (
              <span>{`${author.name}${
                i < publication.authors.length - 1 ? ", " : ""
              }`}</span>
            );
          })}
        </p>

        <p className="text-sm text-slate-600">{`${publication.source}. ${publication.pubdate}`}</p>
      </div>
    </div>
  );
};

export default PublicationCard;

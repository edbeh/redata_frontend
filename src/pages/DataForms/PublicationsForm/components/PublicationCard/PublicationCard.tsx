import { GetPubMedByIds } from "api/models";

interface PublicationCardProps {
  index: number;
  namesToBold: string[];
  publication: GetPubMedByIds.Publication;
  handleSelectPublication: (id: string) => void;
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
      className={`flex shadow-md p-4 border-[1px] rounded-lg cursor-pointer
      ${isSelected ? "border-primary-600 bg-primary-100" : "border-disabled"}`}
      onClick={() => handleSelectPublication(publication.uid)}
    >
      <p className="mr-1">{index + 1}.</p>

      <div className="flex flex-col space-y-1">
        <p className="text-[14px]">{publication.title}</p>
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

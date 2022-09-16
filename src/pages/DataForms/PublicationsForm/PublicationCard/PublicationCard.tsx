import React from "react";

import { GetPubMedByIds } from "api/models";

interface PublicationCardProps {
  index: number;
  namesToBold: string[];
  publication: GetPubMedByIds.Publication;
  handleSelectPublication: (id: string) => void;
  isSelected: boolean;
  isDisabled: boolean;
}

const PublicationCard = ({
  index,
  namesToBold,
  publication,
  handleSelectPublication,
  isSelected,
  isDisabled,
}: PublicationCardProps) => {
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
        handleSelectPublication(publication.uid);
      }}
    >
      <p className="mr-1">{index + 1}.</p>

      <div className="flex flex-col space-y-1">
        <p className="text-[14px]">{publication.title}</p>
        <p className="text-[13px]">
          {publication.authors?.map((author, i) => {
            return nameComponent(author.name, i);
          })}
        </p>

        <p className="text-sm text-slate-600">{`${publication.source}. ${publication.pubdate}`}</p>
      </div>
    </div>
  );
};

export default PublicationCard;

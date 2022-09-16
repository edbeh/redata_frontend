import { NavigateFunction } from "react-router-dom";

import { FormSelectModel } from "models";
import { objectIsEmpty } from "utils";

import { ISearchFormFields } from "./SearchForm.model";

export const SearchInOptions: FormSelectModel[] = [
  {
    id: "subSpecialties",
    name: "Sub-specialties",
    type: "metadata",
  },
  {
    id: "researchInterests",
    name: "Research Interests",
    type: "metadata",
  },
  {
    id: "patientPopulations",
    name: "Patient Populations",
    type: "metadata",
  },
  {
    id: "publications",
    name: "Publications",
    type: "metadata",
  },
];

const groupQueryString = (values: FormSelectModel[]) => {
  if (!values || objectIsEmpty(values)) return;

  const group = [];
  for (const [_key, value] of Object.entries(values)) {
    if (value) group.push(value.id);
  }
  return group.join("%2C");
};

export const updateUrlQueryString = (
  data: ISearchFormFields,
  navigate: NavigateFunction
) => {
  const searchInQuery = groupQueryString(data.searchIn);

  console.log("searchInQuery", searchInQuery);
  const query = [];

  if (data?.keyword) query.push(`keyword=${data.keyword}`);
  if (searchInQuery) query.push(`searchIn=${searchInQuery}`);

  navigate({
    pathname: "/search",
    search: query.join("&"),
  });
};

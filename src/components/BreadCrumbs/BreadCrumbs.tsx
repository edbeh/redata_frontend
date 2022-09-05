import { Link } from "react-router-dom";

import { IBreadCrumbs } from "./BreadCrumbs.model";

const BreadCrumbs = ({ breadcrumbs }: IBreadCrumbs) => {
  return (
    <div className="mb-2 divide-x">
      {breadcrumbs.map((crumb, i) => {
        return (
          <Link
            key={crumb.key}
            to={crumb.url}
            className={`px-2 cursor-pointer text-white ${
              i === 0 ? "pl-0" : ""
            }`}
          >
            {crumb.label}
          </Link>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;

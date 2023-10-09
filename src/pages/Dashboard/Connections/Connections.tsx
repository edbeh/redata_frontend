import { BaseLayout } from "wrapper-components";
import { BreadCrumbs, Card, Tooltip } from "components";
import { imgNoUserFound } from "assets";
import { useFetchConnections } from "api/hooks";

import { connectionsNav } from "./Connections.util";
import SingleConnection from "./SingleConnection/SingleConnection";
import SingleConnectionLoading from "./SingleConnection/SingleConnection.loading";

const Connections = () => {
  // *Queries
  const fetchConnections = useFetchConnections();

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={connectionsNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Colleagues
          </h1>
          <Tooltip content="Colleagues from your department will appear in this page when they set up their profile." />
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          {fetchConnections?.isLoading && <SingleConnectionLoading />}

          {fetchConnections?.data?.data?.data?.length === 0 && (
            <Card>
              <div className="flex flex-col w-full my-10 self-center max-w-[500px]">
                <img
                  className="self-center"
                  src={imgNoUserFound}
                  alt="no-user-found"
                  width={180}
                  height={180}
                />
                <p className="text-center font-semibold mt-4">
                  No connections found
                </p>
                <p className="text-center mt-2">
                  New connections will be automatically added in this page when
                  colleagues in your department sign up for an account
                </p>
              </div>
            </Card>
          )}

          {fetchConnections?.data?.data?.data &&
            fetchConnections.data.data.data.length > 0 &&
            fetchConnections.data?.data.data
              .filter((conn) => conn.role === "user")
              .map((conn) => (
                <SingleConnection key={conn.id} connection={conn} />
              ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Connections;

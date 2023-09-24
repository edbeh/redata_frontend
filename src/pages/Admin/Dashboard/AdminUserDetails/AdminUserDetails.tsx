import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  ImgCircleLoadingOutline,
  ImgOpenNewTabOutline,
  imgClipboardDocument,
  imgNoProfilePic,
} from "assets";
import { AdminBaseLayout } from "wrapper-components";
import { Button, AdminCard, AdminRow, Badge, Tooltip } from "components";
import {
  useFetchPendingUsersByAdmin,
  useFetchUserByAdminById,
  useFetchUserPublicationsById,
} from "api/hooks";
import { copyToClipboard, getAdminNameLocalStorage } from "utils";

const AdminUserDetails = () => {
  const { id } = useParams();
  const [token, setToken] = useState<string>("");
  const [shouldShowFirstLoginLink, setShouldShowFirstLoginLink] =
    useState<boolean>(false);

  // *Queries
  const fetchPendingUsersByAdmin = useFetchPendingUsersByAdmin();
  const fetchUserByAdminById = useFetchUserByAdminById(id as string, !!id);
  const fetchUserPublicationsById = useFetchUserPublicationsById(
    id as string,
    !!id
  );

  // *Methods
  const copyLoginLinkToClipboard = async () => {
    copyToClipboard(`${process.env.REACT_APP_APP_URL}login/first/${token}`);
  };

  // *Effects
  useEffect(() => {
    if (fetchUserByAdminById?.data?.data?.data) {
      const assumeAccountLink =
        fetchUserByAdminById.data.data.data.assumeAccountLink;
      const token = assumeAccountLink.split("token=")[1];
      setToken(token);
    }
  }, [fetchUserByAdminById]);

  useEffect(() => {
    if (
      fetchUserByAdminById?.data?.data?.data &&
      fetchPendingUsersByAdmin?.data?.data?.data
    ) {
      const user = fetchUserByAdminById.data.data.data;
      const pendingUsers = fetchPendingUsersByAdmin.data.data.data;
      const userIsPending = pendingUsers.some(
        (pendingUser) => pendingUser.id === user.id
      );
      setShouldShowFirstLoginLink(userIsPending);
    }
  }, [fetchUserByAdminById, fetchPendingUsersByAdmin]);

  // *JSX
  if (fetchUserByAdminById?.isLoading || fetchUserPublicationsById?.isLoading)
    return (
      <AdminBaseLayout title="Users" withBackNavigation>
        <div className="flex h-full justify-center items-center">
          <ImgCircleLoadingOutline
            width={40}
            height={40}
            className="animate-spin text-primary-500"
          />
        </div>
      </AdminBaseLayout>
    );

  const data = fetchUserByAdminById?.data?.data?.data;
  const publications = fetchUserPublicationsById?.data?.data?.data;

  console.log("data", data);

  return (
    <AdminBaseLayout title="Users" withBackNavigation>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center space-x-5 space-y-2 sm:space-y-0">
          <img
            src={data?.image || imgNoProfilePic}
            alt="profile"
            className="object-cover min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
          />
          <h1 className="text-2xl font-semibold">{data?.name}</h1>
        </div>

        <div className="flex flex-col-reverse gap-y-2 sm:flex-row items-center sm:space-x-2 mt-2 sm:mt-0">
          <Tooltip
            variant="primary-600"
            content="Login as this user to help them update their profile."
          />
          <Button>
            <a
              href={`${
                data?.assumeAccountLink
              }&admin=${getAdminNameLocalStorage()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Assume account
            </a>
          </Button>
        </div>
      </div>

      {/* only show this section for pending users who haven't logged in before */}
      {shouldShowFirstLoginLink && (
        <div className="mt-6 max-w-[600px]">
          <AdminCard title="First Login">
            <p className="text-sm">
              Copy the first login link below and send it to the researcher when
              this profile is ready to be reviewed and acknowledged.
            </p>
            <div
              className="flex space-x-1 text-blue-500 items-center cursor-pointer"
              onClick={copyLoginLinkToClipboard}
            >
              <img
                src={imgClipboardDocument}
                alt="copy"
                width={20}
                height={20}
                className="self-center text-blue-500"
              />
              <p className="text-sm">Copy link</p>
            </div>
          </AdminCard>
        </div>
      )}

      <div className="mt-6 max-w-[600px]">
        <AdminCard title="User details">
          <AdminRow title="Bio" value={data?.bio} />
          <AdminRow title="Insitution" value={data?.institution?.name} />
          <AdminRow title="Department" value={data?.department?.name} />
          <AdminRow title="Designation" value={data?.designation?.name} />
          <AdminRow title="Email" value={data?.email} />
          <AdminRow
            title="Pubmed Names"
            value={data?.correctedPubmedNames.join(", ")}
          />
          <AdminRow title="G.Scholar Url" value={data?.googleScholar?.url} />
        </AdminCard>
      </div>

      <div className="mt-8 max-w-[600px]">
        <AdminCard title="Specialties">
          <AdminRow
            title="Primary Specialty"
            value={data?.primarySpecialty?.name}
          />
          {data?.otherSpecialties && data?.otherSpecialties?.length > 0 ? (
            <>
              {data?.otherSpecialties.map((specialty, i) => (
                <AdminRow
                  key={"specialty" + i}
                  title={`Other Specialty (${i + 1})`}
                  value={specialty?.name}
                />
              ))}
            </>
          ) : (
            <AdminRow title="Other Specialties" value="-" />
          )}
        </AdminCard>
      </div>

      <div className="mt-8 max-w-[600px]">
        <AdminCard title="Research Interests">
          {data?.researchInterests && data?.researchInterests?.length > 0 ? (
            <>
              {data.researchInterests.map((interest, i) => (
                <AdminRow
                  key={"interest" + i}
                  title={`Interest (${i + 1})`}
                  value={interest.name}
                />
              ))}
            </>
          ) : (
            "None"
          )}
        </AdminCard>
      </div>

      <div className="mt-8 max-w-[600px]">
        <AdminCard title="Patient Populations">
          {data?.patientPools && data?.patientPools?.length > 0 ? (
            <>
              {data.patientPools.map((pool, i) => (
                <AdminRow
                  key={"pool" + i}
                  title={`Population (${i + 1})`}
                  value={pool.name}
                />
              ))}
            </>
          ) : (
            "None"
          )}
        </AdminCard>
      </div>

      <div className="mt-8 w-full">
        <AdminCard title="Publications">
          {publications && publications.length > 0
            ? publications.map((pub, i) => (
                <div className="flex text-[12px]" key={"pub" + i}>
                  <span className="min-w-[30px]">{i + 1}.</span>
                  <div>
                    {/* Publication title */}
                    <a
                      className="text-blue-500 hover:underline font-medium"
                      href={`https://pubmed.ncbi.nlm.nih.gov/${pub.externalId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {pub.title}
                      <ImgOpenNewTabOutline className="text-blue-500 inline w-4 h-4 ml-1 mb-1" />
                    </a>

                    {/* Publication author */}
                    <p>{pub.authors.join(", ")}</p>

                    {/* Publication source */}
                    <p className="text-green-700">
                      {`${pub.source}. ${pub.volume}${
                        pub.issue ? "(" + pub.issue + ")" : ""
                      }${
                        pub.pages ? ":" + pub.pages + "." : ""
                      } Published ${dayjs(pub.publishedAt).format("YYYY MMM")}`}
                    </p>

                    {/* doi link */}
                    {pub.elocationId?.includes("doi") && (
                      <a
                        className="text-blue-400 hover:underline"
                        href={pub.elocationId.replace(
                          "doi: ",
                          "https://doi.org/"
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {/* remove html tags from doi link */}
                        {pub.elocationId}{" "}
                        <ImgOpenNewTabOutline className="text-blue-500 inline w-4 h-4 mb-1" />
                      </a>
                    )}

                    {/* link to clinicaltrials.gov */}
                    {pub.nctId && (
                      <div className="w-fit">
                        <Badge
                          text=""
                          isLowerCase
                          html={
                            <a
                              href={`https://clinicaltrials.gov/study/${pub.nctId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Related ClinicalTrials.gov study: {pub.nctId}{" "}
                              <ImgOpenNewTabOutline className="inline w-4 h-4 mb-1" />
                            </a>
                          }
                          variant="extra small"
                          isBolded
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            : "None"}
        </AdminCard>
      </div>
    </AdminBaseLayout>
  );
};

export default AdminUserDetails;

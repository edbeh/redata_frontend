import { Card } from "components";
import { GetMe } from "api/models";

interface InfoSectionProps {
  data: GetMe.Data;
}

const InfoSection = ({ data }: InfoSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        <h2 className="mb-5 text-xl font-semibold text-gray-700">About me</h2>

        {/* <p>I'm a senior consultant specialising in renal transplant.</p> */}

        <div className="flex flex-col mt-4 space-y-4">
          <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <p className="font-semibold basis-1/3 min-w-[125px]">Full Name:</p>
            <p className="basis-2/3">{data?.name}</p>
          </div>

          <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <p className="font-semibold basis-1/3 min-w-[125px]">Email:</p>
            <p className="basis-2/3">{data?.email}</p>
          </div>

          <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <p className="font-semibold basis-1/3 min-w-[125px]">MCR No.:</p>
            <p className="basis-2/3">Mock data</p>
          </div>

          <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <p className="font-semibold basis-1/3 min-w-[125px]">
              Primary Subspecialty:
            </p>
            <p className="basis-2/3">Kidney Transplant</p>
          </div>

          <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <p className="font-semibold basis-1/3 min-w-[125px]">
              Other Subspecialties:
            </p>
            <p className="basis-2/3">Transplant Immunosuppression</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InfoSection;

import { Card } from "components";

const InfoSection = () => {
  return (
    <div className="w-full">
      <Card>
        <h2 className="mb-5 text-xl font-bold text-gray-700">About me</h2>

        <p>I'm a senior consultant specialising in renal transplant.</p>

        <div className="flex flex-col mt-4 space-y-4">
          <div className="flex justify-between space-x-4">
            <p className="font-semibold basis-1/3 min-w-[125px]">Full Name:</p>
            <p className="basis-2/3">John Doe Sample</p>
          </div>

          <div className="flex justify-between space-x-4">
            <p className="font-semibold basis-1/3 min-w-[125px]">Email:</p>
            <p className="basis-2/3">john.doe@sgh.com.sg</p>
          </div>

          <div className="flex justify-between space-x-4">
            <p className="font-semibold basis-1/3 min-w-[125px]">MCR No.:</p>
            <p className="basis-2/3">M2045R</p>
          </div>

          <div className="flex justify-between space-x-4">
            <p className="font-semibold basis-1/3 min-w-[125px]">
              Primary Subspecialty:
            </p>
            <p className="basis-2/3">Kidney Transplant</p>
          </div>

          <div className="flex justify-between space-x-4">
            <p className="font-semibold basis-1/3 min-w-[125px]">
              Secondary Subspecialty:
            </p>
            <p className="basis-2/3">Transplant Immunosuppression</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InfoSection;

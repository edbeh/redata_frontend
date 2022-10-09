import Skeleton from "react-loading-skeleton";

const SinglePublicationLoading = () => {
  return (
    <div className="flex space-x-2">
      <div className="ml-1">
        <Skeleton height={25} className="w-[20px]" />
      </div>

      <div className="flex flex-col space-y-1 w-full">
        <Skeleton height={25} className="w-[calc(100%-40px)] sm:w-[280px]" />
        <div>
          <Skeleton height={20} className="w-full" />
          <Skeleton height={20} className="w-[180px] sm:w-[280px]" />
        </div>
        <Skeleton height={20} className="w-[250px] sm:w-[320px]" />
      </div>
    </div>
  );
};

export default SinglePublicationLoading;

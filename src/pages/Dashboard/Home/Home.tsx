import { BreadCrumbs } from "components";
import { BaseLayout } from "wrapper-components";

import { homeNav, mockData } from "./Home.util";
import { HeroSection, InfoSection, CommonSection } from "./components";

const Home = () => {
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12 pr-8">
        <BreadCrumbs breadcrumbs={homeNav.breadcrumbs} />
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-white">
          Profile
        </h1>

        <div className="flex flex-col w-full mt-8 space-y-6">
          <HeroSection />
          <InfoSection />
          <CommonSection
            title="Research Interests"
            data={mockData.researchInterests}
          />
          <CommonSection
            title="Patient Populations"
            data={mockData.patientPopulations}
          />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;

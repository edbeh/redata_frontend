import { getFeatureContent } from "./About.util";

import TopNav from "./components/TopNav/TopNav";
import Hero from "./components/Hero/Hero";
import Feature from "./components/Feature/Feature";

const About = () => {
  const featureContent = getFeatureContent();

  return (
    <div className="px-6 pb-[100px] lg:pb-[200px]">
      <TopNav />
      <Hero />

      {featureContent.map((feature) => {
        const { number, tagline, title, gradientStart, gradientEnd, content } =
          feature;
        return (
          <Feature
            key={title}
            number={number}
            tagline={tagline}
            title={title}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            content={content}
          />
        );
      })}

      <div className="flex justify-center">
        <p className="mt-[80px] lg:mt-[120px] text-sm font-bold text-gray-500 tracking-wider">
          LET'S GET STARTED
        </p>
      </div>
    </div>
  );
};

export default About;

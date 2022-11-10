import { getFeatureContent } from "./About.util";

import TopNav from "./components/TopNav/TopNav";
import Hero from "./components/Hero/Hero";
import Feature from "./components/Feature/Feature";

const About = () => {
  const featureContent = getFeatureContent();

  return (
    <div className="px-6 pb-[200px]">
      <TopNav />
      <Hero />

      {featureContent.map((feature) => {
        const { number, tagline, title, gradientStart, gradientEnd, content } =
          feature;
        return (
          <Feature
            number={number}
            tagline={tagline}
            title={title}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            content={content}
          />
        );
      })}
    </div>
  );
};

export default About;

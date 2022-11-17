import { getFeatureContent } from "./About.util";

import TopNav from "./components/TopNav/TopNav";
import Hero from "./components/Hero/Hero";
import Feature from "./components/Feature/Feature";
import Footer from "./components/Footer/Footer";

const About = () => {
  const featureContent = getFeatureContent();

  return (
    <div>
      <div className="px-6 pb-[30px]">
        <TopNav />
        <Hero />

        {featureContent.map((feature) => {
          const {
            number,
            tagline,
            title,
            gradientStart,
            gradientEnd,
            content,
          } = feature;
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
      </div>

      <Footer />
    </div>
  );
};

export default About;

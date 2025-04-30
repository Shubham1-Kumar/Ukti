import Footer from "../components/Footer";
import { UktiHero } from "../components/Hero";
import { LandingNavBar } from "../components/LandingNav";

export const Landing = () => {
  return (
    <div className="bg-[#f9f6f1] min-h-screen w-full">
      <LandingNavBar />
      <main className="w-full flex justify-center items-center px-8 pt-12 pb-5
      ">
        <UktiHero />
      </main>
      <Footer />
    </div>
  );
};

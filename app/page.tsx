import Hero from "./_components/Hero";
import About from "./_components/About";
import Projects from "./_components/Projects";
import Manifesto from "./_components/Manifesto";
import SkillsMarquee from "./_components/SkillsMarquee";
import Skills from "./_components/Skills";
import Contact from './_components/Contact';
import InvisibleWork from "./_components/InvisibleWork";
import Preloader from "./_components/Preloader";
import ClosingSection from "./_components/ClosingSection";
// import MotionPathWaypoints from './_components/'

export default function Home() {
  return (
    <>
      <Preloader />
    <div className="min-h-screen bg-[#090909] text-[#E5E5E5]">
      {/* <Navbar /> */}
      <Hero />
      <Manifesto />
      <About />
      <Skills />



      <Projects />
      <InvisibleWork />
      <SkillsMarquee />

      <Contact />
      <ClosingSection />

    </div>
      {/* <Footer /> */}
    </>
  );
}
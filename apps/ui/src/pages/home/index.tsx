import { Footer } from '../../components/Footer';
import { NavBar } from '../../components/NavBar';
import { FirstSection, SecondSection, ThirdSection } from './sections';

export function Home() {
  return (
    <>
      <NavBar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <Footer />
    </>
  );
}

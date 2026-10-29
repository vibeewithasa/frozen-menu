// domMax incluye animaciones de `layout` (necesarias para AnimatePresence popLayout).
import { LazyMotion, domMax } from "framer-motion";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./sections/Hero";
import { FlavorMarquee } from "./sections/FlavorMarquee";
import { FlavorExplorer } from "./sections/FlavorExplorer";
import { Featured } from "./sections/Featured";
import { Story } from "./sections/Story";
import { Gallery } from "./sections/Gallery";
import { Reviews } from "./sections/Reviews";
import { Visit } from "./sections/Visit";
import { FinalCTA } from "./sections/FinalCTA";

/**
 * Composición de la single-page. Cada sección decide internamente si se
 * renderiza según los datos disponibles (sin placeholders comerciales).
 */
function App() {
  return (
    <LazyMotion features={domMax} strict>
      <Nav />
      <main id="main" className="overflow-x-hidden">
        <Hero />
        <FlavorMarquee />
        <FlavorExplorer />
        <Featured />
        <Story />
        <Gallery />
        <Reviews />
        <Visit />
        <FinalCTA />
      </main>
      <Footer />
    </LazyMotion>
  );
}

export default App;

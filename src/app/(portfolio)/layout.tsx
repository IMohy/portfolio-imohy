import { Navbar } from '@/components/portfolio/Navbar';
import { Footer } from '@/components/portfolio/Footer';
import { BackgroundOrbs } from '@/components/portfolio/BackgroundOrbs';
import { ScrollIndicator } from '@/components/portfolio/ScrollIndicator';

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollIndicator />
      <BackgroundOrbs />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}

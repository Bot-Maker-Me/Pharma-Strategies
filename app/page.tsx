import { HeroNew } from '@/components/sections/hero-new';
import { MarqueeStrip } from '@/components/sections/marquee-strip';
import { Statement } from '@/components/sections/statement';
import { FeatureBentoGrid } from '@/components/sections/feature-bento-grid';
import { WhoItsFor } from '@/components/sections/who-its-for';
import { NarcoticsLedgerPinned } from '@/components/sections/narcotics-ledger-pinned';
import { AppsHorizontal } from '@/components/sections/apps-horizontal';
import { HowItWorksNew } from '@/components/sections/how-it-works-new';
import { PricingNew } from '@/components/sections/pricing-new';
import { FAQ } from '@/components/sections/faq';
import { ClosingBand } from '@/components/sections/closing-band';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export default function Home() {
  return (
    <>
      <HeroNew />
      <MarqueeStrip />
      <Statement />
      <FeatureBentoGrid />
      <WhoItsFor />
      <NarcoticsLedgerPinned />
      <AppsHorizontal />
      <HowItWorksNew />
      <PricingNew />
      <FAQ />
      <FadeInOnScroll>
        <ClosingBand />
      </FadeInOnScroll>
    </>
  );
}

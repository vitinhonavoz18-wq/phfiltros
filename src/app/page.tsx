import { Hero } from "@/components/sections/Hero";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { Solutions } from "@/components/sections/Solutions";
import { FiltrationExperience } from "@/components/sections/FiltrationExperience";
import { Authority } from "@/components/sections/Authority";
import { Services } from "@/components/sections/Services";
import { QuoteWizard } from "@/components/sections/QuoteWizard";
import { Benefits } from "@/components/sections/Benefits";
import { SocialProof } from "@/components/sections/SocialProof";
import { Regional } from "@/components/sections/Regional";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { CampaignHero } from "@/components/campaign/CampaignHero";
import { PromoTicker } from "@/components/campaign/PromoTicker";
import { getBuildCampaign } from "@/config/campaigns";

const campaign = getBuildCampaign();

export default function Home() {
  return (
    <>
      {campaign && <CampaignHero campaign={campaign} />}
      <div className="cmp-off">
        <Hero />
      </div>
      {campaign && <PromoTicker campaign={campaign} />}
      <CredibilityBar />
      <Solutions />
      <FiltrationExperience />
      <Authority />
      <Services />
      <QuoteWizard />
      <Benefits />
      <SocialProof />
      <Regional />
      <Faq />
      <FinalCta />
    </>
  );
}

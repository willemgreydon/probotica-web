import { HomeClientFx } from '@/components/layout/HomeClientFx';
import { HomeSectionNav } from '@/components/layout/HomeSectionNav';
import { Hero } from '@/components/sections/Hero';
import { Solutions } from '@/components/sections/Solutions';
import { HorizontalAgents } from '@/components/sections/HorizontalAgents';
import { AiStudio } from '@/components/sections/AiStudio';
import { Contact } from '@/components/sections/Contact';

/**
 * Home page (PB-007) — now on the shared marketing shell.
 * The bespoke <Header> and hardcoded <footer> are gone (SiteHeader/SiteFooter
 * are supplied by app/(marketing)/layout.tsx). A scrollspy sub-nav handles the
 * in-page section anchors.
 */
export default function Page() {
  return (
    <>
      <HomeClientFx />
      <HomeSectionNav />
      <main id="main-content">
        <Hero />
        <Solutions />
        <HorizontalAgents />
        <AiStudio />
        <Contact />
      </main>
    </>
  );
}

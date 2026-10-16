import { useEffect, useState } from 'react';

const SITE_URL = 'https://www.wespdirect.be';
const BUSINESS_NAME = 'Wespenexpert Luc';
const WHATSAPP_NUMBER = '+32496793094';

type Tab = 'home' | 'diensten' | 'over-ons' | 'tarieven' | 'faq' | 'plaats';
type LocationPage = (typeof locations)[number];
type PageMetadata = {
  tab: Tab;
  heading: string;
  title: string;
  description: string;
  location?: LocationPage;
};

const locations = [
  {
    slug: 'wespenverdelging-wechelderzande',
    name: 'Wechelderzande',
    searchPhrase: 'wespenverdelging Wechelderzande',
    description: 'Wespen of een wespennest in Wechelderzande? Neem rechtstreeks contact op met Luc voor advies over een veilige aanpak en de kosten.',
    intro: 'Een wespennest bij je woning, schuur of tuin is lastig en kan onrust geven. Luc bespreekt met je waar je wespen ziet en waar de invliegopening zit, zodat je weet wat een passende volgende stap is.',
    adviceHeading: 'Wespen gezien, maar het nest nog niet gevonden?',
    advice: 'Kijk alleen vanaf een veilige afstand of wespen steeds naar dezelfde opening vliegen. Dat kan Luc helpen om de plek van het nest beter in te schatten. Ga niet op zoek door dakranden of muren open te maken.',
  },
  {
    slug: 'wespennest-gierle',
    name: 'Gierle',
    searchPhrase: 'wespennest Gierle',
    description: 'Een wespennest in Gierle ontdekt? Luc helpt je met persoonlijk advies over wespen- en hoornaarnesten en een passende aanpak.',
    intro: 'Zie je in Gierle wespen steeds op dezelfde plek in- en uitvliegen? Dat kan wijzen op een nest. Luc helpt je de situatie in te schatten en bespreekt wat er nodig is voordat je een behandeling plant.',
    adviceHeading: 'Wat doe je als je een wespennest ontdekt?',
    advice: 'Houd kinderen en huisdieren uit de buurt van de vliegroute en laat de invliegopening open. Vertel Luc waar je het nest hebt gezien en hoe hoog het zit; hij kan de opties met je bespreken.',
  },
  {
    slug: 'wespenverdelging-poederlee',
    name: 'Poederlee',
    searchPhrase: 'wespenverdelging Poederlee',
    description: 'Wespenbestrijding in Poederlee met rechtstreeks contact met Luc. Bespreek de plek van het nest, de aanpak en de tarieven.',
    intro: 'Een nest onder de dakrand, in de spouw of in de tuin van je woning in Poederlee? Vertel Luc waar je activiteit ziet. Je krijgt persoonlijk advies over de situatie en de mogelijke aanpak.',
    adviceHeading: 'Waar zit de invliegopening?',
    advice: 'Wespen vliegen vaak via een kleine opening naar hun nest. Probeer die opening niet dicht te maken: wespen kunnen dan een andere uitweg zoeken. Deel je observatie met Luc en spreek samen de vervolgstap af.',
  },
  {
    slug: 'wespenverdelging-lille',
    name: 'Lille',
    searchPhrase: 'wespenverdelging Lille',
    description: 'Op zoek naar wespenverdelging in Lille? Neem contact op met Luc voor advies over een wespennest en de bestrijdingsmogelijkheden.',
    intro: 'Heb je in Lille een wespennest ontdekt? Luc bespreekt met je waar het nest zit, hoe actief de wespen zijn en welke aanpak geschikt kan zijn. Zo weet je vooraf waar je aan toe bent.',
    adviceHeading: 'Twijfel je tussen wespen en hoornaars?',
    advice: 'Probeer insecten niet zelf te vangen of het nest te benaderen om ze beter te bekijken. Beschrijf wat je hebt gezien of stuur Luc een bericht om de situatie eerst te bespreken.',
  },
] as const;

const pages: Record<string, PageMetadata> = {
  '/': {
    tab: 'home' as const,
    heading: 'Snel & Veilig van al je Wespen Af',
    title: 'Wespenverdelging in Lille en omgeving | Wespenexpert Luc',
    description: 'Wespen of een wespennest in Lille, Gierle, Poederlee of Wechelderzande? Neem contact op met Luc voor persoonlijk advies en duidelijke tarieven.',
  },
  '/diensten/': {
    tab: 'diensten' as const,
    heading: 'Diensten',
    title: 'Wespen- en hoornaarbestrijding | Wespenexpert Luc',
    description: 'Bekijk de mogelijkheden voor het bestrijden van wespennesten, nesten op hoogte en hoornaars. Luc bespreekt de juiste aanpak en tarieven.',
  },
  '/over-ons/': {
    tab: 'over-ons' as const,
    heading: 'Over Luc',
    title: 'Over Luc | Wespenexpert Luc',
    description: 'Maak kennis met Luc, je persoonlijke contact voor advies en bestrijding van wespen- en hoornaarnesten in de regio Lille.',
  },
  '/tarieven/': {
    tab: 'tarieven' as const,
    heading: 'Tarieven',
    title: 'Tarieven wespenbestrijding | Wespenexpert Luc',
    description: 'Bekijk de tarieven voor wespenbestrijding. Luc bespreekt vooraf de aanpak en eventuele kosten voor jouw situatie.',
  },
  '/veelgestelde-vragen/': {
    tab: 'faq' as const,
    heading: 'Veelgestelde vragen',
    title: 'Veelgestelde vragen over wespen en hoornaars | Wespenexpert Luc',
    description: 'Antwoorden op vragen over wespennesten, bestrijding, de invliegopening en wat je na een behandeling kunt verwachten.',
  },
  ...Object.fromEntries(locations.map((location) => [
    `/${location.slug}/`,
    {
      tab: 'plaats' as const,
      heading: `${location.searchPhrase[0].toUpperCase()}${location.searchPhrase.slice(1)}`,
      title: `${location.searchPhrase[0].toUpperCase()}${location.searchPhrase.slice(1)} | ${BUSINESS_NAME}`,
      description: location.description,
      location,
    },
  ])),
};

type PagePath = string;

const normalizePath = (path: string): PagePath => {
  const normalized = `/${path.split('/').filter(Boolean).join('/')}/`;
  const canonicalPath = normalized === '//' ? '/' : normalized;
  return canonicalPath in pages ? canonicalPath : '/';
};

export const getSeoData = (path: string) => {
  const currentPath = normalizePath(path);
  const page = pages[currentPath];
  const pageUrl = `${SITE_URL}${currentPath}`;
  const socialMetadata = [
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'nl_BE' },
    { property: 'og:title', content: page.title },
    { property: 'og:description', content: page.description },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: `${SITE_URL}/images/wasp-nest-hero.jpg` },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: BUSINESS_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/images/wasp-nest-hero.jpg`,
        telephone: WHATSAPP_NUMBER,
        areaServed: locations.map(({ name }) => ({ '@type': 'Place', name })),
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: WHATSAPP_NUMBER,
          contactType: 'customer service',
          availableLanguage: 'Dutch',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: BUSINESS_NAME,
        inLanguage: 'nl-BE',
        publisher: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        inLanguage: 'nl-BE',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        ...(page.tab === 'plaats' && page.location
          ? {
              about: { '@id': `${SITE_URL}/#business` },
              mainEntity: {
                '@type': 'Service',
                name: `Wespen- en hoornaarbestrijding in ${page.location.name}`,
                serviceType: 'Wespen- en hoornaarbestrijding',
                areaServed: { '@type': 'Place', name: page.location.name },
                provider: { '@id': `${SITE_URL}/#business` },
                url: pageUrl,
              },
            }
          : {}),
      },
      ...(currentPath !== '/'
        ? [{
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: page.heading, item: pageUrl },
            ],
          }]
        : []),
    ],
  };
  return { ...page, path: currentPath, url: pageUrl, socialMetadata, structuredData };
};

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const [currentPath, setCurrentPath] = useState<PagePath>(() => normalizePath(initialPath));
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const seo = getSeoData(currentPath);
  const page = pages[currentPath];
  const activeTab: Tab = page.tab;

  const navigateTo = (path: string) => {
    const nextPath = normalizePath(path);
    window.history.pushState({}, '', nextPath);
    setCurrentPath(nextPath);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    document.title = seo.title;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.append(description);
    }
    description.content = seo.description;

    for (const metadata of seo.socialMetadata) {
      const selector = metadata.property
        ? `meta[property="${metadata.property}"]`
        : `meta[name="${metadata.name}"]`;
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        if (metadata.property) element.setAttribute('property', metadata.property);
        else element.name = metadata.name ?? '';
        document.head.append(element);
      }
      element.content = metadata.content;
    }

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = seo.url;

    let jsonLd = document.querySelector<HTMLScriptElement>('#seo-jsonld');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'seo-jsonld';
      jsonLd.type = 'application/ld+json';
      document.head.append(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(seo.structuredData);
  }, [seo]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      setMobileMenuOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="bg-[#fffdf7] text-gray-800 font-sans antialiased selection:bg-amber-300 selection:text-amber-950 min-h-screen flex flex-col justify-between overflow-x-hidden">
      
      <section id={activeTab === 'home' ? 'home' : undefined} className="relative w-full">
        <div 
          className={`w-full text-white relative flex flex-col py-6 sm:py-8 ${activeTab === 'home' ? 'min-h-[620px] sm:min-h-[700px] justify-between' : 'min-h-[280px]'}`}
          style={{
            background: activeTab === 'home'
              ? 'linear-gradient(180deg, rgba(30, 24, 10, 0.45) 0%, rgba(30, 24, 10, 0.65) 100%), url("/images/wasp-nest-hero.jpg") center/cover no-repeat'
              : 'linear-gradient(180deg, rgba(30, 24, 10, 0.62) 0%, rgba(30, 24, 10, 0.4) 100%), url("/images/wasp-nest-hero.jpg") center/cover no-repeat'
          }}
        >
          {/* Floating Navigation Bar over Hero Image */}
          <header className="max-w-5xl mx-auto w-full px-4 sm:px-8 z-30">
            <div className="bg-white/90 backdrop-blur-md rounded-full px-4 sm:px-6 py-3 shadow-lg border border-amber-100/50 flex justify-between items-center">
              {/* Brand Logo */}
              <a href="/" onClick={(event) => { event.preventDefault(); navigateTo('/'); }} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-md font-bold text-lg">
                  🐝
                </div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-amber-950">Wespenexpert <span className="text-amber-600">Luc</span></span>
              </a>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-gray-700">
                <a href="/" onClick={(event) => { event.preventDefault(); navigateTo('/'); }} aria-current={activeTab === 'home' ? 'page' : undefined} className={`${activeTab === 'home' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>Home</a>
                <a href="/diensten/" onClick={(event) => { event.preventDefault(); navigateTo('/diensten/'); }} aria-current={activeTab === 'diensten' ? 'page' : undefined} className={`${activeTab === 'diensten' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>Diensten</a>
                <a href="/over-ons/" onClick={(event) => { event.preventDefault(); navigateTo('/over-ons/'); }} aria-current={activeTab === 'over-ons' ? 'page' : undefined} className={`${activeTab === 'over-ons' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>Over Ons</a>
                <a href="/tarieven/" onClick={(event) => { event.preventDefault(); navigateTo('/tarieven/'); }} aria-current={activeTab === 'tarieven' ? 'page' : undefined} className={`${activeTab === 'tarieven' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>Tarieven</a>
                <a href="/veelgestelde-vragen/" onClick={(event) => { event.preventDefault(); navigateTo('/veelgestelde-vragen/'); }} aria-current={activeTab === 'faq' ? 'page' : undefined} className={`${activeTab === 'faq' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>FAQ</a>
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden w-10 h-10 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 flex items-center justify-center transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
                <a href="tel:+32496793094" className="hidden md:flex bg-amber-500 hover:bg-amber-600 text-amber-950 text-sm font-semibold px-5 py-2.5 rounded-full shadow-md transition items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Bel Luc</span>
                </a>
              </div>
            </div>

            {/* Mobile dropdown */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-2 bg-white rounded-3xl p-4 shadow-xl border border-amber-100 flex flex-col space-y-3 text-amber-950">
                <a href="/" onClick={(event) => { event.preventDefault(); navigateTo('/'); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">Home</a>
                <a href="/diensten/" onClick={(event) => { event.preventDefault(); navigateTo('/diensten/'); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">Diensten</a>
                <a href="/over-ons/" onClick={(event) => { event.preventDefault(); navigateTo('/over-ons/'); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">Over Ons</a>
                <a href="/tarieven/" onClick={(event) => { event.preventDefault(); navigateTo('/tarieven/'); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">Tarieven</a>
                <a href="/veelgestelde-vragen/" onClick={(event) => { event.preventDefault(); navigateTo('/veelgestelde-vragen/'); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">FAQ</a>
                <a href="tel:+32496793094" className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-amber-950 px-4 py-3 rounded-xl font-semibold transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Bel Luc
                </a>
              </div>
            )}
          </header>

          {activeTab !== 'home' && (
            <div className="max-w-5xl mx-auto mt-auto w-full px-4 pt-8 sm:px-8">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                {page.heading}
              </h1>
            </div>
          )}

          {activeTab === 'home' && <div className="max-w-5xl mx-auto w-full my-auto px-4 sm:px-8">
            <div className="self-start mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Snel & Veilig Verdelgd</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 max-w-2xl">
              Snel & Veilig van al je Wespen Af
            </h1>
            <p className="text-gray-200 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-xl">
              Ik ben Luc. Ik help je met wespen- en hoornaarnesten in Lille, Gierle, Poederlee en Wechelderzande. Je krijgt persoonlijk advies en vooraf duidelijkheid over de mogelijke aanpak en kosten.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+32496793094" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold px-7 py-3.5 rounded-full transition shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Bel Luc</span>
              </a>
              <a href="https://wa.me/32496793094?text=Hallo%20Luc%2C%20ik%20heb%20een%20vraag%20over%20wespen%20of%20hoornaars." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-3.5 rounded-full transition shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.78 11.78 0 0 0 12.13 0C5.61 0 .3 5.3.3 11.82c0 2.08.55 4.1 1.59 5.88L.2 24l6.45-1.69a11.83 11.83 0 0 0 5.48 1.35h.01c6.52 0 11.83-5.3 11.83-11.82 0-3.16-1.23-6.13-3.45-8.36ZM12.14 21.65a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.83 1 1.02-3.73-.24-.38a9.77 9.77 0 0 1-1.5-5.14c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.01c0 5.47-4.45 9.92-9.92 9.92Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.51-1.78-1.69-2.08-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>
                <span>Stuur Luc een bericht</span>
              </a>
            </div>
          </div>}
        </div>

      </section>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8">
        {activeTab !== 'home' && (
          <nav aria-label="Kruimelpad" className="pt-5 text-sm text-gray-500">
            <a href="/" onClick={(event) => { event.preventDefault(); navigateTo('/'); }} className="text-amber-800 underline hover:text-amber-600">
              Home
            </a>
            <span className="mx-2" aria-hidden="true">/</span>
            <span aria-current="page">{page.heading}</span>
          </nav>
        )}
        {activeTab === 'home' && (
          <div>
            {/* About / Welcome Section */}
            <section className="py-16 my-8">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Image Card with Badge */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-white">
                    <img src="/images/german-wasp.jpg" alt="Close-up van een Duitse wesp" className="w-full h-[360px] object-cover" />
                    {/* Floating Round Badge on Image */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-full p-2 pr-4 shadow-lg flex items-center gap-2 border border-amber-100">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                        🐝
                      </div>
                      <span className="text-xs font-semibold text-amber-950">Vakkundig & Veilig</span>
                    </div>
                  </div>
                </div>

                {/* Right Content */}
                <div className="lg:col-span-7 space-y-5">
                  <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Persoonlijke hulp van Luc</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-amber-950">
                    Aangenaam, ik ben Luc
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Een nest in of rond je huis is vervelend. Je hebt rechtstreeks contact met mij: ik luister naar je situatie, bespreek de aanpak en vertel vooraf wat je kunt verwachten. Zo weet je meteen wie er komt helpen.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4 items-center">
                    <a href="tel:+32496793094" className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-semibold px-6 py-3 rounded-full transition shadow-md flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Bel Luc
                    </a>
                    <a href="https://wa.me/32496793094?text=Hallo%20Luc%2C%20ik%20heb%20een%20vraag%20over%20wespen%20of%20hoornaars." target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition shadow-md flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.78 11.78 0 0 0 12.13 0C5.61 0 .3 5.3.3 11.82c0 2.08.55 4.1 1.59 5.88L.2 24l6.45-1.69a11.83 11.83 0 0 0 5.48 1.35h.01c6.52 0 11.83-5.3 11.83-11.82 0-3.16-1.23-6.13-3.45-8.36ZM12.14 21.65a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.83 1 1.02-3.73-.24-.38a9.77 9.77 0 0 1-1.5-5.14c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.01c0 5.47-4.45 9.92-9.92 9.92Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.51-1.78-1.69-2.08-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>
                      Stuur Luc een bericht
                    </a>
                    <a href="/diensten/" onClick={(event) => { event.preventDefault(); navigateTo('/diensten/'); }} className="text-amber-800 hover:text-amber-950 font-medium text-sm px-4 py-2 transition">
                      Bekijk Onze Diensten &rarr;
                    </a>
                  </div>
                </div>

              </div>
            </section>

            {/* Services Cards Section */}
            <section className="py-12 my-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Onze Service</span>
                <h2 className="text-3xl font-bold text-amber-950 mt-3 mb-3">Waar Luc je mee kan helpen</h2>
                <p className="text-gray-600 text-sm">Persoonlijk contact, heldere tarieven en een aanpak die past bij jouw situatie.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Card 1 */}
                <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-amber-100 flex flex-col justify-between hover:shadow-md transition group">
                  <div>
                    <div className="rounded-[2rem] overflow-hidden mb-5 h-48">
                      <img src="/images/paper-wasp-nest.jpg" alt="Open papieren wespennest met larven" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-950 mb-2">Standaard Wespennest</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-6">
                      Effectieve poederbehandeling voor nesten in de spouwmuur, dakrand, schuur of tuin tot 3 meter hoogte.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-end">
                    <a href="tel:+32496793094" className="bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-semibold px-5 py-2.5 rounded-full transition inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      Bel Luc
                    </a>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-amber-100 flex flex-col justify-between hover:shadow-md transition group">
                  <div>
                    <div className="rounded-[2rem] overflow-hidden mb-5 h-48">
                      <img src="/images/european-hornet.jpg" alt="Europese hoornaar van dichtbij" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-950 mb-2">Hoornaars</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-6">
                      Deskundige bestrijding van hoornaarnesten met gespecialiseerde beschermingskleding.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-end">
                    <a href="tel:+32496793094" className="bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-semibold px-5 py-2.5 rounded-full transition inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      Bel Luc
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-amber-100 flex flex-col justify-between hover:shadow-md transition group">
                  <div>
                    <div className="rounded-[2rem] overflow-hidden mb-5 h-48">
                      <img src="/images/asian-hornet.jpg" alt="Aziatische hoornaar van dichtbij" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-950 mb-2">Aziatische hoornaars</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-6">
                      Deskundige aanpak van nesten van Aziatische hoornaars. Neem contact op om de situatie te bespreken.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-end">
                    <a href="tel:+32496793094" className="bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-semibold px-5 py-2.5 rounded-full transition inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a2 2 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      Bel Luc
                    </a>
                  </div>
                </div>

              </div>
            </section>

            <section className="py-12" aria-labelledby="werkgebied-heading">
              <h2 id="werkgebied-heading" className="text-2xl font-bold text-amber-950 sm:text-3xl">
                Wespenbestrijding in Lille en omliggende plaatsen
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
                Luc is beschikbaar voor vragen over wespen- en hoornaarnesten in deze plaatsen. Kies je woonplaats voor informatie over de aanpak en contact.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {locations.map((location) => (
                  <li key={location.slug}>
                    <a
                      href={`/${location.slug}/`}
                      onClick={(event) => { event.preventDefault(); navigateTo(`/${location.slug}/`); }}
                      className="block rounded-2xl border border-amber-100 bg-white p-4 font-semibold text-amber-900 shadow-sm transition hover:border-amber-300 hover:bg-amber-50"
                    >
                      Wespenbestrijding {location.name} <span aria-hidden="true">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {activeTab === 'plaats' && page.location && (
          <article className="mx-auto max-w-4xl space-y-8 py-12">
            <section className="rounded-[2rem] border border-amber-100 bg-white p-6 shadow-sm sm:p-10">
              <h2 className="text-2xl font-bold text-amber-950 sm:text-3xl">
                Wespen of een wespennest in {page.location.name}?
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">{page.location.intro}</p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Wespen kunnen nesten maken op verschillende beschutte plekken, zoals onder een dakrand, in een spouwmuur, schuur of in de grond. Houd afstand van de invliegopening en probeer die niet af te sluiten. Twijfel je of het om wespen of hoornaars gaat? Beschrijf wat je ziet aan Luc voordat je zelf iets aan het nest doet.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="tel:+32496793094" className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-amber-950 transition hover:bg-amber-400">
                  Bel Luc
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(`Hallo Luc, ik heb een vraag over een wespennest in ${page.location.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500"
                >
                  Stuur Luc een bericht
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-amber-950">Wat kun je aan Luc doorgeven?</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
                <li>In welke plaats en ongeveer waar je de wespen ziet.</li>
                <li>Waar de wespen in- en uitvliegen, als je dat veilig kunt zien.</li>
                <li>Of het nest laag bij de grond of juist op hoogte lijkt te zitten.</li>
              </ul>
              <h2 className="mt-6 text-xl font-bold text-amber-950">{page.location.adviceHeading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{page.location.advice}</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Luc kan met deze informatie bespreken wat een geschikte volgende stap is en welke kosten daarbij horen.
              </p>
            </section>

            <nav aria-label="Andere plaatsen" className="border-t border-amber-100 pt-6">
              <h2 className="font-bold text-amber-950">Ook actief in de omgeving</h2>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {locations.filter((location) => location.slug !== page.location?.slug).map((location) => (
                  <li key={location.slug}>
                    <a
                      href={`/${location.slug}/`}
                      onClick={(event) => { event.preventDefault(); navigateTo(`/${location.slug}/`); }}
                      className="text-sm text-amber-800 underline hover:text-amber-600"
                    >
                      Wespenbestrijding {location.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </article>
        )}

        {activeTab === 'diensten' && (
          <div className="py-12 max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Onze Diensten</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-amber-950 mt-3 mb-2">Professionele Bestrijdingsopties</h2>
              <p className="text-gray-600 text-sm">Vertel Luc wat je ziet; samen bekijken jullie welke oplossing past.</p>
            </div>
            
            <div className="grid gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-amber-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-amber-950 mb-1">Standaard Wespennest (tot 3 meter)</h3>
                  <p className="text-gray-600 text-sm">Snelle poederbehandeling direct in de vluchtopening. Veilig en binnen 24 uur resultaat.</p>
                </div>
                <div className="text-right">
                  <a href="tel:+32496793094" className="inline-flex items-center gap-1.5 bg-amber-500 text-amber-950 font-semibold text-xs px-4 py-2 rounded-full"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>Bel Luc</a>
                </div>
              </div>



              <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-amber-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-amber-950 mb-1">Hoornaarnest Verwijderen</h3>
                  <p className="text-gray-600 text-sm">Gespecialiseerde aanpak voor hoornaarnesten, waaronder nesten van Aziatische hoornaars.</p>
                </div>
                <div className="text-right">
                  <a href="tel:+32496793094" className="mt-2 inline-flex items-center gap-1.5 bg-amber-500 text-amber-950 font-semibold text-xs px-4 py-2 rounded-full"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>Bel Luc</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'over-ons' && (
          <div className="py-12 max-w-4xl mx-auto space-y-6 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-amber-100 shadow-sm my-8">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Even voorstellen</span>
            <h2 className="text-3xl font-bold text-amber-950">Ik ben Luc, jouw wespenverdelger</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Bij Wespenexpert Luc heb je direct contact met mij. Ik denk met je mee, leg rustig uit wat er nodig is en geef vooraf duidelijkheid over de kosten. Geen ingewikkeld verhaal, maar persoonlijke hulp bij wespen- en hoornaarnesten.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="bg-amber-50 p-5 rounded-3xl text-center">
                <span className="text-2xl font-bold text-amber-700 block">100%</span>
                <span className="text-xs text-amber-900 font-medium">Seizoensgarantie</span>
              </div>
              <div className="bg-amber-50 p-5 rounded-3xl text-center">
                <span className="text-2xl font-bold text-amber-700 block">&lt; 24u</span>
                <span className="text-xs text-amber-900 font-medium">Snelle Service</span>
              </div>
              <div className="bg-amber-50 p-5 rounded-3xl text-center">
                <span className="text-2xl font-bold text-amber-700 block">5.000+</span>
                <span className="text-xs text-amber-900 font-medium">Tevreden Klanten</span>
              </div>
            </div>
            <details className="border-t border-amber-100 pt-4 text-xs text-gray-500">
              <summary className="cursor-pointer font-medium text-amber-800">Fotocredits</summary>
              <p className="mt-3 leading-relaxed">
                {' '}<a href="https://commons.wikimedia.org/wiki/File:Vespa_velutina_nest_Pasli%C3%A8res_n01.jpg" target="_blank" rel="noreferrer" className="underline">Marie-Lan Taÿ Pamart (CC BY 4.0)</a>;
                {' '}<a href="https://commons.wikimedia.org/wiki/File:Vespula_germanica_Richard_Bartz.jpg" target="_blank" rel="noreferrer" className="underline">Richard Bartz (CC BY-SA 2.5)</a>;
                {' '}<a href="https://commons.wikimedia.org/wiki/File:A_paper_wasp_nest_with_pupae.jpg" target="_blank" rel="noreferrer" className="underline">HesamNoHead (CC BY 4.0)</a>;
                {' '}<a href="https://commons.wikimedia.org/wiki/File:Bald-faced_hornet_nest_on_Governors_Island_(70500).jpg" target="_blank" rel="noreferrer" className="underline">Rhododendrites (CC BY-SA 4.0)</a>;
                {' '}<a href="https://commons.wikimedia.org/wiki/File:European_hornet_090621.jpg" target="_blank" rel="noreferrer" className="underline">Aconcagua (CC BY-SA 3.0)</a>;
                {' '}<a href="https://commons.wikimedia.org/wiki/File:Asian_hornet_(Vespa_velutina).jpg" target="_blank" rel="noreferrer" className="underline">Charles J. Sharp (CC BY-SA 4.0)</a>
              </p>
            </details>
          </div>
        )}

        {activeTab === 'tarieven' && (
          <div className="py-12 max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Transparant</span>
              <h2 className="text-3xl font-bold text-amber-950 mt-3 mb-2">Eerlijke & Vaste Tarieven</h2>
              <p className="text-gray-600 text-sm">Luc bespreekt vooraf duidelijk de kosten en de aanpak.</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-amber-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-sm font-semibold text-gray-800">Standaard wespennest bestrijding</span>
                <span className="font-bold text-amber-700">€ 65,- all-in</span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-sm font-semibold text-gray-800">Tweede nest tegelijk behandeld</span>
                <span className="font-bold text-amber-700">€ 30,- extra</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-sm font-semibold text-gray-800">Seizoensgarantie</span>
                <span className="font-bold text-amber-700">Gratis inbegrepen</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <section className="py-12 bg-white rounded-[2.5rem] p-8 sm:p-12 border border-amber-100 my-8 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Veelgestelde Vragen</span>
              <h2 className="text-3xl font-bold text-amber-950 mt-3">Antwoorden op Jouw Vragen</h2>
            </div>

            <div className="space-y-4">
              <div className="border-b border-amber-100 pb-4">
                <button onClick={() => toggleFaq(1)} className="w-full text-left font-semibold text-amber-950 flex justify-between items-center text-sm py-2 focus:outline-none">
                  <span>Hoe snel is het wespennest verdwenen?</span>
                  <span className="text-amber-600 font-bold">{faqOpen === 1 ? '−' : '+'}</span>
                </button>
                {faqOpen === 1 && (
                  <p className="text-xs text-gray-600 leading-relaxed pt-2">
                    Na de poederbehandeling nemen de wespen het middel zelf mee het nest in. Binnen 24 tot 48 uur is het nest volledig uitgestorven.
                  </p>
                )}
              </div>

              <div className="border-b border-amber-100 pb-4">
                <button onClick={() => toggleFaq(2)} className="w-full text-left font-semibold text-amber-950 flex justify-between items-center text-sm py-2 focus:outline-none">
                  <span>Wat als de wespen na 2 dagen nog niet weg zijn?</span>
                  <span className="text-amber-600 font-bold">{faqOpen === 2 ? '−' : '+'}</span>
                </button>
                {faqOpen === 2 && (
                  <p className="text-xs text-gray-600 leading-relaxed pt-2">
                    Wij bieden 100% seizoensgarantie. Mocht er na 2-3 dagen nog activiteit zijn, dan komen wij kosteloos opnieuw langs.
                  </p>
                )}
              </div>

              <div className="border-b border-amber-100 pb-4">
                <button onClick={() => toggleFaq(3)} className="w-full text-left font-semibold text-amber-950 flex justify-between items-center text-sm py-2 focus:outline-none">
                  <span>Moet ik de invliegopening dichtmaken?</span>
                  <span className="text-amber-600 font-bold">{faqOpen === 3 ? '−' : '+'}</span>
                </button>
                {faqOpen === 3 && (
                  <p className="text-xs text-gray-600 leading-relaxed pt-2">
                    Nee, maak openingen nooit dicht voordat de verdelging heeft plaatsgevonden. Anders zoeken de wespen een uitweg naar binnen in de woning.
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="mt-16 w-full bg-amber-950 text-amber-100">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-8">
          <div className="flex flex-col gap-6 border-b border-amber-900 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold text-white">Wespenexpert Luc</p>
            <nav aria-label="Footer navigatie" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-amber-200">
              <a href="/" onClick={(event) => { event.preventDefault(); navigateTo('/'); }} className="hover:text-white transition">Home</a>
              <a href="/diensten/" onClick={(event) => { event.preventDefault(); navigateTo('/diensten/'); }} className="hover:text-white transition">Diensten</a>
              <a href="/over-ons/" onClick={(event) => { event.preventDefault(); navigateTo('/over-ons/'); }} className="hover:text-white transition">Over Luc</a>
              <a href="/tarieven/" onClick={(event) => { event.preventDefault(); navigateTo('/tarieven/'); }} className="hover:text-white transition">Tarieven</a>
              <a href="/veelgestelde-vragen/" onClick={(event) => { event.preventDefault(); navigateTo('/veelgestelde-vragen/'); }} className="hover:text-white transition">Veelgestelde vragen</a>
              {locations.map((location) => (
                <a key={location.slug} href={`/${location.slug}/`} onClick={(event) => { event.preventDefault(); navigateTo(`/${location.slug}/`); }} className="hover:text-white transition">
                  {location.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-3 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-amber-300">&copy; {new Date().getFullYear()} Wespenexpert Luc</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href="tel:+32496793094" className="hover:text-white transition">Bel Luc</a>
              <a href="https://wa.me/32496793094?text=Hallo%20Luc%2C%20ik%20heb%20een%20vraag%20over%20wespen%20of%20hoornaars." target="_blank" rel="noreferrer" className="hover:text-white transition">Stuur Luc een bericht</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
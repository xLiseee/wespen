import React, { useState } from 'react';

export default App;

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'diensten' | 'over-ons' | 'tarieven' | 'faq'>('home');
  const [searchPostcode, setSearchPostcode] = useState('');
  const [nestType, setNestType] = useState('Spouwmuur / Dakrand');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcResult, setCalcResult] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPostcode) {
      setCalcResult('Vul alstublieft een postcode of plaatsnaam in.');
      return;
    }
    setCalcResult(`Voor ${searchPostcode} (${nestType}) geldt ons all-in tarief vanaf € 65,- inclusief seizoensgarantie. Direct bellen voor snelle hulp!`);
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="bg-[#fffdf7] text-gray-800 font-sans antialiased selection:bg-amber-300 selection:text-amber-950 min-h-screen flex flex-col justify-between overflow-x-hidden">
      
      <section className="relative w-full">
        <div 
          className="w-full min-h-[620px] sm:min-h-[700px] text-white relative flex flex-col justify-between px-4 sm:px-12 py-6 sm:py-8"
          style={{
            background: 'linear-gradient(180deg, rgba(30, 24, 10, 0.45) 0%, rgba(30, 24, 10, 0.65) 100%), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80") center/cover no-repeat'
          }}
        >
          {/* Floating Navigation Bar over Hero Image */}
          <header className="max-w-[1400px] mx-auto w-full z-30">
            <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-amber-100/50 flex justify-between items-center">
              {/* Brand Logo */}
              <a href="#home" onClick={() => setActiveTab('home')} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-md font-bold text-lg">
                  🐝
                </div>
                <span className="text-2xl font-bold tracking-tight text-amber-950">Poulls <span className="text-amber-600 text-sm font-normal ml-1 hidden sm:inline">| Wespenexpert</span></span>
              </a>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-gray-700">
                <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>Home</button>
                <button onClick={() => setActiveTab('diensten')} className={`${activeTab === 'diensten' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>Diensten</button>
                <button onClick={() => setActiveTab('over-ons')} className={`${activeTab === 'over-ons' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>Over Ons</button>
                <button onClick={() => setActiveTab('tarieven')} className={`${activeTab === 'tarieven' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>Tarieven</button>
                <button onClick={() => setActiveTab('faq')} className={`${activeTab === 'faq' ? 'text-amber-800 font-bold' : 'hover:text-amber-600'} transition`}>FAQ</button>
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
                <a href="tel:0800123456" className="bg-amber-500 hover:bg-amber-600 text-amber-950 text-sm font-semibold px-5 py-2.5 rounded-full shadow-md transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Spoed Bellen</span>
                </a>
              </div>
            </div>

            {/* Mobile dropdown */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-2 bg-white rounded-3xl p-4 shadow-xl border border-amber-100 flex flex-col space-y-3 text-amber-950">
                <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">Home</button>
                <button onClick={() => { setActiveTab('diensten'); setMobileMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">Diensten</button>
                <button onClick={() => { setActiveTab('over-ons'); setMobileMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">Over Ons</button>
                <button onClick={() => { setActiveTab('tarieven'); setMobileMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">Tarieven</button>
                <button onClick={() => { setActiveTab('faq'); setMobileMenuOpen(false); }} className="text-left px-4 py-2 hover:bg-amber-50 rounded-xl font-medium">FAQ</button>
              </div>
            )}
          </header>

          <div className="max-w-4xl mx-auto w-full my-auto px-4">
            <div className="self-start mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Binnen 24u Snel & Veilig Verdelgd</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 max-w-2xl">
              Snel & Veilig van al je Wespen Af
            </h1>
            <p className="text-gray-200 text-sm sm:text-base font-light leading-relaxed mb-6 max-w-xl">
              Gecertificeerde ongediertebestrijding voor woningen en bedrijven. Met 100% seizoensgarantie en veilige, professionele methodes.
            </p>
            <button onClick={() => setActiveTab('diensten')} className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold px-7 py-3.5 rounded-full transition shadow-lg">
              <span>Direct Bestrijding Aanvragen</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>

          <div className="max-w-[1400px] mx-auto w-full"></div>
        </div>

        <div className="max-w-4xl mx-auto -mt-8 relative z-20 px-4">
          <form onSubmit={handleCalculate} className="bg-white rounded-full p-2 sm:p-3 shadow-2xl border border-amber-100 flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 w-full px-5 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-gray-100 flex items-center gap-3">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <input 
                type="text" 
                placeholder="Voer je postcode of plaats in..." 
                value={searchPostcode}
                onChange={(e) => setSearchPostcode(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex-1 w-full px-5 py-2 sm:py-0 border-b sm:border-b-0 sm:border-r border-gray-100 flex items-center gap-3">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              <select 
                value={nestType}
                onChange={(e) => setNestType(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option>Spouwmuur / Dakrand</option>
                <option>In de tuin / Grond</option>
                <option>Schuur / Garage / Zolder</option>
                <option>Hoornaar / Onbekend</option>
              </select>
            </div>
            <button type="submit" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-amber-950 font-semibold px-8 py-3.5 rounded-full transition flex items-center justify-center gap-2 shadow-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              <span>Bereken Prijs</span>
            </button>
          </form>

          {calcResult && (
            <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-950 px-6 py-3.5 rounded-3xl text-sm shadow-sm text-center font-medium animate-fade-in">
              {calcResult}
            </div>
          )}
        </div>
      </section>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-8">
        {activeTab === 'home' && (
          <div>
            {/* About / Welcome Section */}
            <section className="py-16 my-8">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Image Card with Badge */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-white">
                    <img src="https://images.unsplash.com/photo-1588615419958-3844f2203716?auto=format&fit=crop&w=800&q=80" alt="Wespennest bestrijding" className="w-full h-[360px] object-cover" />
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
                  <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Welkom bij Poulls</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-amber-950">
                    Waarom Kiezen Voor Onze Wespenbestrijding?
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Wij zijn gespecialiseerd in het snel, veilig en verantwoord verdelgen van wespennesten en hoornaars. Met jarenlange ervaring zorgen wij ervoor dat je snel weer zorgeloos van je tuin en huis kunt genieten.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4 items-center">
                    <a href="tel:0800123456" className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-semibold px-6 py-3 rounded-full transition shadow-md flex items-center gap-2 text-sm">
                      📞 Direct Bellen voor Hulp
                    </a>
                    <button onClick={() => setActiveTab('diensten')} className="text-amber-800 hover:text-amber-950 font-medium text-sm px-4 py-2 transition">
                      Bekijk Onze Diensten &rarr;
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Services Cards Section */}
            <section className="py-12 my-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Onze Service</span>
                <h2 className="text-3xl font-bold text-amber-950 mt-3 mb-3">Onze Gespecialiseerde Diensten</h2>
                <p className="text-gray-600 text-sm">Altijd inclusief vaste tarieven, snelle service binnen 24 uur en 100% seizoensgarantie.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Card 1 */}
                <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-amber-100 flex flex-col justify-between hover:shadow-md transition group">
                  <div>
                    <div className="rounded-[2rem] overflow-hidden mb-5 h-48">
                      <img src="https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=600&q=80" alt="Standaard wespennest" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-950 mb-2">Standaard Wespennest</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-6">
                      Effectieve poederbehandeling voor nesten in de spouwmuur, dakrand, schuur of tuin tot 3 meter hoogte.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-700">€ 65,- <span className="text-xs font-normal text-gray-500">all-in</span></span>
                    <a href="tel:0800123456" className="bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-semibold px-5 py-2.5 rounded-full transition">
                      Aanvragen
                    </a>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-amber-100 flex flex-col justify-between hover:shadow-md transition group">
                  <div>
                    <div className="rounded-[2rem] overflow-hidden mb-5 h-48">
                      <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80" alt="Nest op hoogte" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-950 mb-2">Nest op Grote Hoogte</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-6">
                      Speciale telescopische apparatuur voor nesten boven 3 meter hoogte op daken, in dakkapellen of hoge bomen.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-700">€ 85,- <span className="text-xs font-normal text-gray-500">all-in</span></span>
                    <a href="tel:0800123456" className="bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-semibold px-5 py-2.5 rounded-full transition">
                      Aanvragen
                    </a>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-amber-100 flex flex-col justify-between hover:shadow-md transition group">
                  <div>
                    <div className="rounded-[2rem] overflow-hidden mb-5 h-48">
                      <img src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80" alt="Hoornaar bestrijding" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-950 mb-2">Hoornaars & Aziatische Hoornaar</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-6">
                      Deskundige bestrijding van agressieve en grotere hoornaarnesten met gespecialiseerde beschermingskleding.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-700">Op offerte <span className="text-xs font-normal text-gray-500">snel ter plaatse</span></span>
                    <a href="tel:0800123456" className="bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-semibold px-5 py-2.5 rounded-full transition">
                      Aanvragen
                    </a>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {activeTab === 'diensten' && (
          <div className="py-12 max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Onze Diensten</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-amber-950 mt-3 mb-2">Professionele Bestrijdingsopties</h2>
              <p className="text-gray-600 text-sm">Kies de juiste oplossing voor jouw wespennest.</p>
            </div>
            
            <div className="grid gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-amber-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-amber-950 mb-1">Standaard Wespennest (tot 3 meter)</h3>
                  <p className="text-gray-600 text-sm">Snelle poederbehandeling direct in de vluchtopening. Veilig en binnen 24 uur resultaat.</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-amber-700 block">€ 65,-</span>
                  <a href="tel:0800123456" className="mt-2 inline-block bg-amber-500 text-amber-950 font-semibold text-xs px-4 py-2 rounded-full">Nu Bellen</a>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-amber-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-amber-950 mb-1">Nest op Grote Hoogte (dakrand / boom)</h3>
                  <p className="text-gray-600 text-sm">Gebruik van professionele telescopische lansen voor veilige bereikbaarheid.</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-amber-700 block">€ 85,-</span>
                  <a href="tel:0800123456" className="mt-2 inline-block bg-amber-500 text-amber-950 font-semibold text-xs px-4 py-2 rounded-full">Nu Bellen</a>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-amber-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-amber-950 mb-1">Hoornaarnest Verwijderen</h3>
                  <p className="text-gray-600 text-sm">Gespecialiseerde aanpak voor grote hoornaars en de Aziatische hoornaar.</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-amber-700 block">Op aanvraag</span>
                  <a href="tel:0800123456" className="mt-2 inline-block bg-amber-500 text-amber-950 font-semibold text-xs px-4 py-2 rounded-full">Direct Contact</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'over-ons' && (
          <div className="py-12 max-w-4xl mx-auto space-y-6 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-amber-100 shadow-sm my-8">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Over Ons</span>
            <h2 className="text-3xl font-bold text-amber-950">Jarenlange Ervaring in Wespenbestrijding</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Poulls Wespenexpert is al jarenlang de vertrouwde specialist in de regio voor het veilig en efficiënt bestrijden van wespennesten. Wij werken uitsluitend met gecertificeerde vakmensen en hoogwaardige middelen om mens en huisdier optimaal te beschermen.
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
          </div>
        )}

        {activeTab === 'tarieven' && (
          <div className="py-12 max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full">Transparant</span>
              <h2 className="text-3xl font-bold text-amber-950 mt-3 mb-2">Eerlijke & Vaste Tarieven</h2>
              <p className="text-gray-600 text-sm">Geen verborgen kosten, wel direct duidelijkheid.</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-amber-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-sm font-semibold text-gray-800">Standaard wespennest bestrijding</span>
                <span className="font-bold text-amber-700">€ 65,- all-in</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-sm font-semibold text-gray-800">Nest op grote hoogte (&gt; 3 meter)</span>
                <span className="font-bold text-amber-700">€ 85,- all-in</span>
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

      <footer className="mt-16 max-w-[1400px] mx-auto w-full px-4 sm:px-8 mb-4">
        <div className="bg-amber-950 text-amber-100 rounded-[2.5rem] p-8 sm:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-amber-900 pb-8 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-amber-950 font-bold">
                🐝
              </div>
              <span className="text-2xl font-bold text-white">Poulls <span className="text-amber-400 text-sm font-normal">Wespenbestrijding</span></span>
            </div>
            <div className="flex gap-6 text-sm text-amber-200">
              <button onClick={() => setActiveTab('home')} className="hover:text-white transition">Home</button>
              <button onClick={() => setActiveTab('diensten')} className="hover:text-white transition">Diensten</button>
              <button onClick={() => setActiveTab('over-ons')} className="hover:text-white transition">Over Ons</button>
              <button onClick={() => setActiveTab('faq')} className="hover:text-white transition">FAQ</button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-amber-400 gap-4">
            <p>&copy; {new Date().getFullYear()} Poulls Wespenexpert. Alle rechten voorbehouden.</p>
            <p className="flex items-center gap-2">
              <span>📞 Direct contact: 0800 - 123 456</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
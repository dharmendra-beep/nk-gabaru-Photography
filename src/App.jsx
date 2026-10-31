import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Camera, Check,
  ChevronLeft, ChevronRight, Clapperboard, Heart, Instagram, MapPin,
  Menu, Play, Quote, Sparkles, Users, Video, X
} from 'lucide-react';

const heroSlides = [
  '/images/hero-background.png',
  '/images/hero-golden-collage.png',
  '/images/hero-story-collage.jpg',
];

const photos = [
  { title: 'The Peacock Bridal Portrait', category: 'Bridal Portraits', image: '/images/bride-peacock.jpg', shape: 'tall' },
  { title: 'An Intimate Promise', category: 'Engagement', image: '/images/engagement-moment.jpg', shape: 'wide' },
  { title: 'A Wedding in Ivory', category: 'Wedding', image: '/images/ivory-wedding.jpg', shape: 'wide' },
  { title: 'A Moment Behind the Veil', category: 'Bridal Portraits', image: '/images/red-bridal-portrait.jpg', shape: 'tall' },
  { title: 'Under the Blossoms', category: 'Wedding', image: '/images/pink-wedding.jpg', shape: 'wide' },
];
const categories = ['All Stories', 'Wedding', 'Bridal Portraits', 'Engagement'];
const services = [
  { n: '01', title: 'Wedding Photography', desc: 'From varmala to vidaai, every ritual and real emotion preserved forever.', image: '/images/ivory-wedding.jpg', icon: Camera },
  { n: '02', title: 'Pre-Wedding Shoots', desc: 'A cinematic chapter of your story, captured before the big day.', image: '/images/engagement-moment.jpg', icon: Heart },
  { n: '03', title: 'Cinematic Wedding Films', desc: 'The vows, the music, the happy tears — your wedding, like a film.', image: '/images/pink-wedding.jpg', icon: Clapperboard },
  { n: '04', title: 'Haldi, Mehndi & Events', desc: 'Colourful traditions, family laughter and the beautiful in-between.', image: '/images/red-bridal-portrait.jpg', icon: Video },
];
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Stories');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Sections rise into view as the visitor scrolls down.
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const filteredPhotos = activeCategory === 'All Stories' ? photos : photos.filter((p) => p.category === activeCategory);
  const goTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const changePhoto = (direction) => {
    const index = photos.findIndex((p) => p.title === selectedPhoto.title);
    setSelectedPhoto(photos[(index + direction + photos.length) % photos.length]);
  };
  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <button className="brand" onClick={() => goTo('home')} aria-label="NK Gabru Photography home">
          <span className="brand-crown">♛</span><span className="brand-mark">N<span>K</span></span>
          <span className="brand-name">GABRU</span><span className="brand-sub">PHOTOGRAPHY</span>
        </button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          {[['Home','home'],['Our Story','story'],['Services','services'],['Portfolio','portfolio'],['Films','films'],['Contact','contact']].map(([label,id]) => (
            <button key={id} onClick={() => goTo(id)}>{label}</button>
          ))}
        </nav>
        <button className="nav-cta" onClick={() => goTo('contact')}><CalendarDays size={15}/> <span>Book a Shoot</span></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section className="hero" id="home">
          {heroSlides.map((image, index) => (
            <div
              className={`hero-image ${heroIndex === index ? 'hero-image-active' : ''}`}
              style={{ backgroundImage: `url("${image}")` }}
              key={image}
              aria-hidden="true"
            />
          ))}
          <div className="hero-vignette" />
          <div className="hero-ornament ornament-one">✳</div>
          <div className="hero-ornament ornament-two">✳</div>
          <div className="hero-content">
            <div className="eyebrow hero-eyebrow"><span /> INDIAN WEDDINGS • REAL EMOTIONS • CINEMATIC FILMS</div>
            <h1>We don’t just<br/>capture moments<span className="title-period">.</span></h1>
            <p className="script-line">We create memories.</p>
            <p className="hero-copy">From haldi and mehndi to pheras and vidaai.<br className="desktop-break"/> Every tradition, captured like a film.</p>
            <div className="hero-actions">
              <button className="btn btn-gold" onClick={() => goTo('portfolio')}>Explore our work <ArrowRight size={16}/></button>
              <button className="btn btn-outline" onClick={() => goTo('contact')}><Play size={14} fill="currentColor"/> Let’s create your story</button>
            </div>
            <div className="hero-proof"><div className="proof-avatars"><span>♥</span><span>✦</span><span>✺</span></div><p><strong>500+</strong> stories cherished<br/><small>and counting</small></p><span className="proof-divider"/><p className="proof-caption">Made with heart.<br/>Remembered forever.</p></div>
          </div>
          <div className="hero-side-note"><span>{String(heroIndex + 1).padStart(2, '0')}</span><i/><span>{String(heroSlides.length).padStart(2, '0')}</span></div>
          <button className="scroll-cue" onClick={() => goTo('services')}><span>SCROLL TO DISCOVER</span><ArrowDown size={15}/></button>
          <div className="hero-bottom-label">YOUR STORY, OUR LENS <span>✦</span> INDIA, THROUGH OUR EYES</div>
        </section>

        <section className="intro-strip">
          <span className="intro-symbol">✦</span><p>From haldi to vidaai. Every ritual, every emotion. <em>Forever in frames.</em></p><span className="intro-symbol">✦</span>
        </section>

        <section className="section services-section" id="services">
          <div className="section-heading reveal"><div><span className="eyebrow">WHAT WE DO</span><h2>Every ritual has<br/><em>a story to tell.</em></h2></div><p>From the haldi laughter and mehndi details to the pheras, varmala and vidaai tears — we capture the full story of your Indian wedding.</p></div>
          <div className="service-grid">
            {services.map(({n,title,desc,image,icon:Icon}, i) => <article className="service-card reveal" style={{'--delay':`${i*100}ms`}} key={title}>
              <div className="service-photo-wrap"><img src={image} alt={title} loading="lazy"/><span className="service-number">{n}</span><span className="service-icon"><Icon size={19}/></span><div className="service-image-shade"/></div>
              <div className="service-info"><h3>{title}</h3><p>{desc}</p><button onClick={() => goTo('contact')}>Let’s talk <ArrowUpRight size={15}/></button></div>
            </article>)}
          </div>
        </section>

        <section className="portfolio-section" id="portfolio">
          <div className="section portfolio-inner">
            <div className="section-heading light-heading reveal"><div><span className="eyebrow">INDIAN WEDDINGS • OUR FAVOURITE FRAMES</span><h2>Stories we’ve<br/><em>been honoured to tell.</em></h2></div><p>Bridal portraits, sacred rituals, joyful celebrations and cinematic frames that bring every feeling back.</p></div>
            <div className="portfolio-toolbar reveal"><div className="filter-list">{categories.map((cat) => <button className={activeCategory === cat ? 'filter active' : 'filter'} key={cat} onClick={() => setActiveCategory(cat)}>{cat}</button>)}</div><span className="gallery-count">{String(filteredPhotos.length).padStart(2,'0')} FRAMES</span></div>
            <div className="gallery-grid" key={activeCategory}>
              {filteredPhotos.map((photo,i) => <button className={`gallery-item ${photo.shape === 'tall' ? 'gallery-tall' : ''} reveal is-visible`} style={{'--delay':`${i*80}ms`}} key={photo.title} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}`}>
                <img src={photo.image} alt={photo.title} loading="lazy"/><span className="gallery-overlay"><span className="gallery-category">{photo.category}</span><strong>{photo.title}</strong><span className="gallery-open"><ArrowUpRight size={19}/></span></span>
              </button>)}
            </div>
            <div className="gallery-footer"><span>Every picture holds a thousand feelings.</span><button className="text-link" onClick={() => goTo('contact')}>Have a story for us? <ArrowRight size={16}/></button></div>
          </div>
        </section>

        <section className="film-section" id="films">
          <div className="film-photo" />
          <div className="film-content reveal"><span className="eyebrow">MORE THAN A PHOTOGRAPH</span><h2>Feel it all over<br/><em>again.</em></h2><p>Hear the dhol, relive the varmala, feel the pheras again. Our cinematic wedding films bring the sounds, rituals and emotions of your big day back to life.</p><button className="btn btn-gold" onClick={() => goTo('contact')}><Play size={14} fill="currentColor"/> Let’s make a film <ArrowRight size={16}/></button></div>
          <div className="film-stamp"><span>CRAFTED WITH</span><Heart size={20} fill="currentColor"/><span>FEELING</span></div>
        </section>

        <section className="story-section section" id="story">
          <div className="story-image-wrap reveal"><img src="/images/bride-peacock.jpg" alt="Bride in a red wedding outfit holding a peacock feather" loading="lazy"/><div className="story-image-note"><Sparkles size={16}/><span>Thoughtfully captured.<br/><em>Honestly remembered.</em></span></div></div>
          <div className="story-copy reveal"><span className="eyebrow">A LITTLE ABOUT US</span><h2>We believe your<br/>story deserves <em>to be felt.</em></h2><p>Indian weddings are full of beautiful contrasts — haldi colours, mehndi patterns, sacred pheras, dhol beats and vidaai tears. We look for the emotion in every detail, creating photographs and films that feel as real years later as they did that day.</p><p className="story-signature">With love, NK Gabru <span>✦</span></p><button className="text-link" onClick={() => goTo('contact')}>Let’s get to know each other <ArrowRight size={16}/></button>
            <div className="stats-row"><div><strong>500<span>+</span></strong><small>Happy couples</small></div><div><strong>1M<span>+</span></strong><small>Moments preserved</small></div><div><strong>10<span>+</span></strong><small>Years of craft</small></div></div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="testimonial-backdrop" />
          <div className="testimonial-content reveal"><span className="eyebrow">KIND WORDS, FULL HEARTS</span><Quote className="quote-icon" size={28}/><h2>“They didn’t just photograph<br/>our wedding. They <em>felt it with us.</em>”</h2><div className="review-stars">★★★★★</div><p>— A happy couple, with love</p><div className="testimonial-flourish">✦　✦　✦</div></div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-decoration">✳</div>
          <div className="contact-copy reveal"><span className="eyebrow">YOUR CHAPTER STARTS HERE</span><h2>Let’s make something<br/><em>beautiful together.</em></h2><p>Tell us about your date, your plans, your people. We’d love to hear what you’re dreaming up.</p><div className="contact-points"><span><Check size={15}/> Personalised conversations</span><span><Check size={15}/> Indian rituals, thoughtfully captured</span><span><Check size={15}/> Memories made to last</span></div></div>
          <form className="contact-form reveal" onSubmit={(e) => {e.preventDefault(); setFormSent(true);}}>
            <div className="form-topline"><div><span className="form-kicker">BOOK YOUR SHOOT</span><h3 className="form-title">Create Your Memories</h3></div><Sparkles size={17}/></div>
            {formSent ? <div className="form-success"><span className="success-icon"><Check size={25}/></span><h3>Thank you for reaching out!</h3><p>This is a frontend demo. Connect the form to email, WhatsApp or a backend to receive real enquiries.</p><button type="button" className="text-link" onClick={() => setFormSent(false)}>Send another enquiry <ArrowRight size={15}/></button></div> : <>
              <div className="form-row"><label>Your name<input required name="name" autoComplete="name" placeholder="Enter your full name"/></label><label>Phone number<input required name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000"/></label></div>
              <div className="form-row"><label>Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com"/></label><label>Event date<input name="date" type="date"/></label></div>
              <div className="form-row"><label>Type of shoot<select name="service" defaultValue=""><option value="" disabled>Choose an occasion</option><option>Wedding</option><option>Pre-wedding</option><option>Cinematic film</option><option>Engagement / Event</option><option>Something else</option></select></label><label>Location / city<input name="location" autoComplete="address-level2" placeholder="Where is your event?"/></label></div>
              <label>Tell us about your plans<textarea name="message" rows="2" placeholder="Share your plans, dates or anything else we should know…"/></label>
              <button className="btn btn-gold submit-btn" type="submit">Send enquiry <ArrowRight size={16}/></button><small className="form-note">We’ll be in touch soon to help plan your day.</small>
            </>}
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main"><button className="brand footer-brand" onClick={() => goTo('home')}><span className="brand-crown">♛</span><span className="brand-mark">N<span>K</span></span><span className="brand-name">GABRU</span><span className="brand-sub">PHOTOGRAPHY</span></button><p className="footer-tagline">Your traditions. Your people.<br/><em>Your story, our lens.</em></p><div className="footer-links"><span className="eyebrow">EXPLORE</span>{[['Our Story','story'],['Services','services'],['Portfolio','portfolio'],['Cinematic Films','films'],['Contact','contact']].map(([l,id]) => <button key={id} onClick={() => goTo(id)}>{l}<ArrowUpRight size={12}/></button>)}</div><div className="footer-contact"><span className="eyebrow">SAY HELLO</span><p><MapPin size={15}/> Faridabad, Haryana, India</p><p><CalendarDays size={15}/> Weddings & celebrations</p><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={16}/> Follow our frames <ArrowUpRight size={13}/></a></div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} NK Gabru Photography. All rights reserved.</span><span>Made with <Heart size={12} fill="currentColor"/> for the moments that matter.</span><button onClick={() => goTo('home')}>BACK TO TOP ↑</button></div>
      </footer>

      {selectedPhoto && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedPhoto.title} onClick={() => setSelectedPhoto(null)}><button className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close image"><X/></button><button className="lightbox-arrow lightbox-prev" onClick={(e) => {e.stopPropagation();changePhoto(-1);}} aria-label="Previous image"><ChevronLeft/></button><div className="lightbox-content" onClick={(e) => e.stopPropagation()}><img src={selectedPhoto.image} alt={selectedPhoto.title}/><div><span className="eyebrow">{selectedPhoto.category}</span><h3>{selectedPhoto.title}</h3></div></div><button className="lightbox-arrow lightbox-next" onClick={(e) => {e.stopPropagation();changePhoto(1);}} aria-label="Next image"><ChevronRight/></button></div>}
    </div>
  );
}

export default App;

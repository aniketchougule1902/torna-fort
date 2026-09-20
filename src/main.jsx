import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence
} from "framer-motion";
import "./styles.css";

const IMAGES = {
  hero: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Zunzar_Machi_at_Torna.jpg",
  machi: "https://upload.wikimedia.org/wikipedia/commons/b/bb/A_view_of_Zunjar_machi_from_torna_fort.jpg",
  gate: "https://upload.wikimedia.org/wikipedia/commons/7/79/Torna_fort_main_gate.jpg",
  archive: "https://www.adventurush.com/wp-content/uploads/2023/07/shutterstock_663979489-1.jpg",
  detail: "https://www.fortsmaharashtra.com/wp-content/uploads/2018/12/Torna-Fort-FortsMaharashtra-4-300x250.jpg"
};

const chapters = [
  { id: "arrival", label: "01", title: "The Mountain" },
  { id: "ascent", label: "02", title: "The Ascent" },
  { id: "1646", label: "03", title: "1646" },
  { id: "stones", label: "04", title: "Stone Memory" },
  { id: "archive", label: "05", title: "The Archive" }
];

const facts = [
  ["उंची", "१,४०३ मी.", "सह्याद्रीतील उंच डोंगरी किल्ला"],
  ["नाव", "प्रचंडगड", "तोरणा या नावासोबत प्रचलित ऐतिहासिक नामावली"],
  ["१६४६", "एक निर्णायक क्षण", "शिवाजी महाराजांनी तोरणा ताब्यात घेतल्याची नोंद"]
];

const history = [
  { year: "१३वे शतक", title: "प्रारंभ", text: "किल्ल्याच्या प्राचीन उत्पत्तीशी जोडले जाणारे दख्खनी डोंगरी दुर्गपरंपरेचे संदर्भ." },
  { year: "१६४६", title: "तोरण्याचा ताबा", text: "शिवाजी महाराजांनी तरुण वयात तोरणा ताब्यात घेतल्याची ऐतिहासिक नोंद." },
  { year: "१६६५", title: "पुरंदरचा तह", text: "मुघल‑मराठा संघर्षाच्या काळात तोरणासह अनेक किल्ल्यांच्या राजकीय स्थितीत बदल झाले." },
  { year: "१६७०", title: "पुन्हा मराठ्यांच्या ताब्यात", text: "किल्ल्यांच्या पुनर्ताब्याच्या मोहिमांमध्ये तोरणाचे स्थान पुन्हा महत्त्वाचे झाले." }
];

const contributors = [
  "Prasanna Dambalkar", "Shreyash Magar", "Yash Shinde", "Sanish Dalvi",
  "Amruta Thakare", "Parth Savdekar", "Krushna Belhekar", "Shivom Borkar",
  "Prachi Bute", "Krushna Surase", "Ansh Dhundale", "Sarthak Sane", "Aniket Chougule"
];

function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return <motion.div className="progress" style={{ scaleX: scale }} />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <header className="nav-wrap">
      <div className="nav">
        <button className="brand" onClick={() => go("arrival")} aria-label="Torna home">
          <span className="brand-mark">⟡</span>
          <span>तोरणा</span>
        </button>
        <div className="desktop-nav">
          {chapters.map((c) => (
            <button key={c.id} onClick={() => go(c.id)}>
              <small>{c.label}</small>{c.title}
            </button>
          ))}
        </div>
        <button className="menu" onClick={() => setOpen(v => !v)} aria-label="Menu">
          <span /><span />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
          >
            {chapters.map((c) => (
              <button key={c.id} onClick={() => go(c.id)}>{c.label} — {c.title}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "65%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, .65, 1], [1, .85, 0]);
  const haze = useTransform(scrollYProgress, [0, 1], [0, .7]);

  return (
    <section ref={ref} id="arrival" className="hero">
      <motion.div className="hero-photo" style={{ y: imageY, scale: imageScale, backgroundImage: `url(${IMAGES.hero})` }} />
      <motion.div className="hero-haze" style={{ opacity: haze }} />
      <div className="hero-grain" />
      <div className="hero-vignette" />
      <motion.div className="hero-copy" style={{ y: titleY, opacity: titleOpacity }}>
        <div className="eyebrow">DIGITAL HERITAGE EXPERIENCE · SAHYADRI</div>
        <div className="hero-rule"><span /></div>
        <h1>तोरणा</h1>
        <p className="hero-dek">THE FORT THAT BEGAN A STORY</p>
        <p className="hero-sub">प्रचंडगड · १,४०३ मीटर · महाराष्ट्र</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => document.getElementById("ascent")?.scrollIntoView({ behavior: "smooth" })}>
            Begin the ascent <span>↘</span>
          </button>
          <a className="ghost" href="#1646">Explore 1646</a>
        </div>
      </motion.div>
      <div className="hero-side-note"><span>01</span><span>ARRIVAL</span></div>
      <div className="scroll-cue">SCROLL TO CLIMB <span>↓</span></div>
    </section>
  );
}

function Ascent() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const mountainY = useTransform(scrollYProgress, [0, 1], [70, -120]);
  const mapRotate = useTransform(scrollYProgress, [0, 1], [-4, 5]);
  const lineScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 100, damping: 30 });

  return (
    <section ref={ref} id="ascent" className="ascent section">
      <div className="section-shell">
        <div className="chapter-label"><span>02</span> THE ASCENT</div>
        <div className="ascent-grid">
          <div className="sticky-copy">
            <p className="kicker">A FORT IS A LANDSCAPE</p>
            <h2>दर्‍यातून शिखराकडे.</h2>
            <p className="lead">किल्ल्याचा अनुभव एका नकाशात मावत नाही. म्हणून हा भाग “चढाई” म्हणून वाचा — प्रत्येक स्क्रोल तुम्हाला पुढच्या उंचीवर नेतो.</p>
            <div className="elevation">
              <span>BASE</span><b>VELHE</b><i>→</i><span>SUMMIT</span><b>1,403 M</b>
            </div>
            <div className="progress-track"><motion.i style={{ scaleY: lineScale }} /></div>
          </div>
          <div className="terrain-stage">
            <motion.div className="terrain-orb" style={{ y: mountainY, rotate: mapRotate }} />
            <motion.div className="contour contour-one" style={{ y: useTransform(scrollYProgress, [0,1], [40,-30]) }} />
            <motion.div className="contour contour-two" style={{ y: useTransform(scrollYProgress, [0,1], [90,-90]) }} />
            <div className="terrain-label label-base">VELHE <small>trailhead</small></div>
            <div className="terrain-label label-gate">GATE <small>historic approach</small></div>
            <div className="terrain-label label-zunjar">ZUNJAR MACHI <small>ridge</small></div>
            <div className="terrain-label label-budhla">BUDHLA MACHI <small>spur</small></div>
            <motion.div className="route-line" style={{ scaleY: lineScale }} />
            <div className="compass">N<br /><span>✦</span><br />S</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function YearMoment() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yearX = useTransform(scrollYProgress, [0, .45, 1], ["-22vw", "0vw", "22vw"]);
  const yearScale = useTransform(scrollYProgress, [0, .45, 1], [.7, 1, .84]);
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const glow = useTransform(scrollYProgress, [0, .5, 1], [0, .8, 0]);

  return (
    <section ref={ref} id="1646" className="moment section-dark">
      <motion.div className="moment-glow" style={{ opacity: glow }} />
      <motion.div className="moment-photo" style={{ y: imageY, backgroundImage: `url(${IMAGES.machi})` }} />
      <div className="moment-overlay" />
      <div className="moment-content">
        <div className="chapter-label light"><span>03</span> 1646</div>
        <motion.div className="big-year" style={{ x: yearX, scale: yearScale }}>
          1646
        </motion.div>
        <div className="moment-text">
          <p className="kicker light-text">A TURNING POINT</p>
          <h2>एक किल्ला. एक दिशा.</h2>
          <p>तोरणा ताब्यात घेतल्यानंतर त्याला “प्रचंडगड” हे नाव जोडले गेले. या घटनेला शिवाजी महाराजांच्या स्वराज्यनिर्मितीच्या आरंभीच्या टप्प्यांशी जोडून पाहिले जाते.</p>
        </div>
      </div>
    </section>
  );
}

function History() {
  return (
    <section className="history section">
      <div className="section-shell">
        <div className="history-head">
          <div>
            <div className="chapter-label"><span>03B</span> TIMELINE</div>
            <h2>वेळरेषा, पण जिवंत.</h2>
          </div>
          <p>घटना स्क्रोलसोबत उलगडतात. प्रत्येक काळासाठी एक दृश्य, एक बदल, एक संदर्भ.</p>
        </div>
        <div className="history-list">
          {history.map((item, i) => (
            <motion.article
              key={item.year}
              className="history-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .3 }}
              transition={{ delay: i * .06, duration: .7 }}
            >
              <div className="history-year">{item.year}</div>
              <div className="history-content"><h3>{item.title}</h3><p>{item.text}</p></div>
              <div className="history-index">0{i + 1}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoneMemory() {
  const hotspots = [
    { top: "19%", left: "26%", title: "दगडी बांधकाम", text: "किल्ल्याची रचना, उतार आणि नैसर्गिक भूभाग यांचा एकत्रित वापर." },
    { top: "42%", left: "67%", title: "बुरुज व माची", text: "डोंगरी किल्ल्यांच्या संरक्षणात्मक भूगोलाचा महत्त्वाचा भाग." },
    { top: "67%", left: "34%", title: "पाण्याची व्यवस्था", text: "पावसावर अवलंबून असलेल्या दुर्गांमध्ये पाणी साठवणे ही मूलभूत जीवनरेषा होती." }
  ];
  const [active, setActive] = useState(0);
  return (
    <section id="stones" className="stones section-dark">
      <div className="section-shell">
        <div className="chapter-label light"><span>04</span> STONE MEMORY</div>
        <div className="stone-head"><h2>दगड आठवतो.</h2><p>किल्ल्याची कथा केवळ राजांची नाही. ती वाटांची, पाण्याची, दगडांची आणि भूगोलाचीही आहे.</p></div>
        <div className="stone-frame">
          <div className="stone-image" style={{ backgroundImage: `url(${IMAGES.gate})` }} />
          <div className="stone-sheen" />
          {hotspots.map((spot, i) => (
            <button
              key={spot.title}
              className={`hotspot ${active === i ? "active" : ""}`}
              style={{ top: spot.top, left: spot.left }}
              onClick={() => setActive(i)}
              aria-label={spot.title}
            >
              <span />
            </button>
          ))}
          <motion.div className="stone-info" layout>
            <span>0{active + 1}</span>
            <h3>{hotspots[active].title}</h3>
            <p>{hotspots[active].text}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Archive() {
  const cards = [
    { image: IMAGES.hero, tag: "LANDSCAPE", title: "Zunjar Machi" },
    { image: IMAGES.machi, tag: "RIDGE", title: "View from the fort" },
    { image: IMAGES.gate, tag: "ARCHITECTURE", title: "Historic gate" },
    { image: IMAGES.archive, tag: "TRAIL", title: "The approach" },
    { image: IMAGES.detail, tag: "DETAIL", title: "Stone & mountain" }
  ];
  const [selected, setSelected] = useState(null);
  return (
    <section id="archive" className="archive section">
      <div className="section-shell">
        <div className="chapter-label"><span>05</span> THE ARCHIVE</div>
        <div className="archive-head"><h2>TORNA / ARCHIVE</h2><p>A visual collection designed like an expedition cabinet — less gallery, more memory.</p></div>
        <div className="archive-grid">
          {cards.map((card, i) => (
            <motion.button
              key={card.title}
              className={`archive-card card-${i + 1}`}
              onClick={() => setSelected(card)}
              whileHover={{ y: -10, rotate: i % 2 ? 1 : -1 }}
              whileTap={{ scale: .98 }}
            >
              <img src={card.image} alt={card.title} />
              <div className="archive-meta"><span>{card.tag}</span><b>{card.title}</b></div>
              <span className="archive-plus">+</span>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="lightbox-inner" initial={{ scale: .92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .92, y: 24 }} onClick={e => e.stopPropagation()}>
              <img src={selected.image} alt={selected.title} />
              <div><span>{selected.tag}</span><h3>{selected.title}</h3></div>
              <button onClick={() => setSelected(null)}>Close ×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Facts() {
  return (
    <section className="facts section">
      <div className="section-shell">
        <div className="facts-grid">
          {facts.map(([label, value, note], i) => (
            <motion.div
              key={label}
              className="fact"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .45 }}
              transition={{ delay: i * .08 }}
            >
              <span>{label}</span><strong>{value}</strong><p>{note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contributors() {
  return (
    <section className="contributors section-dark">
      <div className="section-shell">
        <div className="chapter-label light"><span>06</span> PEOPLE</div>
        <div className="contributors-head"><h2>हे स्मारक, या टीमचे.</h2><p>Digital heritage experience built by the project contributors.</p></div>
        <div className="contributors-grid">
          {contributors.map((name, i) => (
            <motion.div key={name} className="person" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 5) * .05 }}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{name}</b>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mark">तोरणा</div>
      <p>THE FORT THAT BEGAN A STORY</p>
      <div className="footer-rule" />
      <small>Interactive digital heritage project · Torna / Prachandagad</small>
    </footer>
  );
}

function App() {
  return (
    <>
      <ProgressRail />
      <Nav />
      <main>
        <Hero />
        <Ascent />
        <YearMoment />
        <History />
        <StoneMemory />
        <Archive />
        <Facts />
        <Contributors />
        <Footer />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);


import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Heart,
  Sparkles,
  Gift,
  ArrowRight,
  Flower2,
  RotateCcw,
  ExternalLink
} from 'lucide-react';

import './styles.css';

// ============================================
// EDIT YOUR VOUCHER DETAILS HERE
// ============================================
const VOUCHER = {
  momName: 'Mom',
  salonName: 'Your Favourite Salon',
  treatment: 'A little time just for you',
  value: 'Voucher details coming soon',
  expiry: 'To be confirmed',
  instructions:
    'Please present this digital voucher when redeeming. Contact the salon to confirm your appointment and any booking requirements.',
  familyMessage:
    'Thank you for all the love, care, and little things you do for us every day. Today, we hope you take a little time for yourself, because you deserve to feel just as loved as you make all of us feel. Happy birthday, with all our love.'
};

// ============================================
// FIVE HEARTS, FIVE IMAGES, FIVE MESSAGES
// Images must be inside public/memories/
// ============================================
const MESSAGES = [
  {
    title: 'Your warmth',
    message:
      'Thank you for making our house feel like home. Your warmth makes even ordinary days feel special.',
    image: '/memories/memory-1.jpg'
  },
  {
    title: 'Your kindness',
    message:
      'You always find little ways to care for everyone around you. We hope you know how much those little things mean to us.',
    image: '/memories/memory-2.jpg'
  },
  {
    title: 'Your strength',
    message:
      'Even on difficult days, you keep going for the people you love. We admire you more than words can say.',
    image: '/memories/memory-3.jpg'
  },
  {
    title: 'Our happy place',
    message:
      'Some of our favourite memories begin with you. Thank you for filling our lives with moments we will always treasure.',
    image: '/memories/memory-4.jpg'
  },
  {
    title: 'Today is for you',
    message:
      'Today, we want you to feel as loved as you have always made us feel. You deserve this little moment of happiness, Mom.',
    image: '/memories/memory-5.jpg'
  }
];

// ============================================
// DECORATIVE FLOWERS
// ============================================
function Flowers({ className = '' }) {
  return (
    <div className={`floral ${className}`} aria-hidden="true">
      <Flower2 />
      <span>✦</span>
      <Flower2 />
      <i>✧</i>
    </div>
  );
}

// ============================================
// MAIN APPLICATION
// ============================================
function App() {
  const getInitialScreen = () => {
    if (window.location.pathname === '/voucher') {
      return 'voucher';
    }

    return 'welcome';
  };

  const [screen, setScreen] = useState(getInitialScreen);
  const [found, setFound] = useState([]);
  const [message, setMessage] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);

  // Keep browser back and forward navigation working.
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;

      setScreen(path === '/voucher' ? 'voucher' : 'welcome');
      setMessage(null);
      setImageFailed(false);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Navigate to the persistent voucher URL.
  const goVoucher = () => {
    if (window.location.pathname !== '/voucher') {
      window.history.pushState({}, '', '/voucher');
    }

    setMessage(null);
    setImageFailed(false);
    setScreen('voucher');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }

    setMessage(null);
    setImageFailed(false);
    setScreen('welcome');
    window.scrollTo(0, 0);
  };

  const startGame = () => {
    setFound([]);
    setMessage(null);
    setImageFailed(false);
    setScreen('garden');
    window.scrollTo(0, 0);
  };

  // ==========================================
  // FIND A HIDDEN HEART
  // ==========================================
  const findHeart = (id) => {
    if (found.includes(id) || message !== null) {
      return;
    }

    const updatedFound = [...found, id];

    setFound(updatedFound);
    setImageFailed(false);

    setMessage({
      ...MESSAGES[id],
      heartNumber: updatedFound.length,
      isLast: updatedFound.length === MESSAGES.length
    });
  };

  // ==========================================
  // CLOSE MESSAGE AND UNLOCK THE GIFT
  // ==========================================
  const closeMessage = () => {
    if (!message) {
      return;
    }

    const unlockGift = message.isLast;

    setMessage(null);
    setImageFailed(false);

    if (unlockGift) {
      setScreen('unlock');
      window.scrollTo(0, 0);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <main className="app-shell">
      <div className="top-glow" />

      {/* HEADER */}
      <header className="site-header">
        <a
          className="brand"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            goHome();
          }}
        >
          <span className="brand-mark">
            <Flower2 size={18} />
          </span>

          <span>a little something for you</span>
        </a>

        
      </header>

      {/* ====================================== */}
      {/* SCREEN 1: WELCOME */}
      {/* ====================================== */}
      {screen === 'welcome' && (
        <section className="welcome page-content">
          <Flowers className="welcome-flowers" />

          <div className="eyebrow">
            <Sparkles size={14} />
            made with all our love
          </div>

          <div className="hero-art">
            <div className="sun-disc" />
            <div className="flower-stem stem-one">✿</div>
            <div className="flower-stem stem-two">✿</div>
            <div className="heart-float hf-one">♡</div>
            <div className="heart-float hf-two">✧</div>

            <div className="hero-heart">
              <Heart fill="currentColor" strokeWidth={1} />
            </div>
          </div>

          <p className="overline">A LITTLE BIRTHDAY SURPRISE</p>

          <h1>
            Happy Birthday,
            <br />
            <em>{VOUCHER.momName}!</em>
          </h1>

          <p className="intro">
            Today is all about you. We have a little something
            special waiting, but first, a tiny journey filled with
            reminders of how much you mean to us.
          </p>

          <button className="primary-button" onClick={startGame}>
            Let’s begin <ArrowRight size={17} />
          </button>

          <p className="tiny-note">
            <Heart size={12} fill="currentColor" />
            just for you, with love
          </p>
        </section>
      )}

      {/* ====================================== */}
      {/* SCREEN 2: HIDDEN HEART GARDEN */}
      {/* ====================================== */}
      {screen === 'garden' && (
        <section className="garden page-content">
          <div className="eyebrow">
            <Flower2 size={15} />
            a garden of love
          </div>

          <h1>
            Little things,
            <br />
            <em>big love.</em>
          </h1>

          <p className="intro">
            There are five little hearts hiding in this garden.
            Find each one to uncover a little reminder of how
            much we appreciate you.
          </p>

          <div className="progress-wrap">
            <div className="progress-label">
              <span>Your little discoveries</span>
              <strong>{found.length} / {MESSAGES.length}</strong>
            </div>

            <div className="progress-track">
              <span
                style={{
                  width: `${(found.length / MESSAGES.length) * 100}%`
                }}
              />
            </div>
          </div>

          <div
            className="garden-scene"
            aria-label="Garden with five hidden hearts"
          >
            {MESSAGES.map((item, index) => (
              <button
                key={index}
                type="button"
                className={`hidden-heart heart-${index + 1} ${
                  found.includes(index) ? 'is-found' : ''
                }`}
                onClick={() => findHeart(index)}
                aria-label={`Discover hidden heart ${index + 1}`}
                aria-pressed={found.includes(index)}
                disabled={
                  found.includes(index) || message !== null
                }
              >
                <Heart size={15} strokeWidth={1.5} />
              </button>
            ))}
          </div>

          <p className="garden-hint">
            Take your time — tap the little hearts you spot.
          </p>

          <button className="text-link back-link" onClick={goHome}>
            <RotateCcw size={14} />
            Start over
          </button>
        </section>
      )}

      {/* ====================================== */}
      {/* SCREEN 3: GIFT UNLOCK */}
      {/* ====================================== */}
      {screen === 'unlock' && (
        <section className="unlock page-content">
          <div className="eyebrow">
            <Sparkles size={14} />
            every heart, found
          </div>

          <div className="gift-illustration">
            <div className="gift-spark spark-a">✦</div>
            <div className="gift-spark spark-b">✧</div>

            <div className="gift-lid">
              <span className="ribbon-bow">♡</span>
            </div>

            <div className="gift-box">
              <div className="gift-ribbon" />
            </div>
          </div>

          <p className="overline">A LITTLE SOMETHING MORE</p>

          <h1>
            You did it,
            <br />
            <em>beautiful soul.</em>
          </h1>

          <p className="intro">
            You found every little heart. And now, there’s one
            last surprise waiting just for you.
          </p>

          <button className="primary-button" onClick={goVoucher}>
            Open your gift <Gift size={17} />
          </button>

          <p className="tiny-note">
            <Sparkles size={12} />
            wrapped up with love
          </p>
        </section>
      )}

      {/* ====================================== */}
      {/* SCREEN 4: VOUCHER */}
      {/* ====================================== */}
      {screen === 'voucher' && (
        <section className="voucher-page page-content">
          <div className="eyebrow">
            <Sparkles size={14} />
            a gift from all of us
          </div>

          <h1>
            For you,
            <br />
            <em>with love.</em>
          </h1>

          <p className="intro">
            A little time to relax, unwind, and be taken care
            of — just as you take care of everyone else.
          </p>

          <div className="real-voucher">
  <img
    src="/voucher.jpg"
    alt="Bloom Lounge birthday gift voucher for Mom"
    className="real-voucher-image"
  />

  
</div>

          <div className="family-note">
            <span className="note-icon">
              <Heart size={17} fill="currentColor" />
            </span>

            <div>
              <p className="overline">A NOTE FROM YOUR FAMILY</p>
              <p>{VOUCHER.familyMessage}</p>
            </div>
          </div>

          

          <button className="text-link back-link" onClick={goHome}>
            <RotateCcw size={14} />
            Relive your birthday surprise
          </button>

          <p className="tiny-note">
            <Heart size={12} fill="currentColor" />
            Keep this page to refer to your gift details.
          </p>
        </section>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <span>with love, always</span>
        <span className="footer-sparkles">✦　✧　✦</span>
      </footer>

      {/* ====================================== */}
      {/* PERSONAL IMAGE + MESSAGE MODAL */}
      {/* ====================================== */}
      {message && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="heart-message-title"
          onClick={closeMessage}
        >
          <div
            className="message-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {/* IMAGE */}
            <div className="modal-memory">
              {!imageFailed ? (
                <img
                  src={message.image}
                  alt={message.title}
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="memory-image-fallback">
                  <Flower2 size={38} />
                  <p>Made with love</p>
                </div>
              )}
            </div>

            <p className="overline">
              {message.isLast
                ? 'YOUR FINAL LITTLE REMINDER'
                : 'A LITTLE REMINDER'}
            </p>

            <h2 id="heart-message-title">
              {message.title}
            </h2>

            <p className="message-body">
              {message.message}
            </p>

            <p className="modal-progress">
              Heart {message.heartNumber} of {MESSAGES.length} discovered
            </p>

            <button
              className="primary-button"
              onClick={closeMessage}
            >
              {message.isLast
                ? 'See your surprise'
                : 'Find another heart'}

              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

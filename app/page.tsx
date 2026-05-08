"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Gift,
  PartyPopper,
  RotateCcw,
  Sparkles,
  Star,
  Wand2
} from "lucide-react";
import { useEffect, useState } from "react";

// Edit all birthday text here.
const birthdayText = {
  intro: "Someone special has a surprise...",
  curtain: "Ready, Anusha?",
  giftReveal: "Happy Birthday Anusha 🎂",
  message:
    "Happy Birthday Anusha! Wishing you a day full of happiness, smiles, and beautiful memories. You are an amazing friend, and I hope this year brings you success, peace, and everything you wish for.",
  final: "Once again, Happy Birthday Anusha 🎉"
};

// Replace these files with real photos in /public/photos/.
// Example: D:\anu\public\photos\photo1.jpg becomes available as /photos/photo1.jpg.
const photoMemories = [
  { src: "/photos/photo1.jpg", caption: "Sunshine saree glow" },
  { src: "/photos/photo2.jpg", caption: "Elegant evening moment" },
  { src: "/photos/photo3.jpg", caption: "Garden day memory" },
  { src: "/photos/photo4.jpg", caption: "Golden balcony light" },
  { src: "/photos/photo5.jpg", caption: "A graceful night pose" },
  { src: "/photos/photo6.jpg", caption: "Soft sky birthday sparkle" }
];

const balloonWords = ["Smile", "Joy", "Success", "Peace", "Happiness", "Love"];

const fallbackPhoto =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 450'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23e8a9b5'/%3E%3Cstop offset='.52' stop-color='%23fff2ea'/%3E%3Cstop offset='1' stop-color='%23d8b6ad'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='450' fill='url(%23g)'/%3E%3Cg fill='none' stroke='%23fff' stroke-width='14' stroke-linecap='round' stroke-linejoin='round' opacity='.86'%3E%3Cpath d='M154 318l88-94 70 70 44-48 92 72'/%3E%3Ccircle cx='406' cy='136' r='38'/%3E%3Crect x='92' y='78' width='416' height='294' rx='34'/%3E%3C/g%3E%3Ctext x='300' y='404' text-anchor='middle' font-family='Arial' font-size='28' font-weight='700' fill='%238a4f57'%3EAdd your photo%3C/text%3E%3C/svg%3E";

type ScreenProps = {
  onNext: () => void;
  onReplay?: () => void;
};

function fireConfetti(origin = { x: 0.5, y: 0.55 }) {
  confetti({
    particleCount: 120,
    spread: 80,
    startVelocity: 42,
    origin,
    colors: ["#e8a9b5", "#d8b6ad", "#f2cdbf", "#fff2ea", "#ffffff"]
  });
}

function confettiRain() {
  const end = Date.now() + 2600;

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 90,
      spread: 90,
      startVelocity: 18,
      ticks: 240,
      origin: { x: Math.random(), y: -0.05 },
      colors: ["#e8a9b5", "#d8b6ad", "#f2cdbf", "#ffffff"]
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

function Stage({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      className={`relative grid h-dvh w-screen overflow-hidden px-3 py-4 text-[#6d4746] sm:px-8 sm:py-5 ${className}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      <SparkleLayer />
      {children}
    </motion.section>
  );
}

function SparkleLayer() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {[...Array(16)].map((_, index) => (
        <motion.span
          key={index}
          className="absolute text-[#f2cdbf]"
          style={{
            left: `${8 + ((index * 23) % 84)}%`,
            top: `${6 + ((index * 17) % 82)}%`
          }}
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.2, 0.8], rotate: [0, 18, 0] }}
          transition={{ duration: 2.6 + (index % 4) * 0.4, repeat: Infinity, delay: index * 0.12 }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}

function FloatingBalloon({
  className,
  delay = 0
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`balloon ${className}`}
      animate={{ y: [0, -14, 0], rotate: [-3, 4, -3] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function NextButton({
  children,
  onClick,
  className = ""
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-full bg-[#8a4f57] px-4 py-3 text-center text-sm font-black leading-tight text-white shadow-pastel outline-none ring-[#e8a9b5]/60 transition focus:ring-4 sm:px-5 sm:text-base ${className}`}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
      <ChevronRight className="h-4 w-4" />
    </motion.button>
  );
}

function IntroScreen({ onNext }: ScreenProps) {
  return (
    <Stage className="place-items-center bg-[#2b1c1b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,182,173,0.34),transparent_28rem),radial-gradient(circle_at_10%_90%,rgba(232,169,181,0.24),transparent_22rem)]" />
      <motion.button
        type="button"
        aria-label="Pull hanging rope"
        onClick={onNext}
        className="absolute left-1/2 top-0 z-10 flex h-[36svh] w-24 -translate-x-1/2 origin-top cursor-grab flex-col items-center outline-none active:cursor-grabbing sm:h-[46vh] sm:w-28"
        animate={{ rotate: [-1.4, 1.4, -1.4] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ rotate: [-5, 4, -3, 2], y: 5 }}
        whileTap={{ y: 34, scaleY: 1.04 }}
      >
        <span className="rope-line h-full" />
        <motion.span
          className="rope-handle mt-[-2px] grid h-16 w-16 place-items-center rounded-full text-[#fff2ea] sm:h-20 sm:w-20"
          animate={{ rotate: [-7, 7, -7], scale: [1, 1.03, 1] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="relative z-10 h-5 w-5 drop-shadow sm:h-6 sm:w-6" />
        </motion.span>
      </motion.button>
      <motion.div
        className="relative z-10 mt-28 max-w-[22rem] text-center sm:mt-20 sm:max-w-4xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <p className="text-balance text-3xl font-black leading-tight tracking-normal sm:text-6xl">
          {birthdayText.intro}
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#f2cdbf] sm:mt-5 sm:text-sm sm:tracking-[0.28em]">
          Pull the glowing rope
        </p>
      </motion.div>
    </Stage>
  );
}

function CurtainScreen({ onNext }: ScreenProps) {
  return (
    <Stage className="place-items-center bg-gradient-to-br from-[#fff2ea] via-[#fbe1e4] to-[#ead1c7]">
      <motion.div
        className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#8a4f57] via-[#c77d89] to-[#e8a9b5]"
        initial={{ x: 0 }}
        animate={{ x: "-96%" }}
        transition={{ duration: 1.15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#8a4f57] via-[#c77d89] to-[#e8a9b5]"
        initial={{ x: 0 }}
        animate={{ x: "96%" }}
        transition={{ duration: 1.15, ease: "easeInOut" }}
      />
      <div className="relative z-10 px-2 text-center">
        <motion.div
          className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-white/75 shadow-pastel sm:mb-6 sm:h-24 sm:w-24"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.85, type: "spring" }}
        >
          <Wand2 className="h-9 w-9 text-[#8a4f57] sm:h-11 sm:w-11" />
        </motion.div>
        <motion.h1
          className="text-4xl font-black text-[#784349] sm:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
        >
          {birthdayText.curtain}
        </motion.h1>
        <motion.button
          type="button"
          onClick={onNext}
          className="mt-9 min-h-12 rounded-full border border-white/80 bg-white/70 px-6 py-3 font-black text-[#8a4f57] shadow-[0_0_34px_rgba(232,169,181,0.85)] outline-none ring-[#e8a9b5]/70 backdrop-blur transition focus:ring-4 sm:mt-12 sm:px-8 sm:py-4"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{ delay: 1.25, scale: { duration: 1.7, repeat: Infinity } }}
        >
          Tap to continue
        </motion.button>
      </div>
    </Stage>
  );
}

function GiftScreen({ onNext }: ScreenProps) {
  const [opened, setOpened] = useState(false);

  const openGift = () => {
    if (opened) return;
    setOpened(true);
    fireConfetti({ x: 0.5, y: 0.56 });
    window.setTimeout(onNext, 1800);
  };

  return (
    <Stage className="place-items-center bg-gradient-to-br from-[#fff2ea] via-[#fbe1e4] to-[#ead1c7]">
      <FloatingBalloon className="left-[8%] top-[18%] hidden bg-blush text-blush sm:block" />
      <FloatingBalloon className="right-[10%] top-[16%] hidden bg-lavender text-lavender sm:block" delay={0.4} />
      <div className="relative z-10 grid place-items-center text-center">
        <motion.button
          type="button"
          aria-label="Open gift box"
          onClick={openGift}
          className="relative h-56 w-56 outline-none sm:h-80 sm:w-80"
          whileTap={{ scale: 0.96 }}
        >
          <motion.div
            className="gift-lid absolute left-5 top-14 h-14 w-[calc(100%-2.5rem)] rounded-2xl bg-gradient-to-r from-[#d8b6ad] via-[#e8a9b5] to-[#f2cdbf] shadow-pastel"
            animate={opened ? { rotate: -20, y: -44, x: -18 } : { rotate: [0, 2, -2, 0], y: [0, -4, 0] }}
            transition={opened ? { duration: 0.5 } : { duration: 1.5, repeat: Infinity }}
          />
          <div className="absolute bottom-9 left-8 h-40 w-[calc(100%-4rem)] rounded-3xl bg-gradient-to-br from-[#e8a9b5] via-[#fbe1e4] to-[#d8b6ad] shadow-pastel" />
          <div className="absolute bottom-9 left-1/2 h-40 w-10 -translate-x-1/2 bg-white/75" />
          <div className="absolute bottom-28 left-8 h-9 w-[calc(100%-4rem)] bg-white/70" />
          <Gift className="absolute left-1/2 top-[58%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-[#784349]" />
          {!opened && (
            <motion.span
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/80 px-5 py-2 text-sm font-black text-[#8a4f57] shadow"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 1.3, repeat: Infinity }}
            >
              Tap the gift
            </motion.span>
          )}
        </motion.button>
        <motion.h1
          className="mt-4 max-w-[21rem] text-balance text-3xl font-black text-[#784349] sm:max-w-none sm:text-6xl"
          initial={false}
          animate={opened ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.94 }}
        >
          {birthdayText.giftReveal}
        </motion.h1>
      </div>
    </Stage>
  );
}

function PhotoScreen({ onNext }: ScreenProps) {
  return (
    <Stage className="mobile-scroll overflow-y-auto bg-gradient-to-br from-[#fff2ea] via-[#fbe1e4] to-[#ead1c7]">
      <div className="relative z-10 mx-auto grid min-h-full w-full max-w-6xl grid-rows-[auto_auto_auto] gap-3 pb-5 pt-1 sm:gap-5 sm:py-4">
        <header className="text-center">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#ad6570] sm:text-xs sm:tracking-[0.24em]">Memory clues</p>
          <h1 className="mt-1 text-2xl font-black text-[#784349] sm:text-5xl">Six beautiful photos</h1>
        </header>
        <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {photoMemories.map((photo, index) => (
            <motion.figure
              key={photo.src}
              className="flex h-[24rem] flex-col overflow-hidden rounded-2xl border border-white/75 bg-white/70 p-2 shadow-pastel backdrop-blur min-[430px]:h-72 sm:h-80 sm:rounded-3xl sm:p-3"
              initial={{ opacity: 0, y: 20, rotate: index % 2 ? 2 : -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: index * 0.12 }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                onError={(event) => {
                  event.currentTarget.src = fallbackPhoto;
                }}
                className="min-h-0 flex-1 rounded-xl object-cover sm:rounded-2xl"
              />
              <figcaption className="grid min-h-8 place-items-center pt-1 text-center text-xs font-bold leading-tight text-[#74514e] sm:min-h-9 sm:text-sm">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="sticky bottom-0 -mx-3 bg-gradient-to-t from-[#ead1c7] via-[#ead1c7]/90 to-transparent px-3 pb-1 pt-5 text-center sm:static sm:m-0 sm:bg-none sm:p-0">
          <NextButton onClick={onNext} className="w-full max-w-xs sm:w-auto sm:max-w-none">Find the next surprise</NextButton>
        </div>
      </div>
    </Stage>
  );
}

function MessageScreen({ onNext }: ScreenProps) {
  return (
    <Stage className="place-items-center bg-gradient-to-br from-[#ead1c7] via-[#fff2ea] to-[#fbe1e4]">
      <FloatingBalloon className="left-[7%] top-[14%] hidden bg-sunshine text-sunshine sm:block" />
      <FloatingBalloon className="right-[8%] bottom-[20%] hidden bg-blush text-blush sm:block" delay={0.35} />
      <motion.article
        className="relative z-10 mx-auto max-w-3xl rounded-3xl border border-white/80 bg-white/75 p-4 text-center shadow-pastel backdrop-blur sm:rounded-[2rem] sm:p-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#fbe1e4] text-[#c46b78] sm:mb-5 sm:h-16 sm:w-16">
          <Star className="h-7 w-7 fill-current sm:h-8 sm:w-8" />
        </div>
        <p className="text-balance text-base font-semibold leading-7 text-[#6d4746] sm:text-2xl sm:leading-10">
          {birthdayText.message}
        </p>
        <NextButton onClick={onNext} className="mt-6 w-full max-w-xs sm:mt-7 sm:w-auto sm:max-w-none">
          Pop the balloons
        </NextButton>
      </motion.article>
    </Stage>
  );
}

function BalloonGame({ onNext }: ScreenProps) {
  const [popped, setPopped] = useState<string[]>([]);
  const completed = popped.length === balloonWords.length;

  const popBalloon = (word: string, index: number) => {
    if (popped.includes(word)) return;
    setPopped((current) => [...current, word]);
    confetti({
      particleCount: 32,
      spread: 45,
      startVelocity: 25,
      origin: { x: 0.18 + index * 0.16, y: 0.48 },
      colors: ["#e8a9b5", "#d8b6ad", "#f2cdbf"]
    });
  };

  return (
    <Stage className="mobile-scroll overflow-y-auto bg-gradient-to-br from-[#fff2ea] via-[#fbe1e4] to-[#ead1c7]">
      <div className="relative z-10 mx-auto grid min-h-full w-full max-w-5xl grid-rows-[auto_auto_auto] place-items-center gap-3 py-2 text-center sm:gap-6 sm:py-4">
        <header>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#ad6570] sm:text-xs sm:tracking-[0.24em]">Birthday balloon game</p>
          <h1 className="mt-1 text-2xl font-black text-[#784349] sm:text-5xl">Pop all five balloons</h1>
        </header>

        <div className="grid w-full grid-cols-2 place-items-center gap-2 min-[430px]:grid-cols-3 sm:grid-cols-5 sm:gap-4">
          {balloonWords.map((word, index) => {
            const isPopped = popped.includes(word);

            return (
              <motion.button
                key={word}
                type="button"
                onClick={() => popBalloon(word, index)}
                className="relative grid h-32 w-28 place-items-center outline-none sm:h-48 sm:w-36"
                animate={isPopped ? { scale: 0.92 } : { y: [0, -12, 0] }}
                transition={isPopped ? { duration: 0.25 } : { duration: 2 + index * 0.15, repeat: Infinity }}
                aria-label={`Pop balloon for ${word}`}
              >
                {isPopped ? (
                  <motion.div
                    className="grid h-16 w-24 place-items-center rounded-2xl bg-white/80 px-3 text-base font-black text-[#8a4f57] shadow-pastel sm:h-20 sm:w-28 sm:rounded-3xl sm:text-lg"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {word}
                  </motion.div>
                ) : (
                  <>
                    <div
                      className={`h-24 w-20 rounded-[999px_999px_820px_820px] shadow-pastel sm:h-36 sm:w-28 ${
                        ["bg-blush", "bg-lavender", "bg-sunshine", "bg-mint", "bg-[#eec0c8]", "bg-[#f3b8c2]"][index]
                      }`}
                    />
                    <span className="absolute bottom-2 h-10 w-px bg-[#8a4f57]/35 sm:h-12" />
                    <span className="absolute bottom-10 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[9px] border-l-transparent border-r-transparent border-t-[#8a4f57]/30 sm:bottom-12 sm:border-l-[7px] sm:border-r-[7px] sm:border-t-[10px]" />
                  </>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="min-h-14">
          <AnimatePresence>
            {completed && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <NextButton onClick={onNext} className="w-full max-w-xs sm:w-auto sm:max-w-none">Reveal final surprise</NextButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Stage>
  );
}

function FinalScreen({ onReplay }: ScreenProps) {
  useEffect(() => {
    confettiRain();
  }, []);

  return (
    <Stage className="place-items-center bg-[#2b1c1b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(232,169,181,0.34),transparent_24rem),radial-gradient(circle_at_70%_12%,rgba(242,205,191,0.24),transparent_20rem),radial-gradient(circle_at_20%_80%,rgba(216,182,173,0.32),transparent_24rem)]" />
      <motion.div
        className="relative z-10 max-w-5xl px-2 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-white/12 text-[#f2cdbf] backdrop-blur sm:mb-7 sm:h-24 sm:w-24"
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <PartyPopper className="h-10 w-10 sm:h-12 sm:w-12" />
        </motion.div>
        <motion.h1
          className="text-balance text-4xl font-black leading-tight tracking-normal sm:text-7xl lg:text-8xl"
          animate={{
            textShadow: [
              "0 0 18px rgba(242,205,191,0.25)",
              "0 0 34px rgba(232,169,181,0.55)",
              "0 0 18px rgba(242,205,191,0.25)"
            ]
          }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          {birthdayText.final}
        </motion.h1>
        <motion.button
          type="button"
          onClick={onReplay}
          className="mt-8 inline-flex min-h-12 max-w-full items-center gap-2 rounded-full bg-[#fff2ea] px-6 py-3 text-sm font-black text-[#784349] shadow-[0_0_36px_rgba(242,205,191,0.42)] outline-none ring-[#f2cdbf]/60 focus:ring-4 sm:mt-10 sm:px-7 sm:py-4 sm:text-base"
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <RotateCcw className="h-5 w-5" />
          Replay Surprise
        </motion.button>
      </motion.div>
    </Stage>
  );
}

export default function BirthdaySurpriseApp() {
  const [screenIndex, setScreenIndex] = useState(0);

  const nextScreen = () => {
    setScreenIndex((current) => Math.min(current + 1, 6));
  };

  const replay = () => {
    setScreenIndex(0);
  };

  const screen = (() => {
    switch (screenIndex) {
      case 0:
        return <IntroScreen onNext={nextScreen} />;
      case 1:
        return <CurtainScreen onNext={nextScreen} />;
      case 2:
        return <GiftScreen onNext={nextScreen} />;
      case 3:
        return <PhotoScreen onNext={nextScreen} />;
      case 4:
        return <MessageScreen onNext={nextScreen} />;
      case 5:
        return <BalloonGame onNext={nextScreen} />;
      case 6:
        return <FinalScreen onNext={nextScreen} onReplay={replay} />;
      default:
        return <IntroScreen onNext={nextScreen} />;
    }
  })();

  return (
    <main className="h-dvh w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <div className="h-full" key={screenIndex}>{screen}</div>
      </AnimatePresence>
    </main>
  );
}

"use client";

import { Quote } from "lucide-react";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Sophie M.",
    role: "Grade 12",
    company: "Dentons Law Firm",
    text: "My internship at Dentons opened my eyes to the world of international law. I got to sit in on real client meetings and even helped draft a contract.",
    color: "#dde2ff",
  },
  {
    name: "Daniel K.",
    role: "Grade 11",
    company: "Telcotrend Kft",
    text: "Working with real developers on actual software projects was incredible. I learned more in two weeks than a whole semester of computer science class.",
    color: "#ffcaf2",
  },
  {
    name: "Mia L.",
    role: "Grade 12",
    company: "Four Seasons Hotel",
    text: "The Four Seasons team treated me like a real colleague. I rotated through events, guest services, and F&B — now I know hospitality management is my future.",
    color: "#ffe68e",
  },
  {
    name: "Aarav P.",
    role: "Grade 11",
    company: "UNLEASH.ai",
    text: "Helping organize a global HR tech event was an experience I'll never forget. The energy, the speakers, the behind-the-scenes logistics — absolutely mind-blowing.",
    color: "#c8f5e3",
  },
  {
    name: "Emma T.",
    role: "Grade 12",
    company: "Budapest Business Journal",
    text: "I had my first article published! Seeing my byline in a real business publication gave me the confidence to pursue journalism at university.",
    color: "#dde2ff",
  },
  {
    name: "Lucas R.",
    role: "Grade 11",
    company: "Mercedes-Benz",
    text: "Touring the Kecskemét factory and seeing how precision engineering works at scale was awe-inspiring. The engineers were so generous with their time.",
    color: "#ffcaf2",
  },
  {
    name: "Hana S.",
    role: "Grade 12",
    company: "Vinyl Creative",
    text: "I designed a real logo for a client during my internship! The creative directors gave me so much freedom while guiding me through the professional design process.",
    color: "#ffe68e",
  },
  {
    name: "Marco V.",
    role: "Grade 11",
    company: "Ferrari Budapest",
    text: "Being surrounded by Ferraris every day was a dream. But what I really valued was learning about luxury brand management and customer experience.",
    color: "#c8f5e3",
  },
];

const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4, 8);

function Card({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="shrink-0 w-[340px] rounded-3xl p-7"
      style={{ backgroundColor: t.color + "80" }}
    >
      <Quote className="w-6 h-6 text-primary-dark/15 mb-3" />
      <p className="text-[14px] text-neutral-dark leading-relaxed mb-5 italic">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary-dark font-bold text-sm font-[var(--font-heading)] shadow-sm">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-primary-dark">{t.name}</p>
          <p className="text-[11px] text-neutral-light">
            {t.role} — {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: (typeof testimonials);
  direction: "left" | "right";
  speed: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let pos = direction === "left" ? 0 : -(el.scrollWidth / 3);
    let animId: number;

    const step = () => {
      if (direction === "left") {
        pos -= speed;
        if (pos <= -(el.scrollWidth / 3)) pos = 0;
      } else {
        pos += speed;
        if (pos >= 0) pos = -(el.scrollWidth / 3);
      }
      el.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [direction, speed]);

  // Triple the items for seamless loop
  const tripled = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden">
      <div ref={scrollRef} className="flex gap-5 will-change-transform">
        {tripled.map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="space-y-5 -mx-6 lg:-mx-10">
      <MarqueeRow items={row1} direction="left" speed={0.5} />
      <MarqueeRow items={row2} direction="right" speed={0.4} />
    </div>
  );
}

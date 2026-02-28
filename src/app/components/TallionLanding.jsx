"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════
// TALLION — PREMIUM LANDING PAGE
// Nav · Hero + 3D Card · Problem · Benefits · Comparison
// How It Works · Use Cases · API · CTA · Footer
// ═══════════════════════════════════════════════════════════════

// ─── SCROLL REVEAL ───
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

// ─── RESPONSIVE HOOK ───
function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth < bp); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, [bp]);
  return m;
}
function useIsTablet(bp = 1024) {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth < bp); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, [bp]);
  return m;
}

// ─── SECTION HEADER ───
function SectionHeader({ label, title, subtitle, center = true, maxSubWidth = 520 }) {
  return (
    <Reveal>
      <div style={{ textAlign: center ? "center" : "left", marginBottom: 56 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold-muted)", marginBottom: 16 }}>{label}</div>
        <h2 style={{ fontSize: "clamp(30px, 3.5vw, 46px)", fontWeight: 600, lineHeight: 1.18, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: subtitle ? 16 : 0 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: maxSubWidth, margin: center ? "0 auto" : 0 }}>{subtitle}</p>}
      </div>
    </Reveal>
  );
}

// ═══════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════
function Nav() {
  const mob = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(5, 5, 5, 0.8)",
      backdropFilter: "blur(24px) saturate(1.2)", WebkitBackdropFilter: "blur(24px) saturate(1.2)",
      borderBottom: `1px solid rgba(212, 169, 64, ${scrolled ? 0.08 : 0.04})`,
      padding: mob ? "14px 20px" : "18px 48px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      animation: "fadeIn 0.8s ease",
      transition: "border-color 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <Image src="/images/tallion-icon-256.png" alt="Tallion" width={36} height={36} style={{ borderRadius: 9 }} />
        <span style={{ fontSize: 20, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.12em" }}>tallion</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {!mob && ["For you", "Developers", "Vision"].map((label, i) => (
          <a key={i} href={`#${["benefits", "developers", "vision"][i]}`} style={{
            fontSize: 13, fontWeight: 500, color: "var(--text-muted)", padding: "8px 18px",
            borderRadius: 8, textDecoration: "none", transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
          >{label}</a>
        ))}
        <a href="#cta" style={{
          fontSize: 13, fontWeight: 600, color: "#0a0a0a", background: "var(--gold)",
          padding: "8px 18px", borderRadius: 8, textDecoration: "none",
          transition: "all 0.2s", marginLeft: mob ? 0 : 8,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--gold-light)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >Get early access</a>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════
// HERO CARD — TWO-LAYER PNG SYSTEM
// ═══════════════════════════════════════════════
function TallionCard() {
  const cardRef = useRef(null);
  const mob = useIsMobile();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (mob) return;
    const handleMouse = (e) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / rect.width;
      const dy = (e.clientY - centerY) / rect.height;
      setRotation({ x: -dy * 5, y: dx * 8 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mob]);

  const cardW = mob ? 340 : 500;

  return (
    <div style={{
      position: "relative", display: "flex", flexDirection: "column",
      alignItems: "center", animation: "fadeIn 1.2s ease 0.3s both",
    }}>
      {/* LAYER 1 — Card image (floats + tilts) */}
      <div style={{ perspective: 1200 }}>
        <div
          ref={cardRef}
          style={{
            animation: mob ? "none" : "float 5s ease-in-out infinite",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: mob ? "none" : "transform 0.15s ease-out",
          }}
        >
          <Image
            src="/images/card-hero/tallion-card-hero.png"
            alt="Tallion gold card"
            width={cardW}
            height={Math.round(cardW * 0.63)}
            priority={true}
            style={{ display: "block", width: cardW, height: "auto" }}
          />
        </div>
      </div>

      {/* LAYER 2 — Reflection (anchored, does NOT float or tilt) */}
      {!mob && (
        <div style={{
          position: "relative", marginTop: -10,
          opacity: 0.5, pointerEvents: "none",
        }}>
          <Image
            src="/images/card-hero/tallion-card-reflection.png"
            alt=""
            width={cardW}
            height={Math.round(cardW * 0.63)}
            style={{ display: "block", width: cardW, height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════
function Hero() {
  const mob = useIsMobile();
  const tab = useIsTablet();

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: mob ? "120px 20px 60px" : "120px 48px 80px", position: "relative" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,169,64,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{
        display: "grid",
        gridTemplateColumns: tab ? "1fr" : "1fr 1fr",
        gap: tab ? 48 : 80,
        maxWidth: 1240, width: "100%", position: "relative",
        alignItems: "center",
      }}>
        {/* Card first on mobile/tablet */}
        {tab && (
          <div style={{ animation: "fadeIn 1.2s ease 0.3s both", display: "flex", justifyContent: "center" }}>
            <TallionCard />
          </div>
        )}

        {/* Left: content */}
        <div style={{ animation: "fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1)", textAlign: tab ? "center" : "left" }}>
          {/* Mobile brand badge */}
          {tab && (
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32, justifyContent: "center" }}>
              <Image src="/images/tallion-icon-256.png" alt="Tallion" width={56} height={56} style={{ borderRadius: 14 }} />
              <span style={{ fontSize: 28, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.12em" }}>tallion</span>
            </div>
          )}

          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(212, 169, 64, 0.12)", borderRadius: 20,
            padding: "6px 14px", marginBottom: 24,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: "var(--gold)", animation: "pulseGlow 2s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-muted)" }}>Now in private beta</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(38px, 4.2vw, 58px)", fontWeight: 600, lineHeight: 1.12,
            letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 20,
          }}>
            Your agents can finally{" "}
            <em style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>pay for things</em>
          </h1>

          {/* Subtext */}
          <p style={{ fontSize: 17, fontWeight: 400, lineHeight: 1.75, color: "var(--text-muted)", maxWidth: tab ? 520 : 480, margin: tab ? "0 auto 32px" : "0 0 32px" }}>
            AI agents book flights, find deals, and manage your money. Tallion gives them secure, programmable cards — with rules you control and rewards you earn.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap", justifyContent: tab ? "center" : "flex-start", flexDirection: mob ? "column" : "row" }}>
            <a href="#cta" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "14px 30px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
              color: "#0a0a0a", fontSize: 15, fontWeight: 700, textDecoration: "none",
              position: "relative", overflow: "hidden",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,169,64,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >Get early access →</a>
            <a href="#developers" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "14px 30px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)", background: "transparent",
              color: "var(--text-muted)", fontSize: 15, fontWeight: 500, textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >I'm a developer</a>
          </div>

          {/* Proof stats */}
          <div style={{ display: "flex", gap: mob ? 24 : 48, justifyContent: tab ? "center" : "flex-start", flexWrap: "wrap" }}>
            {[
              { v: "80M+", l: "merchants day one" },
              { v: "<30s", l: "card creation" },
              { v: "$0", l: "fraud liability" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "var(--gold)" }}>{s.v}</div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Card (desktop only) */}
        {!tab && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TallionCard />
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {!mob && (
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-dim)" }}>Scroll</span>
          <div style={{ width: 1, height: 40, position: "relative", overflow: "hidden", background: "linear-gradient(to bottom, rgba(212,169,64,0.15), transparent)" }}>
            <div style={{ position: "absolute", width: 1, height: 8, background: "var(--gold)", animation: "scrollDown 2s linear infinite" }} />
          </div>
        </div>
      )}
    </section>
  );
}

// ═══════════════════════════════════════════════
// PROBLEM SECTION
// ═══════════════════════════════════════════════
function Problem() {
  return (
    <section style={{ padding: "140px 48px", maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
      <Reveal>
        <p style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 400, lineHeight: 1.65, color: "var(--text-muted)", marginBottom: 48 }}>
          AI agents can research, compare, and recommend. But the moment they need to <span style={{ color: "var(--gold)", fontWeight: 500 }}>pay</span>, everything breaks.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p style={{ fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 400, lineHeight: 1.65, color: "var(--text-muted)" }}>
          You wouldn't hand your wallet to a stranger. <span style={{ color: "var(--text)", fontWeight: 500 }}>Why give your credit card to an AI with no guardrails?</span>
        </p>
      </Reveal>
      {/* Divider */}
      <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, var(--gold-muted), transparent)", margin: "100px auto", opacity: 0.4 }} />
    </section>
  );
}

// ═══════════════════════════════════════════════
// BENEFITS
// ═══════════════════════════════════════════════
function Benefits() {
  const mob = useIsMobile();
  const tab = useIsTablet();

  const cards = [
    { icon: "\u{1F6E1}", title: "Zero exposure", text: "Your real card never touches a merchant. Each agent gets a unique virtual card that auto-expires after use. No leaked numbers, no fraud risk." },
    { icon: "\u26A1", title: "Your rules, enforced", text: "Set limits per agent, per merchant, per category. Your travel agent books flights \u2014 nothing else. $500 ceiling, airlines only, expires Friday." },
    { icon: "\u{1F441}", title: "Total visibility", text: "Every transaction in real time. Full audit trail of what the agent compared, why it chose this purchase, and how much it saved you." },
    { icon: "\u{1F4B0}", title: "Earn as they spend", text: "Cashback on every agent transaction. The more your agents transact, the higher your tier. Efficiency bonuses when agents beat your budget." },
  ];

  return (
    <section id="benefits" style={{ padding: mob ? "80px 20px" : "100px 48px", maxWidth: 1240, margin: "0 auto" }}>
      <SectionHeader
        label="WHY TALLION"
        title="Let your agents spend. Never lose control."
        subtitle="Every AI agent gets an isolated, programmable card. You define the rules. You see every transaction. You earn rewards."
      />
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "1fr 1fr" : "repeat(4, 1fr)", gap: 20 }}>
        {cards.map((c, i) => (
          <Reveal key={i} delay={0.1 * (i + 1)}>
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16,
              padding: "36px 28px", transition: "all 0.3s ease", position: "relative", overflow: "hidden", height: "100%",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "var(--bg-elevated)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "var(--bg-card)"; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, rgba(212,169,64,0.1), rgba(212,169,64,0.04))",
                border: "1px solid rgba(212,169,64,0.08)", fontSize: 20, marginBottom: 20,
              }}>{c.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{c.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// COMPARISON
// ═══════════════════════════════════════════════
function Comparison() {
  const mob = useIsMobile();

  const oldItems = [
    "Full card number exposed to every merchant",
    "No spending limits \u2014 agent can charge anything",
    "No visibility into what the agent did",
    "Compromised? Cancel everything",
    "One card for all agents",
    "Zero rewards on agent spend",
  ];
  const newItems = [
    "Isolated virtual card per agent, per task",
    "Custom limits by amount, merchant, category",
    "Full audit trail with real-time alerts",
    "Agent goes rogue? Kill that one card",
    "Separate wallets and budgets per agent",
    "Cashback + efficiency rewards",
  ];

  return (
    <section style={{ padding: mob ? "80px 20px" : "100px 48px", maxWidth: 920, margin: "0 auto" }}>
      <SectionHeader
        label="THE DIFFERENCE"
        title="Stop sharing your card blindly"
      />
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr auto 1fr", gap: mob ? 20 : 0, alignItems: "stretch" }}>
        {/* Old way */}
        <Reveal delay={0.1}>
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16,
            padding: mob ? "32px 24px" : "44px 36px", opacity: 0.65,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dim)", marginBottom: 24 }}>Your credit card, raw</div>
            {oldItems.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ color: "#5a3a3a", fontSize: 13, flexShrink: 0, marginTop: 1 }}>✕</span>
                <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--text-muted)" }}>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* VS */}
        {!mob && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dim)", letterSpacing: "0.1em" }}>vs</span>
          </div>
        )}

        {/* New way */}
        <Reveal delay={0.2}>
          <div style={{
            background: "linear-gradient(180deg, rgba(212,169,64,0.03) 0%, var(--bg-card) 100%)",
            border: "1px solid rgba(212, 169, 64, 0.15)", borderRadius: 16,
            padding: mob ? "32px 24px" : "44px 36px",
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)", marginBottom: 24 }}>Through Tallion</div>
            {newItems.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ color: "var(--gold)", fontSize: 12, flexShrink: 0, marginTop: 2 }}>◆</span>
                <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--text-muted)" }}>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// HOW IT WORKS
// ═══════════════════════════════════════════════
function HowItWorks() {
  const mob = useIsMobile();

  const steps = [
    { num: "01", title: "Fund your wallet", desc: "Link your bank account. Transfer funds via ACH \u2014 free, instant, no credit card fees. Your balance earns interest while it waits." },
    { num: "02", title: "Set the rules", desc: "Define spend limits, approved merchants, category restrictions, and approval workflows for each agent. \u201CUp to $2K at airlines. Nothing else.\u201D" },
    { num: "03", title: "Let them transact", desc: "Each agent gets its own virtual card. They spend within your rules, you get notified instantly, and you earn cashback on every dollar." },
  ];

  return (
    <section style={{ padding: mob ? "80px 20px" : "100px 48px", maxWidth: 1240, margin: "0 auto" }}>
      <SectionHeader label="HOW IT WORKS" title="Three steps. Full control." />
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
        {steps.map((s, i) => (
          <Reveal key={i} delay={0.1 * (i + 1)}>
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16,
              padding: "40px 32px", transition: "all 0.3s ease", height: "100%",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                fontSize: 56, fontWeight: 800, lineHeight: 1,
                background: "linear-gradient(180deg, rgba(212,169,64,0.12), rgba(212,169,64,0.02))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                marginBottom: 20,
              }}>{s.num}</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--gold)", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// USE CASES
// ═══════════════════════════════════════════════
function UseCases() {
  const mob = useIsMobile();
  const tab = useIsTablet();

  const cases = [
    { tag: "TRAVEL", title: "Flights, hotels, car rentals", desc: "AI finds the best itinerary, books it end-to-end. Card auto-expires after the trip. Budget capped, receipts collected." },
    { tag: "SHOPPING", title: "Price drops & restocks", desc: "Set a target price. Agent monitors and purchases the instant it hits. Unique card per buy, auto-voided after checkout." },
    { tag: "SUBSCRIPTIONS", title: "SaaS, streaming, utilities", desc: "Dedicated cards per subscription. Agent audits charges monthly, cancels unused services, negotiates better rates." },
    { tag: "PROCUREMENT", title: "Supplies & services", desc: "Multiple agents handle different vendors. Per-vendor limits, automatic receipts, expense categorization." },
    { tag: "PERSONAL", title: "Errands & deliveries", desc: "Groceries, pharmacy, dry cleaning. Agent orders what you need with a card that only works at approved stores." },
    { tag: "RESEARCH", title: "APIs & data access", desc: "Agent needs premium databases or paid searches. Micro-budget cards with per-query limits." },
  ];

  return (
    <section style={{ padding: mob ? "80px 20px" : "100px 48px", maxWidth: 1240, margin: "0 auto" }}>
      <SectionHeader label="USE CASES" title="One wallet. Every agent." />
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : tab ? "1fr 1fr" : "repeat(3, 1fr)", gap: 20 }}>
        {cases.map((c, i) => (
          <Reveal key={i} delay={0.1 * ((i % 3) + 1)}>
            <div style={{
              padding: "32px 28px", borderRadius: 14, border: "1px solid var(--border)",
              background: "var(--bg-card)", transition: "all 0.3s ease", height: "100%",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{
                display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--gold-deep)",
                border: "1px solid rgba(212,169,64,0.1)", borderRadius: 4,
                padding: "4px 10px", marginBottom: 16,
              }}>{c.tag}</span>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// DEVELOPER API SECTION
// ═══════════════════════════════════════════════
function ApiSection() {
  const mob = useIsMobile();
  const tab = useIsTablet();

  return (
    <section id="developers" style={{ padding: mob ? "80px 20px" : "100px 48px", maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: tab ? "1fr" : "1fr 1.15fr", gap: tab ? 48 : 72, alignItems: "center" }}>
        {/* Left */}
        <Reveal>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold-muted)", marginBottom: 16 }}>FOR DEVELOPERS</div>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 600, lineHeight: 1.2, color: "var(--text)", marginBottom: 20 }}>Three lines to first payment</h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 16 }}>
              Tallion's API handles card issuing, spend controls, KYC, compliance, and settlement. You build the intelligence — we handle the money.
            </p>
            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 32 }}>
              Issue virtual cards, set programmable rules, monitor transactions in real time, and earn interchange revenue on every dollar your users' agents spend.
            </p>
            <a href="#cta" style={{
              display: "inline-flex", padding: "14px 30px", borderRadius: 10,
              background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
              color: "#0a0a0a", fontSize: 15, fontWeight: 700, textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,169,64,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >View API docs →</a>
          </div>
        </Reveal>

        {/* Right: Code block */}
        <Reveal delay={0.2}>
          <div style={{
            background: "#0a0a0a", border: "1px solid var(--border)", borderRadius: 16,
            overflow: "hidden", position: "relative",
          }}>
            {/* Top glow line */}
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, var(--gold-muted), transparent)", opacity: 0.4 }} />

            {/* Header dots */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.08)" }} />
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.08)" }} />
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Code */}
            <pre style={{
              padding: "24px 24px", margin: 0, overflowX: "auto",
              fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
              fontSize: 13, lineHeight: 1.7,
            }}>
              <code>
                <span style={{ color: "var(--text-dim)" }}>{"// Issue a card for an AI agent"}</span>{"\n"}
                <span style={{ color: "var(--gold)" }}>const</span> <span style={{ color: "var(--text-muted)" }}>card</span> <span style={{ color: "var(--text-dim)" }}>=</span> <span style={{ color: "var(--gold)" }}>await</span> <span style={{ color: "#a0c4a0" }}>tallion.cards.create</span><span style={{ color: "var(--text-dim)" }}>{"({"}</span>{"\n"}
                <span style={{ color: "var(--text-muted)" }}>{"  agent_id"}</span><span style={{ color: "var(--text-dim)" }}>: </span><span style={{ color: "#7a9e7a" }}>{'"travel-agent-01"'}</span><span style={{ color: "var(--text-dim)" }}>,</span>{"\n"}
                <span style={{ color: "var(--text-muted)" }}>{"  spend_limit"}</span><span style={{ color: "var(--text-dim)" }}>: </span><span style={{ color: "var(--text-muted)" }}>2000_00</span><span style={{ color: "var(--text-dim)" }}>,</span>{"\n"}
                <span style={{ color: "var(--text-muted)" }}>{"  currency"}</span><span style={{ color: "var(--text-dim)" }}>: </span><span style={{ color: "#7a9e7a" }}>{'"USD"'}</span><span style={{ color: "var(--text-dim)" }}>,</span>{"\n"}
                <span style={{ color: "var(--text-muted)" }}>{"  allowed_categories"}</span><span style={{ color: "var(--text-dim)" }}>: [</span><span style={{ color: "#7a9e7a" }}>{'"airlines"'}</span><span style={{ color: "var(--text-dim)" }}>, </span><span style={{ color: "#7a9e7a" }}>{'"hotels"'}</span><span style={{ color: "var(--text-dim)" }}>],</span>{"\n"}
                <span style={{ color: "var(--text-muted)" }}>{"  expires"}</span><span style={{ color: "var(--text-dim)" }}>: </span><span style={{ color: "#7a9e7a" }}>{'"after_first_use"'}</span><span style={{ color: "var(--text-dim)" }}>,</span>{"\n"}
                <span style={{ color: "var(--text-dim)" }}>{"})"}</span><span style={{ color: "var(--text-dim)" }}>;</span>{"\n\n"}
                <span style={{ color: "var(--text-dim)" }}>{"// Card is live. Agent can transact."}</span>{"\n"}
                <span style={{ color: "#a0c4a0" }}>console.log</span><span style={{ color: "var(--text-dim)" }}>(</span><span style={{ color: "var(--text-muted)" }}>card.number</span><span style={{ color: "var(--text-dim)" }}>, </span><span style={{ color: "var(--text-muted)" }}>card.cvv</span><span style={{ color: "var(--text-dim)" }}>)</span><span style={{ color: "var(--text-dim)" }}>;</span>
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// CTA
// ═══════════════════════════════════════════════
function Cta() {
  const mob = useIsMobile();
  return (
    <section id="cta" style={{ padding: mob ? "100px 20px" : "160px 48px", textAlign: "center", position: "relative" }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,169,64,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <Reveal>
        <h2 style={{
          fontSize: "clamp(34px, 4.5vw, 54px)", fontWeight: 600, letterSpacing: "-0.03em",
          lineHeight: 1.15, marginBottom: 20, position: "relative",
        }}>
          Your agents are ready.{" "}
          <em style={{
            fontStyle: "normal",
            background: "linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Give them a wallet.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.15}>
        <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Join the waitlist for early access. Be the first to give your AI agents the power to pay — safely.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#" style={{
            display: "inline-flex", padding: "14px 30px", borderRadius: 10,
            background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
            color: "#0a0a0a", fontSize: 15, fontWeight: 700, textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,169,64,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >Join the waitlist →</a>
          <a href="#developers" style={{
            display: "inline-flex", padding: "14px 30px", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.1)", background: "transparent",
            color: "var(--text-muted)", fontSize: 15, fontWeight: 500, textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "var(--text)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >Read the docs</a>
        </div>
      </Reveal>
    </section>
  );
}

// ═══════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════
function Footer() {
  const mob = useIsMobile();
  return (
    <footer id="vision" style={{
      padding: mob ? "32px 20px" : "40px 48px",
      borderTop: "1px solid rgba(255,255,255,0.03)",
    }}>
      <div style={{
        maxWidth: 1240, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexDirection: mob ? "column" : "row", gap: 16, textAlign: mob ? "center" : "left",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/images/tallion-icon-64.png" alt="Tallion" width={26} height={26} style={{ borderRadius: 6 }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--gold-muted)" }}>tallion</span>
        </div>
        <div style={{ display: "flex", gap: mob ? 16 : 24, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "Docs", href: "#developers" },
            { label: "API", href: "#developers" },
            { label: "Vision", href: "#vision" },
            { label: "Twitter", href: "https://x.com/tallionhq" },
            { label: "GitHub", href: "https://github.com/tallion-hq" },
          ].map((link, i) => (
            <a key={i} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ fontSize: 12, color: "var(--text-dim)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--text-muted)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
            >{link.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════
// MAIN LANDING PAGE
// ═══════════════════════════════════════════════
export default function TallionLanding() {
  return (
    <>
      {/* Grain overlay */}
      <div style={{
        position: "fixed", top: "-50%", left: "-50%", width: "200%", height: "200%",
        zIndex: 10000, pointerEvents: "none", opacity: 0.015,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        animation: "grain 4s steps(6) infinite",
      }} />

      <Nav />
      <Hero />
      <Problem />
      <Benefits />
      <Comparison />
      <HowItWorks />
      <UseCases />
      <ApiSection />
      <Cta />
      <Footer />
    </>
  );
}

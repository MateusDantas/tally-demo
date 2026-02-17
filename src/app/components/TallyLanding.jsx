"use client";
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// TALLY — LANDING PAGE
// Developer-first · Investor tab · Vision memo
// ═══════════════════════════════════════════════════════════════

const C = {
  gold: "#BFA36D", goldM: "#917A4A", goldL: "#D4C4A0",
  bg: "#050505", bgS: "#0A0A09",
  bd: "rgba(255,255,255,0.04)", bdH: "rgba(255,255,255,0.08)",
  tx: "#EDE8DF", txS: "#B8B0A2", txM: "#6B6560", txF: "#3D3935",
  grn: "#6FCF97", red: "#EB5757", blu: "#6B9FD4", purple: "#A78BFA",
};
const F = {
  d: "var(--font-sora), 'DM Sans', sans-serif",
  b: "var(--font-dm-sans), sans-serif",
  m: "var(--font-jetbrains), 'IBM Plex Mono', monospace",
};

const Shield = ({s=15,c=C.gold}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const Arrow = ({s=14,c=C.txF}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const Chk = ({s=13,c=C.grn}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

function FadeIn({ children, delay = 0, style = {} }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>{children}</div>;
}

// ─── CODE BLOCK ───
function Code({ children, title, lang = "javascript" }) {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${C.bd}`, background: "rgba(255,255,255,0.015)" }}>
      {title && <div style={{ padding: "10px 16px", borderBottom: `1px solid ${C.bd}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: C.txM, fontFamily: F.b, fontWeight: 500 }}>{title}</span>
        <span style={{ fontSize: 9, color: C.txF, fontFamily: F.m, letterSpacing: 1 }}>{lang.toUpperCase()}</span>
      </div>}
      <pre style={{ padding: "18px 20px", margin: 0, fontFamily: F.m, fontSize: 12.5, lineHeight: 1.7, color: C.txS, overflowX: "auto", WebkitFontSmoothing: "antialiased" }}>{children}</pre>
    </div>
  );
}

function CodeLine({ k, v, c = C.txS, kc = C.gold }) {
  return <div><span style={{ color: kc }}>{k}</span><span style={{ color: C.txF }}>: </span><span style={{ color: c }}>{v}</span></div>;
}

// ─── STAT CARD ───
function Stat({ value, label, sub, color = C.gold }) {
  return (
    <div style={{ padding: "28px 24px", borderRadius: 16, background: `${color}04`, border: `1px solid ${color}10` }}>
      <div style={{ fontSize: 36, fontFamily: F.d, color, letterSpacing: -1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 13, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════
function Hero({ onNav }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 24px", position: "relative" }}>
      {/* Subtle radial glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}06 0%, transparent 70%)`, pointerEvents: "none" }} />

      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px ${C.gold}30` }}><Shield s={18} c={C.bg}/></div>
          <span style={{ fontFamily: F.b, fontWeight: 600, fontSize: 18, color: C.gold, letterSpacing: 0.5 }}>Tally</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <h1 style={{ fontFamily: F.d, fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 400, color: C.tx, textAlign: "center", lineHeight: 1.1, letterSpacing: -1, maxWidth: 800, margin: "0 0 24px" }}>
          The trust layer for<br /><span style={{ color: C.gold }}>agent commerce</span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p style={{ fontFamily: F.b, fontSize: 17, color: C.txM, textAlign: "center", lineHeight: 1.7, maxWidth: 540, margin: "0 0 40px" }}>
          Your AI agent found the perfect flight. It can't buy it.<br />
          Tally gives every agent the power to transact — with you in control.
        </p>
      </FadeIn>

      <FadeIn delay={0.45}>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => onNav("dev")} style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${C.gold}, ${C.goldM})`, color: C.bg, fontSize: 14, fontFamily: F.b, fontWeight: 600, cursor: "pointer", letterSpacing: 0.3, boxShadow: `0 4px 24px ${C.gold}25` }}>
            Start building →
          </button>
          <button onClick={() => onNav("vision")} style={{ padding: "14px 32px", borderRadius: 12, border: `1px solid ${C.bd}`, background: "transparent", color: C.txS, fontSize: 14, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>
            Read the vision
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.6}>
        <div style={{ display: "flex", gap: 40, marginTop: 80 }}>
          {[
            { v: "30 min", l: "integration" },
            { v: "3 lines", l: "to first payment" },
            { v: "80M+", l: "merchants day one" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontFamily: F.d, color: C.gold }}>{s.v}</div>
              <div style={{ fontSize: 11, color: C.txF, fontFamily: F.b, marginTop: 4, letterSpacing: 0.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, transparent, ${C.gold}30)` }} />
        <div style={{ width: 6, height: 6, borderRadius: 3, background: `${C.gold}40` }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// DEVELOPERS
// ═══════════════════════════════════════════════
function DevSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Initialize", desc: "Install the SDK and create a client. One API key. That's it.", code: "import Tally from '" + String.fromCharCode(64) + "tally-pay/connect'\n\nconst tally = new Tally({\n  apiKey: 'tally_live_sk_...',\n  environment: 'production'\n})" },
    { title: "Request payment", desc: "When your agent needs to buy something, request approval from the consumer.", code: "const payment = await tally.payments.request({\n  amount: 34200,          // cents\n  currency: 'usd',\n  merchant: 'Delta Air Lines',\n  description: 'DL482 LAX→JFK, Mar 21',\n  metadata: {\n    reasoning: 'Cheapest nonstop. $55 less than last week.',\n    confidence: 0.94\n  }\n})"  },
    { title: "Handle approval", desc: "Consumer approves via push notification + Face ID. You get a single-use virtual card.", code: "// Consumer approves in ~5 seconds via Tally app\nconst result = await payment.waitForApproval()\n\nif (result.status === 'approved') {\n  const card = result.virtualCard\n  // card.number: '4147829300127744'\n  // card.exp: '03/26'\n  // card.cvv: '482'\n  // Single-use. Auto-destroys after charge.\n  \n  await bookFlight(card)\n}"  },
    { title: "Confirm", desc: "Let Tally know the purchase succeeded. The consumer sees it in their feed instantly.", code: "await tally.payments.confirm(payment.id, {\n  status: 'completed',\n  confirmation: 'DL-7829K',\n  receipt_url: 'https://delta.com/receipt/...'\n})\n\n// Consumer sees:\n// ✓ Delta Air Lines — $342.00\n// via YourAgent · just now"  },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 24px" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 20, height: 1, background: C.gold }} />
          <span style={{ fontSize: 11, color: C.gold, fontFamily: F.m, letterSpacing: 3 }}>FOR DEVELOPERS</span>
        </div>
        <h2 style={{ fontFamily: F.d, fontSize: 44, fontWeight: 400, color: C.tx, letterSpacing: -0.5, marginBottom: 12 }}>
          Give your agent <span style={{ color: C.gold }}>purchasing power</span>
        </h2>
        <p style={{ fontFamily: F.b, fontSize: 15, color: C.txM, lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
          Tally Connect is a free SDK that lets any AI agent make real purchases. Your agent proposes, the consumer approves via Tally, and a single-use virtual Visa is issued instantly. Works at 80M+ merchants.
        </p>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 32, alignItems: "start" }}>
        {/* Step selector */}
        <FadeIn delay={0.1}>
          <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 4 }}>
            {steps.map((s, i) => (
              <div key={i} onClick={() => setActiveStep(i)} style={{ padding: "16px 20px", borderRadius: 14, background: activeStep === i ? `${C.gold}08` : "transparent", border: `1px solid ${activeStep === i ? `${C.gold}15` : "transparent"}`, cursor: "pointer", transition: "all 0.3s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: activeStep === i ? `${C.gold}15` : "rgba(255,255,255,0.03)", border: `1px solid ${activeStep === i ? `${C.gold}20` : C.bd}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: F.m, color: activeStep === i ? C.gold : C.txF, transition: "all 0.3s ease" }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 14, color: activeStep === i ? C.tx : C.txM, fontFamily: F.b, fontWeight: 600, transition: "color 0.3s ease" }}>{s.title}</div>
                    {activeStep === i && <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 3, lineHeight: 1.5 }}>{s.desc}</div>}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 20, padding: "16px 20px", borderRadius: 14, background: `${C.grn}06`, border: `1px solid ${C.grn}10` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Chk s={12} c={C.grn} />
                <span style={{ fontSize: 12, color: C.grn, fontFamily: F.b, fontWeight: 600 }}>Your agent doesn't touch money</span>
              </div>
              <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.5 }}>Tally handles identity, payment, and card issuance. You just ask and receive.</div>
            </div>
          </div>
        </FadeIn>

        {/* Code display */}
        <FadeIn delay={0.2}>
          <Code title={`Step ${activeStep + 1}: ${steps[activeStep].title}`}>{steps[activeStep].code}</Code>

          {/* What you get / what Tally handles */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 24, borderRadius: 16, background: `${C.gold}04`, border: `1px solid ${C.gold}10` }}>
              <div style={{ fontSize: 12, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 12 }}>What your agent gets</div>
              {["Payment capability at 80M+ merchants", "Single-use virtual Visa per transaction", "Consumer trust (they chose to allow you)", "Transaction confirmation & receipts", "Co-branded UX: 'YourApp Pay · powered by Tally'"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <Chk s={10} c={C.gold} />
                  <span style={{ fontSize: 12, color: C.txS, fontFamily: F.b, lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: 24, borderRadius: 16, background: "rgba(255,255,255,0.015)", border: `1px solid ${C.bd}` }}>
              <div style={{ fontSize: 12, color: C.txS, fontFamily: F.b, fontWeight: 600, marginBottom: 12 }}>What Tally handles</div>
              {["Consumer identity & KYC", "Card issuance & network processing", "Fraud detection & 3DS authentication", "Spending rules & approval flow", "PCI-DSS compliance (you don't need it)"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <Shield s={10} c={C.txM} />
                  <span style={{ fontSize: 12, color: C.txM, fontFamily: F.b, lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Integration metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 24 }}>
            {[
              { v: "npm install", l: String.fromCharCode(64) + "tally-pay/connect", c: C.txS },
              { v: "0", l: "PCI requirements for you", c: C.grn },
              { v: "$0", l: "to integrate. Free forever.", c: C.gold },
            ].map((m, i) => (
              <div key={i} style={{ padding: "18px 20px", borderRadius: 14, background: "rgba(255,255,255,0.015)", border: `1px solid ${C.bd}` }}>
                <div style={{ fontSize: 16, fontFamily: i === 0 ? F.m : F.d, color: m.c }}>{m.v}</div>
                <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 4 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// INVESTORS
// ═══════════════════════════════════════════════
function InvestorSection() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 24px" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 20, height: 1, background: C.gold }} />
          <span style={{ fontSize: 11, color: C.gold, fontFamily: F.m, letterSpacing: 3 }}>FOR INVESTORS</span>
        </div>
        <h2 style={{ fontFamily: F.d, fontSize: 44, fontWeight: 400, color: C.tx, letterSpacing: -0.5, marginBottom: 12 }}>
          The financial infrastructure of the <span style={{ color: C.gold }}>agent economy</span>
        </h2>
        <p style={{ fontFamily: F.b, fontSize: 15, color: C.txM, lineHeight: 1.7, maxWidth: 600, marginBottom: 56 }}>
          McKinsey projects $3–5T in agentic commerce by 2030. Every transaction needs a trust layer between the AI and the consumer's money. That's Tally.
        </p>
      </FadeIn>

      {/* Market stats */}
      <FadeIn delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 48 }}>
          <Stat value="$3–5T" label="Agentic commerce by 2030" sub="McKinsey, Gartner" />
          <Stat value="<$100M" label="Total VC in agent payments" sub="Massive underfunding" color={C.red} />
          <Stat value="$0" label="Consumer acquisition cost" sub="Agents are the distribution" color={C.grn} />
          <Stat value="72–90%" label="Conversion rate" sub="Only way to complete purchase" />
        </div>
      </FadeIn>

      {/* The thesis */}
      <FadeIn delay={0.15}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
          <div style={{ padding: 36, borderRadius: 20, background: `${C.gold}04`, border: `1px solid ${C.gold}10` }}>
            <div style={{ fontSize: 13, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 16 }}>The thesis in four sentences</div>
            <div style={{ fontFamily: F.d, fontSize: 20, color: C.tx, lineHeight: 1.6 }}>
              "Every AI agent will need to spend money on behalf of humans. Consumers will never give agents their credit card. The company that becomes the trust layer between agents and money wins the next generation of financial infrastructure. That company is Tally."
            </div>
          </div>
          <div style={{ padding: 36, borderRadius: 20, background: "rgba(255,255,255,0.015)", border: `1px solid ${C.bd}` }}>
            <div style={{ fontSize: 13, color: C.txS, fontFamily: F.b, fontWeight: 600, marginBottom: 16 }}>Why now</div>
            {[
              "AI agents crossing from research to commerce (ChatGPT Operator, Poke, Rabbit)",
              "No standard exists for agent payments — greenfield",
              "Card networks (Visa, Mastercard) building agent identity but no consumer UX",
              "Regulatory window: lighter than banking, heavier than pure software",
              "First mover with consumer trust data builds unassailable moat",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 4, height: 4, borderRadius: 2, background: C.gold, marginTop: 6, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: C.txS, fontFamily: F.b, lineHeight: 1.55 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Revenue evolution */}
      <FadeIn delay={0.2}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: C.txS, fontFamily: F.b, fontWeight: 600, marginBottom: 20 }}>Revenue evolution — 7-year bottoms-up model</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { phase: "Phase 1", years: "Year 1", title: "Payment Rails", revenue: "$7M ARR", users: "130K", vol: "$702M", color: C.gold, desc: "Free SDK. Agents distribute. Interchange revenue. $0 CAC." },
              { phase: "Phase 2", years: "Years 2–3", title: "Tally Direct", revenue: "$634M ARR", users: "4.1M", vol: "$64B", color: C.grn, desc: "Skip Visa. Settle directly to merchants at 0% fees. 3x margin improvement." },
              { phase: "Phase 3", years: "Year 4", title: "Financial Products", revenue: "$2.7B ARR", users: "12.1M", vol: "$276B", color: C.blu, desc: "Tally Card, Balance, Credit. Richest behavioral data in commerce." },
              { phase: "Phase 4", years: "Years 5–7", title: "The Bank", revenue: "$27B ARR", users: "54M", vol: "$2.5T", color: C.purple, desc: "Bank charter. Deposits, lending, merchant banking. Own the entire relationship." },
            ].map((p, i) => (
              <div key={i} style={{ padding: 24, borderRadius: 16, background: `${p.color}04`, border: `1px solid ${p.color}10` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 9, color: C.txF, fontFamily: F.m, letterSpacing: 2 }}>{p.phase}</span>
                  <span style={{ fontSize: 9, color: p.color, fontFamily: F.b, fontWeight: 500 }}>{p.years}</span>
                </div>
                <div style={{ fontSize: 15, color: p.color, fontFamily: F.b, fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 28, fontFamily: F.d, color: p.color, marginBottom: 8 }}>{p.revenue}</div>
                <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                  <div><div style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>USERS</div><div style={{ fontSize: 12, color: C.txS, fontFamily: F.m }}>{p.users}</div></div>
                  <div><div style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>VOLUME</div><div style={{ fontSize: 12, color: C.txS, fontFamily: F.m }}>{p.vol}</div></div>
                </div>
                <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Per-user economics + comparables */}
      <FadeIn delay={0.25}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ padding: 32, borderRadius: 20, background: `${C.gold}04`, border: `1px solid ${C.gold}10` }}>
            <div style={{ fontSize: 13, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 20 }}>Revenue per user compounds 9×</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { yr: "Year 1", arpu: "$54", layers: "Interchange", c: C.gold },
                { yr: "Year 3", arpu: "$155", layers: "+ Direct + Premium", c: C.grn },
                { yr: "Year 5", arpu: "$310", layers: "+ Card + Deposits", c: C.blu },
                { yr: "Year 7", arpu: "$496", layers: "Full bank", c: C.purple },
              ].map((p, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>{p.yr}</div>
                  <div style={{ fontSize: 24, fontFamily: F.d, color: p.c, margin: "4px 0 2px" }}>{p.arpu}</div>
                  <div style={{ fontSize: 9, color: C.txM, fontFamily: F.b }}>{p.layers}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.02)" }}>
              <span style={{ fontSize: 11, color: C.txM, fontFamily: F.b }}>Same consumer, $0 incremental CAC. Each phase adds revenue on top.</span>
            </div>
          </div>
          <div style={{ padding: 32, borderRadius: 20, background: "rgba(255,255,255,0.015)", border: `1px solid ${C.bd}` }}>
            <div style={{ fontSize: 13, color: C.txS, fontFamily: F.b, fontWeight: 600, marginBottom: 20 }}>How Tally compares at scale</div>
            {[
              { name: "JPMorgan Chase", users: "80M", arpu: "~$750/yr", hl: false },
              { name: "Cash App", users: "56M", arpu: "~$120/yr", hl: false },
              { name: "Nubank", users: "100M", arpu: "~$50/yr", hl: false },
              { name: "Tally (Year 7)", users: "54M", arpu: "$496/yr", hl: true },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.bd}` : "none" }}>
                <span style={{ fontSize: 13, color: b.hl ? C.gold : C.txM, fontFamily: F.b, fontWeight: b.hl ? 600 : 400 }}>{b.name}</span>
                <div style={{ display: "flex", gap: 20 }}>
                  <span style={{ fontSize: 12, color: C.txF, fontFamily: F.m }}>{b.users}</span>
                  <span style={{ fontSize: 12, color: b.hl ? C.gold : C.txS, fontFamily: F.m, fontWeight: b.hl ? 600 : 400, minWidth: 70, textAlign: "right" }}>{b.arpu}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.5 }}>
              Tally sees every agent transaction — not just what flows through a bank account. User base of a Nubank, ARPU approaching JPMorgan.
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

// ═══════════════════════════════════════════════
// VISION MEMO
// ═══════════════════════════════════════════════
function VisionSection() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "120px 24px 160px" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
          <div style={{ width: 20, height: 1, background: C.gold }} />
          <span style={{ fontSize: 11, color: C.gold, fontFamily: F.m, letterSpacing: 3 }}>THE VISION</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: F.d, fontSize: 48, fontWeight: 400, color: C.tx, lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 8 }}>
            A letter about the future<br />of <span style={{ color: C.gold }}>money and machines</span>
          </h2>
          <div style={{ fontSize: 13, color: C.txM, fontFamily: F.b }}>February 2026</div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div style={{ fontFamily: F.b, fontSize: 16, color: C.txS, lineHeight: 1.85, letterSpacing: 0.1 }}>

          <p style={{ fontSize: 20, color: C.tx, fontFamily: F.d, lineHeight: 1.6, marginBottom: 32, paddingLeft: 20, borderLeft: `2px solid ${C.gold}30` }}>
            There's a moment in every technological revolution where the infrastructure catches up to the dream. For AI agents, that moment is now — and the dream is commerce.
          </p>

          <p style={{ marginBottom: 24 }}>
            We're living through the fastest capability expansion in the history of computing. AI agents can research, reason, compare, negotiate, and recommend better than any human assistant. They can find you the cheapest flight, the best restaurant, the right gift for your partner's birthday. They can do all of this in seconds.
          </p>

          <p style={{ marginBottom: 24 }}>
            But they can't buy anything.
          </p>

          <p style={{ marginBottom: 24 }}>
            This isn't a technical limitation. It's a trust problem. No sane person will give their credit card number to an AI model that might hallucinate, overspend, or get exploited. And no merchant wants to accept a payment from an entity that doesn't have an identity, a credit history, or a way to dispute a charge.
          </p>

          <p style={{ marginBottom: 24, color: C.tx, fontWeight: 500 }}>
            Tally exists to solve this exact problem.
          </p>

          <div style={{ margin: "40px 0", padding: "28px 0", borderTop: `1px solid ${C.bd}`, borderBottom: `1px solid ${C.bd}` }}>
            <p style={{ fontFamily: F.d, fontSize: 22, color: C.gold, lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              The agent proposes. Tally disposes.
            </p>
          </div>

          <p style={{ marginBottom: 24 }}>
            We're building the trust layer between AI agents and the financial system. When an agent finds a $342 flight for you, it doesn't get your credit card. Instead, it sends a request to Tally. You see the amount, the merchant, the agent's reasoning — and you approve with Face ID. Tally issues a single-use virtual card that works at 80 million merchants, self-destructs after the charge, and is never seen by the agent. Your real payment information never leaves your control.
          </p>

          <p style={{ marginBottom: 24 }}>
            This sounds simple. It is meant to. The best infrastructure is invisible. But underneath that simplicity is a business with extraordinary structural advantages:
          </p>

          <div style={{ margin: "32px 0", padding: "24px 28px", borderRadius: 16, background: `${C.gold}04`, border: `1px solid ${C.gold}10` }}>
            {[
              ["Zero customer acquisition cost", "Every AI agent that integrates Tally becomes a distribution channel. Poke's 6,000 users become Tally users at the moment of first purchase. We don't buy customers. We inherit them."],
              ["Mandatory conversion", "Tally isn't a feature consumers opt into. It's the only way to complete the purchase. When an agent says 'set up Tally to book this flight,' 72–90% of consumers do it. Because they want the flight."],
              ["Revenue that compounds", "Interchange becomes Tally Direct becomes financial products becomes a bank. The same consumer generates $54/year in Year 1 and $496/year in Year 7. Nine times more revenue, zero incremental cost."],
              ["A moat built on trust", "Every transaction makes the trust graph deeper. Every agent connected makes the network more valuable. By the time competitors realize what's happening, Tally will have the data, the merchants, and the muscle memory of 50 million consumers."],
            ].map(([title, desc], i) => (
              <div key={i} style={{ marginBottom: i < 3 ? 20 : 0 }}>
                <div style={{ fontSize: 14, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 14, color: C.txS, fontFamily: F.b, lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>

          <p style={{ marginBottom: 24 }}>
            The playbook is not new. Visa didn't build stores. They built the rails between banks and merchants and took a fraction of every transaction. Stripe didn't build websites. They built the API that made internet payments possible and became the default. Apple Pay didn't change what you bought. They changed how you authorized the purchase.
          </p>

          <p style={{ marginBottom: 24 }}>
            Tally is the Visa, Stripe, and Apple Pay of the agent economy — combined into one company. We're the rails (payment processing), the API (developer infrastructure), and the wallet (consumer trust layer), all in one. We have to be. Because in agent commerce, these things can't be separated. The entity that holds the consumer's trust must also issue the card, settle the payment, and enforce the rules. Fragmenting this creates exactly the kind of broken experience that agents are supposed to eliminate.
          </p>

          <div style={{ margin: "40px 0", padding: "28px 0", borderTop: `1px solid ${C.bd}`, borderBottom: `1px solid ${C.bd}` }}>
            <p style={{ fontFamily: F.d, fontSize: 22, color: C.tx, lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              In seven years, we believe Tally will be how the world pays<br />when machines do the shopping.
            </p>
          </div>

          <p style={{ marginBottom: 24 }}>
            We don't think agent commerce is a niche. We think it's the future of all commerce. The percentage of consumer spending that touches an AI agent will go from near-zero today to a majority within a decade. Groceries, travel, subscriptions, bills, insurance, investments — anything that can be researched, compared, and purchased will be. Humans will still make the decisions. They just won't do the work.
          </p>

          <p style={{ marginBottom: 24 }}>
            And every one of those transactions will need a trust layer.
          </p>

          <p style={{ marginBottom: 24 }}>
            That's not a $100M opportunity. That's not a $1B opportunity. If we execute — and we will — this is a generational company. A company that sits at the intersection of AI and financial infrastructure during the most significant economic transformation since the internet.
          </p>

          <p style={{ marginBottom: 0, color: C.tx, fontWeight: 500 }}>
            We're building Tally for the long arc. The agents are here. The commerce is coming. The trust layer is missing. Not for long.
          </p>

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${C.bd}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield s={20} c={C.bg}/></div>
              <div>
                <div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>Mateus</div>
                <div style={{ fontSize: 12, color: C.txM, fontFamily: F.b }}>Founder, Tally</div>
              </div>
            </div>
          </div>

        </div>
      </FadeIn>
    </div>
  );
}

// ═══════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════
function Footer() {
  return (
    <div style={{ borderTop: `1px solid ${C.bd}`, padding: "48px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield s={12} c={C.bg}/></div>
          <span style={{ fontFamily: F.b, fontWeight: 600, fontSize: 14, color: C.gold }}>Tally</span>
        </div>
        <div style={{ fontSize: 11, color: C.txF, fontFamily: F.b }}>The trust layer for agent commerce · 2026</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function TallyLanding() {
  const [activeTab, setActiveTab] = useState("dev");
  const contentRef = useRef(null);

  const handleNav = (tab) => {
    setActiveTab(tab);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
        html{background:#050505;scroll-behavior:smooth}
        body{overflow-x:hidden}
        ::selection{background:rgba(191,163,109,0.2);color:#EDE8DF}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(191,163,109,0.08);border-radius:2px}
        button{outline:none;transition:all 0.2s ease}button:hover{filter:brightness(1.1);transform:translateY(-1px)}button:active{transform:translateY(0) scale(0.98)}
        p{margin:0}
      `}</style>

      <div style={{ minHeight: "100vh", color: C.tx, background: C.bg, position: "relative" }}>
        {/* Grain overlay */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.3, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")` }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Fixed nav */}
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(5,5,5,0.8)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderBottom: `1px solid ${C.bd}` }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield s={11} c={C.bg}/></div>
                <span style={{ fontFamily: F.b, fontWeight: 600, fontSize: 14, color: C.gold }}>Tally</span>
              </div>
              <div style={{ display: "flex", gap: 2 }}>
                {[
                  { id: "dev", l: "Developers" },
                  { id: "invest", l: "Investors" },
                  { id: "vision", l: "Vision" },
                ].map(t => (
                  <button key={t.id} onClick={() => handleNav(t.id)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: activeTab === t.id ? `${C.gold}10` : "transparent", color: activeTab === t.id ? C.gold : C.txM, fontSize: 12, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>{t.l}</button>
                ))}
              </div>
            </div>
          </div>

          <Hero onNav={handleNav} />

          <div ref={contentRef}>
            {activeTab === "dev" && <DevSection />}
            {activeTab === "invest" && <InvestorSection />}
            {activeTab === "vision" && <VisionSection />}
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

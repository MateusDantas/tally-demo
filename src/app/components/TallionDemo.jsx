"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════
// TALLION — COMPLETE DEMO (4 TABS)
// 1. Before & After  2. For Developers  3. vs Competitors  4. Vision
// ═══════════════════════════════════════════════════════════════

const C = {
  gold: "#d4a940", goldM: "#a88425",
  gG: "rgba(212,169,64,0.07)", gB: "rgba(212,169,64,0.12)",
  bg: "#0a0a0a", sf: "rgba(255,255,255,0.018)",
  bd: "rgba(255,255,255,0.04)",
  tx: "#f7f4ee", txS: "#B8B0A2", txM: "#7a6a35", txF: "#3D3935",
  grn: "#6FCF97", grnS: "rgba(111,207,151,0.10)",
  red: "#EB5757", redS: "rgba(235,87,87,0.06)",
  blu: "#6B9FD4", bluS: "rgba(107,159,212,0.08)",
  amb: "#E2B657", ambS: "rgba(226,182,87,0.06)",
  pk: "#34C77B", pkS: "rgba(52,199,123,0.08)",
  gpt: "#74AA9C",
  stripe: "#635BFF", visa: "#1A1F71", mc: "#EB001B", google: "#4285F4",
  purple: "#A78BFA", purpleS: "rgba(167,139,250,0.08)",
};
const F = { d: "var(--font-montserrat), 'Montserrat', sans-serif", b: "var(--font-montserrat), 'Montserrat', sans-serif", m: "var(--font-jetbrains), 'JetBrains Mono', monospace" };

// ─── ICONS ───
const Shield = ({s=15,c=C.gold}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const Chk = ({s=13,c=C.grn}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Xx = ({s=13,c=C.red}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const Ext = ({s=11,c=C.txF}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const Warn = ({s=13,c=C.amb}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const Arrow2 = ({s=14,c=C.txF}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const Bank = ({s=15,c=C.gold}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M12 3l9 7H3l9-7z"/><path d="M5 10v11"/><path d="M19 10v11"/><path d="M9 10v11"/><path d="M15 10v11"/></svg>;
const Zap = ({s=15,c=C.gold}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const Lbl = ({children,style}) => <div style={{fontSize:10,fontFamily:F.b,fontWeight:500,color:C.txM,letterSpacing:3,textTransform:"uppercase",...style}}>{children}</div>;
const GLine = ({w=40}) => <div style={{width:w,height:1,background:`linear-gradient(90deg, ${C.gold}50, transparent)`,margin:"4px 0 0"}}/>;
const TimerBadge = ({time,color=C.amb}) => <div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:6,background:`${color}10`,border:`1px solid ${color}12`}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span style={{fontSize:10,fontFamily:F.m,color,fontWeight:500}}>{time}</span></div>;

const Phone = ({ children, label, labelColor = C.txF, glow }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {glow === "red" && <Xx s={10} c={C.red} />}
      {glow === "gold" && <Shield s={10} c={C.gold} />}
      <span style={{ fontSize: 9, color: labelColor, fontFamily: F.b, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
    </div>
    <div style={{ background: "#0D0D0D", borderRadius: 36, padding: 6, border: `1px solid ${glow === "gold" ? `${C.gold}15` : (glow === "red" ? `${C.red}10` : "rgba(255,255,255,0.06)")}`, boxShadow: `0 32px 64px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06) inset${glow === "gold" ? `, 0 0 40px ${C.gG}` : ""}`, width: "min(300px, 80vw)", flexShrink: 0 }}>
      <div style={{ background: C.bg, borderRadius: 31, overflow: "hidden", height: 560, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "9px 18px 3px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11.5, fontFamily: F.b, fontWeight: 600, color: C.tx }}>9:41</span>
          <div style={{ width: 80, height: 22, borderRadius: 11, background: "#111", boxShadow: "0 0 0 0.5px rgba(255,255,255,0.05) inset" }} />
          <div style={{ display: "flex", gap: 1.5 }}>{[4,6,8,10].map(h => <div key={h} style={{width:2.5,height:h,borderRadius:1,background:C.tx,opacity:0.45}}/>)}</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  </div>
);
const PokeHeader = () => (<div style={{ padding: "6px 14px 10px", borderBottom: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 28, height: 28, borderRadius: 14, background: `linear-gradient(145deg, ${C.pk}, #1B9E5E)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🌴</div><div><div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>Poke</div><div style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>iMessage</div></div></div>);
const Bub = ({ text, from, vis = true }) => (<div style={{ alignSelf: from === "user" ? "flex-end" : "flex-start", maxWidth: "84%", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(6px)", transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)" }}><div style={{ padding: "10px 14px", borderRadius: 18, borderBottomRightRadius: from === "user" ? 4 : 18, borderBottomLeftRadius: from === "agent" ? 4 : 18, background: from === "user" ? `linear-gradient(135deg, ${C.pk}20, ${C.pk}0A)` : "rgba(255,255,255,0.04)", border: `1px solid ${from === "user" ? `${C.pk}15` : C.bd}` }}><div style={{ fontSize: 13, color: from === "user" ? C.tx : C.txS, fontFamily: F.b, lineHeight: 1.55 }}>{text}</div></div></div>);
const SysCard = ({ children, color = C.gold, vis = true }) => (<div style={{ margin: "4px 0", padding: "12px 14px", borderRadius: 14, background: `${color}06`, border: `1px solid ${color}10`, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(6px)", transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)" }}>{children}</div>);
const Surf = ({ children, style, gold, onClick }) => (<div onClick={onClick} style={{ background: gold ? `linear-gradient(165deg, rgba(212,169,64,0.055), rgba(212,169,64,0.015))` : C.sf, borderRadius: 18, border: `1px solid ${gold ? C.gB : C.bd}`, cursor: onClick ? "pointer" : "default", transition: "all 0.3s ease", ...style }}>{children}</div>);
const Btn = ({ children, onClick, primary, style }) => (<button onClick={onClick} style={{ padding: "12px 28px", borderRadius: 12, border: primary ? "none" : `1px solid ${C.gold}28`, background: primary ? `linear-gradient(135deg, ${C.gold}, ${C.goldM})` : "transparent", color: primary ? "#080706" : C.gold, fontSize: 13, fontFamily: F.b, fontWeight: 600, cursor: "pointer", boxShadow: primary ? `0 6px 24px rgba(212,169,64,0.18)` : "none", ...style }}>{children}</button>);

// ═══════════════════════════════════════════════
// TAB 1: BEFORE & AFTER
// ═══════════════════════════════════════════════

function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth < bp); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, [bp]);
  return m;
}

const SCENARIOS = [{ id: "first", label: "First Purchase", maxStep: 11 }, { id: "repeat", label: "Repeat Purchase", maxStep: 5 }, { id: "second", label: "Second Agent", maxStep: 5 }];

function WithoutTallion({ scenario, step }) {
  if (scenario === "first") {
    return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {step <= 3 ? (<><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
        <Bub from="user" text="book me a flight to NYC next friday, cheapest nonstop" vis={step >= 0} />
        <Bub from="agent" text="found it! Delta DL482, $342 nonstop. $55 less than last week 📉" vis={step >= 1} />
        {step >= 2 && <Bub from="user" text="book it" />}{step >= 2 && <Bub from="agent" text="i can't make purchases yet 😕 here's the link:" />}
        {step >= 3 && <SysCard color={C.red}><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><Ext s={11} c={C.red} /><span style={{ fontSize: 10, color: C.red, fontFamily: F.b, fontWeight: 600 }}>EXTERNAL LINK</span></div><div style={{ marginTop: 6, padding: 8, borderRadius: 8, background: `${C.red}10`, textAlign: "center" }}><span style={{ fontSize: 11, color: C.red, fontFamily: F.b, fontWeight: 600 }}>Open in Safari →</span></div></SysCard>}
      </div></>) : step <= 5 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "8px 14px", background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${C.bd}` }}><div style={{ flex: 1, padding: "5px 10px", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.bd}` }}><span style={{ fontSize: 10, color: C.txM, fontFamily: F.m }}>delta.com/booking/DL482</span></div></div>
          <div style={{ flex: 1, padding: 16 }}>
            <div style={{ padding: 14, borderRadius: 12, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 10 }}><div style={{ fontSize: 13, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>DL482 · LAX → JFK</div><div style={{ fontSize: 18, fontFamily: F.d, color: C.tx, marginTop: 8 }}>$342.00</div></div>
            {step === 4 && <><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span style={{ fontSize: 12, color: C.txS, fontFamily: F.b, fontWeight: 500 }}>Sign in</span><TimerBadge time="2–5 min" /></div>{["Email", "Password"].map(f => <div key={f} style={{ padding: "10px 12px", borderRadius: 8, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 6 }}><span style={{ fontSize: 12, color: C.txF, fontFamily: F.b }}>{f}</span></div>)}</>}
            {step >= 5 && <><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span style={{ fontSize: 12, color: C.txS, fontFamily: F.b, fontWeight: 500 }}>Payment</span><TimerBadge time="1–2 min" /></div>{["Card number", "MM / YY", "CVV", "Billing zip"].map(f => <div key={f} style={{ padding: "10px 12px", borderRadius: 8, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 5 }}><span style={{ fontSize: 12, color: C.txF, fontFamily: F.b }}>{f}</span></div>)}</>}
          </div>
        </div>
      ) : step === 6 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ fontSize: 24, marginBottom: 14 }}>🏦</div><div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 500, marginBottom: 4 }}>Bank verification</div><div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, textAlign: "center", lineHeight: 1.5, marginBottom: 16 }}>Switch to Chase app, approve, switch back.</div><TimerBadge time="30–60 sec" />
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>{["Close Safari", "Open Chase", "Approve", "Back to Safari"].map((s, i) => <div key={i} style={{ padding: "5px 10px", borderRadius: 6, background: C.ambS }}><span style={{ fontSize: 10, color: C.amb, fontFamily: F.b }}>{i+1}. {s}</span></div>)}</div>
        </div>
      ) : step === 7 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ width: 50, height: 50, borderRadius: 25, background: C.grnS, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><Chk s={24} c={C.grn} /></div>
          <div style={{ fontSize: 15, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>Confirmed</div>
          <div style={{ padding: 12, borderRadius: 10, background: C.ambS, border: `1px solid ${C.amb}12`, textAlign: "center", width: "100%", marginTop: 16 }}><span style={{ fontSize: 10, color: C.amb, fontFamily: F.b, fontWeight: 500 }}>Now go back to Poke and tell it the code...</span></div>
        </div>
      ) : (<><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}><Bub from="user" text="finally booked it. confirmation DL-7829K" /><Bub from="agent" text="added to your calendar 📅" /><SysCard color={C.amb}><TimerBadge time="8–15 min total" color={C.red} /><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginTop: 6 }}>4 app switches · typed card · you did all the work</div></SysCard></div></>)}
    </div>;
  }
  if (scenario === "repeat") return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}><Bub from="user" text="get me an uber to Nobu tonight" vis={step >= 0} />{step >= 1 && <Bub from="agent" text="UberX, 12 min, $28.50. but i can't book 😕" />}{step >= 2 && <SysCard color={C.red}><Ext s={10} c={C.red} /><span style={{ fontSize: 10, color: C.red, fontFamily: F.b, fontWeight: 600, marginLeft: 6 }}>OPEN UBER APP</span></SysCard>}{step >= 3 && <Bub from="user" text="ugh, fine" />}{step >= 4 && <SysCard color={C.amb}><div style={{ fontSize: 11, color: C.amb, fontFamily: F.b, fontWeight: 500 }}>Every. Single. Time.</div><TimerBadge time="1–2 min" /></SysCard>}{step >= 5 && <Bub from="user" text="ok booked. Marcus, gray Camry, 12 min" />}</div></div>;
  return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}><div style={{ padding: "6px 14px 10px", borderBottom: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 28, height: 28, borderRadius: 14, background: `${C.gpt}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🤖</div><div><div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>ChatGPT</div></div></div><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}><Bub from="user" text="order Sony WH-1000XM5 headphones" vis={step >= 0} />{step >= 1 && <Bub from="agent" text="$348 on Amazon. can't purchase." />}{step >= 2 && <SysCard color={C.red}><Ext s={10} c={C.red} /><span style={{ fontSize: 10, color: C.red, fontFamily: F.b, fontWeight: 600, marginLeft: 6 }}>OPEN AMAZON.COM</span></SysCard>}{step >= 3 && <Bub from="user" text="again?? 😤" />}{step >= 4 && <SysCard color={C.red}><div style={{ fontSize: 11, color: C.red, fontFamily: F.b, fontWeight: 500 }}>The pattern repeats forever</div></SysCard>}</div></div>;
}

function WithTallion({ scenario, step }) {
  if (scenario === "first") {
    return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {step <= 2 ? (
        /* CHAT: User asks, agent finds, user says book it */
        <><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
          <Bub from="user" text="book me a flight to NYC next friday, cheapest nonstop" vis={step >= 0} />
          <Bub from="agent" text="found it! Delta DL482, $342 nonstop. $55 less than last week 📉" vis={step >= 1} />
          {step >= 2 && <Bub from="user" text="book it" />}
          {step >= 2 && <Bub from="agent" text="to complete this purchase, set up Tallion (90 sec) 🛡️" />}
        </div></>
      ) : step === 3 ? (
        /* STEP 3: ID VERIFICATION */
        <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 10, paddingTop: 4 }}>
            <span style={{ fontSize: 14 }}>🌴</span>
            <span style={{ fontSize: 13, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>Poke Pay</span>
            <span style={{ fontSize: 11, color: C.txF }}>·</span>
            <Shield s={11} c={C.gold} />
            <span style={{ fontSize: 11, color: C.gold, fontFamily: F.b, fontWeight: 500 }}>powered by Tallion</span>
          </div>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>Verify your identity</div>
            <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 2 }}>Quick setup. One time only.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ padding: "12px 14px", borderRadius: 12, background: C.sf, border: `1px solid ${C.bd}` }}>
              <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 4 }}>PHONE NUMBER</div>
              <div style={{ fontSize: 14, color: C.tx, fontFamily: F.m }}>+1 (310) 555-0182</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[3, 7, 2, 9].map((d, i) => (
                <div key={i} style={{ flex: 1, padding: "12px 0", borderRadius: 12, background: C.gG, border: `1px solid ${C.gB}`, textAlign: "center" }}>
                  <span style={{ fontSize: 20, fontFamily: F.m, color: C.gold, fontWeight: 500 }}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}><span style={{ fontSize: 10, color: C.grn, fontFamily: F.b }}>✓ Code verified</span></div>
          </div>
          <div style={{ marginTop: "auto", paddingTop: 12 }}>
            <div style={{ padding: 10, borderRadius: 12, background: C.sf, border: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.txM} strokeWidth={1.5}><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 9v0M12 15v0M9 12h0M15 12h0"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>Face ID</div>
                <div style={{ fontSize: 9, color: C.txM, fontFamily: F.b }}>For instant approvals</div>
              </div>
              <Chk s={14} c={C.grn} />
            </div>
            <div style={{ width: "100%", padding: 12, borderRadius: 12, background: `linear-gradient(135deg, ${C.gold}, ${C.goldM})`, textAlign: "center", cursor: "default" }}>
              <span style={{ fontSize: 13, color: C.bg, fontFamily: F.b, fontWeight: 600 }}>Continue</span>
            </div>
            <div style={{ textAlign: "center", marginTop: 6 }}><TimerBadge time="15 sec" color={C.grn} /></div>
          </div>
        </div>
      ) : step === 4 ? (
        /* STEP 4: ADD PAYMENT METHOD */
        <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 10, paddingTop: 4 }}>
            <span style={{ fontSize: 14 }}>🌴</span>
            <span style={{ fontSize: 13, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>Poke Pay</span>
            <span style={{ fontSize: 11, color: C.txF }}>·</span>
            <Shield s={11} c={C.gold} />
            <span style={{ fontSize: 11, color: C.gold, fontFamily: F.b, fontWeight: 500 }}>powered by Tallion</span>
          </div>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>Add a payment method</div>
            <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 2 }}>Your card is never shared with agents.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ padding: "12px 14px", borderRadius: 12, background: C.gG, border: `1px solid ${C.gB}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 20, borderRadius: 4, background: "linear-gradient(135deg, #1A1F71, #2D4AA8)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 7, color: "white", fontFamily: F.b, fontWeight: 700 }}>VISA</span></div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>Debit card</div><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b }}>Chase •••• 4821</div></div>
              <Chk s={14} c={C.grn} />
            </div>
            <div style={{ padding: "12px 14px", borderRadius: 12, background: C.sf, border: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 20, borderRadius: 4, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10, color: C.txF }}>+</span></div>
              <span style={{ fontSize: 12, color: C.txM, fontFamily: F.b }}>Add credit card</span>
            </div>
            <div style={{ padding: "12px 14px", borderRadius: 12, background: C.sf, border: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 20, borderRadius: 4, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10 }}>🏦</span></div>
              <span style={{ fontSize: 12, color: C.txM, fontFamily: F.b }}>Link bank account</span>
            </div>
          </div>
          <div style={{ marginTop: "auto", paddingTop: 10 }}>
            <div style={{ width: "100%", padding: 12, borderRadius: 12, background: `linear-gradient(135deg, ${C.gold}, ${C.goldM})`, textAlign: "center", cursor: "default" }}><span style={{ fontSize: 13, color: C.bg, fontFamily: F.b, fontWeight: 600 }}>Continue</span></div>
            <div style={{ textAlign: "center", marginTop: 6 }}><TimerBadge time="15 sec" color={C.grn} /></div>
          </div>
        </div>
      ) : step === 5 ? (
        /* STEP 5: SET SPENDING RULES */
        <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <Shield s={12} c={C.gold} />
            <span style={{ fontSize: 13, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>Set your limits for Poke</span>
          </div>
          {[
            { l: "Max per transaction", v: "$500" },
            { l: "Daily spending cap", v: "$1,000" },
            { l: "Auto-approve under", v: "$50" },
          ].map((r, i) => (
            <div key={i} style={{ padding: "12px 14px", borderRadius: 12, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: C.txS, fontFamily: F.b }}>{r.l}</span>
              <span style={{ fontSize: 13, color: C.gold, fontFamily: F.m, fontWeight: 500 }}>{r.v}</span>
            </div>
          ))}
          <div style={{ padding: "10px 14px", borderRadius: 12, background: C.redS, border: `1px solid ${C.red}10`, marginBottom: 6 }}>
            <div style={{ fontSize: 11, color: C.txS, fontFamily: F.b, marginBottom: 4 }}>Blocked categories</div>
            <div style={{ display: "flex", gap: 4 }}>{["Gambling", "Crypto"].map(c => <span key={c} style={{ padding: "3px 8px", borderRadius: 6, background: `${C.red}12`, fontSize: 10, color: C.red, fontFamily: F.b }}>{c}</span>)}</div>
          </div>
          <div style={{ marginTop: "auto", paddingTop: 8 }}>
            <div style={{ width: "100%", padding: 12, borderRadius: 12, background: `linear-gradient(135deg, ${C.gold}, ${C.goldM})`, textAlign: "center", cursor: "default" }}><span style={{ fontSize: 13, color: C.bg, fontFamily: F.b, fontWeight: 600 }}>Save & connect to Poke</span></div>
          </div>
        </div>
      ) : step <= 7 ? (
        /* STEPS 6-7: APPROVAL SCREEN */
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {step === 6 && <div style={{ width: "100%", padding: "8px 12px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.bd}`, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 20, height: 20, borderRadius: 6, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield s={9} c={C.bg}/></div><div style={{ flex: 1 }}><div style={{ fontSize: 10.5, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>Tallion</div><div style={{ fontSize: 9, color: C.txM, fontFamily: F.b }}>Poke wants to pay $342</div></div></div>}
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(212,169,64,0.22)", marginBottom: 10 }}><Shield s={16} c={C.bg}/></div>
          <div style={{ fontSize: 11, color: C.txS, fontFamily: F.b }}>Payment Request</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10, marginTop: 2 }}><span style={{ fontSize: 10 }}>🌴</span><span style={{ fontSize: 10, color: C.txM, fontFamily: F.b }}>via Poke</span></div>
          <div style={{ fontSize: 32, fontFamily: F.d, color: C.gold }}>$342</div>
          <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginBottom: 10 }}>Delta Air Lines</div>
          <div style={{ padding: "6px 10px", borderRadius: 8, background: C.sf, border: `1px solid ${C.bd}`, width: "100%", marginBottom: 8 }}><div style={{ fontSize: 8, color: C.txF, fontFamily: F.b, letterSpacing: 1.5, marginBottom: 2 }}>REASONING</div><div style={{ fontSize: 10, color: C.txS, fontFamily: F.b, lineHeight: 1.4 }}>Cheapest nonstop LAX→JFK. $55 less than last week.</div></div>
          {step === 7 ? <div style={{ width: "100%", textAlign: "center", marginTop: 4 }}><div style={{ width: 44, height: 44, borderRadius: 22, background: C.grnS, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}><Chk s={20} c={C.grn}/></div><div style={{ fontSize: 13, color: C.grn, fontFamily: F.b, fontWeight: 600 }}>Approved</div><TimerBadge time="5 sec" color={C.grn} /></div>
          : <div style={{ display: "flex", gap: 8, width: "100%", marginTop: 4 }}><button style={{ flex: 1, padding: 10, borderRadius: 12, border: `1px solid ${C.red}12`, background: `${C.red}06`, color: C.red, fontSize: 12, fontFamily: F.b, fontWeight: 500, cursor: "default" }}>Decline</button><button style={{ flex: 2, padding: 10, borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${C.gold}, ${C.goldM})`, color: C.bg, fontSize: 12, fontFamily: F.b, fontWeight: 600, cursor: "default" }}>Approve · Face ID</button></div>}
        </div>
      ) : step <= 9 ? (
        /* STEPS 8-9: BOOKED + VIRTUAL CARD */
        <><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
          <SysCard color={C.grn}><div style={{ display: "flex", alignItems: "center", gap: 5 }}><Chk s={10} c={C.grn}/><span style={{ fontSize: 10, color: C.grn, fontFamily: F.b, fontWeight: 600 }}>PAYMENT APPROVED</span></div><div style={{ padding: 8, borderRadius: 8, background: C.gG, border: `1px solid ${C.gB}`, marginTop: 6 }}><Lbl style={{ color: C.goldM, fontSize: 7, letterSpacing: 3 }}>VIRTUAL CARD ISSUED</Lbl><div style={{ fontFamily: F.m, fontSize: 12, color: C.gold, letterSpacing: 2, marginTop: 2 }}>4147 •••• •••• 8293</div></div></SysCard>
          {step >= 9 && <Bub from="agent" text="booked ✓ Delta DL482, conf DL-7829K 📅" />}
          {step >= 9 && <SysCard color={C.grn}><TimerBadge time="~90 sec total" color={C.grn} /><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginTop: 4 }}>incl. one-time setup · next time: 5 sec</div></SysCard>}
        </div></>
      ) : step === 10 ? (
        /* STEP 10: DOWNLOAD APP */
        <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(212,169,64,0.25)", marginBottom: 14 }}><Shield s={24} c={C.bg}/></div>
            <div style={{ fontSize: 16, color: C.tx, fontFamily: F.b, fontWeight: 600, marginBottom: 4 }}>Get the Tallion app</div>
            <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, textAlign: "center", lineHeight: 1.5, marginBottom: 16, maxWidth: 220 }}>Approve with Face ID. Manage all your agents. Set smarter rules.</div>
            <div style={{ width: "100%", padding: 12, borderRadius: 12, background: `linear-gradient(135deg, ${C.gold}, ${C.goldM})`, textAlign: "center", marginBottom: 8, cursor: "default" }}><span style={{ fontSize: 13, color: C.bg, fontFamily: F.b, fontWeight: 600 }}>Download Tallion</span></div>
            <div style={{ fontSize: 10, color: C.txF, fontFamily: F.b }}>Next time: approve in 5 seconds</div>
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {["Dashboard", "Face ID", "Smart rules", "All agents"].map((ft, i) => (
              <div key={i} style={{ padding: "4px 8px", borderRadius: 6, background: C.gG, border: `1px solid ${C.gB}` }}>
                <span style={{ fontSize: 9, color: C.gold, fontFamily: F.b }}>{ft}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* STEP 11: SUMMARY */
        <><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
          <Bub from="agent" text="all set! flight booked, Tallion app ready. next purchase will be instant ⚡" />
          <SysCard color={C.grn}><div style={{ fontSize: 11, color: C.grn, fontFamily: F.b, fontWeight: 500, marginBottom: 4 }}>Setup complete. You're in control.</div><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b }}>0 app switches · card never exposed · Tallion app ready</div></SysCard>
        </div></>
      )}
    </div>;
  }
    if (scenario === "repeat") return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}><Bub from="user" text="get me an uber to Nobu tonight" vis={step >= 0} />{step >= 1 && <Bub from="agent" text="UberX, 12 min, $28.50. booking now…" />}{step >= 2 && <SysCard color={C.grn}><Shield s={10} c={C.gold} /><span style={{ fontSize: 10, color: C.gold, fontFamily: F.b, fontWeight: 500, marginLeft: 6 }}>AUTO-APPROVED</span><span style={{ fontSize: 9, color: C.txF, fontFamily: F.b, marginLeft: 4 }}>$28 {"<"} $50 limit</span></SysCard>}{step >= 3 && <Bub from="agent" text="uber booked ✓ Marcus, gray Camry, 12 min 🚗" />}{step >= 4 && <SysCard color={C.grn}><div style={{ fontSize: 11, color: C.grn, fontFamily: F.b, fontWeight: 500 }}>Zero effort. Zero friction.</div><div style={{ marginTop: 4 }}><TimerBadge time="0 sec" color={C.grn} /></div></SysCard>}</div></div>;
  return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}><div style={{ padding: "6px 14px 10px", borderBottom: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 28, height: 28, borderRadius: 14, background: `${C.gpt}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🤖</div><div><div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>ChatGPT</div></div></div><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}><Bub from="user" text="order Sony WH-1000XM5 headphones" vis={step >= 0} />{step >= 1 && <Bub from="agent" text="$348 on Amazon. setting up payment…" />}{step >= 2 && <SysCard color={C.gold}><Shield s={10} c={C.gold}/><span style={{ fontSize: 10, color: C.gold, fontFamily: F.b, fontWeight: 600, marginLeft: 6 }}>TALLION RECOGNIZED YOU</span></SysCard>}{step >= 3 && <SysCard color={C.grn}><Chk s={10} c={C.grn}/><span style={{ fontSize: 10, color: C.grn, fontFamily: F.b, fontWeight: 600, marginLeft: 6 }}>AUTHORIZED & APPROVED</span></SysCard>}{step >= 4 && <Bub from="agent" text="ordered ✓ Sony WH-1000XM5, arrives Wed 📦" />}{step >= 5 && <SysCard color={C.grn}><div style={{ fontSize: 11, color: C.grn, fontFamily: F.b, fontWeight: 500 }}>Two agents. One Tallion.</div><div style={{ marginTop: 4 }}><TimerBadge time="3 sec" color={C.grn} /></div></SysCard>}</div></div>;
}

function BeforeAfterTab() {
  const mob = useIsMobile(); const [phoneView, setPhoneView] = useState("with");
  const [scIdx, setScIdx] = useState(0); const [step, setStep] = useState(0); const [playing, setPlaying] = useState(false); const sc = SCENARIOS[scIdx];
  useEffect(() => { setStep(0); setPlaying(false); }, [scIdx]);
  useEffect(() => { if (!playing || step >= sc.maxStep) { setPlaying(false); return; } const t = setTimeout(() => setStep(s => s + 1), 1400); return () => clearTimeout(t); }, [playing, step, sc.maxStep]);
  const done = step >= sc.maxStep;
  return (<div style={{ maxWidth: 1060, margin: "0 auto", padding: "72px 20px 60px" }}>
    <div style={{ textAlign: "center", marginBottom: 22 }}><h1 style={{ fontFamily: F.b, fontSize: mob ? 22 : 34, fontWeight: 300, color: C.tx, letterSpacing: -1, marginBottom: 6 }}>Same request. <span style={{ fontFamily: F.d, color: C.gold }}>Completely different.</span></h1></div>
    <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 18 }}>{SCENARIOS.map((s, i) => <button key={s.id} onClick={() => setScIdx(i)} style={{ padding: "8px 20px", borderRadius: 10, border: "none", background: scIdx === i ? C.gG : "transparent", color: scIdx === i ? C.gold : C.txM, fontSize: 12.5, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>{s.label}</button>)}</div>
    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 18 }}>
      <button onClick={() => { setStep(0); setPlaying(false); }} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${C.bd}`, background: "transparent", color: C.txM, fontSize: 11, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>Reset</button>
      <button onClick={() => { if (done) { setStep(0); setTimeout(() => setPlaying(true), 100); } else setPlaying(!playing); }} style={{ padding: "7px 20px", borderRadius: 8, border: "none", background: `linear-gradient(135deg, ${C.gold}, ${C.goldM})`, color: C.bg, fontSize: 11, fontFamily: F.b, fontWeight: 600, cursor: "pointer" }}>{playing ? "⏸ Pause" : done ? "↺ Replay" : "▶ Play"}</button>
      {step < sc.maxStep && <button onClick={() => setStep(s => s + 1)} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${C.bd}`, background: "transparent", color: C.txM, fontSize: 11, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>Step →</button>}
      <button onClick={() => setStep(sc.maxStep)} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${C.bd}`, background: "transparent", color: C.txM, fontSize: 11, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>Show all</button>
    </div>
    <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 22 }}>{Array.from({ length: sc.maxStep + 1 }).map((_, i) => <div key={i} onClick={() => { setStep(i); setPlaying(false); }} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, cursor: "pointer", background: i <= step ? C.gold : C.bd, opacity: i <= step ? (i === step ? 1 : 0.45) : 0.25, transition: "all 0.3s ease" }} />)}</div>
    {mob ? (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
          <button onClick={() => setPhoneView("without")} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: phoneView === "without" ? `${C.red}15` : "transparent", color: phoneView === "without" ? C.red : C.txM, fontSize: 11, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>✕ Without Tallion</button>
          <button onClick={() => setPhoneView("with")} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: phoneView === "with" ? C.gG : "transparent", color: phoneView === "with" ? C.gold : C.txM, fontSize: 11, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>🛡 With Tallion</button>
        </div>
        {phoneView === "without" ? <Phone label="Without Tallion" labelColor={C.red} glow="red"><WithoutTallion scenario={sc.id} step={step} /></Phone> : <Phone label="With Tallion" labelColor={C.gold} glow="gold"><WithTallion scenario={sc.id} step={step} /></Phone>}
      </div>
    ) : (
      <div style={{ display: "flex", justifyContent: "center", gap: 28, alignItems: "flex-start" }}>
        <Phone label="Without Tallion" labelColor={C.red} glow="red"><WithoutTallion scenario={sc.id} step={step} /></Phone>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 60, gap: 8 }}><div style={{ width: 1, height: 100, background: `linear-gradient(180deg, transparent, ${C.bd}, ${C.gold}20, ${C.bd}, transparent)` }} /><div style={{ fontSize: 10, color: C.txF, fontFamily: F.b, letterSpacing: 3, writingMode: "vertical-rl" }}>VS</div><div style={{ width: 1, height: 100, background: `linear-gradient(180deg, transparent, ${C.bd}, ${C.gold}20, ${C.bd}, transparent)` }} /></div>
        <Phone label="With Tallion" labelColor={C.gold} glow="gold"><WithTallion scenario={sc.id} step={step} /></Phone>
      </div>
    )}
    {done && <div style={{ marginTop: 28, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>{(scIdx === 0 ? [["Time","8–15 min","~30 sec"],["Switches","4","0"],["Card exposed","Yes","Never"],["Steps","10","3"]] : scIdx === 1 ? [["Effort","Manual","Zero"],["Switches","2","0"],["Time","1–2 min","0 sec"]] : [["Setup","Full redo","1 tap"],["Cards","Re-enter","Inherited"],["Friction","Maximum","Zero"]]).map(([l,b,a],i) => (<div key={i} style={{ flex: 1, maxWidth: 180 }}><div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 6, textAlign: "center" }}>{l.toUpperCase()}</div><div style={{ display: "flex", gap: 5 }}><div style={{ flex: 1, padding: "7px 8px", borderRadius: 8, background: C.redS, border: `1px solid ${C.red}10`, textAlign: "center" }}><span style={{ fontSize: 12, color: C.red, fontFamily: F.m, fontWeight: 500 }}>{b}</span></div><div style={{ flex: 1, padding: "7px 8px", borderRadius: 8, background: C.gG, border: `1px solid ${C.gB}`, textAlign: "center" }}><span style={{ fontSize: 12, color: C.grn, fontFamily: F.m, fontWeight: 500 }}>{a}</span></div></div></div>))}</div>}
    {done && scIdx < 2 && <div style={{ textAlign: "center", marginTop: 20 }}><Btn primary onClick={() => setScIdx(s => s + 1)}>Next: {SCENARIOS[scIdx + 1].label} →</Btn></div>}
  </div>);
}

// ═══════════════════════════════════════════════
// TAB 2: FOR DEVELOPERS
// ═══════════════════════════════════════════════
const Kw=({children})=><span style={{color:"#C792EA"}}>{children}</span>;const Fn2=({children})=><span style={{color:"#FFCB6B"}}>{children}</span>;const Str=({children})=><span style={{color:"#C3E88D"}}>{children}</span>;const Cm=({children})=><span style={{color:"#546E7A"}}>{children}</span>;const Nm=({children})=><span style={{color:"#F78C6C"}}>{children}</span>;const Pr=({children})=><span style={{color:"#89DDFF"}}>{children}</span>;const Tp=({children})=><span style={{color:"#FFCB6B"}}>{children}</span>;
const Code = ({ children, label }) => <div style={{ background: "#08080A", borderRadius: 14, padding: "16px 18px", border: `1px solid ${C.bd}`, fontFamily: F.m, fontSize: 11.5, lineHeight: 1.8, color: "#C5C0B8", whiteSpace: "pre", overflow: "auto" }}>{label && <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>}{children}</div>;

function DevTab() {
  const mob = useIsMobile();
  const [tab, setTab] = useState("code");
  return <div style={{ maxWidth: 920, margin: "0 auto", padding: "72px 0 80px" }}>
    <div style={{ textAlign: "center", marginBottom: 32 }}><Lbl style={{ color: C.goldM, marginBottom: 12, letterSpacing: 5 }}>FOR DEVELOPERS</Lbl><h2 style={{ fontFamily: F.b, fontSize: mob ? 20 : 30, fontWeight: 300, color: C.tx }}>30 minutes. Two API calls. <span style={{ fontFamily: F.d, color: C.gold }}>Zero cost.</span></h2></div>
    <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 24 }}>{[{ id: "code", l: "Integration" }, { id: "value", l: "Value Exchange" }].map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 20px", borderRadius: 10, border: "none", background: tab === t.id ? C.gG : "transparent", color: tab === t.id ? C.gold : C.txM, fontSize: 12.5, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>{t.l}</button>)}</div>
    {tab === "code" && <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12 }}>
      <Code label="1 · Initialize"><Kw>import</Kw> {"{ "}<Tp>TallionConnect</Tp>{" }"} <Kw>from</Kw> <Str>'@tallion-pay/connect'</Str>{"\n\n"}<Kw>const</Kw> <Pr>tallion</Pr> = <Kw>new</Kw> <Fn2>TallionConnect</Fn2>({`{\n  `}<Pr>apiKey</Pr>: <Str>'pk_live_...'</Str>,{`\n  `}<Pr>agentName</Pr>: <Str>'Poke'</Str>{`\n}`})</Code>
      <Code label="2 · Request payment"><Kw>const</Kw> <Pr>payment</Pr> = <Kw>await</Kw> <Pr>tallion</Pr>.<Fn2>requestPayment</Fn2>({`{\n  `}<Pr>consumerId</Pr>: <Str>'user_abc123'</Str>,{`\n  `}<Pr>amount</Pr>: <Nm>34200</Nm>,{`\n  `}<Pr>merchant</Pr>: <Str>'Delta Air Lines'</Str>{`\n}`})</Code>
      <Code label="3 · Handle response"><Kw>if</Kw> (<Pr>payment</Pr>.<Pr>status</Pr> === <Str>'approved'</Str>) {`{\n  `}<Kw>await</Kw> <Fn2>checkout</Fn2>(<Pr>payment</Pr>.<Pr>card</Pr>){`\n  `}<Kw>await</Kw> <Pr>tallion</Pr>.<Fn2>confirm</Fn2>(<Pr>payment</Pr>.<Pr>id</Pr>){`\n}`}</Code>
      <Code label="4 · Webhooks"><Cm>{"// payment.approved → card ready"}</Cm>{"\n"}<Cm>{"// payment.completed → settled"}</Cm>{"\n"}<Cm>{"// payment.declined → reason"}</Cm></Code>
    </div>}
    {tab === "value" && <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 14 }}>
      <Surf gold style={{ padding: 26 }}><div style={{ fontSize: 15, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 14 }}>Developer gets</div>{["Payment capability — free", "No PCI-DSS", "No fraud liability", "80M+ merchants via Visa", "Co-branded trust signal"].map((it,i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 9 }}><Chk s={12} c={C.grn}/><span style={{ fontSize: 13, color: C.tx, fontFamily: F.b }}>{it}</span></div>)}</Surf>
      <Surf style={{ padding: 26 }}><div style={{ fontSize: 15, color: C.txS, fontFamily: F.b, fontWeight: 600, marginBottom: 14 }}>Tallion earns</div>{["1.5–2% interchange (not shared)", "Consumer at $0 CAC", "Trust data per transaction", "Brand recognition"].map((it,i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 9 }}><div style={{ width: 5, height: 5, borderRadius: 3, background: C.gold, opacity: 0.4, flexShrink: 0 }}/><span style={{ fontSize: 13, color: C.txS, fontFamily: F.b }}>{it}</span></div>)}</Surf>
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════
// TAB 3: VS COMPETITORS (compact)
// ═══════════════════════════════════════════════
const COMPETITORS = [
  { name: "Stripe ACP", color: C.stripe, tag: "Only Stripe merchants. Delta.com isn't one.", verdict: "red", detail: "Checkout protocol, not payment capability. Only works where Stripe already is." },
  { name: "Visa TAP", color: "#1A1F71", tag: "Agent identity, zero consumer product.", verdict: "amb", detail: "Brilliant plumbing — but no approval UX, no controls, no app. Needs Tallion on top." },
  { name: "MC Agent Pay", color: C.mc, tag: "Locked to Mastercard. Bank-dependent UX.", verdict: "amb", detail: "Excellent tokens, but only MC holders. No cross-network, no unified experience." },
  { name: "Google AP2", color: C.google, tag: "Google ecosystem. Can't reach iMessage.", verdict: "amb", detail: "Most ambitious protocol but tied to Google. Poke on iMessage can't access Google Wallet." },
  { name: "Skyfire", color: "#FF6B35", tag: "Crypto-native. Delta doesn't accept USDC.", verdict: "red", detail: "USD→USDC conversion. Mainstream consumers booking flights need card rails, not blockchain." },
  { name: "Nekuda", color: "#8B5CF6", tag: "Closest competitor. $5M, pilot-only.", verdict: "amb", detail: "Same consumer thesis, but limited verticals, no virtual cards, very early." },
  { name: "Build In-House", color: C.txM, tag: "$500K+, 6–18 months, PCI, 50-state licensing.", verdict: "red", detail: "Poke raised $15M for AI, not fintech. Tallion gives them everything in 30 min, free." },
];

function CompTab() {
  const mob = useIsMobile();
  const [open, setOpen] = useState(null);
  return <div style={{ maxWidth: 880, margin: "0 auto", padding: "72px 20px 80px" }}>
    <div style={{ textAlign: "center", marginBottom: 28 }}><Lbl style={{ color: C.goldM, marginBottom: 12, letterSpacing: 5 }}>COMPETITIVE LANDSCAPE</Lbl><h2 style={{ fontFamily: F.b, fontSize: mob ? 20 : 30, fontWeight: 300, color: C.tx, marginBottom: 6 }}>What if Poke chose <span style={{ fontFamily: F.d, color: C.gold }}>something else?</span></h2></div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
      {COMPETITORS.map((c, i) => <div key={i} style={{ borderRadius: 16, border: `1px solid ${open === i ? c.color + "30" : C.bd}`, background: open === i ? `${c.color}04` : C.sf, overflow: "hidden" }}>
        <div onClick={() => setOpen(open === i ? null : i)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 13, fontFamily: F.b, fontWeight: 700, color: c.color }}>{c.name.charAt(0)}</span></div>
          <div style={{ flex: 1 }}><span style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>{c.name}</span><div style={{ fontSize: 11.5, color: C.txM, fontFamily: F.b, marginTop: 1 }}>{c.tag}</div></div>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: c.verdict === "red" ? C.redS : C.ambS, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.verdict === "red" ? <Xx s={11} c={C.red}/> : <Warn s={11} c={C.amb}/>}</div>
        </div>
        {open === i && <div style={{ padding: "0 20px 16px" }}><div style={{ fontSize: 12.5, color: C.txS, fontFamily: F.b, lineHeight: 1.6, padding: "10px 14px", borderRadius: 10, background: `${c.verdict === "red" ? C.red : C.amb}08`, border: `1px solid ${c.verdict === "red" ? C.red : C.amb}12` }}>{c.detail}</div></div>}
      </div>)}
    </div>
    <Surf gold style={{ padding: 22 }}><div style={{ fontSize: 13, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 8 }}>Tallion's position</div><div style={{ fontSize: 12.5, color: C.txM, fontFamily: F.b, lineHeight: 1.7 }}>Protocols build from above. Crypto builds from the edges. The consumer-facing middle — trusted controls, financial identity, seamless UX — is <span style={{ color: C.gold }}>strikingly underbuilt</span>. Tallion issues virtual Visa through Lithic. Works everywhere. Day one.</div></Surf>
  </div>;
}

// ═══════════════════════════════════════════════
// TAB 4: BUSINESS MODEL & VISION
// ═══════════════════════════════════════════════

function PhaseCard({ phase, title, timeline, color, icon, revenue, children, isActive, onClick }) {
  return (
    <div onClick={onClick} style={{ borderRadius: 20, border: `1px solid ${isActive ? color + "30" : C.bd}`, background: isActive ? `${color}04` : C.sf, cursor: "pointer", transition: "all 0.3s ease", overflow: "hidden" }}>
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}10`, border: `1px solid ${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color, fontFamily: F.m, fontWeight: 500 }}>PHASE {phase}</span>
            <span style={{ fontSize: 16, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>{title}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
            <span style={{ fontSize: 11, color: C.txM, fontFamily: F.b }}>{timeline}</span>
            {revenue && <span style={{ fontSize: 11, color, fontFamily: F.m, fontWeight: 500 }}>{revenue}</span>}
          </div>
        </div>
        <span style={{ fontSize: 18, color: C.txF, transition: "transform 0.3s", transform: isActive ? "rotate(180deg)" : "none" }}>▾</span>
      </div>
      {isActive && <div style={{ padding: "0 24px 24px" }}>{children}</div>}
    </div>
  );
}

function FlowDiagram({ steps, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", marginBottom: 16 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ padding: "6px 12px", borderRadius: 8, background: `${color}08`, border: `1px solid ${color}12` }}>
            <span style={{ fontSize: 11, color: s.highlight ? color : C.txS, fontFamily: F.b, fontWeight: s.highlight ? 600 : 400 }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && <Arrow2 s={12} c={`${color}40`} />}
        </div>
      ))}
    </div>
  );
}

// ─── BOTTOMS-UP MODEL DATA (7-YEAR) ───
// Conversion: 72-90%. Not an upsell — it's the only checkout path.
// Monthly spend: avg US household = ~$6K/mo. Agents handle 8% → 63% over 7 years.
// Banking: JPMorgan = ~$750/consumer/yr. Nubank = ~$50 at 100M. Tallion targets $400-600 at scale.
// McKinsey: $3-5T global agentic commerce by 2030. Tallion targets 10%+ share.
const MODEL = [
  { yr: 1, agents: 15,  cpa: 12,  conv: 72, uniq: 130,    mo: 450,  vol: 0.702,   directPct: 0,  merchants: 0,      premPct: 0,  balPct: 0,  avgBal: 0,    cardPct: 0,  depositPct: 0,  avgDep: 0,     lendPct: 0,   avgLoan: 0,     phase: 1 },
  { yr: 2, agents: 50,  cpa: 25,  conv: 78, uniq: 975,    mo: 750,  vol: 8.78,    directPct: 12, merchants: 1200,   premPct: 6,  balPct: 5,  avgBal: 800,  cardPct: 0,  depositPct: 0,  avgDep: 0,     lendPct: 0,   avgLoan: 0,     phase: 2 },
  { yr: 3, agents: 120, cpa: 42,  conv: 82, uniq: 4100,   mo: 1300, vol: 63.96,   directPct: 30, merchants: 8000,   premPct: 12, balPct: 10, avgBal: 1500, cardPct: 8,  depositPct: 0,  avgDep: 0,     lendPct: 0,   avgLoan: 0,     phase: 2 },
  { yr: 4, agents: 230, cpa: 62,  conv: 85, uniq: 12100,  mo: 1900, vol: 275.9,   directPct: 50, merchants: 30000,  premPct: 16, balPct: 18, avgBal: 2500, cardPct: 15, depositPct: 5,  avgDep: 4000,  lendPct: 1.5, avgLoan: 6000,  phase: 3 },
  { yr: 5, agents: 340, cpa: 82,  conv: 87, uniq: 24200,  mo: 2600, vol: 755,     directPct: 65, merchants: 80000,  premPct: 20, balPct: 25, avgBal: 3500, cardPct: 22, depositPct: 12, avgDep: 5500,  lendPct: 3,   avgLoan: 8000,  phase: 4 },
  { yr: 6, agents: 430, cpa: 102, conv: 89, uniq: 39000,  mo: 3200, vol: 1497.6,  directPct: 78, merchants: 200000, premPct: 22, balPct: 32, avgBal: 4500, cardPct: 28, depositPct: 18, avgDep: 6500,  lendPct: 5,   avgLoan: 10000, phase: 4 },
  { yr: 7, agents: 500, cpa: 120, conv: 90, uniq: 54000,  mo: 3800, vol: 2462.4,  directPct: 85, merchants: 350000, premPct: 24, balPct: 38, avgBal: 5500, cardPct: 32, depositPct: 25, avgDep: 8000,  lendPct: 7,   avgLoan: 12000, phase: 4 },
];

function calcRevenue(r) {
  const consumers = r.uniq * 1000; // uniq is in thousands (54000 = 54M)
  const visaVol = r.vol * (1 - r.directPct / 100);
  const directVol = r.vol * (r.directPct / 100);
  const interchange = visaVol * 0.01 * 1000; // net 1%, result in $M
  const directRev = directVol * 0.005 * 1000; // 0.5% margin, result in $M
  const premiumRev = (consumers * r.premPct / 100) * 9.99 * 12 / 1e6;
  const floatRev = (consumers * r.balPct / 100) * r.avgBal * 0.025 / 1e6;
  const cardRev = (consumers * r.cardPct / 100) * 50 / 1e6;
  const depositRev = (consumers * r.depositPct / 100) * r.avgDep * 0.035 / 1e6;
  const lendRev = (consumers * r.lendPct / 100) * r.avgLoan * 0.08 / 1e6;
  return { interchange, directRev, premiumRev, floatRev, cardRev, depositRev, lendRev,
    total: interchange + directRev + premiumRev + floatRev + cardRev + depositRev + lendRev };
}


function fmt(n) { return n >= 10000 ? `$${(n/1000).toFixed(0)}B` : n >= 1000 ? `$${(n/1000).toFixed(1)}B` : n >= 1 ? `$${Math.round(n)}M` : n > 0 ? `$${(n * 1000).toFixed(0)}K` : "—"; }
function fmtN(n) { return n >= 1000 ? `${(n/1000).toFixed(0)}M` : n >= 1 ? `${Math.round(n)}K` : `${n}`; }

function VisionTab() {
  const mob = useIsMobile();
  const [activePhase, setActivePhase] = useState(0);
  const [directView, setDirectView] = useState("how");
  const [hoveredYr, setHoveredYr] = useState(null);

  const maxTotal = Math.max(...MODEL.map(r => calcRevenue(r).total));

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "72px 20px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Lbl style={{ color: C.goldM, marginBottom: 12, letterSpacing: 5 }}>BUSINESS MODEL & VISION</Lbl>
        <h2 style={{ fontFamily: F.b, fontSize: 32, fontWeight: 300, color: C.tx, letterSpacing: -0.5, marginBottom: 8 }}>
          From payment rails to <span style={{ fontFamily: F.d, color: C.gold }}>the bank for agent commerce</span>
        </h2>
        <p style={{ fontFamily: F.b, fontSize: 14, color: C.txM, maxWidth: 580, margin: "0 auto" }}>
          Bottoms-up: agents → consumers → volume → stacking revenue layers. Seven years. AI moves fast.
        </p>
      </div>

      {/* ─── ASSUMPTIONS ─── */}
      <Surf style={{ padding: "18px 22px", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Lbl style={{ letterSpacing: 4, color: C.txF }}>KEY ASSUMPTIONS</Lbl>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(6, 1fr)", gap: 10 }}>
          {[
            { l: "Conversion", v: "72-90%", d: "Only way to checkout" },
            { l: "Monthly spend", v: "$450-3.8K", d: "8% to 63% of household" },
            { l: "Net interchange", v: "~1%", d: "After Lithic + Visa" },
            { l: "Direct margin", v: "~0.5%", d: "Float + premium on A2A" },
            { l: "Premium", v: "$9.99/mo", d: "Consumer subscription" },
            { l: "Consumer CAC", v: "$0", d: "Agent-distributed" },
          ].map((a, i) => (
            <div key={i}>
              <div style={{ fontSize: 16, fontFamily: F.d, color: C.gold }}>{a.v}</div>
              <div style={{ fontSize: 11, color: C.txS, fontFamily: F.b, marginTop: 2 }}>{a.l}</div>
              <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, marginTop: 1 }}>{a.d}</div>
            </div>
          ))}
        </div>
      </Surf>

      {/* ─── BOTTOMS-UP TABLE ─── */}
      <Surf style={{ padding: 0, marginBottom: 20, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px 6px", borderBottom: `1px solid ${C.bd}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Lbl style={{ letterSpacing: 4, color: C.txF }}>BOTTOMS-UP MODEL</Lbl>
            <span style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>Agents → Consumers → Volume → Revenue</span>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: 700, borderCollapse: "collapse", fontFamily: F.b, fontSize: 11 }}>
            <thead><tr style={{ borderBottom: `1px solid ${C.bd}` }}>
              {["", "Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5", "Yr 6", "Yr 7"].map((h, i) => (
                <th key={i} style={{ padding: "8px 10px", textAlign: i === 0 ? "left" : "right", color: C.txF, fontWeight: 500, fontSize: 10, letterSpacing: 1 }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {/* Section: Distribution */}
              <tr style={{ borderBottom: `1px solid ${C.bd}` }}>
                <td colSpan={8} style={{ padding: "8px 10px 4px", fontSize: 9, color: C.gold, letterSpacing: 3, fontWeight: 600 }}>DISTRIBUTION</td>
              </tr>
              {[
                { l: "Agents integrated", k: "agents", f: v => v },
                { l: "Avg consumers / agent", k: "cpa", f: v => `${v}K`, s: "K" },
                { l: "Tallion conversion", k: "conv", f: v => `${v}%` },
                { l: "Unique Tallion consumers", k: "uniq", f: v => fmtN(v), hl: true },
              ].map((row, ri) => (
                <tr key={ri} style={{ borderBottom: `1px solid ${C.bd}08` }}>
                  <td style={{ padding: "6px 10px", color: row.hl ? C.tx : C.txM, fontWeight: row.hl ? 500 : 400 }}>{row.l}</td>
                  {MODEL.map((r, i) => <td key={i} style={{ padding: "6px 10px", textAlign: "right", color: row.hl ? C.gold : C.txS, fontFamily: row.hl ? F.m : F.b, fontWeight: row.hl ? 500 : 400, fontSize: row.hl ? 12 : 11 }}>{row.f(r[row.k])}</td>)}
                </tr>
              ))}

              {/* Section: Volume */}
              <tr style={{ borderBottom: `1px solid ${C.bd}` }}>
                <td colSpan={8} style={{ padding: "8px 10px 4px", fontSize: 9, color: C.grn, letterSpacing: 3, fontWeight: 600 }}>TRANSACTION VOLUME</td>
              </tr>
              {[
                { l: "Monthly spend / consumer", k: "mo", f: v => `$${v}` },
                { l: "Annual volume", k: "vol", f: v => v >= 1000 ? `$${(v/1000).toFixed(1)}T` : v >= 1 ? `$${v.toFixed(1)}B` : `$${Math.round(v*1000)}M`, hl: true },
                { l: "Tallion Direct %", k: "directPct", f: v => v > 0 ? `${v}%` : "—", c: C.grn },
                { l: "Direct merchants", k: "merchants", f: v => v > 0 ? v.toLocaleString() : "—" },
              ].map((row, ri) => (
                <tr key={ri} style={{ borderBottom: `1px solid ${C.bd}08` }}>
                  <td style={{ padding: "6px 10px", color: row.hl ? C.tx : C.txM, fontWeight: row.hl ? 500 : 400 }}>{row.l}</td>
                  {MODEL.map((r, i) => <td key={i} style={{ padding: "6px 10px", textAlign: "right", color: row.hl ? C.grn : (row.c || C.txS), fontFamily: row.hl ? F.m : F.b, fontWeight: row.hl ? 500 : 400, fontSize: row.hl ? 12 : 11 }}>{row.f(r[row.k])}</td>)}
                </tr>
              ))}

              {/* Section: Revenue layers */}
              <tr style={{ borderBottom: `1px solid ${C.bd}` }}>
                <td colSpan={8} style={{ padding: "8px 10px 4px", fontSize: 9, color: C.gold, letterSpacing: 3, fontWeight: 600 }}>REVENUE LAYERS (STACKING)</td>
              </tr>
              {[
                { l: "Interchange (Visa rails)", f: r => calcRevenue(r).interchange, c: C.gold },
                { l: "Tallion Direct margin", f: r => calcRevenue(r).directRev, c: C.grn },
                { l: "Premium subscriptions", f: r => calcRevenue(r).premiumRev, c: C.amb },
                { l: "Float / balance yield", f: r => calcRevenue(r).floatRev, c: C.blu },
                { l: "Tallion Card interchange", f: r => calcRevenue(r).cardRev, c: C.gold },
                { l: "Deposit NIM", f: r => calcRevenue(r).depositRev, c: C.purple },
                { l: "Lending margin", f: r => calcRevenue(r).lendRev, c: C.purple },
              ].map((row, ri) => (
                <tr key={ri} style={{ borderBottom: `1px solid ${C.bd}08` }}>
                  <td style={{ padding: "5px 10px", color: C.txM }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: 2, background: row.c, opacity: 0.5, flexShrink: 0 }} />{row.l}</div></td>
                  {MODEL.map((r, i) => { const v = row.f(r); return <td key={i} style={{ padding: "5px 10px", textAlign: "right", color: v > 0 ? row.c : C.txF, fontFamily: F.m, fontSize: 10.5 }}>{v > 0 ? fmt(v) : "—"}</td>; })}
                </tr>
              ))}
              {/* TOTAL */}
              <tr style={{ borderTop: `1px solid ${C.gold}20` }}>
                <td style={{ padding: "10px 10px", color: C.tx, fontWeight: 600, fontSize: 12 }}>Total ARR</td>
                {MODEL.map((r, i) => { const rev = calcRevenue(r); return <td key={i} style={{ padding: "10px 10px", textAlign: "right", color: C.gold, fontFamily: F.m, fontWeight: 600, fontSize: 13 }}>{fmt(rev.total)}</td>; })}
              </tr>
            </tbody>
          </table>
        </div>
      </Surf>

      {/* ─── STACKED BAR CHART ─── */}
      <Surf style={{ padding: "18px 22px", marginBottom: 20 }}>
        <Lbl style={{ marginBottom: 14, letterSpacing: 4, color: C.txF }}>REVENUE STACK BY YEAR</Lbl>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 180 }}>
          {MODEL.map((r, i) => {
            const rev = calcRevenue(r);
            const h = (rev.total / maxTotal) * 160;
            const layers = [
              { v: rev.interchange, c: C.gold, l: "Interchange" },
              { v: rev.directRev, c: C.grn, l: "Direct" },
              { v: rev.premiumRev, c: C.amb, l: "Premium" },
              { v: rev.floatRev, c: C.blu, l: "Float" },
              { v: rev.cardRev, c: "#d4a94080", l: "Card" },
              { v: rev.depositRev, c: C.purple, l: "Deposits" },
              { v: rev.lendRev, c: "#A78BFA80", l: "Lending" },
            ].filter(l => l.v > 0);
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                onMouseEnter={() => setHoveredYr(i)} onMouseLeave={() => setHoveredYr(null)}>
                <div style={{ fontSize: 10, fontFamily: F.m, color: C.gold, fontWeight: 500, opacity: hoveredYr === i ? 1 : 0.7 }}>{fmt(rev.total)}</div>
                <div style={{ width: "100%", height: h, borderRadius: "6px 6px 2px 2px", overflow: "hidden", display: "flex", flexDirection: "column-reverse", transition: "all 0.3s ease", opacity: hoveredYr !== null && hoveredYr !== i ? 0.35 : 1 }}>
                  {layers.map((l, li) => (
                    <div key={li} style={{ width: "100%", height: `${(l.v / rev.total) * 100}%`, background: l.c, minHeight: l.v > 0 ? 2 : 0, transition: "height 0.5s ease" }} />
                  ))}
                </div>
                <div style={{ fontSize: 10, color: C.txM, fontFamily: F.b }}>Yr {r.yr}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
          {[
            { c: C.gold, l: "Interchange" }, { c: C.grn, l: "Tallion Direct" }, { c: C.amb, l: "Premium" },
            { c: C.blu, l: "Float" }, { c: C.purple, l: "Banking" },
          ].map((leg, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: leg.c }} />
              <span style={{ fontSize: 10, color: C.txM, fontFamily: F.b }}>{leg.l}</span>
            </div>
          ))}
        </div>
      </Surf>

      {/* ─── PER-USER ECONOMICS ─── */}
      <Surf gold style={{ padding: "18px 22px", marginBottom: 20 }}>
        <Lbl style={{ marginBottom: 12, letterSpacing: 4, color: C.goldM }}>REVENUE PER USER — HOW IT COMPOUNDS</Lbl>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 }}>
          {[
            { yr: "Year 1", rev: calcRevenue(MODEL[0]).total / MODEL[0].uniq * 1e3, layers: "Interchange only", color: C.gold, phase: "Phase 1" },
            { yr: "Year 3", rev: calcRevenue(MODEL[2]).total / MODEL[2].uniq * 1e3, layers: "+ Direct + Premium", color: C.grn, phase: "Phase 2" },
            { yr: "Year 5", rev: calcRevenue(MODEL[4]).total / MODEL[4].uniq * 1e3, layers: "+ Card + Bank", color: C.blu, phase: "Phase 3–4" },
            { yr: "Year 7", rev: calcRevenue(MODEL[6]).total / MODEL[6].uniq * 1e3, layers: "+ Deposits + Lending", color: C.purple, phase: "Full bank" },
          ].map((p, i) => (
            <div key={i} style={{ padding: 16, borderRadius: 14, background: `${p.color}06`, border: `1px solid ${p.color}12`, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2 }}>{p.yr} · {p.phase}</div>
              <div style={{ fontSize: 26, fontFamily: F.d, color: p.color, margin: "8px 0 4px" }}>${Math.round(p.rev)}</div>
              <div style={{ fontSize: 10, color: C.txM, fontFamily: F.b }}>per user / year</div>
              <div style={{ fontSize: 9, color: p.color, fontFamily: F.b, marginTop: 4, opacity: 0.7 }}>{p.layers}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)", border: `1px solid ${C.bd}`, textAlign: "center" }}>
          <span style={{ fontSize: 12, color: C.txM, fontFamily: F.b }}>Revenue per user grows <span style={{ color: C.gold, fontWeight: 600 }}>{Math.round(calcRevenue(MODEL[6]).total / MODEL[6].uniq * 1e3 / (calcRevenue(MODEL[0]).total / MODEL[0].uniq * 1e3))}×</span> from Phase 1 → Full Bank — same consumer, $0 incremental CAC</span>
        </div>
      </Surf>


      {/* ─── BANK COMPARABLES ─── */}
      <Surf style={{ padding: "18px 22px", marginBottom: 20 }}>
        <Lbl style={{ marginBottom: 12, letterSpacing: 4, color: C.txF }}>HOW TALLION COMPARES TO BANKS AT SCALE</Lbl>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 }}>
          {[
            { name: "JPMorgan Chase", users: "80M", arpu: "~$750", color: C.txM, note: "Full-service bank" },
            { name: "Nubank", users: "100M", arpu: "~$50", color: C.txM, note: "Digital bank, LatAm" },
            { name: "Cash App", users: "56M", arpu: "~$120", color: C.txM, note: "Payments + banking" },
            { name: "Tallion Year 7", users: fmtN(MODEL[6].uniq), arpu: "$" + Math.round(calcRevenue(MODEL[6]).total / MODEL[6].uniq * 1e3), color: C.gold, note: "Agent commerce bank" },
          ].map((b, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 12, background: i === 3 ? C.gG : C.sf, border: `1px solid ${i === 3 ? C.gB : C.bd}` }}>
              <div style={{ fontSize: 12, color: b.color, fontFamily: F.b, fontWeight: 600, marginBottom: 6 }}>{b.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 10, color: C.txF, fontFamily: F.b }}>Users</span>
                <span style={{ fontSize: 11, color: b.color, fontFamily: F.m }}>{b.users}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 10, color: C.txF, fontFamily: F.b }}>ARPU</span>
                <span style={{ fontSize: 11, color: b.color, fontFamily: F.m, fontWeight: 600 }}>{b.arpu}</span>
              </div>
              <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, marginTop: 4 }}>{b.note}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.5, textAlign: "center" }}>
          Tallion at scale has the user base of a Nubank, the ARPU approaching a JPMorgan — because Tallion sees <span style={{ color: C.gold }}>every transaction</span>, not just the ones that happen to flow through a bank account.
        </div>
      </Surf>

      {/* ─── PHASE DEEP DIVES ─── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>

        {/* PHASE 1 */}
        <PhaseCard phase={1} title="Payment Rails" timeline="Year 1" color={C.gold} revenue={fmt(calcRevenue(MODEL[0]).total) + " ARR"}
          icon={<Shield s={20} c={C.gold} />} isActive={activePhase === 0} onClick={() => setActivePhase(activePhase === 0 ? -1 : 0)}>
          <Lbl style={{ marginBottom: 8, letterSpacing: 4 }}>Money flow</Lbl>
          <FlowDiagram color={C.gold} steps={[
            { label: "Consumer" }, { label: "Tallion" }, { label: "Lithic", highlight: true },
            { label: "Visa" }, { label: "Processor" }, { label: "Merchant" },
          ]} />
          <div style={{ fontSize: 12, color: C.txM, fontFamily: F.b, lineHeight: 1.65, marginBottom: 12 }}>
            Free SDK. Agents integrate in 30 min. Consumer sets rules, Tallion issues single-use virtual Visa via Lithic. At $450/mo avg spend per consumer (flights, rides, shopping), interchange is the only revenue — but CAC is $0 and conversion is <span style={{ color: C.gold, fontWeight: 500 }}>72%+ from day one</span>.
          </div>
          <Surf gold style={{ padding: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 3 }}>Why 72%+ conversion?</div>
            <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.55 }}>
              Tallion isn't an upsell — it's the only way to complete the purchase. When Poke says "to book this flight, set up Tallion (90 sec)," the consumer is at peak intent. Same mechanic as Uber requiring a card. You don't NOT do it.
            </div>
          </Surf>
          <div style={{ padding: 12, borderRadius: 10, background: C.ambS, border: `1px solid ${C.amb}12` }}>
            <span style={{ fontSize: 11, color: C.amb, fontFamily: F.b }}><span style={{ fontWeight: 600 }}>Limitation:</span> Tallion only nets ~1% after Lithic + Visa. The merchant's processor (Stripe) takes another 2.9% from the merchant side. Everyone eats margin → Phase 2 fixes this.</span>
          </div>
        </PhaseCard>

        {/* PHASE 2 — TALLION DIRECT */}
        <PhaseCard phase={2} title="Tallion Direct" timeline="Years 2–3" color={C.grn} revenue={fmt(calcRevenue(MODEL[2]).total) + " ARR by Yr 3"}
          icon={<Zap s={20} c={C.grn} />} isActive={activePhase === 1} onClick={() => setActivePhase(activePhase === 1 ? -1 : 1)}>

          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 14 }}>
            {[{ id: "how", l: "How It Works" }, { id: "merchant", l: "Merchant Math" }, { id: "economics", l: "Unit Economics" }].map(t => (
              <button key={t.id} onClick={(e) => { e.stopPropagation(); setDirectView(t.id); }} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: directView === t.id ? C.grnS : "transparent", color: directView === t.id ? C.grn : C.txM, fontSize: 11.5, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>{t.l}</button>
            ))}
          </div>

          {directView === "how" && <>
            <Lbl style={{ marginBottom: 6, letterSpacing: 4 }}>Today: 6 parties take a cut</Lbl>
            <FlowDiagram color={C.red} steps={[{ label: "Consumer" }, { label: "Tallion" }, { label: "Lithic" }, { label: "Visa" }, { label: "Stripe" }, { label: "Merchant" }]} />
            <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}><div style={{ padding: "5px 14px", borderRadius: 7, background: C.grnS, border: `1px solid ${C.grn}15` }}><span style={{ fontSize: 11, color: C.grn, fontFamily: F.b, fontWeight: 600 }}>↓ Tallion Direct: skip 4 middlemen</span></div></div>
            <FlowDiagram color={C.grn} steps={[{ label: "Consumer", highlight: true }, { label: "Tallion", highlight: true }, { label: "Merchant", highlight: true }]} />
            <div style={{ fontSize: 12, color: C.txM, fontFamily: F.b, lineHeight: 1.65, marginTop: 8 }}>
              ACH / FedNow / RTP: Tallion debits consumer's bank, holds in trust, settles directly to merchant. Cost per transaction drops from ~0.6–0.8% (Lithic + network) to pennies. Merchant pays <span style={{ color: C.grn, fontWeight: 600 }}>0% processing fees</span>.
            </div>
          </>}

          {directView === "merchant" && <>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div style={{ padding: 16, borderRadius: 14, background: C.redS, border: `1px solid ${C.red}10` }}>
                <div style={{ fontSize: 12, color: C.red, fontFamily: F.b, fontWeight: 600, marginBottom: 8 }}>What merchants pay today</div>
                {[["Stripe", "2.9% + 30¢"], ["Adyen", "2.2% + 12¢"], ["Square", "2.6% + 10¢"], ["PayPal", "3.49% + 49¢"]].map(([n, f], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: i < 3 ? `1px solid ${C.red}08` : "none" }}>
                    <span style={{ fontSize: 11.5, color: C.txM, fontFamily: F.b }}>{n}</span>
                    <span style={{ fontSize: 11.5, color: C.red, fontFamily: F.m, fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: 16, borderRadius: 14, background: C.grnS, border: `1px solid ${C.grn}12`, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 12, color: C.grn, fontFamily: F.b, fontWeight: 600, marginBottom: 4 }}>Tallion Direct</div>
                <div style={{ fontSize: 42, fontFamily: F.d, color: C.grn }}>0%</div>
                <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 4 }}>Merchant keeps 100% of sale</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.txM, fontFamily: F.b, lineHeight: 1.6 }}>
              A merchant processing $1M/year saves <span style={{ color: C.grn, fontWeight: 600 }}>$29K–35K</span> by accepting Tallion Direct. The pitch: "Accept Tallion Direct and your agent commerce channel is free." We project <span style={{ color: C.tx }}>{MODEL[3].merchants.toLocaleString()} merchants</span> on Direct by Year 4, covering {MODEL[3].directPct}% of Tallion volume.
            </div>
          </>}

          {directView === "economics" && <>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div style={{ padding: 14, borderRadius: 12, background: C.gG, border: `1px solid ${C.gB}` }}>
                <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 4 }}>VIA VISA RAILS</div>
                <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.55 }}>Gross: 1.5–2% interchange<br />Lithic + network: –40%<br />Net: <span style={{ color: C.gold, fontWeight: 600 }}>~1% to Tallion</span></div>
              </div>
              <div style={{ padding: 14, borderRadius: 12, background: C.grnS, border: `1px solid ${C.grn}12` }}>
                <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 4 }}>VIA TALLION DIRECT</div>
                <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.55 }}>ACH: $0.20–0.50/tx<br />FedNow: $0.01–0.04/tx<br />Margin: <span style={{ color: C.grn, fontWeight: 600 }}>~0.5% + float + premium</span></div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.txM, fontFamily: F.b, lineHeight: 1.65 }}>
              By Year 3: <span style={{ color: C.tx }}>${(MODEL[2].vol * MODEL[2].directPct / 100).toFixed(1)}B</span> flows through Direct ({MODEL[2].directPct}% of volume). Plus <span style={{ color: C.tx }}>{fmtN(MODEL[2].uniq * MODEL[2].premPct / 100)}</span> premium subscribers at $9.99/mo. Total Year 3 ARR: <span style={{ color: C.grn, fontWeight: 600 }}>{fmt(calcRevenue(MODEL[2]).total)}</span>. By Year 4, Direct hits 50% → <span style={{ color: C.grn, fontWeight: 600 }}>{fmt(calcRevenue(MODEL[3]).total)}</span>.
            </div>
          </>}
        </PhaseCard>

        {/* PHASE 3 */}
        <PhaseCard phase={3} title="Financial Products" timeline="Year 4" color={C.blu} revenue={fmt(calcRevenue(MODEL[3]).total) + " ARR"}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blu} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3h-8l-2 4h12l-2-4z"/></svg>}
          isActive={activePhase === 2} onClick={() => setActivePhase(activePhase === 2 ? -1 : 2)}>
          <div style={{ fontSize: 12, color: C.txS, fontFamily: F.b, lineHeight: 1.65, marginBottom: 14 }}>
            {fmtN(MODEL[3].uniq)} consumers, ${MODEL[3].vol.toFixed(0)}B volume, {MODEL[3].merchants.toLocaleString()} Direct merchants. Tallion launches products built on the richest behavioral data in commerce.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 10 }}>
            {[
              { icon: "💳", title: "Tallion Card", desc: `Physical + virtual debit. ${MODEL[3].cardPct}% adoption by Yr 4. ~$45/user/yr card interchange.`, metric: `${fmtN(MODEL[3].uniq * MODEL[3].cardPct / 100)} holders` },
              { icon: "💰", title: "Tallion Balance", desc: `Hold funds, earn yield, instant agent funding. ${MODEL[3].balPct}% adoption, avg $${MODEL[3].avgBal.toLocaleString()} balance.`, metric: `${fmt(calcRevenue(MODEL[3]).floatRev)} yield rev` },
              { icon: "📊", title: "Tallion Credit", desc: "Agent transaction history = richest credit signal ever. Underwrite consumers bureaus can't score.", metric: "Launches Yr 5" },
              { icon: "🛡️", title: "Tallion Protect", desc: "Purchase protection, disputes, fraud insurance. Built in free, premium tier for higher coverage.", metric: "Bundled w/ Premium" },
            ].map((p, i) => (
              <div key={i} style={{ padding: 14, borderRadius: 14, background: C.sf, border: `1px solid ${C.bd}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 16 }}>{p.icon}</span><span style={{ fontSize: 12, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>{p.title}</span></div>
                  <span style={{ fontSize: 9, color: C.blu, fontFamily: F.m }}>{p.metric}</span>
                </div>
                <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </PhaseCard>

        {/* PHASE 4 */}
        <PhaseCard phase={4} title="The Bank for Agent Commerce" timeline="Years 5–7" color={C.purple} revenue={fmt(calcRevenue(MODEL[6]).total) + " ARR by Yr 7"}
          icon={<Bank s={20} c={C.purple} />} isActive={activePhase === 3} onClick={() => setActivePhase(activePhase === 3 ? -1 : 3)}>
          <div style={{ fontSize: 12, color: C.txS, fontFamily: F.b, lineHeight: 1.65, marginBottom: 14 }}>
            {fmtN(MODEL[6].uniq)} consumers. ${MODEL[6].vol.toFixed(0)}B volume. {MODEL[6].merchants.toLocaleString()} Direct merchants. Apply for bank charter Year 4, live by Year 5. In the AI era, financial infrastructure moves at software speed.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { title: "Deposits", desc: `${MODEL[6].depositPct}% of consumers hold avg $${(MODEL[6].avgDep/1000)}K. FDIC insured. 3.5% NIM.`, rev: fmt(calcRevenue(MODEL[6]).depositRev) + "/yr", color: C.purple },
              { title: "Lending", desc: `${MODEL[6].lendPct}% qualify for avg $${(MODEL[6].avgLoan/1000)}K loans. Agent data = best underwriting signal.`, rev: fmt(calcRevenue(MODEL[6]).lendRev) + "/yr", color: C.blu },
              { title: "Merchant Banking", desc: `${(MODEL[6].merchants/1000).toFixed(0)}K merchants get instant settlement, working capital, analytics.`, rev: "Incl. in Direct", color: C.grn },
            ].map((p, i) => (
              <div key={i} style={{ padding: 14, borderRadius: 14, background: `${p.color}06`, border: `1px solid ${p.color}12` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: p.color, fontFamily: F.b, fontWeight: 600 }}>{p.title}</span><span style={{ fontSize: 9, color: p.color, fontFamily: F.m }}>{p.rev}</span></div>
                <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <Surf gold style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 4 }}>The endgame: own the entire financial relationship</div>
            <div style={{ fontSize: 12, color: C.txM, fontFamily: F.b, lineHeight: 1.6 }}>
              Banks own the account. Card networks own the transaction. Processors own the checkout. Tallion owns <span style={{ color: C.tx }}>all three</span>. At {fmtN(MODEL[6].uniq)} consumers and ${MODEL[6].vol.toFixed(0)}B volume: <span style={{ color: C.gold, fontWeight: 600 }}>{fmt(calcRevenue(MODEL[6]).total)} ARR → $30–50B valuation.</span>
            </div>
          </Surf>
        </PhaseCard>
      </div>

      {/* ─── FLYWHEEL ─── */}
      <Surf gold style={{ padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><Shield s={14} c={C.gold} /><span style={{ fontSize: 12, color: C.gold, fontFamily: F.b, fontWeight: 600 }}>Each phase funds the next</span></div>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
          {[
            { n: "1", t: "Agents → Consumers", d: "Free SDK. $0 CAC. 65%+ convert because they must.", c: C.gold },
            { n: "2", t: "Volume → Direct", d: "Consumer base → merchants adopt. 0% fees. Skip Visa.", c: C.grn },
            { n: "3", t: "Data → Products", d: "Richest behavioral data → Card, Balance, Credit.", c: C.blu },
            { n: "4", t: "Trust → Bank", d: "Own deposits, lending, settlement. Year 5.", c: C.purple },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: `${s.c}10`, border: `1px solid ${s.c}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", fontSize: 12, fontFamily: F.d, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 11, color: s.c, fontFamily: F.b, fontWeight: 600, marginBottom: 3 }}>{s.t}</div>
              <div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, lineHeight: 1.4 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </Surf>
    </div>
  );
}


// ═══════════════════════════════════════════════
// TAB 5: TALLION APP
// ═══════════════════════════════════════════════
function TallionAppTab() {
  const mob = useIsMobile();
  const [screen, setScreen] = useState("home");
  const navItems = [
    { id: "home", icon: "⌂", label: "Home" },
    { id: "agents", icon: "🤖", label: "Agents" },
    { id: "card", icon: "💳", label: "Card" },
    { id: "rules", icon: "🛡️", label: "Rules" },
  ];

  const AppNav = () => (
    <div style={{ display: "flex", borderTop: `1px solid ${C.bd}`, padding: "6px 0 2px" }}>
      {navItems.map(n => (
        <div key={n.id} onClick={() => setScreen(n.id)} style={{ flex: 1, textAlign: "center", cursor: "pointer", padding: "4px 0" }}>
          <div style={{ fontSize: 16 }}>{n.icon}</div>
          <div style={{ fontSize: 8, color: screen === n.id ? C.gold : C.txF, fontFamily: F.b, fontWeight: screen === n.id ? 600 : 400, marginTop: 1 }}>{n.label}</div>
          {screen === n.id && <div style={{ width: 16, height: 2, borderRadius: 1, background: C.gold, margin: "2px auto 0" }} />}
        </div>
      ))}
    </div>
  );

  const HomeScreen = () => (
    <div style={{ flex: 1, padding: "10px 14px", overflow: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div><div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2 }}>TALLION BALANCE</div><div style={{ fontSize: 26, fontFamily: F.d, color: C.gold }}>$2,847</div></div>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield s={15} c={C.bg}/></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 6, marginBottom: 14 }}>
        <div style={{ padding: 10, borderRadius: 10, background: C.gG, border: `1px solid ${C.gB}` }}><div style={{ fontSize: 8, color: C.txF, fontFamily: F.b, letterSpacing: 2 }}>THIS MONTH</div><div style={{ fontSize: 16, fontFamily: F.d, color: C.tx, marginTop: 2 }}>$3,420</div><div style={{ fontSize: 9, color: C.grn, fontFamily: F.b, marginTop: 1 }}>32 transactions</div></div>
        <div style={{ padding: 10, borderRadius: 10, background: C.sf, border: `1px solid ${C.bd}` }}><div style={{ fontSize: 8, color: C.txF, fontFamily: F.b, letterSpacing: 2 }}>AGENTS</div><div style={{ fontSize: 16, fontFamily: F.d, color: C.tx, marginTop: 2 }}>4</div><div style={{ fontSize: 9, color: C.gold, fontFamily: F.b, marginTop: 1 }}>connected</div></div>
      </div>
      <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 8 }}>RECENT TRANSACTIONS</div>
      {[
        { agent: "🌴", name: "Poke", desc: "Delta Air Lines", amt: "$342.00", time: "2h ago", color: C.pk },
        { agent: "🌴", name: "Poke", desc: "Uber to Nobu", amt: "$28.50", time: "5h ago", color: C.pk, auto: true },
        { agent: "🤖", name: "ChatGPT", desc: "Sony WH-1000XM5", amt: "$348.00", time: "1d ago", color: C.gpt },
        { agent: "🛒", name: "Instacart AI", desc: "Whole Foods order", amt: "$127.34", time: "2d ago", color: C.blu },
        { agent: "🌴", name: "Poke", desc: "Blue Bottle Coffee", amt: "$14.50", time: "3d ago", color: C.pk, auto: true },
      ].map((tx, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.bd}08` }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `${tx.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{tx.agent}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ fontSize: 11.5, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>{tx.desc}</span>{tx.auto && <span style={{ fontSize: 7, color: C.gold, fontFamily: F.b, padding: "1px 4px", borderRadius: 3, background: C.gG }}>AUTO</span>}</div>
            <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>{tx.name} · {tx.time}</div>
          </div>
          <span style={{ fontSize: 12, color: C.tx, fontFamily: F.m, fontWeight: 500 }}>{tx.amt}</span>
        </div>
      ))}
    </div>
  );

  const AgentsScreen = () => (
    <div style={{ flex: 1, padding: "10px 14px", overflow: "auto" }}>
      <div style={{ fontSize: 15, color: C.tx, fontFamily: F.b, fontWeight: 600, marginBottom: 4 }}>Connected agents</div>
      <div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginBottom: 12 }}>4 agents using your Tallion account</div>
      {[
        { icon: "🌴", name: "Poke", desc: "iMessage assistant", spent: "$2,140", txns: 24, limit: "$500/tx", color: C.pk, trust: 94 },
        { icon: "🤖", name: "ChatGPT Operator", desc: "OpenAI", spent: "$892", txns: 8, limit: "$1,000/tx", color: C.gpt, trust: 88 },
        { icon: "🛒", name: "Instacart AI", desc: "Grocery agent", spent: "$412", txns: 6, limit: "$200/tx", color: C.blu, trust: 91 },
        { icon: "🏨", name: "Booking.com AI", desc: "Travel", spent: "$0", txns: 0, limit: "$2,000/tx", color: C.amb, trust: 82 },
      ].map((a, i) => (
        <div key={i} style={{ padding: 12, borderRadius: 14, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `${a.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{a.icon}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>{a.name}</div><div style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>{a.desc}</div></div>
            <div style={{ padding: "3px 8px", borderRadius: 6, background: C.gG, border: `1px solid ${C.gB}` }}><span style={{ fontSize: 10, color: C.gold, fontFamily: F.m, fontWeight: 500 }}>{a.trust}</span></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, padding: "4px 8px", borderRadius: 6, background: "rgba(255,255,255,0.02)" }}><div style={{ fontSize: 8, color: C.txF, fontFamily: F.b }}>SPENT</div><div style={{ fontSize: 11, color: C.tx, fontFamily: F.m }}>{a.spent}</div></div>
            <div style={{ flex: 1, padding: "4px 8px", borderRadius: 6, background: "rgba(255,255,255,0.02)" }}><div style={{ fontSize: 8, color: C.txF, fontFamily: F.b }}>TXS</div><div style={{ fontSize: 11, color: C.tx, fontFamily: F.m }}>{a.txns}</div></div>
            <div style={{ flex: 1, padding: "4px 8px", borderRadius: 6, background: "rgba(255,255,255,0.02)" }}><div style={{ fontSize: 8, color: C.txF, fontFamily: F.b }}>LIMIT</div><div style={{ fontSize: 11, color: C.gold, fontFamily: F.m }}>{a.limit}</div></div>
          </div>
        </div>
      ))}
    </div>
  );

  const CardScreen = () => (
    <div style={{ flex: 1, padding: "10px 14px", overflow: "auto" }}>
      <div style={{ padding: 18, borderRadius: 18, background: `linear-gradient(145deg, ${C.gold}18, ${C.goldM}08)`, border: `1px solid ${C.gB}`, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Shield s={14} c={C.gold} /><span style={{ fontSize: 12, color: C.gold, fontFamily: F.b, fontWeight: 600 }}>Tallion</span></div>
          <div style={{ width: 32, height: 20, borderRadius: 4, background: `linear-gradient(135deg, #1A1F71, #2D4AA8)` }}><span style={{ fontSize: 7, color: "white", fontFamily: F.b, fontWeight: 700, display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>VISA</span></div>
        </div>
        <div style={{ fontFamily: F.m, fontSize: 15, color: C.gold, letterSpacing: 3, marginBottom: 14 }}>4147 8293 0012 7744</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div><div style={{ fontSize: 7, color: C.txF, fontFamily: F.b, letterSpacing: 2 }}>CARDHOLDER</div><div style={{ fontSize: 10, color: C.tx, fontFamily: F.b }}>MATEUS SILVA</div></div>
          <div><div style={{ fontSize: 7, color: C.txF, fontFamily: F.b, letterSpacing: 2 }}>EXPIRES</div><div style={{ fontSize: 10, color: C.tx, fontFamily: F.m }}>09/29</div></div>
        </div>
      </div>
      <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 8 }}>ACTIVE VIRTUAL CARDS</div>
      {[
        { merchant: "Delta Air Lines", card: "•••• 8293", exp: "Expires in 45 min", status: "Active" },
        { merchant: "Amazon.com", card: "•••• 1057", exp: "Single-use", status: "Used" },
      ].map((vc, i) => (
        <div key={i} style={{ padding: 10, borderRadius: 10, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 5, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: i === 0 ? C.grn : C.txF }} />
          <div style={{ flex: 1 }}><div style={{ fontSize: 11, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>{vc.merchant}</div><div style={{ fontSize: 9, color: C.txF, fontFamily: F.m }}>{vc.card} · {vc.exp}</div></div>
        </div>
      ))}
      <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 8, marginTop: 14 }}>FUNDING METHODS</div>
      {[
        { type: "Debit", name: "Chase •••• 4821", primary: true },
        { type: "Credit", name: "Amex •••• 1002", primary: false },
      ].map((fm, i) => (
        <div key={i} style={{ padding: 10, borderRadius: 10, background: i === 0 ? C.gG : C.sf, border: `1px solid ${i === 0 ? C.gB : C.bd}`, marginBottom: 5, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: i === 0 ? C.gold : C.txS, fontFamily: F.b }}>{fm.type}</span>
          <span style={{ fontSize: 11, color: C.txM, fontFamily: F.m, flex: 1 }}>{fm.name}</span>
          {fm.primary && <span style={{ fontSize: 7, color: C.gold, fontFamily: F.b, padding: "2px 5px", borderRadius: 4, background: `${C.gold}10` }}>PRIMARY</span>}
        </div>
      ))}
    </div>
  );

  const RulesScreen = () => (
    <div style={{ flex: 1, padding: "10px 14px", overflow: "auto" }}>
      <div style={{ fontSize: 15, color: C.tx, fontFamily: F.b, fontWeight: 600, marginBottom: 4 }}>Spending rules</div>
      <div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginBottom: 12 }}>Global limits + per-agent overrides</div>
      <div style={{ padding: 12, borderRadius: 12, background: C.gG, border: `1px solid ${C.gB}`, marginBottom: 10 }}>
        <div style={{ fontSize: 9, color: C.goldM, fontFamily: F.b, letterSpacing: 2, marginBottom: 6 }}>GLOBAL DEFAULTS</div>
        {[["Max per transaction", "$500"], ["Daily cap", "$2,000"], ["Auto-approve under", "$50"]].map(([l, v], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 2 ? `1px solid ${C.gold}08` : "none" }}>
            <span style={{ fontSize: 11, color: C.txS, fontFamily: F.b }}>{l}</span>
            <span style={{ fontSize: 11, color: C.gold, fontFamily: F.m, fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 6 }}>AGENT OVERRIDES</div>
      {[
        { icon: "🌴", name: "Poke", auto: "$75", max: "$500", color: C.pk },
        { icon: "🛒", name: "Instacart AI", auto: "$200", max: "$300", color: C.blu },
      ].map((a, i) => (
        <div key={i} style={{ padding: 10, borderRadius: 10, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 12 }}>{a.icon}</span><span style={{ fontSize: 11, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>{a.name}</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ flex: 1, padding: "4px 6px", borderRadius: 5, background: C.gG }}><div style={{ fontSize: 7, color: C.txF, fontFamily: F.b }}>AUTO</div><div style={{ fontSize: 10, color: C.gold, fontFamily: F.m }}>{a.auto}</div></div>
            <div style={{ flex: 1, padding: "4px 6px", borderRadius: 5, background: "rgba(255,255,255,0.02)" }}><div style={{ fontSize: 7, color: C.txF, fontFamily: F.b }}>MAX</div><div style={{ fontSize: 10, color: C.txS, fontFamily: F.m }}>{a.max}</div></div>
          </div>
        </div>
      ))}
      <div style={{ padding: 10, borderRadius: 10, background: C.redS, border: `1px solid ${C.red}08`, marginTop: 8 }}>
        <div style={{ fontSize: 9, color: C.red, fontFamily: F.b, letterSpacing: 2, marginBottom: 4 }}>BLOCKED CATEGORIES</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{["Gambling", "Crypto", "Adult content"].map(c => <span key={c} style={{ padding: "3px 8px", borderRadius: 5, background: `${C.red}10`, fontSize: 9, color: C.red, fontFamily: F.b }}>{c}</span>)}</div>
      </div>
      <div style={{ padding: 10, borderRadius: 10, background: C.grnS, border: `1px solid ${C.grn}08`, marginTop: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Chk s={10} c={C.grn}/><span style={{ fontSize: 10, color: C.grn, fontFamily: F.b, fontWeight: 500 }}>Smart suggestion</span></div>
        <div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginTop: 3, lineHeight: 1.4 }}>Based on your Poke spending, raise auto-approve to $75? You've approved 12 transactions under $75 this month.</div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "72px 20px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <Lbl style={{ color: C.goldM, marginBottom: 12, letterSpacing: 5 }}>THE TALLION APP</Lbl>
        <h2 style={{ fontFamily: F.b, fontSize: mob ? 22 : 32, fontWeight: 300, color: C.tx, letterSpacing: -0.5, marginBottom: 6 }}>
          Your <span style={{ fontFamily: F.d, color: C.gold }}>agent control center</span>
        </h2>
        <p style={{ fontFamily: F.b, fontSize: 13, color: C.txM, maxWidth: 480, margin: "0 auto" }}>
          Every agent. Every transaction. Every rule. One app. Downloaded at first purchase, essential by the third.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 20 : 40, justifyContent: "center", alignItems: mob ? "center" : "flex-start" }}>
        <Phone label="Tallion" labelColor={C.gold} glow="gold">
          <div style={{ padding: "4px 14px 6px", display: "flex", alignItems: "center", gap: 6 }}>
            <Shield s={12} c={C.gold} /><span style={{ fontSize: 13, color: C.gold, fontFamily: F.b, fontWeight: 600 }}>Tallion</span>
          </div>
          {screen === "home" && <HomeScreen />}
          {screen === "agents" && <AgentsScreen />}
          {screen === "card" && <CardScreen />}
          {screen === "rules" && <RulesScreen />}
          <AppNav />
        </Phone>
        <div style={{ maxWidth: mob ? "100%" : 380, paddingTop: mob ? 0 : 40 }}>
          {[
            { id: "home", title: "Dashboard", desc: "Tallion Balance, monthly spend, recent transactions across all agents. See everything at a glance.", color: C.gold, features: ["Real-time transaction feed", "Spending by agent", "Monthly analytics"] },
            { id: "agents", title: "Connected Agents", desc: "Every agent using your Tallion. See trust scores, spending history, and per-agent limits.", color: C.grn, features: ["Trust scores per agent", "Spending & transaction count", "Per-agent limit overrides"] },
            { id: "card", title: "Tallion Card", desc: "Physical + virtual card. See active virtual cards issued for each purchase. Manage funding methods.", color: C.blu, features: ["Virtual cards self-destruct after use", "Card never exposed to agents", "Primary + backup funding"] },
            { id: "rules", title: "Smart Rules", desc: "Global defaults + per-agent overrides. Tallion suggests smarter limits based on your behavior.", color: C.purple, features: ["Auto-approve thresholds", "Blocked categories", "AI-powered suggestions"] },
          ].map((s, i) => (
            <div key={s.id} onClick={() => setScreen(s.id)} style={{ padding: 16, borderRadius: 14, background: screen === s.id ? `${s.color}06` : "transparent", border: `1px solid ${screen === s.id ? s.color + "15" : "transparent"}`, cursor: "pointer", marginBottom: 6, transition: "all 0.3s ease" }}>
              <div style={{ fontSize: 13, color: screen === s.id ? s.color : C.txM, fontFamily: F.b, fontWeight: 600, marginBottom: 3 }}>{s.title}</div>
              <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, lineHeight: 1.5, marginBottom: screen === s.id ? 8 : 0 }}>{screen === s.id ? s.desc : ""}</div>
              {screen === s.id && <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {s.features.map((f, fi) => <div key={fi} style={{ display: "flex", alignItems: "center", gap: 5 }}><Chk s={9} c={s.color} /><span style={{ fontSize: 10, color: C.txS, fontFamily: F.b }}>{f}</span></div>)}
              </div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function TallionDemo() {
  const mob = useIsMobile();
  const [view, setView] = useState("ba");
  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
        html{background:#0a0a0a}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(212,169,64,0.06);border-radius:2px}
        button{outline:none}button:hover{filter:brightness(1.08)}button:active{transform:scale(0.97)}
      `}</style>
      <div style={{ minHeight: "100vh", color: C.tx, background: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,169,64,0.03), transparent 60%), ${C.bg}` }}>
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.25, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(5,5,5,0.85)", backdropFilter: "blur(40px)", borderBottom: `1px solid ${C.bd}` }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Image src="/images/tallion-icon-256.png" alt="Tallion" width={22} height={22} style={{ borderRadius: 6 }} /><span style={{ fontFamily: F.b, fontWeight: 600, fontSize: 14, color: C.gold, letterSpacing: "0.12em" }}>tallion</span></div>
              <div style={{ display: "flex", gap: 2 }}>
                {[{ id: "ba", l: "Before & After" }, { id: "app", l: "Tallion App" }, { id: "dev", l: "Developers" }, { id: "comp", l: "Competitors" }, { id: "vision", l: "Vision" }].map(t => (
                  <button key={t.id} onClick={() => setView(t.id)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: view === t.id ? C.gG : "transparent", color: view === t.id ? C.gold : C.txM, fontSize: 11.5, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>{t.l}</button>
                ))}
              </div>
            </div>
          </div>
          {view === "ba" && <BeforeAfterTab />}
          {view === "app" && <TallionAppTab />}
          {view === "dev" && <DevTab />}
          {view === "comp" && <CompTab />}
          {view === "vision" && <VisionTab />}
        </div>
      </div>
    </>
  );
}

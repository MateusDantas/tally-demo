import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// TALLY — COMPLETE DEMO
// Tab 1: Before & After (two phones)
// Tab 2: For Developers (code, value, table)
// Tab 3: vs. Competitors (visual landscape)
// ═══════════════════════════════════════════════════════════════

const C = {
  gold: "#BFA36D", goldM: "#917A4A",
  gG: "rgba(191,163,109,0.07)", gB: "rgba(191,163,109,0.12)",
  bg: "#050505", sf: "rgba(255,255,255,0.018)",
  bd: "rgba(255,255,255,0.04)",
  tx: "#EDE8DF", txS: "#B8B0A2", txM: "#6B6560", txF: "#3D3935",
  grn: "#6FCF97", grnS: "rgba(111,207,151,0.10)",
  red: "#EB5757", redS: "rgba(235,87,87,0.06)",
  blu: "#6B9FD4", amb: "#E2B657", ambS: "rgba(226,182,87,0.06)",
  pk: "#34C77B", pkS: "rgba(52,199,123,0.08)",
  gpt: "#74AA9C",
  stripe: "#635BFF", visa: "#1A1F71", mc: "#EB001B", google: "#4285F4",
  coinbase: "#0052FF", skyfire: "#FF6B35",
};
const F = { d: "'DM Serif Display', Georgia, serif", b: "'DM Sans', sans-serif", m: "'IBM Plex Mono', monospace" };

const Shield = ({s=15,c=C.gold}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const Chk = ({s=13,c=C.grn}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Xx = ({s=13,c=C.red}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const Ext = ({s=11,c=C.txF}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const Warn = ({s=13,c=C.amb}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const Lbl = ({children,style}) => <div style={{fontSize:10,fontFamily:F.b,fontWeight:500,color:C.txM,letterSpacing:3,textTransform:"uppercase",...style}}>{children}</div>;
const GLine = ({w=40}) => <div style={{width:w,height:1,background:`linear-gradient(90deg, ${C.gold}50, transparent)`,margin:"4px 0 0"}}/>;
const TimerBadge = ({time,color=C.amb}) => <div style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:6,background:`${color}10`,border:`1px solid ${color}12`}}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span style={{fontSize:10,fontFamily:F.m,color,fontWeight:500}}>{time}</span></div>;

// ─── PHONE ───
const Phone = ({ children, label, labelColor = C.txF, glow }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {glow === "red" && <Xx s={10} c={C.red} />}
      {glow === "gold" && <Shield s={10} c={C.gold} />}
      <span style={{ fontSize: 9, color: labelColor, fontFamily: F.b, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
    </div>
    <div style={{
      background: "#0D0D0D", borderRadius: 36, padding: 6,
      border: `1px solid ${glow === "gold" ? `${C.gold}15` : (glow === "red" ? `${C.red}10` : "rgba(255,255,255,0.06)")}`,
      boxShadow: `0 32px 64px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06) inset${glow === "gold" ? `, 0 0 40px ${C.gG}` : ""}`,
      width: 300, flexShrink: 0,
    }}>
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

const PokeHeader = () => (
  <div style={{ padding: "6px 14px 10px", borderBottom: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: 28, height: 28, borderRadius: 14, background: `linear-gradient(145deg, ${C.pk}, #1B9E5E)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🌴</div>
    <div><div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>Poke</div><div style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>iMessage</div></div>
  </div>
);

const Bub = ({ text, from, vis = true }) => (
  <div style={{ alignSelf: from === "user" ? "flex-end" : "flex-start", maxWidth: "84%", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(6px)", transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
    <div style={{ padding: "10px 14px", borderRadius: 18, borderBottomRightRadius: from === "user" ? 4 : 18, borderBottomLeftRadius: from === "agent" ? 4 : 18, background: from === "user" ? `linear-gradient(135deg, ${C.pk}20, ${C.pk}0A)` : "rgba(255,255,255,0.04)", border: `1px solid ${from === "user" ? `${C.pk}15` : C.bd}` }}>
      <div style={{ fontSize: 13, color: from === "user" ? C.tx : C.txS, fontFamily: F.b, lineHeight: 1.55 }}>{text}</div>
    </div>
  </div>
);

const SysCard = ({ children, color = C.gold, vis = true }) => (
  <div style={{ margin: "4px 0", padding: "12px 14px", borderRadius: 14, background: `${color}06`, border: `1px solid ${color}10`, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(6px)", transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)" }}>{children}</div>
);

const Surf = ({ children, style, gold, onClick }) => (
  <div onClick={onClick} style={{ background: gold ? `linear-gradient(165deg, rgba(191,163,109,0.055), rgba(191,163,109,0.015))` : C.sf, borderRadius: 18, border: `1px solid ${gold ? C.gB : C.bd}`, cursor: onClick ? "pointer" : "default", transition: "all 0.3s ease", ...style }}>{children}</div>
);

const Btn = ({ children, onClick, primary, style }) => (
  <button onClick={onClick} style={{ padding: "12px 28px", borderRadius: 12, border: primary ? "none" : `1px solid ${C.gold}28`, background: primary ? `linear-gradient(135deg, ${C.gold}, ${C.goldM})` : "transparent", color: primary ? "#080706" : C.gold, fontSize: 13, fontFamily: F.b, fontWeight: 600, cursor: "pointer", boxShadow: primary ? `0 6px 24px rgba(191,163,109,0.18)` : "none", ...style }}>{children}</button>
);

// ═══════════════════════════════════════════════
// TAB 1: BEFORE & AFTER
// ═══════════════════════════════════════════════
const SCENARIOS = [
  { id: "first", label: "First Purchase", maxStep: 8 },
  { id: "repeat", label: "Repeat Purchase", maxStep: 5 },
  { id: "second", label: "Second Agent", maxStep: 5 },
];

function WithoutTally({ scenario, step }) {
  if (scenario === "first") {
    return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {step <= 3 ? (<><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
        <Bub from="user" text="book me a flight to NYC next friday, cheapest nonstop" vis={step >= 0} />
        <Bub from="agent" text="found it! Delta DL482, $342 nonstop. $55 less than last week 📉" vis={step >= 1} />
        {step >= 2 && <Bub from="user" text="book it" />}
        {step >= 2 && <Bub from="agent" text="i can't make purchases yet 😕 here's the link to book yourself:" />}
        {step >= 3 && <SysCard color={C.red}><div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><Ext s={11} c={C.red} /><span style={{ fontSize: 10, color: C.red, fontFamily: F.b, fontWeight: 600 }}>EXTERNAL LINK</span></div><div style={{ fontSize: 11, color: C.txM, fontFamily: F.b }}>delta.com/flights/DL482...</div><div style={{ marginTop: 6, padding: 8, borderRadius: 8, background: `${C.red}10`, textAlign: "center" }}><span style={{ fontSize: 11, color: C.red, fontFamily: F.b, fontWeight: 600 }}>Open in Safari →</span></div></SysCard>}
      </div></>) : step <= 5 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "8px 14px", background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ flex: 1, padding: "5px 10px", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.bd}` }}><span style={{ fontSize: 10, color: C.txM, fontFamily: F.m }}>delta.com/booking/DL482</span></div>
          </div>
          <div style={{ flex: 1, padding: 16 }}>
            <div style={{ fontSize: 11, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 10 }}>DELTA AIR LINES</div>
            <div style={{ padding: 14, borderRadius: 12, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>DL482 · LAX → JFK</div>
              <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 2 }}>Fri, Mar 7 · Nonstop</div>
              <div style={{ fontSize: 18, fontFamily: F.d, color: C.tx, marginTop: 8 }}>$342.00</div>
            </div>
            {step === 4 && <><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ fontSize: 12, color: C.txS, fontFamily: F.b, fontWeight: 500 }}>Sign in</span><TimerBadge time="2–5 min" /></div>{["Email", "Password"].map(f => <div key={f} style={{ padding: "10px 12px", borderRadius: 8, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 6 }}><span style={{ fontSize: 12, color: C.txF, fontFamily: F.b }}>{f}</span></div>)}<div style={{ fontSize: 10, color: C.red, fontFamily: F.b, marginTop: 4, opacity: 0.7 }}>Forgot password?</div></>}
            {step >= 5 && <><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ fontSize: 12, color: C.txS, fontFamily: F.b, fontWeight: 500 }}>Payment</span><TimerBadge time="1–2 min" /></div>{["Card number", "MM / YY", "CVV", "Billing zip"].map(f => <div key={f} style={{ padding: "10px 12px", borderRadius: 8, background: C.sf, border: `1px solid ${C.bd}`, marginBottom: 5 }}><span style={{ fontSize: 12, color: C.txF, fontFamily: F.b }}>{f}</span></div>)}<div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, marginTop: 4 }}>💳 Get wallet. Type 16 digits manually.</div></>}
          </div>
        </div>
      ) : step === 6 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ fontSize: 24, marginBottom: 14 }}>🏦</div>
          <div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 500, marginBottom: 4 }}>Bank verification</div>
          <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, textAlign: "center", lineHeight: 1.5, marginBottom: 16 }}>Switch to Chase app, find notification, approve, switch back.</div>
          <TimerBadge time="30–60 sec" />
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
            {["Close Safari", "Open Chase", "Find notification", "Approve", "Back to Safari"].map((s, i) => <div key={i} style={{ padding: "5px 10px", borderRadius: 6, background: C.ambS, border: `1px solid ${C.amb}08` }}><span style={{ fontSize: 10, color: C.amb, fontFamily: F.b }}>{i+1}. {s}</span></div>)}
          </div>
        </div>
      ) : step === 7 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ width: 50, height: 50, borderRadius: 25, background: C.grnS, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><Chk s={24} c={C.grn} /></div>
          <div style={{ fontSize: 15, color: C.tx, fontFamily: F.b, fontWeight: 500 }}>Confirmed</div>
          <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 2, marginBottom: 16 }}>DL-7829K</div>
          <div style={{ padding: 12, borderRadius: 10, background: C.ambS, border: `1px solid ${C.amb}12`, textAlign: "center", width: "100%" }}>
            <div style={{ fontSize: 10, color: C.amb, fontFamily: F.b, fontWeight: 500 }}>Now go back to Poke and tell it the code...</div>
          </div>
        </div>
      ) : (<><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
        <Bub from="user" text="i booked it. confirmation DL-7829K" />
        <Bub from="agent" text="added to your calendar 📅" />
        <SysCard color={C.amb}><TimerBadge time="8–15 min total" color={C.red} /><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginTop: 6 }}>4 app switches · typed card · you did all the work</div></SysCard>
      </div></>)}
    </div>;
  }
  if (scenario === "repeat") {
    return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
      <Bub from="user" text="get me an uber to Nobu tonight" vis={step >= 0} />
      {step >= 1 && <Bub from="agent" text="UberX, 12 min, $28.50. but i still can't book 😕" />}
      {step >= 2 && <SysCard color={C.red}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><Ext s={10} c={C.red} /><span style={{ fontSize: 10, color: C.red, fontFamily: F.b, fontWeight: 600 }}>OPEN UBER APP</span></div></SysCard>}
      {step >= 3 && <Bub from="user" text="ugh, fine" />}
      {step >= 4 && <SysCard color={C.amb}><div style={{ fontSize: 11, color: C.amb, fontFamily: F.b, fontWeight: 500, marginBottom: 4 }}>Every. Single. Time.</div><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b }}>Open Uber, enter destination, confirm, tell Poke.</div><TimerBadge time="1–2 min" /></SysCard>}
      {step >= 5 && <Bub from="user" text="ok booked. Marcus, gray Camry, 12 min" />}
    </div></div>;
  }
  return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "6px 14px 10px", borderBottom: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 28, height: 28, borderRadius: 14, background: `${C.gpt}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🤖</div><div><div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>ChatGPT</div><div style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>Operator</div></div></div>
    <div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
      <Bub from="user" text="order Sony WH-1000XM5 headphones" vis={step >= 0} />
      {step >= 1 && <Bub from="agent" text="$348 on Amazon. can't purchase yet." />}
      {step >= 2 && <SysCard color={C.red}><Ext s={10} c={C.red} /><span style={{ fontSize: 10, color: C.red, fontFamily: F.b, fontWeight: 600, marginLeft: 6 }}>OPEN AMAZON.COM</span><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginTop: 4 }}>New agent. Same problem.</div></SysCard>}
      {step >= 3 && <Bub from="user" text="again?? 😤" />}
      {step >= 4 && <SysCard color={C.red}><div style={{ fontSize: 11, color: C.red, fontFamily: F.b, fontWeight: 500 }}>The pattern repeats forever</div><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginTop: 4 }}>Every agent. Every purchase. You're the middleware.</div></SysCard>}
    </div>
  </div>;
}

function WithTally({ scenario, step }) {
  if (scenario === "first") {
    return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {step <= 2 ? (<><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
        <Bub from="user" text="book me a flight to NYC next friday, cheapest nonstop" vis={step >= 0} />
        <Bub from="agent" text="found it! Delta DL482, $342 nonstop. $55 less than last week 📉" vis={step >= 1} />
        {step >= 2 && <Bub from="user" text="book it" />}
        {step >= 2 && <Bub from="agent" text="requesting payment… you'll get an approval from Tally 📱" />}
      </div></>) : step <= 4 ? (
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {step === 3 && <div style={{ width: "100%", padding: "8px 12px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.bd}`, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield s={9} c={C.bg}/></div>
            <div style={{ flex: 1 }}><div style={{ fontSize: 10.5, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>Tally</div><div style={{ fontSize: 9, color: C.txM, fontFamily: F.b }}>Poke wants to pay $342.00</div></div>
          </div>}
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 20px rgba(191,163,109,0.22)`, marginTop: step === 3 ? 4 : 20, marginBottom: 12 }}><Shield s={18} c={C.bg}/></div>
          <div style={{ fontSize: 12, color: C.txS, fontFamily: F.b, fontWeight: 500 }}>Payment Request</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 14, marginTop: 2 }}><span style={{ fontSize: 10 }}>🌴</span><span style={{ fontSize: 10.5, color: C.txM, fontFamily: F.b }}>via Poke</span></div>
          <div style={{ fontSize: 36, fontFamily: F.d, color: C.gold, letterSpacing: -1 }}>$342</div>
          <div style={{ fontSize: 12, color: C.txM, fontFamily: F.b, marginBottom: 14 }}>Delta Air Lines</div>
          <div style={{ padding: "8px 10px", borderRadius: 10, background: C.sf, border: `1px solid ${C.bd}`, width: "100%", marginBottom: 6 }}>
            <div style={{ fontSize: 8, color: C.txF, fontFamily: F.b, letterSpacing: 1.5, marginBottom: 2 }}>REASONING</div>
            <div style={{ fontSize: 11, color: C.txS, fontFamily: F.b, lineHeight: 1.4 }}>Cheapest nonstop LAX→JFK. $55 less.</div>
          </div>
          {step === 4 ? <div style={{ width: "100%", textAlign: "center", marginTop: 6 }}><div style={{ width: 48, height: 48, borderRadius: 24, background: C.grnS, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}><Chk s={22} c={C.grn}/></div><div style={{ fontSize: 13, color: C.grn, fontFamily: F.b, fontWeight: 600 }}>Approved</div><div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}><TimerBadge time="5 sec" color={C.grn} /></div></div>
          : <div style={{ display: "flex", gap: 8, width: "100%", marginTop: 4 }}>
            <button style={{ flex: 1, padding: 10, borderRadius: 12, border: `1px solid ${C.red}12`, background: `${C.red}06`, color: C.red, fontSize: 12, fontFamily: F.b, fontWeight: 500, cursor: "default" }}>Decline</button>
            <button style={{ flex: 2, padding: 10, borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${C.gold}, ${C.goldM})`, color: C.bg, fontSize: 12, fontFamily: F.b, fontWeight: 600, cursor: "default", boxShadow: `0 4px 14px rgba(191,163,109,0.18)` }}>Approve · Face ID</button>
          </div>}
        </div>
      ) : (<><div style={{ padding: "8px 14px", borderBottom: `1px solid ${C.bd}` }}><div style={{ padding: 10, borderRadius: 10, background: C.gG, border: `1px solid ${C.gB}` }}>
        <Lbl style={{ color: C.goldM, fontSize: 8, marginBottom: 4, letterSpacing: 3 }}>VIRTUAL CARD</Lbl>
        <div style={{ fontFamily: F.m, fontSize: 13, color: C.gold, letterSpacing: 2 }}>4147 •••• •••• 8293</div>
        <div style={{ display: "flex", gap: 14, marginTop: 6 }}>{[["TTL","15m"], ["USE","Single"]].map(([l,v]) => <div key={l}><div style={{ fontSize: 7, color: C.txF, letterSpacing: 1.5, fontFamily: F.b }}>{l}</div><div style={{ fontSize: 10, color: C.tx, fontFamily: F.m }}>{v}</div></div>)}</div>
      </div></div><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
        {step >= 5 && <SysCard color={C.grn}><div style={{ display: "flex", alignItems: "center", gap: 5 }}><Chk s={10} c={C.grn}/><span style={{ fontSize: 10, color: C.grn, fontFamily: F.b, fontWeight: 600 }}>APPROVED</span></div></SysCard>}
        {step >= 6 && <Bub from="agent" text="booked ✓ Delta DL482, conf DL-7829K 📅" />}
        {step >= 7 && <SysCard color={C.grn}><TimerBadge time="~30 sec total" color={C.grn} /><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginTop: 4 }}>0 app switches · card never exposed</div></SysCard>}
      </div></>)}
    </div>;
  }
  if (scenario === "repeat") {
    return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}><PokeHeader /><div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
      <Bub from="user" text="get me an uber to Nobu tonight" vis={step >= 0} />
      {step >= 1 && <Bub from="agent" text="UberX, 12 min, $28.50. booking now…" />}
      {step >= 2 && <SysCard color={C.grn}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><Shield s={10} c={C.gold} /><span style={{ fontSize: 10, color: C.gold, fontFamily: F.b, fontWeight: 500 }}>AUTO-APPROVED</span><span style={{ fontSize: 9, color: C.txF, fontFamily: F.b, marginLeft: 4 }}>$28 {"<"} $50</span></div></SysCard>}
      {step >= 3 && <Bub from="agent" text="uber booked ✓ Marcus, gray Camry, 12 min 🚗" />}
      {step >= 4 && <SysCard color={C.grn}><div style={{ fontSize: 11, color: C.grn, fontFamily: F.b, fontWeight: 500 }}>Zero effort</div><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginTop: 4 }}>No notification. Under auto-approve.</div><div style={{ marginTop: 6 }}><TimerBadge time="0 sec" color={C.grn} /></div></SysCard>}
    </div></div>;
  }
  return <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "6px 14px 10px", borderBottom: `1px solid ${C.bd}`, display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 28, height: 28, borderRadius: 14, background: `${C.gpt}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🤖</div><div><div style={{ fontSize: 14, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>ChatGPT</div><div style={{ fontSize: 9, color: C.txF, fontFamily: F.b }}>Operator</div></div></div>
    <div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 5, justifyContent: "flex-end" }}>
      <Bub from="user" text="order Sony WH-1000XM5 headphones" vis={step >= 0} />
      {step >= 1 && <Bub from="agent" text="$348 on Amazon. setting up payment…" />}
      {step >= 2 && <SysCard color={C.gold}><Shield s={10} c={C.gold}/><span style={{ fontSize: 10, color: C.gold, fontFamily: F.b, fontWeight: 600, marginLeft: 6 }}>TALLY RECOGNIZED YOU</span><div style={{ fontSize: 10, color: C.txM, fontFamily: F.b, marginTop: 4 }}>Same cards. Same rules. One tap.</div></SysCard>}
      {step >= 3 && <SysCard color={C.grn}><div style={{ display: "flex", alignItems: "center", gap: 5 }}><Chk s={10} c={C.grn}/><span style={{ fontSize: 10, color: C.grn, fontFamily: F.b, fontWeight: 600 }}>AUTHORIZED & APPROVED</span></div></SysCard>}
      {step >= 4 && <Bub from="agent" text="ordered ✓ Sony WH-1000XM5, arrives Wed #AMZ-8821K" />}
      {step >= 5 && <SysCard color={C.grn}><div style={{ fontSize: 11, color: C.grn, fontFamily: F.b, fontWeight: 500 }}>Two agents. One Tally.</div><div style={{ marginTop: 4 }}><TimerBadge time="3 sec" color={C.grn} /></div></SysCard>}
    </div>
  </div>;
}

function BeforeAfterTab() {
  const [scIdx, setScIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const sc = SCENARIOS[scIdx];
  useEffect(() => { setStep(0); setPlaying(false); }, [scIdx]);
  useEffect(() => { if (!playing || step >= sc.maxStep) { setPlaying(false); return; } const t = setTimeout(() => setStep(s => s + 1), 1400); return () => clearTimeout(t); }, [playing, step, sc.maxStep]);
  const done = step >= sc.maxStep;

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "72px 20px 60px" }}>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <h1 style={{ fontFamily: F.b, fontSize: 34, fontWeight: 300, color: C.tx, letterSpacing: -1, marginBottom: 6 }}>Same request. <span style={{ fontFamily: F.d, fontStyle: "italic", color: C.gold }}>Completely different.</span></h1>
        <p style={{ fontFamily: F.b, fontSize: 14, color: C.txM }}>Watch both phones side by side.</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 18 }}>
        {SCENARIOS.map((s, i) => <button key={s.id} onClick={() => setScIdx(i)} style={{ padding: "8px 20px", borderRadius: 10, border: "none", background: scIdx === i ? C.gG : "transparent", color: scIdx === i ? C.gold : C.txM, fontSize: 12.5, fontFamily: F.b, fontWeight: 500, cursor: "pointer", borderBottom: scIdx === i ? `1px solid ${C.gold}30` : "1px solid transparent" }}>{s.label}</button>)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 18 }}>
        <button onClick={() => { setStep(0); setPlaying(false); }} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${C.bd}`, background: "transparent", color: C.txM, fontSize: 11, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>Reset</button>
        <button onClick={() => { if (done) { setStep(0); setTimeout(() => setPlaying(true), 100); } else setPlaying(!playing); }} style={{ padding: "7px 20px", borderRadius: 8, border: "none", background: `linear-gradient(135deg, ${C.gold}, ${C.goldM})`, color: C.bg, fontSize: 11, fontFamily: F.b, fontWeight: 600, cursor: "pointer", boxShadow: `0 3px 12px rgba(191,163,109,0.16)` }}>{playing ? "⏸ Pause" : done ? "↺ Replay" : "▶ Play"}</button>
        {step < sc.maxStep && <button onClick={() => setStep(s => s + 1)} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${C.bd}`, background: "transparent", color: C.txM, fontSize: 11, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>Step →</button>}
        <button onClick={() => setStep(sc.maxStep)} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${C.bd}`, background: "transparent", color: C.txM, fontSize: 11, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>Show all</button>
      </div>
      <div style={{ display: "flex", gap: 5, justifyContent: "center", marginBottom: 22 }}>
        {Array.from({ length: sc.maxStep + 1 }).map((_, i) => <div key={i} onClick={() => { setStep(i); setPlaying(false); }} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, cursor: "pointer", background: i <= step ? C.gold : C.bd, opacity: i <= step ? (i === step ? 1 : 0.45) : 0.25, transition: "all 0.3s ease" }} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 28, alignItems: "flex-start" }}>
        <Phone label="Without Tally" labelColor={C.red} glow="red"><WithoutTally scenario={sc.id} step={step} /></Phone>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 60, gap: 8 }}>
          <div style={{ width: 1, height: 100, background: `linear-gradient(180deg, transparent, ${C.bd}, ${C.gold}20, ${C.bd}, transparent)` }} />
          <div style={{ fontSize: 10, color: C.txF, fontFamily: F.b, letterSpacing: 3, writingMode: "vertical-rl" }}>VS</div>
          <div style={{ width: 1, height: 100, background: `linear-gradient(180deg, transparent, ${C.bd}, ${C.gold}20, ${C.bd}, transparent)` }} />
        </div>
        <Phone label="With Tally" labelColor={C.gold} glow="gold"><WithTally scenario={sc.id} step={step} /></Phone>
      </div>
      {done && <div style={{ marginTop: 28, display: "flex", gap: 10, justifyContent: "center" }}>
        {(scIdx === 0 ? [["Time","8–15 min","~30 sec"],["Switches","4","0"],["Card exposed","Yes","Never"],["Steps","10","3"]] : scIdx === 1 ? [["Effort","Manual","Zero"],["Switches","2","0"],["Time","1–2 min","0 sec"]] : [["Setup","Full redo","1 tap"],["Cards re-entered","Yes","No"],["Friction","Maximum","Zero"]]).map(([l,b,a],i) => (
          <div key={i} style={{ flex: 1, maxWidth: 180 }}>
            <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, marginBottom: 6, textAlign: "center" }}>{l.toUpperCase()}</div>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ flex: 1, padding: "7px 8px", borderRadius: 8, background: C.redS, border: `1px solid ${C.red}10`, textAlign: "center" }}><span style={{ fontSize: 12, color: C.red, fontFamily: F.m, fontWeight: 500 }}>{b}</span></div>
              <div style={{ flex: 1, padding: "7px 8px", borderRadius: 8, background: C.gG, border: `1px solid ${C.gB}`, textAlign: "center" }}><span style={{ fontSize: 12, color: C.grn, fontFamily: F.m, fontWeight: 500 }}>{a}</span></div>
            </div>
          </div>
        ))}
      </div>}
      {done && scIdx < 2 && <div style={{ textAlign: "center", marginTop: 20 }}><Btn primary onClick={() => setScIdx(s => s + 1)}>Next: {SCENARIOS[scIdx + 1].label} →</Btn></div>}
      {done && scIdx === 2 && <div style={{ marginTop: 24, padding: 22, borderRadius: 18, background: `linear-gradient(165deg, rgba(191,163,109,0.055), rgba(191,163,109,0.015))`, border: `1px solid ${C.gB}`, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8 }}><Shield s={14} c={C.gold} /><span style={{ fontSize: 10, color: C.gold, fontFamily: F.b, fontWeight: 600, letterSpacing: 3 }}>THE BOTTOM LINE</span></div>
        <h3 style={{ fontFamily: F.b, fontSize: 22, fontWeight: 300, color: C.tx, lineHeight: 1.35 }}>Without Tally, <span style={{ color: C.red }}>you are the middleware</span>. With Tally, <span style={{ fontFamily: F.d, fontStyle: "italic", color: C.gold }}>you just decide</span>.</h3>
      </div>}
    </div>
  );
}

// ═══════════════════════════════════════════════
// TAB 2: FOR DEVELOPERS
// ═══════════════════════════════════════════════
const Kw=({children})=><span style={{color:"#C792EA"}}>{children}</span>;const Fn2=({children})=><span style={{color:"#FFCB6B"}}>{children}</span>;const Str=({children})=><span style={{color:"#C3E88D"}}>{children}</span>;const Cm=({children})=><span style={{color:"#546E7A"}}>{children}</span>;const Nm=({children})=><span style={{color:"#F78C6C"}}>{children}</span>;const Pr=({children})=><span style={{color:"#89DDFF"}}>{children}</span>;const Tp=({children})=><span style={{color:"#FFCB6B"}}>{children}</span>;
const Code = ({ children, label }) => <div style={{ background: "#08080A", borderRadius: 14, padding: "16px 18px", border: `1px solid ${C.bd}`, fontFamily: F.m, fontSize: 11.5, lineHeight: 1.8, color: "#C5C0B8", whiteSpace: "pre", overflow: "auto" }}>{label && <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>}{children}</div>;

function DevTab() {
  const [tab, setTab] = useState("code");
  return <div style={{ maxWidth: 920, margin: "0 auto", padding: "72px 0 80px" }}>
    <div style={{ textAlign: "center", marginBottom: 32 }}><Lbl style={{ color: C.goldM, marginBottom: 12, letterSpacing: 5 }}>FOR DEVELOPERS</Lbl><h2 style={{ fontFamily: F.b, fontSize: 30, fontWeight: 300, color: C.tx }}>30 minutes. Two API calls. <span style={{ fontFamily: F.d, fontStyle: "italic", color: C.gold }}>Zero cost.</span></h2></div>
    <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 24 }}>
      {[{ id: "code", l: "Integration" }, { id: "value", l: "Value Exchange" }].map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 20px", borderRadius: 10, border: "none", background: tab === t.id ? C.gG : "transparent", color: tab === t.id ? C.gold : C.txM, fontSize: 12.5, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>{t.l}</button>)}
    </div>
    {tab === "code" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Code label="1 · Initialize"><Kw>import</Kw> {"{ "}<Tp>TallyConnect</Tp>{" }"} <Kw>from</Kw> <Str>'@tally-pay/connect'</Str>{"\n\n"}<Kw>const</Kw> <Pr>tally</Pr> = <Kw>new</Kw> <Fn2>TallyConnect</Fn2>({`{\n  `}<Pr>apiKey</Pr>: <Str>'pk_live_...'</Str>,{`\n  `}<Pr>agentName</Pr>: <Str>'Poke'</Str>{`\n}`})</Code>
      <Code label="2 · Request payment"><Kw>const</Kw> <Pr>payment</Pr> = <Kw>await</Kw> <Pr>tally</Pr>.<Fn2>requestPayment</Fn2>({`{\n  `}<Pr>consumerId</Pr>: <Str>'user_abc123'</Str>,{`\n  `}<Pr>amount</Pr>: <Nm>34200</Nm>,{`\n  `}<Pr>merchant</Pr>: <Str>'Delta Air Lines'</Str>,{`\n  `}<Pr>reasoning</Pr>: <Str>'Cheapest nonstop'</Str>{`\n}`})</Code>
      <Code label="3 · Handle response"><Kw>if</Kw> (<Pr>payment</Pr>.<Pr>status</Pr> === <Str>'approved'</Str>) {`{\n  `}<Kw>await</Kw> <Fn2>checkout</Fn2>(<Pr>payment</Pr>.<Pr>card</Pr>){`\n  `}<Kw>await</Kw> <Pr>tally</Pr>.<Fn2>confirm</Fn2>(<Pr>payment</Pr>.<Pr>id</Pr>){`\n}`}</Code>
      <Code label="4 · Webhooks"><Cm>{"// payment.approved → card ready"}</Cm>{"\n"}<Cm>{"// payment.completed → settled"}</Cm>{"\n"}<Cm>{"// payment.declined → reason"}</Cm>{"\n"}<Cm>{"// consumer.connected → onboarded"}</Cm></Code>
    </div>}
    {tab === "value" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <Surf gold style={{ padding: 26 }}><div style={{ fontSize: 15, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 14 }}>Developer gets</div>{["Payment capability — free", "No PCI-DSS compliance", "No fraud liability", "80M+ merchants via Visa", "Co-branded trust signal", "Competitive moat"].map((it,i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 9 }}><Chk s={12} c={C.grn}/><span style={{ fontSize: 13, color: C.tx, fontFamily: F.b }}>{it}</span></div>)}</Surf>
      <Surf style={{ padding: 26 }}><div style={{ fontSize: 15, color: C.txS, fontFamily: F.b, fontWeight: 600, marginBottom: 14 }}>Tally earns</div>{["1.5–2% interchange (not shared)", "Consumer at $0 CAC", "Trust data per transaction", "Brand recognition"].map((it,i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 9 }}><div style={{ width: 5, height: 5, borderRadius: 3, background: C.gold, opacity: 0.4, flexShrink: 0 }}/><span style={{ fontSize: 13, color: C.txS, fontFamily: F.b }}>{it}</span></div>)}<Surf gold style={{ padding: 12, marginTop: 12 }}><div style={{ fontSize: 12, color: C.gold, fontFamily: F.b, fontWeight: 600 }}>Developer pays: $0</div><div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 2 }}>Capability, not revenue share</div></Surf></Surf>
    </div>}
  </div>;
}

// ═══════════════════════════════════════════════
// TAB 3: VS. COMPETITORS
// ═══════════════════════════════════════════════

const COMPETITORS = [
  {
    name: "Stripe ACP", color: C.stripe, funding: "Protocol by Stripe ($1.4T+ volume)",
    tagline: "Checkout layer for Stripe merchants",
    whatIs: "Agentic Commerce Protocol. Co-developed with OpenAI. Powers ChatGPT Instant Checkout with Shared Payment Tokens.",
    pokeFlow: ["Poke integrates Stripe ACP SDK", "Consumer prompted to pay via Stripe-connected merchant", "SPT (Shared Payment Token) issued", "Agent completes checkout on Stripe-powered site"],
    works: ["Stripe-connected merchants", "ChatGPT Instant Checkout (Etsy, Shopify, Glossier)", "Scoped, revocable tokens"],
    breaks: ["Only works at Stripe merchants — Delta.com probably isn't one", "Poke can't book flights, hotels, or most travel on Stripe checkout", "No consumer spending controls or approval flows", "No cross-agent dashboard or identity", "Stripe owns the consumer relationship, not Poke"],
    verdict: "ACP is a checkout protocol, not a payment capability. It only works where Stripe already is — which excludes most of the real-world purchases an agent like Poke needs to make.",
    verdictColor: C.red,
  },
  {
    name: "Visa TAP", color: C.visa, funding: "Protocol by Visa (100+ partners)",
    tagline: "Cryptographic agent identity verification",
    whatIs: "Trusted Agent Protocol. Uses HTTP signatures to verify agent identity. Hundreds of live transactions by Dec 2025.",
    pokeFlow: ["Poke registers for Visa TAP credentials", "Agent presents signed HTTP request to merchant", "Visa verifies agent identity cryptographically", "Transaction routed through Visa network"],
    works: ["Agent identity verification via crypto signatures", "Works across Visa's existing network", "100+ partners, predicting millions of users by holiday 2026"],
    breaks: ["TAP is infrastructure — it verifies agents, not consumers", "No consumer-facing product: no approval UX, no spending controls", "No app, no dashboard, no rules engine", "Poke would need to build the entire consumer layer themselves", "No way for consumer to control what the agent spends"],
    verdict: "TAP solves agent identity brilliantly but leaves the entire consumer experience unbuilt. It's plumbing that needs a product on top — which is exactly what Tally is.",
    verdictColor: C.amb,
  },
  {
    name: "Mastercard Agent Pay", color: C.mc, funding: "Protocol by Mastercard",
    tagline: "Dynamic tokenized credentials for agents",
    whatIs: "Agentic Tokens extending Mastercard's tokenization. All U.S. cardholders enabled Nov 2025. Citi and U.S. Bank as first issuers.",
    pokeFlow: ["Consumer's bank issues Agentic Token", "Token scoped to agent with spending constraints", "Poke presents token at checkout", "Transaction processed on Mastercard rails"],
    works: ["Proven tokenization tech from card-present to agents", "All U.S. Mastercard cardholders already enabled", "Bank-issued = inherent trust"],
    breaks: ["Consumer must use their existing bank's interface to set up — no unified experience", "Only works for Mastercard holders", "No cross-network: Visa users, debit users excluded", "Poke has to integrate with each issuing bank separately", "No cross-agent view — each agent is siloed at the bank level"],
    verdict: "Excellent token infrastructure, but locked to Mastercard and dependent on banks building consumer UX. Tally works across all card networks and provides the unified experience banks won't build.",
    verdictColor: C.amb,
  },
  {
    name: "Google AP2 / UCP", color: C.google, funding: "Protocols by Google (60+ partners)",
    tagline: "Authorization layer + Universal Commerce Protocol",
    whatIs: "AP2 uses cryptographic mandates (Intent, Cart, Payment). UCP launched Jan 2026 with Shopify, Walmart, Target, Etsy. Payment-agnostic: cards, UPI, PIX, stablecoins.",
    pokeFlow: ["Consumer creates mandate in Google Wallet", "Mandate specifies what agent can purchase", "Agent presents mandate at participating merchants", "Google verifies, merchant fulfills"],
    works: ["Payment-agnostic (cards, bank transfers, crypto)", "60+ partners including Mastercard, PayPal, Amex, Coinbase", "Verifiable Digital Credentials standard"],
    breaks: ["Requires merchant adoption of UCP — limited to participating retailers", "Consumer experience locked into Google's ecosystem", "Poke on iMessage can't trigger Google Wallet mandates natively", "No standalone consumer product — it's infrastructure for Google's commerce stack", "Competing protocol interests may slow adoption"],
    verdict: "The most ambitious protocol but deeply tied to Google's ecosystem. An iMessage agent like Poke can't natively access Google Wallet. Tally is protocol-agnostic and works on any platform.",
    verdictColor: C.amb,
  },
  {
    name: "Skyfire", color: C.skyfire, funding: "$9.5M (a16z CSX, Coinbase Ventures)",
    tagline: "Crypto-native agent payment network",
    whatIs: "Founded by two ex-Ripple execs. Deposits USD → converts to USDC on Base. KYAPay protocol for agent identity. 2–3% transaction fee.",
    pokeFlow: ["Poke deposits USD, converted to USDC on Base", "KYAPay JWT issued with agent credentials", "Agent pays merchant via USDC settlement", "Consumer funds flow through crypto rails"],
    works: ["End-to-end agent payment network", "Visa TAP partnership demonstrated", "Strong identity layer (KYAPay)", "Consumer Reports partnership for trust"],
    breaks: ["Crypto-first: consumer's USD becomes USDC — most people don't want that", "2–3% fee paid by the agent/developer — not free", "Merchants must accept crypto settlement", "\"Book me a Delta flight\" — Delta doesn't accept USDC", "Consumer trust barrier: \"my dollars go through a blockchain?\"", "Only $9.5M in funding vs. massive infrastructure needed"],
    verdict: "Impressive tech for the crypto-native agent economy, but mainstream consumers booking flights and ordering Ubers need traditional card rails. Tally issues Visa cards — works at 80M merchants on day one.",
    verdictColor: C.red,
  },
  {
    name: "Nekuda", color: "#8B5CF6", funding: "$5M (Madrona, Amex, Visa Ventures)",
    tagline: "Agentic Mandates for consumer checkout",
    whatIs: "Closest competitor to Tally's consumer thesis. Building contextual authorizations with spending limits. Visa Intelligent Commerce launch partner.",
    pokeFlow: ["Consumer creates Agentic Mandate in Nekuda", "Mandate specifies: agent X can buy Y up to $Z", "Agent presents mandate at checkout", "Nekuda verifies against rules, authorizes"],
    works: ["Consumer-focused spending controls", "Rich contextual mandates (what, where, how much)", "Visa launch partner — credible backing", "Approval requirements built in"],
    breaks: ["Only $5M funding — very early stage", "Focused on existing commerce apps, not standalone product", "Mandate-based: consumer pre-authorizes categories, not real-time approval", "No cross-agent dashboard or unified identity", "Pilot-only with fashion/retail apps — no travel, no rideshare", "No virtual card issuance — depends on existing payment methods"],
    verdict: "Nekuda is the only startup attacking the same consumer whitespace. But with $5M vs Tally's focus, limited merchant verticals, and no virtual card capability, Tally has a significant head start on the complete product.",
    verdictColor: C.amb,
  },
  {
    name: "Build In-House", color: C.txM, funding: "Poke builds their own payment system",
    tagline: "From scratch, because why not suffer",
    whatIs: "Poke decides to build payment infrastructure themselves. Become a fintech. Get licenses. Handle compliance.",
    pokeFlow: ["Apply for money transmitter licenses (12–18 months)", "Build PCI-DSS compliant card vault", "Integrate with card networks, banks, processors", "Build consumer approval UX, rules engine, fraud system", "Hire payments team (5–15 engineers)", "Launch, maintain, iterate forever"],
    works: ["Full control over the experience", "No dependency on third parties", "Keep all economics"],
    breaks: ["$500K–2M+ build cost minimum", "6–18 months before first transaction", "PCI-DSS compliance burden (annual audits, pen testing)", "Fraud liability falls entirely on Poke", "Money transmitter licensing in 50 states", "Poke is an AI assistant, not a fintech — wrong core competency", "Every other agent has to do the same thing — no network effects"],
    verdict: "Poke raised $15M to build an AI assistant, not a fintech. Building payments in-house means becoming a regulated financial institution. Tally gives them everything they need in 30 minutes, for free.",
    verdictColor: C.red,
  },
];

function CompetitorCard({ comp, isOpen, onToggle }) {
  return (
    <div style={{ borderRadius: 18, border: `1px solid ${isOpen ? comp.color + "30" : C.bd}`, background: isOpen ? `${comp.color}04` : C.sf, transition: "all 0.3s ease", overflow: "hidden" }}>
      <div onClick={onToggle} style={{ padding: "18px 22px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${comp.color}12`, border: `1px solid ${comp.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontFamily: F.b, fontWeight: 700, color: comp.color }}>{comp.name.charAt(0)}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, color: C.tx, fontFamily: F.b, fontWeight: 600 }}>{comp.name}</span>
            <span style={{ fontSize: 10, color: C.txF, fontFamily: F.b }}>{comp.funding}</span>
          </div>
          <div style={{ fontSize: 12, color: C.txM, fontFamily: F.b, marginTop: 2 }}>{comp.tagline}</div>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${comp.verdictColor}10`, border: `1px solid ${comp.verdictColor}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {comp.verdictColor === C.red ? <Xx s={12} c={C.red} /> : <Warn s={12} c={C.amb} />}
        </div>
        <span style={{ fontSize: 16, color: C.txF, transition: "transform 0.3s ease", transform: isOpen ? "rotate(180deg)" : "none" }}>▾</span>
      </div>

      {isOpen && (
        <div style={{ padding: "0 22px 22px" }}>
          <div style={{ fontSize: 12, color: C.txS, fontFamily: F.b, lineHeight: 1.6, marginBottom: 16, padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: `1px solid ${C.bd}` }}>{comp.whatIs}</div>

          <Lbl style={{ marginBottom: 8, letterSpacing: 4 }}>If Poke used {comp.name}</Lbl>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
            {comp.pokeFlow.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "6px 10px", borderRadius: 8, background: `${comp.color}06`, border: `1px solid ${comp.color}08` }}>
                <span style={{ fontSize: 10, color: comp.color, fontFamily: F.m, fontWeight: 500, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ fontSize: 12, color: C.txS, fontFamily: F.b, lineHeight: 1.4 }}>{s}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}><Chk s={11} c={C.grn} /><Lbl style={{ letterSpacing: 3 }}>What works</Lbl></div>
              {comp.works.map((w, i) => <div key={i} style={{ fontSize: 11.5, color: C.txM, fontFamily: F.b, lineHeight: 1.5, paddingLeft: 15, marginBottom: 4, borderLeft: `1px solid ${C.grn}15` }}>{w}</div>)}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}><Xx s={11} c={C.red} /><Lbl style={{ letterSpacing: 3 }}>Where it breaks</Lbl></div>
              {comp.breaks.map((b, i) => <div key={i} style={{ fontSize: 11.5, color: C.txM, fontFamily: F.b, lineHeight: 1.5, paddingLeft: 15, marginBottom: 4, borderLeft: `1px solid ${C.red}15` }}>{b}</div>)}
            </div>
          </div>

          <div style={{ padding: "14px 16px", borderRadius: 12, background: `${comp.verdictColor}08`, border: `1px solid ${comp.verdictColor}12` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              {comp.verdictColor === C.red ? <Xx s={12} c={C.red} /> : <Warn s={12} c={C.amb} />}
              <span style={{ fontSize: 11, color: comp.verdictColor, fontFamily: F.b, fontWeight: 600, letterSpacing: 1 }}>VERDICT FOR POKE</span>
            </div>
            <div style={{ fontSize: 12.5, color: C.txS, fontFamily: F.b, lineHeight: 1.6 }}>{comp.verdict}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function CompetitorsTab() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "72px 20px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Lbl style={{ color: C.goldM, marginBottom: 12, letterSpacing: 5 }}>COMPETITIVE LANDSCAPE</Lbl>
        <h2 style={{ fontFamily: F.b, fontSize: 30, fontWeight: 300, color: C.tx, letterSpacing: -0.5, marginBottom: 6 }}>
          What if Poke chose <span style={{ fontFamily: F.d, fontStyle: "italic", color: C.gold }}>something else?</span>
        </h2>
        <p style={{ fontFamily: F.b, fontSize: 14, color: C.txM, maxWidth: 520, margin: "0 auto" }}>
          Every alternative either only works at limited merchants, requires crypto rails consumers don't want, leaves the consumer experience unbuilt, or forces Poke to become a fintech.
        </p>
      </div>

      {/* Market context */}
      <Surf gold style={{ padding: 22, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { n: "$3–5T", s: "Agentic commerce by 2030", src: "McKinsey" },
            { n: "<$100M", s: "Total VC in agent payments", src: "Market data" },
            { n: "15+", s: "Funded startups, none dominant", src: "Feb 2026" },
            { n: "40%", s: "Agentic projects will fail", src: "Gartner" },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: 20, fontFamily: F.d, color: C.gold }}>{stat.n}</div>
              <div style={{ fontSize: 11, color: C.txM, fontFamily: F.b, marginTop: 2 }}>{stat.s}</div>
              <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, marginTop: 2 }}>{stat.src}</div>
            </div>
          ))}
        </div>
      </Surf>

      {/* Competitor cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {COMPETITORS.map((comp, i) => (
          <CompetitorCard key={i} comp={comp} isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
        ))}
      </div>

      {/* Summary table */}
      <div style={{ overflow: "auto", marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontFamily: F.b }}>
          <thead><tr>
            {["", "Tally", "Stripe ACP", "Visa TAP", "MC Agent Pay", "Google AP2", "Skyfire", "Nekuda", "In-House"].map((h, i) => (
              <th key={i} style={{ padding: "10px 8px", fontSize: 10, fontWeight: 600, color: i === 1 ? C.gold : C.txS, textAlign: "left", borderBottom: `1px solid ${i === 1 ? C.gold : C.bd}`, background: i === 1 ? C.gG : "transparent", borderRadius: i === 1 ? "10px 10px 0 0" : 0, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[
              ["Cost to developer", "Free", "Stripe %", "Free*", "Free*", "Free*", "2-3%", "TBD", "$500K+"],
              ["Integration", "30 min", "Days", "Weeks", "Weeks", "Weeks", "Hours", "TBD", "Months"],
              ["Merchant coverage", "80M+", "Stripe only", "Visa only", "MC only", "UCP only", "Crypto", "Pilot", "Custom"],
              ["Consumer controls", "✓", "✗", "✗", "Bank UX", "Google", "✗", "✓", "Build"],
              ["Cross-agent", "✓", "✗", "✗", "✗", "✗", "✗", "✗", "✗"],
              ["Works in iMessage", "✓", "✗", "✗", "✗", "✗", "✗", "✗", "✓"],
              ["Consumer app", "✓", "✗", "✗", "Bank's", "Google", "✗", "Partial", "Build"],
              ["Day-one ready", "✓", "Partial", "✗", "Partial", "✗", "✗", "✗", "✗"],
            ].map((row, i) => (
              <tr key={i}>{row.map((cell, j) => (
                <td key={j} style={{ padding: "8px", fontSize: 11, fontWeight: j === 0 ? 500 : 400, color: j === 0 ? C.txS : (j === 1 ? (cell === "✓" ? C.grn : C.tx) : (cell === "✗" ? C.red : (cell === "✓" ? C.grn : C.txM))), borderBottom: `1px solid ${C.bd}`, background: j === 1 ? `${C.gold}03` : "transparent", whiteSpace: "nowrap" }}>{cell}</td>
              ))}</tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 9, color: C.txF, fontFamily: F.b, marginTop: 6 }}>* Infrastructure is free but requires building consumer-facing product on top</div>
      </div>

      {/* Tally's position */}
      <Surf gold style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Shield s={16} c={C.gold} />
          <span style={{ fontSize: 13, color: C.gold, fontFamily: F.b, fontWeight: 600 }}>Tally's architectural advantage</span>
        </div>
        <div style={{ fontSize: 13, color: C.txM, fontFamily: F.b, lineHeight: 1.7, marginBottom: 16 }}>
          The protocols (ACP, TAP, AP2, Agent Pay) are building <span style={{ color: C.tx }}>infrastructure from above</span>. The crypto startups (Skyfire, x402) are building <span style={{ color: C.tx }}>rails from the edges</span>. But the consumer-facing middle layer — the product that makes it safe and intuitive for regular people to give agents purchasing power — is <span style={{ color: C.gold }}>strikingly underbuilt</span>.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { title: "Protocol-agnostic", desc: "Virtual Visa through Lithic. Works everywhere a card works. Let protocols compete — Tally works with all of them." },
            { title: "Consumer-first", desc: "Real approval UX, spending rules, cross-agent dashboard. The product nobody else is building." },
            { title: "Agent-distributed", desc: "Free SDK. Agents are the distribution channel. $0 CAC. Every integration compounds the network." },
          ].map((p, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: `1px solid ${C.bd}` }}>
              <div style={{ fontSize: 12, color: C.gold, fontFamily: F.b, fontWeight: 600, marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: 11.5, color: C.txM, fontFamily: F.b, lineHeight: 1.55 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </Surf>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("ba");
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
        html{background:#050505}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(191,163,109,0.06);border-radius:2px}
        button{outline:none}button:hover{filter:brightness(1.08)}button:active{transform:scale(0.97)}
      `}</style>
      <div style={{ minHeight: "100vh", color: C.tx, background: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(191,163,109,0.03), transparent 60%), ${C.bg}` }}>
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.25, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(5,5,5,0.85)", backdropFilter: "blur(40px)", borderBottom: `1px solid ${C.bd}` }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: `linear-gradient(145deg, ${C.gold}, ${C.goldM})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield s={11} c={C.bg}/></div>
                <span style={{ fontFamily: F.b, fontWeight: 600, fontSize: 14, color: C.gold }}>Tally</span>
              </div>
              <div style={{ display: "flex", gap: 2 }}>
                {[{ id: "ba", l: "Before & After" }, { id: "dev", l: "For Developers" }, { id: "comp", l: "vs. Competitors" }].map(t => (
                  <button key={t.id} onClick={() => setView(t.id)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: view === t.id ? C.gG : "transparent", color: view === t.id ? C.gold : C.txM, fontSize: 12, fontFamily: F.b, fontWeight: 500, cursor: "pointer" }}>{t.l}</button>
                ))}
              </div>
            </div>
          </div>
          {view === "ba" && <BeforeAfterTab />}
          {view === "dev" && <DevTab />}
          {view === "comp" && <CompetitorsTab />}
        </div>
      </div>
    </>
  );
}

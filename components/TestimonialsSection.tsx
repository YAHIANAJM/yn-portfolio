"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { TestimonialRow } from "@/lib/supabase";

const PAGE_SIZE = 10;
const DIRECTIONS = ["right", "top", "left", "bottom"] as const;
type Direction = typeof DIRECTIONS[number];

type Comment = {
  id: number;
  gender: string;
  name: string;
  full: string;
  color: string;
  avatar: string;
  enterFrom?: Direction | null;
};
type FormState = { firstName: string; lastName: string; gender: "male" | "female" | ""; comment: string };

const BG_COLORS = ["b6e3f4", "c0aede", "ffd5dc", "ffdfbf", "d1f4d1", "ffd5dc"];

function avatarUrl(gender: string, seed: string, bg: string) {
  const style = gender === "female" ? "lorelei" : "notionists-neutral";
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}`;
}

function rowToComment(row: TestimonialRow, index: number, enterFrom?: Direction | null): Comment {
  const bg = BG_COLORS[index % BG_COLORS.length];
  const displayName = `${row.name}${row.last_name ? " " + row.last_name[0] + "." : ""}`;
  return {
    id: row.id,
    gender: row.gender,
    name: displayName,
    full: row.comment,
    color: row.gender === "male" ? "#111828" : "#A8264A",
    avatar: row.avatar_url || avatarUrl(row.gender, row.name, bg),
    enterFrom: enterFrom ?? null,
  };
}

function directionInitial(dir: Direction | null | undefined) {
  if (dir === "right")  return { x: 140, y: 0,    opacity: 0, scale: 0.75 };
  if (dir === "left")   return { x: -140, y: 0,   opacity: 0, scale: 0.75 };
  if (dir === "top")    return { x: 0,    y: -140, opacity: 0, scale: 0.75 };
  if (dir === "bottom") return { x: 0,    y: 140,  opacity: 0, scale: 0.75 };
  return { scale: 0, opacity: 0 };
}

const BASE_POSITIONS = [
  { x: "8%",  y: "22%" }, { x: "58%", y: "12%" }, { x: "30%", y: "58%" },
  { x: "72%", y: "54%" }, { x: "16%", y: "66%" }, { x: "50%", y: "30%" },
  { x: "42%", y: "68%" }, { x: "80%", y: "28%" }, { x: "22%", y: "38%" },
  { x: "64%", y: "72%" }, { x: "5%",  y: "50%" }, { x: "88%", y: "55%" },
  { x: "35%", y: "18%" }, { x: "75%", y: "40%" }, { x: "12%", y: "78%" },
  { x: "55%", y: "82%" }, { x: "90%", y: "18%" }, { x: "28%", y: "82%" },
  { x: "68%", y: "20%" }, { x: "45%", y: "50%" },
];

function makeOrbit(xR: number, yR: number, phase: number, steps = 12) {
  const x: number[] = [], y: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = (phase + i / steps) * Math.PI * 2;
    x.push(Math.round(xR * Math.cos(a)));
    y.push(Math.round(yR * Math.sin(a)));
  }
  return { x, y };
}

const BASE_SWIMS = [
  { ...makeOrbit(55, 28, 0),    dur: 18 },
  { ...makeOrbit(70, 38, 1/6),  dur: 22 },
  { ...makeOrbit(48, 42, 2/6),  dur: 16 },
  { ...makeOrbit(62, 30, 3/6),  dur: 20 },
  { ...makeOrbit(40, 50, 4/6),  dur: 24 },
  { ...makeOrbit(80, 35, 5/6),  dur: 19 },
];

function getSwim(i: number) {
  if (i < BASE_SWIMS.length) return BASE_SWIMS[i];
  const seed = i - BASE_SWIMS.length;
  return { ...makeOrbit(45 + seed * 8, 32 + seed * 5, seed / 4), dur: 17 + seed * 2 };
}

function getPosition(i: number) {
  return BASE_POSITIONS[i % BASE_POSITIONS.length];
}

export default function TestimonialsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "", gender: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });

  const loadPage = useCallback(async (from: number) => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE); // fetch one extra to know if more exist
    if (error || !data) return { rows: [] as TestimonialRow[], done: true };
    const hasNext = data.length > PAGE_SIZE;
    return { rows: data.slice(0, PAGE_SIZE) as TestimonialRow[], done: !hasNext };
  }, []);

  // Initial load
  useEffect(() => {
    loadPage(0).then(({ rows, done }) => {
      setComments(rows.map((r, i) => rowToComment(r, i)));
      setOffset(rows.length);
      setHasMore(!done);
      setLoading(false);
    });
  }, [loadPage]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const { rows, done } = await loadPage(offset);
    const currentCount = comments.length;
    rows.forEach((row, i) => {
      const dir = DIRECTIONS[(currentCount + i) % DIRECTIONS.length];
      setTimeout(() => {
        setComments(prev => [...prev, rowToComment(row, prev.length, dir)]);
        setTimeout(() => {
          setComments(prev => prev.map(c => c.id === row.id ? { ...c, enterFrom: null } : c));
        }, 700);
      }, i * 130);
    });
    setOffset(o => o + rows.length);
    setHasMore(!done);
    setTimeout(() => setLoadingMore(false), rows.length * 130 + 100);
  };

  const toggle = (id: number) => setActive(prev => (prev === id ? null : id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.gender || !form.comment) return;

    const bg = BG_COLORS[comments.length % BG_COLORS.length];
    const av = avatarUrl(form.gender, form.firstName, bg);
    const displayName = `${form.firstName}${form.lastName ? " " + form.lastName[0] + "." : ""}`;

    const { data } = await supabase.from("testimonials").insert({
      name: form.firstName,
      last_name: form.lastName,
      gender: form.gender,
      avatar_url: av,
      comment: form.comment,
    }).select().single();

    setSubmitted(true);
    setTimeout(() => {
      setFormOpen(false);
      setSubmitted(false);
      setForm({ firstName: "", lastName: "", gender: "", comment: "" });

      const newComment: Comment = {
        id: data?.id ?? Date.now(),
        gender: form.gender,
        name: displayName,
        full: form.comment,
        color: form.gender === "male" ? "#111828" : "#A8264A",
        avatar: av,
        enterFrom: "bottom",
      };

      setComments(prev => [newComment, ...prev]);
      setTimeout(() => {
        setComments(prev => prev.map(c => c.id === newComment.id ? { ...c, enterFrom: null } : c));
      }, 900);
    }, 1600);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-vintage-cream"
      style={{ minHeight: "clamp(500px, 78vh, 860px)", padding: "clamp(60px, 10vh, 110px) 0" }}
    >
      {/* Section label */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", color: "#C8A97E", textTransform: "uppercase" }}>THEY SAID IT</span>
        <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px, 5vw, 72px)", color: "#111828", lineHeight: 1, letterSpacing: "0.04em", textAlign: "center" }}>WHAT PEOPLE SAY</h2>
        <div style={{ width: 40, height: 2, background: "#A8264A", borderRadius: 1 }} />
      </div>

      {/* Loading dots */}
      {loading && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
          <div style={{ display: "flex", gap: 10 }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: 10, height: 10, borderRadius: "50%", background: "#C8A97E" }} />
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {active !== null && (
        <div style={{ position: "absolute", inset: 0, zIndex: 4 }} onClick={() => setActive(null)} />
      )}

      {/* Floating circles */}
      {comments.map((c, i) => {
        const isActive = active === c.id;
        const pos = getPosition(i);
        const swim = getSwim(i);
        const hasEnter = !!c.enterFrom;

        return (
          <motion.div
            key={c.id}
            initial={hasEnter ? directionInitial(c.enterFrom) : false}
            animate={
              hasEnter
                ? { x: 0, y: 0, opacity: 1, scale: [0.75, 1.18, 0.94, 1] }
                : isActive
                  ? { x: 0, y: 0 }
                  : inView
                    ? { x: swim.x, y: swim.y }
                    : { x: 0, y: 0 }
            }
            transition={
              hasEnter
                ? { duration: 0.65, ease: "easeOut" }
                : isActive
                  ? { duration: 0.5, ease: "easeOut" }
                  : inView
                    ? { duration: swim.dur, repeat: Infinity, repeatType: "loop", ease: "linear" }
                    : { duration: 0.8, ease: "easeOut" }
            }
            style={{ position: "absolute", left: pos.x, top: pos.y, zIndex: isActive ? 10 : hasEnter ? 8 : 5 }}
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              onClick={() => toggle(c.id)}
              data-cursor-hover
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "none" }}
            >
              <div style={{
                width: 80, height: 80, borderRadius: "50%", overflow: "hidden",
                border: `3px solid ${isActive ? c.color : hasEnter ? c.color : "rgba(200,169,126,0.45)"}`,
                boxShadow: isActive || hasEnter
                  ? `0 8px 32px ${c.color}55, 0 2px 8px rgba(17,24,40,0.12)`
                  : "0 4px 18px rgba(17,24,40,0.10)",
                transition: "border-color 0.3s, box-shadow 0.3s",
                background: "#f5f3f0", flexShrink: 0,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.avatar} alt={c.name} width={80} height={80} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: isActive ? c.color : "rgba(17,24,40,0.55)", textTransform: "uppercase", whiteSpace: "nowrap", transition: "color 0.3s" }}>
                {c.name}
              </span>
            </motion.div>

            {/* Comment card */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -8 }}
                  transition={{ type: "spring", stiffness: 340, damping: 26 }}
                  style={{ position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)", width: "clamp(220px, 60vw, 300px)", background: "#ffffff", borderRadius: 16, padding: "16px 18px", boxShadow: `0 16px 48px rgba(17,24,40,0.14), 0 2px 8px ${c.color}22`, border: `1.5px solid ${c.color}22`, zIndex: 20 }}
                  onClick={e => e.stopPropagation()}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontFamily: "var(--font-bebas)", fontSize: 18, color: "#111828", letterSpacing: "0.04em", lineHeight: 1 }}>{c.name}</span>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.gender === "female" ? "#A8264A" : "#111828" }} />
                    </div>
                  </div>
                  <div style={{ height: 1, background: `${c.color}18`, marginBottom: 10 }} />
                  <p style={{ fontFamily: "var(--font-garamond)", fontSize: 14, color: "rgba(17,24,40,0.70)", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>&ldquo;{c.full}&rdquo;</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Bottom buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col md:flex-row items-center gap-3 w-max">
        {hasMore && (
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={loadMore}
            disabled={loadingMore}
            data-cursor-hover
            className="w-full md:w-auto"
            style={{ fontFamily: "var(--font-bebas)", fontSize: 14, letterSpacing: "0.18em", color: "#111828", background: "transparent", border: "1.5px solid rgba(17,24,40,0.25)", padding: "11px 28px", borderRadius: 6, cursor: "none", opacity: loadingMore ? 0.55 : 1, transition: "opacity 0.2s", whiteSpace: "nowrap" }}
          >
            {loadingMore ? "LOADING..." : "LOAD MORE"}
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => setFormOpen(true)}
          data-cursor-hover
          className="w-full md:w-auto"
          style={{ fontFamily: "var(--font-bebas)", fontSize: 16, letterSpacing: "0.18em", color: "#ffffff", background: "#A8264A", border: "none", padding: "12px 28px", borderRadius: 6, cursor: "none", boxShadow: "0 6px 24px rgba(168,38,74,0.28)", whiteSpace: "nowrap" }}
        >
          WHAT DO YOU SAY ?
        </motion.button>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {formOpen && (
          <>
            <motion.div
              key="form-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setFormOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(17,24,40,0.5)", backdropFilter: "blur(5px)", zIndex: 200 }}
            />
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 201 }} onClick={e => e.stopPropagation()}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 24 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                style={{ background: "#ffffff", borderRadius: 20, padding: "clamp(24px, 4vw, 40px)", width: "clamp(300px, 88vw, 460px)", boxShadow: "0 32px 80px rgba(17,24,40,0.2)", position: "relative" }}
              >
                <button onClick={() => setFormOpen(false)} data-cursor-hover style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", cursor: "none", color: "rgba(17,24,40,0.35)", fontSize: 22, lineHeight: 1, padding: 4 }}>×</button>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "28px 0" }}>
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }}
                        transition={{ duration: 0.5, times: [0, 0.6, 1] }}
                        style={{ width: 60, height: 60, borderRadius: "50%", background: "#A8264A", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <svg viewBox="0 0 24 24" style={{ width: 28, height: 28, fill: "none", stroke: "#fff", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }}><polyline points="20 6 9 17 4 12" /></svg>
                      </motion.div>
                      <p style={{ fontFamily: "var(--font-bebas)", fontSize: 24, color: "#111828", letterSpacing: "0.06em", margin: 0 }}>YOUR VOICE IS HEARD!</p>
                      <p style={{ fontFamily: "var(--font-garamond)", fontSize: 15, color: "rgba(17,24,40,0.55)", fontStyle: "italic", textAlign: "center", margin: 0 }}>Your bubble is joining the others...</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ marginBottom: 4 }}>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", color: "#C8A97E", textTransform: "uppercase" }}>LEAVE YOUR REVIEW</span>
                        <h3 style={{ fontFamily: "var(--font-bebas)", fontSize: 28, color: "#111828", letterSpacing: "0.04em", margin: "4px 0 0" }}>WHAT DO YOU SAY ?</h3>
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        {[{ key: "firstName", placeholder: "First name *" }, { key: "lastName", placeholder: "Last name" }].map(({ key, placeholder }) => (
                          <input key={key} type="text" placeholder={placeholder} value={form[key as keyof FormState] as string} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            style={{ flex: 1, fontFamily: "var(--font-dm-sans)", fontSize: 13, padding: "10px 14px", border: "1.5px solid rgba(17,24,40,0.12)", borderRadius: 8, outline: "none", background: "#faf8f5", color: "#111828" }} />
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        {(["male", "female"] as const).map(g => (
                          <button key={g} type="button" onClick={() => setForm(f => ({ ...f, gender: g }))} data-cursor-hover
                            style={{ flex: 1, fontFamily: "var(--font-dm-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "10px 0", border: `1.5px solid ${form.gender === g ? (g === "male" ? "#111828" : "#A8264A") : "rgba(17,24,40,0.12)"}`, borderRadius: 8, background: form.gender === g ? (g === "male" ? "#111828" : "#A8264A") : "transparent", color: form.gender === g ? "#fff" : "rgba(17,24,40,0.5)", cursor: "none", transition: "all 0.2s" }}>
                            {g === "male" ? "👦 Men" : "👧 Women"}
                          </button>
                        ))}
                      </div>

                      <textarea placeholder="Your comment... *" value={form.comment} onChange={e => setForm(f => ({ ...f, comment: e.target.value }))} rows={4}
                        style={{ fontFamily: "var(--font-garamond)", fontSize: 15, padding: "10px 14px", border: "1.5px solid rgba(17,24,40,0.12)", borderRadius: 8, outline: "none", background: "#faf8f5", color: "#111828", resize: "none", lineHeight: 1.6, fontStyle: "italic" }} />

                      <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} data-cursor-hover
                        style={{ fontFamily: "var(--font-bebas)", fontSize: 15, letterSpacing: "0.18em", color: "#fff", background: "#A8264A", border: "none", padding: "13px 0", borderRadius: 8, cursor: "none", marginTop: 4, boxShadow: "0 6px 20px rgba(168,38,74,0.22)" }}>
                        SEND MY REVIEW
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

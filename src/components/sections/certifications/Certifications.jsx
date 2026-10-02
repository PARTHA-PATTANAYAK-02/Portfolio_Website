import { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  Sparkles,
  Award,
  ExternalLink,
  Trophy,
  ArrowUpRight,
} from "lucide-react";
import { CERTIFICATES, ACHIEVEMENT } from "../../../data/certificates";
import CertificateCard from "./CertificateCard";
import CertificateModal from "./CertificateModal";

export default function Certifications() {
  const [openCert, setOpenCert] = useState(null);

  return (
    <section id="certifications" className="relative pt-2 pb-20 scroll-mt-24">
      <div className="container-custom">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs text-primary flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Learning & recognition
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
              Certifications &{" "}
              <span className="gradient-text">Achievements</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Award className="w-3.5 h-3.5 text-primary" />
            {CERTIFICATES.length} certificates
          </div>
        </Motion.div>

        {/* Grid — 3-col, last card centered (3+1 layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {CERTIFICATES.map((cert, i) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              index={i}
              onOpen={setOpenCert}
              centered={
                i === CERTIFICATES.length - 1 && CERTIFICATES.length === 4
              }
            />
          ))}
        </div>

        {/* Achievement strip (NCET) */}
        {/* Achievement strip (NCET) */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ y: -3 }}
          className="mt-6 group relative rounded-2xl p-[1.5px] overflow-hidden transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.4)]"
        >
          {/* Animated gradient border */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(120deg, hsl(160 84% 45%) 0%, hsl(190 90% 55%) 50%, hsl(160 84% 45%) 100%)",
              backgroundSize: "200% 100%",
              animation: "achievementShift 6s ease-in-out infinite",
            }}
          />

          {/* Inner card */}
          <div className="relative rounded-[14px] bg-card/85 backdrop-blur-xl p-4 sm:p-5 overflow-hidden">
            {/* corner glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none bg-linear-to-br from-emerald-500 to-cyan-500" />

            {/* bottom-left accent */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none bg-cyan-500" />

            {/* shine sweep */}
            <div
              aria-hidden
              className="absolute top-0 left-0 w-1/3 h-full -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1400 ease-out pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
              }}
            />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Left — icon + text */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <Motion.div
                  whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 shrink-0 group-hover:bg-emerald-500/25 group-hover:border-emerald-400/60 transition-colors duration-300"
                >
                  <Trophy className="w-5 h-5 text-emerald-400" />
                  {/* pulse ring */}
                  <span className="absolute inset-0 rounded-xl ring-2 ring-emerald-500/0 group-hover:ring-emerald-500/40 transition-all duration-500" />
                </Motion.div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                      Achievement
                    </span>
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                  </div>
                  <div className="font-display font-semibold text-sm sm:text-base leading-snug group-hover:text-emerald-50 transition-colors duration-300">
                    {ACHIEVEMENT.title}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {ACHIEVEMENT.issuer}
                  </p>
                </div>
              </div>

              {/* Right — verify button */}
              {ACHIEVEMENT.verifyUrl ? (
                <Motion.a
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  href={ACHIEVEMENT.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-emerald-500 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/60 transition-shadow shrink-0 self-start sm:self-auto overflow-hidden"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Verify Certificate
                  <ArrowUpRight className="w-3 h-3 opacity-80" />
                </Motion.a>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-emerald-500/30 text-muted-foreground text-xs font-medium shrink-0 self-start sm:self-auto">
                  Verify link soon
                </span>
              )}
            </div>
          </div>
        </Motion.div>
      </div>

      {/* Modal */}
      <CertificateModal cert={openCert} onClose={() => setOpenCert(null)} />
    </section>
  );
}

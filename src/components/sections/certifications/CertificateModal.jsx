import { useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Award, Calendar, Building2 } from "lucide-react";
import CertificateImage from "./CertificateImage";
import { CATEGORY_STYLES } from "../../../data/certificates";

export default function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("modal-open");
    };
  }, [cert, onClose]);

  const style = cert
    ? CATEGORY_STYLES[cert.category] || CATEGORY_STYLES.Programming
    : null;

  return (
    <AnimatePresence>
      {cert && (
        <>
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/85"
          />

          {/* Wrapper */}
          <div className="fixed inset-0 z-[95] overflow-y-auto">
            <div
              onClick={onClose}
              className="min-h-full flex items-start justify-center p-3 sm:p-6 lg:p-8"
            >
              <Motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl rounded-3xl bg-card border border-border shadow-2xl shadow-black/50 overflow-hidden my-auto"
              >
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-black/80 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image */}
                <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-muted/20">
                  <CertificateImage
                    src={cert.image}
                    alt={cert.title}
                    category={cert.category}
                  />

                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest ${style.text} ${style.bg} backdrop-blur-md border ${style.border} rounded-full px-2.5 py-1`}
                    >
                      {cert.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-7 space-y-5">
                  {/* Title */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl ${style.bg} border ${style.border} shrink-0`}
                    >
                      <Award className={`w-5 h-5 ${style.text}`} />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight leading-snug">
                        {cert.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-3 h-3" />
                          {cert.issuer}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Verify */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-border">
                    {cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 text-white font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/60 transition-shadow hover:-translate-y-0.5"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Verify Certificate
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-border text-muted-foreground font-medium text-sm">
                        Image-based preview
                      </span>
                    )}
                  </div>
                </div>
              </Motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

import { motion as Motion } from "framer-motion";
import { ArrowUpRight, Award } from "lucide-react";
import CertificateImage from "./CertificateImage";
import { CATEGORY_STYLES } from "../../../data/certificates";

export default function CertificateCard({
  cert,
  index,
  onOpen,
  centered = false,
}) {
  const style = CATEGORY_STYLES[cert.category] || CATEGORY_STYLES.Programming;

  return (
    <Motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      onClick={() => onOpen(cert)}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden bg-card/40 backdrop-blur-md border border-border/60 hover:border-primary/50 transition-colors duration-300 hover:shadow-xl hover:shadow-primary/20 ${
        centered ? "lg:col-start-2" : ""
      }`}
    >
      <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none bg-primary" />

      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.06]">
          <CertificateImage
            src={cert.image}
            alt={cert.title}
            category={cert.category}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Category chip top-left */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] font-mono uppercase tracking-widest ${style.text} ${style.bg} backdrop-blur-md border ${style.border} rounded-full px-2.5 py-1`}
          >
            {cert.category}
          </span>
        </div>

        {/* Year bottom-right */}
        <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-widest text-white/70">
          {cert.year}
        </div>

        {/* hover arrow */}
        <div className="absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <div
            className={`p-1.5 rounded-lg ${style.bg} border ${style.border} shrink-0`}
          >
            <Award className={`w-3.5 h-3.5 ${style.text}`} />
          </div>
          <h3 className="font-display font-semibold text-sm leading-snug tracking-tight group-hover:text-primary transition-colors">
            {cert.title}
          </h3>
        </div>

        <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-widest">
          {cert.issuer}
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
          <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            View certificate
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Motion.div>
  );
}

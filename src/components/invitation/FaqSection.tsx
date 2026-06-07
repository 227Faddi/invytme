"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FloralDivider } from "./FloralDivider";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{
        background: "linear-gradient(180deg, #f5eade 0%, #efe3d0 50%, #f5eade 100%)",
      }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #2c2010 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        {/* Heading */}
        <motion.div
          className="mb-14 flex flex-col items-center gap-3 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs uppercase tracking-[0.4em]"
            style={{ color: "#c9a96e" }}
          >
            Tutto quello che c&apos;è da sapere
          </p>
          <h2
            className="text-3xl font-light sm:text-4xl"
            style={{ fontFamily: "var(--font-serif)", color: "#2c2010" }}
          >
            Domande Frequenti
          </h2>
          <FloralDivider />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, #fff9f4, #fdf5ec)",
                  border: "1px solid #d4b880",
                  boxShadow: "0 2px 12px rgba(44,32,16,0.06)",
                }}
              >
                <AccordionTrigger
                  className="px-6 py-4 text-left text-sm hover:no-underline"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "#2c2010",
                    fontWeight: 400,
                    fontSize: "1rem",
                  }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{ color: "#6a5040" }}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

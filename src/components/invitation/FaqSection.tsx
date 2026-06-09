"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { weddingConfig } from "@/lib/wedding-config";
import { motion } from "framer-motion";
import { FloralDivider } from "./FloralDivider";

const t = weddingConfig.text.faq;

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{ background: "#f3e9d8" }}
    >
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
            style={{ color: "#b08d4f" }}
          >
            {t.label}
          </p>
          <h2
            className="text-4xl sm:text-5xl"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              color: "#c9a96e",
            }}
          >
            {t.title}
          </h2>
          <FloralDivider />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-2 overflow-visible rounded-none border-0"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-[32px]"
                style={{
                  background: "#faf3e6",
                  border: "1px solid rgba(176, 141, 79,0.18)",
                }}
              >
                <AccordionTrigger
                  className="px-6 py-4 text-left hover:no-underline"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "#3a2f22",
                    fontWeight: 400,
                    fontSize: "1.15rem",
                  }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{ color: "#7c6f5a" }}
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

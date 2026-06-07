"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FloralDivider } from "./FloralDivider";
import { ExtraGuestFields } from "./ExtraGuestFields";

const schema = z.object({
  inviteCode: z.string().min(1, "Inserisci il codice invito"),
  name: z.string().min(2, "Inserisci il tuo nome completo"),
  attending: z.enum(["yes", "no"]),
  dietary: z.string().optional(),
  message: z.string().optional(),
  extraGuests: z.array(
    z.object({
      name: z.string().min(1, "Inserisci il nome"),
      dietary: z.string().optional(),
    })
  ),
});

export type RsvpFormValues = z.infer<typeof schema>;

/* Attending option button */
function AttendingOption({
  value,
  label,
  selected,
  onChange,
}: {
  value: "yes" | "no";
  label: string;
  selected: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex-1 py-3 px-4 text-sm font-light transition-all duration-200"
      style={
        selected
          ? {
              background: "linear-gradient(135deg, #c9a96e, #a8834a)",
              color: "#fff9f4",
              border: "1px solid #a8834a",
              boxShadow: "0 4px 16px rgba(168,131,74,0.3)",
            }
          : {
              background: "transparent",
              color: "#6a5040",
              border: "1px solid #d4b880",
            }
      }
    >
      {label}
    </button>
  );
}

/* Field wrapper */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-widest" style={{ color: "#8a7060", letterSpacing: "0.15em" }}>
        {label}
      </Label>
      {children}
      {error && <p className="text-xs" style={{ color: "#c4887a" }}>{error}</p>}
    </div>
  );
}

export function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [codeError, setCodeError] = useState("");

  const methods = useForm<RsvpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      inviteCode: "",
      name: "",
      attending: "yes",
      dietary: "",
      message: "",
      extraGuests: [],
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const attending = watch("attending");

  const onSubmit = async (data: RsvpFormValues) => {
    setCodeError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        setCodeError("Codice invito non valido. Riprova.");
        return;
      }
      if (!res.ok) {
        toast.error("Errore nell'invio. Riprova più tardi.");
        return;
      }
      setSubmitted(true);
    } catch {
      toast.error("Errore di rete. Riprova.");
    }
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <section
        className="px-6 py-24"
        style={{ background: "linear-gradient(180deg, #fdf8f2 0%, #f5eade 100%)" }}
      >
        <div className="mx-auto max-w-lg text-center">
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle2 size={56} style={{ color: "#c9a96e" }} />
            <h2
              className="text-3xl font-light"
              style={{ fontFamily: "var(--font-serif)", color: "#2c2010" }}
            >
              Grazie mille!
            </h2>
            <FloralDivider />
            <p className="text-sm leading-relaxed" style={{ color: "#6a5040" }}>
              La tua risposta è stata ricevuta con gioia.<br />Non vediamo l&apos;ora di festeggiare insieme.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── Form ── */
  const inputStyle = {
    background: "#fff9f4",
    border: "1px solid #d4b880",
    borderRadius: 0,
    color: "#2c2010",
    fontSize: "0.875rem",
  };

  const focusRingStyle = "focus-visible:ring-1 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-0";

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden px-6 py-24"
      style={{ background: "linear-gradient(180deg, #fdf8f2 0%, #f5eade 100%)" }}
    >
      <div className="mx-auto max-w-xl">
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
            La vostra presenza è un dono
          </p>
          <h2
            className="text-3xl font-light sm:text-4xl"
            style={{ fontFamily: "var(--font-serif)", color: "#2c2010" }}
          >
            Conferma la tua presenza
          </h2>
          <FloralDivider />
          <p className="text-sm" style={{ color: "#8a7060" }}>
            Vi preghiamo di rispondere entro il{" "}
            <span style={{ color: "#2c2010" }}>31 maggio 2026</span>
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            background: "linear-gradient(180deg, #fff9f4 0%, #fdf5ec 100%)",
            border: "1px solid #d4b880",
            boxShadow: "0 8px 50px rgba(44,32,16,0.1)",
          }}
          className="p-8 sm:p-10"
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

              {/* Invite code */}
              <Field label="Codice invito" error={codeError || errors.inviteCode?.message}>
                <Input
                  {...register("inviteCode")}
                  placeholder="Inserisci il codice ricevuto"
                  style={inputStyle}
                  className={focusRingStyle}
                />
              </Field>

              {/* Name */}
              <Field label="Nome completo" error={errors.name?.message}>
                <Input
                  {...register("name")}
                  placeholder="Nome e cognome"
                  style={inputStyle}
                  className={focusRingStyle}
                />
              </Field>

              {/* Attending */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest" style={{ color: "#8a7060", letterSpacing: "0.15em" }}>
                  Partecipi?
                </p>
                <div className="flex gap-0">
                  <AttendingOption
                    value="yes"
                    label="Sì, ci sarò"
                    selected={attending === "yes"}
                    onChange={() => setValue("attending", "yes")}
                  />
                  <AttendingOption
                    value="no"
                    label="Purtroppo non posso"
                    selected={attending === "no"}
                    onChange={() => setValue("attending", "no")}
                  />
                </div>
                <input type="hidden" {...register("attending")} />
              </div>

              {/* Dietary */}
              <Field label="Intolleranze o allergie">
                <Textarea
                  {...register("dietary")}
                  placeholder="Es: vegetariano, celiaco, senza lattosio..."
                  rows={2}
                  style={{ ...inputStyle, resize: "none" }}
                  className={focusRingStyle}
                />
              </Field>

              {/* Extra guests */}
              <ExtraGuestFields />

              {/* Message */}
              <Field label="Un messaggio per gli sposi">
                <Textarea
                  {...register("message")}
                  placeholder="Scrivi un pensiero o un augurio..."
                  rows={3}
                  style={{ ...inputStyle, resize: "none" }}
                  className={focusRingStyle}
                />
              </Field>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-4 text-xs uppercase tracking-[0.25em] font-light transition-all duration-200 disabled:opacity-60"
                style={{
                  background: isSubmitting
                    ? "#d4b880"
                    : "linear-gradient(135deg, #c9a96e, #a8834a)",
                  color: "#fff9f4",
                  letterSpacing: "0.25em",
                  boxShadow: isSubmitting
                    ? "none"
                    : "0 4px 20px rgba(168,131,74,0.35)",
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={15} className="animate-spin" />
                    Invio in corso...
                  </span>
                ) : (
                  "Conferma la tua presenza"
                )}
              </button>

            </form>
          </FormProvider>
        </motion.div>
      </div>
    </section>
  );
}

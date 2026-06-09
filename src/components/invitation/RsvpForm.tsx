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
import { weddingConfig } from "@/lib/wedding-config";

const t = weddingConfig.text.rsvp;

const schema = z.object({
  inviteCode: z.string().min(1, t.errInviteCode),
  name: z.string().min(2, t.errName),
  attending: z.enum(["yes", "no"]),
  dietary: z.string().optional(),
  message: z.string().optional(),
  extraGuests: z.array(
    z.object({
      name: z.string().min(1, t.errGuestName),
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
              background: "linear-gradient(135deg, #b08d4f, #a8834a)",
              color: "#15120e",
              border: "1px solid #b08d4f",
              boxShadow: "0 4px 16px rgba(176, 141, 79,0.25)",
            }
          : {
              background: "transparent",
              color: "#7c6f5a",
              border: "1px solid rgba(176, 141, 79,0.3)",
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
      <Label className="text-xs uppercase tracking-widest" style={{ color: "#7c6f5a", letterSpacing: "0.15em" }}>
        {label}
      </Label>
      {children}
      {error && <p className="text-xs" style={{ color: "#d99a8a" }}>{error}</p>}
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
        setCodeError(t.errInvalidCode);
        return;
      }
      if (!res.ok) {
        toast.error(t.errSend);
        return;
      }
      setSubmitted(true);
    } catch {
      toast.error(t.errNetwork);
    }
  };

  /* ── Success state ── */
  if (submitted) {
    return (
      <section className="px-6 py-24" style={{ background: "#f3e9d8" }}>
        <div className="mx-auto max-w-lg text-center">
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle2 size={56} style={{ color: "#b08d4f" }} />
            <h2
              className="text-4xl sm:text-5xl"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#c9a96e" }}
            >
              {t.successTitle}
            </h2>
            <FloralDivider />
            <p
              className="whitespace-pre-line text-sm leading-relaxed"
              style={{ color: "#7c6f5a" }}
            >
              {t.successMessage}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── Form ── */
  const inputStyle = {
    background: "#f3e9d8",
    border: "1px solid rgba(176, 141, 79,0.3)",
    borderRadius: 16,
    color: "#3a2f22",
    fontSize: "0.875rem",
  };

  const focusRingStyle = "focus-visible:ring-1 focus-visible:ring-[#b08d4f] focus-visible:ring-offset-0";

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden px-6 py-24"
      style={{ background: "#f3e9d8" }}
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
            style={{ color: "#b08d4f" }}
          >
            {t.label}
          </p>
          <h2
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#c9a96e" }}
          >
            {t.title}
          </h2>
          <FloralDivider />
          <p className="text-sm" style={{ color: "#7c6f5a" }}>
            {t.deadlinePrefix}{" "}
            <span style={{ color: "#3a2f22" }}>{t.deadlineDate}</span>
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            background: "#fdf8f0",
            border: "1px solid rgba(176, 141, 79,0.18)",
            boxShadow: "0 8px 50px rgba(0,0,0,0.4)",
          }}
          className="rounded-[32px] p-8 sm:p-10"
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

              {/* Invite code */}
              <Field label={t.inviteCodeLabel} error={codeError || errors.inviteCode?.message}>
                <Input
                  {...register("inviteCode")}
                  placeholder={t.inviteCodePlaceholder}
                  style={inputStyle}
                  className={focusRingStyle}
                />
              </Field>

              {/* Name */}
              <Field label={t.nameLabel} error={errors.name?.message}>
                <Input
                  {...register("name")}
                  placeholder={t.namePlaceholder}
                  style={inputStyle}
                  className={focusRingStyle}
                />
              </Field>

              {/* Attending */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest" style={{ color: "#7c6f5a", letterSpacing: "0.15em" }}>
                  {t.attendingQuestion}
                </p>
                <div className="flex gap-0">
                  <AttendingOption
                    value="yes"
                    label={t.attendingYes}
                    selected={attending === "yes"}
                    onChange={() => setValue("attending", "yes")}
                  />
                  <AttendingOption
                    value="no"
                    label={t.attendingNo}
                    selected={attending === "no"}
                    onChange={() => setValue("attending", "no")}
                  />
                </div>
                <input type="hidden" {...register("attending")} />
              </div>

              {/* Dietary */}
              <Field label={t.dietaryLabel}>
                <Textarea
                  {...register("dietary")}
                  placeholder={t.dietaryPlaceholder}
                  rows={2}
                  style={{ ...inputStyle, resize: "none" }}
                  className={focusRingStyle}
                />
              </Field>

              {/* Extra guests */}
              <ExtraGuestFields />

              {/* Message */}
              <Field label={t.messageLabel}>
                <Textarea
                  {...register("message")}
                  placeholder={t.messagePlaceholder}
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
                    ? "#6b5a3a"
                    : "linear-gradient(135deg, #c9a96e, #a8834a)",
                  color: "#15120e",
                  letterSpacing: "0.25em",
                  boxShadow: isSubmitting
                    ? "none"
                    : "0 4px 20px rgba(176, 141, 79,0.3)",
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={15} className="animate-spin" />
                    {t.submitPending}
                  </span>
                ) : (
                  t.submitIdle
                )}
              </button>

            </form>
          </FormProvider>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { weddingConfig } from "@/lib/wedding-config";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { RsvpFormValues } from "./RsvpForm";

const t = weddingConfig.text.rsvp;

const inputStyle = {
  background: "#15120e",
  border: "1px solid rgba(201,169,110,0.3)",
  borderRadius: 0,
  color: "#ece2d2",
  fontSize: "0.875rem",
};

export function ExtraGuestFields() {
  const { register, control } = useFormContext<RsvpFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "extraGuests",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: "#9a9082", letterSpacing: "0.15em" }}
        >
          {t.extraGuestsLabel}
        </p>
        <button
          type="button"
          onClick={() => append({ name: "", dietary: "" })}
          className="flex items-center gap-1.5 text-xs uppercase tracking-wider py-1.5 px-3 transition-colors"
          style={{
            border: "1px solid rgba(201,169,110,0.4)",
            color: "#c9a96e",
            background: "transparent",
            letterSpacing: "0.15em",
          }}
        >
          <Plus size={12} />
          {t.addGuest}
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-center text-xs py-2" style={{ color: "#6f675c" }}>
          {t.noGuests}
        </p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative space-y-3 rounded-[32px] p-5"
          style={{
            background: "var(--w-bg)",
            border: "1px solid var(--w-border)",
          }}
        >
          <div className="flex items-center justify-between">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "#c9a96e", letterSpacing: "0.15em" }}
            >
              {t.guestLabel} {index + 1}
            </p>
            <button
              type="button"
              onClick={() => remove(index)}
              className="transition-colors"
              style={{ color: "#9a9082" }}
              aria-label="Rimuovi ospite"
            >
              <Trash2 size={13} />
            </button>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs" style={{ color: "#9a9082" }}>
              {t.guestNameLabel}
            </Label>
            <Input
              {...register(`extraGuests.${index}.name`)}
              placeholder={t.guestNamePlaceholder}
              style={inputStyle}
              className="focus-visible:ring-1 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-0"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs" style={{ color: "#9a9082" }}>
              {t.guestDietaryLabel}
            </Label>
            <Textarea
              {...register(`extraGuests.${index}.dietary`)}
              placeholder={t.guestDietaryPlaceholder}
              rows={2}
              style={{ ...inputStyle, resize: "none" }}
              className="focus-visible:ring-1 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-0"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { RsvpFormValues } from "./RsvpForm";

const inputStyle = {
  background: "#fff9f4",
  border: "1px solid #d4b880",
  borderRadius: 0,
  color: "#2c2010",
  fontSize: "0.875rem",
};

export function ExtraGuestFields() {
  const { register, control } = useFormContext<RsvpFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "extraGuests" });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest" style={{ color: "#8a7060", letterSpacing: "0.15em" }}>
          Ospiti aggiuntivi
        </p>
        <button
          type="button"
          onClick={() => append({ name: "", dietary: "" })}
          className="flex items-center gap-1.5 text-xs uppercase tracking-wider py-1.5 px-3 transition-colors"
          style={{
            border: "1px solid #c9a96e",
            color: "#a8834a",
            background: "transparent",
            letterSpacing: "0.15em",
          }}
        >
          <Plus size={12} />
          Aggiungi
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-center text-xs py-2" style={{ color: "#a89080" }}>
          Nessun ospite aggiuntivo — clicca &ldquo;Aggiungi&rdquo; per inserirne uno.
        </p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative space-y-3 p-4"
          style={{ background: "#fdf5ec", border: "1px solid #e0cdb8" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest" style={{ color: "#c9a96e", letterSpacing: "0.15em" }}>
              Ospite {index + 1}
            </p>
            <button
              type="button"
              onClick={() => remove(index)}
              className="transition-colors"
              style={{ color: "#a89080" }}
              aria-label="Rimuovi ospite"
            >
              <Trash2 size={13} />
            </button>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs" style={{ color: "#8a7060" }}>Nome completo *</Label>
            <Input
              {...register(`extraGuests.${index}.name`)}
              placeholder="Nome e cognome"
              style={inputStyle}
              className="focus-visible:ring-1 focus-visible:ring-[#c9a96e] focus-visible:ring-offset-0"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs" style={{ color: "#8a7060" }}>Allergie</Label>
            <Textarea
              {...register(`extraGuests.${index}.dietary`)}
              placeholder="Intolleranze o allergie..."
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

import { useState, useEffect, useRef } from "react";

export type SaveStatus = "idle" | "unsaved" | "saving" | "saved";

interface UseAutoSaveProps {
  value: string;
  onChange: (value: string) => void;
  storageKey: string;
}

export function useAutoSave({ value, onChange, storageKey }: UseAutoSaveProps) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (saveStatus === "unsaved") {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setSaveStatus("saving");
      timerRef.current = window.setTimeout(() => {
        localStorage.setItem(storageKey, value);
        setSaveStatus("saved");
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, storageKey]);

  useEffect(() => {
    if (saveStatus === "saved") {
      const timer = setTimeout(() => setSaveStatus("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const handleValueChange = (newValue: string) => {
    setSaveStatus("unsaved");
    onChange(newValue);
  };

  return { saveStatus, handleValueChange };
}

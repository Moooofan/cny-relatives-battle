/**
 * Client-only Blob/download helpers for the /admin back-office. Never
 * imported by anything outside src/app/admin or src/components/admin.
 */

function triggerDownload(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Downloads `data` as pretty-printed JSON. */
export function downloadJSON(filename: string, data: unknown): void {
  triggerDownload(filename, JSON.stringify(data, null, 2), "application/json;charset=utf-8");
}

function escapeCsvCell(value: string | number): string {
  const s = String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/**
 * Downloads a CSV with a UTF-8 BOM prefix so Excel on Windows/macOS renders
 * Traditional Chinese correctly instead of guessing Big5.
 */
export function downloadCSV(filename: string, headers: string[], rows: (string | number)[][]): void {
  const lines = [headers, ...rows].map((row) => row.map(escapeCsvCell).join(","));
  const csv = "﻿" + lines.join("\r\n");
  triggerDownload(filename, csv, "text/csv;charset=utf-8");
}

/** Reads a single File as text (used by the results JSON importer). */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error ?? new Error("讀取檔案失敗"));
    reader.readAsText(file, "utf-8");
  });
}

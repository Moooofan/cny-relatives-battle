import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { validateContent } from "@/engine/validate";
import { useContentStore } from "@/store/contentStore";
import { Card, SectionTitle } from "@/components/admin/Section";

/** Runs the same content validator the test suite uses (against the
 * *effective* content — bundled + admin overrides — so a bad edit shows up
 * here too), split into hard errors (block release) and "WARN:" lines (pool
 * still being filled in). */
export function ContentHealth() {
  const effectiveContent = useContentStore((s) => s.effectiveContent);
  const issues = validateContent(effectiveContent);
  const errors = issues.filter((line) => !line.startsWith("WARN:"));
  const warnings = issues.filter((line) => line.startsWith("WARN:"));

  return (
    <Card>
      <SectionTitle>內容健檢</SectionTitle>
      {errors.length === 0 && warnings.length === 0 && (
        <p className="flex items-center gap-2 text-sm text-heal">
          <CheckCircle2 size={16} /> 全部通過，沒有任何錯誤或警告。
        </p>
      )}
      {errors.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-sm text-primary">
            <XCircle size={16} /> {errors.length} 項錯誤
          </p>
          <ul className="text-xs text-text-muted list-disc pl-5 max-h-48 overflow-y-auto">
            {errors.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
      {warnings.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-sm text-gold">
            <AlertTriangle size={16} /> {warnings.length} 項警告
          </p>
          <ul className="text-xs text-text-muted list-disc pl-5 max-h-48 overflow-y-auto">
            {warnings.map((line, i) => (
              <li key={i}>{line.replace(/^WARN:\s*/, "")}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

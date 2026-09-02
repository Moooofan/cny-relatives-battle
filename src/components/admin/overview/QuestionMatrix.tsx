import { TOPICS } from "@/engine/types";
import type { Boss, Question } from "@/engine/types";
import { TOPIC_LABELS } from "@/lib/lifeDescribe";
import { Card, SectionTitle } from "@/components/admin/Section";

function countFor(questions: Question[], bossId: string | undefined, topic: string): number {
  return questions.filter((q) => q.bossId === bossId && q.topic === topic).length;
}

/** Boss × topic question-count matrix, plus a synthetic "generic" row for
 * questions with no bossId (shared across every boss that covers the topic). */
export function QuestionMatrix({ bosses, questions }: { bosses: Boss[]; questions: Question[] }) {
  return (
    <Card>
      <SectionTitle>題庫矩陣（關主 × 主題）</SectionTitle>
      <div className="overflow-x-auto">
        <table className="text-xs tabular w-full border-collapse min-w-[720px]">
          <thead>
            <tr>
              <th className="text-left text-text-muted font-normal py-1 pr-2 sticky left-0 bg-surface">關主</th>
              {TOPICS.map((topic) => (
                <th key={topic} className="text-right text-text-muted font-normal py-1 px-1 whitespace-nowrap">
                  {TOPIC_LABELS[topic]}
                </th>
              ))}
              <th className="text-right text-gold font-normal py-1 pl-2">合計</th>
            </tr>
          </thead>
          <tbody>
            {bosses.map((boss) => {
              const rowCounts = TOPICS.map((topic) => countFor(questions, boss.id, topic));
              const total = rowCounts.reduce((a, b) => a + b, 0);
              return (
                <tr key={boss.id} className="border-t border-border">
                  <td className="py-1 pr-2 text-text sticky left-0 bg-surface">{boss.name}</td>
                  {rowCounts.map((count, i) => (
                    <td key={TOPICS[i]} className="text-right py-1 px-1 text-text-muted">
                      {count || "–"}
                    </td>
                  ))}
                  <td className="text-right py-1 pl-2 text-gold">{total}</td>
                </tr>
              );
            })}
            <tr className="border-t border-border">
              <td className="py-1 pr-2 text-text sticky left-0 bg-surface">generic（共用）</td>
              {TOPICS.map((topic) => {
                const count = countFor(questions, undefined, topic);
                return (
                  <td key={topic} className="text-right py-1 px-1 text-text-muted">
                    {count || "–"}
                  </td>
                );
              })}
              <td className="text-right py-1 pl-2 text-gold">
                {questions.filter((q) => q.bossId === undefined).length}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}

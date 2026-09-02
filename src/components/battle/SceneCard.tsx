import { PrimaryButton } from "@/components/common/PrimaryButton";

interface Props {
  header?: string;
  lines: string[];
  onContinue: () => void;
}

/** Story-mode narrative/rest interlude: header + narration lines + 繼續. */
export function SceneCard({ header, lines, onContinue }: Props) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-6 px-6 py-10">
      {header && <p className="text-center text-xs text-gold">{header}</p>}
      <div className="rpg-box p-5 flex flex-col gap-3">
        {lines.map((line, i) => (
          <p key={i} className="text-base leading-relaxed">
            {line}
          </p>
        ))}
      </div>
      <PrimaryButton onClick={onContinue}>繼續</PrimaryButton>
    </div>
  );
}

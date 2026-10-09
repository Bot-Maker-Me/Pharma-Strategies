interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="mb-8">
      <div className="hairline-rule mb-4" />
      <p className="font-mono text-xs uppercase tracking-widest text-secondaryText">
        {label}
      </p>
    </div>
  );
}

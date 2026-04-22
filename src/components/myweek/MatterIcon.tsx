type MatterIconType = "baby" | "body" | "heart";

interface Props {
  type: MatterIconType;
  size?: number;
}

const MatterIcon = ({ type, size = 24 }: Props) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.45,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" className="text-[hsl(var(--stage-pregnancy-accent))]">
      {type === "baby" && (
        <>
          <path {...common} d="M18.8 7.4c3.6 1.2 5.8 4.4 5.5 8.2-.3 5-4.3 8.9-9.2 8.9-3.9 0-7.4-2.5-7.4-6.5 0-3.1 2.1-5.1 4.7-5.1 2.2 0 3.7 1.3 3.7 3.3 0 1.6-1.1 2.8-2.7 2.8" />
          <path {...common} d="M18.5 7.5c-1.2-.5-2.8-.3-3.7.7-.8.9-.8 2.2.1 3" />
          <circle cx="19.6" cy="13.2" r="0.8" fill="currentColor" />
        </>
      )}
      {type === "body" && (
        <>
          <path {...common} d="M16 5.5c-1.4 2.2-2.1 4.3-2.1 6.3 0 1.8.5 3.1 1.4 4.2" />
          <path {...common} d="M16 5.5c1.4 2.2 2.1 4.3 2.1 6.3 0 1.8-.5 3.1-1.4 4.2" />
          <path {...common} d="M13.9 12.7c-3.1 1.8-4.6 4.4-4.4 7.8.2 3.2 2.6 5.7 6.5 5.7s6.3-2.5 6.5-5.7c.2-3.4-1.3-6-4.4-7.8" />
          <path {...common} d="M12.2 21.2c1.1 1.4 2.4 2 3.8 2s2.7-.6 3.8-2" />
        </>
      )}
      {type === "heart" && (
        <path {...common} d="M16 25.2S7.8 20.2 7.8 13.8c0-2.8 1.9-5 4.5-5 1.6 0 2.9.8 3.7 2.1.8-1.3 2.1-2.1 3.7-2.1 2.6 0 4.5 2.2 4.5 5 0 6.4-8.2 11.4-8.2 11.4Z" />
      )}
    </svg>
  );
};

export default MatterIcon;
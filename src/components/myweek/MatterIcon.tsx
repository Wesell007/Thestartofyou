type MatterIconType = "baby" | "body" | "heart";

interface Props {
  type: MatterIconType;
  size?: number;
}

const MatterIcon = ({ type, size = 24 }: Props) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" className="text-[hsl(var(--stage-pregnancy-accent))]">
      {type === "baby" && (
        <>
          <path {...common} d="M19.2 7.2c3.2 1.1 5.1 4.1 4.7 7.4-.5 4.4-4 7.8-8.5 7.8-3.7 0-6.9-2.2-6.9-5.8 0-2.7 1.9-4.5 4.3-4.5 2 0 3.3 1.1 3.3 2.9 0 1.4-.9 2.4-2.3 2.4" />
          <path {...common} d="M18.9 7.3c-1.3-.7-3.1-.5-4 .6-.9 1-.8 2.6.2 3.6" />
          <path {...common} d="M17.1 20.9c1.4 1.9 3.5 2.9 5.9 2.4" />
          <circle cx="19.4" cy="12.4" r="0.75" fill="currentColor" />
        </>
      )}
      {type === "body" && (
        <>
          <path {...common} d="M13.1 6.4c1.2.9 2.2 1.3 2.9 1.3s1.7-.4 2.9-1.3" />
          <path {...common} d="M12.2 8.1c-1.2 2.1-1.7 4.3-1.4 6.6.2 1.4.8 2.8 1.8 4" />
          <path {...common} d="M19.8 8.1c1.2 2.1 1.7 4.3 1.4 6.6-.2 1.4-.8 2.8-1.8 4" />
          <path {...common} d="M12.8 14.4c-2.3 1.7-3.4 3.9-3.2 6.7.2 3.1 2.8 5.5 6.4 5.5s6.2-2.4 6.4-5.5c.2-2.8-.9-5-3.2-6.7" />
          <path {...common} d="M12.6 21.4c1.1 1.3 2.2 1.9 3.4 1.9s2.3-.6 3.4-1.9" />
        </>
      )}
      {type === "heart" && (
        <path {...common} d="M16 25.2S7.8 20.2 7.8 13.8c0-2.8 1.9-5 4.5-5 1.6 0 2.9.8 3.7 2.1.8-1.3 2.1-2.1 3.7-2.1 2.6 0 4.5 2.2 4.5 5 0 6.4-8.2 11.4-8.2 11.4Z" />
      )}
    </svg>
  );
};

export default MatterIcon;
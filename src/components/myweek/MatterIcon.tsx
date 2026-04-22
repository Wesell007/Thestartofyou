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
          <path {...common} d="M19.3 7.4c3.4 1.2 5.5 4.4 5 7.9-.6 4.6-4.4 8.2-9 8.2-4 0-7.4-2.5-7.4-6.2 0-2.9 2.1-4.9 4.8-4.9 2.2 0 3.7 1.2 3.7 3.2 0 1.6-1.1 2.7-2.6 2.7" />
          <path {...common} d="M18.9 7.5c-1.5-.8-3.5-.5-4.5.7-1 1.1-.8 2.9.3 3.9" />
          <path {...common} d="M17.1 21.7c1.5 2 3.8 3.1 6.4 2.5" />
          <path {...common} d="M12.2 18.6c-1.4.9-2.1 2.1-2 3.4" />
          <circle cx="19.8" cy="12.8" r="0.75" fill="currentColor" />
        </>
      )}
      {type === "body" && (
        <>
          <path {...common} d="M13.1 5.9c1.1.9 2 .3 2.9.3s1.8.6 2.9-.3" />
          <path {...common} d="M12.3 8.2c-1.5 2.2-2.1 4.7-1.7 7.4.2 1.4.8 2.8 1.8 4.1" />
          <path {...common} d="M19.7 8.2c1.1 1.8 1.6 3.6 1.4 5.5" />
          <path {...common} d="M13.4 14.2c-2.4 1.5-3.8 3.8-3.8 6.4 0 3.4 2.6 5.9 6.4 5.9s6.4-2.5 6.4-5.9c0-3.5-2.5-6.1-6.1-6.4-1-.1-2 .1-2.9.4" />
          <path {...common} d="M13.2 21.4c1.1 1.4 2.3 2.1 3.7 2.1 1.1 0 2.1-.4 3-1.3" />
          <path {...common} d="M16 8.3c-.5 2.1-.5 4.1.1 6" />
        </>
      )}
      {type === "heart" && (
        <>
          <path {...common} d="M16 25.2S7.8 20.2 7.8 13.8c0-2.8 1.9-5 4.5-5 1.6 0 2.9.8 3.7 2.1.8-1.3 2.1-2.1 3.7-2.1 2.6 0 4.5 2.2 4.5 5 0 6.4-8.2 11.4-8.2 11.4Z" />
          <path {...common} d="M12 14.1c0-1.1.7-1.9 1.7-1.9" opacity="0.55" />
        </>
      )}
    </svg>
  );
};

export default MatterIcon;

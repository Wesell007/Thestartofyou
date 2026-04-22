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
          <path {...common} d="M20.3 7.5c3.4 1.2 5.4 4.4 4.8 7.9-.8 4.9-5 8.8-10 8.8-4.3 0-7.8-2.7-7.8-6.5 0-3.1 2.3-5.2 5.1-5.2 2.4 0 4 1.4 4 3.4 0 1.8-1.2 3-2.9 3" />
          <path {...common} d="M19.6 7.5c-1.9-.9-4.1-.5-5.1.8-1.1 1.2-.9 3.1.4 4.2" />
          <path {...common} d="M17 22.4c1.7 2 4.2 2.9 6.8 2.1" />
          <path {...common} d="M12.1 18.5c-1.5 1-2.2 2.2-2 3.7" />
          <path {...common} d="M18.1 16.2c1.9-.8 3.6-.2 4.8 1.5" opacity="0.68" />
          <path {...common} d="M13.8 12.2c1.2 1.2 2.7 1.5 4.4 1" opacity="0.42" />
          <circle cx="20" cy="12.7" r="0.72" fill="currentColor" />
        </>
      )}
      {type === "body" && (
        <>
          <path {...common} d="M13.3 5.9c.9.7 1.8.4 2.7.4s1.8.3 2.7-.4" />
          <path {...common} d="M12.4 8.4c-1.5 2.4-1.9 5.2-1.3 8 .4 1.8 1.2 3.4 2.5 4.8" />
          <path {...common} d="M19.6 8.4c1.4 2.1 1.8 4.5 1.2 6.8" />
          <path {...common} d="M16.6 13.4c3.8.7 6.4 3.7 6.4 7.3 0 4-2.9 6.8-7 6.8-3.8 0-6.6-2.8-6.6-6.7 0-3.5 2.3-6.4 5.7-7.3.5-.1 1-.2 1.5-.1Z" />
          <path {...common} d="M13.2 20.8c1.2 1.4 2.6 2.1 4.1 2.1 1.4 0 2.6-.5 3.6-1.6" />
          <path {...common} d="M15.9 8.9c-.5 1.8-.5 3.4 0 4.9" />
          <path {...common} d="M21.8 16.5c1.1.9 1.8 2.1 1.9 3.6" opacity="0.54" />
        </>
      )}
      {type === "heart" && (
        <>
          <path {...common} d="M16 25.1S7.9 20.2 7.9 13.8c0-2.8 1.9-5 4.4-5 1.6 0 2.9.8 3.7 2.1.8-1.3 2.1-2.1 3.7-2.1 2.5 0 4.4 2.2 4.4 5 0 6.4-8.1 11.3-8.1 11.3Z" />
          <path {...common} d="M12 14.1c0-1.1.7-1.9 1.7-1.9" opacity="0.55" />
          <path {...common} d="M11.2 18.2c1.1 1.8 2.8 3.3 4.8 4.7" opacity="0.42" />
          <path {...common} d="M20.8 13.4c.7.8.8 1.9.3 3" opacity="0.35" />
        </>
      )}
    </svg>
  );
};

export default MatterIcon;

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
          <path {...common} d="M19.7 7.8c3.2 1.2 5.1 4.2 4.6 7.5-.7 4.6-4.5 8-9.1 8-4 0-7.3-2.5-7.3-6.1 0-2.9 2.1-4.9 4.8-4.9 2.3 0 3.8 1.3 3.8 3.2 0 1.6-1.1 2.8-2.6 2.8" />
          <path {...common} d="M19 7.7c-1.6-.8-3.6-.5-4.6.7-1 1.1-.9 2.9.3 3.9" />
          <path {...common} d="M17.2 21.4c1.4 2.1 3.8 3.2 6.4 2.6" />
          <path {...common} d="M12.3 18.5c-1.3.9-2 2-1.9 3.3" />
          <path {...common} d="M18.2 16.2c1.7-.7 3.2-.2 4.3 1.3" opacity="0.68" />
          <circle cx="19.6" cy="12.7" r="0.75" fill="currentColor" />
        </>
      )}
      {type === "body" && (
        <>
          <path {...common} d="M13.2 5.9c1 .8 1.9.4 2.8.4s1.8.4 2.8-.4" />
          <path {...common} d="M12.7 8.2c-1.3 2.2-1.7 4.7-1.2 7.2.3 1.7 1 3.3 2.1 4.8" />
          <path {...common} d="M19.3 8.2c1.1 1.7 1.6 3.6 1.4 5.4" />
          <path {...common} d="M15 14.1c-2.9.9-4.8 3.3-4.8 6.2 0 3.5 2.5 6.1 5.8 6.1 3.6 0 6.2-2.6 6.2-6.1 0-3.2-2.2-5.7-5.5-6.2-.6-.1-1.2-.1-1.7 0Z" />
          <path {...common} d="M13.6 20.4c1.1 1.2 2.3 1.8 3.6 1.8 1.2 0 2.2-.4 3-1.3" />
          <path {...common} d="M16 8.6c-.4 1.9-.4 3.8.1 5.5" />
          <path {...common} d="M21.2 16.2c1 .8 1.6 1.9 1.7 3.2" opacity="0.6" />
        </>
      )}
      {type === "heart" && (
        <>
          <path {...common} d="M16 25.1S7.9 20.2 7.9 13.8c0-2.8 1.9-5 4.4-5 1.6 0 2.9.8 3.7 2.1.8-1.3 2.1-2.1 3.7-2.1 2.5 0 4.4 2.2 4.4 5 0 6.4-8.1 11.3-8.1 11.3Z" />
          <path {...common} d="M12 14.1c0-1.1.7-1.9 1.7-1.9" opacity="0.55" />
          <path {...common} d="M11.2 18.2c1.1 1.8 2.8 3.3 4.8 4.7" opacity="0.42" />
        </>
      )}
    </svg>
  );
};

export default MatterIcon;

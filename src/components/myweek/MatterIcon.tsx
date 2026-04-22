type MatterIconType = "baby" | "body" | "heart";

interface Props {
  type: MatterIconType;
  size?: number;
}

const MatterIcon = ({ type, size = 24 }: Props) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.28,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" style={{ color: "hsl(var(--stage-pregnancy-accent))" }}>
      {type === "baby" && (
        <>
          <path {...common} d="M23.4 8.7c2.5 1.1 4.2 3.8 4.2 6.8 0 5.2-4.1 9.7-9.8 10.4-4.5.5-8.7-1.9-9.9-5.8-.8-2.7.2-5.3 2.8-6.7 2.1-1.1 4.8-.9 6.4.6 1.1 1 .9 2.7-.2 3.5" />
          <path {...common} d="M22.6 8.3c-1.2-.9-2.9-1.2-4.5-.8-1.7.5-2.9 1.8-3.3 3.3" />
          <path {...common} d="M14.1 21.1c1.8 1.1 3.9 1.5 6 1.1" />
          <path {...common} d="M21.5 16.8c1.4.3 2.6 1.2 3.5 2.6" opacity="0.62" />
          <path {...common} d="M12.3 18.1c-1.2.9-1.8 2-1.8 3.3" opacity="0.54" />
          <path {...common} d="M16.2 12.7c1.1.9 2.4 1.3 4 1.2" opacity="0.4" />
          <circle cx="20.9" cy="12.6" r="0.7" fill="currentColor" />
        </>
      )}
      {type === "body" && (
        <>
          <path {...common} d="M13 6.4c1 .6 1.9.8 3 .8 1 0 2-.2 3-.8" />
          <path {...common} d="M13.2 8.5c-1.4 2.3-1.7 5.1-1.1 7.5.3 1.3 1 2.5 1.9 3.6" />
          <path {...common} d="M18.8 8.5c1.2 1.8 1.7 4 1.5 6.1" />
          <path {...common} d="M15.8 12.7c4.6 0 8.3 3.2 8.3 7.5 0 4.1-3.2 7-7.7 7-4.3 0-7.4-2.8-7.4-6.8 0-4.3 3.1-7.7 6.8-7.7Z" />
          <path {...common} d="M13.5 17.1c1.3-.9 2.8-1.4 4.6-1.4 1.4 0 2.7.3 3.8.8" opacity="0.42" />
          <path {...common} d="M11.8 22.8c2.3 1.2 4.8 1.5 7.5.8" opacity="0.52" />
          <path {...common} d="M20.9 16.1c1.3 1.1 2 2.5 2.1 4.1" opacity="0.58" />
        </>
      )}
      {type === "heart" && (
        <>
          <path {...common} d="M16 25.4S8.4 20.8 8.4 14.2c0-3 2-5.3 4.7-5.3 1.6 0 2.9.8 3.8 2.2.8-1.4 2.1-2.2 3.8-2.2 2.6 0 4.7 2.3 4.7 5.3 0 6.6-7.8 11.2-7.8 11.2Z" />
          <path {...common} d="M12.2 13.8c.1-1.3 1-2.2 2.2-2.2" opacity="0.56" />
          <path {...common} d="M11.6 17.7c1 1.9 2.6 3.5 4.5 4.9" opacity="0.42" />
          <path {...common} d="M20.9 13.6c.7.9.9 1.9.4 3.1" opacity="0.34" />
        </>
      )}
    </svg>
  );
};

export default MatterIcon;

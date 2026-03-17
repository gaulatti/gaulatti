interface BauhausBackgroundProps {
  type: "nazca" | "autostrada" | "pompeii" | "monitor";
  className?: string;
  imageUrl?: string;
}

const patterns = {
  nazca: {
    bgClass: "bg-accent-bronze",
    pattern: "circles",
  },
  autostrada: {
    bgClass: "bg-accent-oxblood",
    pattern: "lines",
  },
  pompeii: {
    bgClass: "bg-accent-bronze",
    pattern: "squares",
  },
  monitor: {
    bgClass: "bg-accent-oxblood",
    pattern: "circles",
  },
} as const;

export function BauhausBackground({
  type,
  className = "",
  imageUrl,
}: BauhausBackgroundProps) {
  const { bgClass, pattern } = patterns[type];
  const finalImageUrl = imageUrl || "/hero/pompeii.avif";

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <img src={finalImageUrl} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent mix-blend-multiply" />
      </div>

      <div className={`absolute inset-0 mix-blend-soft-light ${bgClass}`}>
        {pattern === "circles" ? (
          <div className="absolute inset-0">
            <div className="shape-rotate absolute top-1/4 left-1/4 h-1/2 w-1/2 rounded-full border-8 border-white" />
            <div className="shape-rotate absolute top-1/3 left-1/3 h-1/3 w-1/3 rounded-full border-4 border-white [animation-direction:reverse]" />
          </div>
        ) : null}

        {pattern === "lines" ? (
          <div className="absolute inset-0">
            <div className="grid h-full grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="h-full border-l-2 border-white transition-transform duration-300 hover:rotate-3"
                  style={{ transitionDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </div>
        ) : null}

        {pattern === "squares" ? (
          <div className="absolute inset-0">
            <div className="grid h-full grid-cols-3 grid-rows-3 gap-4 p-4">
              {Array.from({ length: 9 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className="border-2 border-white transition-transform duration-300 hover:rotate-3" />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

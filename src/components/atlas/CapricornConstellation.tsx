import styles from "./AtlasPage.module.css";

const nodes = [
  { id: "alpha-1", x: 132, y: 172, radius: 1.5 },
  { id: "alpha-2", x: 153, y: 178, radius: 2.1 },
  { id: "beta", x: 194, y: 223, radius: 3 },
  { id: "nu", x: 240, y: 203, radius: 1.4 },
  { id: "psi", x: 286, y: 300, radius: 1.5 },
  { id: "omega", x: 360, y: 389, radius: 1.9 },
  { id: "zeta", x: 468, y: 348, radius: 2.1 },
  { id: "theta", x: 412, y: 270, radius: 1.4 },
  { id: "iota", x: 477, y: 224, radius: 1.2 },
  { id: "gamma", x: 552, y: 176, radius: 2.2 },
  { id: "delta", x: 616, y: 199, radius: 3.5 },
] as const;

const connections = [
  [0, 1], [1, 2], [1, 3], [3, 2], [2, 4], [4, 5], [5, 6],
  [6, 10], [10, 9], [9, 8], [8, 7], [7, 2], [7, 6],
] as const;

const dust = [
  [84, 92, 1], [114, 338, 0.7], [224, 116, 0.8], [304, 86, 0.6],
  [334, 466, 0.9], [424, 108, 0.7], [534, 394, 0.8], [666, 102, 1],
  [690, 332, 0.7], [572, 492, 0.6],
] as const;

type CapricornConstellationProps = {
  className?: string;
  labelled?: boolean;
};

export default function CapricornConstellation({ className, labelled = false }: CapricornConstellationProps) {
  const titleId = labelled ? "capricornus-title" : undefined;

  return (
    <svg
      className={`${styles.constellation}${className ? ` ${className}` : ""}`}
      viewBox="0 0 760 560"
      role={labelled ? "img" : "presentation"}
      aria-labelledby={titleId}
      aria-hidden={labelled ? undefined : true}
    >
      {labelled ? <title id={titleId}>Starfield constellation</title> : null}
      <defs>
        <radialGradient id="atlas-cap-node">
          <stop offset="0" stopColor="#fffef8" />
          <stop offset="0.18" stopColor="#e7e4ff" />
          <stop offset="1" stopColor="#8f86ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="atlas-cap-path" x1="0" x2="1">
          <stop offset="0" stopColor="#a9dfff" stopOpacity="0.22" />
          <stop offset="0.48" stopColor="#f0edff" stopOpacity="0.78" />
          <stop offset="1" stopColor="#a898ff" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      <g className={styles.constellationDust}>
        {dust.map(([x, y, radius]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={radius} />)}
      </g>
      <g className={styles.constellationPaths} stroke="url(#atlas-cap-path)">
        {connections.map(([from, to], index) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            style={{ animationDelay: `${180 + index * 90}ms` }}
          />
        ))}
      </g>
      <g className={styles.constellationNodes}>
        {nodes.map((node, index) => (
          <g key={node.id} style={{ animationDelay: `${540 + index * 75}ms` }}>
            <circle cx={node.x} cy={node.y} r={10 + node.radius * 3.2} fill="url(#atlas-cap-node)" />
            <circle cx={node.x} cy={node.y} r={node.radius} />
          </g>
        ))}
      </g>
    </svg>
  );
}

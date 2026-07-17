const nodes = [
  [68, 118], [132, 66], [198, 132], [274, 76], [346, 146], [414, 92],
  [492, 154], [562, 82], [632, 126], [718, 58], [772, 142], [846, 94],
] as const;

const connections = [
  [0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [2, 4], [3, 4], [3, 5],
  [4, 5], [4, 6], [5, 6], [5, 7], [6, 7], [6, 8], [7, 8], [7, 9],
  [8, 9], [8, 10], [9, 10], [9, 11], [10, 11],
] as const;

export default function ConstellationDisplay({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "constellation-display compact" : "constellation-display"} aria-hidden="true">
      <svg viewBox="0 0 920 220" role="presentation">
        <defs>
          <linearGradient id={compact ? "path-compact" : "path-main"} x1="0" x2="1">
            <stop offset="0" stopColor="#5d8ca8" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#a9d7ee" stopOpacity="0.48" />
            <stop offset="1" stopColor="#5d8ca8" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id={compact ? "node-compact" : "node-main"}>
            <stop offset="0" stopColor="#effaff" />
            <stop offset="0.28" stopColor="#9dd4ee" />
            <stop offset="1" stopColor="#548aa8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="constellation-grid">
          {Array.from({ length: 9 }, (_, index) => (
            <line key={`v-${index}`} x1={55 + index * 102} x2={55 + index * 102} y1="20" y2="200" />
          ))}
          {Array.from({ length: 5 }, (_, index) => (
            <line key={`h-${index}`} x1="35" x2="885" y1={30 + index * 42} y2={30 + index * 42} />
          ))}
        </g>

        <g className="constellation-paths" stroke={`url(#${compact ? "path-compact" : "path-main"})`}>
          {connections.map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              x1={nodes[from][0]}
              y1={nodes[from][1]}
              x2={nodes[to][0]}
              y2={nodes[to][1]}
            />
          ))}
        </g>

        <g className="constellation-nodes">
          {nodes.map(([x, y], index) => (
            <g key={`${x}-${y}`} style={{ animationDelay: `${index * 180}ms` }}>
              <circle cx={x} cy={y} r={index % 4 === 0 ? 14 : 9} fill={`url(#${compact ? "node-compact" : "node-main"})`} />
              <circle cx={x} cy={y} r={index % 4 === 0 ? 1.8 : 1.1} fill="#eaf8ff" />
            </g>
          ))}
        </g>

        <path className="constellation-scan" d="M 42 181 C 248 94, 460 204, 878 40" />
      </svg>
    </div>
  );
}

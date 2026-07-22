import styles from "./ConstellationDisplay.module.css";

const stars = [
  [88, 82, 1.2], [154, 168, 0.7], [214, 72, 0.9], [292, 126, 0.6],
  [368, 58, 1.1], [438, 188, 0.7], [520, 88, 0.8], [636, 138, 1.2],
  [690, 244, 0.7], [104, 308, 0.8], [202, 398, 0.7], [302, 482, 1.1],
  [412, 382, 0.6], [492, 502, 0.9], [594, 424, 0.7], [680, 344, 0.8],
] as const;

const nodes = [
  [132, 172, 1.5], [153, 178, 2.1], [194, 223, 3], [240, 203, 1.4],
  [286, 300, 1.5], [360, 389, 1.9], [468, 348, 2.1], [412, 270, 1.4],
  [477, 224, 1.2], [552, 176, 2.2], [616, 199, 3.5],
] as const;

const connections = [
  [0, 1], [1, 2], [1, 3], [3, 2], [2, 4], [4, 5], [5, 6],
  [6, 10], [10, 9], [9, 8], [8, 7], [7, 2], [7, 6],
] as const;

export default function ConstellationDisplay() {
  return (
    <div className={styles.display}>
      <svg viewBox="0 0 760 560" role="presentation">
        <defs>
          <radialGradient id="atlas-node">
            <stop offset="0" stopColor="#fffef8" />
            <stop offset="0.22" stopColor="#dcd7ff" />
            <stop offset="1" stopColor="#8c7dff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="atlas-path" x1="0" x2="1">
            <stop offset="0" stopColor="#b7dcff" stopOpacity="0.14" />
            <stop offset="0.5" stopColor="#d9d3ff" stopOpacity="0.56" />
            <stop offset="1" stopColor="#9a8cff" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        <ellipse className={styles.orbit} cx="382" cy="290" rx="344" ry="126" transform="rotate(-17 382 290)" />
        <ellipse className={styles.orbitFine} cx="386" cy="286" rx="264" ry="228" transform="rotate(23 386 286)" />

        <g className={styles.dust}>
          {stars.map(([x, y, radius]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={radius} />)}
        </g>

        <g className={styles.paths} stroke="url(#atlas-path)">
          {connections.map(([from, to], index) => (
            <line
              key={`${from}-${to}`}
              x1={nodes[from][0]}
              y1={nodes[from][1]}
              x2={nodes[to][0]}
              y2={nodes[to][1]}
              style={{ animationDelay: `${360 + index * 85}ms` }}
            />
          ))}
        </g>

        <g className={styles.nodes}>
          {nodes.map(([x, y, radius], index) => (
            <g key={`${x}-${y}`} style={{ animationDelay: `${index * 160}ms` }}>
              <circle cx={x} cy={y} r={7 + radius * 2.5} fill="url(#atlas-node)" />
              <circle cx={x} cy={y} r={radius} />
            </g>
          ))}
        </g>

      </svg>
    </div>
  );
}

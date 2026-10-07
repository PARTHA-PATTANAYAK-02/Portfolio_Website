import "./HeroTechConstellation.css";

const NODES = [
  {
    id: "react",
    name: "React",
    group: "FRONTEND",
    mark: "R",
    color: "#61DAFB",
    x: 124,
    y: 145,
  },
  {
    id: "node",
    name: "Node.js",
    group: "RUNTIME",
    mark: "N",
    color: "#68A063",
    x: 496,
    y: 145,
  },
  {
    id: "express",
    name: "Express",
    group: "BACKEND",
    mark: "Ex",
    color: "#A5B4FC",
    x: 535,
    y: 292,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    group: "DATABASE",
    mark: "M",
    color: "#47A248",
    x: 478,
    y: 434,
  },
  {
    id: "mysql",
    name: "MySQL",
    group: "DATABASE",
    mark: "SQL",
    color: "#60A5FA",
    x: 142,
    y: 434,
  },
  {
    id: "java",
    name: "Java",
    group: "LANGUAGE",
    mark: "J",
    color: "#F89820",
    x: 83,
    y: 292,
  },
  {
    id: "api",
    name: "REST API",
    group: "ARCHITECTURE",
    mark: "{ }",
    color: "#A78BFA",
    x: 267,
    y: 82,
  },
  {
    id: "fullstack",
    name: "Full stack",
    group: "DEVELOPMENT",
    mark: "</>",
    color: "#22D3EE",
    x: 366,
    y: 482,
  },
];

const CENTER = { x: 310, y: 286 };

export default function HeroTechConstellation() {
  return (
    <div className="tech-constellation">
      <div className="tech-constellation-heading" aria-hidden="true">
        <span className="tech-constellation-mark">{"</>"}</span>
        <span>
          <strong>MY TECH UNIVERSE</strong>
          <small>TOOLS THAT BRING IDEAS TO LIFE</small>
        </span>
        <span className="tech-constellation-live">
          <i />
          CONNECTED
        </span>
      </div>

      <svg
        className="tech-constellation-graphic"
        viewBox="0 0 620 550"
        role="img"
        aria-labelledby="tech-constellation-title tech-constellation-description"
      >
        <title id="tech-constellation-title">Partha's technology stack</title>
        <desc id="tech-constellation-description">
          An interactive map connecting React, Node.js, Express, MongoDB, MySQL,
          Java, REST APIs, and full-stack development.
        </desc>

        <defs>
          <radialGradient id="constellation-core">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity=".95" />
            <stop offset="45%" stopColor="#8b5cf6" stopOpacity=".45" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="constellation-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity=".18" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity=".72" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity=".2" />
          </linearGradient>
        </defs>

        <circle className="tech-constellation-orbit tech-constellation-orbit-one" cx={CENTER.x} cy={CENTER.y} r="157" />
        <circle className="tech-constellation-orbit tech-constellation-orbit-two" cx={CENTER.x} cy={CENTER.y} r="206" />
        <ellipse
          className="tech-constellation-orbit tech-constellation-orbit-three"
          cx={CENTER.x}
          cy={CENTER.y}
          rx="235"
          ry="118"
          transform={`rotate(-28 ${CENTER.x} ${CENTER.y})`}
        />

        <g className="tech-constellation-links" aria-hidden="true">
          {NODES.map((node, index) => (
            <g key={node.id}>
              <line
                x1={CENTER.x}
                y1={CENTER.y}
                x2={node.x}
                y2={node.y}
                style={{ animationDelay: `${index * -0.7}s` }}
              />
              <circle
                className="tech-constellation-signal"
                r="3"
                fill={node.color}
                style={{ "--signal-delay": `${index * -0.8}s` }}
              >
                <animateMotion
                  dur={`${3.4 + index * 0.24}s`}
                  repeatCount="indefinite"
                  path={`M ${CENTER.x} ${CENTER.y} L ${node.x} ${node.y}`}
                />
              </circle>
            </g>
          ))}
        </g>

        <g className="tech-constellation-center">
          <circle cx={CENTER.x} cy={CENTER.y} r="87" fill="url(#constellation-core)" />
          <circle className="tech-constellation-core-ring" cx={CENTER.x} cy={CENTER.y} r="58" />
          <circle className="tech-constellation-core-ring tech-constellation-core-ring-inner" cx={CENTER.x} cy={CENTER.y} r="43" />
          <circle cx={CENTER.x} cy={CENTER.y} r="31" fill="#100d20" stroke="#a78bfa" strokeOpacity=".8" />
          <text x={CENTER.x} y={CENTER.y - 3} className="tech-constellation-code" textAnchor="middle">
            {"</>"}
          </text>
          <text x={CENTER.x} y={CENTER.y + 18} className="tech-constellation-core-label" textAnchor="middle">
            PARTHA
          </text>
        </g>

        {NODES.map((node, index) => (
          <g
            key={node.id}
            className="tech-constellation-node"
            tabIndex="0"
            role="group"
            aria-label={`${node.name}, ${node.group.toLowerCase()}`}
            style={{ "--node-color": node.color, "--node-delay": `${index * -0.35}s` }}
          >
            <title>{`${node.name} · ${node.group.toLowerCase()}`}</title>
            <rect
              className="tech-constellation-node-card"
              x={node.x - 60}
              y={node.y - 31}
              width="120"
              height="62"
              rx="16"
            />
            <circle
              className="tech-constellation-node-icon"
              cx={node.x - 34}
              cy={node.y}
              r="15"
            />
            <text
              className="tech-constellation-node-mark"
              x={node.x - 34}
              y={node.y + 3}
              textAnchor="middle"
            >
              {node.mark}
            </text>
            <text
              className="tech-constellation-node-name"
              x={node.x - 11}
              y={node.y - 3}
            >
              {node.name}
            </text>
            <text
              className="tech-constellation-node-group"
              x={node.x - 11}
              y={node.y + 12}
            >
              {node.group}
            </text>
          </g>
        ))}
      </svg>

      <div className="tech-constellation-footer" aria-hidden="true">
        <strong>IDEA</strong>
        <span />
        <strong>CODE</strong>
        <span />
        <strong>SHIP</strong>
        <small>FULL-STACK, END TO END</small>
      </div>
    </div>
  );
}

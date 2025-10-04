import { COMPONENT_TYPE } from "@/enums/game.enums";
import { CircuitSubmission, IComponent } from "../game.interface";

// Helper to add bidirectional link
function link(graph: Record<string, string[]>, a: string, b: string) {
  if (!graph[a]) graph[a] = [];
  if (!graph[b]) graph[b] = [];
  graph[a].push(b);
}

export function buildGraph(submission: CircuitSubmission) {
  const graph: Record<string, string[]> = {};

  // Add user-defined connections
  submission.connections.forEach((conn) => {
    if (!graph[conn.from]) graph[conn.from] = [];
    if (!graph[conn.to]) graph[conn.to] = [];
    graph[conn.from].push(conn.to);
  });

  // Add default internal connections based on component type
  for (const comp of submission.components) {
    switch (comp.type) {
      case COMPONENT_TYPE.RESISTOR:
        link(graph, `${comp.id}:in`, `${comp.id}:out`);
        break;
    }
  }

  return graph;
}


export function hasPath(
  graph: Record<string, string[]>,
  start: string,
  end: string,
  visited = new Set()
): boolean {
  if (start === end) return true;
  visited.add(start);
  for (let neighbor of graph[start] || []) {
    if (!visited.has(neighbor) && hasPath(graph, neighbor, end, visited))
      return true;
  }
  return false;
}

// Walk the path from battery positive to ground and ensure there is at least one load (LED/resistor)
function hasDirectPath(
  battery: IComponent,
  ground: IComponent,
  submission: CircuitSubmission
): boolean {
  const directConn = submission.connections.some(
    (conn) =>
      conn.from === `${battery.id}:positive` &&
      conn.to === `${ground.id}:terminal`
  );

  return directConn;
}

export function universalElectricalChecks(
  submission: CircuitSubmission,
  graph: Record<string, string[]>,
  errors: string[]
) {

  const battery = submission.components.find(
    (c) => c.type === COMPONENT_TYPE.BATTERY
  );
  const leds = submission.components.filter(
    (c) => c.type === COMPONENT_TYPE.LED
  );
  const ground = submission.components.find(
    (c) => c.type === COMPONENT_TYPE.GROUND
  );

  if (!battery) errors.push("Circuit must include a battery");
  if (leds.length === 0) errors.push("Circuit must include at least one LED");
  if (!ground) errors.push("Circuit must include a ground");
  if (!battery || leds.length === 0 || !ground) return;

  // ✅ Short circuit check: direct path from battery positive → ground with no load
  if (hasDirectPath(battery, ground, submission))
    errors.push("Short circuit detected");

  // ✅ Check each LED individually
  for (const led of leds) {
    const anodePath = hasPath(
      graph,
      `${battery.id}:positive`,
      `${led.id}:anode`
    );
    const cathodePath = hasPath(
      graph,
      `${led.id}:cathode`,
      `${ground.id}:terminal`
    );

    if (!anodePath) errors.push(`No power path to LED (${led.id}) anode`);
    if (!cathodePath)
      errors.push(`LED (${led.id}) cathode not connected to ground`);
  }
}

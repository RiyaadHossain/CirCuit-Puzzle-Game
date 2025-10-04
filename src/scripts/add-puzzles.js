import { GameService } from "@/app/modules/game/game.services.ts";

const puzzles = [
  {
    puzzleId: "puzzle-001",
    title: "Light an LED with a Resistor",
    description:
      "Build a circuit to light an LED using a battery and a resistor. The resistor must be in series with the LED.",
    components: [
      {
        id: "battery1",
        type: "battery",
        minCount: 1,
        maxCount: 1,
        properties: {
          voltage: 5,
          terminal1: "positive",
          terminal2: "negative",
        },
      },
      {
        id: "led1",
        type: "led",
        minCount: 1,
        maxCount: 1,
        properties: {
          forwardVoltage: 2,
          terminal1: "anode",
          terminal2: "cathode",
        },
      },
      {
        id: "resistor1",
        type: "resistor",
        minCount: 1,
        maxCount: 1,
        properties: {
          ohm: 220,
          terminal1: "in",
          terminal2: "out",
        },
      },
      {
        id: "ground1",
        type: "ground",
        minCount: 1,
        maxCount: 1,
        properties: {
          terminal1: "gnd",
        },
      },
    ],
    difficulty: "easy",
    rules: { resistorValue: 220, maxComponents: 5 },
    hints: [
      "Ensure the resistor is in series with the LED.",
      "Check the polarity of the LED.",
      "Avoid direct connection from battery positive to ground.",
    ],
    userGuide: [
      "Connect battery positive to resistor, then to LED anode.",
      "Connect LED cathode to ground.",
    ],
  },
  {
    puzzleId: "puzzle-002",
    title: "Dual LED Challenge",
    description:
      "Light two LEDs using a single battery. Each LED must have its own resistor.",
    components: [
      {
        id: "battery1",
        type: "battery",
        minCount: 1,
        maxCount: 1,
        properties: {
          voltage: 5,
          terminal1: "positive",
          terminal2: "negative",
        },
      },
      {
        id: "led1",
        type: "led",
        minCount: 1,
        maxCount: 1,
        properties: {
          forwardVoltage: 2,
          terminal1: "anode",
          terminal2: "cathode",
        },
      },
      {
        id: "led2",
        type: "led",
        minCount: 1,
        maxCount: 1,
        properties: {
          forwardVoltage: 2,
          terminal1: "anode",
          terminal2: "cathode",
        },
      },
      {
        id: "resistor1",
        type: "resistor",
        minCount: 1,
        maxCount: 1,
        properties: {
          ohm: 220,
          terminal1: "in",
          terminal2: "out",
        },
      },
      {
        id: "resistor2",
        type: "resistor",
        minCount: 1,
        maxCount: 1,
        properties: {
          ohm: 220,
          terminal1: "in",
          terminal2: "out",
        },
      },
      {
        id: "ground1",
        type: "ground",
        minCount: 1,
        maxCount: 1,
        properties: {
          terminal1: "gnd",
        },
      },
    ],
    difficulty: "medium",
    rules: { resistorValue: 220, maxComponents: 8 },
    hints: [
      "Each LED should have its own resistor.",
      "Connect both LEDs in parallel.",
      "Avoid short circuits.",
    ],
    userGuide: [
      "Connect battery positive to both resistors.",
      "Each resistor connects to an LED anode.",
      "LED cathodes connect to ground.",
    ],
  },
  {
    puzzleId: "puzzle-003",
    title: "LED with Variable Resistor",
    description:
      "Light an LED using a battery and a variable resistor. The resistor value must be between 100 and 1k ohm.",
    components: [
      {
        id: "battery1",
        type: "battery",
        minCount: 1,
        maxCount: 1,
        properties: {
          voltage: 5,
          terminal1: "positive",
          terminal2: "negative",
        },
      },
      {
        id: "led1",
        type: "led",
        minCount: 1,
        maxCount: 1,
        properties: {
          forwardVoltage: 2,
          terminal1: "anode",
          terminal2: "cathode",
        },
      },
      {
        id: "resistor1",
        type: "resistor",
        minCount: 1,
        maxCount: 1,
        properties: {
          ohm: 500,
          terminal1: "in",
          terminal2: "out",
        },
      },
      {
        id: "ground1",
        type: "ground",
        minCount: 1,
        maxCount: 1,
        properties: {
          terminal1: "gnd",
        },
      },
    ],
    difficulty: "medium",
    rules: { resistorValue: 500, maxComponents: 6 },
    hints: [
      "Resistor value must be between 100 and 1000 ohm.",
      "Check the LED polarity.",
      "Avoid direct connection from battery positive to ground.",
    ],
    userGuide: [
      "Connect battery positive to resistor, then to LED anode.",
      "Connect LED cathode to ground.",
    ],
  },
  {
    puzzleId: "puzzle-004",
    title: "LED Parallel Circuit",
    description:
      "Light two LEDs in parallel, each with its own resistor, using a single battery.",
    components: [
      {
        id: "battery1",
        type: "battery",
        minCount: 1,
        maxCount: 1,
        properties: {
          voltage: 5,
          terminal1: "positive",
          terminal2: "negative",
        },
      },
      {
        id: "led1",
        type: "led",
        minCount: 1,
        maxCount: 1,
        properties: {
          forwardVoltage: 2,
          terminal1: "anode",
          terminal2: "cathode",
        },
      },
      {
        id: "led2",
        type: "led",
        minCount: 1,
        maxCount: 1,
        properties: {
          forwardVoltage: 2,
          terminal1: "anode",
          terminal2: "cathode",
        },
      },
      {
        id: "resistor1",
        type: "resistor",
        minCount: 1,
        maxCount: 1,
        properties: {
          ohm: 220,
          terminal1: "in",
          terminal2: "out",
        },
      },
      {
        id: "resistor2",
        type: "resistor",
        minCount: 1,
        maxCount: 1,
        properties: {
          ohm: 220,
          terminal1: "in",
          terminal2: "out",
        },
      },
      {
        id: "ground1",
        type: "ground",
        minCount: 1,
        maxCount: 1,
        properties: {
          terminal1: "gnd",
        },
      },
    ],
    difficulty: "hard",
    rules: { resistorValue: 220, maxComponents: 8 },
    hints: [
      "Both LEDs should be lit in parallel.",
      "Each LED must have a resistor.",
      "Avoid short circuits.",
    ],
    userGuide: [
      "Connect battery positive to both resistors.",
      "Each resistor connects to an LED anode.",
      "LED cathodes connect to ground.",
    ],
  },
];

async function main() {
  const res = await Promise.all(
    puzzles.map(async (puzzle) => {
      return await GameService.addPuzzle(puzzle);
    })
  ); 
  console.log(res);
}

// main().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
 
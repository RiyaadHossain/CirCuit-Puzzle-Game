import { COMPONENT_TYPE } from "@/enums/game.enums";
import { CircuitSubmission } from "../game.interface";

export function puzzleSpecificRules(
  submission: CircuitSubmission,
  puzzle: any,
  errors: string[]
) {
  if (puzzle.rules?.resistorValue) {
    const resistors = submission.components.filter(
      (c) => c.type === COMPONENT_TYPE.RESISTOR
    );
    const validRes = resistors.some(
      (r) => r.properties.ohm === puzzle.rules.resistorValue
    );
    if (!validRes)
      errors.push(`Resistor must be ${puzzle.rules.resistorValue}Ω`);
  }

  if (puzzle.rules?.mustHaveSeries?.length) {
    for (let seq of puzzle.rules.mustHaveSeries) {
      let sequenceFound = seq.every((type: any) =>
        submission.components.find((c) => c.type === type)
      );
      if (!sequenceFound)
        errors.push(`Series sequence not satisfied: ${seq.join(" → ")}`);
    }
  }

  if (puzzle?.rules?.mustHaveParallel?.length) {
    for (let parallelGroup of puzzle.rules.mustHaveParallel) {
      const anodes = submission.connections.filter((c) =>
        parallelGroup.some((t: any) => c.to.includes(t))
      );
      if (anodes.length < parallelGroup.length)
        errors.push(
          `Parallel requirement not satisfied: ${parallelGroup.join(" || ")}`
        );
    }
  }
}



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
}



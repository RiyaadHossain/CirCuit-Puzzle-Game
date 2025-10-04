import { CircuitSubmission } from "../game.interface";

export function validateComponentCounts(
  submission: CircuitSubmission,
  puzzle: any,
  errors: string[]
) {

  // Count components
  const compCount: Record<string, number> = {};
  submission.components.forEach((c) => {
    compCount[c.type] = (compCount[c.type] || 0) + 1;
  });

  // Validate against puzzle requirements
  puzzle.components.forEach((comp: any) => {
    const count = compCount[comp.type] || 0;
    if (count < comp.minCount)
      errors.push(
        `Missing component: ${comp.type}. Need at least ${comp.minCount}`
      );
    if (comp.maxCount && count > comp.maxCount)
      errors.push(
        `Too many components: ${comp.type}. Need at most ${comp.maxCount}`
      );
  });

  // Global max components
  const maxComponents = puzzle.rules?.maxComponents || 5;
  if (submission.components.length > maxComponents)
    errors.push(`Exceeded max component limit: ${puzzle.rules.maxComponents}`);
}

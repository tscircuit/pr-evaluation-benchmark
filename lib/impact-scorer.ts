import { createScorer } from "evalite"

const impactScore = {
  Tiny: 1,
  Minor: 2,
  Major: 3,
}

function calculateScore(
  expected: keyof typeof impactScore,
  actual: keyof typeof impactScore,
): number {
  const maxDifference =
    Math.max(...Object.values(impactScore)) -
    Math.min(...Object.values(impactScore))
  const actualDifference = Math.abs(impactScore[expected] - impactScore[actual])

  return (maxDifference - actualDifference) / maxDifference
}

export const ImpactScorer = createScorer<
  {
    prompt: string
    expected: string
  },
  {
    response: string
    impact: string
  }
>({
  name: "circuit_scorer",
  description: "Evaluates circuit code for presence of key components",
  scorer: ({ input, output }) => {
    if (!output.impact) {
      return { score: 0 }
    }

    return {
      score: calculateScore(
        input.expected as keyof typeof impactScore,
        output.impact as keyof typeof impactScore,
      ),
      // metadata:
    }
  },
})

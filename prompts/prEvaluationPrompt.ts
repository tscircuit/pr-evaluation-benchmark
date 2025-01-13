import filterDiff from "lib/filterDiff"

export const prEvaluationPrompt = ({
  title,
  body,
  diff,
}: {
  title: string
  body: string
  diff: string
}) => {
  const reducedDiff = filterDiff(diff)

  const prompt = `Analyze the following pull request and provide a one-line description of the change. Also, classify the impact as "Major", "Minor", or "Tiny".

Major Impact: Introduces a huge feature, fixes a critical or difficult bug. Generally difficult to implement.
Minor Impact: Bug fixes, simple feature additions, small improvements. Typically more than 100 lines of code changes. Adding a new symbol.
Tiny Impact: Minor documentation changes, typo fixes, small cosmetic fixes, updates to dependencies.

Title: ${title}
Body: ${body}
Diff:
${reducedDiff.slice(0, 8000)}

Response format:
Description: [One-line description]
Impact: [Major/Minor/Tiny]`
  return prompt
}

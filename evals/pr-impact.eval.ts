import fs from "node:fs"
import path from "node:path"
import toml from "toml"
import { evalite } from "evalite"
import { prEvaluationPrompt } from "prompts/prEvaluationPrompt"
import { anthropic } from "lib/anthropic"
import { ImpactScorer } from "lib/impact-scorer"

interface Problem {
  title: string
  body: string
  diff: string
  expected_impact: string
}

const loadPrExamples = (filePath: string): Problem[] => {
  const tomlContent = fs.readFileSync(filePath, "utf-8")
  const parsedToml = toml.parse(tomlContent)

  return parsedToml.test_cases.map((example: any) => ({
    title: example.title,
    body: example.body,
    diff: example.diff,
    expected_impact: example.expected_impact,
  }))
}

const runAI = async (prompt: string): Promise<string> => {
  const completion = await anthropic.messages.create({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 1024,
    system:
      "You are an expert in electronic circuit design and tscircuit, and you work as a github reviewer for tscircuit.",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  })

  return (completion as any).content[0]?.text || ""
}

evalite("PR Reviewer", {
  data: () => {
    const examples = loadPrExamples(
      path.join(__dirname, "../examples/PR-examples.toml"),
    )

    return examples.map((problem) => ({
      input: {
        prompt: prEvaluationPrompt({
          title: problem.title,
          body: problem.body,
          diff: problem.diff,
        }),
        expected: problem.expected_impact,
      },
    }))
  },
  task: async (input) => {
    const aiResponse = await runAI(input.prompt)
    console.log(aiResponse)
    const match = aiResponse.match(/Impact:\s*(.+)/)

    if (match?.[1]) {
      const impact = match[1].trim()
      return { impact, response: aiResponse }
    }
    return { impact: "", response: aiResponse }
  },
  experimental_customColumns: async (result) => {
    return [
      { label: "Prompt", value: result.input.prompt },
      { label: "Response", value: result.output.response },
      { label: "Result", value: result.output.impact },
      { label: "Expected", value: result.input.expected },
    ]
  },
  scorers: [ImpactScorer],
})

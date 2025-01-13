# PR Evaluation Benchmark

A benchmark suite for evaluating AI models on Pull Request impact assessment.

[![Type Check](https://github.com/tscircuit/pr-evaluation-benchmark/actions/workflows/bun-typecheck.yml/badge.svg)](https://github.com/tscircuit/pr-evaluation-benchmark/actions/workflows/bun-typecheck.yml)
[![NPM version](https://img.shields.io/npm/v/@tscircuit/pr-evaluation-benchmark.svg)](https://www.npmjs.com/package/@tscircuit/pr-evaluation-benchmark)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This repository contains a collection of real-world Pull Request examples used to benchmark AI models' ability to assess PR impact and complexity. The benchmark focuses on categorizing PRs into three impact levels:

- **Major**: Large features, critical bug fixes, architectural changes
- **Minor**: Simple features, non-critical bug fixes, moderate improvements
- **Tiny**: Documentation updates, typo fixes, minor tweaks

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Anthropic API key (for Claude integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/tscircuit/pr-evaluation-benchmark.git

# Install dependencies
bun install

# Create .env file and add your Anthropic API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env
```

### Running Evaluations

```bash
# Run all evaluations
bun run eval

# Run evaluations in watch mode
bun run eval:watch
```

## Project Structure

- `examples/`: Contains TOML files with PR test cases
- `evals/`: Evaluation scripts and configurations
- `lib/`: Utility functions and scoring logic
- `prompts/`: AI prompt templates

## Adding New Test Cases

Test cases are defined in `examples/PR-examples.toml` using the following format:

```toml
[[test_cases]]
title = "PR Title"
body = "PR Description"
diff = '''git diff content'''
expected_impact = "Major|Minor|Tiny"
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [Documentation](https://docs.tscircuit.com)
- [Website](https://tscircuit.com)
- [Twitter](https://x.com/tscircuit)
- [Discord](https://tscircuit.com/community/join-redirect)

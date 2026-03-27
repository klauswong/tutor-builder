# Tutor Builder

A meta-agent that builds personalized AI tutors using Claude Code. You describe what you want to learn, it interviews you, benchmarks against real-world programs, and generates a self-contained tutor directory — ready to use.

## Quick Start

1. Clone and open Claude Code:

   ```bash
   git clone https://github.com/klauswong/tutor-builder.git
   cd tutor-builder && claude
   ```

2. Tell it what you want to learn:

   ```
   I want to learn [topic]. I'm a [role] and I [context about your daily work].
   My goal is [what competence looks like for you].
   ```

3. The builder interviews you, designs a curriculum, and generates a new directory with two files:
   - **`CLAUDE.md`** — Turns Claude Code into a tutor calibrated to you
   - **`curriculum.md`** — Full learning path with exercises, assessments, and progress tracking

4. Open Claude Code in the new directory and start learning:
   ```bash
   cd ../my-topic-tutor && claude
   ```

## What the Builder Does

```
Learner Interview  →  understand who you are, what you know, what you need
Curriculum Design  →  map the topic, benchmark against real programs (university, cert, textbook)
Assessment Planning  →  exercises, quizzes, exams, capstones — matched to subject type
Output Generation  →  new directory with CLAUDE.md + curriculum.md
```

Every tutor is personalized: depth, learning style, communication style, tools, and examples are all grounded in your context. The full build process is defined in `CLAUDE.md`.

## File Structure

```
tutor-builder/
├── CLAUDE.md                          # The builder agent's instructions
├── templates/
│   ├── tutor-claude.md                # Template for generated CLAUDE.md
│   └── curriculum.md                  # Template for generated curriculum
└── examples/
    └── vegetarian-nutrition-tutor/    # A complete, working tutor
        ├── CLAUDE.md
        └── curriculum.md
```

## Example

`examples/vegetarian-nutrition-tutor/` is a real tutor built by running the full process. You can `cd` into it and start learning now.

- 3 phases, 13 modules
- Benchmarked against 8 sources (Stanford, Precision Nutrition, NASM, Wageningen, Harvard, USDA guidelines, Davis & Melina, Examine.com)
- 40+ exercises, 4 quizzes, 1 exam, 2 capstones, 2 mini-projects

## Credits

Pedagogical patterns inspired by [Mr. Ranedeer](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor).

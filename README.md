# Tutor Builder

**Turn what you want to learn into a complete, interactive course you can open from disk.**

Tutor Builder guides an AI coding agent through understanding your goals, researching the subject, designing a curriculum, and building a personalized tutor. The result is a standalone HTML course with visual explanations, narration, and practice—plus instructions for a tutor you can chat with when you need help.

This repository contains the builder instructions, authoring guides, and a small interactive example. Each generated course is tailored to its learner and subject.

## What learning looks like

- **Watch an idea take shape.** Subject-specific SVG graphics and synchronized animation explain quantities, mechanisms, and relationships.
- **Control the pace.** A compact bottom player offers Play/Pause, speed, captions, section jumps, and a segmented timeline with slide thumbnails while hovering or scrubbing.
- **Find your place.** Step through slides with arrow keys, preview a slide, or move to the previous or next lesson.
- **Try before being told.** Quick prediction questions pause narration for your guess. Exploration tasks wait for you to manipulate the model and explicitly continue.
- **Practice in different ways.** Flip flashcards, retry quizzes with explanatory feedback, and take written tests with equivalent scenarios and explicit rubrics.
- **Bring your work to a tutor.** Copy a written attempt, its questions, and rubric for provisional agent grading, or export a backup.

The course is the main learning path. Chat is available for questions, adaptation, and written feedback; you do not need to ask an agent for each next lesson.

## Quick start

Use an AI coding agent with web research and local file access. For Claude Code:

```bash
git clone https://github.com/klauswong/tutor-builder.git
cd tutor-builder
claude
```

Tell the builder what you want to learn:

```text
I want to learn nutrition. I'm a beginner who cooks at home and wants
to understand food labels and plan balanced meals.

Build a complete offline course with narrated visual lessons,
flashcards, quizzes, and written tests. Save it to ~/Downloads/nutrition-tutor.
```

For another coding agent, ask it to read [CLAUDE.md](CLAUDE.md) and follow the builder workflow.

The builder clarifies your goals and preferences, benchmarks the curriculum against relevant sources, and confirms the scope before creating your course. Generation needs the agent's research and authoring tools; narration also needs available speech-generation tooling. The generated HTML embeds its assets and runs without a server or network connection.

Open the generated `course.html` in Chrome or Edge. To use the optional chat tutor, open the generated directory in your coding agent and read its `CLAUDE.md`.

## What you get

```text
my-topic-tutor/
├── course.html       # Complete offline course, including assets and practice
├── curriculum.md     # Learning path, sources, exercises, and progress log
├── CLAUDE.md         # Tutor instructions calibrated to the learner
├── assessments/      # Question banks and marking rubrics
└── lessons/          # Optional standalone lesson exports
```

Browser drafts, where implemented, stay local to that course file and browser. Export work you want to keep. Written marking in HTML uses rubrics and self-assessment; agent grading happens in chat and is provisional. No API keys belong in a course file.

## How the builder works

| Step | Result |
| --- | --- |
| Understand the learner | Goals, starting level, context, tools, and access needs |
| Research and benchmark | A sourced curriculum with gaps and assumptions identified |
| Design the teaching | Objectives, misconceptions, visual models, and active tasks |
| Build the whole course | All approved lessons and assessments in one offline HTML file |
| Verify | Independent calculations, assessment checks, and browser review by another agent |

**Consistent controls, creative teaching.** Playback and accessibility follow a common contract; lesson scenes start from the subject. A digestion lesson can trace a spatial route, while a portion lesson can transform quantities. The instructions call for meaningful, seekable motion with reduced-motion and silent inspection paths.

Questions must include the facts needed to answer them on their own screen. Answers stay hidden until the learner responds; preview thumbnails must not spoil them. Generated lessons still need content and browser review before delivery.

## Explore the repository

| File | Purpose |
| --- | --- |
| [CLAUDE.md](CLAUDE.md) | Complete builder workflow |
| [Visual learning guide](docs/visual-learning.md) | Models, interaction, assessments, and source verification |
| [Guided playback guide](docs/guided-playback.md) | Pacing, player controls, thumbnails, accessibility, and review |
| [Tutor instructions](templates/tutor-claude.md) | Starting point for the generated chat tutor |
| [Curriculum outline](templates/curriculum.md) | Starting point for the generated learning path |
| [Interactive example](templates/interactive-lesson.html) | Offline compound-interest model, flashcards, quiz, and written test |
| [Assessment bank](templates/assessment-bank.json) | Example of objective-linked questions and rubrics |
| [Vegetarian nutrition example](examples/vegetarian-nutrition-tutor/) | An earlier curriculum and chat-tutor example |

The interactive example demonstrates models and practice controls. It uses 12 written scenarios and keeps responses in memory until exported. It is a reference for individual interactions; new courses get their own scene design and player.

The vegetarian nutrition example contains the curriculum and tutor instructions. Open it in your coding agent to try the conversational tutor.

## Check the reference example

With Node.js installed:

```bash
node scripts/check-template.mjs
```

These dependency-free checks exercise the shipped example's calculations, flashcards, quiz feedback, written variants and rubrics, submission behavior, and clipboard fallbacks. They validate the reference example; generated courses require their own checks and independent browser review.

Learning assets and learner attempts stay local unless you explicitly ask to publish them. Generated tutors are written to Downloads, or a path you choose, and are not automatically committed to this repository.

## Credits and license

Pedagogical patterns inspired by [Mr. Ranedeer](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor). The segmented narration player draws on the narrated-explainer skill; subject animation follows the available animation tools and authoring guidance.

[MIT license](LICENSE).

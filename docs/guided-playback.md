# Guided playback requirements

Author every lesson from scratch. These are learner outcomes, not a page template. Do not clone an earlier lesson, reuse its visual CSS, or patch a new topic into its scenes. Reuse verified models, question banks and measured narration where appropriate.

## Design before code

Write a subject storyboard: learner objective, misconception, visual model, narrative beats, active task and motion proof. Pick a visual language and scene geometry suited to the concept. Different chapters can use different compositions. Avoid making every lesson a card dashboard or a narrated document.

## Interface hierarchy

Design the player as one coherent interface rather than adding a button row per feature. Give Play the strongest emphasis; group slide steps with playback, keep speed directly available, and distinguish course lesson navigation from section jumps. Show the current section and slide position. Prefer an on-demand section picker when a tab strip would crowd the phone player. Give seeking adequate width instead of squeezing it between buttons. Keep titles, diagrams, explanations and captions visually connected.

Use consistent button shapes, semantic colours, visible focus and readable contrast. Aim for 44px touch controls with space between adjacent targets; preserve the teaching canvas and one-viewport playback. Put storage details after the activity. Keep flashcard reveal and recall actions convenient. These are usability outcomes, not prescribed colours, fonts or scene layouts. Have an independent learner critique phone and desktop views before delivery.

## Required behavior

- Keep the active concept, captions and compact bottom player in one viewport on ordinary phone and desktop sizes. Use `100dvh` with a fallback and safe-area padding.
- Keep Play/Pause, seek, playback speed and previous/next slide controls directly visible. Named chapter jumps remain available separately. Menus start closed; longer notes and practice can scroll in a separate pane or dialog.
- Use a YouTube-style segmented seek bar: section widths and boundaries follow actual narration time, including title-card pauses. Fill each segment as playback advances. Hover, touch scrubbing and keyboard focus expose a recognizable slide thumbnail, section name and timestamp. Preview the corresponding section title during intro pauses. For quizzes show only a neutral question/prompt preview, never the answer, computed result or answer-bearing graphic, even after submission. Previewing must not seek or alter the live lesson; cache thumbnails per lesson and isolate cloned SVG IDs. Keep the tooltip inside the viewport and retain an accessible range control. Arrow keys on the focused timeline seek; arrows elsewhere continue to navigate slides.
- Begin each chapter with a brief topic title/subtitle card and about two seconds of silence at normal speed. The learner can pause to read longer. Include the card in the media timeline so seeking and speed changes reproduce it; chapter jumps land on the card.
- Offer a slide preview picker with titles and representative static graphics. Conceal answers in question previews. Left/Right arrows navigate slides when the learner is outside inputs, interactive graphics and dialogs; preserve native keyboard behavior inside those controls. Selecting a slide pauses on it; Play resumes narration. Label slides, chapters and course lessons distinctly.
- Default to a complete offline course for the approved curriculum; every lesson, explanation, example and assessment must be usable without chat. Chat helps with questions or grading when requested. Single-lesson generation is an optional mode.
- In a combined course, keep Previous/Next lesson directly available during playback, separate from slide steps and within-lesson sections. Save current work and position, preserve settings and open the destination paused. Disable Previous at the first lesson; on the final lesson offer the course overview. Standalone lessons do not need these shortcuts.
- Embed real narration and measured sentence captions. Audio starts only after learner action. Include a transcript and a silent inspection path.
- Pause for an untimed prediction before revealing the answer. Show feedback, retry, Continue and Skip. Questions conceal answer-bearing visuals.
- Make every question answerable from its own screen. Keep the needed source facts, labels, units, comparison basis, portion/package sizes and assumptions visible beside the prompt. Hide the computed answer and worked solution, not the givens. Prerequisite concepts may be assumed; example-specific data may not. Do not require remembering numbers or labels from a previous slide unless recall itself is the stated learning objective. Keep the givens available during feedback and retry.
- When asking the learner to adjust, inspect, compare or explore, stop narration at the invitation and expose the relevant interaction. Wait for explicit Continue; closing a model, changing a slider or finishing a decorative animation must not resume speech. Seeking elsewhere may leave the task. Do not impose a countdown on exploration.
- Allow keyboard use and inspection of specific graphic elements. Inspection pauses narration; resume restores the narration state.
- Keep content accessible at zoom and in small landscape windows. Use contained scrolling rather than clipping or shrinking essential text.

## Choreography

Remotion-like means coordinated visual reasoning with meaningful intermediate states. A portion expands, energy contributions assemble, or labelled quantities convert to an equal basis. A generic entrance effect is insufficient.

Name the subject, initial pose, intermediate proof and settled pose. Bind every pose directly to narration time. Seeking, chapter changes and playback speed must reproduce the same picture. Reduced motion and manual inspection settle the graphic without removing information. Do not interpolate numbers in a way that invents false quantities or loses units.

Use relevant installed animation skills when they improve the explanation. OpenMontage’s animation editing guidance is useful for meaningful transformations, primary-then-secondary reveals, a small consistent transition vocabulary and hold time after results. Read the applicable guidance; keep the teaching geometry specific to the subject. A skill name or decorative entrance alone does not satisfy the animation requirement. Keep interactive lessons offline and seekable; exporting a video or installing the full production pipeline is a separate request.

## Verification

Have an independent browser reviewer act as a learner and criticize the experience. Check every guided beat, caption and question feedback at 320 × 568, 390 × 844 and a desktop viewport; check text zoom and narrow landscape reflow. Verify actual playback at 1× and 2×, question holds, seeking, chapter jumps, captions, inspection, reduced motion, dialog focus and practice. Capture early, intermediate and settled motion proof; seek away and back. Relay unresolved criticism.

Check title-card silence, pause/resume during the card, slide preview and arrow navigation, input keyboard exceptions, exploration holds and explicit continuation. Preserve the selected playback rate across lesson changes. Rapid seek/chapter input during audio loading must override an older restored position. Test both ordinary playback and learner-controlled stops.

Review each question in isolation: jump directly to it without watching earlier slides and ask the reviewer to solve it using only visible information. Independently calculate numerical answers from the displayed givens. Check the prompt, source facts, choices and feedback together on a phone; a syntactically valid answer key does not prove a question has enough context.

Forms/settings standards: meet labelled inputs, specific missing-answer feedback, guarded replacement of written work, copy/export and manual clipboard fallback. Disclose whether responses are session-only or saved in browser storage. Session-only examples warn before departure; complete courses preserve drafts and offer export backups. Decline server drafts and analytics for standalone offline lessons. Playback preferences are per-session, immediately applied, reversible and owned by the lesson; no shared configuration or administrative audit service.

Interface audit (2026-10-02): settings-and-preferences standard read. Retain demand-driven, per-session playback preferences with immediate reversible changes and declared defaults. No settings were retired or added. Decline administrative layering, policy locks and shared audits for a standalone local learner file. The redesign retains existing practice validation, draft protection and clipboard fallback.

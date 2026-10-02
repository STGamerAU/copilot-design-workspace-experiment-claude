# Copilot Instructions

This repository is a product-design experiment.

## Source hierarchy

Treat files in `/project` as the canonical project context.

Maintain a clear distinction between:

1. Evidence
   Facts supported by the project source material.

2. Assumptions
   Things that may be reasonable but are not established.

3. Proposals
   Options generated for human consideration.

4. Human decisions
   Decisions explicitly approved by the human designer and recorded in `project/decisions.md`.

Do not present assumptions or proposals as established facts.

## Human decision boundary

Copilot may:

- analyse
- identify questions
- propose alternatives
- critique
- plan
- implement approved work

Copilot should not silently make consequential product or UX decisions.

When an important decision is unresolved, surface it.

## Project state

Before substantial work:

- read the relevant files in `/project`
- respect existing human decisions
- identify material conflicts or missing information

Do not overwrite approved decisions without explicit human instruction.

## Scope

This is a prototype experiment, not production software.

Do not invent:

- user research
- analytics
- business rules
- legal requirements
- production integrations

unless they are supplied as project context.

## Changes to project knowledge

Do not automatically turn Copilot-generated proposals into project facts or human decisions.

Clearly identify proposed updates before changing canonical project knowledge.
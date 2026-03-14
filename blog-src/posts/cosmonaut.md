---
title: 'Introducing Cosmonaut: Interactive Fiction, Reimagined'
date: 2026-03-14
description: "Today I'm launching Cosmonaut into open beta - an interactive fiction platform powered by generative AI where every story is unique, every world is dynamic, and every choice actually matters."
tags: ['technology', 'ai', 'cosmonaut']
image: '/blog/assets/cosmonaut.webp'
draft: false
---

Today I'm launching Cosmonaut into open beta. If you're reading this, you're invited.

[Cosmonaut](https://cosmonaut-ai.com) is an interactive fiction platform that lets you create and explore custom stories, making choices along the way that shape the world and influence the outcome. Think choose-your-own-adventure, but powered by generative AI so that every story is unique, every world is dynamic, and every choice actually matters.

I've been building this for a while now, and getting it into people's hands feels like a milestone worth writing about; not just to announce the beta, but to share some of the thinking and technical decisions behind it.

## The Problem with Interactive Fiction

Interactive fiction has been around for decades, but it's always been constrained by the same fundamental bottleneck: someone has to write every branch. This means that most interactive stories are either shallow (a handful of meaningfully different paths) or enormous undertakings that still can't account for the things a reader actually wants to do. The genre has always promised agency, but the reality has been more like a guided tour with a few forks in the road.

Generative AI changes this equation entirely. Instead of pre-authoring every possible branch, Cosmonaut uses large language models to generate narrative in real time - responding to your choices, maintaining world consistency, and advancing the story in a way that feels authored rather than improvised.

## Under the Hood

The core of the platform runs on a FastAPI backend backed by DynamoDB, with LLM inference handled through Vertex AI. I spent a lot of time evaluating models at various price points for storytelling quality - the goal was to find the sweet spot where narrative coherence, creativity, and response time all felt right.

Getting a model to tell a good story is one thing; getting it to tell a _consistent_ story across dozens of branching decisions is a much harder problem. If a character loses an arm in chapter two, the model needs to know that in chapter five - even if the reader took a completely different path to get there. Pure context windows don't scale for this, especially when stories branch wide.

The solution I landed on is a fact extraction system built around two types of facts: **world facts** and **branch facts**. World facts are immutable truths about the story's universe - its rules, its history, its characters as they were established at creation. Branch facts represent things that have become true as a result of the reader's choices: alliances formed, items lost, consequences set in motion.

After each story node is generated, an asynchronous pipeline (SQS triggering a separate AI call) extracts both types of facts and stores them in a vector database. Before generating the next node, the system queries that database to retrieve the most relevant context for wherever the reader currently is in the story. The result is a narrative that actually remembers what happened - not because the entire story lives in a single prompt, but because the world state is reconstructed intelligently at each step.

It's not a solved problem. There are still edge cases where facts conflict or the model drifts, and I'm actively iterating on retrieval quality and extraction prompts. But it's a system that meaningfully improves coherence over naive generation, and it's one of the things I'm most proud of technically.

On the frontend, the app is a Svelte 5 SPA using TanStack Query for state management. I wanted the reading experience to feel seamless - no page reloads, no awkward loading states between story beats. The interface should disappear and let the story take over.

One of the features I'm most excited about is AI-generated audio narration, powered by ElevenLabs. Every story can be listened to, not just read, which opens up some interesting possibilities - bedtime stories with your kids, for instance, or a more immersive solo experience. The narration is generated dynamically alongside the story content, so it works regardless of what path you take.

## Why Build This

I've always been drawn to the intersection of technology and storytelling. Interactive fiction sits in this interesting space where the technical challenge (how do you build a system that generates coherent, branching narratives?) is inseparable from the creative one (how do you make those narratives actually _good_?). That tension is what makes it compelling to work on.

There's also something I find genuinely exciting about making storytelling more accessible. Not everyone writes, but everyone has stories they want to explore - worlds they'd love to step into and shape. Cosmonaut is an attempt to lower that barrier, to let anyone become both the reader and the author.

## What's Next

This is an open beta, which means it's not perfect. There are rough edges, and I expect to learn a lot from how people actually use the platform. If you try it out, I'd genuinely love to hear what works, what doesn't, and what you wish it could do. You can reach me through the in-app feedback form or at support@cosmonaut-ai.com.

Go explore: [cosmonaut-ai.com](https://cosmonaut-ai.com)

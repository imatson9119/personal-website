---
title: "What I'm doing with OpenClaw"
date: 2026-04-20
description: "A few months of tinkering with OpenClaw, the three use cases that have actually stuck, and an honest take on what it is and isn't good for right now."
tags: ['technology', 'ai', 'openclaw']
image: '/blog/assets/openclaw.webp'
draft: true
---

When OpenClaw first released, like many of you, I was quick to throw it on a spare computer and try it out. It seemed like it had a great deal of potential to change the way I lived - people were constantly posting use-cases and ways it was "revolutionizing" their lives.

A few months later, my view is more mixed. Most of what I set out to do with OpenClaw hasn't panned out, and I think a lot of what gets posted online is still more hype than substance. But three use cases have stuck, and taken together they've ended up worth the time I've spent on setup. Here's what they are and what I've actually learned.

# How I'm using OpenClaw
My setup is a fairly involved local stack — OpenClaw on Ubuntu with Gemini 3.1 Pro via Vertex, Qdrant running in Docker for persistent memory, a custom FastMCP bridge so agents can read and write from it, and 1Password for credential management. I mention this not to brag but to set expectations: the things below took real time to get working, and a lighter-weight setup will probably get you lighter-weight results.


### Personal Assistant
This one's the most obvious use case, and it's provided a modest but real amount of value.
I have a dedicated agent with read access to my primary calendar and a separate Gmail inbox. The more interesting piece is that it's also wired up to a Qdrant collection I've been slowly populating with context about my life: people I care about, projects I'm working on, goals, interests, recurring situations. Before my agent assembles my morning briefing, it pulls my calendar, pulls relevant entries from the vector DB based on who and what's on my schedule, and then searches the web for anything timely that might actually matter to my day.

The vector memory is what makes this work. Without it, you get a generic summary of your calendar plus whatever made the news - something any RSS reader could do. With it, you get a brief that knows the person you're meeting at 3pm is the same person who mentioned a job change two months ago, and maybe you should ask about that. It's the difference between an assistant and a search engine with a calendar plugin.

The scheduling side uses the Gmail inbox: when I need to book something, I forward the email or a screenshot, and the agent handles the back-and-forth and populates the event description with any context it pulled along the way.

Net-net, this is roughly break-even on time spent vs. time saved, but the quality of my mornings has gone up in a way that's hard to quantify.


### Lead Generator
I recently launched an interactive fiction platform called [Cosmonaut AI](https://cosmonaut-ai.com). Rather than immediately spend on ads, I wanted to get a better read on product-market fit by having OpenClaw surface targeted leads for me to follow up on.

Each morning, the agent runs a batch of site-scoped and topical searches - things like `site:reddit.com interactive fiction parent` - and returns a list of threads worth commenting on or people worth reaching out to. I still do the posting manually, which I think is actually the right call at this stage; the feedback loop of writing each reply yourself is where most of the product learning happens. But the sourcing is completely hands-off, and it's easily the highest-leverage workflow I have running.

The obvious next step is to have the agent close the loop and write replies itself. I've resisted this because I don't think the content would be good enough yet to be worth the risk to the brand, but the workflow generalizes cleanly to any domain where you're trying to find in-context conversations to join.


### Fitness / Health Coach
This might be my favorite one. I have an OpenClaw agent set up as a personal swim coach. Before I head to the pool, it generates a set for me based on what I've been doing recently and what I'm trying to work on. When I'm done, it pulls the activity data back from Garmin, gauges how hard the workout actually was relative to what it prescribed, and adjusts my baseline accordingly.

On a longer horizon, it tracks HRV and resting heart rate over time and nudges me toward habits that seem to correlate with better numbers. It's not a substitute for a real coach, but it closes a feedback loop I was never going to close on my own.

# My Takeaways
OpenClaw has a lot of rough edges. Almost nothing works on the first try, a meaningful portion of what I've tried has either gone nowhere or been too unreliable to depend on, and running it all isn't free -  I'm comfortably over $10/month for the use cases above.

That said, I'm cautiously bullish. The three workflows I've described have each returned more than they cost me, and I think that's only possible because I stuck with it long enough to figure out where the real leverage was. There's a pattern that's shown up in all of this that may be a useful heuristic for where to apply OpenClaw: the workflows that stuck aren't the ones automating something I was already doing, doing something I wouldn't have had the time/desire to do in the first place, like curate a morning brief, trawl Reddit for leads, design a swim set tuned to my last two weeks of data.

If you're thinking about trying it, my advice is to give it a real day and to go in expecting most of what you try to fail. The things that do work will probably not be the things you expected going in, and that's fine. It's getting better quickly, and it's worth keeping an eye on even if today isn't your day to dive in.
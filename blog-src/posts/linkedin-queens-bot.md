---
title: 'Creating a LinkedIn Queens Bot'
date: 2025-06-03
description: 'Could LinkedIn be using Queens as a passive recruiting metric? Better to be safe than sorry I suppose...'
tags: ['technology', 'linkedin']
image: '/blog/assets/linkedin-bot.jpeg'
imageCaption: 'Results from one run of the bot'
draft: false
---

## Why I built a bot to solve LinkedIn's Queens puzzle:

LinkedIn recently introduced a series of puzzle games, one of which is Queens - a nice take on the classic N-Queens problem. They’re genuinely enjoyable and a clever way to engage users in a non-traditional format.

But what stood out to me was how algorithmic and cognitively focused the game design was. That alone wouldn’t raise an eyebrow - platforms like the NYT have leaned into this for years. But given that LinkedIn’s largest revenue gains in 2024 came from its Talent Solutions line of business, it merits a little more consideration.

Could games like this eventually serve as passive signals for recruiters? Metrics like average solve time or persistence could, in theory, be interpreted as proxies for reasoning ability - especially if users don’t realize they’re being evaluated.

So, just for fun (and maybe to hedge my bets), I built a bot.

It logs in using a saved session, skips the tutorial, solves the puzzle using backtracking, and can move the mouse in a way that looks (relatively) human. It even takes a screenshot for the curious.

In all seriousness, it's likely neither practical nor in LinkedIn’s best interest to use these games as a recruiting metric. Doing so would require anti-cheating mechanisms, personalized puzzles, and some difficult questions about fairness and relevance. So while I had fun making this bot, I doubt it will get me anywhere other than your LinkedIn feed.

Check out the repo here: [https://github.com/imatson9119/linkedin-queens-bot](https://github.com/imatson9119/linkedin-queens-bot), or maybe use it yourself!

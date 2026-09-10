---
title: "Staying attached to code you didn't write"
description: "Plan, teachback, ADR - three deliberate moves that stop an agentic workflow from quietly detaching you from your own architecture."
published: true
pubDate: 2026-09-10
topics:
  - Agentic Software Engineering
  - AI-Native Engineering
  - Software Architecture
---

About six months into working with coding agents full time, I noticed something I didn't like.

The features shipped. Tickets closed at a rate I couldn't have matched by hand. But when a colleague asked me why a module was structured the way it was, I couldn't answer without opening the file. On code I had approved. Sometimes on code I had approved that week.

That is a different failure from "the AI wrote bad code." The code was fine. What was missing was me.

## Why it happens

When you write code yourself, you learn it through recall. You hold the problem in your head, construct a solution, hit the constraints, back out, try again. The dead ends are the part that sticks. By the time it works you know the shape of the thing and every place you almost went wrong.

When an agent writes it, you learn it through recognition. A diff appears, you read it, it looks right, you approve. Recognition feels like understanding in the moment and encodes almost nothing.

<figure class="diagram">
<div class="fig-canvas">
<svg id="fig-recall" viewBox="0 0 1400 520" role="img" aria-labelledby="fig-recall-t fig-recall-d">
<title id="fig-recall-t">Two ways to learn a codebase</title>
<desc id="fig-recall-d">Two horizontal tracks compared. The recognition track is a thin straight line through ticket, agent writes it, you read the diff, approve, ending in a retention meter with one of six cells filled. The recall track is a thick line through ticket, you weigh three options, you hit constraints, you decide, with backtrack arcs marked dead end and rethink, ending in a meter with five of six cells filled.</desc>
<style>
  #fig-recall text { font-family: var(--font-sans); fill: var(--ink); }
  #fig-recall .h1 { font-size: 27px; font-weight: 600; }
  #fig-recall .sub { font-size: 15px; fill: var(--muted); }
  #fig-recall .lane { font-size: 17px; font-weight: 600; }
  #fig-recall .laneb { font-size: 13px; fill: var(--muted); }
  #fig-recall .node { font-size: 14px; text-anchor: middle; }
  #fig-recall .note { font-size: 13px; fill: var(--muted); }
  #fig-recall .cap { font-size: 15px; }
  #fig-recall .arcl { font-size: 12px; fill: var(--accent); text-anchor: middle; }
  #fig-recall .mtr { font-size: 13px; font-weight: 600; text-anchor: middle; }
  #fig-recall .mhd { font-size: 13px; fill: var(--muted); text-anchor: middle; }
  #fig-recall .lineA { stroke: var(--faint); stroke-width: 1.5; fill: none; }
  #fig-recall .lineB { stroke: var(--accent); stroke-width: 4; fill: none; }
  #fig-recall .arc { stroke: var(--accent); stroke-width: 1.5; fill: none; }
  #fig-recall .rule { stroke: var(--fig-line); stroke-width: 1; }
  /* fill must ride a class: a presentation attribute loses to the text rule */
  #fig-recall .dim { fill: var(--muted); }
  #fig-recall .hot { fill: var(--accent); }
</style>
<text class="h1" x="70" y="60">Two ways to learn a codebase</text>
<text class="sub" x="70" y="90">Same feature ships either way. The difference is how much of it stays in your head.</text>
<text class="mhd" x="1184" y="120">what you retain</text>
<text class="lane" x="70" y="185">Recognition</text>
<text class="laneb" x="70" y="207">reading a diff</text>
<path class="lineA" d="M 300 200 H 1010"/>
<path class="lineA" d="M 1030 200 H 1082 M 1074 195 l 8 5 l -8 5"/>
<circle cx="300" cy="200" r="5" fill="var(--faint)"/>
<circle cx="530" cy="200" r="5" fill="var(--faint)"/>
<circle cx="760" cy="200" r="5" fill="var(--faint)"/>
<circle cx="990" cy="200" r="5" fill="var(--faint)"/>
<text class="node" x="300" y="176">ticket</text>
<text class="node" x="530" y="176">agent writes it</text>
<text class="node" x="760" y="176">you read the diff</text>
<text class="node" x="990" y="176">approve</text>
<text class="note" x="300" y="234">One straight pass. No dead ends, nothing held in your head.</text>
<rect x="1100" y="187" width="24" height="26" fill="var(--faint)"/>
<rect x="1129" y="187" width="24" height="26" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<rect x="1158" y="187" width="24" height="26" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<rect x="1187" y="187" width="24" height="26" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<rect x="1216" y="187" width="24" height="26" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<rect x="1245" y="187" width="24" height="26" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<text class="mtr dim" x="1184" y="234">shallow</text>
<text class="lane" x="70" y="345">Recall</text>
<text class="laneb" x="70" y="367">constructing a solution</text>
<path class="lineB" d="M 300 360 H 1010"/>
<path class="lineB" d="M 1030 360 H 1080"/>
<path d="M 1072 354 l 10 6 l -10 6" fill="none" stroke="var(--accent)" stroke-width="2"/>
<circle cx="300" cy="360" r="6" fill="var(--accent)"/>
<circle cx="530" cy="360" r="6" fill="var(--accent)"/>
<circle cx="760" cy="360" r="6" fill="var(--accent)"/>
<circle cx="990" cy="360" r="6" fill="var(--accent)"/>
<text class="node" x="300" y="336">ticket</text>
<text class="node" x="530" y="336">you weigh 3 options</text>
<text class="node" x="760" y="336">you hit constraints</text>
<text class="node" x="990" y="336">you decide</text>
<path class="arc" d="M 700 366 C 690 408, 580 408, 566 372"/>
<path d="M 560 364 l 8 10 l 10 -6" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
<text class="arcl" x="633" y="424">dead end</text>
<path class="arc" d="M 940 366 C 930 408, 820 408, 806 372"/>
<path d="M 800 364 l 8 10 l 10 -6" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
<text class="arcl" x="873" y="424">rethink</text>
<rect x="1100" y="347" width="24" height="26" fill="var(--accent)"/>
<rect x="1129" y="347" width="24" height="26" fill="var(--accent)"/>
<rect x="1158" y="347" width="24" height="26" fill="var(--accent)"/>
<rect x="1187" y="347" width="24" height="26" fill="var(--accent)"/>
<rect x="1216" y="347" width="24" height="26" fill="var(--accent)"/>
<rect x="1245" y="347" width="24" height="26" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<text class="mtr hot" x="1184" y="394">deep</text>
<line class="rule" x1="70" y1="458" x2="1330" y2="458"/>
<text class="cap" x="70" y="486">The dead ends are the part that sticks. An agent removes them, and takes the learning with them.</text>
</svg>
</div>
<figcaption>Scroll &#8594;</figcaption>
</figure>

None of this is my observation. Learning research splits it into _fluency strength_ - can you retrieve it right now, and _storage strength_ - will it still be there in six weeks. Reading a good diff produces fluency in abundance, and fluency is the one that feels like mastery. The name for deliberately trading comfort for retention is desirable difficulty, and it long predates any of this tooling.

You can recognise correct code without being able to reproduce the reasoning behind it, and reasoning is exactly what you need six weeks later when it breaks in production, or when someone asks you to defend the design in review.

So the problem isn't speed and it isn't code quality. It's that the effort which used to produce architectural knowledge as a side effect has been removed, and nothing replaced it.

## What I didn't do

I didn't go back to writing everything by hand. The productivity is real and I'm not giving it up out of nostalgia.

The fix is narrower: put deliberate cognitive effort back in, but only at the moments that are architecturally significant. Most code isn't. Commodity CRUD, a form, another list endpoint - the agent handles those and I don't think about them again. That's the point of the tool.

For everything else, three moves. Two of them lean on skills I did not write - Matt Pocock's `wayfinder`, `grill-me` and `grill-with-docs`, from [his skills repo](https://github.com/mattpocock/skills) - and one I had to put together myself, because I could not find anything that did it.

## `/plan` - decide before you build

The command forces the agent to stop before writing code. It has to produce:

1. A short restatement of the problem and the constraints in the existing architecture.
2. **At least three approaches**, each with what you gain and what you pay.
3. A recommendation with an explicit "why this one".
4. Implementation broken into increments of roughly 150 lines or less.

Then it stops and waits.

The last line of the prompt is the whole trick: _do not write code until I tell you which option I'm choosing._

That choice is where the memory forms. Reading one plan teaches you nothing, because there's nothing to weigh. Reading three and rejecting two means you had to hold the trade-offs in your head and commit. Two months later I don't remember the code, but I remember that I picked the option costing more memory to avoid a network round trip. That's the thing I actually need to recall.

For work too big to hold in one session, `wayfinder` is the layer above this: it charts the whole effort as a map of decision tickets and resolves one per session, under a rule identical to the last line of my prompt - plan, don't do. `grill-me` and `grill-with-docs` are the other half, interrogating a design before any code exists. That timing is worth being precise about, because the next move is the exact opposite.

## `/teachback` - find the holes before you merge

This is the one I had to build. Grilling skills exist and they are good, but they all run _before_ the code does. I wanted the mirror image: the feature is written, it is about to merge, and the only open question is how much of it stayed in my head. `teach` names the mechanism I was reaching for - retrieval practice, recall from memory rather than review - and warns about the failure mode below by name.

After a feature is implemented, this one turns the agent around. It doesn't explain the code to me. It quizzes me on it, four to six questions, one at a time, waiting for my answer before moving on:

- the main data flow, from input to database and back
- **why** we made the key decisions, not just what they were
- where the module boundaries are and what's coupled to what
- the most likely edge case, or where this will break first

After each answer it tells me whether I was right and corrects me tightly if I wasn't.

One honest caveat, because this is the part people get wrong.

<figure class="diagram">
<div class="fig-canvas">
<svg id="fig-teachback" viewBox="0 0 1400 460" role="img" aria-labelledby="fig-teachback-t fig-teachback-d">
<title id="fig-teachback-t">The same command, run two ways</title>
<desc id="fig-teachback-d">Two panels side by side. Left, titled you let it explain: the agent says the store subscribes to the socket, the user says yes makes sense, outcome recognition again, retention meter with one cell filled. Right, titled you answer first: the agent asks where this breaks first under load, the user guesses the socket reconnect, the agent corrects that it is the retry queue, outcome you tried to recall it and could not, with one cell marked as a located gap.</desc>
<style>
  #fig-teachback text { font-family: var(--font-sans); fill: var(--ink); }
  #fig-teachback .h1 { font-size: 27px; font-weight: 600; }
  #fig-teachback .sub { font-size: 15px; fill: var(--muted); }
  #fig-teachback .ph { font-size: 18px; font-weight: 600; }
  #fig-teachback .spk { font-family: var(--font-mono); font-size: 12px; fill: var(--faint); }
  #fig-teachback .line { font-size: 15px; }
  #fig-teachback .out { font-size: 15px; font-weight: 600; }
  #fig-teachback .note { font-size: 13px; fill: var(--muted); }
  #fig-teachback .rule { stroke: var(--fig-line); stroke-width: 1; }
  /* fill must ride a class: a presentation attribute loses to the text rule */
  #fig-teachback .dim { fill: var(--muted); }
  #fig-teachback .hot { fill: var(--accent); }
  #fig-teachback .warn { fill: var(--fig-warn); }
</style>
<text class="h1" x="70" y="60">The same command, run two ways</text>
<text class="sub" x="70" y="90">Only one of them does anything. The comfortable one is the useless one.</text>
<line class="rule" x1="700" y1="120" x2="700" y2="410"/>
<text class="ph dim" x="70" y="152">You let it explain</text>
<text class="spk" x="70" y="194">agent</text>
<text class="line" x="150" y="194">&#8220;The store subscribes to the socket, then&#8230;&#8221;</text>
<text class="spk" x="70" y="238">you</text>
<text class="line" x="150" y="238">&#8220;Yes, makes sense.&#8221;</text>
<line class="rule" x1="70" y1="278" x2="640" y2="278"/>
<text class="out dim" x="70" y="312">Recognition again.</text>
<text class="note" x="70" y="338">You have just re-read the diff with extra steps.</text>
<rect x="70" y="360" width="22" height="24" fill="var(--faint)"/>
<rect x="97" y="360" width="22" height="24" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<rect x="124" y="360" width="22" height="24" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<rect x="151" y="360" width="22" height="24" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<rect x="178" y="360" width="22" height="24" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<rect x="205" y="360" width="22" height="24" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<text class="ph hot" x="730" y="152">You answer first</text>
<text class="spk" x="730" y="194">agent</text>
<text class="line" x="810" y="194">&#8220;Where does this break first under load?&#8221;</text>
<text class="spk" x="730" y="238">you</text>
<text class="line" x="810" y="238">&#8220;&#8230;the socket reconnect, I think?&#8221;</text>
<text class="spk" x="730" y="282">agent</text>
<text class="line" x="810" y="282">&#8220;Close. It is the retry queue.&#8221;</text>
<line class="rule" x1="730" y1="318" x2="1330" y2="318"/>
<text class="out hot" x="730" y="352">You tried to recall it and could not.</text>
<text class="note" x="730" y="378">Now the gap has an address. That discomfort is the whole point.</text>
<rect x="730" y="398" width="22" height="24" fill="var(--accent)"/>
<rect x="757" y="398" width="22" height="24" fill="var(--accent)"/>
<rect x="784" y="398" width="22" height="24" fill="var(--accent)"/>
<rect x="811" y="398" width="22" height="24" fill="var(--accent)"/>
<rect x="838" y="398" width="22" height="24" fill="none" stroke="var(--fig-warn)" stroke-width="2"/>
<rect x="865" y="398" width="22" height="24" fill="none" stroke="var(--fig-line)" stroke-width="1.5"/>
<text class="spk warn" x="900" y="415">the one you now know about</text>
</svg>
</div>
<figcaption>Scroll &#8594;</figcaption>
</figure>

It only works if you answer out loud first and then check. If you let the agent recite the answers while you nod along, you are back to recognition and you've gained nothing but a pleasant feeling. The entire value is in the moment where you reach for something, find nothing, and now know exactly where your gap is.

It's uncomfortable. That's the signal.

## `/adr` - leave a sentence for the next person

The last one generates an Architecture Decision Record stub from the session's changes. Status, context, decision, alternatives considered, consequences.

Whether a decision earns one at all runs through the same gate as the rest of the loop: it changed the architecture, it is expensive to reverse, or a future reader will look at the code and wonder why on earth we did it this way. That is the diamond in the diagram further down, and it governs the whole loop, not just the ADR.

Rules:

- One screen, maximum. Nobody reads more.
- The alternatives section must always list at least two rejected options. If we never discussed any, the agent has to state the logical alternatives and why they'd lose. Undocumented rejections come back as "why didn't you just…" a year later.
- The decision has to be phrased as a sentence I can say to a colleague who asks how this works.

That last rule does more for me than the file itself. If a decision can't be compressed into one speakable sentence, I usually don't understand it well enough yet.

All three come straight out of my own ADR template, which makes a Rejected section mandatory and asks for the decision in one sentence. They stay mandatory for a reason specific to agent work: when I didn't write the code, the rejected options are the only part of the session that survives nowhere else. The diff records what we built. Nothing records what we ruled out and that is the question I actually get asked.

## The loop

<figure class="diagram">
<div class="fig-canvas">
<svg id="fig-loop" viewBox="0 0 1400 600" role="img" aria-labelledby="fig-loop-t fig-loop-d">
<title id="fig-loop-t">One ticket through the loop</title>
<desc id="fig-loop-d">Flow diagram. A ticket reaches a decision diamond labelled worth keeping. The no branch goes to an upper lane where the agent implements it, you skim, you merge. The yes branch goes to a lower lane of five steps: slash plan, you choose, increments, slash teachback, slash adr, then merge. An arc runs back from teachback to increments labelled a gap means you go back into the code.</desc>
<style>
  #fig-loop text { font-family: var(--font-sans); fill: var(--ink); }
  #fig-loop .h1 { font-size: 27px; font-weight: 600; }
  #fig-loop .sub { font-size: 15px; fill: var(--muted); }
  #fig-loop .mono { font-family: var(--font-mono); font-size: 16px; font-weight: 600; }
  #fig-loop .step { font-size: 15px; font-weight: 600; }
  #fig-loop .body { font-size: 12px; fill: var(--body); }
  #fig-loop .bodyg { font-size: 13px; fill: var(--muted); }
  #fig-loop .lane { font-size: 13px; font-weight: 600; fill: var(--muted); }
  #fig-loop .laneT { font-size: 13px; font-weight: 600; fill: var(--accent); }
  #fig-loop .yn { font-size: 12px; font-weight: 600; }
  #fig-loop .diam { font-size: 13px; text-anchor: middle; }
  #fig-loop .boxA { fill: none; stroke: var(--faint); stroke-width: 1.5; }
  #fig-loop .boxB { fill: none; stroke: var(--accent); stroke-width: 2; }
  #fig-loop .boxH { fill: var(--fig-tint); stroke: var(--accent); stroke-width: 2; }
  #fig-loop .aA { stroke: var(--faint); stroke-width: 1.5; fill: none; }
  #fig-loop .aB { stroke: var(--accent); stroke-width: 2; fill: none; }
  #fig-loop .rule { stroke: var(--fig-line); stroke-width: 1; }
  #fig-loop .back { stroke: var(--fig-warn); stroke-width: 1.5; fill: none; }
  #fig-loop .backl { font-size: 12px; fill: var(--fig-warn); text-anchor: middle; }
  #fig-loop .mergl { font-size: 15px; font-weight: 600; }
  /* fill must ride a class: a presentation attribute loses to the text rule */
  #fig-loop .dim { fill: var(--muted); }
  #fig-loop .hot { fill: var(--accent); }
</style>
<text class="h1" x="70" y="60">One ticket through the loop</text>
<text class="sub" x="70" y="90">Most code never enters the lower lane. That is what keeps it from becoming ceremony.</text>
<rect class="boxA" x="70" y="270" width="104" height="56" stroke="var(--ink)"/>
<text class="step" x="94" y="304">ticket</text>
<path class="aA" d="M 174 298 H 214 M 206 293 l 8 5 l -8 5" stroke="var(--ink)"/>
<path d="M 280 240 L 338 298 L 280 356 L 222 298 Z" fill="none" stroke="var(--ink)" stroke-width="1.5"/>
<text class="diam" x="280" y="292">worth</text>
<text class="diam" x="280" y="310">keeping?</text>
<text class="bodyg" x="70" y="466">worth keeping = architecturally</text>
<text class="bodyg" x="70" y="486">significant, risky, or the thing</text>
<text class="bodyg" x="70" y="506">people keep asking you about</text>
<path class="aA" d="M 312 268 C 350 250, 360 200, 396 182 M 388 177 l 8 5 l -9 5"/>
<text class="yn dim" x="322" y="238">no</text>
<path class="aB" d="M 312 328 C 350 348, 360 400, 396 424 M 388 419 l 8 5 l -9 5"/>
<text class="yn hot" x="322" y="368">yes</text>
<text class="lane" x="404" y="136">Commodity code</text>
<rect class="boxA" x="404" y="150" width="756" height="64"/>
<text class="step" x="428" y="180">Agent implements it. You skim, you merge.</text>
<text class="bodyg" x="428" y="200">CRUD, forms, another list endpoint. You will not think about it again.</text>
<text class="laneT" x="404" y="352">The parts you will have to defend</text>
<rect class="boxB" x="404" y="366" width="140" height="112"/>
<text class="mono" x="418" y="394">/plan</text>
<text class="body" x="418" y="422">3+ options,</text>
<text class="body" x="418" y="440">with trade-offs</text>
<text class="body" x="418" y="458">then it stops</text>
<rect class="boxH" x="572" y="366" width="140" height="112"/>
<text class="step hot" x="586" y="394">you choose</text>
<text class="body" x="586" y="422">rejecting two</text>
<text class="body" x="586" y="440">is what you</text>
<text class="body" x="586" y="458">still remember</text>
<rect class="boxB" x="740" y="366" width="140" height="112"/>
<text class="step" x="754" y="394">increments</text>
<text class="body" x="754" y="422">150 lines or</text>
<text class="body" x="754" y="440">less per step</text>
<rect class="boxB" x="908" y="366" width="140" height="112"/>
<text class="mono" x="922" y="394">/teachback</text>
<text class="body" x="922" y="422">it quizzes you</text>
<text class="body" x="922" y="440">you answer</text>
<text class="body" x="922" y="458">before you look</text>
<rect class="boxB" x="1076" y="366" width="140" height="112"/>
<text class="mono" x="1090" y="394">/adr</text>
<text class="body" x="1090" y="422">one screen</text>
<text class="body" x="1090" y="440">2+ rejected</text>
<text class="body" x="1090" y="458">alternatives</text>
<path class="aB" d="M 544 422 H 566 M 559 417 l 7 5 l -7 5"/>
<path class="aB" d="M 712 422 H 734 M 727 417 l 7 5 l -7 5"/>
<path class="aB" d="M 880 422 H 902 M 895 417 l 7 5 l -7 5"/>
<path class="aB" d="M 1048 422 H 1070 M 1063 417 l 7 5 l -7 5"/>
<path class="back" d="M 978 478 C 970 528, 820 528, 812 484"/>
<path d="M 806 476 l 7 10 l 10 -6" fill="none" stroke="var(--fig-warn)" stroke-width="1.5"/>
<text class="backl" x="895" y="552">a gap means you go back into the code</text>
<line class="rule" x1="1264" y1="150" x2="1264" y2="478" stroke="var(--ink)" stroke-width="1.5"/>
<text class="mergl" x="1278" y="318">merge</text>
<path class="aA" d="M 1160 182 H 1256 M 1248 177 l 8 5 l -8 5"/>
<path class="aB" d="M 1216 422 H 1256 M 1248 417 l 8 5 l -8 5"/>
</svg>
</div>
<figcaption>Scroll &#8594;</figcaption>
</figure>

Per ticket: `/plan`, choose an option, let the agent implement in increments, `/teachback` before merging, `/adr` if the decision was architecturally significant.

And, just as important: skip all three for commodity code. If you run this on every commit it becomes ritual, you'll resent it, and you'll drop it within two weeks. Reserve it for the risky parts and the parts people ask you about.

## What it actually buys

I built AttestBIM, a browser-based IFC compliance checker, across roughly ten agent sessions. Monorepo, a core package and a web app, fifteen compliance checks, ninety-odd tests. I did not type most of it.

I can still tell you how the check pipeline is wired, which decisions I'd revisit, and where it will strain first on larger models. That's the outcome I'm optimising for. Not fewer AI-written lines - fewer lines I can't defend.

Because the part that hasn't changed at all is who gets called when it breaks. The agent isn't on that rotation. You are, and the review, and the incident, and the conversation with the client are all still yours. Speed is worth very little if you can't stand behind the result.

This workflow is my answer to that. It costs maybe twenty minutes per significant feature. It's the cheapest thing I do.

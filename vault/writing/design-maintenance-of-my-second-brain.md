---
tags:
  - concept
  - web
parent: "[[Second Brain]]"
previous:
next:
slug: writing/design-maintenance-of-my-second-brain
title: Design & Maintenance of my Second Brain
description: This focuses on my note & folder layout in Obsidian.
published_at: 2025-06-22 19:03
updated_at: 2025-06-22 19:03
share: true
---

# Design & Maintenance of my Second Brain

This focuses on my note & folder layout in Obsidian.

## Design

I use my Second Brain to represent & connect my ideas & thinking in a way that feels reflective of how my brain works. I'm a [Software Engineer](/vault/writing/software-engineering.md), so everything in Obsidian is extremely structured. I define types by the structure of the metadata on those markdown files and (sometimes) how the content relates to the content type. I can then compose these types together to express what a particular note represents.

I have a lot of different note types because I imported a bunch of data from a bunch of different sources into the vault. This includes things like Pinboard and my contacts & LinkedIn connections (which I ironically pulled in by testing a different program then exporting my data before pulling the plug). As a result, I have a _lot_ of different note types representing all the different object types I've imported into this system. With the expressive power of [Obsidian](/vault/writing/obsidian.md), combined with Dataview and other plugins, I build little apps on top of these notes, making it a really powerful tool.

The folder structure is a 1:1 mapping of types. I do "compose" types because the properties are mapped by tag, so each tag leverages Metadata Menu to add a UI for the properties of that type. In that case, I just pick a relevant folder and roll with it. I have a bunch of templates the all me to create these different files and automatically move those files into the right folders.

In addition, I have "views", which are largely Datacore/Dataview pages that query those notes, which are a combination of the relevant properties + the content of the notes. I try to keep these sorts of Obsidian-specific attributes out of the notes to keep them more portable, although that can't always be the case and isn't a strict rule. I also use Signyntvirtual-footer Display markdown text (including dataview queries) at the bottom of all notes in a folder, without modifying them. to embed views into the page, providing a default editing experience for each type.

These views are inspired by the ACE System by Nick Milo. The Previous note folder structure matched the ACE system, but as the types evolved and my PKM grew, I found that I never navigated via the folder structure and the friction of deciding where something should live got annoying. I played around briefly with anytype — the everything app and Capacities – A studio for your mind, both of which inspired this setup. I didn't migrate because I have a lot of personal information in here and the idea of handing that over didn't sit right.

There is some overengineering involved here that I need to work out. I currently use several plugins to provide editing capabilities: the aforementioned Metadata Menu, Meta Bind Docs, GitHub - danielo515obsidian-modal-form Define forms for filling data that you will be able to open from anywhere you can run JS, and blacksmithgudatacore Work-in-progress successor to Dataview with a focus on UX and speed. all provide some form of editing UI for notes. Meta Bind we could probably do away with, as there isn't that much usage remaining and it is easily replaced by Datacore.

The other others are more difficult. Metadata Menu also provides the field definitions for the various note types, while Modal Form is used by the templates for creation. I could provide some way of defining note types in code that flows into Datacore, building out an app of sorts to create & edit new pages. That's a lot of work, and it sort of reminds me of Home  Obsidian Typing, which was a very cool & ambitious idea that has been largely abandoned. The beauty of open source is you can cobble together multiple parts to accomplish your goal. The result may not be the cleanest thing, but it gets the job done for a lot less work.

 The overall result of this setup are Object-oriented notes.

### Note types

- Temporary notes to keep fleeting thoughts
- Notes on media & learning materials
- Notes that digest a Reference Notes
- [Notes that document a concept or particular idea](/vault/writing/notes-that-document-a-concept-or-particular-idea.md)
- Entrypoint notes into broader concepts or areas
- Notes containing a review of a poker hand
- Notes of URL bookmarks
- Notes referencing a person
- Notes from interactions & conversations with people
- Note the represents a particular thought, experience, or explanation I gave at some point
- Note that represents some piece of content I want to publish
- Periodic notes
- Notes of projects & threads I'm working on
- Notes to organize an outreach to people
- An individual contact during an outreach
- Notes of things I've consumed

## Maintenance

Now that I have this imported, this is how I am [Processing my inbox](/vault/writing/processing-my-inbox.md). I am also working on these Imported Notes.
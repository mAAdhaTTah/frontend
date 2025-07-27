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

I use my Second Brain to represent & connect my ideas & thinking in a way that feels reflective of how my brain works. I'm a [Software Engineer](Software%20Engineering.md), so everything in Obsidian is extremely structured. I define types by the structure of the metadata on those markdown files and (sometimes) how the content relates to the content type. I can then compose these types together to express what a particular note represents.

I have a lot of different note types because I imported a bunch of data from a bunch of different sources into the vault. This includes things like Pinboard and my contacts & LinkedIn connections (which I ironically pulled in by testing a different program then exporting my data before pulling the plug). As a result, I have a _lot_ of different note types representing all the different object types I've imported into this system. With the expressive power of [Obsidian](Obsidian.md), combined with Dataview and other plugins, I build little apps on top of these notes, making it a really powerful tool.

The folder structure is a 1:1 mapping of types. I do "compose" types because the properties are mapped by tag, so each tag leverages [Metadata Menu](Metadata%20Menu.md) to add a UI for the properties of that type. In that case, I just pick a relevant folder and roll with it. I have a bunch of templates the all me to create these different files and automatically move those files into the right folders.

In addition, I have "views", which are largely Datacore/Dataview pages that query those notes, which are a combination of the relevant properties + the content of the notes. I try to keep these sorts of Obsidian-specific attributes out of the notes to keep them more portable, although that can't always be the case and isn't a strict rule. I also use [Signynt/virtual-footer](Signyntvirtual-footer%20Display%20markdown%20text%20(including%20dataview%20queries)%20at%20the%20bottom%20of%20all%20notes%20in%20a%20folder,%20without%20modifying%20them..md) to embed views into the page, providing a default editing experience for each type.

These views are inspired by the [ACE System](ACE%20System.md) by [Nick Milo](Nick%20Milo.md). The [Previous note folder structure](Previous%20note%20folder%20structure.md) matched the ACE system, but as the types evolved and my PKM grew, I found that I never navigated via the folder structure and the friction of deciding where something should live got annoying. I played around briefly with [anytype — the everything app](anytype%20%E2%80%94%20the%20everything%20app.md) and [Capacities – A studio for your mind](Capacities%20%E2%80%93%20A%20studio%20for%20your%20mind.md), both of which inspired this setup. I didn't migrate because I have a lot of personal information in here and the idea of handing that over didn't sit right.

There is some overengineering involved here that I need to work out. I currently use several plugins to provide editing capabilities: the aforementioned [Metadata Menu](Metadata%20Menu.md), [Meta Bind](Meta%20Bind%20Docs.md), [Obsidian Modal Form](GitHub%20-%20danielo515obsidian-modal-form%20Define%20forms%20for%20filling%20data%20that%20you%20will%20be%20able%20to%20open%20from%20anywhere%20you%20can%20run%20JS.md), and [Datacore](blacksmithgudatacore%20Work-in-progress%20successor%20to%20Dataview%20with%20a%20focus%20on%20UX%20and%20speed..md) all provide some form of editing UI for notes. Meta Bind we could probably do away with, as there isn't that much usage remaining and it is easily replaced by Datacore.

The other others are more difficult. Metadata Menu also provides the field definitions for the various note types, while Modal Form is used by the templates for creation. I could provide some way of defining note types in code that flows into Datacore, building out an app of sorts to create & edit new pages. That's a lot of work, and it sort of reminds me of [Obsidian Typing](Home%20%20Obsidian%20Typing.md), which was a very cool & ambitious idea that has been largely abandoned. The beauty of open source is you can cobble together multiple parts to accomplish your goal. The result may not be the cleanest thing, but it gets the job done for a lot less work.

### Note types

- [Temporary notes to keep fleeting thoughts](Temporary%20notes%20to%20keep%20fleeting%20thoughts.md)
- [Notes on media & learning materials](Notes%20on%20media%20&%20learning%20materials.md)
- [Notes that digest a Reference Notes](Notes%20that%20digest%20a%20Reference%20Notes.md)
- [Notes that document a concept or particular idea](Notes%20that%20document%20a%20concept%20or%20particular%20idea.md)
- [Entrypoint notes into broader concepts or areas](Entrypoint%20notes%20into%20broader%20concepts%20or%20areas.md)
- [Notes containing a review of a poker hand](Notes%20containing%20a%20review%20of%20a%20poker%20hand.md)
- [Notes of URL bookmarks](Notes%20of%20URL%20bookmarks.md)
- [Notes referencing a person](Notes%20referencing%20a%20person.md)
- [Notes from interactions & conversations with people](Notes%20from%20interactions%20&%20conversations%20with%20people.md)
- [Note the represents a particular thought, experience, or explanation I gave at some point](Note%20the%20represents%20a%20particular%20thought,%20experience,%20or%20explanation%20I%20gave%20at%20some%20point.md)
- [Note that represents some piece of content I want to publish](Note%20that%20represents%20some%20piece%20of%20content%20I%20want%20to%20publish.md)
- [Periodic notes](Periodic%20notes.md)
- [Notes of projects & threads I'm working on](Notes%20of%20projects%20&%20threads%20I'm%20working%20on.md)
- [Notes to organize an outreach to people](Notes%20to%20organize%20an%20outreach%20to%20people.md)
- [An individual contact during an outreach](An%20individual%20contact%20during%20an%20outreach.md)
- [Notes of things I've consumed](Notes%20of%20things%20I've%20consumed.md)

## Maintenance

Now that I have this imported, this is how I am [Processing my inbox](Processing%20my%20inbox.md). I am also working on these [Imported Notes](Imported%20Notes.md).
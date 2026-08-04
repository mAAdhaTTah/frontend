---
tags:
  - resume
  - export
basics:
  name: James DiGioia
  email: jamesorodig@gmail.com
  url: https://jamesdigioia.com
  summary: Engineering leader and hands-on architect, ~7 years scaling a DTC ecommerce platform from technical lead to Senior Director. Deep in React/Next.js, TypeScript, and the platform architecture underneath them. Currently Senior Director of Engineering at Ollie Pets.
  location:
    city: Bronx
    region: NY
  profiles:
    - network: GitHub
      username: mAAdhaTTah
      url: https://github.com/mAAdhaTTah
work:
  - name: Ollie Pets
    position: Senior Director, Engineering
    url: https://www.ollie.com
    startDate: 2025-10-01
    summary: Pet health & fresh food subscription
    highlights:
      - Converted a narrow price-matching experiment into a self-service price testing capability, assessing from our homegrown pricing system that the effort was low relative to the potential value, and pushed to prioritize it to enable ongoing subscription pricing experimentation
      - Enabled 4 of 5 squads to operate more independently by hiring 2 fullstack engineers, developing frontend engineers into fullstack ones, and investing in our Backend-for-Frontend API design, resulting in a more even distribution of backend & production support work
      - Refined API design of an ML-backed Feeding Recommendations microservice, owned by the Data & Analytics team, for consumption by our platform, driving migration to a more data-driven calorie recommendation system that better matches customer behavior
      - Initiated a month-long trial of 5 AI tools across the engineering team, culminating in a hackathon and survey to inform the adoption of 2 new tools, and handed control of 3 new working groups to senior engineers to drive policy, tool refinement, and skill development
      - Developed & published a quarterly engineering scorecard, driven by my tech leads, to track productivity alongside maintainability metrics like dead code & bugs per feature to support their self-evaluation
      - Managed & developed a team of 4 tech leads and 22 engineers across 5 squads, 3 platforms, and engineering operations & site reliability
  - name: Ollie Pets
    position: Director, Engineering
    url: https://www.ollie.com
    startDate: 2024-01-01
    endDate: 2025-10-01
    summary: Pet health & fresh food subscription
    highlights:
      - Led the department through a ~1.5yr migration from BigCommerce to Shopify, completed 2mo past the contract deadline with allergies functionality deferred, preserving our onboarding flow & member experience
      - Identified that we lacked visibility on the remaining work, broke down & planned it with the team using our current velocity & average ticket points, projected a completion date 5mo late, and reorganized the department to close the gap by 3mo
      - Owned the BigCommerce vendor relationship and proposed a contract extension of 2mo full and 10mo storefront-disabled access, saving 50% off the cost of the 1 year minimum
      - Stepped in as tech lead for the platform squad, directing work distribution & ownership across engineers and keeping the critical path on track
      - Redesigned the API layer into a Backend-for-Frontend architecture across dozens of endpoints, building a new set to support Shopify customers while maintaining backwards compatibility for BigCommerce customers and making it possible for squads to own their endpoints
      - Architected the authentication cutover from our mid-flow approach on BigCommerce to Shopify's OAuth-based login, evaluating 5 approaches for new customer onboarding before settling on guest checkout, supporting customers on both systems through a split login screen
      - Introduced Rust through our cart transform & checkout validation Shopify Functions after TypeScript hit platform limits, supporting the engineers through the migration to Rust, and restructured failure handling with thiserror to surface error codes to the checkout
      - As sole engineering representative in due diligence for Agrolimen's acquisition of Ollie, documented architecture, workflows, security, vendors, and team structure in parallel with the migration, under strict confidentiality
  - name: Ollie Pets
    position: Director, Front End Engineering
    url: https://www.ollie.com
    startDate: 2023-05-01
    endDate: 2024-01-01
    summary: Pet health & fresh food subscription
    highlights:
      - Mentored a Principal Engineer into her current role as Senior Tech Lead for two squads across web & mobile
  - name: Ollie Pets
    position: Senior Technical Lead, Front End
    url: https://www.ollie.com
    startDate: 2021-10-01
    endDate: 2023-05-01
    summary: Pet health & fresh food subscription
    highlights:
      - Hired 4 engineers & 1 senior engineer to take over the migrated platform from the contractors, all of whom are still on the team, and reorganized them into two frontend squads, one led by the senior hire
      - Onboarded the new team to the application, documenting the architecture and recording regular training sessions, and enforced standards on our unit testing approach, component design & layering, and API integration
      - Increased our Lighthouse score from 20 to 50 by optimizing image size with next/image and slimming the initial JS bundle with better code splitting
      - Established an ongoing audit and remediation program with LevelAccess, an external accessibility partner, producing continuous improvement that reduced legal exposure and enabling our onboarding flow to be fully keyboard navigable
  - name: Ollie Pets
    position: Technical Lead, Front End
    url: https://www.ollie.com
    startDate: 2019-11-12
    endDate: 2021-10-01
    summary: Pet health & fresh food subscription
    highlights:
      - Migrated from a homegrown React + Django application to an API-driven Next.js application, integrated with headless Django, enabling the single engineering team to split into distinct backend & frontend squads
      - Architected and personally built or reviewed the Next.js application, including CMS integration with Storyblok, onboarding & checkout flows, and member experience, a foundation largely still in place 5 years later
      - Led a team of contractors through launch, backfilling capacity lost to attrition while keeping the frontend delivery on track
      - Completed infrastructure migration from EC2 to ECS + Docker, designing the pipeline with our devops contractors to replace a manual process with automated staging deploys & production releases triggered by git tag
  - name: Stella.ai
    position: Engineering Lead
    url: https://stella.jobs
    startDate: 2019-04-01
    endDate: 2019-10-31
    summary: Recruiting & compensation platform
    highlights:
      - Led NYC team in coordination with Sydney, Australia team
      - Implemented complex search & filter page with React Hooks
      - Improved search API with Flask, SQLAlchemy, & Marshmallow
      - Rebuilt enterprise-facing dashboard for UX & stability
  - name: Stella.ai
    position: Senior Front-End Engineer
    url: https://stella.jobs
    startDate: 2018-09-01
    endDate: 2019-04-01
    highlights:
      - Architected & led the front-end development of B2B platform for firms to comply with pay equity laws
      - Refactored buggy multi-step onboarding flow, improving app stability and performance
      - Enforced React/Redux & TypeScript best practices through regular peer code review
      - Implemented charting and graphing with Victory library
    summary: Compensation equity compliance & ML-driven job matching
  - name: Stellar
    position: Engineer (Contract)
    summary: Support network for terminal patients
    url: ""
    startDate: 2018-08-01
    endDate: 2018-11-01
    highlights:
      - Developed MVP patient care app with Node.js, Express, Passport, and Objection.js
      - Managed product lifecycle, feature triage, & AWS deployments
      - Implemented live chat feature with Redis and websockets
  - name: Valtech
    position: Senior Front-End Engineer
    url: https://www.valtech.com/en-us/
    summary: Digital agency
    startDate: 2015-03-01
    endDate: 2018-09-01
    highlights:
      - Junior- to mid-level in <9 months; project lead in ~2.5 years; account lead in 3 years
      - Managed team of developers across multiple projects and brands for L’Oréal account
      - Led development team on agile ecommerce project built with Vue.js and Sitecore
      - Architected Hybris checkout for stability and performance with Redux, Handlebars, and Kefir
      - Redesigned product page using vanilla JavaScript and component-based architecture
volunteer:
  - organization: Code Nation
    position: Volunteer Teacher
    url: https://codenation.org/
    startDate: 2016-10-01
    endDate: 2021-11-01
    highlights:
      - Taught web development to students at under-resourced high schools
      - Mentored student hackathon team
      - Mentored interns on internal projects at Valtech Summer of 2017 & 2018
education:
  - institution: New York University, Stern School of Business
    url: https://www.stern.nyu.edu/
    area: Marketing, Psychology (minor)
    startDate: 2005-09-01
    endDate: 2009-05-31
publications:
  - name: Meet brookjs
    url: https://jamesdigioia.com/talks/brookjs-at-reactnyc/
  - name: Using Vue.js in Server Rendered Environments
    url: https://jamesdigioia.com/talks/using-vuejs-in-server-rendered-environments/
skills:
  - name: JavaScript
    keywords:
      - TypeScript
      - ES6+
      - DOM/Web Platform
  - name: Modern Frameworks/Libraries
    keywords:
      - React.js
      - Next.js
      - React Query
      - Tanstack Query/Table/Router/Start
      - Vue.js
  - name: Functional, Reactive
    keywords:
      - RxJS
      - Kefir
      - Ramda
  - name: CSS
    keywords:
      - Tailwind
      - styled-components
      - PostCSS
      - SASS
      - CSS Modules
  - name: Testing
    keywords:
      - Storybook
      - Jest
      - Vitest
      - Cypress
      - Playwright
  - name: Build Tools
    keywords:
      - Vite
      - Webpack
      - Babel
      - SWC
  - name: Python
    keywords:
      - FastAPI
      - Django
      - SQLAlchemy
      - Marshmallow
      - Flask
  - name: DevOps
    keywords:
      - Docker
      - AWS
      - Ansible
      - PostgreSQL
  - name: Rust
    keywords:
      - Cargo
      - Tauri
      - Tokio
      - Serde
projects:
  - name: HoldMyCal.com
    url: https://holdmycal.com
    startDate: 2026-03-20
    endDate: ""
    roles:
      - Lead Engineer
    highlights:
      - Built Next.js app to sync timeblocks between calendars
      - Developed with Claude Code, leveraging spec-driven development
  - name: Pipeline Operator
    highlights:
      - Advocate for new syntax into ECMAScript specification with TC39
      - Developing babel plugins for competing proposals to gather user feedback
    startDate: 2017-06-01
    url: https://github.com/tc39/proposal-pipeline-operator/
    roles:
      - Community Advocate
  - name: brookjs
    highlights:
      - React/Redux framework for building streaming web applications
      - Integrates functional reactive programming principles with Kefir
    startDate: 2017-06-01
    endDate: 2022-11-28
    url: https://github.com/mAAdhaTTah/brookjs/
    roles:
      - Lead Maintainer
  - name: Kefir
    highlights:
      - Joined team after repeated quality contributions & engagement
      - Extracted and released chai-kefir to enable unit testing Kefir streams
    startDate: 2017-06-01
    url: https://kefirjs.github.io/kefir/
    roles:
      - Maintainer
  - name: Prism.js
    highlights:
      - Joined team after repeated quality contributions & engagement
      - Implemented copy-to-clipboard plugin to copy PrismJS code snippets
    startDate: 2017-06-01
    url: https://prismjs.com/
    roles:
      - Maintainer
share: true
slug: jd-resume
path: vault/_data
---

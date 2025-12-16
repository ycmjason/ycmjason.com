<p class="print-hidden">
  🆕 Want to talk to my CV? Check out
  <a href="https://diary.ycmjason.com" target="_blank" rel="noopener noreferrer">diary.ycmjason.com</a>
  .
</p>

<p class="print-hidden">
  <a href="/cv.pdf" class="button">
    PDF Version
  </a>
</p>

<p class="print-only">
➡️ See this CV at <a href="https://www.ycmjason.com/cv">https://www.ycmjason.com/cv</a>
</p>

# Jason Yu

**Principal Frontend Engineer • Tech Speaker • Open Source Contributor**

📧 <jason@ycmjason.com> • 📍 London, UK

> Passionate software engineer with 8+ years of experience building scalable
> frontend architectures, leading TypeScript migrations, and empowering
> developer communities through open source and public speaking. Creator of 12k+
> download mobile apps and innovative dev tools.

<div class="social-links">
  <a href="https://www.ycmjason.com" class="button" target="_blank" rel="noopener noreferrer">
    Personal Website
  </a>
  <a href="https://github.com/ycmjason" class="button" target="_blank" rel="noopener noreferrer">
    GitHub
  </a>
  <a href="https://www.linkedin.com/in/ycmjason/" class="button" target="_blank" rel="noopener noreferrer">
    LinkedIn
  </a>
  <a href="https://x.com/ycmjason" class="button" target="_blank" rel="noopener noreferrer">
    X
  </a>
  <a href="https://dev.to/ycmjason" class="button" target="_blank" rel="noopener noreferrer">
    dev.to
  </a>
  <a href="https://www.youtube.com/@YCMJasonCodes" class="button" target="_blank" rel="noopener noreferrer">
    YouTube
  </a>
</div>

## 🧑‍💻 Work Experience

### Boltzbit (Principal Frontend Engineer)

**2025 - Present**

- Architected a **scalable frontend monorepo** to facilitate seamless
  integration with external teams.
- Spearheaded the **migration to TypeScript**, improving code reliability and
  developer experience.
- Led the frontend architecture for a **no-code, AI-empowered app builder**:
  - Developed a **widget registry** enabling users to compose apps via modular
    components.
  - Created a **Widget SDK** to support third-party extensions and ecosystem
    growth.

### 🍡 Fishball Ltd (Founder)

**2025 - Present**

Building multiple apps, SaaS, and open-source projects:

#### 📱 Mobile Apps

- ⌚️
  [WearDa Metronome](https://play.google.com/store/apps/details?id=com.wearda.metronome)
  - 💻 Jetpack Compose, Kotlin
  - A WearOS vibrating metronome with **>12k downloads** and **4.5★ rating**.
- 🇬🇧
  [Ace It: Life in the UK Test](https://play.google.com/store/apps/details?id=app.fishball.ace_it.liuk)
  - 💻 React Native, TypeScript
  - A study app for the UK Citizenship Test.
- ♠️
  [Big2Cal](https://play.google.com/store/apps/details?id=app.fishball.big2cal)
  - 💻 React Native, TypeScript
  - Score-tracking app for the popular Hong Kong card game **Big2**.

#### 🌐 Web Apps

- 🀄️ mjcal.app
  - 💻 React, TypeScript
  - Mahjong score-tracking app with analytics and stats.

### Bloomberg LP (Senior TypeScript Engineer)

**2023 - 2025**

- Led migration to TypeScript strict mode
  - Increased visibility of strict mode errors:
    - Developed `@ts-expect-strict-error`, a
      [TypeScript Language Service Plugin](https://github.com/microsoft/typescript/wiki/using-the-language-service-api),
      showing strict mode errors in IDEs (without affecting `tsc`).
    - Allowed suppressing errors with `@ts-expect-strict-error-next-line`.
  - Prevented new strict mode errors:
    - Built a CLI tool leveraging `@ts-expect-strict-error`.
    - Enforced checks via a new CI step, blocking PRs with unmarked strict
      errors.
  - Reduced existing strict mode errors:
    - Introduced Grafana dashboards to track progress and a leaderboard to
      gamify error elimination.
    - Eliminated **15% of 10k errors** in the first month.
    - Reduced technical debt by **1,500+ strict mode violations** through team
      collaboration.
- Defined best practices and patterns for scalable TypeScript code.

### Attest Technology Limited (Frontend Engineer)

**2019 - 2023**

- Developed an _A\* algorithm-based SVG line drawing module_ for signature
  capture.
- Improved error detection and component testing DX, reducing bug reports by
  **40%**.
- Advocated for the
  ["rule of least power"](https://dev.to/ycmjason/writing-cleaner-code-with-the-rule-of-least-power-rolp-4kkk)
  as a coding principle.
- Led migration from **vanilla TypeScript** to **Vue.js**, modernizing the tech
  stack.

### The Hut Group (Full Stack Engineer)

**2017 - 2019**

- Built a **vanilla JavaScript component framework**.
- Founded & led **"JS Club"** to promote modern JavaScript practices.
- Developed a CLI tool to improve developer workflows.

## 🎬 YouTube

### Technical Talks & Tutorials

- **[TRY {} CATCH {} ‒ FIXED! (with a surprisingly old trick)](https://www.youtube.com/watch?v=KhBWOAGWPs4)**
  - Analyzed limitations in standard JavaScript error handling and demonstrated
    an IIFE-based pattern to improve code integrity and type inference.

- **[7 MODERN IIFE TRICKS IN 10 MINUTES](https://www.youtube.com/watch?v=ZyxOt09-LXE)**
  - Presented seven practical use cases for Immediately Invoked Function
    Expressions (IIFE) in modern development, including async operations,
    variable scoping, and encapsulation.

- **[Your code: powerful, but not clean. Here's why](https://www.youtube.com/watch?v=f3RiI9VRohs)**
  - Applied the "Rule of Least Power" to software engineering, advocating for
    "depowering" code conventions to enhance long-term readability and
    maintainability.

- **[Introducing ts-migrating: Upgrade TSConfig Progressively](https://www.youtube.com/watch?v=38n3GT9W8aw)**
  - Demonstrated `ts-migrating`, an open-source tool designed to help developers
    upgrade strict TypeScript compiler options progressively across large
    codebases.

## 🛠️ Open Source & Side Projects

- [@fishballpkg/linkz](https://github.com/fishballapp/linkz)
  - A config-driven static site generator that powers my personal website.
  - Generates a **linktree-like** landing page with full markdown support.
  - Powers this very site.
- [ts-migrating](https://github.com/ycmjason/ts-migrating)
  - A plugin enabling progressive upgrades to stricter `compilerOptions` (e.g.,
    `strict`, `noUncheckedIndexedAccess`, `erasableSyntaxOnly`) by allowing
    problematic lines to fall back to legacy settings.
- [@fishballpkg/acme](https://github.com/fishballapp/acme)
  - A zero-dependency, minimalist ACME client in TypeScript designed to simplify
    certificate generation.
  - Leveraged modern web standards (e.g., Web Crypto API) and implemented a
    custom
    [ASN.1 Encoder](https://github.com/fishballapp/acme/blob/main/src/Asn1/Asn1Encoder.ts)
    using low-level `Uint8Array` manipulation. 🤓
- [one-page-pdf](https://github.com/ycmjason/one-page-pdf)
  - A CLI tool using **Puppeteer** to render webpages into single-page PDFs.
  - Used to generate the PDF version of this very CV.
- diary.ycmjason.com
  - AI-powered diary using **LLM**, inspired by Tom Riddle’s diary.
  - [Find out more on GitHub](https://github.com/ycmjason/diary.ycmjason.com)
- [Keyboard-Keyboard](https://keyboard-keyboard.ycmjason.com)
  - Web-based **musical keyboard** using **Web Audio API**.
  - [Find out more on GitHub](https://github.com/ycmjason/keyboard-keyboard)
- [Perfect Colour](https://perfect-colour.ycmjason.com)
  - Vision quiz testing ability to recognize RGB values.
  - [Find out more on GitHub](https://github.com/ycmjason/perfect-colour)

## 🎤 Public Speaking

- **Live Coding: Recreating Vue's Reactivity System**\
  - 📆 Oct 2023
  - 📍 [Vue.js Slovenia Meetup](https://www.meetup.com/vue-slovenia/)
  - ▶️ [Recording](https://www.youtube.com/watch?v=ukqWIooTt_c)
- **Vue 3 Reactivity Reimagined**
  - 📆 Nov 2019
  - 📍 [Vue.js London Meetup](https://www.meetup.com/vue-slovenia/)
  - ▶️ [Recording](https://www.youtube.com/watch?v=O0b6A6Wi87Q)
- **Live coding: The new Composition API**
  - 📆 Oct 2019
  - 📍 [Vue.js London Conference](https://www.meetup.com/vuejs-london/)
  - ▶️ [Recording](https://www.youtube.com/watch?v=JON6X6Wmteo)
- **Vue without View - An Introduction to Renderless Components**
  - 📆 Jun 2019
  - 📍 [Vue.js London Meetup](https://www.meetup.com/vuejs-london/)
  - ▶️ [Recording](https://www.youtube.com/watch?v=j_WU0xx_O58)
- **Building a Simple Virtual DOM from Scratch**
  - 📆 Nov 2018
  - 📍 [Manchester Web Meetup](https://www.meetup.com/Manchester-Web-Meetup/)
  - ▶️ [Recording](https://www.youtube.com/watch?v=85gJMUEcnkc)

## ✍️ Articles

📖 All articles available at [dev.to/ycmjason](https://dev.to/ycmjason)

Here are some hand-picked highlights:

- **Typing Partially Applicable Functions in TypeScript**
  - 📆 Jun 2023
  - 🔗
    [Read](https://dev.to/ycmjason/typing-partially-applicable-functions-1oa4)
- **Detecting Barcodes from the Browser**
  - 📆 Nov 2021
  - 🔗 [Read](https://dev.to/ycmjason/detecting-barcode-from-the-browser-d7n)
- **Writing Cleaner Code with the Rule of Least Power**
  - 📆 Apr 2020
  - 🔗
    [Read](https://dev.to/ycmjason/writing-cleaner-code-with-the-rule-of-least-power-rolp-4kkk)
- **Building a Simple Virtual DOM from Scratch**
  - 📆 Dec 2018
  - 🔗
    [Read](https://dev.to/ycmjason/building-a-simple-virtual-dom-from-scratch-3d05)

## 🎓 Education

### **Imperial College London**

**2014 - 2017** • BEng Computing

- Courses: Haskell, Java, C, C++, Prolog, Python, AI, Operating Systems,
  Compilers, Networking.

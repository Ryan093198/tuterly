// Curriculum overview enrichment data.
//
// These entries are *targeted* prompt context: when a session note mentions
// a known set text (English) or named teaching sequence (Maths) at the
// student's level, we inject just that entry's themes / vocabulary / learning
// goals / mapped codes into the report prompt. This grounds the AI in the
// actual material the student is studying rather than relying on guesswork.
//
// Source documents (committed under app/curriculum/curriculum overviews/):
//   - english curriculum overview 3-6.docx (Vic Lesson Plans)
//   - English curriculum overview - levels 7-10.pdf
//   - Mathematics_F-6_curriculum_overview.pdf
//   - Mathematics_7-10A_curriculum_overview.pdf
//
// Data shape — keep entries small and easy to extend:
//   { keywords: [...], title, themes?, vocab?, goals: [...], codes: [...] }
// `keywords` are matched case-insensitively as substrings against session notes.


export const ENGLISH_OVERVIEWS = {
  "Level 3": [
    {
      keywords: ["brindabella"],
      title: "Brindabella",
      themes: ["Friendship", "loss", "nature"],
      goals: [
        "Understanding how an author uses language to describe Australian settings",
        "Understanding how setting is important to plot development",
        "Identifying the different messages within a story and understanding how they are connected to the characters",
        "Understanding how authors use animal characters as a literary device to create relatable and engaging stories",
      ],
      writingGenre: "Description, Diary entry, Opinion",
      vocab: "cockatoos, galahs, motto, gurgling, verandah, wattle, astonishment, shard of sunlight, fiercely, shutters, enigmatic, squawking, anthropomorphism, scornfully, guzzled, opinion, ordinary, demure, exasperated, pent-up, verbs and verb groups, dialogue, enclosed, murmured, amiably, comparison, expectation, experiences, hemmed, mob, silhouettes, courage, desolate, freedom, survival, belonging, contrite, courage, fear, friendship, kindness, misery, grimaced, ruination, trust, hesitant, opinion, bravery, lopsided, quivering, burrowed, emerged, luminous, monstrous, timid, vital, witness, reverberate, beseeching, enigmatically, reflecting",
      codes: ["VC2E3LA03", "VC2E3LA04", "VC2E3LA07", "VC2E3LA10", "VC2E3LA11", "VC2E3LE01", "VC2E3LE02", "VC2E3LE03", "VC2E3LY01", "VC2E3LY10", "VC2E3LY11"],
    },
    {
      keywords: ["wongutha tales: bawoo stories", "wongutha"],
      title: "Wongutha tales: Bawoo stories and Badudu stories",
      themes: ["Country", "identity", "Indigenous links"],
      goals: [
        "Analysing and reflecting on the portrayal of characters and settings in the text",
        "Interpreting the underlying message of the story",
      ],
      writingGenre: "Writing a reflective text response",
      vocab: "Aboriginal and Torres Strait Islander, culture, narrative, Wongutha, inference, analysing, culture, setting, good sport, making connections",
      codes: ["VC2E3LE01", "VC2E3LE02", "VC2E3LE03", "VC2E3LE05", "VC2E3LY10", "VC2E3LY11"],
    },
    {
      keywords: ["strangers on country", "strangers"],
      title: "Strangers on Country",
      themes: ["Belonging", "history", "Indigenous links"],
      goals: [
        "Building background knowledge about the historical and cultural context of Strangers on Country",
        "Developing comprehension skills by identifying key events, character relationships and perspectives, using both literal and inferred meaning to deepen understanding",
        "Analysing character experiences and choices, considering how they reflect the key messages",
        "Writing about events in the text and their connection to key messages",
      ],
      writingGenre: "Diary entry, Report",
      vocab: "Country, castaway, colonisers, convicts, runaway, cognisant, humanity, inland, insight, refuge, wrecked, initiation, tending, abandoned, gratitude, shipwreck, struggles, dazzling, kidnapped, musket, petrified, perspective, bewildered, exorcise, indifferent, sacred, desperation, impatiently, mainland, trembled, wreckage, entrusted, irritate, sensation, cannibals, savage, verbatim, direct quote, key message, significant event",
      codes: ["VC2E3LA04", "VC2E3LA10", "VC2E3LA11", "VC2E3LE01", "VC2E3LE02", "VC2E3LE03", "VC2E3LY01", "VC2E3LY08", "VC2E3LY09", "VC2E3LY10", "VC2E3LY11", "VC2E3LY12"],
    },
    {
      keywords: ["mess that we made"],
      title: "The mess that we made",
      themes: ["Environment", "sustainability", "responsibility"],
      goals: [
        "Explaining how illustrations show the problem, action and solution in the text",
        "Understanding the impact of pollution on marine life",
        "Mapping cause-and-effect relationships in The mess that we made",
        "Writing an exposition as a response to the text.",
      ],
      writingGenre: "Exposition",
      vocab: "garbage patch, gyre, marine ecosystems, microplastics, decompose, discarded, disposable, macroplastics, megaplastics, mesoplastics, current, landfill, reclaimed, recycle, welded, action, problem, solution, ecosystem, recycle, reduce, exposition, position, protect, compound sentences, paragraph, topic sentence, incorporate, call to action, conservation",
      codes: ["VC2E3LA03", "VC2E3LA04", "VC2E3LA10", "VC2E3LA11", "VC2E3LE02", "VC2E3LE03", "VC2E3LE04", "VC2E3LY09", "VC2E3LY10", "VC2E3LY11"],
    },
    {
      keywords: ["elephant"],
      title: "The elephant",
      themes: ["Grief", "friendship", "support"],
      goals: [
        "Using a multi-paragraph outline to plan a continuation narrative",
        "Drafting a narrative including a beginning, middle and end",
        "Using a checklist and rubric to edit and revise a narrative",
      ],
      writingGenre: "Narrative",
      vocab: "berated, bewildered, bicker, burly, celebratory, cocooned, contagious, geraniums, glumly, intention, metaphor, mission, mourners, obstinate, oblivious, persistent, plastered, precariously, reunited, resonated, sauntered, seclusion, soothing, sprawling, stately, stubbornness, sulked, taunting, unleashed, weary, wisps",
      codes: ["VC2E3LE01", "VC2E3LE02", "VC2E3LE03", "VC2E3LE04", "VC2E3LE05", "VC2E3LY01", "VC2E3LY02", "VC2E3LY07", "VC2E3LY10", "VC2E3LY11", "VC2E3LY12"],
    },
    {
      keywords: ["old possum's book of practical cats", "practical"],
      title: "Old Possum's book of practical cats and MoonFish",
      themes: ["Poetry", "humour", "animals"],
      goals: [
        "Analysing the key features of poetry",
        "Using evidence from the text to answer text dependent questions",
        "Demonstrating an understanding of key ideas, characters and themes from the poems studied",
        "Identifying and explaining the use of poetic devices such as rhyme, rhythm, repetition, onomatopoeia, descriptive language, tone and punctuation for effect",
      ],
      writingGenre: "Poetry, Newspaper article",
      vocab: "contemplation, dames, dignified, hatter, ineffable, inscrutable, peculiar, perpendicular, disorderly louts, hearth, hustle and bustle, idle, tatting, wanton, airs and graces, caper, caterwaul, gavotte, repose, roly-poly, conjuring, cunning, illusions, legerdemain, prestidigitation, scoff, alibi, bafflement, depravity, levitation, bother, frown, karate, crowd, fountain, repetition, anticipate, anticlockwise, antidote, antiseptic, antisocial, antsy, trance, clatter, honk, slash, yammer, stanza, rhythm, onomatopoeia, repetition, descriptive language",
      codes: ["VC2E3LA02", "VC2E3LA03", "VC2E3LA07", "VC2E3LA10", "VC2E3LA11", "VC2E3LE01", "VC2E3LE03", "VC2E3LE04", "VC2E3LE05", "VC2E3LY04", "VC2E3LY05", "VC2E3LY10", "VC2E3LY11"],
    },
    {
      keywords: ["sugarcane kids", "sugarcane"],
      title: "The sugarcane kids and the red bottomed boat",
      goals: [
        "Analysing a mentor text to understand the purpose and key features of a news article",
        "Using a multi-paragraph outline to plan a news article",
        "Writing a news article including an introduction, body paragraphs and conclusion",
        "Using a checklist and rubric to edit and refine a reflective writing response",
      ],
      writingGenre: "Newspaper article",
      vocab: "accused, alliance, appeal, apprenticeship, armoured, arrested, ballistic, bargain, bittersweet, bitumen, blackmailing, cane knife, cleat, closure, conspiracy, current, deckhand, defence, dilemma, estuary, evidence, expedition, framed, guilty, harassed, hauling, innocent, jury, legend, leering, loyalty, lurking, luxury, mackerel, Māori, mangrove, mulching, neighbourhood watch, opportunity, quivering, sanctuary, satay, savage, scrabbling, sentence, Sherlock Holmes, simile, smuggler, sugarcane, suspense, tinny, trial, truce, verdict, vivid",
      codes: ["VC2E3LA01", "VC2E3LA02", "VC2E3LA04", "VC2E3LA07", "VC2E3LA08", "VC2E3LA10", "VC2E3LA11", "VC2E3LE01", "VC2E3LE02", "VC2E3LE03", "VC2E3LE04", "VC2E3LY01", "VC2E3LY08", "VC2E3LY09", "VC2E3LY10", "VC2E3LY11", "VC2E3LY12", "VC2E3LY13"],
    },
  ],
  "Level 4": [
    {
      keywords: ["tale of despereaux", "despereaux"],
      title: "The tale of Despereaux",
      themes: ["Friendship", "hope", "love"],
      goals: [
        "Understanding how characters challenge rules, make difficult choices and seek justice",
        "Identifying key events and character motivations, using both literal and inferred meaning",
        "Exploring key messages such as bravery, fairness and individuality",
        "Developing persuasive writing skills by using clear reasons, emotional appeals and evidence from the text",
        "Planning, drafting and editing a persuasive text",
      ],
      writingGenre: "Persuasive writing",
      vocab: "castle, kings, knights, medieval, servants, societal hierarchy, cripes, despair, scurrying, conform, fair maiden, indulge, council, honour, scat, staccato, thimble, tribunal, decrees, egregious, perfidy, renounce, repent, sacred, destiny, ominous, ritual, abyss, implications, pinwheeled, hark, illuminated, teetering, inordinate, solace, torment, banquet, dank, enchanted, light-bedazzled, minstrels, ornate, clout, daintily, slumbering, permeated, plump, revenge, shortcomings, slow-witted, tapestries, aspirations, portentous, sophosy, skedaddle, hindquarters, comeuppance, empathetic, forgiveness, fortune-tellers, beatific, halo, quest, emboldened, inspiring, wafted, cornucopia, gloom, manoeuvring, anticipated, thwarted, atone,",
      codes: ["VC2E4LA02", "VC2E4LA03", "VC2E4LA06", "VC2E4LA09", "VC2E4LA10", "VC2E4LE02", "VC2E4LE03", "VC2E4LE04", "VC2E4LY07", "VC2E4LY10", "VC2E4LY11"],
    },
    {
      keywords: ["greek myths"],
      title: "Greek myths",
      themes: ["Myth", "morality", "power"],
      goals: [
        "Building background knowledge about Greek myths and characters",
        "Developing comprehension skills to understand and connect plot events and character relationships through literal and inferred meaning",
        "Analysing character choices and their consequences, exploring ideas and details from the text",
      ],
      writingGenre: "Writing character analysis paragraphs",
      vocab: "mythology, worship, inspiration, lineage, uniting, version, appease, cunning, heir, jealous, labyrinth, admiration, constellation, hollowed, summoned, commanded, conflicting, seize, self-sacrifice, quayside, devoured, procession, symbolism, lurched, mingling, sickly, stench, command, crevice, strategy, trickster, constellation, surging, unfurled, hero, deities, historians, underworld, dubiously, immortals, lustrous, trembling, grief, mortality, scant, withered, compromise, descend, desolate, rituals, love, change, power",
      codes: ["VC2E4LA03", "VC2E4LA05", "VC2E4LA10", "VC2E4LY01", "VC2E4LY06", "VC2E4LY08", "VC2E4LY09", "VC2E4LY10", "VC2E4LY11", "VC2E4LY12"],
    },
    {
      keywords: ["ancient greece", "ancient"],
      title: "Ancient Greece",
      themes: ["History", "culture", "non-fiction"],
      goals: [
        "Identifying and analysing the structure and text features of information reports",
        "Recognising and applying language features such as tense, expanded noun groups, and adverb groups to describe and organise information effectively",
        "Taking notes, categorising facts, and evaluating literal and inferential statements from the text",
        "Composing an information report on Ancient Greece",
      ],
      writingGenre: "Text responses, Information report",
      vocab: "ancient, legendary, slayed, luxurious, worshipped, altars, democratic, shepherd, Olympus, offerings, athlete, Olympics, tunic, Acropolis, temple, Agora, civilisation, deities, adverb group, expanded noun group, information report, topic sentence,",
      codes: ["VC2E4LA03", "VC2E4LA05", "VC2E4LA10", "VC2E4LE01", "VC2E4LE03", "VC2E4LY01", "VC2E4LY07", "VC2E4LY09", "VC2E4LY11", "VC2E4LY12"],
    },
    {
      keywords: ["wonder"],
      title: "Wonder",
      goals: [
        "Analysing key scenes in the film Wonder to identify character traits, behaviour and first impressions",
        "Comparing how characters respond to events to understand relationships and motivations",
        "Identifying themes such as kindness, empathy and acceptance using evidence from the film",
        "Planning a journal entry from a character’s perspective using a multi-paragraph outline and presenting the plan to an audience",
        "Writing and editing a journal entry that reflects a character’s thoughts and feelings about an important event",
      ],
      writingGenre: "Descriptive",
      vocab: "Ordinary, petrified, Treacher Collins syndrome, wonder, elective, supposedly, courage, judge, aspire, precept, scholarship, perspective, betrayal, peer pressure, empathy, forgive, guilt, redemption, motivation, conflict, resilience, exemplary, greatness, strength",
      codes: ["VC2E4LA01", "VC2E4LA02", "VC2E4LA11", "VC2E4LA12", "VC2E4LE03", "VC2E4LE04", "VC2E4LE05", "VC2E4LY01", "VC2E4LY02", "VC2E4LY08", "VC2E4LY09", "VC2E4LY10", "VC2E4LY11"],
    },
    {
      keywords: ["always was, always will be", "always"],
      title: "Always was, always will be",
      themes: ["History", "protest", "Indigenous links"],
      goals: [
        "Using a multi-paragraph outline to plan a reflective writing response",
        "Drafting a reflective writing response about Aboriginal and Torres Strait Islander peoples’ resistance and reconciliation, using past, present and future tense",
        "Using a checklist and rubric to edit and revise a reflective writing response",
      ],
      writingGenre: "Text response",
      vocab: "activism, advocate, advisory, affairs, anthem, anonymous, assimilation, authorities, blemished, census, civil rights, clan, coalition, commemorate, consent, constitution, corroboree, culture, degradation, descendants, devastated, dignitaries, discrimination/discriminated, economic, elect, enshrined, equal opportunity commission, federation, healing, heritage, historic, inappropriately, inclusion, incidents, indignity, inflicted, initially, injustice, irony, misinformation, mistreatment, mob, native title, oral tradition, parliament, petitions, policies, premierships, prejudice, profile, protest, provisional, rallies, referendum, reflection, regulations, reconciliation, renowned, representation, requiem, resistance, sacred sites, strike, successive, superior, tense, trek, troops, unbowed, wary, western",
      codes: ["VC2E4LA03", "VC2E4LA08", "VC2E4LA10", "VC2E4LE02", "VC2E4LE04", "VC2E4LY01", "VC2E4LY03", "VC2E4LY06", "VC2E4LY08", "VC2E4LY09", "VC2E4LY10", "VC2E4LY11"],
    },
    {
      keywords: ["this is home: essential australian poems for children", "australian"],
      title: "This is home: Essential Australian poems for children",
      themes: ["Poetry", "culture", "emotion"],
      goals: [
        "Understanding and explaining the meaning of a poem",
        "Identifying how the poet is trying to make the reader feel",
      ],
      writingGenre: "Identifying and describing poetic techniques, Analysing how structure supports meaning, Text response, Poetry",
      vocab: "ancient, beams, billabong, billy, brand, cling, coursing, foals, gouge, grub, hearty, homestead, horizons, joey, jumbuck, lean, lingering, lithe, menacingly, purring, rattling, ringbarked, sealing wax, scented, scold, scuttle, squatter, swagman, trailblazer, tucker",
      codes: ["VC2E4LA01", "VC2E4LA02", "VC2E4LA03", "VC2E4LA07", "VC2E4LA09", "VC2E4LA10", "VC2E4LE02", "VC2E4LE04", "VC2E4LY08", "VC2E4LY09", "VC2E4LY10"],
    },
  ],
  "Level 5": [
    {
      keywords: ["blueback"],
      title: "Blueback",
      themes: ["Nature", "family", "conservation"],
      goals: [
        "Understanding how writers use voice to convey different points of view",
        "Understanding the author’s message through the characters perspectives",
        "Writing a persuasive text using evaluative and figurative language, technical vocabulary and complex sentences.",
      ],
      writingGenre: "Persuasive text",
      vocab: "alliteration, anxiety, argument, audience, author’s note, author’s purpose, campaigned, camera angle, close-up, compassion, complex sentence, conservation, crafty, desolate, determined, dinghy, draft, editing, emotive language, empathy, environment, evaluative language, evidence, feedback, figurative language, first-person point of view, foreboding, imagery, independent, inference, influence, isolation, jetty, justification, landscape, letter to the editor, long shot, luminous, lurking, mentor, metaphor, modality, mosaic, observant, pane, paragraph, patron, perspective, persuasive language, persuasive writing, planning, prediction, publish, punctuation, quaked, quivered, remote, responsibility, revision, simile, structure, suspense, technical vocabulary",
      codes: ["VC2E5LA03", "VC2E5LA08", "VC2E5LE02", "VC2E5LE03", "VC2E5LE04", "VC2E5LE05", "VC2E5LY01", "VC2E5LY06", "VC2E5LY08", "VC2E5LY09", "VC2E5LY10", "VC2E5LY11", "VC2E5LY12"],
    },
    {
      keywords: ["music for tigers", "tigers"],
      title: "Music for tigers",
      themes: ["Nature", "friendship", "identity"],
      goals: [
        "Understanding how the author uses the themes and key messages of the text to influence the plot and character development",
        "Understanding and using the structure and language features of a personal journal entry, including the date, paragraphs and personal reflection",
      ],
      writingGenre: "Descriptive",
      vocab: "adversity, aesthetic, allegedly, allies, antagonist, atmosphere, audience, author’s purpose, bounty, cacophony, captive, central message, character development, character traits, climax, cohesion, cohesive devices, compassion, concluding statement, conflict, confrontation, consumer, contemplated, deforestation, desperate, determination, dialogue, dismissed, disapproving, dread, edit, elusive, enveloped, ethical, evolving, evidence, expeditions, exploitation, extinct, extinction, external conflict, figurative language, first person, flow, foliage, foreshadowing, gunpoint, habitat, huddled, imagery, imitation, implied, inferred, illegal, invasive, interjection, internal conflict, isolated, justification, linking, lurked, manipulation, menacing, mood, morsel, motivations, muted, narrative technique, obstacles, obscured, orientation, oscillated, pacing, paragraphing, perched, personal growth, plan, point of view, proofread, protagonist, protection, relationships, relentless, resolution, revise, sensory language, sentence structure, setting, shift, significant, solution, staunch, stated, struggles, structure, sufficiently, summarise, supportive, taunting, tense, terrifying, text type, theme, threatened species, time connectives, transformation, treacherous, trust, unease, unwilling, upright, vacantly, vehemently, vicious, vivid, whimpering, wildlife trade",
      codes: ["VC2E5LE02", "VC2E5LE03", "VC2E5LE04", "VC2E5LE05", "VC2E5LY08", "VC2E5LY09", "VC2E5LY10", "VC2E5LY11"],
    },
    {
      keywords: ["bindi"],
      title: "Bindi",
      themes: ["Culture", "nature", "Indigenous links"],
      goals: [
        "Understanding how the author uses the plot and character development to progress the themes and key messages of the text",
        "Understanding and using the structure and language features of an information report, including appropriate tense, voice and use of technical vocabulary",
      ],
      writingGenre: "Information report",
      vocab: "acceptance, Aboriginal, aftermath, assimilation, author’s purpose, autobiographical, belonging, biodiversity, bushfire, caring for country, catastrophe, change, character arc, character traits, climate, colonisation, community, compassion, connection, connection to country, conservation, conserve, contrast, cool burning, country, cultural burning, cultural identity, culture, custodian, custodianship, death, displacement, dispossession, drought, ecosystem, elders, emergency services, environment, evacuation, fire management, flood, fuel load, generations, growth, hazard, healing, hope, identity, impact, inclusion, Indigenous, injustice, illustrations, isolation, kinship, land management, land stewardship, life, loss, motivation, narrative, natural disaster, oral storytelling, parallel storyline, perspective, place, policies, recovery, reflection, regeneration, regrowth, relationships, removal, removed from country, renewal, representation, resilience, respect, responsibility, sense of self, separation, setting, strength, structure, support, sustainability, symbolism, theme, timeline, traditional knowledge, traditional owner/s, traditional owners, traditional practices, trauma, trust, values",
      codes: ["VC2E5LA01", "VC2E5LA02", "VC2E5LA03", "VC2E5LA04", "VC2E5LY06", "VC2E5LY09", "VC2E5LY10", "VC2E5LY11"],
    },
    {
      keywords: ["blue cat"],
      title: "The blue cat",
      themes: ["Identity", "history", "resilience"],
      goals: [
        "Understanding how historical artefacts can be used as inspiration to create a story in four parts",
        "Understanding how narrative techniques, such as figurative language and varied sentence structures, can be used to enhance stories and represent historical events accurately",
      ],
      writingGenre: "Narrative",
      vocab: "absorbing, aggressive, alliance, allied forces, anxiety, apprehensive, architecture, ascertained, athletically, atmosphere, attack, axis powers, bizarre, brooding, calamity, cerulean, change, character, characterisation, civilians, composed, connection, conquest, context, convened, courage, cultural forces, Dainippon, daylight saving time, deflated, demeanour, deployed, desolate, discrepancy, displaced person, dismissed, documented, dramatise, distracted, embellishment, empire, enclosure, ensure, evacuation, exasperated, exposition, fastened, fear, figment, figurative language, flashback, foreshadowing, friendship, fussy, Hinaan, hope, hypocrisy, idiom, implied, innocence, in between, intentions, intense, intimidated, internment camp, invasion, Japanese Canadian, kiwifruit, metaphor, meticulous, missive, motivation, mounted, nan, nil desperandum, nostalgic, notation, objected, occupation, orientation, outbreak, pearl harbour, permeated, pensive, perspective, phobia, phrasal verb, points of view, precipice, premonition, prolific, prophet, propose, ration, recount, recurring, refugee, refugees, relevance, remnants, repelled, repetition, resettled, resistance, reconcile, reverie, scandalised, scanned, Shinto, simile, sleek, speculate, stateless person, suspended, symbolism, sympathetic, tabby, talisman, theatre of war, theme, tinged, traits, transformation, transformed, trauma, unresolved, vivid, vulnerable, war, wry, yearned",
      codes: ["VC2E5LA01", "VC2E5LA03", "VC2E5LA04", "VC2E5LA07", "VC2E5LE01", "VC2E5LE02", "VC2E5LE03", "VC2E5LE04", "VC2E5LE05", "VC2E5LY02", "VC2E5LY07", "VC2E5LY09", "VC2E5LY10", "VC2E5LY11"],
    },
  ],
  "Level 6": [
    {
      keywords: ["skellig"],
      title: "Skellig",
      themes: ["Friendship", "family", "love"],
      goals: [
        "Understanding narrative devices of hooks and foreshadowing",
        "Exploring how characters change throughout a story",
        "Examining how an author uses a narrative arc to develop the story plot",
        "Understanding how symbols are used in a narrative to invite the reader to reflect on the story",
        "Using language to build description, imagery and tension",
      ],
      writingGenre: "Narrative, Poetry",
      vocab: "abruptly, alarming, amused, archaic language, atmosphere, beatific, bewildered, bewilderment, blackened, cautiously, character development, character relationships, character traits, compassion, compassionate, conflict, contentment, crumbling, demolition, descriptive language, dignity, disgust, drifter, elated, empathy, enormous, filthy, first person narrative voice, flashback, foreshadowing, fretted, ghastly, gloom, gratitude, grumpily, heedlessly, hoarse, hunched, imagery, inference, internal, lurched, metaphor, mood, narrative arc, narrative device, narrative hook, point of view, plywood, reaction, reflection, reassuring, relieved, reluctantly, resilient, resolution, ruin, sarcasm, scratched, scrawny, selfless, sequence, speaking style, supporting character, symbol, symbolism, tension, wilderness",
      codes: ["VC2E6LA03", "VC2E6LA06", "VC2E6LE01", "VC2E6LE02", "VC2E6LE03", "VC2E6LE04", "VC2E6LE05", "VC2E6LY05", "VC2E6LY07", "VC2E6LY08", "VC2E6LY09", "VC2E6LY10", "VC2E6LY11"],
    },
    {
      keywords: ["sister heart", "sister"],
      title: "Sister heart",
      themes: ["Identity", "resilience", "Indigenous links"],
      goals: [
        "Connecting the historical, cultural and social experiences of Aboriginal and Torres Strait Islander peoples to the meaning of a text",
        "Understanding and using the structure and language features of free verse, such as stanzas, enjambment, figurative language and alliteration",
        "Writing a free verse stanza as a text response",
      ],
      writingGenre: "Free verse writing",
      vocab: "assimilation, barge, baroque, cajoled, Chief Protector of Aborigines, culture, cycle of violence, dispossessed, disruption, domestics, dormitory, dramatic irony, elders, evacuate, feverish, ferocity, free verse, glittering, government policy, guttersnipe, identity, indigenous background, integrated, jetty, kin, language features, lumped, mutely, narrative voice, novel in verse, numbed, oblivious, outback, panicked, poetry, prized, prologue, ragged, reconciliation, scarred, shuddery, silhouette, sooty, spiritual, spit, stolen generations, stomped, symbol, theme, verse novel, vivid, wharf",
      codes: ["VC2E6LE01", "VC2E6LE02", "VC2E6LE03", "VC2E6LE04", "VC2E6LE05", "VC2E6LY01", "VC2E6LY07", "VC2E6LY08", "VC2E6LY09", "VC2E6LY10"],
    },
    {
      keywords: ["how to bee"],
      title: "How to bee",
      themes: ["Nature", "family", "hope"],
      goals: [
        "Developing factual and technical knowledge to support a news report, selecting and organising facts to clearly inform the reader",
        "Applying journalistic structure and language to a news report, using a formal third-person journalistic voice, incorporating direct and indirect speech, and including modality and emotive language to engage the audience",
        "Embedding theme and purpose in writing, adapting language and structure to persuade and inform and showing awareness of audience and purpose",
      ],
      writingGenre: "News report",
      vocab: "advocacy, agency, agriculture, angle, audience, author’s purpose, belonging, bias, body paragraphs, call to action, catalyst, change, character arc, character development, character traits, climate change, climax, colony, community, compare, complication, conclusion, conflict, conservation, contrast, credibility, culture, dystopian, ecological degradation, elaborate, emotive language, empathy, empowerment, evidence, explanation, fact, fertilises, global solution, habitat, headline, heritage, hope, identity, inclusion, inclusive language, infer, inference, injustice, inspiration, interpretation, kinship, lead sentence, legacy, modality, motivation, motivations, narrative perspective, native, news report, optimism, orientation, perseverance, perspective, pollination, productivity, protagonist, purpose, reliable, resolution, resilience, rhetorical question, similarities, social action, social injustice, social justice, solidarity, structure, summarise, sustainable, target audience, text response, tone, tradition, transformation, turning point, unreliable, utopia, values, viewpoint, voice, world-building, worldview, zero-waste",
      codes: ["VC2E6LA03", "VC2E6LA05", "VC2E6LE01", "VC2E6LE02", "VC2E6LE03", "VC2E6LY07", "VC2E6LY08", "VC2E6LY09", "VC2E6LY10"],
    },
    {
      keywords: ["lost thing"],
      title: "The lost thing",
      themes: ["Identity", "belonging", "symbolism"],
      goals: [
        "Analysing how visual and sound elements create meaning in print and moving image texts",
        "Planning, drafting and revising a print and moving image comparison, using evaluative and comparative language",
        "Summarising key ideas from a print and moving image comparison into a multimedia presentation",
        "Delivering an oral presentation using appropriate language and use of voice",
      ],
      writingGenre: "Film and text",
      vocab: "agree, ambience, anonymous, applied industrial algebra, artefacts, assassinated, atmosphere, audience, audio effect, censorship, cohesion, colour palette, composition, conclude, concluding statement, connection, contrast, contradictory, costume, dialogue, diegetic sound, dilemma, dramatic, dystopian, eerie, empathy, evaluate, evidence, facial expressions, foreground, gesture, homogeneous, inconsequential, intricacies, intrigued, justify, lighting, menial, mood, moral, motivation, mysterious, narration, non-diegetic sound, off-kilter, opinion, pace, paragraph, peculiar, perspective, persuasive, profound, props, pseudo-Latin, public consumption, reclassified, relationship, restate, response, sentence structure, setting, silence, situation, slouched, sound effect, soundtrack, steampunk, suburbia, summary, symbolism, synthesize, tagline, thesis, tirelessly, tone, topic sentence, trait, visual element, volume",
      codes: ["VC2E6LA01", "VC2E6LA03", "VC2E6LA04", "VC2E6LA05", "VC2E6LA07", "VC2E6LE01", "VC2E6LE02", "VC2E6LE03", "VC2E6LY02", "VC2E6LY07", "VC2E6LY08", "VC2E6LY09", "VC2E6LY10"],
    },
  ],
  "Level 7": [],
  "Level 8": [],
  "Level 9": [],
  "Level 10": [],
};

export const MATHS_OVERVIEWS = {
  "Foundation": [
    {
      keywords: ["knowing numbers", "knowing", "numbers"],
      name: "Knowing numbers",
      goals: [
        "Knowing and identifying numeral names, recognising symbols and quantities",
        "Representing and ordering numbers, including zero to at least 20",
        "Understanding how to use physical and virtual materials to understand quantities up to 20",
      ],
      codes: ["VC2MFN01", "VC2MFN02", "VC2MFN03"],
    },
    {
      keywords: ["counting collections", "counting", "collections"],
      name: "Counting collections",
      goals: [
        "Knowing that counting tells how many things are in a set",
        "Knowing the last number counted is the 'size' of the quantity",
        "Using partitioning and to combine collections up to 10 using part-part-whole relationships",
        "Understanding and demonstrating reasoning to quantify and comparing collections using counting",
      ],
      codes: ["VC2MFN01", "VC2MFN02", "VC2MFN03"],
    },
    {
      keywords: ["additive thinking", "additive", "thinking"],
      name: "Additive thinking",
      goals: [
        "Recognising addition as putting together 2 amounts or adding to an amount",
        "Recognising subtraction as taking away from an amount or breaking apart an amount into parts",
        "Modelling addition and subtraction using concrete materials, drawings, number bonds and number sentences",
        "Solving addition and subtraction problems within 10 including contexts involving money",
      ],
      codes: ["VC2MFN02", "VC2MFN03", "VC2MFN04", "VC2MFN05"],
    },
    {
      keywords: ["creating and continuing patterns", "creating", "patterns"],
      name: "Creating and continuing patterns",
      goals: [
        "Identifying patterns",
        "Continuing shape and colour patterns",
        "Identifying ab, ABC, AABB, AAB and ABB pattern structures",
        "Creating different types of patterns",
        "Identifying missing elements of patterns",
      ],
      codes: ["VC2MFA01"],
    },
    {
      keywords: ["location and time", "location"],
      name: "Location and time",
      goals: [
        "Describing the location of an object or person",
        "Sequencing days of the week and times of the day in order",
        "Connecting familiar events to times of the day and days of the week",
        "Comparing the duration of events",
      ],
      codes: ["VC2MFN02", "VC2MFM01", "VC2MFM02", "VC2MFSP02"],
    },
    {
      keywords: ["multiplicative thinking", "multiplicative", "thinking"],
      name: "Multiplicative thinking",
      goals: [
        "Identifying equal shares",
        "Sharing collections into equal groups",
        "Making equal groups",
        "Identifying the total of a collection",
      ],
      codes: ["VC2MFN03", "VC2MFN05", "VC2MFN06"],
    },
    {
      keywords: ["comparing lengths", "comparing", "lengths"],
      name: "Comparing lengths",
      goals: [
        "Directly comparing objects by their length",
        "Understanding that the starting point is important when comparing the length of two or more objects",
        "Understanding and using the vocabulary of length",
        "Using informal units to measure length (level 1 objective)",
      ],
      codes: ["VC2MFM01", "VC2MFN01", "VC2MFN02", "VC2MFN03", "VC2MFSP02"],
    },
    {
      keywords: ["measuring mass", "measuring"],
      name: "Measuring mass",
      goals: [
        "Recognising addition as putting together 2 amounts or adding to an amount",
        "Recognising subtraction as taking away from an amount or breaking apart an amount into parts",
        "Modelling addition and subtraction using concrete materials, drawings, number bonds and number sentences",
        "Solving addition and subtraction problems within 10 including contexts involving money",
      ],
      codes: ["VC2MFM01", "VC2MFN01", "VC2MFST01"],
    },
    {
      keywords: ["shapes"],
      name: "Shapes",
      goals: [
        "Describing the location of an object or person",
        "Sequencing days of the week and times of the day in order",
        "Connecting familiar events to times of the day and days of the week",
        "Comparing the duration of events",
      ],
      codes: ["VC2MFSP01", "VC2MFSP02", "VC2MFN02", "VC2MFST01"],
    },
  ],
  "Year 1": [
    {
      keywords: ["place value", "place", "value"],
      name: "Place value",
      goals: [
        "Understanding that 10 ones is the same as 1 ten",
        "Recognising and counting collections of 10s with accuracy and efficiency",
        "Representing name and record numbers 20-120",
        "Recognising and think about different-sized quantities",
        "Recognising and continue counting patterns",
      ],
      codes: ["VC2M1N01", "VC2M1N02", "VC2M1N03"],
    },
    {
      keywords: ["creating and continuing number patterns", "creating", "number", "patterns"],
      name: "Creating and continuing number patterns",
      goals: [
        "Understanding and recognising the repeating unit of patterns",
        "Continue and creating patterns with different repeating units",
        "Skip counting by 2s, 5s and 10s from zero",
        "Skip counting from non-zero numbers",
        "Recognising missing numbers and continue skip counting sequences",
      ],
      codes: ["VC2M1A01", "VC2M1A02"],
    },
    {
      keywords: ["additive thinking", "additive", "thinking"],
      name: "Additive thinking",
      goals: [
        "Applying addition and subtraction strategies to combine and separate quantities",
        "Understanding the relationship between addition and subtraction to find the unknown in any position of the number sentence",
        "Developing skills to calculate difference and quantity unknown for subtraction situations",
        "Solving mathematical problems for practical situations including simple money transactions",
      ],
      codes: ["VC2M1N02", "VC2M1N04", "VC2M1N05"],
    },
    {
      keywords: ["informal measurement", "informal", "measurement"],
      name: "Informal measurement",
      goals: [
        "Knowing how to make reasonable estimates of the length, mass and capacity of objects",
        "Understanding and using the vocabulary to describe length, mass and capacity",
        "Knowing how to order objects of length, mass and capacity using direct and indirect comparison",
        "Using uniform informal units to measure length",
      ],
      codes: ["VC2M1N01", "VC2M1M01", "VC2M1N03", "VC2M1M02"],
    },
    {
      keywords: ["shapes and objects", "shapes", "objects"],
      name: "Shapes and objects",
      goals: [
        "Knowing how to compare and classify 2D shapes using properties",
        "Describing and comparing 3D objects",
        "Recognising familiar shapes and objects in the environment",
      ],
      codes: ["VC2M1SP01", "VC2M1ST01"],
    },
    {
      keywords: ["multiplicative thinking", "multiplicative", "thinking"],
      name: "Multiplicative thinking",
      goals: [
        "Using skip counting to count collections",
        "Using skip counting to solve problems",
        "Partitioning collections into equal shares and groups",
        "Solving division problems using equal sharing and grouping",
      ],
      codes: ["VC2M1N01", "VC2M1N03", "VC2M1N06"],
    },
    {
      keywords: ["time and duration", "duration"],
      name: "Time and duration",
      goals: [
        "Naming the days of the week and months of the year in order",
        "Using ordinal numbers to sequence events",
        "Reading and writing dates and locating them on a calendar",
        "Estimate and comparing the duration of events in seconds, minutes, hours, days, weeks, months and years",
        "Reading clocks to the hour and half-hour",
        "Being familiar with alternative tools for telling time, including sundials",
      ],
      codes: ["VC2M1M01", "VC2M1SP02", "VC2M1M03"],
    },
    {
      keywords: ["investigating data", "investigating"],
      name: "Investigating data",
      goals: [
        "Formulating an investigative question",
        "Collecting and sorting data for categorical variables",
        "Creating data displays that clearly communicate findings (including pictographs, tally charts and bar graphs)",
        "Comparing and analysing data and draw conclusions from data displays",
      ],
      codes: ["VC2M1ST01", "VC2M1ST02"],
    },
  ],
  "Year 2": [
    {
      keywords: ["place value", "place", "value"],
      name: "Place value",
      goals: [
        "Recognising represent and ordering numbers to at least 1000 using physical and virtual materials",
        "Using symbols (numerals), number lines and other representations to build number sense",
        "Partitioning, rearranging, regrouping and renaming two- and three-digit numbers",
        "Understanding and using standard and non-standard groupings to represent a number in multiple ways",
        "Recognising the role of a zero digit in place value representation of number",
      ],
      codes: ["VC2M2N01", "VC2M2N02", "VC2M2N04"],
    },
    {
      keywords: ["directions, turns and pathways", "directions turns and pathways", "directions", "turns", "pathways"],
      name: "Directions, turns and pathways",
      goals: [
        "Using and follow directions",
        "Using accurate language to give directions",
        "Giving and receiving directions",
      ],
      codes: ["VC2M2M05", "VC2M2SP02"],
    },
    {
      keywords: ["additive thinking", "additive", "thinking"],
      name: "Additive thinking",
      goals: [
        "Recalling addition and subtraction facts to 20 and within 20",
        "Adding and subtracting 1- and 2-digit numbers, including recognition of the sum",
        "Applying place value knowledge to efficiently solve addition and subtraction problems",
        "Using the jump, split and compensation strategies to add and subtract",
      ],
      codes: ["VC2M2N02", "VC2M2N04", "VC2M2A02", "VC2M2N06"],
    },
    {
      keywords: ["introducing fractions", "introducing", "fractions"],
      name: "Introducing fractions",
      goals: [
        "Understanding partitioning of fractions (for example, one-half as one of 2 equal parts of a whole)",
        "Partitioning with halves, quarters and eighths through (multiplicative) repeated halving",
        "Applying fraction constructs using shapes, collections and lengths",
        "Using repetition of unit fractions to find the whole",
      ],
      codes: ["VC2M2N02", "VC2M2M02", "VC2M2N03"],
    },
    {
      keywords: [
        "multiplicative thinking",
        "measurement",
        "length, mass and capacity",
        "skip counting",
        "arrays", "multiplicative thinking and measurement length mass capacity", "multiplicative", "thinking", "length", "capacity"],
      name: "Multiplicative thinking and measurement (length, mass, capacity)",
      goals: [
        "Demonstrating proficiency of multiplication facts for 2s",
        "Using arrays to represent multiplication and division",
        "Solving division problems using partitioning",
        "Representing and solving division problems using equal groupings",
        "Using arrays to solve multiplicative problems",
        "Using appropriate tools for measuring length, mass and capacity",
        "Describing different attributes of length, mass and capacity",
        "Representing measurement findings graphically",
      ],
      codes: ["VC2M2N05", "VC2M2A03", "VC2M2N06", "VC2M2A04", "VC2M2N04", "VC2M2ST01", "VC2M2ST02", "VC2M2M01"],
    },
    {
      keywords: ["time and statistics", "calendar", "analog clock", "picture graph", "column graph", "statistics"],
      name: "Time and statistics",
      goals: [
        "Identifying date/s and determine the number of days between events using calendars",
        "Recognising and read the time represented on an analog clock to the hour, half-hour and quarter hour",
        "Understanding time lapse in regard to the amount of turn (e.g. Quarter, half, three-quarter and full measures)",
        "Collecting data and recording it in lists and tables",
        "Displaying data using picture and column graphs with appropriate labels",
        "Interpreting and comparing data to answer questions",
      ],
      codes: ["VC2M2N02", "VC2M2N04", "VC2M2ST01", "VC2M2ST02", "VC2M2M03", "VC2M2M04", "VC2M2M05"],
    },
    {
      keywords: ["algebraic patterns", "repeating patterns", "additive patterns", "algebraic", "patterns"],
      name: "Algebraic patterns",
      goals: [
        "Distinguish between repeating and additive patterns",
        "Describing additive patterns by identifying rules",
        "Creating additive patterns from given rules",
        "Representing patterns using repeated addition and multiplication",
        "Identifying missing elements of an additive pattern",
      ],
      codes: ["VC2M2A01"],
    },
  ],
  "Year 3": [
    {
      keywords: ["place value structures", "place", "value", "structures"],
      name: "Place value structures",
      goals: [
        "Knowing that our number system involves the repeated use of the Hundreds, Tens, Ones (HTO) and make connections",
        "Understanding numbers beyond 10 000, including bridging forwards and backwards",
        "Using proportional and non-proportional place value models",
        "Knowing how to order, rename and partition numbers using models such as number lines",
        "Calculating accurate solutions addition and subtraction problems with place value knowledge",
        "Using estimation and reasonableness to support calculations with large numbers",
      ],
      codes: ["VC2M3N02", "VC2M3N04", "VC2M3N06"],
    },
    {
      keywords: ["additive strategies", "additive", "strategies"],
      name: "Additive strategies",
      goals: [
        "Understanding properties of odd and even numbers in additive situations",
        "Using place value to partition and add numbers",
        "Using a range of strategies for addition (split, jump and compensation)",
        "Using a range of strategies for subtraction (jump, compensation and counting forwards to find the difference)",
      ],
      codes: ["VC2M3N01", "VC2M3N05", "VC2M3A03", "VC2M3N08"],
    },
    {
      keywords: ["multiplicative thinking", "multiplicative", "thinking"],
      name: "Multiplicative thinking",
      goals: [
        "Understanding equal groups, arrays in multiplication and division situations",
        "Using area/regions as multiplicative representations",
        "Understanding partition and measurement division with the relationship to multiplication",
        "Using mathematical modelling to solve practical problems using multiplicative strategies",
        "Knowing that even numbers are divisible by 2 (and odd numbers are not)",
        "Using estimation and reasonableness to support calculations with large numbers",
      ],
      codes: ["VC2M3N01", "VC2M3A02", "VC2M3N04"],
    },
    {
      keywords: ["exploring fractions", "exploring", "fractions"],
      name: "Exploring fractions",
      goals: [
        "Understanding the denominator represents the name/size of the parts",
        "Understanding that the numerator represents the number of parts of that name/size",
        "Using benchmarking, partitioning and iteration to understand fractions",
        "Recognising and make connections within and between unit fractions and their multiples",
        "Linking repeated halving and doubling with fractions",
      ],
      codes: ["VC2M3N03"],
    },
    {
      keywords: ["time"],
      name: "Time",
      goals: [
        "Understanding the structure of clocks and how they measure time",
        "Estimating and measuring duration of time",
      ],
      codes: ["VC2M3M03", "VC2M3M04"],
    },
    {
      keywords: ["properties of shapes and objects", "properties", "shapes", "objects"],
      name: "Properties of shapes and objects",
      goals: [
        "Identifying classify, and comparing three-dimensional objects based on their features and properties",
        "Evaluating why certain objects are more suitable for specific uses",
        "Interpreting two-dimensional representations of three-dimensional objects",
        "Developing spatial language to describe the location and position of objects and landmarks",
        "Locating and position objects within a given space using a simple grid map",
      ],
      codes: ["VC2M3SP01", "VC2M3ST01", "VC2M3SP02", "VC2M3ST03"],
    },
    {
      keywords: ["data and statistics", "chance experiments", "data cycle", "metric units", "measurement", "data statistics and measurement", "statistics"],
      name: "Data, statistics and measurement",
      goals: [
        "Describing possible outcomes and events as ‘likely’ or ‘unlikely’ and identifying some events as ‘certain’ or ‘impossible’,",
        "Knowing how to conduct chance experiments to record data",
        "Understanding the stages in the data cycle to conduct statistical investigations",
        "Using data sets to display and communicate and provide justification to questions",
        "Creating and comparing graphical representations of data sets",
        "Measuring the length, mass, and capacity of objects using formal metric units",
      ],
      codes: ["VC2M3ST01", "VC2M3P01", "VC2M3ST02", "VC2M3P02", "VC2M3ST03", "VC2M3M01", "VC2M3M02", "VC2M3A01", "VC2M3N07", "VC2M3N09", "VC2M3M05"],
    },
  ],
  "Year 4": [
    {
      keywords: ["extend place value and additive thinking", "extend", "place", "value", "additive", "thinking"],
      name: "Extend place value and additive thinking",
      goals: [
        "Reading and writing numbers greater than 10 000",
        "Recognising and extend the application of place value to tenths and hundredths, using conventional notation",
        "Using strategies with decimal numbers in additive situation",
        "Using strategies with decimal numbers in subtraction situations",
        "Solving problems using number sentences and choose efficient calculation strategies",
      ],
      codes: ["VC2M4N01", "VC2M4N05", "VC2M4N06", "VC2M4N09"],
    },
    {
      keywords: ["angles"],
      name: "Angles",
      goals: [
        "Recognising and naming acute, obtuse, straight, reflex and revolution angles",
        "Estimating and comparing angles using benchmarks such as a right angle",
        "Using angle names and benchmarks to justify comparisons between angles",
      ],
      codes: ["VC2M4N04", "VC2M4M04"],
    },
    {
      keywords: ["multiplicative thinking", "multiplicative", "thinking"],
      name: "Multiplicative thinking",
      goals: [
        "Knowing number sequences involving multiples of 3, 4, 6, 7, 8 and 9",
        "Recalling and demonstrating proficiency with multiplication facts up to 10 × 10 and related division facts",
        "Following and creating algorithms involving a sequence of steps and decisions that use multiplication",
      ],
      codes: ["VC2M4N02", "VC2M4A02", "VC2M4N10"],
    },
    {
      keywords: ["using money", "money"],
      name: "Using money",
      goals: [
        "Solving financial problems involving purchases and the calculation of change",
        "Understanding estimation and rounding for financial transactions",
        "Developing strategies for solving problems using addition, subtraction and multiplication in financial contexts",
      ],
      codes: ["VC2M4N07", "VC2M4N08"],
    },
    {
      keywords: ["understanding fractions", "understanding", "fractions"],
      name: "Understanding fractions",
      goals: [
        "Knowing equivalent representations of fractions using related denominators",
        "Counting by multiples of quarters, halves and thirds and representing these fractions as numbers on number lines",
      ],
      codes: ["VC2M4N03", "VC2M4N04"],
    },
    {
      keywords: ["statistics and probability", "statistics", "probability"],
      name: "Statistics and probability",
      goals: [
        "Formulating appropriate questions for data collection",
        "Collecting and organising data using tally marks",
        "Describing the outcomes of chance experiments",
        "Identifying the difference between independent and dependent events",
        "Organising data into a graph that effectively communicates information",
        "Identifying patterns in data from chance experiments",
      ],
      codes: ["VC2M4ST01", "VC2M4P01", "VC2M4ST02", "VC2M4P02", "VC2M4ST03"],
    },
    {
      keywords: ["measurement"],
      name: "Measurement",
      goals: [
        "Using scaled and digital instruments to measure and comparing length, mass and capacity",
        "Calculating the perimeter and area of shapes and enclosed spaces",
      ],
      codes: ["VC2M4M01", "VC2M4M02"],
    },
    {
      keywords: ["transformation and location", "transformation", "location"],
      name: "Transformation and location",
      goals: [
        "Identifying and describing line and rotational symmetry in shapes",
        "Identifying translations and rotations performed on shapes",
        "Describing rotations using angles (90, 180, 270, 360 degrees)",
      ],
      codes: ["VC2M4SP03", "VC2M4N04", "VC2M4SP04", "VC2M4A01", "VC2M4SP01", "VC2M4SP02", "VC2M4M03"],
    },
  ],
  "Year 5": [
    {
      keywords: ["decimal fractions", "decimal", "fractions"],
      name: "Decimal fractions",
      goals: [
        "Interpreting and comparing and ordering numbers with more than 2 decimal places, including numbers greater than one,",
        "Representing numbers with more than 2 decimal places on a number line",
        "Making connections with decimal fractions in real-life contexts",
      ],
      codes: ["VC2M5N01", "VC2M5N08"],
    },
    {
      keywords: ["measurement"],
      name: "Measurement",
      goals: [
        "Measuring using a combination of length units",
        "Understanding that perimeter and area are not the same",
        "Justifying units of measure when combining masses of 2 or more objects",
        "Justifying calculations and solutions when measuring capacity of objects",
      ],
      codes: ["VC2M5N01", "VC2M5M01", "VC2M5N08", "VC2M5M02"],
    },
    {
      keywords: ["fractional thinking", "fractional", "thinking"],
      name: "Fractional thinking",
      goals: [
        "Comparing order and justify the position and location of common, mixed and improper fractions on a number line",
        "Solving problems connected to fraction and decimal fraction representations, which require understanding that 100%",
        "Using written and visual strategies to add and subtract common fractions",
        "Solving problems related to discount and profit",
      ],
      codes: ["VC2M5N03", "VC2M5N05"],
    },
    {
      keywords: ["multiplicative thinking", "multiplicative", "thinking"],
      name: "Multiplicative thinking",
      goals: [
        "Identifying and explaining factors and multiples of natural numbers",
        "Using efficient mental and written strategies to solve multiplication problems",
        "Using efficient mental and written strategies to solve division problems",
        "Finding unknown values in numerical equations involving multiplication and division, using the properties of numbers and",
      ],
      codes: ["VC2M5N02", "VC2M5A01", "VC2M5N06", "VC2M5A02", "VC2M5N07"],
    },
    {
      keywords: ["algebraic reasoning", "algebraic", "reasoning"],
      name: "Algebraic reasoning",
      goals: [
        "Recognising and explaining the connection between multiplication and division as inverse operations and using this to",
        "Finding unknown values in numerical equations involving multiplication and division, using the properties of numbers and",
        "Follow, create and describing a mathematical algorithm involving branching",
        "Identifying and using the rules of divisibility",
        "Understanding and applying commutative, distributive and associative property in multiplication problems and to recognise",
      ],
      codes: ["VC2M5A01", "VC2M5N10", "VC2M5A02"],
    },
    {
      keywords: ["probability analysis", "probability", "analysis"],
      name: "Probability analysis",
      goals: [
        "Creating chance experiment outcome statements including 'equally likely' and 'not equally likely'",
        "Conducting, observing and recording repeated chance experiments, with and without 'equally likely' outcomes",
        "Using estimation and approximations when identifying limitations and effects of chance experiments",
      ],
      codes: ["VC2M5P01", "VC2M5P02"],
    },
    {
      keywords: ["static angles", "estimating angles", "measuring angles", "12-hour time", "24-hour time", "line graphs", "statistical investigation", "angles time and statistics", "angles", "statistics"],
      name: "Angles, time and statistics",
      goals: [
        "Being able to estimate angles",
        "Creating angles",
        "Measuring angles",
        "Comparing and convert 12- and 24-hour time systems",
        "Interpreting line graphs representing change over time",
        "Planning and conducting statistical investigation",
      ],
      codes: ["VC2M5M04", "VC2M5N08", "VC2M5ST02", "VC2M5ST03", "VC2M5M03"],
    },
    {
      keywords: ["transformations, grid references and grid coordinates", "transformations grid references and grid coordinates", "transformations", "references", "coordinates"],
      name: "Transformations, grid references and grid coordinates",
      goals: [
        "Using grid coordinates and directional language to communicate different shapes and contour lines",
        "Creating and using a grid coordinate system",
        "Recognising perform and describing translations, reflections and rotations of shapes",
        "Identifying the similarities and differences between grid reference and grid coordinate systems and give directions using the",
      ],
      codes: ["VC2M5SP02", "VC2M5N08", "VC2M5SP03", "VC2M5SP01", "VC2M5N04", "VC2M5N09", "VC2M5ST01"],
    },
  ],
  "Year 6": [
    {
      keywords: ["algebraic thinking", "algebraic", "thinking"],
      name: "Algebraic thinking",
      goals: [
        "Creating explain and justify observations and rules for geometric patterns",
        "Recognising justify and connect rules that connect numeric number patterns with visual and graphical representations",
        "Designing and using algorithms to generate sets of numbers and using these to justify and explaining patterns",
      ],
      codes: ["VC2M6A01", "VC2M6A03"],
    },
    {
      keywords: ["integers"],
      name: "Integers",
      goals: [
        "Identifying and locating integers on a number line",
        "Representing integers in additive situations, using number lines",
        "Solving problems using integers in financial contexts",
      ],
      codes: ["VC2M6N01", "VC2M6N09"],
    },
    {
      keywords: ["measurement investigations", "measurement", "investigations"],
      name: "Measurement investigations",
      goals: [
        "Understanding that the unit of measure relates to estimation and accuracy (the smaller the unit the greater the accuracy)",
        "Understanding and measuring area in terms of length and width",
        "Measuring calculate and comparing elapsed time in contexts",
      ],
      codes: ["VC2M6M01", "VC2M6M03"],
    },
    {
      keywords: ["multiplicative thinking", "multiplicative", "thinking"],
      name: "Multiplicative thinking",
      goals: [
        "Identifying and describing properties of numbers",
        "Multiplying and dividing numbers by powers of 10",
        "Solving problems using multiplicative situations",
        "Constructing and solving equivalent number sentences",
      ],
      codes: ["VC2M6N03", "VC2M6A02", "VC2M6N06"],
    },
    {
      keywords: ["properties of rectangles", "properties", "rectangles"],
      name: "Properties of rectangles",
      goals: [
        "Deriving and applying rectangle formulas",
        "Solving comparative and constant area and perimeter problems",
        "Analysing perimeter and area variations",
        "Converting units of length",
      ],
      codes: ["VC2M6M01", "VC2M6A03", "VC2M6M02"],
    },
    {
      keywords: ["angle properties", "angle", "properties"],
      name: "Angle properties",
      goals: [
        "Measuring and estimating angles",
        "Applying angle relationships and terminology",
        "Identifying angle properties and how they are used to solve problems",
        "Solving problems and equations involving angles",
      ],
      codes: ["VC2M6M04"],
    },
    {
      keywords: ["cartesian plane", "cartesian", "plane"],
      name: "Cartesian plane",
      goals: [
        "Plotting coordinates on a cartesian plane",
        "Reading coordinates on a cartesian plane",
      ],
      codes: ["VC2M6SP02"],
    },
    {
      keywords: ["conceptualising fractions", "conceptualising", "fractions"],
      name: "Conceptualising fractions",
      goals: [
        "Comparing order and representing common fractions (sets, bars and length)",
        "Solving problems adding and subtracting fractions with similar and different denominators using symbolic and visual",
      ],
      codes: ["VC2M6N03", "VC2M6N05"],
    },
    {
      keywords: ["statistics and probability", "statistics", "probability"],
      name: "Statistics and probability",
      goals: [
        "Exploring and describing the difference between theoretical and experimental probability",
        "Exploring and describing the difference between complementary and replacement events and their outcomes",
        "Describing how sample size may influence outcomes",
        "Comparing data distributions and justify representations",
        "Collecting data, selecting and creating appropriate graphs to represent data",
      ],
      codes: ["VC2M6ST01", "VC2M6P01", "VC2M6ST02", "VC2M6P02", "VC2M6ST03"],
    },
    {
      keywords: ["chance and game design", "chance", "design"],
      name: "Chance and game design",
      goals: [
        "Making connections between the language of likelihood and probability expressed as a fraction/decimal",
        "Knowing how to display theoretical probabilities",
        "Runing chance experiments, recording outcomes and making observations",
      ],
      codes: ["VC2M6N07", "VC2M6P01", "VC2M6N09", "VC2M6P02", "VC2M6N02", "VC2M6SP01", "VC2M6N04", "VC2M6SP03", "VC2M6N08"],
    },
  ],
  "Year 7": [
    {
      keywords: ["directed number", "directed", "number"],
      name: "Directed number",
      goals: [
        "Comparing and ordering integers",
        "Adding and subtracting integers",
        "Estimating and rounding integers to solve problems",
      ],
      codes: ["VC2M7N03", "VC2M7N04", "VC2M7N08"],
    },
    {
      keywords: ["rational numbers", "rational", "numbers"],
      name: "Rational numbers",
      goals: [
        "Developing a conceptual understanding of the five constructs of fractions",
        "Converting between representations of fractions, decimal fractions and percentages accurately",
        "Building proficiency in using proportional reasoning to compare and analyse relationships between different quantities",
        "Applying knowledge of fractions, decimals, percentages and ratios to solve real‑world problems",
      ],
      codes: ["VC2M7N03", "VC2M7N05", "VC2M7N06", "VC2M7N07", "VC2M7N09"],
    },
    {
      keywords: ["cartesian plane", "cartesian", "plane"],
      name: "Cartesian plane",
      goals: [
        "Reading, writing and plotting points on Cartesian planes",
        "Plotting polygons on a Cartesian plane",
        "Rotating and translating polygons on a Cartesian plane",
        "Reflecting polygons on a Cartesian plane",
      ],
      codes: ["VC2M7A05", "VC2M7SP03"],
    },
    {
      keywords: ["variables and rules", "variables", "rules"],
      name: "Variables and rules",
      goals: [
        "Understanding algebraic vocabulary and conventional algebraic notation",
        "Adding and subtracting linear like terms",
        "Substituting numerical values into algebraic expressions",
        "Solving linear equations using algebraic methods and verifying solutions through substitution",
        "Creating tables of values relating to patterns and algebraic expressions, deriving algebraic formulas to represent patterns and using the",
        "Formulating algebraic expressions from real‑world problems involving linear relations",
      ],
      codes: ["VC2M7A01", "VC2M7A02", "VC2M7A03", "VC2M7A05"],
    },
    {
      keywords: ["operating with numbers", "operating", "numbers"],
      name: "Operating with numbers",
      goals: [
        "Introducing the concept of proportional reasoning and its importance in solving mathematical problems using real‑world examples",
        "Exploring addition, subtraction, multiplication and division with integers, focusing on developing efficient strategies and understanding the",
        "Utilising the four operations with positive fractions and decimals, emphasising number sense calculation strategies and real‑world",
        "Exploring proportion using percentage fractions to express one quantity as a percentage of another and applying percentages of quantities to",
        "Solving problems involving addition and subtraction of integers in everyday contexts such as temperature changes, financial transactions and",
      ],
      codes: ["VC2M7N05", "VC2M7N07", "VC2M7N08", "VC2M7N010"],
    },
    {
      keywords: ["proportional reasoning", "proportional", "reasoning"],
      name: "Proportional reasoning",
      goals: [
        "Understanding the concept of proportional reasoning and its significance in solving mathematical problems using real‑world examples",
        "Exploring ratios and rates across various contexts, emphasising their connection to proportional reasoning and practical relevance in everyday",
        "Applying proportional reasoning in solving practical problems related to circle calculations, such as determining circumference based on given",
        "Using mathematical modelling techniques to address real‑world problems involving ratios, focusing on developing efficient strategies and",
        "Utilising rounding and estimation techniques in context‑based problems to ensure the reasonableness of solutions, promoting accuracy and",
      ],
      codes: ["VC2M7N04", "VC2M7N09", "VC2M7M03", "VC2M7M06"],
    },
    {
      keywords: ["polygons and objects", "polygons", "objects"],
      name: "Polygons and objects",
      goals: [
        "Extending understanding of the interior angle sum of triangles to other polygons and utilising this knowledge to classify shapes based on their",
        "Drawing three‑dimensional objects in two dimensions and justifying alternative visual representations to enhance spatial reasoning skills",
        "Identifying and utilising properties of right prisms, establishing the conceptual formula for volume and applying geometric reasoning to solve",
        "Utilising shape and object properties for classification and discussion and applying geometric reasoning to analyse their characteristics and",
      ],
      codes: ["VC2M7A01", "VC2M7A02", "VC2M7SP04"],
    },
    {
      keywords: ["exploring and investigating data", "exploring", "investigating"],
      name: "Exploring and investigating data",
      goals: [
        "Exploring data sets and basic statistical terms, focusing on understanding how data is organised and represented",
        "Investigating the nature of the distribution of data sets, including measures of central tendency and dispersion, to make informed decisions",
        "Planning and conducting statistical investigations for issues involving discrete and continuous numerical data, including analysis and",
        "Designing sample spaces for single‑stage experiments and assigning probabilities to the possible outcomes, exploring the concept of",
        "Explaining the connection between prediction and experiment, understanding how statistical investigations can inform predictions and vice",
      ],
      codes: ["VC2M7ST01", "VC2M7ST02", "VC2M7ST03", "VC2M7P01"],
    },
  ],
  "Year 8": [
    {
      keywords: ["comparing proportional quantities", "comparing", "proportional", "quantities"],
      name: "Comparing proportional quantities",
      goals: [
        "Solving complex percentage problems involving compound interest, compound growth and percentage error using sophisticated",
        "Utilising mathematical modelling to analyse financial scenarios, including profit margins, discounts and revenue optimisation strategies",
        "Investigating rates in multivariate contexts",
        "Comparing and analysing proportional relationships between multiple variables",
      ],
      codes: ["VC2M8N05", "VC2M8N06", "VC2M8M05", "VC2M8M07"],
    },
    {
      keywords: ["exponentials and irrational numbers", "exponentials", "irrational", "numbers"],
      name: "Exponentials and irrational numbers",
      goals: [
        "Identifying irrational numbers and investigating their properties, including π and the square roots of non‑perfect squares",
        "Exploring the basics of exponential functions and index laws and understanding their fundamental properties and relationships",
        "Establishing and applying exponent laws with positive integer exponents, developing skills in simplifying expressions and solving",
        "Applying exponent laws with zero exponent to solve problems and understanding the significance of zero in exponential expressions",
        "Solving problems involving irrational numbers and exponent laws such as determining the circumference of a circle, the diagonal of a",
      ],
      codes: ["VC2M8N01", "VC2M8N02", "VC2M8M03"],
    },
    {
      keywords: ["pythagoras\u2019 theorem", "pythagoras theorem", "pythagoras", "theorem"],
      name: "Pythagoras’ theorem",
      goals: [
        "Introducing Pythagoras’ theorem and its significance in finding the missing length in a right‑angled triangle",
        "Practising using Pythagoras’ theorem to solve problems involving the side lengths of right‑angled triangles in simple scenarios",
        "Exploring Pythagorean triples and special right‑angled triangles, understanding their properties and applications in problem‑solving",
        "Applying Pythagoras’ theorem to solve problems involving the perimeter of right‑angled triangles and composite shapes",
        "Using Pythagoras’ theorem to find the area of right‑angled triangles and irregular shapes, applying concepts of length, width and height",
      ],
      codes: ["VC2M8N01", "VC2M8N04", "VC2M8M06"],
    },
    {
      keywords: ["geometric reasoning", "geometric", "reasoning"],
      name: "Geometric reasoning",
      goals: [
        "Exploring the conditions for similarity of shapes, including angle–angle (AA) and side–side–side (SSS), and understanding their",
        "Identifying similar shapes based on the angle–angle (AA) condition and the side–side–side (SSS) condition",
        "Applying the conditions of similarity to solve problems involving the identification and comparison of similar shapes",
        "Understanding the concept of scale factor and its relationship to similarity of shapes",
        "Solving real‑world problems involving similarity of shapes, applying the concepts of angle–angle (AA) and side–side–side (SSS) similarity",
      ],
      codes: ["VC2M8M03", "VC2M8SP01", "VC2M8SP02", "VC2M8SP03", "VC2M8SP04"],
    },
    {
      keywords: ["measurement using polygons and circles", "measurement", "polygons", "circles"],
      name: "Measurement using polygons and circles",
      goals: [
        "Calculating the perimeter of polygons and composite shapes and occasionally using Pythagoras’ theorem while employing both numerical",
        "Calculating the area of polygons and composite shapes and occasionally using Pythagoras’ theorem while employing both numerical and",
        "Calculating the perimeter of circles and composite shapes including semicircles and occasionally using Pythagoras’ theorem while",
      ],
      codes: ["VC2M8M01", "VC2M8M02", "VC2M8M03"],
    },
    {
      keywords: ["analysing statistics and probability in context", "analysing", "statistics", "probability", "context"],
      name: "Analysing statistics and probability in context",
      goals: [
        "Recognising that complementary events have a combined probability of one and utilising this relationship to calculate probabilities in",
        "Determining all possible outcome combinations for two events using two‑way tables, tree diagrams and Venn diagrams and applying",
        "Conducting repeated chance experiments and simulations using digital tools to determine probabilities for compound events and",
      ],
      codes: ["VC2M8P01", "VC2M8P02", "VC2M8P03"],
    },
    {
      keywords: ["financial mathematics", "financial", "mathematics"],
      name: "Financial mathematics",
      goals: [
        "Analysing real‑world financial scenarios, formulating linear equations to represent them and solving them using algebraic techniques",
        "Collecting and reviewing data from different financial contexts, analysing trends and identifying linear relationships using graphical and",
        "Using mathematical modelling to predict and analyse profit and loss scenarios in various business contexts and applying linear functions",
      ],
      codes: ["VC2M8A02", "VC2M8A03", "VC2M8A05"],
    },
  ],
  "Year 9": [
    {
      keywords: ["probability"],
      name: "Probability",
      goals: [
        "Determining all outcomes for two‑step chance experiments both with and without replacement using lists, tree diagrams, tables",
        "Assigning probabilities to outcomes and events",
        "Calculating relative frequencies from given or collected data to estimate probabilities of events involving and, inclusive or and",
        "Designing and conducting repeated chance experiments and simulations using digital tools to estimate probabilities that cannot",
      ],
      codes: ["VC2M9P01", "VC2M9P02", "VC2M9P03"],
    },
    {
      keywords: ["probability and statistics in game design", "probability", "statistics", "design"],
      name: "Probability and statistics in game design",
      goals: [
        "Using stem‑and‑leaf plots to analyse data from a decision‑making game",
        "Using different sampling methods to identify bias in game design",
        "Analysing and comparing experimental and theoretical probabilities to evaluate fairness and make predictions in games and",
        "Using tree diagrams and the theory of independent events to solve problems relating to dice outcomes",
      ],
      codes: ["VC2M9ST03", "VC2M9P02"],
    },
    {
      keywords: ["geometric reasoning", "geometric", "reasoning"],
      name: "Geometric reasoning",
      goals: [
        "Applying similarity properties to estimate distance and solve problems involving similar triangles",
        "Proving Pythagoras’ theorem using similar triangles",
        "Showing how Thales’ theorem can be used to find the centre of a circle",
        "Finding the distance between two distinct points on the Cartesian plane",
        "Explaining the relationship between changes in length, area and volume and determining the length scale factor of similar",
        "Determining an unknown length using information about the volume or area of similar objects",
      ],
      codes: ["VC2M9A04", "VC2M9A05", "VC2M9M01", "VC2M9M03", "VC2M9SP02"],
    },
    {
      keywords: ["trigonometry"],
      name: "Trigonometry",
      goals: [
        "Modelling sin, cos, tan, sin-1, cos-1 and tan-1 measurement problems using right‑angled triangles",
        "Applying the trigonometric ratios and their inverse functions to solve practical problems involving lengths and angles",
        "Identifying combinations of information about angles and side lengths in right‑angled triangles",
        "Applying relevant methods involving trigonometry to solve problems modelled by right‑angled triangles",
      ],
      codes: ["VC2M9M03", "VC2M9SP01"],
    },
    {
      keywords: ["linear equations", "linear", "equations"],
      name: "Linear equations",
      goals: [
        "Sketching linear graphs of equations in various algebraic forms",
        "Solving linear equations",
        "Finding the gradient of a line segment, the midpoint of the line interval and the distance between two distinct points on the",
        "Experimenting with the effects of the variation of parameters on graphs of related functions using digital tools, making",
        "Calculating the distance and midpoint of a line segment",
      ],
      codes: ["VC2M9A03", "VC2M9A04", "VC2M9A07"],
    },
  ],
  "Year 10": [
    {
      keywords: ["linear functions", "linear functions – part a", "linear", "functions"],
      name: "Linear functions – Part A",
      goals: [
        "Understanding the basic concepts of linear functions, including slope and y-intercept, graphing exercises and applying real-world scenarios",
        "Recognising patterns and establishing connections between variables, constants and linear algebraic rules by examining growing patterns and translating them into linear equations",
        "Demonstrating proficiency in rearranging linear formulas to isolate specific terms and substituting values into equations to solve for unknown quantities",
        "Applying advanced reasoning skills to solve linear equations, including those derived from formulas",
      ],
      codes: ["VC2M10A05", "VC2M10A07", "VC2M10A10", "VC2M10A12", "VC2M10AA03"],
    },
    {
      keywords: ["linear functions part b", "sketching linear", "linear inequalities", "linear functions – part b", "linear", "functions"],
      name: "Linear functions – Part B",
      goals: [
        "Understanding the concepts of substituting values into formulas and rearranging equations to isolate specific terms",
        "Developing proficiency in sketching linear functions by identifying and interpreting key features such as gradient and y-intercept",
        "Enhancing understanding of sketching linear functions through advanced exploration, including different forms (gradient-intercept form and general form) and incorporating transformations",
        "Utilising graphical and algebraic methods to solve linear equations systematically",
        "Solving linear inequalities and graphing their solutions",
      ],
      codes: ["VC2M10A05", "VC2M10A07", "VC2M10A08", "VC2M10A09", "VC2M10AA08", "VC2M10AA09"],
    },
    {
      keywords: ["quadratic fundamentals", "quadratic", "perfect square", "difference of squares", "factorisation", "quadratic formula", "fundamentals"],
      name: "Quadratic fundamentals",
      goals: [
        "Representing quadratic trinomials in factorised and completed square form",
        "Learning the identities for perfect squares and the difference of squares",
        "Solving quadratic equations using factorisation",
        "Solving quadratic equations by completing the square and using the quadratic formula",
      ],
      codes: ["VC2M10A01", "VC2M10A04", "VC2M10A11", "VC2M10A13", "VC2M10AA07"],
    },
    {
      keywords: ["quadratic rules and graphs", "quadratic graphs", "parabola", "quadratic", "rules", "graphs"],
      name: "Quadratic rules and graphs",
      goals: [
        "Sketching graphs of quadratic functions from rules in completed square form",
        "Sketching graphs of quadratic functions from rules in factorised and trinomial forms",
        "Determining the key features (orientation, axes intercepts and vertex) of a graph of a quadratic function from its rule",
        "Solving equations related to practical problems involving quadratic functions and their graphs",
      ],
      codes: ["VC2M10A05", "VC2M10A11", "VC2M10A13", "VC2M10AA09", "VC2M10AM02"],
    },
    {
      keywords: ["functions and relations", "function notation", "domain", "polynomials", "remainder theorem", "factor theorem", "functions", "relations"],
      name: "Functions and relations",
      goals: [
        "Simplifying and evaluating expressions involving surds and exponents, using exponent laws and solving simple exponential equations",
        "Applying logarithmic scales",
        "Identifying functions and using function notation",
        "Finding the domain and range of functions and relations",
        "Operating on polynomials, including using the remainder and factor theorems to divide and factorise polynomials",
        "Sketching cubic, reciprocal, exponential and circular functions and examining the effect of transformations on these graphs",
      ],
      codes: ["VC2M10A02", "VC2M10A11", "VC2M10A14", "VC2M10AA01", "VC2M10AA05", "VC2M10AA06", "VC2M10AA10", "VC2M10AN01", "VC2M10AN02", "VC2M10AN03", "VC2M10M02"],
    },
    {
      keywords: ["building with geometry", "pythagoras", "surface area", "volume", "composite objects", "building", "geometry"],
      name: "Building with geometry",
      goals: [
        "Solving problems involving the surface area and volume of composite objects and applying appropriate units to calculations",
        "Solving practical problems using Pythagoras' theorem, including scenarios involving direction, angles of elevation and depression",
        "Applying Pythagoras' theorem in three dimensions to solve problems involving surface area and volume",
      ],
      codes: ["VC2M10M01", "VC2M10M03", "VC2M10AM01", "VC2M10SP01", "VC2M10ASP05"],
    },
    {
      keywords: ["discoverable networks", "networks", "connected network", "discoverable"],
      name: "Discoverable networks",
      goals: [
        "Identifying features of a connected network",
        "Determining equivalence in networks",
        "Modelling networks from given information",
        "Interpreting networks to deduce information",
        "Applying networks to practical problems",
        "Representing connectedness and relationships",
      ],
      codes: ["VC2M10SP02"],
    },
    {
      keywords: ["probability and decision making", "conditional probability", "two-step", "three-step chance", "independence in probability", "probability", "decision", "making"],
      name: "Probability and decision making",
      goals: [
        "Exploring the foundational principles of probability through simple one-step probability experiments",
        "Using the technical language of conditional statements (if-then, given, of, knowing that) to analyse common mistakes in interpretation",
        "Describing and analysing the outcomes of more complex two- and three-step chance experiments, considering replacements and independence",
        "Exploring the concept of independence in probability and how it impacts probability calculations",
      ],
      codes: ["VC2M10P01", "VC2M10P02", "VC2M10AP01"],
    },
    {
      keywords: ["investigating statistics", "quartiles", "interquartile range", "boxplot", "two-way table", "bivariate data", "investigating", "statistics"],
      name: "Investigating statistics",
      goals: [
        "Analysing data distributions using quartiles, interquartile range and various graphical representations such as boxplots, histograms and dot plots",
        "Constructing, interpreting and drawing conclusions from two-way tables, exploring relationships between categorical variables",
        "Planning and executing statistical investigations involving bivariate data",
        "Utilising parallel boxplots to compare data distributions across different categories",
        "Exploring different data sets and determining which measure of central tendency is most appropriate",
      ],
      codes: ["VC2M10ST01", "VC2M10ST02", "VC2M10ST03", "VC2M10ST05", "VC2M10AST01", "VC2M10AST03"],
    },
    {
      keywords: ["applying algorithms", "pseudocode", "simulations", "applying", "algorithms"],
      name: "Applying algorithms",
      goals: [
        "Interpreting and modelling a mathematical problem",
        "Designing and implementing simple algorithms using pseudocode or other general-purpose programming languages",
        "Making and testing simulations using digital tools",
        "Clearly communicating ideas and strategies to others",
      ],
      codes: ["VC2M10A06", "VC2M10ASP06"],
    },
    {
      keywords: ["working with exponentials", "exponentials and logarithms", "logarithm laws", "logarithmic equations", "working with exponentials and logarithms", "working", "exponentials", "logarithms"],
      name: "Working with exponentials and logarithms",
      goals: [
        "Evaluating numbers and converting between exponent notation and surd form",
        "Solving logarithmic equations and checking if the solutions are valid",
        "Solving exponential equations",
        "Using logarithm laws",
        "Sketching the graphs of exponential and logarithmic functions",
        "Finding the rule of the inverse graph of a function",
      ],
      codes: ["VC2M10A02", "VC2M10A11", "VC2M10A14", "VC2M10AA01", "VC2M10AA05", "VC2M10AA06", "VC2M10AA10", "VC2M10AN01", "VC2M10AN02", "VC2M10AN03", "VC2M10M02"],
    },
  ],
  "Year 10A": [],
};

// Internal helper — normalise keys so callers can pass either a year-level
// label ("Year 8") or an English level label ("Level 8") regardless of subject.
function pickOverview(subject, level) {
  if (subject === "english") {
    if (ENGLISH_OVERVIEWS[level]) return ENGLISH_OVERVIEWS[level];
    const num = level?.match(/(\d+)/)?.[1];
    if (num) return ENGLISH_OVERVIEWS[`Level ${num}`] || [];
    return [];
  }
  if (MATHS_OVERVIEWS[level]) return MATHS_OVERVIEWS[level];
  const num = level?.match(/(\d+)/)?.[1];
  if (num) return MATHS_OVERVIEWS[`Year ${num}`] || [];
  return [];
}

// Normalise text so smart quotes / dashes / apostrophes don't silently
// break matching. Tutor notes will use plain ASCII; source data has
// curly quotes from PDFs.
function normalise(s) {
  return String(s)
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "")
    .replace(/'/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Find overview entries whose keywords appear in the given session notes.
 *
 * @param {string} notes - raw session transcript / tutor notes
 * @param {string} level - level label (e.g. "Year 8", "Level 5", "Foundation")
 * @param {"maths"|"english"} subject
 * @returns {Array} matching overview entries
 */
export function findOverviewMatches(notes, level, subject) {
  const entries = pickOverview(subject, level);
  if (!entries?.length || !notes) return [];
  const haystack = normalise(notes);
  const seen = new Set();
  const matches = [];
  for (const entry of entries) {
    const hit = entry.keywords?.some((kw) => haystack.includes(normalise(kw)));
    const id = entry.title || entry.name;
    if (hit && !seen.has(id)) {
      seen.add(id);
      matches.push(entry);
    }
  }
  return matches;
}

/**
 * Format matched overview entries for prompt injection. Returns "" if none.
 */
export function formatOverviewMatches(matches, subject) {
  if (!matches?.length) return "";
  const isEnglish = subject === "english";
  const header = isEnglish
    ? "RELEVANT TEXT(S) FOR THIS SESSION (from the level's set-text list — these are texts the student is likely studying at school):"
    : "RELEVANT TOPIC SEQUENCES FOR THIS SESSION (from the level's curriculum sequence — these are units the student is likely working through at school):";

  const blocks = matches.map((m) => {
    const lines = [`### ${m.title || m.name}`];
    if (m.themes?.length) lines.push(`Themes: ${m.themes.join(", ")}`);
    if (m.writingGenre) lines.push(`Writing genre: ${m.writingGenre}`);
    if (m.goals?.length) {
      lines.push("Learning goals:");
      for (const g of m.goals) lines.push(`- ${g}`);
    }
    if (m.vocab) {
      lines.push(
        `Vocabulary in focus: ${m.vocab}`
      );
    }
    if (m.codes?.length) {
      lines.push(`Mapped VCAA codes: ${m.codes.join(", ")}`);
    }
    return lines.join("\n");
  });

  const footer = isEnglish
    ? "USE THIS GROUNDING when describing what was covered, suggesting practice tasks, and recommending review focus. Quote vocabulary words from the list when discussing word study. Reference themes when describing analytical work. Do NOT fabricate plot details or quotations from the text — if you're not certain, describe the moment generically."
    : "USE THIS GROUNDING when describing what was covered, mapping topics to descriptors, and suggesting practice questions. Frame the work in terms of the named sequence so the report aligns with how the student's school program is structured.";

  return `${header}\n\n${blocks.join("\n\n")}\n\n${footer}`;
}

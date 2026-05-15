"use client";
import { useState } from "react";
import EnquiryFormModal from "@/components/EnquiryFormModal";
import SuburbAutocomplete from "@/components/SuburbAutocomplete";
import { getNearby } from "@/lib/suburbs";

const c = {
  teal: "#0ABAB5", tealLight: "#2DD4BF", tealDark: "#0D9488", tealPale: "#F0FDFA",
  navy: "#0F172A", navyMid: "#1E293B",
  text: "#1E293B", textLight: "#64748B", textMuted: "#94A3B8",
  white: "#FFFFFF", offWhite: "#F8FAFC", border: "#E2E8F0",
  success: "#10B981", amber: "#F59E0B", rose: "#F43F5E",
};

const tutors = [
  { name: "Sarah T.", initials: "ST", color: "#6366F1", subjects: ["Mathematics", "VCE Methods"], yearLevels: "Year 7-12", rate: 65, rating: 4.9, sessions: 142, location: "Brighton", online: true, inPerson: true, bio: "Maths specialist with a passion for making complex concepts click. ATAR 99.45. Experienced with Cambridge and Jacaranda textbooks.", improvement: 38, languages: ["English"] },
  { name: "James W.", initials: "JW", color: "#EC4899", subjects: ["English", "VCE English"], yearLevels: "Year 7-12", rate: 68, rating: 4.8, sessions: 98, location: "Elsternwick", online: true, inPerson: true, bio: "English and literature tutor focused on essay writing, text response, and analytical skills. Published writer and experienced VCE marker.", improvement: 34, languages: ["English"] },
  { name: "Emily K.", initials: "EK", color: "#F59E0B", subjects: ["Science", "VCE Biology", "VCE Chemistry"], yearLevels: "Year 7-12", rate: 60, rating: 4.9, sessions: 76, location: "Sandringham", online: true, inPerson: false, bio: "Science tutor covering Biology, Chemistry, and general Science. Currently studying Biomedical Science at Monash. Makes science practical and relatable.", improvement: 41, languages: ["English", "Mandarin"] },
  { name: "Tom R.", initials: "TR", color: "#0ABAB5", subjects: ["Mathematics", "VCE Specialist Maths"], yearLevels: "Year 9-12", rate: 70, rating: 5.0, sessions: 203, location: "Hampton", online: true, inPerson: true, bio: "Specialist Maths and Methods expert. Engineering student at Melbourne Uni. ATAR 99.80. Patient, methodical approach to problem solving.", improvement: 45, languages: ["English"] },
  { name: "Lisa M.", initials: "LM", color: "#8B5CF6", subjects: ["English", "Humanities", "History"], yearLevels: "Prep-Year 10", rate: 55, rating: 4.7, sessions: 54, location: "Bentleigh", online: true, inPerson: true, bio: "Primary and middle school specialist. Focuses on reading comprehension, creative writing, and building confidence in younger learners.", improvement: 32, languages: ["English", "Vietnamese"] },
  { name: "Daniel C.", initials: "DC", color: "#EF4444", subjects: ["Mathematics", "Science", "VCE Physics"], yearLevels: "Year 7-12", rate: 62, rating: 4.8, sessions: 117, location: "Caulfield", online: true, inPerson: true, bio: "Maths and Physics tutor with a knack for visual explanations. Uses real-world examples to make abstract concepts tangible. ATAR 99.30.", improvement: 36, languages: ["English", "Greek"] },
  { name: "Priya S.", initials: "PS", color: "#14B8A6", subjects: ["Mathematics", "VCE Methods", "VCE Specialist Maths"], yearLevels: "Year 7-12", rate: 58, rating: 4.9, sessions: 89, location: "Glen Huntly", online: true, inPerson: false, bio: "Maths tutor specialising in building problem-solving strategies. Actuarial Science student at Monash. Patient and structured approach.", improvement: 39, languages: ["English", "Hindi", "Tamil"] },
  { name: "Alex N.", initials: "AN", color: "#3B82F6", subjects: ["English", "VCE English Language", "Media"], yearLevels: "Year 9-12", rate: 65, rating: 4.7, sessions: 63, location: "St Kilda", online: true, inPerson: true, bio: "English Language and Media specialist. Journalism student who brings real-world media literacy into every session. Strong essay structure focus.", improvement: 33, languages: ["English"] },
  { name: "Wei L.", initials: "WL", color: "#F97316", subjects: ["Mathematics", "Science", "Mandarin"], yearLevels: "Prep-Year 12", rate: 50, rating: 4.8, sessions: 71, location: "Brighton East", online: true, inPerson: true, bio: "Bilingual tutor fluent in English and Mandarin. Specialises in helping international students bridge the gap with the Australian curriculum.", improvement: 42, languages: ["English", "Mandarin", "Cantonese"] },
];

const sampleReports = {
  "Sarah T.": { student: "Julian M.", year: "Year 10", subject: "Mathematics", date: "May 5, 2026", summary: "Today\u2019s session focused on factorising quadratic expressions, building on last week\u2019s work with expanding brackets. We reviewed the connection between expanding and factorising as inverse operations, then moved into factorising monic quadratics where the leading coefficient is 1. Julian worked through exercises from Cambridge Essential Maths 10, Chapter 5 (5C and 5D), progressing from positive constant terms to expressions with negative constants. We also introduced the null factor law and began applying factorising to solve quadratic equations, connecting to VCAA content descriptor VCMNA333.", performance: "Julian demonstrated strong conceptual understanding of the factorising process for positive constant terms and was able to work independently by the midpoint of the session. Negative constant terms still need more practice - he tends to forget that one factor must be negative when the constant term is negative. When we moved to solving quadratics by factorising, he understood the null factor law conceptually but needs more repetition to build fluency. Overall, good progress this session.", topics: [{ t: "Expanding brackets (review)", r: 5 }, { t: "Factorising monic quadratics (positive)", r: 4 }, { t: "Factorising monic quadratics (negative)", r: 3 }, { t: "Null factor law", r: 3 }, { t: "Solving quadratics by factorising", r: 3 }], focus: ["Review factor pairs for numbers up to 50, focusing on pairs where one factor is negative", "Complete Exercise 5D Q1-10 and 5E Q1-5 in Cambridge textbook", "Practise identifying sign patterns: positive product = same signs, negative product = different signs", "Attempt 3 solving-by-factorising problems before next session"], questionsKey: "maths" },
  "James W.": { student: "Mia S.", year: "Year 11", subject: "VCE English", date: "May 5, 2026", summary: "We worked on text response essay structure for the film Rear Window by Alfred Hitchcock, one of Mia\u2019s set texts for Unit 3. The session focused on constructing analytical paragraphs using the TEEL structure (Topic sentence, Evidence, Explanation, Link). We spent time on embedding quotes and film techniques naturally into sentences rather than dropping them in as standalone evidence. Mia drafted two body paragraphs on the theme of voyeurism and ethical responsibility, and we revised them together.", performance: "Mia has a strong understanding of the film\u2019s themes and can identify relevant scenes and techniques. Her main area for growth is moving from descriptive writing to analytical writing. Her topic sentences improved noticeably during the session after we practised the formula: contention + technique + effect. Quote embedding also improved - by the second paragraph she was weaving evidence into her sentences more naturally.", topics: [{ t: "TEEL paragraph structure", r: 4 }, { t: "Quote and evidence embedding", r: 3 }, { t: "Analytical vs descriptive writing", r: 3 }, { t: "Theme analysis (voyeurism)", r: 4 }, { t: "Metalanguage usage", r: 3 }], focus: ["Write two practice paragraphs on the theme of gender and power in Rear Window", "Practise the topic sentence formula: contention + technique + effect", "Review the metalanguage list for film techniques", "Read the sample A+ essay provided and highlight the analytical sentences vs descriptive ones"], questionsKey: "english" },
  "Emily K.": { student: "Lachlan D.", year: "Year 9", subject: "Science", date: "May 5, 2026", summary: "Covered cellular respiration and photosynthesis in preparation for Lachlan\u2019s upcoming science test next Thursday. We compared the two processes side by side, focusing on inputs, outputs, energy transformations, and where each occurs within the cell. Used annotated diagrams to visualise the structures of mitochondria and chloroplasts, and discussed why plant cells have both organelles while animal cells only have mitochondria. We also covered the word equations for both processes.", performance: "Lachlan grasped the comparison between the two processes quickly and was able to explain in his own words why both are needed. He can identify the key molecules involved and correctly assigns them to each process. He gets confused with the specific internal structures of organelles - for example, mixing up cristae (mitochondria) and thylakoids (chloroplasts). Drawing and labelling diagrams helped significantly.", topics: [{ t: "Photosynthesis overview", r: 4 }, { t: "Cellular respiration overview", r: 4 }, { t: "Organelle structure", r: 3 }, { t: "Word and chemical equations", r: 3 }, { t: "Comparing the two processes", r: 5 }], focus: ["Label blank diagrams of mitochondria and chloroplasts from memory", "Write the word equations for both processes without notes", "Complete the comparison table from class notes", "Review the difference between aerobic and anaerobic respiration"], questionsKey: "science" },
  "Tom R.": { student: "Aiden P.", year: "Year 12", subject: "VCE Specialist Maths", date: "May 5, 2026", summary: "Focused on complex number operations and their geometric representation on the Argand diagram. We covered multiplication and division of complex numbers in both rectangular and polar form, and explored how multiplication by a complex number corresponds to a rotation and dilation on the Argand plane. Aiden worked through several CAS-verified examples and we discussed the connection between De Moivre\u2019s theorem and finding roots of complex equations.", performance: "Aiden is confident with algebraic manipulation of complex numbers in rectangular form but initially struggled with converting to polar form accurately - particularly getting the argument correct for complex numbers in the second and third quadrants. After working through the quadrant diagram together, his accuracy improved. He understood the geometric interpretation well and could predict the result visually before calculating.", topics: [{ t: "Complex number multiplication (rectangular)", r: 5 }, { t: "Polar form conversion", r: 3 }, { t: "Geometric interpretation on Argand diagram", r: 4 }, { t: "Division in polar form", r: 4 }, { t: "De Moivre's theorem introduction", r: 3 }], focus: ["Practise converting 10 complex numbers to polar form across all four quadrants", "Complete textbook exercises on De Moivre's theorem (Ch. 4 Section 4.5)", "Review argument conventions for each quadrant", "Attempt past VCAA exam questions on complex number geometry"], questionsKey: "maths" },
  "Lisa M.": { student: "Sophie R.", year: "Year 5", subject: "English", date: "May 5, 2026", summary: "Today\u2019s session focused on reading comprehension strategies and creative writing. We read a short story together and practised three key comprehension strategies: predicting before reading, questioning during reading, and summarising after reading. Sophie then worked on her own creative writing piece focusing on using descriptive language, varied sentence starters, and correctly punctuating dialogue. We also reviewed the difference between their, there, and they\u2019re.", performance: "Sophie is a confident reader who engages well with texts. Her comprehension is strong when she slows down and uses the strategies. In creative writing, her ideas are imaginative and her vocabulary is growing. She needs to focus on paragraph structure and punctuating dialogue correctly - she consistently forgets the comma before the closing quotation mark. The homophones exercise was helpful and she got 8 out of 10 correct by the end.", topics: [{ t: "Reading comprehension strategies", r: 4 }, { t: "Creative writing - descriptive language", r: 4 }, { t: "Dialogue punctuation", r: 3 }, { t: "Homophones (their/there/they're)", r: 4 }, { t: "Paragraph structure", r: 3 }], focus: ["Read one chapter each night and write a 3-sentence summary", "Write a short paragraph of dialogue focusing on punctuation", "Complete the homophones worksheet provided", "Practise starting sentences with different words"], questionsKey: "english" },
  "Daniel C.": { student: "Nathan H.", year: "Year 11", subject: "VCE Physics", date: "May 5, 2026", summary: "Covered projectile motion as part of Unit 2 Area of Study 1 (Motion). We worked through the key principles: separating horizontal and vertical components, constant horizontal velocity, vertical acceleration due to gravity, and independence of the two components. Nathan solved several projectile problems including calculating time of flight, maximum height, and range using both algebraic methods and graphical analysis.", performance: "Nathan has a good intuitive understanding of projectile motion. His algebraic problem-solving is solid for horizontal launches but he struggles with angled projectiles - specifically resolving the initial velocity into components using trigonometry. He also needs to be more careful with sign conventions. His graph interpretation skills are strong and he correctly identified key features of v-t and x-t graphs for projectiles.", topics: [{ t: "Horizontal and vertical component separation", r: 4 }, { t: "Horizontal launch problems", r: 5 }, { t: "Angled launch - resolving velocity", r: 3 }, { t: "Time of flight and range calculations", r: 4 }, { t: "Graphical analysis of motion", r: 4 }], focus: ["Practise resolving velocity into horizontal and vertical components", "Review trigonometry basics for right-angled triangles", "Complete the projectile motion problem set provided", "Draw v-t and x-t graphs for three different projectile scenarios"], questionsKey: "science" },
  "Priya S.": { student: "Ella W.", year: "Year 10", subject: "VCE Methods (accelerated)", date: "May 5, 2026", summary: "Session covered polynomial functions, focusing on cubic and quartic graphs. We explored how to sketch polynomials by identifying x-intercepts using the factor theorem and long division, y-intercepts, and end behaviour. Ella worked through examples of factorising cubics by first finding a factor using trial and error, then using polynomial long division to find the remaining quadratic factor.", performance: "Ella is accelerating well and handles the algebraic manipulation confidently. She can factorise cubics when given one factor but finding the initial factor through trial and error is slow. Her graph sketching is improving and she correctly identifies end behaviour based on the leading term. She needs to practise sketching with repeated roots and remembering to mark all key features on the graph.", topics: [{ t: "Factor theorem", r: 4 }, { t: "Polynomial long division", r: 4 }, { t: "Sketching cubic functions", r: 3 }, { t: "End behaviour of polynomials", r: 4 }, { t: "Repeated roots interpretation", r: 3 }], focus: ["Practise finding factors of 5 different cubics using trial values", "Sketch 3 cubics with repeated roots and label all intercepts", "Review the effect of leading coefficient sign on end behaviour", "Attempt the challenge problems from the worksheet provided"], questionsKey: "maths" },
  "Alex N.": { student: "Zara K.", year: "Year 12", subject: "VCE English Language", date: "May 5, 2026", summary: "Focused on subsystem analysis for the analytical commentary (Unit 3 SAC preparation). We worked through a sample text - a political speech - and practised identifying and analysing features across the semantic, syntactic, and discourse subsystems. Particular attention was given to writing about how language choices construct social identity and reflect the context of the text.", performance: "Zara\u2019s ability to identify language features has improved significantly. She can spot patterns across subsystems and is beginning to link them to social purpose effectively. Her main challenge is the analytical commentary format - she tends to list features rather than weave them into a cohesive analysis. We practised \u2018so what\u2019 reasoning: not just identifying a feature, but explaining what it achieves.", topics: [{ t: "Semantic subsystem analysis", r: 4 }, { t: "Syntactic subsystem analysis", r: 3 }, { t: "Discourse subsystem analysis", r: 3 }, { t: "Linking features to social purpose", r: 3 }, { t: "Metalanguage accuracy", r: 4 }], focus: ["Analyse two short texts and write subsystem annotations", "Practise the feature + example + effect + social purpose analysis chain", "Review the metalanguage glossary focusing on syntactic terms", "Draft the first 300 words of a practice analytical commentary"], questionsKey: "english" },
  "Wei L.": { student: "Kevin Z.", year: "Year 8", subject: "Mathematics", date: "May 5, 2026", summary: "Worked on linear equations and graphing straight lines. We started with solving one-step and two-step equations, then progressed to equations with variables on both sides. In the second half, Kevin learned how to plot linear equations by creating a table of values and identifying the gradient and y-intercept from the equation y = mx + c. Key terms were explained in both English and Mandarin to ensure full comprehension.", performance: "Kevin\u2019s equation solving has improved markedly. He is now confident with two-step equations and can solve most problems independently. Equations with variables on both sides are still new and he needs more practice. His graphing is developing well - he can create tables of values accurately but is still learning to read gradient from the equation without plotting points first. Having terminology explained in both English and Mandarin helped him connect concepts.", topics: [{ t: "One-step and two-step equations", r: 5 }, { t: "Equations with variables on both sides", r: 3 }, { t: "Creating tables of values", r: 4 }, { t: "Plotting linear graphs", r: 4 }, { t: "Gradient and y-intercept from y = mx + c", r: 3 }], focus: ["Complete 10 practice equations with variables on both sides", "Plot 3 linear equations from the equation without using a table", "Review the vocabulary list: gradient, y-intercept, coefficient, constant", "Attempt the mixed practice worksheet provided"], questionsKey: "maths" },
};

const questionBanks = {
  maths: [[{q:"Factorise: x\u00B2 + 9x + 20",a:"Find two numbers that multiply to 20 and add to 9: 4 and 5.\nAnswer: (x + 4)(x + 5)"},{q:"Factorise: x\u00B2 + 7x + 12",a:"Find two numbers that multiply to 12 and add to 7: 3 and 4.\nAnswer: (x + 3)(x + 4)"},{q:"Factorise: x\u00B2 + 11x + 30",a:"Find two numbers that multiply to 30 and add to 11: 5 and 6.\nAnswer: (x + 5)(x + 6)"},{q:"Factorise: x\u00B2 + 8x + 15",a:"Find two numbers that multiply to 15 and add to 8: 3 and 5.\nAnswer: (x + 3)(x + 5)"}],[{q:"Factorise: x\u00B2 + 2x - 15",a:"Multiply to -15 and add to +2: 5 and -3.\nAnswer: (x + 5)(x - 3)"},{q:"Factorise: x\u00B2 - 3x - 18",a:"Multiply to -18 and add to -3: -6 and 3.\nAnswer: (x - 6)(x + 3)"},{q:"Factorise: x\u00B2 + x - 12",a:"Multiply to -12 and add to +1: 4 and -3.\nAnswer: (x + 4)(x - 3)"},{q:"Factorise: x\u00B2 - 5x - 14",a:"Multiply to -14 and add to -5: -7 and 2.\nAnswer: (x - 7)(x + 2)"}],[{q:"Factorise: x\u00B2 - 8x + 12",a:"Multiply to 12 and add to -8: -2 and -6.\nAnswer: (x - 2)(x - 6)"},{q:"Factorise: x\u00B2 - 10x + 21",a:"Multiply to 21 and add to -10: -3 and -7.\nAnswer: (x - 3)(x - 7)"},{q:"Factorise: x\u00B2 - 7x + 10",a:"Multiply to 10 and add to -7: -2 and -5.\nAnswer: (x - 2)(x - 5)"},{q:"Factorise: x\u00B2 - 9x + 20",a:"Multiply to 20 and add to -9: -4 and -5.\nAnswer: (x - 4)(x - 5)"}],[{q:"Solve: x\u00B2 + 3x - 18 = 0",a:"Factorise: (x + 6)(x - 3) = 0\nx = -6 or x = 3"},{q:"Solve: x\u00B2 - 2x - 8 = 0",a:"Factorise: (x - 4)(x + 2) = 0\nx = 4 or x = -2"},{q:"Solve: x\u00B2 + 5x - 24 = 0",a:"Factorise: (x + 8)(x - 3) = 0\nx = -8 or x = 3"},{q:"Solve: x\u00B2 - x - 20 = 0",a:"Factorise: (x - 5)(x + 4) = 0\nx = 5 or x = -4"}],[{q:"Solve: x\u00B2 + 7x + 10 = 0",a:"Factorise: (x + 5)(x + 2) = 0\nx = -5 or x = -2"},{q:"Solve: x\u00B2 - 6x + 8 = 0",a:"Factorise: (x - 4)(x - 2) = 0\nx = 4 or x = 2"},{q:"Solve: x\u00B2 + 4x - 21 = 0",a:"Factorise: (x + 7)(x - 3) = 0\nx = -7 or x = 3"},{q:"Solve: x\u00B2 - 3x - 10 = 0",a:"Factorise: (x - 5)(x + 2) = 0\nx = 5 or x = -2"}]],
  english: [[{q:"Identify the technique: 'The city was a jungle of concrete and steel.'",a:"Metaphor - comparing the city directly to a jungle. Constructs an image of the urban environment as wild and overwhelming."},{q:"Identify the technique: 'The wind whispered through the trees.'",a:"Personification - giving the wind the human quality of whispering. Creates a calm, secretive atmosphere."},{q:"Identify the technique: 'She was as brave as a lion.'",a:"Simile - comparing bravery to a lion using 'as'. Emphasises courage by associating it with strength."},{q:"Identify the technique: 'The thunder clapped angrily overhead.'",a:"Personification - giving thunder the human emotion of anger. Creates a threatening atmosphere."}],[{q:"Write a topic sentence arguing social media negatively affects teenagers.",a:"Sample: 'Social media platforms cultivate a culture of constant comparison among teenagers, eroding self-esteem through the relentless presentation of idealised lifestyles.'\n\nKey elements: clear contention + specific mechanism + implied effect."},{q:"Write a topic sentence about character development in a novel.",a:"Sample: 'Through increasingly defiant actions, the protagonist transitions from passive acceptance to active resistance, reflecting the author's broader critique of social conformity.'\n\nKey elements: specific evidence + character development + authorial purpose."},{q:"Write a topic sentence arguing technology improves education.",a:"Sample: 'Digital learning platforms democratise access to quality education by enabling students in remote communities to engage with resources previously confined to well-funded urban schools.'"},{q:"Write a topic sentence about the use of setting in a film.",a:"Sample: 'The director's deliberate use of claustrophobic interior spaces mirrors the protagonist's psychological entrapment, positioning the audience to experience the weight of unspoken expectations.'"}],[{q:"What is the difference between analytical and descriptive writing?",a:"Descriptive: 'The author uses a metaphor in this paragraph.' (Simply identifies - no analysis of WHY or EFFECT)\n\nAnalytical: 'The author's sustained use of disease metaphors constructs immigration as a threat to the social body, positioning the reader to view newcomers with suspicion.' (Identifies technique + explains purpose + discusses effect)"},{q:"Explain the TEEL paragraph structure.",a:"T - Topic sentence: your contention for this paragraph\nE - Evidence: a specific quote or reference from the text\nE - Explanation: analyse HOW the evidence supports your topic sentence\nL - Link: connect back to your overall argument\n\nThe explanation is the most important part."},{q:"What is the difference between tone and mood?",a:"Tone: the attitude of the writer toward the subject. Identified through word choice and style.\n\nMood: the emotional atmosphere experienced by the reader. Created through setting, imagery, and pacing.\n\nA writer can use a cheerful tone to create an unsettling mood (irony)."},{q:"What does metalanguage mean in VCE English?",a:"Metalanguage is the specific terminology used to discuss language and texts.\n\nExamples:\n1. Mise-en-scene (film) - arrangement of everything in the frame\n2. Modality (language) - degree of certainty ('must' vs 'might')\n3. Juxtaposition - placing contrasting ideas side by side"}],[{q:"Analyse: 'We must act now, before it is too late.'",a:"High modality ('must') creates urgency. 'Before it is too late' implies impending consequences, appealing to fear. Inclusive pronoun 'we' creates solidarity. Overall: persuasive, urgent, designed to compel action."},{q:"How do short sentences create effect in persuasive writing?",a:"Short sentences create emphasis and impact:\n1. Draw attention to a key point by isolating it\n2. Create a punchy, authoritative tone\n3. Increase pace, building tension\n4. Stand out against longer sentences\n\nExample: 'This must stop.' - brevity makes it feel absolute."},{q:"What is the effect of rhetorical questions?",a:"Rhetorical questions engage the audience by inviting them to think while guiding them toward the writer's answer.\n\nEffects: create shared understanding, challenge the audience, make arguments feel self-evident, position audience as active participants."},{q:"Explain appeal to authority as a persuasive technique.",a:"Citing experts, statistics, or respected figures to support an argument.\n\nExample: 'According to Dr. Chen, a leading psychologist, screen time exceeding two hours is associated with decreased attention spans.'\n\nEffect: builds credibility, positions argument as evidence-based."}],[{q:"Rewrite as analytical: 'The author uses emotive language in the speech.'",a:"Descriptive: 'The author uses emotive language.'\n\nAnalytical: 'The author's deliberate deployment of emotive language - particularly repeated references to \"innocent children\" - functions to elicit sympathy and position the audience to support increased funding.'\n\nKey difference: analytical explains WHAT, HOW, and WHY."},{q:"What does it mean to embed a quote? Fix: The character says 'I have never felt so alone.'",a:"Dropped (weak): The character says 'I have never felt so alone.'\n\nEmbedded (strong): The protagonist's admission that she has 'never felt so alone' reveals the depth of her isolation and foreshadows her breakdown.\n\nEmbedding means weaving the quote into your own sentence naturally."},{q:"Draft a linking sentence connecting a paragraph about setting to one about character.",a:"Sample: 'While the oppressive setting establishes the external forces constraining the protagonist, it is through her evolving response to these constraints that the author most powerfully conveys the theme of personal agency.'\n\nSummarises current paragraph, previews next, connects to theme."},{q:"Identify persuasive techniques: 'Every parent knows our children deserve better. The statistics are clear. The experts agree. So why are we still waiting?'",a:"1. Appeal to common knowledge: 'Every parent knows'\n2. Inclusive language: 'our children', 'we'\n3. Appeal to evidence: 'statistics are clear'\n4. Appeal to authority: 'experts agree'\n5. Rhetorical question: 'why are we still waiting?'\n6. Rule of three: three short statements build momentum"}]],
  science: [[{q:"What are the inputs and outputs of photosynthesis?",a:"Inputs: carbon dioxide + water + light energy\nOutputs: glucose + oxygen\n\nWord equation: carbon dioxide + water --> glucose + oxygen\n\nOccurs in chloroplasts."},{q:"What are the inputs and outputs of cellular respiration?",a:"Inputs: glucose + oxygen\nOutputs: carbon dioxide + water + energy (ATP)\n\nWord equation: glucose + oxygen --> carbon dioxide + water + energy\n\nOccurs in mitochondria."},{q:"What is the difference between aerobic and anaerobic respiration?",a:"Aerobic: requires oxygen, produces 36-38 ATP, occurs in mitochondria.\n\nAnaerobic: no oxygen needed, produces only 2 ATP. In animals produces lactic acid. In yeast produces ethanol + CO2.\n\nAerobic is far more efficient."},{q:"Why do plant cells have both chloroplasts and mitochondria?",a:"Chloroplasts: convert light to glucose (photosynthesis). Only works with light.\n\nMitochondria: convert glucose to ATP (respiration). Works all the time.\n\nPlants need both because photosynthesis makes food, but respiration converts it to usable energy."}],[{q:"A ball is thrown horizontally at 15 m/s from a cliff. It takes 3 seconds to hit the ground. How far from the base does it land?",a:"Horizontal distance = velocity x time\nd = 15 x 3 = 45 metres\n\nHorizontal velocity is constant (no horizontal forces)."},{q:"Calculate maximum height of a ball thrown up at 20 m/s. (g = 9.8 m/s\u00B2)",a:"At max height, v = 0\nv\u00B2 = u\u00B2 + 2as\n0 = 400 - 19.6s\ns = 400/19.6 = 20.4 metres"},{q:"What is the difference between speed and velocity?",a:"Speed: scalar - magnitude only. How fast.\nVelocity: vector - magnitude AND direction.\n\nAn object in a circle at constant speed has changing velocity because direction changes."},{q:"Explain Newton's Third Law with an example.",a:"For every action force, there is an equal and opposite reaction force. They act on different objects.\n\nExample: Your foot pushes backward on the ground (action). The ground pushes forward on your foot (reaction), propelling you forward."}],[{q:"Label the main structures of an animal cell.",a:"1. Cell membrane - controls entry/exit\n2. Nucleus - contains DNA, controls cell\n3. Cytoplasm - where reactions occur\n4. Mitochondria - cellular respiration (ATP)\n5. Ribosomes - protein synthesis\n6. ER (rough) - transports proteins\n7. Golgi apparatus - packages proteins"},{q:"What extra structures do plant cells have?",a:"1. Cell wall - rigid cellulose layer for support\n2. Chloroplasts - site of photosynthesis\n3. Large central vacuole - stores water, maintains turgor pressure\n\nThese reflect plant needs: structure (no skeleton), food production, water balance."},{q:"Describe osmosis and its importance.",a:"Osmosis: movement of water from high water concentration to low water concentration through a selectively permeable membrane.\n\nImportance: maintains turgor pressure, regulates water balance, enables absorption in intestines/kidneys."},{q:"What is DNA and where is it found?",a:"DNA (deoxyribonucleic acid): double-stranded molecule carrying genetic instructions.\n\nStructure: double helix of nucleotides with bases A-T and G-C.\n\nLocation: primarily in the nucleus. Small amount in mitochondria and chloroplasts."}],[{q:"A 5kg object accelerates at 3 m/s\u00B2. What is the net force?",a:"F = ma\nF = 5 x 3 = 15 N\n\n15 Newtons in the direction of acceleration."},{q:"Calculate kinetic energy of a 2kg ball at 10 m/s.",a:"KE = \u00BDmv\u00B2\nKE = \u00BD x 2 x 100 = 100 J"},{q:"A car travels 150km in 2.5 hours. Calculate average speed.",a:"v = d/t = 150/2.5 = 60 km/h\n\nIn m/s: 60 x 1000/3600 = 16.7 m/s"},{q:"An object falls from rest for 4 seconds. How far? (g = 9.8)",a:"s = ut + \u00BDat\u00B2\ns = 0 + \u00BD(9.8)(16) = 78.4 metres"}],[{q:"Explain physical vs chemical changes with examples.",a:"Physical: no new substance formed, usually reversible.\nExamples: ice melting, dissolving sugar\n\nChemical: new substance formed, usually irreversible.\nExamples: rusting iron, burning wood"},{q:"What is the difference between element, compound, and mixture?",a:"Element: one type of atom (oxygen, gold)\nCompound: two+ elements chemically bonded in fixed ratio (water, NaCl)\nMixture: substances combined but not bonded, separable by physical means (salt water, air)"},{q:"Describe the particle model for solids, liquids, and gases.",a:"Solid: closely packed, regular arrangement, vibrate in place. Fixed shape/volume.\nLiquid: close but random, slide past each other. Fixed volume, variable shape.\nGas: far apart, move freely. No fixed shape or volume."},{q:"What is the law of conservation of energy?",a:"Energy cannot be created or destroyed, only transformed.\n\nExample: falling ball - GPE converts to KE. Total energy stays constant.\n\nSome energy always converts to heat through friction, but total is conserved."}]]
};

const qLevels = ["Foundation", "Foundation", "Standard", "Extension", "Extension"];
const qColors = ["#10B981", "#10B981", "#0ABAB5", "#F59E0B", "#F59E0B"];
// `viewer` is set server-side in app/directory/page.js. When a parent is
// signed in (and ideally has hit the worksheet email gate so we have
// their child's year level), the directory exposes prices and replaces
// the trial-signup CTA with an enquiry form. Anonymous visitors see a
// teaser layout that hides prices and pushes them through trial signup.
export default function DirectoryClient({ viewer }) {
  const isAuthed = !!viewer?.email;
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [reportSolutions, setReportSolutions] = useState({});
  const [reportQIndices, setReportQIndices] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });
  // `nearby` defaults to true so the moment a parent picks a suburb,
  // adjacent suburbs are already included in the result set. They can
  // untick if they want strict-suburb-only matching.
  const [filters, setFilters] = useState({ subject: "", yearLevel: "", location: "", nearby: true, online: false });

  const allSubjects = [...new Set(tutors.flatMap(t => t.subjects))].sort();

  const filtered = tutors.filter(t => {
    if (filters.subject && !t.subjects.some(s => s.toLowerCase().includes(filters.subject.toLowerCase()))) return false;
    if (filters.location) {
      const target = filters.location.toLowerCase();
      const tutorLoc = t.location.toLowerCase();
      const matchesExact = tutorLoc === target;
      // "Include nearby" expands the match to suburbs adjacent to the
      // typed one. Curated adjacency map lives in lib/suburbs.js.
      const matchesNearby =
        filters.nearby &&
        getNearby(filters.location)
          .map((s) => s.toLowerCase())
          .includes(tutorLoc);
      if (!matchesExact && !matchesNearby) return false;
    }
    if (filters.online && !t.online) return false;
    return true;
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: c.text, background: c.white, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @media(max-width:768px) {
          .tutor-grid { grid-template-columns: 1fr !important; }
          .filter-bar { flex-direction: column !important; }
          .filter-bar select, .filter-bar label { width: 100% !important; }
          .profile-modal-inner { grid-template-columns: 1fr !important; max-width: 95vw !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${c.border}`, padding: "0 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: c.white }}>T</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: c.navy }}>tuterly</span>
          </a>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href="/parents" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>For Parents</a>
            <a href="/worksheets" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Free Worksheets</a>
            <a href="/directory" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.teal, textDecoration: "none" }}>Find a Tutor</a>
            <a href="/tutors" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Apply as a Tutor</a>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Log in</a>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: c.navy, color: c.white, textDecoration: "none" }}>Start free trial</a>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ padding: "120px 40px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: c.navy, marginBottom: 8 }}>Find a tutor</h1>
          <p style={{ fontSize: 16, color: c.textLight, marginBottom: 16 }}>Every tutor on Tuterly is a high achiever in the subjects they teach, and trained to use the Tuterly platform.</p>
          <p style={{ fontSize: 14, color: c.textLight, marginBottom: 28, maxWidth: 700 }}>This means every lesson is structured, a detailed report is prepared after every session, progress is tracked over time, and you're always kept in the loop with exactly what's happening. No guesswork, no vague updates.</p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            {[
              { icon: "🎓", text: "High-achieving tutors" },
              { icon: "📋", text: "Report after every session" },
              { icon: "📊", text: "Progress tracked over time" },
              { icon: "💬", text: "Parents kept in the loop" },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: c.white, border: `1px solid ${c.border}`, borderRadius: 8, padding: "6px 14px" }}>
                <span style={{ fontSize: 14 }}>{b.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.navy }}>{b.text}</span>
              </div>
            ))}
          </div>

          {/* FILTERS */}
          <div className="filter-bar" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <select value={filters.subject} onChange={e => setFilters(p => ({ ...p, subject: e.target.value }))} style={{ padding: "10px 14px", borderRadius: 8, border: `1px solid ${c.border}`, fontSize: 14, color: c.text, background: c.white, minWidth: 180 }}>
              <option value="">All subjects</option>
              {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <SuburbAutocomplete
              value={filters.location}
              onChange={(loc) => setFilters((p) => ({ ...p, location: loc }))}
              placeholder="Suburb"
              width={200}
            />
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: filters.location ? c.textLight : c.textMuted, cursor: filters.location ? "pointer" : "not-allowed" }} title={filters.location ? "" : "Pick a suburb first"}>
              <input
                type="checkbox"
                checked={filters.nearby}
                disabled={!filters.location}
                onChange={(e) => setFilters((p) => ({ ...p, nearby: e.target.checked }))}
                style={{ accentColor: c.teal }}
              />
              Include nearby suburbs
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: c.textLight, cursor: "pointer" }}>
              <input type="checkbox" checked={filters.online} onChange={e => setFilters(p => ({ ...p, online: e.target.checked }))} style={{ accentColor: c.teal }} />
              Online available
            </label>
            {(filters.subject || filters.location || filters.online) && (
              <button onClick={() => setFilters({ subject: "", yearLevel: "", location: "", nearby: true, online: false })} style={{ fontSize: 13, color: c.teal, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Clear filters</button>
            )}
            <p style={{ fontSize: 13, color: c.textMuted, marginLeft: "auto" }}>{filtered.length} tutor{filtered.length !== 1 ? "s" : ""} found</p>
          </div>
        </div>
      </section>

      {/* TUTOR GRID */}
      <section style={{ padding: "32px 40px 80px", background: c.offWhite }}>
        <div className="tutor-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {filtered.map((t, i) => (
            <div key={i} onClick={() => setSelectedTutor(t)} style={{ background: c.white, borderRadius: 16, padding: "24px 22px", border: `1px solid ${c.border}`, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: c.white, flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy }}>{t.name}</p>
                    {t.sessions >= 100 && <div style={{ background: c.tealPale, borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 700, color: c.tealDark, textTransform: "uppercase", letterSpacing: 0.5 }}>Verified</div>}
                  </div>
                  <p style={{ fontSize: 12, color: c.textMuted }}>{t.location} {t.online && t.inPerson ? "· Online & In-person" : t.online ? "· Online only" : "· In-person only"}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                {t.subjects.map((s, j) => <span key={j} style={{ fontSize: 11, fontWeight: 600, color: c.textLight, background: c.offWhite, border: `1px solid ${c.border}`, borderRadius: 6, padding: "3px 8px" }}>{s}</span>)}
              </div>
              <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t.bio}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: c.amber, fontWeight: 600 }}>★ {t.rating}</span>
                  <span style={{ fontSize: 12, color: c.textMuted }}>{t.sessions} sessions</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy }}>${t.rate}<span style={{ fontSize: 12, color: c.textMuted, fontWeight: 400 }}>/hr</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TUTOR PROFILE MODAL */}
      {selectedTutor && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setSelectedTutor(null)}>
          <div className="profile-modal-inner" onClick={e => e.stopPropagation()} style={{ background: c.white, borderRadius: 20, maxWidth: 800, width: "100%", maxHeight: "90vh", overflow: "auto", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {/* Left - Profile */}
            <div style={{ padding: "32px 28px", borderRight: `1px solid ${c.border}` }}>
              <button onClick={() => setSelectedTutor(null)} style={{ position: "absolute", fontSize: 12, color: c.textMuted, background: "none", border: "none", cursor: "pointer" }}>← Back</button>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20, marginTop: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: selectedTutor.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: c.white }}>{selectedTutor.initials}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: c.navy }}>{selectedTutor.name}</p>
                    {selectedTutor.sessions >= 100 && <div style={{ background: c.tealPale, borderRadius: 4, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: c.tealDark }}>Verified</div>}
                  </div>
                  <p style={{ fontSize: 13, color: c.textMuted }}>{selectedTutor.location}</p>
                </div>
              </div>

              <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, marginBottom: 20 }}>{selectedTutor.bio}</p>

              <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
                <div><p style={{ fontSize: 11, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Subjects</p><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{selectedTutor.subjects.map((s, i) => <span key={i} style={{ fontSize: 12, fontWeight: 600, color: c.teal, background: c.tealPale, borderRadius: 6, padding: "4px 10px" }}>{s}</span>)}</div></div>
                <div><p style={{ fontSize: 11, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Year levels</p><p style={{ fontSize: 14, fontWeight: 600, color: c.navy }}>{selectedTutor.yearLevels}</p></div>
                <div><p style={{ fontSize: 11, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Languages</p><p style={{ fontSize: 14, fontWeight: 600, color: c.navy }}>{selectedTutor.languages.join(", ")}</p></div>
                <div><p style={{ fontSize: 11, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Availability</p><p style={{ fontSize: 14, fontWeight: 600, color: c.navy }}>{selectedTutor.online && selectedTutor.inPerson ? "Online & In-person" : selectedTutor.online ? "Online only" : "In-person only"}</p></div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <div style={{ background: c.offWhite, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: c.navy }}>{selectedTutor.sessions}</p>
                  <p style={{ fontSize: 11, color: c.textMuted }}>Sessions</p>
                </div>
                <div style={{ background: c.offWhite, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: c.amber }}>★ {selectedTutor.rating}</p>
                  <p style={{ fontSize: 11, color: c.textMuted }}>Rating</p>
                </div>
                <div style={{ background: c.offWhite, borderRadius: 10, padding: "12px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: c.success }}>+{selectedTutor.improvement}%</p>
                  <p style={{ fontSize: 11, color: c.textMuted }}>Avg improvement</p>
                </div>
              </div>
            </div>

            {/* Right - CTA / Signup wall */}
            <div style={{ padding: "32px 28px", background: c.offWhite, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {!showSignup ? (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: c.navy, marginBottom: 4 }}>${selectedTutor.rate}<span style={{ fontSize: 16, color: c.textMuted, fontWeight: 400 }}>/hr</span></p>
                  <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 24 }}>Rate set by {selectedTutor.name}</p>

                  <div style={{ background: c.white, borderRadius: 14, padding: "24px 20px", border: `1px solid ${c.border}`, marginBottom: 20, textAlign: "left" }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 12 }}>What's included with Tuterly</p>
                    <div style={{ display: "grid", gap: 8 }}>
                      {["Connect directly with the tutor", "Detailed report after every session", "Progress tracking across all topics", "VCAA-aligned practice questions", "7-day free trial"].map((f, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: c.teal, fontWeight: 700 }}>✓</span>
                          <span style={{ fontSize: 13, color: c.textLight }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => (isAuthed ? setShowEnquiry(true) : setShowSignup(true))}
                    style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: c.navy, color: c.white, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}
                  >
                    Contact {selectedTutor.name}
                  </button>
                  <p style={{ fontSize: 12, color: c.textMuted, marginBottom: 16 }}>
                    {isAuthed
                      ? "We'll forward your enquiry and put you in touch."
                      : "Start your 7-day free trial to send your enquiry. Cancel anytime."}
                  </p>
                  {sampleReports[selectedTutor.name] && (
                    <button onClick={() => { setShowReport(true); setReportSolutions({}); setReportQIndices({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }); }} style={{ width: "100%", padding: "12px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.white, color: c.teal, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      📋 See a weekly report by {selectedTutor.name}
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 4 }}>Start your free trial</p>
                  <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 20 }}>Connect with {selectedTutor.name} and get access to all Tuterly features.</p>

                  <div style={{ display: "grid", gap: 12 }}>
                    <a href="https://app.tuterly.com.au" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.white, textDecoration: "none", color: c.text, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                      Continue with Google
                    </a>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ flex: 1, height: 1, background: c.border }} />
                      <span style={{ fontSize: 12, color: c.textMuted }}>or</span>
                      <div style={{ flex: 1, height: 1, background: c.border }} />
                    </div>
                    <input placeholder="Email address" style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${c.border}`, fontSize: 14, outline: "none" }} />
                    <button onClick={() => window.location.href = 'https://app.tuterly.com.au'} style={{ padding: "12px", borderRadius: 10, border: "none", background: c.navy, color: c.white, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Continue with email</button>
                  </div>

                  <button onClick={() => setShowSignup(false)} style={{ display: "block", margin: "16px auto 0", fontSize: 13, color: c.textMuted, background: "none", border: "none", cursor: "pointer" }}>← Back to profile</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SAMPLE REPORT MODAL */}
      {showReport && selectedTutor && sampleReports[selectedTutor.name] && (() => {
        const rpt = sampleReports[selectedTutor.name];
        return (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setShowReport(false)}>
            <div onClick={e => e.stopPropagation()} style={{ background: c.white, borderRadius: 20, maxWidth: 650, width: "100%", maxHeight: "90vh", overflow: "auto" }}>
              <div style={{ background: c.navy, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "20px 20px 0 0" }}>
                <div>
                  <p style={{ color: c.teal, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>Session Report</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>by {selectedTutor.name} via tuterly</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{rpt.date}</p>
                  <button onClick={() => setShowReport(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 6, padding: "4px 10px", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 12 }}>✕</button>
                </div>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[{ l: "Student", v: rpt.student }, { l: "Year Level", v: rpt.year }, { l: "Subject", v: rpt.subject }, { l: "Tutor", v: selectedTutor.name }].map((item, i) => (
                    <div key={i}><p style={{ fontSize: 10, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>{item.l}</p><p style={{ fontSize: 14, fontWeight: 600, color: c.navy }}>{item.v}</p></div>
                  ))}
                </div>

                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 8 }}>What We Covered</p>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>{rpt.summary}</p>
                </div>

                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 8 }}>How {rpt.student.split(" ")[0]} Went</p>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>{rpt.performance}</p>
                </div>

                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 10 }}>Topic Confidence</p>
                  {rpt.topics.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" }}>
                      <span style={{ fontSize: 13, color: c.textLight }}>{item.t}</span>
                      <div style={{ display: "flex", gap: 3 }}>{[1, 2, 3, 4, 5].map(v => <div key={v} style={{ width: 10, height: 10, borderRadius: 3, background: v <= item.r ? c.teal : `${c.teal}20` }} />)}</div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 8 }}>Areas to Focus On</p>
                  {rpt.focus.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "start", marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.teal, marginTop: 6, flexShrink: 0 }} />
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.5 }}>{a}</p>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 12 }}>Practice Questions</p>
                  <div style={{ display: "grid", gap: 8 }}>
                    {(questionBanks[rpt.questionsKey] || questionBanks.maths).map((bank, i) => {
                      const qi = reportQIndices[i] || 0;
                      const question = bank[qi];
                      return (
                        <div key={i} style={{ background: c.offWhite, borderRadius: 10, padding: "12px 14px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: c.navy }}>{question.q}</p>
                            <span style={{ fontSize: 10, fontWeight: 600, color: qColors[i], background: `${qColors[i]}15`, padding: "2px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 8 }}>{qLevels[i]}</span>
                          </div>
                          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <button onClick={() => setReportSolutions(p => ({ ...p, [i]: !p[i] }))} style={{ fontSize: 12, color: c.teal, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                              {reportSolutions[i] ? "Hide solution ▴" : "View solution ▾"}
                            </button>
                            <button onClick={() => { setReportQIndices(p => ({ ...p, [i]: (p[i] + 1) % bank.length })); setReportSolutions(p => ({ ...p, [i]: false })); }} style={{ fontSize: 11, color: c.textMuted, fontWeight: 600, background: "none", border: `1px solid ${c.border}`, borderRadius: 6, cursor: "pointer", padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                              ↻ New question
                            </button>
                          </div>
                          {reportSolutions[i] && (
                            <div style={{ marginTop: 8, padding: "10px 12px", background: c.white, borderRadius: 6, border: `1px solid ${c.border}` }}>
                              <p style={{ fontSize: 12, color: c.textLight, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{question.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 24px 24px", borderTop: `1px solid ${c.border}`, textAlign: "center" }}>
                <button onClick={() => { setShowReport(false); setShowSignup(true); }} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: c.navy, color: c.white, fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 6 }}>Start 7-day free trial with {selectedTutor.name}</button>
                <button onClick={() => setShowReport(false)} style={{ fontSize: 13, color: c.textMuted, background: "none", border: "none", cursor: "pointer" }}>← Back to profile</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* TALK TO A CONSULTANT */}
      <section style={{ padding: "56px 40px", background: c.offWhite, textAlign: "center" }}>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Not sure where to start?</p>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: c.navy, lineHeight: 1.25, marginBottom: 10 }}>Speak to our educational consultant</h3>
        <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 18px" }}>Tell us about your child and we&apos;ll match you with the right tutor. No commitment, no cost.</p>
        <a href="tel:0426787978" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 12, background: c.navy, color: c.white, fontSize: 16, fontWeight: 700, textDecoration: "none" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call 0426 787 978
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: c.navy, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: c.white }}>T</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>tuterly</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 Tuterly by Bayside Academics</p>
        </div>
      </footer>

      {showEnquiry && selectedTutor && (
        <EnquiryFormModal
          tutorName={selectedTutor.name}
          parentName={viewer?.fullName || ""}
          parentEmail={viewer?.email || ""}
          childYearLevel={viewer?.childYearLevel || ""}
          onClose={() => setShowEnquiry(false)}
        />
      )}
    </div>
  );
}

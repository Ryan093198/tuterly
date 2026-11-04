const R = String.raw;

// Skill pages, batch A (4 Nov 2026): one standalone page per skill search,
// e.g. "adding fractions worksheet". Volumes are Australian monthly
// searches from Google Keyword Planner (Nov 2026). Every example and quiz
// answer was checked in code (scratchpad/check-skills-a.mjs).
// Australian spelling, no em or en dashes, money as \$ outside maths.

export const SKILL_PAGES_A = [
  {
    slug: "fractions",
    keyword: "fraction worksheets",
    monthlySearches: 1000,
    topicSlug: "year-7-fraction-operations",
    relatedSlugs: ["year-7-fraction-operations", "year-7-fractions-decimals", "year-7-percentages", "year-7-ratios"],
    metaTitle: "Fraction Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free fraction worksheets with answers: equivalent fractions, simplifying, adding, subtracting, multiplying and dividing fractions, and mixed numbers. Worked examples and a quick check.",
    h1: "Fraction worksheets with answers",
    lead: "Every fraction skill a secondary student needs, from simplifying to dividing mixed numbers. Learn each one with a worked example, then make a free worksheet with full solutions.",
    guide: {
      title: "Fractions, explained",
      lead: "Six skills cover almost every fraction question in Years 7 to 10. Here they are, one at a time.",
      sections: [
        {
          h: "1. Equivalent fractions",
          md: R`Multiplying or dividing the top and bottom by the same number gives an equal fraction:
$$\frac{3}{4} = \frac{6}{8} = \frac{9}{12}$$
This is the idea behind simplifying and behind adding fractions with different denominators.`,
        },
        {
          h: "2. Simplifying",
          md: R`Divide the numerator and denominator by their highest common factor (HCF). For $\frac{18}{24}$ the HCF is $6$:
$$\frac{18}{24} = \frac{18 \div 6}{24 \div 6} = \frac{3}{4}$$`,
        },
        {
          h: "3. Adding and subtracting",
          md: R`Fractions need the same denominator before you add or subtract. Use the lowest common denominator, then add the numerators only:
$$\frac{2}{3} + \frac{1}{4} = \frac{8}{12} + \frac{3}{12} = \frac{11}{12}$$`,
        },
        {
          h: "4. Multiplying",
          md: R`Multiply the numerators, multiply the denominators, then simplify:
$$\frac{3}{5} \times \frac{10}{9} = \frac{30}{45} = \frac{2}{3}$$
No common denominator is needed when multiplying.`,
        },
        {
          h: "5. Dividing",
          md: R`Keep the first fraction, change $\div$ to $\times$, and flip the second fraction:
$$\frac{3}{4} \div \frac{2}{5} = \frac{3}{4} \times \frac{5}{2} = \frac{15}{8} = 1\frac{7}{8}$$`,
        },
        {
          h: "6. Mixed numbers and improper fractions",
          md: R`To change $2\frac{1}{3}$ to an improper fraction, multiply the whole number by the denominator and add the numerator: $2 \times 3 + 1 = 7$, so $2\frac{1}{3} = \frac{7}{3}$.

To go back, divide: $17 \div 5 = 3$ remainder $2$, so $\frac{17}{5} = 3\frac{2}{5}$. Change mixed numbers to improper fractions before multiplying or dividing.`,
        },
      ],
      quiz: [
        { q: R`Simplify $\frac{12}{16}$.`, a: R`$\frac{3}{4}$` },
        { q: R`Write $2\frac{3}{5}$ as an improper fraction.`, a: R`$\frac{13}{5}$` },
        { q: R`Calculate $\frac{1}{5} + \frac{2}{5}$.`, a: R`$\frac{3}{5}$` },
        { q: R`Calculate $\frac{5}{6} - \frac{1}{3}$.`, a: R`$\frac{5}{6} - \frac{2}{6} = \frac{3}{6} = \frac{1}{2}$` },
        { q: R`Calculate $\frac{2}{3} \times \frac{3}{8}$.`, a: R`$\frac{6}{24} = \frac{1}{4}$` },
        { q: R`Calculate $\frac{4}{5} \div \frac{2}{3}$.`, a: R`$\frac{4}{5} \times \frac{3}{2} = \frac{12}{10} = 1\frac{1}{5}$` },
        { q: R`Calculate $\frac{1}{2} + \frac{2}{3}$.`, a: R`$\frac{3}{6} + \frac{4}{6} = \frac{7}{6} = 1\frac{1}{6}$` },
        { q: R`Calculate $1\frac{1}{2} \times 2\frac{2}{3}$.`, a: R`$\frac{3}{2} \times \frac{8}{3} = \frac{24}{6} = 4$` },
        { q: R`What fraction of $60$ is $45$? Give it in simplest form.`, a: R`$\frac{45}{60} = \frac{3}{4}$` },
        { q: R`In a class of $32$ students, $\frac{3}{4}$ walk to school. How many students walk?`, a: R`$\frac{3}{4} \times 32 = 24$ students` },
      ],
    },
    faqs: [
      { q: "What fraction skills do Year 7 students need?", a: "Year 7 students simplify fractions, find equivalent fractions, convert between mixed numbers and improper fractions, and add, subtract, multiply and divide fractions, including mixed numbers. These skills are used again in algebra, ratios and probability." },
      { q: "Do the fraction worksheets come with answers?", a: "Yes. Every question on a generated worksheet has a fully worked solution, and every example on this page shows each step." },
      { q: "Why do students find fractions hard?", a: "Most errors come from mixing up the rules: adding the denominators, or looking for a common denominator when multiplying. Practising each operation separately, then mixing them, fixes this." },
    ],
  },

  {
    slug: "area-of-composite-shapes",
    keyword: "area of composite shapes worksheet",
    monthlySearches: 390,
    topicSlug: "year-7-area-perimeter",
    relatedSlugs: ["year-7-area-perimeter", "year-8-area-perimeter", "year-8-circles"],
    metaTitle: "Area of Composite Shapes Worksheets with Answers | Tuterly",
    metaDescription:
      "Free area of composite shapes worksheets with answers: L-shapes, shapes with parts cut out, rectangles with triangles and semicircles, and borders and paths. Worked examples and a quick check.",
    h1: "Area of composite shapes worksheets with answers",
    lead: "A composite shape is made of simpler shapes joined together or cut out of each other. Learn the two methods, then make a free worksheet with full solutions.",
    guide: {
      title: "Area of composite shapes, explained",
      lead: "Every composite area question is solved by splitting the shape up or by subtracting a piece. Here's how to choose, with examples.",
      sections: [
        {
          h: "1. Method 1: split and add",
          md: R`Split the shape into rectangles, triangles or circles, find each area, then add. An L-shape made of an $8$ m by $3$ m rectangle and a $4$ m by $5$ m rectangle has area
$$8 \times 3 + 4 \times 5 = 24 + 20 = 44 \text{ m}^2$$`,
        },
        {
          h: "2. Method 2: subtract the missing piece",
          md: R`If a piece has been cut out, find the area of the whole shape and subtract the piece. A $12$ cm by $9$ cm rectangle with a $4$ cm by $3$ cm corner removed has area
$$12 \times 9 - 4 \times 3 = 108 - 12 = 96 \text{ cm}^2$$`,
        },
        {
          h: "3. Rectangles with triangles",
          md: R`A rectangle $10$ m by $6$ m with a triangle on top (base $10$ m, height $4$ m) has area
$$10 \times 6 + \frac{1}{2} \times 10 \times 4 = 60 + 20 = 80 \text{ m}^2$$`,
        },
        {
          h: "4. Shapes with semicircles",
          md: R`A semicircle is half a circle, so its area is $\frac{1}{2}\pi r^2$. A rectangle $10$ cm by $6$ cm with a semicircle on a $6$ cm side has $r = 3$:
$$60 + \frac{1}{2} \times \pi \times 3^2 \approx 60 + 14.14 = 74.14 \text{ cm}^2$$
Remember to halve the diameter to get the radius.`,
        },
        {
          h: "5. Finding missing lengths",
          md: R`Diagrams often leave a side unlabelled. Use the opposite sides: in an L-shape that is $10$ m wide overall, if the top part is $4$ m wide, the bottom step is $10 - 4 = 6$ m wide. Write every length on the diagram before you calculate.`,
        },
        {
          h: "6. Borders, frames and paths",
          md: R`For a path around a lawn, find the area of the outer rectangle and subtract the lawn. A $12$ m by $8$ m lawn with a $1$ m path all the way around makes an outer rectangle $14$ m by $10$ m:
$$14 \times 10 - 12 \times 8 = 140 - 96 = 44 \text{ m}^2$$
Add the path width on both sides, not just one.`,
        },
      ],
      quiz: [
        { q: R`A shape is made from a $5$ cm by $2$ cm rectangle and a $3$ cm by $4$ cm rectangle. Find its area.`, a: R`$10 + 12 = 22$ cm²` },
        { q: R`A $3$ m by $3$ m square is cut out of a $10$ m by $8$ m rectangle. Find the area left.`, a: R`$80 - 9 = 71$ m²` },
        { q: R`A $12$ cm by $5$ cm rectangle has a triangle on top with base $12$ cm and height $4$ cm. Find the total area.`, a: R`$60 + 24 = 84$ cm²` },
        { q: R`A $6$ cm square has a semicircle on one side, with that side as its diameter. Find the total area to 2 decimal places.`, a: R`$36 + \frac{1}{2}\pi(3)^2 \approx 50.14$ cm²` },
        { q: R`An L-shape is a $10$ m by $7$ m rectangle with a $4$ m by $3$ m corner removed. Find its area.`, a: R`$70 - 12 = 58$ m²` },
        { q: R`An $8$ m by $5$ m rectangle has a right-angled triangle attached with shorter sides $3$ m and $5$ m. Find the total area.`, a: R`$40 + 7.5 = 47.5$ m²` },
        { q: R`A photo frame is $20$ cm by $15$ cm on the outside and $16$ cm by $11$ cm on the inside. Find the area of the frame.`, a: R`$300 - 176 = 124$ cm²` },
        { q: R`A circle of radius $2$ cm is cut out of a $14$ cm by $6$ cm rectangle. Find the area left, to 2 decimal places.`, a: R`$84 - 4\pi \approx 71.43$ cm²` },
        { q: R`A house-shaped outline is a $9$ m square with a triangular roof of base $9$ m and height $5$ m. Find its area.`, a: R`$81 + 22.5 = 103.5$ m²` },
        { q: R`A $12$ m by $8$ m lawn has a path $1$ m wide all the way around it. Find the area of the path.`, a: R`$140 - 96 = 44$ m²` },
      ],
    },
    faqs: [
      { q: "What is a composite shape?", a: "A composite shape is made from two or more simple shapes, such as rectangles, triangles and semicircles, joined together or with one cut out of another." },
      { q: "How do you find the area of a composite shape?", a: "Either split it into simple shapes and add their areas, or find the area of a larger shape and subtract the part that is missing. Choose whichever needs fewer calculations." },
      { q: "Which year level learns composite area?", a: "Composite areas start in Year 7 with rectangles and triangles, and in Year 8 they include circles and semicircles. They also come up again in Year 9 and 10 surface area problems." },
    ],
  },

  {
    slug: "area-of-a-triangle",
    keyword: "area of a triangle worksheet",
    monthlySearches: 320,
    topicSlug: "year-7-area-perimeter",
    relatedSlugs: ["year-7-area-perimeter", "year-8-area-perimeter", "year-7-angles-in-triangles", "year-8-pythagoras"],
    metaTitle: "Area of a Triangle Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free area of a triangle worksheets with answers: the formula, choosing the perpendicular height, right-angled and obtuse triangles, and finding a missing base or height. Worked examples and a quick check.",
    h1: "Area of a triangle worksheets with answers",
    lead: "The area of a triangle is half the base times the perpendicular height. Learn when and how to use it, then make a free worksheet with full solutions.",
    guide: {
      title: "Area of a triangle, explained",
      lead: "One formula, and one thing to watch: the height must be perpendicular to the base.",
      sections: [
        {
          h: "1. The formula",
          md: R`$$A = \frac{1}{2} \times b \times h$$
A triangle is half of a rectangle with the same base and height, which is where the half comes from. For $b = 8$ cm and $h = 5$ cm:
$$A = \frac{1}{2} \times 8 \times 5 = 20 \text{ cm}^2$$`,
        },
        {
          h: "2. Use the perpendicular height",
          md: R`The height is the distance from the base to the opposite corner, measured at right angles to the base. It is often shown as a dashed line with a small square. A sloping side is not the height, and using it is the most common mistake.`,
        },
        {
          h: "3. Right-angled triangles",
          md: R`In a right-angled triangle, the two sides that meet at the right angle are the base and the height. With those sides $6$ cm and $9$ cm:
$$A = \frac{1}{2} \times 6 \times 9 = 27 \text{ cm}^2$$`,
        },
        {
          h: "4. Obtuse triangles",
          md: R`In an obtuse triangle the height can fall outside the triangle, along an extended base. The formula is the same: a base of $7$ cm and a height of $4$ cm still gives
$$A = \frac{1}{2} \times 7 \times 4 = 14 \text{ cm}^2$$`,
        },
        {
          h: "5. Finding a missing base or height",
          md: R`Substitute what you know and solve. If the area is $36$ cm² and the base is $9$ cm:
$$36 = \frac{1}{2} \times 9 \times h, \quad 36 = 4.5h, \quad h = 8 \text{ cm}$$`,
        },
        {
          h: "6. Word problems",
          md: R`A triangular sail has a base of $3$ m and a height of $4.5$ m:
$$A = \frac{1}{2} \times 3 \times 4.5 = 6.75 \text{ m}^2$$
Check the units are the same before you multiply, and give the answer in square units.`,
        },
      ],
      quiz: [
        { q: R`Find the area of a triangle with base $10$ cm and height $6$ cm.`, a: R`$30$ cm²` },
        { q: R`Find the area of a triangle with base $7$ m and height $4$ m.`, a: R`$14$ m²` },
        { q: R`A right-angled triangle has shorter sides $5$ cm and $12$ cm. Find its area.`, a: R`$30$ cm²` },
        { q: R`Find the area of a triangle with base $9$ cm and height $5$ cm.`, a: R`$22.5$ cm²` },
        { q: R`Find the area of a triangle with base $2.4$ m and height $1.5$ m.`, a: R`$1.8$ m²` },
        { q: R`A triangle has an area of $40$ cm² and a base of $10$ cm. Find its height.`, a: R`$8$ cm` },
        { q: R`A triangle has an area of $27$ m² and a height of $6$ m. Find its base.`, a: R`$9$ m` },
        { q: R`A triangle has sides $3$ cm, $4$ cm and $5$ cm, with a right angle between the $3$ cm and $4$ cm sides. Find its area.`, a: R`$6$ cm²` },
        { q: R`A triangle has corners at $(0, 0)$, $(8, 0)$ and $(3, 6)$ on a grid. Find its area.`, a: R`$\frac{1}{2} \times 8 \times 6 = 24$ square units` },
        { q: R`A triangular garden bed has a base of $6$ m and a height of $4$ m. Soil costs \$12 per square metre. How much will the soil cost?`, a: R`Area $= 12$ m², so \$144` },
      ],
    },
    faqs: [
      { q: "What is the formula for the area of a triangle?", a: "Area equals half the base times the perpendicular height. The height must be measured at right angles to the base, not along a sloping side." },
      { q: "Does the formula work for every triangle?", a: "Yes. It works for right-angled, acute and obtuse triangles. For an obtuse triangle the height may fall outside the triangle, but the formula is the same." },
      { q: "Do the worksheets include answers?", a: "Yes. Every question on a generated worksheet comes with a fully worked solution, so students can check each step." },
    ],
  },

  {
    slug: "adding-fractions",
    keyword: "adding fractions worksheet",
    monthlySearches: 260,
    topicSlug: "year-7-fraction-operations",
    relatedSlugs: ["year-7-fraction-operations", "year-7-fractions-decimals", "year-7-ratios"],
    metaTitle: "Adding Fractions Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free adding fractions worksheets with answers: same and different denominators, mixed numbers, subtracting fractions and word problems. Worked examples and a quick check.",
    h1: "Adding fractions worksheets with answers",
    lead: "Adding fractions comes down to one rule: make the denominators the same first. Learn every type of question, then make a free worksheet with full solutions.",
    guide: {
      title: "Adding fractions, explained",
      lead: "From the simplest case to mixed numbers and word problems, with an example of each.",
      sections: [
        {
          h: "1. Same denominator",
          md: R`Add the numerators and keep the denominator:
$$\frac{2}{7} + \frac{3}{7} = \frac{5}{7}$$
Never add the denominators. $\frac{2}{7} + \frac{3}{7}$ is not $\frac{5}{14}$.`,
        },
        {
          h: "2. One denominator is a multiple of the other",
          md: R`Change one fraction so they match, then add and simplify:
$$\frac{1}{3} + \frac{1}{6} = \frac{2}{6} + \frac{1}{6} = \frac{3}{6} = \frac{1}{2}$$`,
        },
        {
          h: "3. Different denominators",
          md: R`Find the lowest common denominator (LCD), the smallest number both denominators divide into. For $4$ and $5$ it is $20$:
$$\frac{3}{4} + \frac{2}{5} = \frac{15}{20} + \frac{8}{20} = \frac{23}{20} = 1\frac{3}{20}$$`,
        },
        {
          h: "4. Mixed numbers",
          md: R`Add the whole numbers, then the fractions, then tidy up:
$$1\frac{2}{3} + 2\frac{3}{4} = 3 + \frac{8}{12} + \frac{9}{12} = 3 + \frac{17}{12} = 4\frac{5}{12}$$`,
        },
        {
          h: "5. Subtracting works the same way",
          md: R`Make the denominators the same, then subtract the numerators:
$$\frac{5}{6} - \frac{1}{4} = \frac{10}{12} - \frac{3}{12} = \frac{7}{12}$$`,
        },
        {
          h: "6. Word problems",
          md: R`Sam eats $\frac{1}{2}$ of a pizza and Mia eats $\frac{1}{3}$. Together they eat
$$\frac{3}{6} + \frac{2}{6} = \frac{5}{6}$$
of the pizza, so $\frac{1}{6}$ is left. Look for words like "altogether" and "in total" for adding, and "left" or "more than" for subtracting.`,
        },
      ],
      quiz: [
        { q: R`Calculate $\frac{1}{5} + \frac{3}{5}$.`, a: R`$\frac{4}{5}$` },
        { q: R`Calculate $\frac{2}{9} + \frac{4}{9}$ and simplify.`, a: R`$\frac{6}{9} = \frac{2}{3}$` },
        { q: R`Calculate $\frac{1}{2} + \frac{1}{4}$.`, a: R`$\frac{3}{4}$` },
        { q: R`Calculate $\frac{2}{3} + \frac{1}{6}$.`, a: R`$\frac{5}{6}$` },
        { q: R`Calculate $\frac{3}{5} + \frac{1}{4}$.`, a: R`$\frac{12}{20} + \frac{5}{20} = \frac{17}{20}$` },
        { q: R`Calculate $\frac{5}{6} + \frac{3}{4}$.`, a: R`$\frac{10}{12} + \frac{9}{12} = \frac{19}{12} = 1\frac{7}{12}$` },
        { q: R`Calculate $1\frac{1}{2} + 2\frac{1}{3}$.`, a: R`$3\frac{5}{6}$` },
        { q: R`Calculate $\frac{7}{8} - \frac{1}{3}$.`, a: R`$\frac{21}{24} - \frac{8}{24} = \frac{13}{24}$` },
        { q: R`Calculate $2\frac{3}{4} + 1\frac{5}{6}$.`, a: R`$3 + \frac{19}{12} = 4\frac{7}{12}$` },
        { q: R`Ella runs $\frac{3}{4}$ km, then walks $\frac{2}{3}$ km. How far does she go altogether?`, a: R`$\frac{9}{12} + \frac{8}{12} = \frac{17}{12} = 1\frac{5}{12}$ km` },
      ],
    },
    faqs: [
      { q: "How do you add fractions with different denominators?", a: "Rewrite both fractions with the lowest common denominator, add the numerators, keep the denominator, then simplify. For example, one half plus one third is three sixths plus two sixths, which is five sixths." },
      { q: "Do you add the denominators when adding fractions?", a: "No. Only the numerators are added once the denominators match. Adding the denominators is the most common fraction mistake." },
      { q: "How do you add mixed numbers?", a: "Add the whole numbers and the fractions separately. If the fractions add to more than one, carry the extra whole into the whole-number part." },
    ],
  },

  {
    slug: "dividing-fractions",
    keyword: "dividing fractions worksheet",
    monthlySearches: 210,
    topicSlug: "year-7-fraction-operations",
    relatedSlugs: ["year-7-fraction-operations", "year-7-fractions-decimals", "year-7-ratios"],
    metaTitle: "Dividing Fractions Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free dividing fractions worksheets with answers: keep, change, flip, dividing by whole numbers, mixed numbers, cancelling first and word problems. Worked examples and a quick check.",
    h1: "Dividing fractions worksheets with answers",
    lead: "To divide by a fraction, multiply by its reciprocal. Learn why it works and every type of question, then make a free worksheet with full solutions.",
    guide: {
      title: "Dividing fractions, explained",
      lead: "The rule is quick to learn. Knowing why it works stops it getting mixed up with the other fraction rules.",
      sections: [
        {
          h: "1. What dividing by a fraction means",
          md: R`$3 \div \frac{1}{2}$ asks how many halves fit into $3$. There are two halves in each whole, so
$$3 \div \frac{1}{2} = 6$$
Dividing by a fraction less than one gives a bigger answer.`,
        },
        {
          h: "2. Keep, change, flip",
          md: R`Keep the first fraction, change $\div$ to $\times$, flip the second fraction, then multiply:
$$\frac{2}{3} \div \frac{4}{5} = \frac{2}{3} \times \frac{5}{4} = \frac{10}{12} = \frac{5}{6}$$
Only the second fraction is flipped.`,
        },
        {
          h: "3. Dividing by a whole number",
          md: R`Write the whole number as a fraction over $1$, then flip it:
$$\frac{3}{4} \div 6 = \frac{3}{4} \times \frac{1}{6} = \frac{3}{24} = \frac{1}{8}$$`,
        },
        {
          h: "4. Mixed numbers",
          md: R`Change mixed numbers to improper fractions first:
$$2\frac{1}{2} \div 1\frac{1}{4} = \frac{5}{2} \div \frac{5}{4} = \frac{5}{2} \times \frac{4}{5} = 2$$`,
        },
        {
          h: "5. Cancel before you multiply",
          md: R`After flipping, cancel common factors across the multiplication to keep the numbers small:
$$\frac{9}{10} \div \frac{3}{5} = \frac{9}{10} \times \frac{5}{3} = \frac{3}{2} \times \frac{1}{1} = \frac{3}{2} = 1\frac{1}{2}$$
Here $9$ and $3$ share a factor of $3$, and $10$ and $5$ share a factor of $5$.`,
        },
        {
          h: "6. Word problems",
          md: R`How many $\frac{1}{8}$ L cups can be filled from $\frac{3}{4}$ L of juice?
$$\frac{3}{4} \div \frac{1}{8} = \frac{3}{4} \times \frac{8}{1} = 6 \text{ cups}$$
Questions asking "how many fit" or "how many pieces" are division.`,
        },
      ],
      quiz: [
        { q: R`Calculate $4 \div \frac{1}{3}$.`, a: R`$12$` },
        { q: R`Calculate $\frac{1}{2} \div \frac{1}{4}$.`, a: R`$2$` },
        { q: R`Calculate $\frac{3}{5} \div \frac{3}{10}$.`, a: R`$2$` },
        { q: R`Calculate $\frac{2}{3} \div \frac{5}{6}$.`, a: R`$\frac{2}{3} \times \frac{6}{5} = \frac{12}{15} = \frac{4}{5}$` },
        { q: R`Calculate $\frac{5}{8} \div 2$.`, a: R`$\frac{5}{16}$` },
        { q: R`Calculate $\frac{7}{9} \div \frac{7}{3}$.`, a: R`$\frac{1}{3}$` },
        { q: R`Calculate $1\frac{1}{2} \div \frac{3}{4}$.`, a: R`$\frac{3}{2} \times \frac{4}{3} = 2$` },
        { q: R`Calculate $3\frac{1}{3} \div 2\frac{1}{2}$.`, a: R`$\frac{10}{3} \times \frac{2}{5} = \frac{4}{3} = 1\frac{1}{3}$` },
        { q: R`Calculate $\frac{4}{5} \div 1\frac{1}{5}$.`, a: R`$\frac{4}{5} \times \frac{5}{6} = \frac{2}{3}$` },
        { q: R`A $6$ m ribbon is cut into pieces $\frac{3}{4}$ m long. How many pieces are there?`, a: R`$6 \div \frac{3}{4} = 8$ pieces` },
      ],
    },
    faqs: [
      { q: "How do you divide fractions?", a: "Keep the first fraction, change the division sign to multiplication, and flip the second fraction. Then multiply the numerators and denominators and simplify." },
      { q: "Why do you flip the second fraction?", a: "Dividing by a number is the same as multiplying by its reciprocal. Dividing by one half asks how many halves fit, and that is the same as multiplying by two." },
      { q: "How do you divide mixed numbers?", a: "Change each mixed number to an improper fraction first, then use keep, change, flip. Simplify the answer and change it back to a mixed number if needed." },
    ],
  },

  {
    slug: "expanding-brackets",
    keyword: "expanding brackets worksheet",
    monthlySearches: 170,
    topicSlug: "year-8-algebra",
    relatedSlugs: ["year-8-algebra", "year-7-expressions", "year-9-algebra", "year-9-quadratics"],
    metaTitle: "Expanding Brackets Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free expanding brackets worksheets with answers: the distributive law, negatives, expanding and simplifying, binomial products and perfect squares. Worked examples and a quick check.",
    h1: "Expanding brackets worksheets with answers",
    lead: "Expanding means multiplying out brackets so there are none left. Learn single brackets, negatives and binomial products, then make a free worksheet with full solutions.",
    guide: {
      title: "Expanding brackets, explained",
      lead: "From Year 7 single brackets to the Year 9 and 10 binomial products, step by step.",
      sections: [
        {
          h: "1. The distributive law",
          md: R`Multiply the term outside by every term inside:
$$3(x + 5) = 3x + 15 \qquad 4(2a - 3) = 8a - 12$$`,
        },
        {
          h: "2. A negative outside the bracket",
          md: R`The negative multiplies every term, so every sign inside changes:
$$-3(2x - 5) = -6x + 15$$
A minus times a minus is a plus. This is where most marks are lost.`,
        },
        {
          h: "3. Expand, then simplify",
          md: R`Expand each bracket, then collect like terms:
$$4(x + 2) - 3(x - 1) = 4x + 8 - 3x + 3 = x + 11$$`,
        },
        {
          h: "4. A pronumeral outside the bracket",
          md: R`The same law applies, using index laws to multiply:
$$x(x + 3) = x^2 + 3x \qquad 2a(5a - 4) = 10a^2 - 8a$$`,
        },
        {
          h: "5. Binomial products",
          md: R`Multiply every term in the first bracket by every term in the second (some students remember it as FOIL):
$$(x + 3)(x + 5) = x^2 + 5x + 3x + 15 = x^2 + 8x + 15$$`,
        },
        {
          h: "6. Perfect squares and the difference of two squares",
          md: R`Two patterns are worth knowing:
$$(x + 4)^2 = x^2 + 8x + 16 \qquad (x - 5)(x + 5) = x^2 - 25$$
$(x + 4)^2$ is not $x^2 + 16$: the middle term $8x$ is easy to forget.`,
        },
      ],
      quiz: [
        { q: R`Expand $4(x + 3)$.`, a: R`$4x + 12$` },
        { q: R`Expand $-2(y - 5)$.`, a: R`$-2y + 10$` },
        { q: R`Expand $a(a + 7)$.`, a: R`$a^2 + 7a$` },
        { q: R`Expand $3x(2x - 4)$.`, a: R`$6x^2 - 12x$` },
        { q: R`Expand and simplify $5(x + 2) + 3(x - 1)$.`, a: R`$8x + 7$` },
        { q: R`Expand and simplify $2(3k + 1) - 4(k - 2)$.`, a: R`$6k + 2 - 4k + 8 = 2k + 10$` },
        { q: R`Expand $(x + 2)(x + 6)$.`, a: R`$x^2 + 8x + 12$` },
        { q: R`Expand $(x - 3)(x + 7)$.`, a: R`$x^2 + 4x - 21$` },
        { q: R`Expand $(2x + 1)(x - 4)$.`, a: R`$2x^2 - 7x - 4$` },
        { q: R`Expand $(x + 5)^2$.`, a: R`$x^2 + 10x + 25$` },
      ],
    },
    faqs: [
      { q: "What does expanding brackets mean?", a: "Expanding means multiplying out the brackets so the expression has no brackets left. The term outside multiplies every term inside." },
      { q: "What is the most common mistake when expanding?", a: "Forgetting to multiply every term, or forgetting that a negative outside the bracket changes every sign inside. Expanding and checking a few with numbers helps catch these." },
      { q: "When do students learn binomial expansion?", a: "Single brackets come up in Years 7 and 8. Expanding two brackets, such as binomial products and perfect squares, is Year 9 and Year 10 algebra." },
    ],
  },

  {
    slug: "two-step-equations",
    keyword: "two step equations worksheet",
    monthlySearches: 170,
    topicSlug: "year-7-linear-equations",
    relatedSlugs: ["year-7-linear-equations", "year-8-linear-equations", "year-9-linear-equations", "year-7-algebra"],
    metaTitle: "Two-Step Equations Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free two-step equations worksheets with answers: solving with inverse operations, fractions, negatives, checking solutions and word problems. Worked examples and a quick check.",
    h1: "Two-step equations worksheets with answers",
    lead: "A two-step equation takes two inverse operations to solve. Learn the order to do them in, then make a free worksheet with full solutions.",
    guide: {
      title: "Two-step equations, explained",
      lead: "Undo the operations in reverse order, do the same to both sides, and check your answer.",
      sections: [
        {
          h: "1. Undo in reverse order",
          md: R`In $3x + 5 = 20$, the $x$ was multiplied by $3$ and then $5$ was added. Undo the $+5$ first, then the $\times 3$:
$$3x + 5 = 20, \quad 3x = 15, \quad x = 5$$`,
        },
        {
          h: "2. Equations with division",
          md: R`Undo the subtraction, then multiply:
$$\frac{x}{4} - 2 = 3, \quad \frac{x}{4} = 5, \quad x = 20$$`,
        },
        {
          h: "3. Negative coefficients",
          md: R`Keep the sign with the number:
$$7 - 2x = 1, \quad -2x = -6, \quad x = 3$$
Dividing by $-2$ makes the answer positive here.`,
        },
        {
          h: "4. A bracket or fraction around the left side",
          md: R`If everything on the left is divided, multiply first:
$$\frac{x + 4}{3} = 5, \quad x + 4 = 15, \quad x = 11$$`,
        },
        {
          h: "5. Always check",
          md: R`Substitute your answer back in. For $x = 3$ in $7 - 2x = 1$: $7 - 2(3) = 7 - 6 = 1$, so it's right. Checking takes a few seconds and catches sign errors.`,
        },
        {
          h: "6. Word problems",
          md: R`A phone plan costs \$15 a month plus \$2 for each GB of data. One month's bill is \$27. How much data was used?
$$15 + 2g = 27, \quad 2g = 12, \quad g = 6$$
So $6$ GB was used. Choose a letter for the unknown, write the equation, then solve.`,
        },
      ],
      quiz: [
        { q: R`Solve $2x + 3 = 11$.`, a: R`$x = 4$` },
        { q: R`Solve $5x - 4 = 21$.`, a: R`$x = 5$` },
        { q: R`Solve $\frac{x}{3} + 2 = 6$.`, a: R`$x = 12$` },
        { q: R`Solve $4a + 7 = -5$.`, a: R`$a = -3$` },
        { q: R`Solve $\frac{x}{5} - 3 = 1$.`, a: R`$x = 20$` },
        { q: R`Solve $10 - 3x = 4$.`, a: R`$x = 2$` },
        { q: R`Solve $\frac{x - 2}{4} = 3$.`, a: R`$x = 14$` },
        { q: R`Solve $6y + 1.5 = 12.3$.`, a: R`$y = 1.8$` },
        { q: R`Solve $2(x + 3) = 18$.`, a: R`$x = 6$` },
        { q: R`A taxi charges \$3.50 plus \$2.10 per kilometre. A trip costs \$24.50. How far was it?`, a: R`$3.5 + 2.1d = 24.5$, so $d = 10$ km` },
      ],
    },
    faqs: [
      { q: "What is a two-step equation?", a: "A two-step equation needs two inverse operations to solve, such as subtracting then dividing. For example, 3x + 5 = 20 is solved by subtracting 5, then dividing by 3." },
      { q: "Which step do you do first?", a: "Undo the operations in the reverse order they were done to the unknown. Usually that means undoing adding or subtracting first, then multiplying or dividing." },
      { q: "How can students check their answer?", a: "Substitute the answer back into the original equation. If both sides are equal, the answer is correct." },
    ],
  },
];

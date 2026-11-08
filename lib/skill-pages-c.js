const R = String.raw;

// Skill pages, batch C (8 Nov 2026): fractions, percentages and ratios.
// Volumes are Australian monthly searches from Google Keyword Planner
// (Nov 2026). Every example and quiz answer was checked in code
// (scratchpad/skillc/check.py and check.mjs).
// Australian spelling, no em or en dashes, money as \$ outside maths.

export const SKILL_PAGES_C = [
  {
    slug: "equivalent-fractions",
    keyword: "equivalent fractions worksheet",
    monthlySearches: 720,
    topicSlug: "year-7-fraction-operations",
    relatedSlugs: ["year-7-fraction-operations", "year-7-fractions-decimals", "year-7-prime-factors", "year-7-ratios"],
    metaTitle: "Equivalent Fractions Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free equivalent fractions worksheets with answers: making equivalent fractions, finding missing numbers, simplifying with the HCF and comparing fractions. Worked examples and a quick check.",
    h1: "Equivalent fractions worksheets with answers",
    lead: "Equivalent fractions name the same amount in different ways. Learn to make them, simplify them and use them to compare fractions, then make a free worksheet with full solutions.",
    guide: {
      title: "Equivalent fractions, explained",
      lead: "One idea sits under all of it: multiply or divide the top and bottom by the same number and the value does not change.",
      sections: [
        {
          h: "1. What equivalent fractions are",
          md: R`Equivalent fractions are equal in value even though the numbers are different. Shade $2$ of $3$ equal parts, or $4$ of $6$, or $8$ of $12$, and the same amount is shaded:
$$\frac{2}{3} = \frac{4}{6} = \frac{8}{12}$$`,
        },
        {
          h: "2. Making equivalent fractions",
          md: R`Multiply the numerator and denominator by the same number. Multiplying by $\frac{4}{4}$ is multiplying by $1$, so the value stays the same:
$$\frac{3}{5} = \frac{3 \times 4}{5 \times 4} = \frac{12}{20}$$
Never add the same number to the top and bottom: $\frac{1}{2}$ and $\frac{2}{3}$ are not equal.`,
        },
        {
          h: "3. Finding a missing number",
          md: R`Work out what the known numerator or denominator was multiplied or divided by, then do the same to the other one. In $\frac{3}{4} = \frac{?}{28}$, the denominator was multiplied by $7$:
$$\frac{3}{4} = \frac{3 \times 7}{4 \times 7} = \frac{21}{28}$$
In $\frac{15}{25} = \frac{3}{?}$, the numerator was divided by $5$, so the missing number is $25 \div 5 = 5$.`,
        },
        {
          h: "4. Simplifying to simplest form",
          md: R`Divide the numerator and denominator by their highest common factor (HCF). For $\frac{24}{36}$ the HCF is $12$:
$$\frac{24}{36} = \frac{24 \div 12}{36 \div 12} = \frac{2}{3}$$
A fraction is in simplest form when the only common factor of the top and bottom is $1$. Dividing by a smaller common factor works too, but you may need more than one step.`,
        },
        {
          h: "5. Checking whether two fractions are equivalent",
          md: R`Simplify both fractions. If they reduce to the same fraction, they are equivalent:
$$\frac{6}{9} = \frac{2}{3} \qquad \frac{10}{15} = \frac{2}{3}$$
So $\frac{6}{9}$ and $\frac{10}{15}$ are equivalent. You can also cross-multiply: $6 \times 15 = 90$ and $9 \times 10 = 90$, and equal products mean equal fractions.`,
        },
        {
          h: "6. Comparing and ordering fractions",
          md: R`Rewrite the fractions with a common denominator, then compare the numerators. To compare $\frac{5}{6}$ and $\frac{7}{9}$, use $18$:
$$\frac{5}{6} = \frac{15}{18} \qquad \frac{7}{9} = \frac{14}{18}$$
Since $15 > 14$, $\frac{5}{6}$ is larger. The same method puts a whole list of fractions in order.`,
        },
      ],
      quiz: [
        { q: R`Find the missing number: $\frac{1}{2} = \frac{?}{8}$.`, a: R`$4$` },
        { q: R`Write two fractions equivalent to $\frac{3}{4}$.`, a: R`For example, $\frac{6}{8}$ and $\frac{9}{12}$` },
        { q: R`Find the missing number: $\frac{2}{5} = \frac{?}{35}$.`, a: R`$14$` },
        { q: R`Simplify $\frac{15}{20}$.`, a: R`$\frac{3}{4}$` },
        { q: R`Simplify $\frac{36}{48}$ using the HCF.`, a: R`The HCF is $12$, so $\frac{3}{4}$` },
        { q: R`Find the missing number: $\frac{21}{?} = \frac{3}{8}$.`, a: R`$56$` },
        { q: R`Are $\frac{12}{18}$ and $\frac{20}{30}$ equivalent?`, a: R`Yes, both simplify to $\frac{2}{3}$` },
        { q: R`Write $\frac{84}{126}$ in simplest form.`, a: R`The HCF is $42$, so $\frac{2}{3}$` },
        { q: R`Which is larger, $\frac{3}{5}$ or $\frac{5}{8}$?`, a: R`$\frac{24}{40} < \frac{25}{40}$, so $\frac{5}{8}$ is larger` },
        { q: R`Write $\frac{2}{3}$, $\frac{5}{8}$ and $\frac{7}{12}$ in ascending order.`, a: R`$\frac{16}{24}$, $\frac{15}{24}$, $\frac{14}{24}$, so $\frac{7}{12}, \frac{5}{8}, \frac{2}{3}$` },
      ],
    },
    faqs: [
      { q: "What are equivalent fractions?", a: "Equivalent fractions have the same value but different numerators and denominators, such as one half, two quarters and four eighths. You make them by multiplying or dividing the top and bottom by the same number." },
      { q: "How do you write a fraction in simplest form?", a: "Divide the numerator and denominator by their highest common factor. When the only common factor left is 1, the fraction is in simplest form." },
      { q: "Do the equivalent fractions worksheets include answers?", a: "Yes. Every question on a generated worksheet comes with a fully worked solution, and every example on this page shows each step." },
    ],
  },

  {
    slug: "multiplying-fractions",
    keyword: "multiplying fractions worksheet",
    monthlySearches: 320,
    topicSlug: "year-7-fractions-decimals",
    relatedSlugs: ["year-7-fractions-decimals", "year-7-fraction-operations", "year-7-percentages", "year-10-algebraic-fractions"],
    metaTitle: "Multiplying Fractions Worksheets with Answers (Free) | Tuterly",
    metaDescription:
      "Free multiplying fractions worksheets with answers: fractions times whole numbers, fractions times fractions, cancelling first, mixed numerals and 'of' problems. Worked examples and a quick check.",
    h1: "Multiplying fractions worksheets with answers",
    lead: "Multiplying is the friendliest fraction operation: no common denominator needed. Learn each question type, including mixed numerals and cancelling, then make a free worksheet with full solutions.",
    guide: {
      title: "Multiplying fractions, explained",
      lead: "Multiply the tops, multiply the bottoms, simplify. Everything else is a variation on that rule.",
      sections: [
        {
          h: "1. A fraction times a whole number",
          md: R`Write the whole number over $1$, then multiply. Only the numerator is multiplied by the whole number:
$$\frac{2}{5} \times 3 = \frac{2}{5} \times \frac{3}{1} = \frac{6}{5} = 1\frac{1}{5}$$`,
        },
        {
          h: "2. A fraction times a fraction",
          md: R`Multiply the numerators together and the denominators together:
$$\frac{2}{3} \times \frac{4}{5} = \frac{2 \times 4}{3 \times 5} = \frac{8}{15}$$
There is no need for a common denominator. That rule is only for adding and subtracting.`,
        },
        {
          h: "3. Cancel before you multiply",
          md: R`Divide any numerator and any denominator by a common factor first. It keeps the numbers small and the answer comes out in simplest form:
$$\frac{4}{9} \times \frac{3}{8} = \frac{1}{3} \times \frac{1}{2} = \frac{1}{6}$$
Here $4$ and $8$ share a factor of $4$, and $3$ and $9$ share a factor of $3$. Multiplying first gives $\frac{12}{72}$, which also simplifies to $\frac{1}{6}$.`,
        },
        {
          h: "4. Mixed numerals",
          md: R`Change each mixed numeral to an improper fraction first, then multiply and cancel:
$$1\frac{1}{2} \times 2\frac{2}{5} = \frac{3}{2} \times \frac{12}{5} = \frac{3}{1} \times \frac{6}{5} = \frac{18}{5} = 3\frac{3}{5}$$
Multiplying the whole numbers and the fractions separately gives the wrong answer.`,
        },
        {
          h: "5. \"Of\" means multiply",
          md: R`A fraction of an amount is a multiplication:
$$\frac{3}{4} \text{ of } 20 = \frac{3}{4} \times 20 = 15 \qquad \frac{2}{3} \text{ of } \frac{3}{5} = \frac{2}{3} \times \frac{3}{5} = \frac{2}{5}$$
For a whole number, you can divide by the denominator and multiply by the numerator: $20 \div 4 \times 3 = 15$.`,
        },
        {
          h: "6. Word problems",
          md: R`A recipe needs $\frac{3}{4}$ cup of sugar. How much sugar is needed for $2\frac{1}{2}$ batches?
$$\frac{3}{4} \times 2\frac{1}{2} = \frac{3}{4} \times \frac{5}{2} = \frac{15}{8} = 1\frac{7}{8} \text{ cups}$$
Scaling a recipe, finding part of a part, and "fraction of" questions are all multiplication.`,
        },
      ],
      quiz: [
        { q: R`Calculate $\frac{1}{3} \times 6$.`, a: R`$2$` },
        { q: R`Calculate $\frac{3}{4} \times 5$.`, a: R`$\frac{15}{4} = 3\frac{3}{4}$` },
        { q: R`Calculate $\frac{1}{2} \times \frac{3}{5}$.`, a: R`$\frac{3}{10}$` },
        { q: R`Calculate $\frac{2}{3} \times \frac{5}{7}$.`, a: R`$\frac{10}{21}$` },
        { q: R`Calculate $\frac{5}{6} \times \frac{3}{10}$.`, a: R`$\frac{15}{60} = \frac{1}{4}$` },
        { q: R`Find $\frac{3}{4}$ of $36$.`, a: R`$27$` },
        { q: R`Calculate $\frac{7}{12} \times \frac{8}{21}$, cancelling first.`, a: R`$\frac{1}{3} \times \frac{2}{3} = \frac{2}{9}$` },
        { q: R`Calculate $2\frac{1}{4} \times 1\frac{1}{3}$.`, a: R`$\frac{9}{4} \times \frac{4}{3} = 3$` },
        { q: R`Calculate $1\frac{2}{3} \times 2\frac{1}{10}$.`, a: R`$\frac{5}{3} \times \frac{21}{10} = \frac{7}{2} = 3\frac{1}{2}$` },
        { q: R`A garden has an area of $60$ m². $\frac{3}{5}$ of it is lawn, and $\frac{1}{4}$ of the lawn is in shade. What area of lawn is in shade?`, a: R`$\frac{1}{4} \times \frac{3}{5} \times 60 = 9$ m²` },
      ],
    },
    faqs: [
      { q: "How do you multiply fractions?", a: "Multiply the numerators together and the denominators together, then simplify. Cancelling common factors before you multiply makes the numbers smaller and saves simplifying at the end." },
      { q: "Do you need a common denominator to multiply fractions?", a: "No. A common denominator is only needed for adding and subtracting. When multiplying, you can multiply straight across." },
      { q: "How do you multiply mixed numerals?", a: "Change each mixed numeral to an improper fraction, multiply, then change the answer back to a mixed numeral if needed. Do not multiply the whole numbers and fractions separately." },
    ],
  },

  {
    slug: "fractions-decimals-percentages",
    keyword: "fractions decimals and percentages worksheet",
    monthlySearches: 210,
    topicSlug: "year-7-percentages",
    relatedSlugs: ["year-7-percentages", "year-7-fractions-decimals", "year-8-recurring-decimals", "year-8-percentages"],
    metaTitle: "Fractions, Decimals and Percentages Worksheets (Free) | Tuterly",
    metaDescription:
      "Free fractions, decimals and percentages worksheets with answers: converting between all three, recurring decimals and percentages over 100%. Worked examples and a quick check.",
    h1: "Fractions, decimals and percentages worksheets with answers",
    lead: "Fractions, decimals and percentages are three ways of writing the same number. Learn to move between them, including recurring decimals and percentages over 100%, then make a free worksheet with full solutions.",
    guide: {
      title: "Fractions, decimals and percentages, explained",
      lead: "Six conversions, each with a worked example. Percent means 'out of 100', which links all three.",
      sections: [
        {
          h: "1. Fraction to decimal",
          md: R`Divide the numerator by the denominator:
$$\frac{3}{8} = 3 \div 8 = 0.375$$
If the denominator goes into $10$, $100$ or $1000$, make an equivalent fraction instead: $\frac{7}{20} = \frac{35}{100} = 0.35$.`,
        },
        {
          h: "2. Decimal to fraction",
          md: R`Write the decimal over $10$, $100$ or $1000$ using its place value, then simplify:
$$0.45 = \frac{45}{100} = \frac{9}{20} \qquad 2.125 = 2\frac{125}{1000} = 2\frac{1}{8}$$`,
        },
        {
          h: "3. Recurring decimals",
          md: R`Some fractions give decimals that repeat forever. A dot goes over the repeating digit, or over the first and last digits of a repeating block:
$$\frac{2}{3} = 0.\dot{6} \qquad \frac{1}{6} = 0.1\dot{6} \qquad \frac{5}{11} = 0.\dot{4}\dot{5}$$
To change $0.\dot{4}\dot{5}$ back to a fraction, let $x = 0.\dot{4}\dot{5}$. Two digits repeat, so multiply by $100$ and subtract:
$$100x - x = 45.\dot{4}\dot{5} - 0.\dot{4}\dot{5}, \quad 99x = 45, \quad x = \frac{45}{99} = \frac{5}{11}$$`,
        },
        {
          h: "4. Percentage to fraction or decimal",
          md: R`Write the percentage over $100$ and simplify, or divide by $100$ for the decimal:
$$35\% = \frac{35}{100} = \frac{7}{20} = 0.35 \qquad 12.5\% = 0.125 = \frac{1}{8}$$`,
        },
        {
          h: "5. Fraction or decimal to percentage",
          md: R`Multiply by $100\%$:
$$\frac{3}{5} \times 100\% = 60\% \qquad 0.072 \times 100\% = 7.2\% \qquad \frac{1}{3} \times 100\% = 33\frac{1}{3}\%$$
For a decimal, this moves the decimal point two places to the right.`,
        },
        {
          h: "6. Percentages over 100%",
          md: R`A percentage over $100\%$ is more than one whole, so its fraction and decimal are greater than $1$:
$$150\% = 1.5 = 1\frac{1}{2} \qquad 2.4 = 240\% \qquad \frac{7}{4} = 1.75 = 175\%$$
These come up with growth and mark-ups, such as a price that is $120\%$ of what it was.`,
        },
      ],
      quiz: [
        { q: R`Write $0.7$ as a percentage.`, a: R`$70\%$` },
        { q: R`Write $\frac{3}{4}$ as a decimal.`, a: R`$0.75$` },
        { q: R`Write $45\%$ as a fraction in simplest form.`, a: R`$\frac{45}{100} = \frac{9}{20}$` },
        { q: R`Write $0.36$ as a fraction in simplest form.`, a: R`$\frac{36}{100} = \frac{9}{25}$` },
        { q: R`Write $\frac{5}{8}$ as a percentage.`, a: R`$62.5\%$` },
        { q: R`Write $0.035$ as a percentage.`, a: R`$3.5\%$` },
        { q: R`Write $\frac{4}{9}$ as a recurring decimal.`, a: R`$0.\dot{4}$` },
        { q: R`Write $\frac{7}{12}$ as a recurring decimal.`, a: R`$0.58\dot{3}$` },
        { q: R`Write $225\%$ as a decimal and as a mixed numeral.`, a: R`$2.25 = 2\frac{1}{4}$` },
        { q: R`Write $0.\dot{2}\dot{7}$ as a fraction in simplest form.`, a: R`$99x = 27$, so $x = \frac{27}{99} = \frac{3}{11}$` },
      ],
    },
    faqs: [
      { q: "How do you convert a fraction to a percentage?", a: "Multiply the fraction by 100 and add the percent sign. For example, three fifths times 100 is 60, so three fifths is 60%. You can also change the fraction to a decimal first, then multiply by 100." },
      { q: "Can a percentage be more than 100%?", a: "Yes. A percentage over 100% means more than one whole. For example, 150% is 1.5, or one and a half times the original amount." },
      { q: "Which year level learns recurring decimals?", a: "Converting fractions to decimals starts in Year 7. Recurring decimals, and changing them back into fractions, are part of Year 8 in the Victorian Curriculum." },
    ],
  },

  {
    slug: "percentages",
    keyword: "percentage worksheet",
    monthlySearches: 260,
    topicSlug: "year-7-percentages",
    relatedSlugs: ["year-7-percentages", "year-8-percentages", "year-8-profit-and-loss", "year-9-simple-interest"],
    metaTitle: "Percentage Worksheets with Answers and Worked Examples | Tuterly",
    metaDescription:
      "Free percentage worksheets with answers: percentage of an amount, one quantity as a percentage of another, percentage increase and decrease, and percentage change. Worked examples and a quick check.",
    h1: "Percentage worksheets with answers",
    lead: "Percentages turn up in discounts, test marks and price rises. Learn the four core question types with a worked example of each, then make a free worksheet with full solutions.",
    guide: {
      title: "Percentages, explained",
      lead: "Most percentage questions are one of four types. Spot the type and the method follows.",
      sections: [
        {
          h: "1. A percentage of an amount",
          md: R`Change the percentage to a decimal and multiply. To find $15\%$ of $80$:
$$0.15 \times 80 = 12$$
Without a calculator, build it from easy parts: $10\%$ of $80$ is $8$, $5\%$ is $4$, so $15\%$ is $8 + 4 = 12$.`,
        },
        {
          h: "2. One quantity as a percentage of another",
          md: R`Write a fraction of the part over the whole, then multiply by $100\%$. Scoring $18$ out of $24$:
$$\frac{18}{24} \times 100\% = 75\%$$
The two quantities must be in the same units. For $45$ cents as a percentage of \$3, use $300$ cents: $\frac{45}{300} \times 100\% = 15\%$.`,
        },
        {
          h: "3. Percentage increase",
          md: R`To increase by $15\%$, the new amount is $100\% + 15\% = 115\%$ of the old one. Increase \$80 by $15\%$:
$$80 \times 1.15 = 92$$
The new price is \$92. You can also find $15\%$ of $80$, which is $12$, and add it on.`,
        },
        {
          h: "4. Percentage decrease",
          md: R`To decrease by $30\%$, the new amount is $100\% - 30\% = 70\%$ of the old one. A \$250 jacket is $30\%$ off:
$$250 \times 0.7 = 175$$
The sale price is \$175.`,
        },
        {
          h: "5. Percentage change",
          md: R`Divide the change by the original amount, then multiply by $100\%$:
$$\text{percentage change} = \frac{\text{change}}{\text{original}} \times 100\%$$
From $40$ to $50$: $\frac{10}{40} \times 100\% = 25\%$ increase. From $80$ to $68$: $\frac{12}{80} \times 100\% = 15\%$ decrease. Always divide by the original amount, not the new one.`,
        },
        {
          h: "6. Two changes in a row",
          md: R`Percentage changes do not simply add or cancel. A \$100 price rises by $20\%$, then falls by $20\%$:
$$100 \times 1.2 = 120, \qquad 120 \times 0.8 = 96$$
It ends at \$96, not \$100, because the second $20\%$ is taken from a larger amount.`,
        },
      ],
      quiz: [
        { q: R`Find $10\%$ of $70$.`, a: R`$7$` },
        { q: R`Find $25\%$ of $64$.`, a: R`$16$` },
        { q: R`Find $12\%$ of $350$.`, a: R`$42$` },
        { q: R`Find $17.5\%$ of $240$.`, a: R`$42$` },
        { q: R`Write $27$ as a percentage of $36$.`, a: R`$\frac{27}{36} \times 100\% = 75\%$` },
        { q: R`Write $40$ cm as a percentage of $2$ m.`, a: R`$\frac{40}{200} \times 100\% = 20\%$` },
        { q: R`Increase $60$ by $35\%$.`, a: R`$60 \times 1.35 = 81$` },
        { q: R`Decrease \$480 by $15\%$.`, a: R`$480 \times 0.85 = 408$, so \$408` },
        { q: R`A number changes from $125$ to $150$. Find the percentage change.`, a: R`$\frac{25}{125} \times 100\% = 20\%$ increase` },
        { q: R`A shirt is reduced from \$64 to \$52. Find the percentage decrease.`, a: R`$\frac{12}{64} \times 100\% = 18.75\%$ decrease` },
      ],
    },
    faqs: [
      { q: "How do you find a percentage of an amount?", a: "Change the percentage to a decimal and multiply it by the amount. For example, 15% of 80 is 0.15 times 80, which is 12." },
      { q: "How do you work out percentage change?", a: "Find the difference between the new and original amounts, divide it by the original amount, then multiply by 100. If the amount went up it is an increase, and if it went down it is a decrease." },
      { q: "Do the percentage worksheets come with answers?", a: "Yes. Every question on a generated worksheet has a fully worked solution, so students can check their method as well as the final answer." },
    ],
  },

  {
    slug: "ratios",
    keyword: "ratio worksheet",
    monthlySearches: 210,
    topicSlug: "year-7-ratios",
    relatedSlugs: ["year-7-ratios", "year-8-rates", "year-9-direct-proportion", "year-7-fraction-operations"],
    metaTitle: "Ratio Worksheets with Answers and Worked Examples | Tuterly",
    metaDescription:
      "Free ratio worksheets with answers: simplifying ratios with decimals, fractions and different units, equivalent ratios, dividing a quantity in a ratio and the unitary method. Worked examples and a quick check.",
    h1: "Ratio worksheets with answers",
    lead: "A ratio compares quantities, like 2 cups of flour to 3 cups of milk. Learn to simplify, scale and share in a ratio, then make a free worksheet with full solutions.",
    guide: {
      title: "Ratios, explained",
      lead: "Simplifying a ratio works just like simplifying a fraction. Here is every common question type, step by step.",
      sections: [
        {
          h: "1. Simplifying ratios",
          md: R`Divide every part by the highest common factor. For $12 : 18$ the HCF is $6$:
$$12 : 18 = 2 : 3$$
Three-part ratios work the same way: $20 : 30 : 45 = 4 : 6 : 9$, dividing each part by $5$.`,
        },
        {
          h: "2. Ratios with decimals or fractions",
          md: R`Multiply every part by the same number to get whole numbers, then simplify:
$$1.5 : 2.5 = 15 : 25 = 3 : 5$$
For fractions, multiply by the lowest common denominator. With $\frac{2}{3} : \frac{3}{4}$, multiply both parts by $12$:
$$\frac{2}{3} : \frac{3}{4} = 8 : 9$$`,
        },
        {
          h: "3. Ratios with different units",
          md: R`Change both quantities to the same unit first, then simplify and leave the units off:
$$40 \text{ cm} : 2 \text{ m} = 40 : 200 = 1 : 5$$
$$45 \text{ min} : 2 \text{ h} = 45 : 120 = 3 : 8$$`,
        },
        {
          h: "4. Equivalent ratios",
          md: R`Multiply or divide both parts by the same number. To find the missing number in $3 : 5 = 12 : ?$, notice $3 \times 4 = 12$, so
$$3 : 5 = 12 : 20$$
A recipe uses flour and milk in the ratio $2 : 3$. With $8$ cups of flour, multiply both parts by $4$: $8 : 12$, so $12$ cups of milk.`,
        },
        {
          h: "5. Dividing a quantity in a ratio",
          md: R`Add the parts, find the value of one part, then multiply. Share \$120 in the ratio $3 : 5$:
$$3 + 5 = 8 \text{ parts}, \qquad 120 \div 8 = 15 \text{ per part}$$
$$3 \times 15 = 45, \qquad 5 \times 15 = 75$$
The shares are \$45 and \$75. Check they add to \$120.`,
        },
        {
          h: "6. The unitary method",
          md: R`Find the value of one unit first, then scale up. If $5$ pens cost \$8.50, then one pen costs $8.50 \div 5 = 1.70$, and $8$ pens cost $8 \times 1.70 = 13.60$, so \$13.60.

The same idea works with ratio parts. Money is shared in the ratio $2 : 7$ and the larger share is \$56. One part is $56 \div 7 = 8$, so the smaller share is $2 \times 8 = 16$, or \$16.`,
        },
      ],
      quiz: [
        { q: R`Simplify $10 : 15$.`, a: R`$2 : 3$` },
        { q: R`Simplify $24 : 40$.`, a: R`$3 : 5$` },
        { q: R`Simplify $18 : 27 : 45$.`, a: R`$2 : 3 : 5$` },
        { q: R`Find $x$ if $4 : 7 = x : 35$.`, a: R`$x = 20$` },
        { q: R`Simplify $0.6 : 1.5$.`, a: R`$6 : 15 = 2 : 5$` },
        { q: R`Simplify $\frac{1}{2} : \frac{2}{5}$.`, a: R`Multiply by $10$: $5 : 4$` },
        { q: R`Simplify $750$ g $: 2$ kg.`, a: R`$750 : 2000 = 3 : 8$` },
        { q: R`Divide \$96 in the ratio $5 : 3$.`, a: R`One part is $12$, so \$60 and \$36` },
        { q: R`Six apples cost \$4.20. How much do ten apples cost?`, a: R`One apple costs $0.70$, so \$7.00` },
        { q: R`Sam and Ava share money in the ratio $4 : 9$. Ava gets \$35 more than Sam. How much does each get?`, a: R`$5$ parts $= 35$, so one part is $7$: Sam \$28, Ava \$63` },
      ],
    },
    faqs: [
      { q: "How do you simplify a ratio?", a: "Divide every part of the ratio by the highest common factor. If the ratio has decimals, fractions or different units, change it to whole numbers in the same unit first." },
      { q: "How do you divide an amount in a ratio?", a: "Add the parts of the ratio to find the total number of parts, divide the amount by that total to find one part, then multiply by each part of the ratio." },
      { q: "Do the ratio worksheets include answers?", a: "Yes. Every question on a generated worksheet comes with a fully worked solution showing each step." },
    ],
  },
];

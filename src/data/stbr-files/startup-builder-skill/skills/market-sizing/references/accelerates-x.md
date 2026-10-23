# "The product accelerates X": how to put a number on it

Use this when the founder's argument is time or work saved, not money moved. Sources read
2026-10-08.

## Steps

1. **The founder's sentence is the skeleton.** "N integrations × X engineer-days each = Y
   days that could be spent once." Each term becomes an input with a source.
2. **X has several readings,** often orders of magnitude apart: only the visible step, the
   review around it, or the whole setup. List each reading with its source, and state which
   one the calculation uses and why.
3. **Convert to person-days per account first,** and to dollars only after that.
4. **Dollars from public wage data.** The US median wage for the nearest occupation from BLS
   data, as published on [O*NET OnLine](https://www.onetonline.org/link/summary/15-1252.00)
   (Software Developers: "Median wages (2025) $65.38 hourly, $135,980 annual"). Real job
   posts with a published range, pulled from the public job-board APIs:
   [Greenhouse](https://developers.greenhouse.io/job-board.html),
   [Ashby](https://developers.ashbyhq.com/docs/public-job-posting-api),
   [Lever](https://github.com/lever/postings-api). Hourly = annual ÷ 2,080, which is the
   BLS's own base: "The OEWS annual wage estimates assume a full-time, year-round schedule of
   2,080 hours" ([OEWS FAQ](https://www.bls.gov/oes/oes_ques.htm)). Base salary only: say
   that it leaves out overhead, travel and equity.
5. **Ceiling of the saving** = (N − 1) × X, assuming the work transfers 100% from one
   integration to the next. Say what doesn't transfer.
6. **Admit when the dollar figure comes out small.** Often the weight is in calendar time
   (weeks until the customer is live) and in people who can't be hired, not in salary. Then
   that is the argument.
7. **A "not public" section:** the numbers the calculation needs that no source publishes.
   These are often exactly what the product would have to measure.
8. **A corrections section:** where the search snippet said one thing and the page said
   another.

## Strength labels for this method

On top of the [number-with-source](number-with-source.md) labels:

- `[marketing]`: a vendor talking about itself.
- `[blog]`: a third-party blog, an illustrative example with no measurement.
- `[anecdote]`: one person's account, such as a forum post.

## Worked shape (illustrative: X and N are invented, the wage is real)

A protocol says integrating it takes partners "two weeks". Readings of X: the SDK call
itself (hours), the review and testing around it (days), the whole integration including
audit sign-off (weeks). Taking the middle reading at 5 engineer-days, and 8 hours a day:

- 5 days × 8 h × US$65.38 = (est.) US$2,615 per integration in base salary.
- If 10 partners each repeat the same work, the ceiling of the saving is (10 − 1) × 5 =
  (est.) 45 engineer-days.

The salary figure is small, so the honest slide line is the calendar one: days to a
partner's first live transaction, with the range and the (est.).

## On the slide

Close in the unit a non-specialist feels (engineer-days per integration, weeks until live),
with the range and the (est.). A large dollar figure, if there is one, comes from a named
third-party source, not from the salary calculation.

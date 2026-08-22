export const BRANCHES = [
  {
    id: 'legislative',
    name: 'Legislative',
    body: 'Congress',
    article: 'Article I',
    tagline: 'Writes the laws',
    seat: 'United States Capitol',
    summary:
      'Congress is the lawmaking branch. It is bicameral: a House of Representatives apportioned by population and a Senate with two members per state. A bill must pass both chambers in identical form before it can go to the President.',
    composition: [
      { label: 'House of Representatives', value: '435 voting members, 2-year terms' },
      { label: 'Senate', value: '100 senators, 6-year staggered terms' },
      { label: 'Presiding officers', value: 'Speaker of the House; Vice President as President of the Senate' },
      { label: 'Selection', value: 'Directly elected by voters in each state or district' }
    ],
    powers: [
      'Write, debate, and pass federal legislation',
      'Levy taxes, borrow money, and control federal spending',
      'Declare war and raise and fund the armed forces',
      'Regulate interstate and foreign commerce',
      'Confirm (Senate) appointments and ratify treaties',
      'Impeach and remove federal officers, including the President'
    ],
    limits: [
      'Cannot pass bills of attainder or ex post facto laws',
      'Cannot enforce the laws it writes',
      'Legislation can be struck down as unconstitutional by the courts'
    ],
    clause: {
      text: 'All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.',
      cite: 'U.S. Constitution, Article I, Section 1'
    }
  },
  {
    id: 'executive',
    name: 'Executive',
    body: 'The Presidency',
    article: 'Article II',
    tagline: 'Carries out the laws',
    seat: 'The White House',
    summary:
      'The executive branch enforces the laws Congress passes. It is headed by the President, who is both head of state and commander in chief, and it reaches into daily life through the Cabinet departments and federal agencies.',
    composition: [
      { label: 'President', value: '4-year term, limited to two terms by the 22nd Amendment' },
      { label: 'Vice President', value: 'First in the line of succession; breaks Senate ties' },
      { label: 'Cabinet', value: '15 executive departments, led by Senate-confirmed secretaries' },
      { label: 'Selection', value: 'Elected indirectly through the Electoral College' }
    ],
    powers: [
      'Sign bills into law or veto them',
      'Serve as commander in chief of the armed forces',
      'Negotiate treaties and conduct foreign policy',
      'Nominate federal judges, ambassadors, and Cabinet officers',
      'Issue executive orders directing the federal bureaucracy',
      'Grant pardons and reprieves for federal offenses'
    ],
    limits: [
      'Cannot write legislation or appropriate money',
      'A veto can be overridden by a two-thirds vote in both chambers',
      'Major appointments and treaties require Senate approval'
    ],
    clause: {
      text: 'The executive Power shall be vested in a President of the United States of America.',
      cite: 'U.S. Constitution, Article II, Section 1'
    }
  },
  {
    id: 'judicial',
    name: 'Judicial',
    body: 'The Federal Courts',
    article: 'Article III',
    tagline: 'Interprets the laws',
    seat: 'The Supreme Court',
    summary:
      'The federal courts resolve disputes and decide what the law means. The Supreme Court sits at the top of a system of appellate and district courts, and since Marbury v. Madison it has claimed the power to void laws that conflict with the Constitution.',
    composition: [
      { label: 'Supreme Court', value: '9 justices, set by statute rather than the Constitution' },
      { label: 'Courts of Appeals', value: '13 circuits hearing appeals from the district courts' },
      { label: 'District Courts', value: '94 trial-level courts across the states and territories' },
      { label: 'Selection', value: 'Nominated by the President, confirmed by the Senate, serve for life' }
    ],
    powers: [
      'Decide cases and controversies arising under federal law',
      'Interpret the Constitution and federal statutes',
      'Strike down laws and executive acts as unconstitutional',
      'Review the decisions of lower federal and state courts',
      'Issue injunctions halting unlawful government action'
    ],
    limits: [
      'Cannot decide hypothetical questions; requires a real case',
      'Has no army or purse to enforce its own rulings',
      'Congress sets the size of the Court and much of its jurisdiction'
    ],
    clause: {
      text: 'The judicial Power of the United States, shall be vested in one supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish.',
      cite: 'U.S. Constitution, Article III, Section 1'
    }
  }
];

// Directed checks: `from` holds a power over `to`. Self-pairs describe the
// branch's own core function rather than a check.
export const CHECKS = [
  {
    from: 'legislative',
    to: 'executive',
    title: 'Congress checks the President',
    items: [
      'Overrides a veto with a two-thirds vote in both chambers',
      'Controls the budget and refuses to fund programs',
      'Confirms or rejects Cabinet officers and ambassadors',
      'Ratifies treaties by a two-thirds Senate vote',
      'Impeaches and removes the President from office'
    ]
  },
  {
    from: 'legislative',
    to: 'judicial',
    title: 'Congress checks the courts',
    items: [
      'Creates and abolishes the lower federal courts',
      'Sets the number of Supreme Court justices',
      'Confirms or rejects judicial nominees',
      'Impeaches and removes federal judges',
      'Proposes constitutional amendments to undo a ruling'
    ]
  },
  {
    from: 'executive',
    to: 'legislative',
    title: 'The President checks Congress',
    items: [
      'Vetoes legislation passed by both chambers',
      'Calls special sessions of Congress',
      'Sets the agenda through the State of the Union',
      'Shapes how statutes work through enforcement discretion'
    ]
  },
  {
    from: 'executive',
    to: 'judicial',
    title: 'The President checks the courts',
    items: [
      'Nominates all federal judges and Supreme Court justices',
      'Grants pardons and reprieves that undo criminal judgments',
      'Depends on the executive branch to enforce court orders'
    ]
  },
  {
    from: 'judicial',
    to: 'legislative',
    title: 'The courts check Congress',
    items: [
      'Declares statutes unconstitutional through judicial review',
      'Interprets ambiguous language in federal law',
      'Presides over presidential impeachment trials (Chief Justice)'
    ]
  },
  {
    from: 'judicial',
    to: 'executive',
    title: 'The courts check the President',
    items: [
      'Declares executive orders and agency actions unlawful',
      'Enjoins federal officials from enforcing invalid policies',
      'Reviews the legality of detentions and enforcement actions'
    ]
  }
];

export const BILL_STEPS = [
  {
    branch: 'legislative',
    title: 'Introduction',
    detail:
      'A member of the House or Senate introduces the bill. It receives a number and is referred to the committee with jurisdiction over the subject.'
  },
  {
    branch: 'legislative',
    title: 'Committee markup',
    detail:
      'The committee holds hearings, amends the text, and votes. Most bills die here and never reach the floor.'
  },
  {
    branch: 'legislative',
    title: 'Floor vote in the first chamber',
    detail:
      'The full chamber debates and votes. A simple majority sends the bill to the other chamber.'
  },
  {
    branch: 'legislative',
    title: 'The second chamber',
    detail:
      'The other chamber repeats the process. If it passes a different version, a conference reconciles the two texts and both chambers vote again.'
  },
  {
    branch: 'executive',
    title: 'The President decides',
    detail:
      'The President signs the bill into law, vetoes it, or lets it become law without a signature after ten days while Congress is in session.'
  },
  {
    branch: 'legislative',
    title: 'Override attempt',
    detail:
      'If vetoed, Congress can still enact the bill over the President\u2019s objection with a two-thirds vote in both chambers.'
  },
  {
    branch: 'executive',
    title: 'Implementation',
    detail:
      'Federal agencies write regulations and enforce the new statute, turning the text into policy that reaches the public.'
  },
  {
    branch: 'judicial',
    title: 'Judicial review',
    detail:
      'When someone harmed by the law sues, the courts interpret it and may strike it down if it conflicts with the Constitution.'
  }
];

export const QUIZ = [
  {
    question: 'Which branch has the power to declare war?',
    options: ['Legislative', 'Executive', 'Judicial'],
    answer: 0,
    explanation:
      'Article I gives Congress the power to declare war, even though the President commands the armed forces as commander in chief.'
  },
  {
    question: 'A President vetoes a bill. What can Congress do?',
    options: [
      'Nothing; the bill is dead',
      'Override the veto with a two-thirds vote in both chambers',
      'Ask the Supreme Court to overrule the veto'
    ],
    answer: 1,
    explanation:
      'A two-thirds vote in both the House and the Senate enacts the bill over the President\u2019s objection.'
  },
  {
    question: 'Who appoints Supreme Court justices, and who approves them?',
    options: [
      'The President appoints; the Senate confirms',
      'Congress appoints; the President confirms',
      'The Chief Justice appoints; voters confirm'
    ],
    answer: 0,
    explanation:
      'Nomination and confirmation split the appointment power between two branches, so neither controls the Court alone.'
  },
  {
    question: 'Which power lets courts void a law that conflicts with the Constitution?',
    options: ['Executive privilege', 'Judicial review', 'The filibuster'],
    answer: 1,
    explanation:
      'Judicial review is not spelled out in the text. The Court established it in Marbury v. Madison in 1803.'
  },
  {
    question: 'Which branch controls federal spending?',
    options: ['Judicial', 'Executive', 'Legislative'],
    answer: 2,
    explanation:
      'The power of the purse belongs to Congress. No money is drawn from the Treasury without an appropriation made by law.'
  },
  {
    question: 'Impeachment removes an official from office in which order?',
    options: [
      'The Senate impeaches, then the House convicts',
      'The House impeaches, then the Senate convicts',
      'The Supreme Court impeaches and convicts'
    ],
    answer: 1,
    explanation:
      'The House brings the charges by majority vote. Removal then requires a two-thirds vote to convict in the Senate.'
  }
];

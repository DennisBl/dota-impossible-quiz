/* ====================================================================
   QUESTION BANK — seed data for The Impossible Dota Quiz.
   16 standard + 4 special (glyph, sequence, period, roshan).
   ==================================================================== */

export const seedQuestions = [
  {
    number: 1,
    kind: 'standard',
    prompt: 'How many heroes are in Dota 2?',
    answers: [
      'Exactly 124',
      'Too many to remember',
      'One — the Ancient',
      'Counting is for Pos 5s',
    ],
    correctIndex: 1,
  },
  {
    number: 2,
    kind: 'standard',
    prompt: '<em>P</em>ick a he<em>r</em>o known fo<em>r</em> bein<em>g</em> tan<em>k</em>y. Choose wisely.',
    answers: ['Pudge', 'Axe', 'Tidehunter', 'Read the question again'],
    correctIndex: 3,
  },
  {
    number: 3,
    kind: 'standard',
    prompt: 'What does <strong>GG</strong> stand for at minute 8?',
    answers: ['Good Game', 'Get Gud', 'Grovel and Grudge', 'Going Glyph'],
    correctIndex: 1,
  },
  {
    number: 4,
    kind: 'standard',
    prompt: 'Which side wins more games statistically?',
    answers: [
      'Radiant',
      'Dire',
      'Neither — perfectly balanced',
      'Whichever team has the better Pos 1',
    ],
    correctIndex: 0,
  },
  {
    number: 5,
    kind: 'standard',
    prompt: 'How many letters in <em>"Anti-Mage"</em>?',
    answers: ['8', '9', "7 — the dash doesn't count", 'There is no I in Anti-Mage'],
    correctIndex: 0,
  },
  {
    number: 6,
    kind: 'glyph',
    prompt: 'Quick! Glyph the tower before the creep wave!',
    hint: 'Click the glyph 7 times.',
    config: { clicksRequired: 7, timeLimit: 5 },
  },
  {
    number: 7,
    kind: 'standard',
    prompt: 'Which hero said <em>"You don\'t even know my name"</em>?',
    answers: ['Riki', 'Invoker', 'Meepo', 'Templar Assassin'],
    correctIndex: 0,
  },
  {
    number: 8,
    kind: 'standard',
    prompt: 'Roshan died at 14:30. He could be back as early as...',
    answers: ['22:30', '24:30', '23:30', "Whenever the enemy says he's up"],
    correctIndex: 0,
  },
  {
    number: 9,
    kind: 'standard',
    prompt: 'Which of these is technically a fish?',
    answers: [
      'Slardar',
      'Slark',
      'Tidehunter',
      "None — they're all <em>nagas</em>, <em>slithereens</em>, and <em>kuo-toa</em>",
    ],
    correctIndex: 3,
  },
  {
    number: 10,
    kind: 'sequence',
    prompt: 'Cast <em>Sun Strike</em>. Click the orbs in the correct order.',
    hint: "(Hint: it's the only spell with all three of one orb.)",
    correctSequence: ['E', 'E', 'E'],
  },
  {
    number: 11,
    kind: 'standard',
    prompt: 'Pick the <span class="small-trick">smallest</span> hero.',
    answers: [
      'Meepo',
      'Crystal Maiden',
      'Tinker',
      '<span class="small-trick">Snapfire</span>',
    ],
    correctIndex: 3,
  },
  {
    number: 12,
    kind: 'standard',
    prompt: "Drow Ranger's passive deactivates when an enemy is...",
    answers: [
      '400 range or closer',
      '500 range or closer',
      '300 range or closer',
      'Right behind her, breathing on her neck',
    ],
    correctIndex: 0,
  },
  {
    number: 13,
    kind: 'period',
    prompt: 'Where is <em>The Ancient</em>?',
    answers: [
      'Top of the map',
      'Bottom of the map',
      'In your base.',
      'Behind you',
    ],
    hint: 'Click precisely.',
  },
  {
    number: 14,
    kind: 'standard',
    prompt: 'How do you win a Dota 2 match?',
    answers: [
      'Destroy the enemy Ancient',
      'Get the most kills',
      'Have your team not flame each other',
      "Outlast the enemy mid laner's patience",
    ],
    correctIndex: 0,
  },
  {
    number: 15,
    kind: 'standard',
    prompt: 'Who is <em>Davion</em>?',
    answers: [
      'A Dragon Knight',
      "The protagonist of <em>DOTA: Dragon's Blood</em>",
      'Both of the above',
      'Never heard of him',
    ],
    correctIndex: 2,
  },
  {
    number: 16,
    kind: 'standard',
    prompt: 'How many letter "<strong>O</strong>"s appear in <em>"Outworld Destroyer"</em>?',
    answers: ['2', '3', '4', '1 — case-sensitive'],
    correctIndex: 2,
  },
  {
    number: 17,
    kind: 'standard',
    prompt: 'How many syllables are in <em>"Nyx Assassin Vendetta"</em>?',
    answers: ['7', '8', '9', 'Use a skip, mortal.'],
    correctIndex: 1,
  },
  {
    number: 18,
    kind: 'standard',
    prompt:
      'The Roshan pit has <em>3</em> entrances.<br>But how many <strong>exits</strong>?',
    answers: [
      '3 — same as entrances',
      '2 — north blocked',
      '1 — only the safe lane side',
      "None — you're already dead",
    ],
    correctIndex: 0,
  },
  {
    number: 19,
    kind: 'roshan',
    prompt: "Catch the <em>Roshan</em>. He's slippery.",
    answers: ['Click here', '🛡️ Roshan', 'No, click here', 'Definitely here'],
    config: { roshanIndex: 1 },
  },
  {
    number: 20,
    kind: 'standard',
    prompt:
      'You have reached the final question.<br><em>What is the answer?</em>',
    answers: ['A', 'B', 'C', 'The journey, not the destination.'],
    correctIndex: 3,
  },
];

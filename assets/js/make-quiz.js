const { useEffect, useMemo, useState } = React;

const quizCategories = {
  make01: {
    label: 'Make 1: Google Ngram Viewer Analysis',
    makeUrl: '../makes/week01.html',
    description: 'Your answers point toward close looking, critcal analysis, and understanding how something was made.'
  },
  make02: {
    label: 'Make 2: Personal Refined Selfie',
    makeUrl: '../makes/week02.html',
    description: 'Your answers point toward identity, image-making, and self-representation.'
  },
  make03: {
    label: 'Make 3: A Funny Comic?',
    makeUrl: '../makes/week03.html',
    description: 'Your answers point toward critical humor, visual storytelling, and creative sequencing.'
  },
  make04: {
    label: 'Make 4: One of Many GIF',
    makeUrl: '../makes/week04.html',
    description: 'Your answers point toward remixing, visual storytelling, ownership, and visual emphasis.'
  },
  make05: {
    label: 'Make 5: Critical Analysis with Algorithmic Tools',
    makeUrl: '../makes/week05.html',
    description: 'Your answers point toward critical analysis, textual interpretation, and making new meaning from existing media.'
  },
  make06: {
    label: 'Make 6: Geography of AI Power',
    makeUrl: '../makes/week06.html',
    description: 'Your answers point toward mapping, patterns in industries, and uncovering systemic inequalities.'
  },
  make07: {
    label: 'Make 7: Personal AI Network',
    makeUrl: '../makes/week07.html',
    description: 'Your answers point toward hidden structures, networking, and how digital tools connect us to industries.'
  },
  make08: {
    label: 'Make 8: Build a bot or generator using a no-code AI tool',
    makeUrl: '../makes/week08.html',
    description: 'Your answers point toward boundary exploration, generation, and algorithmic production.'
  },
  make09: {
    label: 'Make 9: Moderating within a System',
    makeUrl: '../makes/week09.html',
    description: 'Your answers point toward creativty under rules, playful systems, and an exploration of ethics.'
  },
  make10: {
    label: 'Make 10: Labor Behind Your Safety',
    makeUrl: '../makes/week10.html',
    description: 'Your answers point toward hidden labor, uncovered truth, and visual storytelling.'
  },
  make11: {
    label: 'Make 11: Your AI Footprint',
    makeUrl: '../makes/week11.html',
    description: 'Your answers point toward environmental consequences, sustainability, and data visualization.'
  },
  make12: {
    label: 'Make 12: A Future Breakup',
    makeUrl: '../makes/week12.html',
    description: 'Your answers point toward forward thinking, perspective shifting, and critical reflection.'
  }
};

const quizQuestions = [
  {
  question: 'What kind of project excites you most?',
  answers: [
    {
      text: 'Creating something visual, expressive, or personal',
      scores: { make02: 3, make03: 3, make04: 3 }
    },
    {
      text: 'Building something interactive, playful, or generative',
      scores: { make08: 3, make09: 3 }
    },
    {
      text: 'Investigating systems, patterns, or real-world issues',
      scores: { make01: 3, make05: 3, make06: 3, make07: 3, make11: 1 }
    }
  ]
},
{
  question: 'How do you like to work?',
  answers: [
    {
      text: 'I focus on visuals and follow creative impulses, even if I don\'t know where they will lead',
      scores: { make02: 3, make03: 3, make04: 3 }
    },
    {
      text: 'I tweak and experiment until something unexpected happens',
      scores: { make08: 3, make09: 3 }
    },
    {
      text: 'I research, study data, and analyze structures before creating',
      scores: { make01: 3, make05: 3, make06: 3, make07: 3 }
    }
  ]
},
{
  question: 'When creating, what do you want your project to show others?',
  answers: [
    {
      text: 'Make them feel something or see a new perspective',
      scores: { make02: 2, make03: 3, make04: 3, make12: 2 }
    },
    {
      text: 'Let them interact, play, or explore',
      scores: { make08: 3, make09: 3 }
    },
    {
      text: 'Help them understand a bigger issue',
      scores: { make01: 2, make05: 3, make06: 3, make07: 3, make10: 3, make11: 3 }
    }
  ]
},
{
  question: 'How much structure do you like when creating?',
  answers: [
    {
      text: 'Very open-ended, so I can figure it out as I go',
      scores: { make03: 3, make04: 3, make08: 3 }
    },
    {
      text: 'A mix, with some guidance but room to explore',
      scores: { make02: 3, make09: 2, make12: 3 }
    },
    {
      text: 'Clear structure, with defined goals and frameworks',
      scores: { make01: 3, make05: 3, make06: 2, make07: 3 }
    }
  ]
},
{
  question: 'When thinking about AI systems, what interests you most?',
  answers: [
    {
      text: 'How AI changes people, identity, storytelling, and creative expression',
      scores: {
        make02: 3,
        make03: 3,
        make04: 3,
        make10: 2,
        make12: 2
      }
    },
    {
      text: 'How AI systems function through tools, rules, infrastructure, and networks',
      scores: {
        make01: 3,
        make05: 3,
        make06: 3,
        make07: 3,
        make08: 2,
        make09: 2
      }
    },
    {
      text: 'How AI affects society, labor, environments, and the future',
      scores: {
          make10: 2,
          make11: 2,
          make12: 3,
          make06: 1,
          make07: 1
      }
    }
  ]
},
  {
  question: 'What scale do you prefer thinking at?',
  answers: [
    {
      text: 'Individual, with stories, identity, and experience',
      scores: { make02: 3, make03: 3 }
    },
    {
      text: 'In-between, about systems, tools, and interactions',
      scores: { make04: 2, make08: 3, make09: 3, make01: 2 }
    },
    {
      text: 'Big picture, about society, environments, and the future',
      scores: { make06: 2, make07: 3, make10: 3, make11: 3, make12: 3 }
    }
  ]
},
{
  question: 'What kind of AI issue do you most want to uncover?',
  answers: [
    {
      text: 'How AI tools analyze language, texts, and patterns',
      scores: { make05: 3, make01: 1 }
    },
    {
      text: 'Where AI infrastructure exists physically across places',
      scores: { make06: 3, make07: 1 }
    },
    {
      text: 'The hidden human or environmental costs behind AI systems',
      scores: { make10: 1, make11: 2, make07: 1 }
    }
  ]
}
];

function getInitialScores() {
  return Object.keys(quizCategories).reduce((scores, category) => {
    scores[category] = 0;
    return scores;
  }, {});
}

function getResult(scores) {
  const highScore = Math.max(...Object.values(scores));
  const tiedCategories = Object.keys(scores).filter((category) => scores[category] === highScore);
  const winner = tiedCategories[0];

  return {
    winner,
    tiedCategories,
    isTie: tiedCategories.length > 1,
    details: quizCategories[winner]
  };
}

function MakePersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(getInitialScores);
  const [resultScores, setResultScores] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(5);

  const result = useMemo(() => getResult(resultScores || scores), [resultScores, scores]);
  const question = quizQuestions[currentQuestion];

  useEffect(() => {
    if (!isComplete) return;

    const redirectTimer = window.setTimeout(() => {
      window.location.href = result.details.makeUrl;
    }, 5000);
    const countdownTimer = window.setInterval(() => {
      setRedirectSeconds((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => {
      window.clearTimeout(redirectTimer);
      window.clearInterval(countdownTimer);
    };
  }, [isComplete, result.details.makeUrl]);

  function handleAnswer(scoresToAdd) {
    const updatedScores = Object.keys(scores).reduce((totals, category) => {
      totals[category] = scores[category] + (scoresToAdd[category] || 0);
      return totals;
    }, {});

    setScores(updatedScores);

    if (currentQuestion === quizQuestions.length - 1) {
      setResultScores(updatedScores);
      setIsComplete(true);
      setRedirectSeconds(5);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setScores(getInitialScores());
    setResultScores(null);
    setIsComplete(false);
    setRedirectSeconds(5);
  }

  if (isComplete) {
    const tieLabels = result.tiedCategories.map((category) => quizCategories[category].label).join(' and ');

    // Custom heading for make 5
    let resultHeading = result.details.label;
    if (result.winner === 'make05') {
      resultHeading = 'Make 5: Critical Analysis with Algorithmic Tools';
    }
    return React.createElement(
      'div',
      { className: 'quiz-shell quiz-results' },
      React.createElement('p', { className: 'quiz-eyebrow' }, 'Your make match'),
      React.createElement('h3', { id: 'quiz-title' }, resultHeading),
      React.createElement('p', { className: 'quiz-description' }, result.details.description),
      result.isTie &&
        React.createElement(
          'p',
          { className: 'quiz-tie' },
          `Tie detected: ${tieLabels}. I picked the first close match as your starting point.`
        ),
      React.createElement('p', { className: 'quiz-redirect' }, `Redirecting in ${redirectSeconds} seconds...`),
      React.createElement(
        'div',
        { className: 'quiz-actions' },
        React.createElement('a', { className: 'btn', href: result.details.makeUrl }, 'Go now'),
        React.createElement('button', { className: 'btn ghost quiz-button-reset', type: 'button', onClick: restartQuiz }, 'Restart quiz')
      )
    );
  }

  return React.createElement(
    'div',
    { className: 'quiz-shell' },
    React.createElement('p', { className: 'quiz-eyebrow' }, `Question ${currentQuestion + 1} of ${quizQuestions.length}`),
    React.createElement('h3', { id: 'quiz-title' }, question.question),
    React.createElement(
      'div',
      { className: 'quiz-progress', 'aria-hidden': 'true' },
      React.createElement('span', { style: { width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` } })
    ),
    React.createElement(
      'div',
      { className: 'quiz-answers' },
      question.answers.map((answer) =>
        React.createElement(
          'button',
          { className: 'quiz-answer', key: answer.text, type: 'button', onClick: () => handleAnswer(answer.scores) },
          answer.text
        )
      )
    )
  );
}

const quizRoot = document.getElementById('make-quiz-root');

if (window.React && window.ReactDOM && quizRoot) {
  ReactDOM.createRoot(quizRoot).render(React.createElement(MakePersonalityQuiz));
} else if (quizRoot) {
  quizRoot.innerHTML = '<div class="quiz-shell"><h3 id="quiz-title">Make Interest Quiz</h3><p class="quiz-description">The quiz needs React to load. Please refresh when you are online.</p></div>';
}

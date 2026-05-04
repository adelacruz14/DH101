const { useEffect, useMemo, useState } = React;

const quizCategories = {
  make01: {
    label: 'Make 1: Reverse-engineer a DH/AI project',
    makeUrl: '../makes/week01.html',
    description: 'Your answers point toward close looking, critcal analysis, and understanding how something was made.'
  },
  make02: {
    label: 'Make 2: AI Selfie',
    makeUrl: '../makes/week02.html',
    description: 'Your answers point toward identity, image-making, and self-representation.'
  },
  make03: {
    label: 'Make 3: Let\'s Make a Comic',
    makeUrl: '../index.html#make3',
    description: 'Your answers point toward critical humor, visual storytelling, and creative sequencing.'
  },
  make04: {
    label: 'Make 4: Gifs & Remix Culture',
    makeUrl: '../index.html#make4',
    description: 'Your answers point toward remixing, visual storytelling, ownership, and visual emphasis.'
  },
  make05: {
    label: 'Make 5: Compare Voyant vs GPT text analysis',
    makeUrl: '../makes/week05.html',
    description: 'Your answers point toward critical analysis, textual interpretation, and making new meaning from existing media.'
  },
  make06: {
    label: 'Make 6: Build a digital map of AI\'s infrastructures',
    makeUrl: '../makes/week06.html',
    description: 'Your answers point toward mapping, patterns in industries, and uncovering systemic inequalities.'
  },
  make07: {
    label: 'Make 7: Networks of Knowledge & Power',
    makeUrl: '../makes/week07.html',
    description: 'Your answers point toward hidden structures, networking, and how digital tools connect us to industries.'
  },
  make08: {
    label: 'Make 8: Build a bot or generator using a no-code AI tool',
    makeUrl: '../makes/week08.html',
    description: 'Your answers point toward boundary exploration, generation, and algorithmic production.'
  },
  make09: {
    label: 'Make 9: Games and Play',
    makeUrl: '../makes/week09.html',
    description: 'Your answers point toward creativty under rules, playful systems, and an exploration of ethics.'
  },
  make10: {
    label: 'Make 10: AI & Labor',
    makeUrl: '../makes/week10.html',
    description: 'Your answers point toward hidden labor, uncovered truth, and visual storytelling.'
  },
  make11: {
    label: 'Make 11: AI & Ecology',
    makeUrl: '../makes/week11.html',
    description: 'Your answers point toward environmental consequences, sustainability, and data visualization.'
  },
  make12: {
    label: 'Make 12: Futures of AI & Humanity',
    makeUrl: '../makes/week12.html',
    description: 'Your answers point toward forward thinking, perspective shifting, and critical reflection.'
  }
};

const quizQuestions = [
  {
    question: 'What kind of topic sounds most interesting to you?',
    answers: [
      {
        text: 'Something visual and personal',
        scores: { make01: 1, make02: 3, make03: 3, make04: 3, make05: 1, make06: 0, make07: 3, make08: 2, make09: 2, make10: 3, make11: 3, make12: 3, make13: 0 }
      },
      {
        text: 'Something interactive and experimental',
        scores: { make01: 0, make02: 1, make03: 2, make04: 1, make05: 1, make06: 2, make07: 0, make08: 3, make09: 3, make10: 0, make11: 1, make12: 2, make13: 0 }
      },
      {
        text: 'Something researched and analytical',
        scores: { make01: 3, make02: 0, make03: 0, make04: 0, make05: 3, make06: 3, make07: 2, make08: 0, make09: 0, make10: 3, make11: 2, make12: 0, make13: 0 }
      }
    ]
  },
  {
    question: 'Which process do you enjoy most?',
    answers: [
      {
        text: 'Collecting images, arranging scenes, and shaping a mood',
        scores: { make01: 0, make02: 2, make03: 2, make04: 2, make05: 2, make06: 0, make07: 0, make08: 0, make09: 0, make10: 0, make11: 0, make12: 0, make13: 1 }
      },
      {
        text: 'Testing a system until it does something surprising',
        scores: { make01: 2, make02: 0, make03: 0, make04: 1, make05: 0, make06: 0, make07: 0, make08: 1, make09: 2, make10: 2, make11: 0, make12: 0, make13: 1 }
      },
      {
        text: 'Following a question through sources, data, or examples',
        scores: { make01: 1, make02: 0, make03: 0, make04: 0, make05: 0, make06: 2, make07: 2, make08: 2, make09: 0, make10: 0, make11: 2, make12: 2, make13: 1 }
      }
    ]
  },
  {
    question: 'What should your finished make help someone do?',
    answers: [
      {
        text: 'Feel something or see an idea differently',
        scores: { make01: 0, make02: 2, make03: 2, make04: 2, make05: 2, make06: 0, make07: 0, make08: 0, make09: 0, make10: 1, make11: 0, make12: 0, make13: 1 }
      },
      {
        text: 'Explore, choose, play, or experiment',
        scores: { make01: 1, make02: 0, make03: 1, make04: 0, make05: 0, make06: 0, make07: 1, make08: 1, make09: 2, make10: 2, make11: 0, make12: 0, make13: 1 }
      },
      {
        text: 'Understand a larger issue more clearly',
        scores: { make01: 1, make02: 0, make03: 0, make04: 0, make05: 0, make06: 2, make07: 2, make08: 2, make09: 0, make10: 0, make11: 2, make12: 2, make13: 2 }
      }
    ]
  },
  {
    question: 'Which topic pulls your attention first?',
    answers: [
      {
        text: 'Identity, storytelling, and creative media',
        scores: { make01: 0, make02: 2, make03: 2, make04: 1, make05: 2, make06: 0, make07: 0, make08: 0, make09: 0, make10: 0, make11: 0, make12: 0, make13: 1 }
      },
      {
        text: 'Automation, games, and computational creativity',
        scores: { make01: 1, make02: 0, make03: 0, make04: 0, make05: 0, make06: 0, make07: 0, make08: 1, make09: 2, make10: 2, make11: 1, make12: 0, make13: 1 }
      },
      {
        text: 'Labor, ecology, networks, and AI systems',
        scores: { make01: 1, make02: 0, make03: 0, make04: 0, make05: 0, make06: 1, make07: 2, make08: 2, make09: 0, make10: 0, make11: 2, make12: 2, make13: 2 }
      }
    ]
  },
  {
    question: 'Pick the result you would be proudest to share.',
    answers: [
      {
        text: 'A memorable image, comic, GIF, or remix',
        scores: { make01: 0, make02: 2, make03: 2, make04: 2, make05: 2, make06: 0, make07: 0, make08: 0, make09: 0, make10: 0, make11: 0, make12: 0, make13: 1 }
      },
      {
        text: 'A working bot, generator, or game',
        scores: { make01: 1, make02: 0, make03: 0, make04: 0, make05: 0, make06: 0, make07: 0, make08: 0, make09: 2, make10: 2, make11: 0, make12: 0, make13: 1 }
      },
      {
        text: 'A clear map, network, analysis, or future scenario',
        scores: { make01: 1, make02: 0, make03: 0, make04: 0, make05: 0, make06: 2, make07: 2, make08: 2, make09: 0, make10: 0, make11: 2, make12: 2, make13: 2 }
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
  const [isComplete, setIsComplete] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(5);

  const result = useMemo(() => getResult(scores), [scores]);
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
      setIsComplete(true);
      setRedirectSeconds(5);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setScores(getInitialScores());
    setIsComplete(false);
    setRedirectSeconds(5);
  }

  if (isComplete) {
    const tieLabels = result.tiedCategories.map((category) => quizCategories[category].label).join(' and ');

    return React.createElement(
      'div',
      { className: 'quiz-shell quiz-results' },
      React.createElement('p', { className: 'quiz-eyebrow' }, 'Your make match'),
      React.createElement('h3', { id: 'quiz-title' }, result.details.label),
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
    React.createElement('h3', { id: 'quiz-title' }, 'Which make matches your style?'),
    React.createElement('p', { className: 'quiz-question' }, question.question),
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
  quizRoot.innerHTML = '<div class="quiz-shell"><h3 id="quiz-title">Which make matches your style?</h3><p class="quiz-description">The quiz needs React to load. Please refresh when you are online.</p></div>';
}

import type { PathQuiz } from '../lib/knowledge-types';

/**
 * Per-journey assessment quizzes. Each quiz is the "final" for a learning path:
 * pass it (>= passScore) with all steps completed to earn the journey badge.
 * Questions are grounded in the path's articles and teach via explanations.
 */
export const pathQuizzes: PathQuiz[] = [
  {
    pathSlug: 'start-here-beginner',
    title: 'Start Here — Foundations Assessment',
    passScore: 0.7,
    questions: [
      {
        id: 'sh-1',
        question: 'What is the most accurate description of "artificial intelligence" as a field?',
        options: [
          'A single technology that makes computers conscious',
          'A broad engineering discipline for building systems that reason, learn, perceive and act',
          'Any software that uses a database',
          'Only large language models like ChatGPT',
        ],
        correctIndex: 1,
        explanation:
          'AI is a broad field, not one product or a conscious machine. It spans many techniques aimed at systems that can reason, learn, perceive and act.',
      },
      {
        id: 'sh-2',
        question: 'Which statement best captures the AI we actually use today?',
        options: [
          'General AI (AGI) that matches humans across all tasks',
          'Narrow AI that is superhuman at specific, bounded tasks',
          'Sentient machines with their own goals',
          'Systems that never make mistakes',
        ],
        correctIndex: 1,
        explanation:
          'Today’s systems are "narrow" — excellent at specific tasks (translation, recommendation, image recognition) but not general human-level intelligence.',
      },
      {
        id: 'sh-3',
        question: 'In one sentence, what does training a modern AI model actually do?',
        options: [
          'It hand-codes every rule a programmer can think of',
          'It adjusts internal parameters by learning patterns from large amounts of data',
          'It copies answers from the internet at runtime',
          'It randomly guesses until a human approves',
        ],
        correctIndex: 1,
        explanation:
          'Rather than being explicitly programmed with rules, models learn patterns from data by adjusting millions/billions of parameters during training.',
      },
      {
        id: 'sh-4',
        question: 'Why is prompt engineering a foundational practical skill?',
        options: [
          'It lets you retrain the model from scratch',
          'How you phrase and structure input strongly shapes the quality and reliability of output',
          'It is only relevant for image models',
          'It removes the need to check AI output',
        ],
        correctIndex: 1,
        explanation:
          'The same model can give very different results depending on how the request is framed — clear context, constraints and examples raise quality and reliability.',
      },
      {
        id: 'sh-5',
        question: 'What is the healthiest mental model for human–AI collaboration at work?',
        options: [
          'AI fully replaces human judgment in all decisions',
          'AI handles scale and drafts while humans provide judgment, context and accountability',
          'Humans should avoid AI entirely',
          'AI should run unsupervised in high-stakes settings',
        ],
        correctIndex: 1,
        explanation:
          'The durable pattern is augmentation: AI accelerates and scales, humans keep judgment, context and accountability — especially where stakes are high.',
      },
    ],
  },

  {
    pathSlug: 'neural-networks-deep-dive',
    title: 'Neural Networks — Architecture Assessment',
    passScore: 0.7,
    questions: [
      {
        id: 'nn-1',
        question: 'What is the basic computational unit of a neural network?',
        options: [
          'A database row',
          'An artificial neuron that computes a weighted sum of inputs and applies an activation function',
          'A single if/else rule',
          'A pixel',
        ],
        correctIndex: 1,
        explanation:
          'Each neuron takes inputs, multiplies them by learned weights, sums them (plus a bias) and passes the result through a non-linear activation function.',
      },
      {
        id: 'nn-2',
        question: 'What is the purpose of an activation function?',
        options: [
          'To store the training data',
          'To introduce non-linearity so the network can model complex relationships',
          'To slow training down on purpose',
          'To encrypt the weights',
        ],
        correctIndex: 1,
        explanation:
          'Without non-linear activations, stacked layers collapse into a single linear function. Non-linearity is what lets deep networks represent complex patterns.',
      },
      {
        id: 'nn-3',
        question: 'What does backpropagation do during training?',
        options: [
          'Generates new training data',
          'Propagates the output error backward to compute gradients and update weights',
          'Deletes neurons that are unused',
          'Chooses the model architecture automatically',
        ],
        correctIndex: 1,
        explanation:
          'Backpropagation computes how much each weight contributed to the error (the gradient), then gradient descent nudges weights to reduce that error.',
      },
      {
        id: 'nn-4',
        question: 'What key mechanism makes the transformer architecture so effective?',
        options: [
          'Recurrence that processes one token at a time only',
          'Self-attention, which lets the model weigh the relevance of all tokens to each other',
          'Hard-coded grammar rules',
          'Storing the entire internet in memory',
        ],
        correctIndex: 1,
        explanation:
          'Self-attention lets every token attend to every other token, capturing long-range context in parallel — the breakthrough behind modern LLMs.',
      },
      {
        id: 'nn-5',
        question: 'Where do neural networks sit relative to machine learning and deep learning?',
        options: [
          'They are unrelated to machine learning',
          'Deep learning is machine learning using multi-layer (deep) neural networks',
          'Machine learning is a subset of neural networks',
          'Deep learning replaced machine learning entirely',
        ],
        correctIndex: 1,
        explanation:
          'Deep learning is the branch of machine learning that uses neural networks with many layers — ML is the broader umbrella.',
      },
    ],
  },

  {
    pathSlug: 'ai-business-automation',
    title: 'AI Business Automation — Deployment Assessment',
    passScore: 0.7,
    questions: [
      {
        id: 'ba-1',
        question: 'What is the best first step when selecting an AI automation use case?',
        options: [
          'Pick the flashiest demo regardless of value',
          'Target high-volume, repetitive tasks with clear inputs/outputs and tolerance for review',
          'Automate the most safety-critical decision first',
          'Replace an entire department immediately',
        ],
        correctIndex: 1,
        explanation:
          'Good first use cases are repetitive, high-volume, well-scoped, and tolerant of a human review step — that’s where AI delivers reliable ROI early.',
      },
      {
        id: 'ba-2',
        question: 'Why is prompt engineering central to reliable business automation?',
        options: [
          'It eliminates the need for testing',
          'Structured prompts with context and constraints make outputs consistent enough to depend on',
          'It is only needed for chatbots',
          'It guarantees the model is never wrong',
        ],
        correctIndex: 1,
        explanation:
          'Automation needs consistency. Well-structured prompts (context, constraints, examples, output format) make results repeatable enough to build on.',
      },
      {
        id: 'ba-3',
        question: 'How do AI agents extend simple prompt-response automation?',
        options: [
          'They remove humans from every loop by default',
          'They can plan multi-step tasks, call tools/APIs, and act on results',
          'They only summarize text',
          'They require no orchestration',
        ],
        correctIndex: 1,
        explanation:
          'Agents go beyond single responses: they decompose goals into steps, use tools/APIs, observe results and iterate — enabling richer automation.',
      },
      {
        id: 'ba-4',
        question: 'What governance practice is essential before scaling AI in production?',
        options: [
          'Disable all logging to protect privacy',
          'Define scope, add human review for consequential outputs, log decisions, and monitor quality',
          'Let the model decide its own guardrails',
          'Skip evaluation to ship faster',
        ],
        correctIndex: 1,
        explanation:
          'Production AI needs scoped permissions, human-in-the-loop for high-stakes actions, audit logging and ongoing quality monitoring.',
      },
      {
        id: 'ba-5',
        question: 'What is a realistic expectation for ROI from AI automation?',
        options: [
          'Instant full replacement of staff with zero oversight',
          'Meaningful time/cost savings on targeted workflows, with humans handling exceptions',
          'No measurable impact ever',
          'It only helps marketing',
        ],
        correctIndex: 1,
        explanation:
          'The realistic win is compounding efficiency on targeted workflows while humans manage exceptions and judgment — not wholesale, unsupervised replacement.',
      },
    ],
  },

  {
    pathSlug: 'robotics-and-humanoids',
    title: 'Robotics & Humanoids — Embodied AI Assessment',
    passScore: 0.7,
    questions: [
      {
        id: 'rb-1',
        question: 'What is the core sense–plan–act loop in robotics?',
        options: [
          'Render → store → print',
          'Perceive the environment with sensors → decide on an action → execute with actuators',
          'Compile → deploy → sleep',
          'Search → download → display',
        ],
        correctIndex: 1,
        explanation:
          'Robots sense (cameras, lidar, encoders), plan (decide what to do), and act (motors/actuators) — repeating this loop continuously.',
      },
      {
        id: 'rb-2',
        question: 'Why is "embodiment" a hard problem for AI?',
        options: [
          'Physical bodies are cheaper than software',
          'Acting in the messy physical world adds real-time perception, dynamics and safety constraints',
          'Robots never need sensors',
          'The real world is simpler than simulation',
        ],
        correctIndex: 1,
        explanation:
          'Embodied AI must handle noisy perception, physics, real-time control and safety — far messier than purely digital tasks.',
      },
      {
        id: 'rb-3',
        question: 'Why pursue the human form for general-purpose robots?',
        options: [
          'It is the cheapest possible shape',
          'Our environments and tools are built for the human body, so a humanoid can use them directly',
          'Humanoids require no balance control',
          'It is purely for marketing',
        ],
        correctIndex: 1,
        explanation:
          'The world is designed around human bodies — stairs, doors, tools. A humanoid can operate in existing spaces without redesigning them.',
      },
      {
        id: 'rb-4',
        question: 'What AI advances most enabled the recent jump in humanoid capability?',
        options: [
          'Faster spreadsheets',
          'Better perception (vision) and learned control policies trained in simulation',
          'Removing all sensors',
          'Slower processors',
        ],
        correctIndex: 1,
        explanation:
          'Modern perception models plus learned control policies (often trained in simulation then transferred) drove rapid progress in humanoid robots.',
      },
      {
        id: 'rb-5',
        question: 'What remains a major open challenge for humanoid robots?',
        options: [
          'There are no remaining challenges',
          'Robust dexterity, reliability, safety and cost at scale in unstructured environments',
          'Displaying text on a screen',
          'Connecting to Wi-Fi',
        ],
        correctIndex: 1,
        explanation:
          'Reliable real-world dexterity, safety, generalization and cost-effective manufacturing remain hard, unsolved problems.',
      },
    ],
  },

  {
    pathSlug: 'prompt-engineering-mastery',
    title: 'Prompt Engineering — Technique Assessment',
    passScore: 0.7,
    questions: [
      {
        id: 'pe-1',
        question: 'What is "zero-shot" prompting?',
        options: [
          'Giving the model several worked examples',
          'Asking the model to perform a task with instructions but no examples',
          'Fine-tuning the model on your data',
          'Disabling the model’s output',
        ],
        correctIndex: 1,
        explanation:
          'Zero-shot = instruction only, no examples. Few-shot adds examples to steer format and behavior.',
      },
      {
        id: 'pe-2',
        question: 'What does "few-shot" prompting add?',
        options: [
          'Random noise',
          'A handful of input/output examples that demonstrate the desired pattern',
          'A larger model',
          'Internet access',
        ],
        correctIndex: 1,
        explanation:
          'Few-shot includes example pairs in the prompt, showing the model the exact pattern and format you want it to follow.',
      },
      {
        id: 'pe-3',
        question: 'When does chain-of-thought prompting help most?',
        options: [
          'Simple lookups',
          'Multi-step reasoning tasks, by asking the model to reason step by step',
          'Reducing the prompt length',
          'Image generation only',
        ],
        correctIndex: 1,
        explanation:
          'Prompting the model to reason step by step improves accuracy on multi-step reasoning (math, logic, planning) by exposing intermediate steps.',
      },
      {
        id: 'pe-4',
        question: 'Which elements most improve a production prompt’s reliability?',
        options: [
          'Vague, open-ended wording',
          'Clear role/context, explicit constraints, examples, and a defined output format',
          'Maximum ambiguity to encourage creativity',
          'Removing all instructions',
        ],
        correctIndex: 1,
        explanation:
          'Specifying role/context, constraints, examples and a strict output format makes outputs consistent and machine-parseable — essential in production.',
      },
      {
        id: 'pe-5',
        question: 'How does prompting connect to AI agents?',
        options: [
          'Agents never use prompts',
          'Agent steps (planning, tool selection, reflection) are driven by carefully designed prompts',
          'Prompts only matter for the first message',
          'Agents replace prompting with SQL',
        ],
        correctIndex: 1,
        explanation:
          'Agent loops rely on prompts for planning, choosing tools, and reflecting on results — prompt design scales directly into agent reliability.',
      },
    ],
  },

  {
    pathSlug: 'ethical-ai',
    title: 'Ethical AI — Governance Assessment',
    passScore: 0.7,
    questions: [
      {
        id: 'et-1',
        question: 'What does the FATE framework emphasize in responsible AI?',
        options: [
          'Fast, Aggressive, Tactical, Efficient',
          'Fairness, Accountability, Transparency, Ethics',
          'Finance, Audit, Tax, Equity',
          'Features, APIs, Testing, Engineering',
        ],
        correctIndex: 1,
        explanation:
          'FATE = Fairness, Accountability, Transparency, Ethics — a common lens for building and evaluating responsible AI systems.',
      },
      {
        id: 'et-2',
        question: 'How does the EU AI Act primarily structure its rules?',
        options: [
          'A single rule for all AI',
          'A risk-based tiering, with stricter obligations for higher-risk uses',
          'It bans all AI',
          'It only applies to robotics',
        ],
        correctIndex: 1,
        explanation:
          'The EU AI Act is risk-based: minimal-risk uses are light-touch while high-risk uses carry strict requirements (and some uses are prohibited).',
      },
      {
        id: 'et-3',
        question: 'Why does bias in AI systems often arise?',
        options: [
          'Models are intentionally malicious',
          'Models learn patterns from historical data that can encode existing societal biases',
          'Bias is impossible in software',
          'Only the user interface causes bias',
        ],
        correctIndex: 1,
        explanation:
          'Bias commonly enters through training data that reflects historical inequities; without mitigation, models can reproduce or amplify it.',
      },
      {
        id: 'et-4',
        question: 'What is a practical accountability measure for deployed AI?',
        options: [
          'Hiding how decisions are made',
          'Audit logs, human oversight for consequential decisions, and clear ownership',
          'Letting the model self-certify',
          'Disabling monitoring',
        ],
        correctIndex: 1,
        explanation:
          'Accountability means traceable decisions (logs), human oversight where it matters, and a clearly responsible owner — not opaque automation.',
      },
      {
        id: 'et-5',
        question: 'What does "keeping humans in the loop" protect against?',
        options: [
          'Faster processing',
          'Unchecked automated decisions in high-stakes or ambiguous situations',
          'Lower cloud bills',
          'Better graphics',
        ],
        correctIndex: 1,
        explanation:
          'Human-in-the-loop ensures consequential or ambiguous decisions get human judgment, reducing harm from confident-but-wrong automation.',
      },
    ],
  },

  {
    pathSlug: 'advanced-expert',
    title: 'Advanced Expert — Comprehensive Assessment',
    passScore: 0.8,
    questions: [
      {
        id: 'ae-1',
        question: 'Which best distinguishes deep learning within AI?',
        options: [
          'It is unrelated to machine learning',
          'It is machine learning using multi-layer neural networks that learn features automatically',
          'It only uses hand-engineered features',
          'It is a database technique',
        ],
        correctIndex: 1,
        explanation:
          'Deep learning uses many-layered neural networks that learn hierarchical features directly from data, reducing manual feature engineering.',
      },
      {
        id: 'ae-2',
        question: 'In a transformer, self-attention primarily enables what?',
        options: [
          'Sequential one-token-at-a-time processing only',
          'Modeling relationships between all tokens in parallel, capturing long-range context',
          'Eliminating the need for training data',
          'Hard-coded grammar',
        ],
        correctIndex: 1,
        explanation:
          'Self-attention computes pairwise relevance across all tokens in parallel, which captures long-range dependencies and scales well.',
      },
      {
        id: 'ae-3',
        question: 'What characterizes an agentic "ReAct"-style loop?',
        options: [
          'Reason then act: interleaving reasoning steps with tool actions and observations',
          'Rendering animations',
          'Recompiling the model each step',
          'Refusing to use tools',
        ],
        correctIndex: 0,
        explanation:
          'ReAct interleaves reasoning ("thoughts") with actions (tool calls) and observations, letting agents plan, act, and adapt iteratively.',
      },
      {
        id: 'ae-4',
        question: 'For production prompt systems, which matters most?',
        options: [
          'Maximizing ambiguity',
          'Determinism aids: explicit constraints, structured output, evaluation and versioning',
          'Never testing prompts',
          'Avoiding examples',
        ],
        correctIndex: 1,
        explanation:
          'Reliable systems treat prompts like code: constraints, structured/parseable output, evals, and versioning to control regressions.',
      },
      {
        id: 'ae-5',
        question: 'What links sim-to-real transfer in robotics with modern AI?',
        options: [
          'It is unused in robotics',
          'Policies trained in simulation are transferred to real robots, leveraging perception + learned control',
          'It only applies to chatbots',
          'It removes the need for sensors',
        ],
        correctIndex: 1,
        explanation:
          'Embodied AI often trains control policies in simulation (cheap, safe, scalable) then transfers them to physical robots paired with strong perception.',
      },
      {
        id: 'ae-6',
        question: 'Which governance posture fits high-stakes enterprise AI?',
        options: [
          'Ship unsupervised and hope for the best',
          'Risk-tiered controls, human oversight, audit logging, and continuous evaluation',
          'No documentation',
          'Self-certifying models',
        ],
        correctIndex: 1,
        explanation:
          'High-stakes AI needs risk-tiered controls, human oversight, traceability (logs), and ongoing evaluation — aligning with FATE and regulation.',
      },
    ],
  },
];

export const quizByPath = Object.fromEntries(
  pathQuizzes.map((q) => [q.pathSlug, q]),
) as Record<string, PathQuiz>;

import type { GlossaryTerm } from '../lib/knowledge-types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    shortDefinition: 'Software that exhibits intelligent behaviour through learning and reasoning.',
    fullDefinition:
      'A field of computer science focused on creating systems that can perform tasks typically requiring human intelligence — including reasoning, learning from data, understanding language, recognising patterns, and making decisions. Modern AI is primarily data-driven rather than rule-based.',
    category: 'artificial-intelligence',
    relatedTerms: ['machine-learning', 'deep-learning', 'neural-network', 'agi'],
    firstUsedIn: 'what-is-artificial-intelligence',
    difficulty: 'beginner',
  },
  {
    term: 'Machine Learning',
    slug: 'machine-learning',
    shortDefinition: 'Systems that improve performance by learning patterns from data.',
    fullDefinition:
      'A subfield of AI where systems learn from examples rather than explicit rules. A machine learning model is trained on labelled data, adjusting internal parameters to minimise prediction errors. Once trained, it generalises learned patterns to new, unseen data.',
    category: 'machine-learning',
    relatedTerms: ['deep-learning', 'neural-network', 'training-data', 'overfitting'],
    firstUsedIn: 'what-is-artificial-intelligence',
    difficulty: 'beginner',
  },
  {
    term: 'Deep Learning',
    slug: 'deep-learning',
    shortDefinition: 'Machine learning using multi-layered neural networks.',
    fullDefinition:
      'A machine learning approach using neural networks with many layers (hence "deep"). Each layer learns increasingly abstract representations of the input. Deep learning is responsible for most modern AI breakthroughs in image recognition, natural language processing, and generative AI.',
    category: 'deep-learning',
    relatedTerms: ['neural-network', 'backpropagation', 'transformer', 'convolutional-neural-network'],
    firstUsedIn: 'machine-learning-vs-deep-learning',
    difficulty: 'intermediate',
  },
  {
    term: 'Neural Network',
    slug: 'neural-network',
    shortDefinition: 'A computation graph of connected nodes that learns by adjusting weights.',
    fullDefinition:
      'A mathematical model loosely inspired by biological neurons. Organised into layers of nodes, each receiving inputs, multiplying them by learned weights, summing the result, and applying a non-linear activation function. Networks with many layers can learn complex hierarchical representations of data.',
    category: 'neural-networks',
    relatedTerms: ['deep-learning', 'weight', 'activation-function', 'backpropagation', 'layer'],
    firstUsedIn: 'neural-networks-explained',
    difficulty: 'intermediate',
  },
  {
    term: 'Transformer',
    slug: 'transformer',
    shortDefinition: 'The neural architecture behind all modern large language models.',
    fullDefinition:
      'An architecture introduced in "Attention Is All You Need" (2017) that replaced recurrent networks for sequence tasks. The key innovation is self-attention: every token in a sequence can directly attend to every other token with learned weights. Transformers train efficiently on GPUs and scale to billions of parameters, enabling the development of GPT, Claude, Gemini, and all modern LLMs.',
    category: 'deep-learning',
    relatedTerms: ['self-attention', 'large-language-model', 'neural-network', 'embedding'],
    firstUsedIn: 'neural-networks-explained',
    difficulty: 'intermediate',
  },
  {
    term: 'Backpropagation',
    slug: 'backpropagation',
    shortDefinition: 'The algorithm that computes weight gradients by propagating errors backwards.',
    fullDefinition:
      'The training algorithm that makes deep learning feasible. Using the chain rule of calculus, backpropagation efficiently computes how much each weight in the network contributed to the prediction error, allowing gradient descent to update all weights simultaneously. Modern frameworks (PyTorch, JAX) compute this automatically via automatic differentiation.',
    category: 'neural-networks',
    relatedTerms: ['gradient-descent', 'neural-network', 'loss-function', 'learning-rate'],
    firstUsedIn: 'neural-networks-explained',
    difficulty: 'advanced',
  },
  {
    term: 'Large Language Model (LLM)',
    slug: 'large-language-model',
    shortDefinition: 'A transformer trained on internet-scale text to predict and generate language.',
    fullDefinition:
      'A neural network with billions to trillions of parameters, trained on vast corpora of text to predict the next token in a sequence. Through this training objective, LLMs develop broad language understanding, reasoning capabilities, and world knowledge. GPT-4, Claude, Gemini, and Llama are examples.',
    category: 'large-language-models',
    relatedTerms: ['transformer', 'prompt-engineering', 'fine-tuning', 'rlhf', 'context-window'],
    firstUsedIn: 'what-is-artificial-intelligence',
    difficulty: 'beginner',
  },
  {
    term: 'Prompt Engineering',
    slug: 'prompt-engineering',
    shortDefinition: 'Crafting instructions to reliably elicit high-quality AI outputs.',
    fullDefinition:
      'The practice of designing, testing, and iterating on input instructions to AI language models to consistently produce accurate, appropriately formatted, and useful responses. Combines communication design, few-shot learning, chain-of-thought techniques, and output format specification.',
    category: 'prompt-engineering',
    relatedTerms: ['system-prompt', 'few-shot', 'chain-of-thought', 'large-language-model', 'hallucination'],
    firstUsedIn: 'what-is-prompt-engineering',
    difficulty: 'beginner',
  },
  {
    term: 'Hallucination',
    slug: 'hallucination',
    shortDefinition: 'When an AI confidently states something that is factually incorrect.',
    fullDefinition:
      'A failure mode of language models where the model generates fluent, confident-sounding text that is factually incorrect or entirely fabricated. Caused by the model\'s training objective (predict the next token) not requiring factual accuracy, and by the model\'s inability to distinguish between things it knows and things it is pattern-matching. Mitigation strategies include retrieval-augmented generation (RAG), factual grounding prompts, and output verification.',
    category: 'large-language-models',
    relatedTerms: ['large-language-model', 'rag', 'grounding', 'factuality'],
    firstUsedIn: 'what-is-prompt-engineering',
    difficulty: 'beginner',
  },
  {
    term: 'AI Agent',
    slug: 'ai-agent',
    shortDefinition: 'An AI system that autonomously perceives, plans, and acts to achieve goals.',
    fullDefinition:
      'A software system that uses an AI model (typically an LLM) as its reasoning engine to pursue goals through multi-step action cycles. Agents can use tools (web search, code execution, API calls), maintain memory across interactions, and operate autonomously without continuous human oversight. Distinguished from chatbots by their ability to take real-world actions.',
    category: 'ai-agents',
    relatedTerms: ['tool-use', 'react-pattern', 'orchestrator', 'multi-agent', 'memory'],
    firstUsedIn: 'what-are-ai-agents',
    difficulty: 'intermediate',
  },
  {
    term: 'Retrieval-Augmented Generation (RAG)',
    slug: 'rag',
    shortDefinition: 'Grounding AI responses in retrieved documents rather than training data alone.',
    fullDefinition:
      'An architecture where an LLM\'s responses are augmented with information retrieved from an external document corpus at inference time. A query is encoded into a vector embedding, similar documents are retrieved from a vector database, and the retrieved content is injected into the prompt context. RAG enables AI systems to answer questions about current, proprietary, or domain-specific information without fine-tuning.',
    category: 'large-language-models',
    relatedTerms: ['large-language-model', 'embedding', 'vector-database', 'hallucination'],
    firstUsedIn: 'generative-ai-in-business-automation',
    difficulty: 'intermediate',
  },
  {
    term: 'Reinforcement Learning (RL)',
    slug: 'reinforcement-learning',
    shortDefinition: 'Learning through trial-and-error reward signals from environment interaction.',
    fullDefinition:
      'A machine learning paradigm where an agent learns to take actions in an environment to maximise cumulative reward. Unlike supervised learning, RL does not require labelled examples — only a reward signal that evaluates action outcomes. RL is responsible for superhuman game play (AlphaGo, AlphaStar), robotic control, and RLHF (the technique used to align language models with human preferences).',
    category: 'reinforcement-learning',
    relatedTerms: ['policy', 'reward-function', 'rlhf', 'q-learning', 'policy-gradient'],
    firstUsedIn: 'introduction-to-robotics',
    difficulty: 'intermediate',
  },
  {
    term: 'Generative AI',
    slug: 'generative-ai',
    shortDefinition: 'AI that creates new content: text, images, audio, video, and code.',
    fullDefinition:
      'AI systems that generate new data by learning the statistical distribution of training data and sampling from it. Includes language models (GPT, Claude), image generation models (DALL-E, Stable Diffusion, Midjourney), audio models (MusicGen, ElevenLabs), and video models (Sora). The dominant commercial AI category of the 2020s.',
    category: 'generative-ai',
    relatedTerms: ['large-language-model', 'diffusion-model', 'transformer', 'prompt-engineering'],
    firstUsedIn: 'what-is-artificial-intelligence',
    difficulty: 'beginner',
  },
  {
    term: 'Fine-tuning',
    slug: 'fine-tuning',
    shortDefinition: 'Adapting a pre-trained model to a specific domain by further training on domain data.',
    fullDefinition:
      'The process of taking a model pre-trained on large general data and continuing training on a smaller, domain-specific dataset to improve performance on target tasks. Fine-tuning updates all or some of the model\'s weights. Alternatives include prompt engineering, few-shot prompting, and RAG — which adapt model behaviour without changing weights.',
    category: 'machine-learning',
    relatedTerms: ['transfer-learning', 'pre-training', 'rlhf', 'lora', 'large-language-model'],
    difficulty: 'advanced',
  },
  {
    term: 'Chain-of-Thought (CoT)',
    slug: 'chain-of-thought',
    shortDefinition: 'Prompting technique that improves reasoning by making the model think step by step.',
    fullDefinition:
      'A prompting technique where the model is instructed or encouraged to produce a sequence of intermediate reasoning steps before delivering a final answer. Dramatically improves performance on multi-step arithmetic, logical reasoning, and planning tasks. The mechanism: each reasoning step conditions the next, allowing the model to maintain coherent chains of logic beyond what direct response allows.',
    category: 'prompt-engineering',
    relatedTerms: ['prompt-engineering', 'few-shot', 'react-pattern', 'reasoning'],
    firstUsedIn: 'what-is-prompt-engineering',
    difficulty: 'intermediate',
  },
  {
    term: 'Overfitting',
    slug: 'overfitting',
    shortDefinition: 'When a model memorises training data and fails to generalise to new examples.',
    fullDefinition:
      'A training failure mode where a model learns the specific noise and idiosyncrasies of training data rather than the underlying patterns, leading to excellent training performance but poor generalisation to unseen data. Common in small datasets with complex models. Addressed through regularisation, dropout, data augmentation, early stopping, and cross-validation.',
    category: 'machine-learning',
    relatedTerms: ['regularisation', 'generalisation', 'bias-variance', 'training-data', 'validation'],
    difficulty: 'intermediate',
  },
  {
    term: 'RLHF',
    slug: 'rlhf',
    shortDefinition: 'Reinforcement Learning from Human Feedback — how LLMs are aligned with human values.',
    fullDefinition:
      'A training technique that fine-tunes language models using human preference data. Human raters compare pairs of model outputs; a reward model is trained on these preferences; the language model is then optimised via reinforcement learning to maximise the reward model\'s scores. RLHF is responsible for transforming raw language models into helpful, harmless, and honest AI assistants.',
    category: 'large-language-models',
    relatedTerms: ['reinforcement-learning', 'fine-tuning', 'alignment', 'reward-model', 'large-language-model'],
    difficulty: 'advanced',
  },
  {
    term: 'Gradient Descent',
    slug: 'gradient-descent',
    shortDefinition: 'The optimisation algorithm that trains neural networks by iteratively reducing loss.',
    fullDefinition:
      'An iterative optimisation algorithm that minimises a loss function by moving model parameters in the direction opposite to the gradient (the direction of steepest increase in loss). The step size is controlled by the learning rate. Modern variants (Adam, AdamW, SGD with momentum) add adaptive learning rates and momentum to improve convergence speed and stability.',
    category: 'machine-learning',
    relatedTerms: ['backpropagation', 'loss-function', 'learning-rate', 'adam-optimiser'],
    difficulty: 'intermediate',
  },
  {
    term: 'Narrow AI',
    slug: 'narrow-ai',
    shortDefinition: 'AI systems that excel at one specific task but cannot generalise across domains.',
    fullDefinition:
      'The dominant form of AI today. Narrow AI systems are highly capable within their specific domain — GPT-4 at text generation, AlphaFold at protein structure prediction, Stable Diffusion at image synthesis — but cannot transfer this capability to other tasks. Contrasted with AGI (Artificial General Intelligence), which remains a research goal.',
    category: 'artificial-intelligence',
    relatedTerms: ['artificial-intelligence', 'agi', 'transfer-learning', 'generalisation'],
    firstUsedIn: 'what-is-artificial-intelligence',
    difficulty: 'beginner',
  },
  {
    term: 'AGI',
    slug: 'agi',
    shortDefinition: 'Artificial General Intelligence — AI that can reason flexibly across any domain.',
    fullDefinition:
      'A hypothetical AI system that can perform any intellectual task that a human can, with comparable flexibility and generality. AGI would not require domain-specific training — it would transfer knowledge across arbitrary domains as humans do. There is no consensus on a precise definition, when AGI might be achieved, or whether current LLMs represent early AGI. Remains an active area of debate and research.',
    category: 'artificial-intelligence',
    relatedTerms: ['narrow-ai', 'artificial-intelligence', 'alignment', 'superintelligence'],
    difficulty: 'intermediate',
  },
];

export const glossaryBySlug = Object.fromEntries(
  glossaryTerms.map(t => [t.slug, t])
) as Record<string, GlossaryTerm>;

export const glossaryByCategory = glossaryTerms.reduce<Record<string, GlossaryTerm[]>>(
  (acc, term) => {
    if (!acc[term.category]) acc[term.category] = [];
    acc[term.category].push(term);
    return acc;
  },
  {}
);

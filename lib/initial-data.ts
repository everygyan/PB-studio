import { Article, CommentItem } from '@/types/blog';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'essay-1',
    slug: 'architecture-of-quiet-software',
    title: 'The Architecture of Quiet Software',
    subtitle: 'On building tools that respect human attention rather than demanding it',
    excerpt: 'Modern digital tools often mistake notification volume for user engagement. When we step back to examine the spaces where genuine concentration happens, a different aesthetic emerges—one defined by negative space and calm fidelity.',
    content: `During the mid-century transition, light became recognized not merely as an illuminant, but as an active structural element defining volumetric boundaries. Today, when designing software, we face an analogous dilemma with attention.

The modern software canvas is crowded with micro-notifications, artificial badges, and urgent pulsing markers that mimic crisis without consequence. We have built interfaces that resemble trading floors rather than writing desks.

### 01. The Principle of Non-Intrusive Presence

A truly quiet tool operates on what architect Juhani Pallasmaa termed the "peripheral experience." When you sit in a library, you are aware of the vaulted ceiling, the texture of the oak table, and the muffled rhythm of distant footfalls. None of these elements clamor for foreground processing, yet they provide an indispensable sense of sanctuary.

> "A tool should never perform its own importance. It succeeds precisely at the threshold where the maker forgets the instrument and enters directly into dialogue with the medium."

Software can achieve this calm posture through three decisive gestures:

1. **Deterministic Latency**: Eliminating unexpected shifts, layout jitter, and unsolicited modal interruptions.
2. **Subdued Chromatic Palettes**: Using natural neutrals and reserving high-saturation pigment exclusively for intentional human actions.
3. **Restful Defaults**: Providing complete functional capability without demanding immediate customization or onboarding interrogation.

### 02. The Tactile Weight of Typography

When visual clutter is stripped away, type carries the entire acoustic landscape of an essay. A well-proportioned editorial serif anchors the cadence of thoughts, allowing the eye to rest between paragraphs. Reading is not a transaction; it is an interior dialogue between writer and reader.

In designing this journal, the aim was to create an atmosphere as quiet as turning an unbound page in morning light. Everything here exists to serve the sentence, the argument, and the thoughtful exchange that follows.`,
    category: 'Architecture & Spaces',
    author: {
      name: 'Julian Vance',
      role: 'Architect & Systems Essayist',
      avatarColor: 'bg-stone-700',
    },
    publishedAt: '2026-10-10T08:30:00Z',
    readTime: '6 min read',
    views: 1420,
    featured: true,
    coverPattern: 'sanctuary',
    tags: ['Design', 'Minimalism', 'Attention', 'Architecture'],
  },
  {
    id: 'essay-2',
    slug: 'against-disposable-abstractions',
    title: 'Against Disposable Abstractions',
    subtitle: 'Why enduring systems prize concrete simplicity over nested cleverness',
    excerpt: 'Every layer of indirection promised freedom from complexity, yet left us debugging the machinery rather than the problem. A plea for software crafted with timeless restraint.',
    content: `In carpentry, a seasoned woodworker does not conceal the grain under synthetic veneer; they cut with the grain, respecting its tensile limits and natural memory. In software engineering, however, our first instinct is frequently to build a framework around a library around a protocol.

We celebrate clever abstractions that collapse under the first non-trivial edge case.

### The Illusion of Free Convenience

Consider the evolution of web layout. For years, we layered utility wrappers, custom DSLs, and meta-compilers to avoid understanding how the browser calculates box models. When CSS Grid and Flexbox reached maturity, they rendered thousands of helper libraries obsolete in an afternoon.

> "Simplicity is not the absence of clutter, that's a consequence of simplicity. Simplicity is somehow essentially describing the purpose and place of an object and product."

When we build with primitive fidelity:
- Codebases remain readable by a newcomer without three weeks of scaffolding tutorials.
- Debugging shifts from guessing internal framework state to inspecting concrete data.
- Maintenance costs drop exponentially over a five-year lifecycle.

The most resilient tools I have operated over the past decade were those with the courage to remain lean.`,
    category: 'Digital Craft',
    author: {
      name: 'Julian Vance',
      role: 'Architect & Systems Essayist',
      avatarColor: 'bg-stone-700',
    },
    publishedAt: '2026-10-04T14:15:00Z',
    readTime: '5 min read',
    views: 980,
    featured: false,
    coverPattern: 'geometry',
    tags: ['Engineering', 'Software', 'Craft', 'Simplicity'],
  },
  {
    id: 'essay-3',
    slug: 'sound-and-the-empty-room',
    title: 'Sound and the Empty Room',
    subtitle: 'Notes on acoustic space, reverberation time, and mental clarity',
    excerpt: 'An investigation into how physical room resonance shapes the quality of thought, drawn from months of recording chamber music in unadorned stone chambers.',
    content: `Before an instrument produces its first tone, the room has already dictated half of the performance. The cubic volume, the coefficient of absorption on the plaster walls, and the ambient floor noise constitute an invisible collaborator.

In a dry, heavily padded studio, notes die instantly. The musician feels exposed, forced to overcompensate with physical effort. In a cavernous cathedral with six seconds of decay, discrete articulation washes away into an indistinct haze.

### Finding the Critical Distance

The sweet spot in acoustics is known as the critical distance: the point in space where the direct sound from the instrument exactly equals the reflected energy of the room. 

In intellectual work, we need an equivalent ratio:
- Direct stimulus: The problem directly in front of you.
- Ambient reflection: Room to ponder, breathe, and let associations form unprompted.

If we crowd every minute with podcasts, feeds, and calendar fragments, we destroy our mental reverberation time. Deep synthesis requires an empty room.`,
    category: 'Philosophy & Life',
    author: {
      name: 'Julian Vance',
      role: 'Architect & Systems Essayist',
      avatarColor: 'bg-stone-700',
    },
    publishedAt: '2026-09-28T11:00:00Z',
    readTime: '7 min read',
    views: 820,
    featured: false,
    coverPattern: 'sound',
    tags: ['Acoustics', 'Thinking', 'Spaces', 'Music'],
  },
  {
    id: 'essay-4',
    slug: 'ten-notebooks-in-ten-years',
    title: 'Ten Notebooks in Ten Years',
    subtitle: 'Reflections on handwritten records, slow capture, and tactile longevity',
    excerpt: 'Looking back through a decade of stitched linen journals reveals what digital search queries persistently obscure: the emotional texture of unresolved questions.',
    content: `A search query returns an answer without journey. When I open a digital note from five years ago, the uniform sans-serif type renders every observation with clinical equality.

By contrast, pulling down a bound cloth notebook from 2016 reveals hesitation in the ink flow, a sudden flurry of angled handwriting marking sudden excitement, and crossed-out paragraphs that tell more about the evolution of an idea than the final polished phrase.

### The Friction of the Nib

The physical resistance between fountain pen steel and cotton-rag paper enforces an involuntary editing speed. You cannot transcribe faster than you can form letters. This minute delay acts as an intellectual filter, weeding out casual hot takes before they stain the page.

If you wish to preserve ideas that will speak to you a generation from now, write them slowly on paper that will survive your hard drive.`,
    category: 'Culture & Essays',
    author: {
      name: 'Julian Vance',
      role: 'Architect & Systems Essayist',
      avatarColor: 'bg-stone-700',
    },
    publishedAt: '2026-09-15T09:40:00Z',
    readTime: '4 min read',
    views: 1150,
    featured: false,
    coverPattern: 'moss',
    tags: ['Writing', 'Notebooks', 'Memory', 'Analogue'],
  },
];

export const INITIAL_COMMENTS: Record<string, CommentItem[]> = {
  'essay-1': [
    {
      id: 'c1-1',
      articleId: 'essay-1',
      authorName: 'Elena Rostova',
      authorHandle: '@erostova',
      content: 'This resonance with Pallasmaa is deeply felt. So much of modern interface design prioritizes "look at me" rather than "look through me to the work". The note on deterministic latency is especially crucial—nothing shatters focus quite like layout shifts.',
      createdAt: '2026-10-11T10:14:00Z',
      likes: 18,
      replies: [
        {
          id: 'c1-1-r1',
          articleId: 'essay-1',
          parentId: 'c1-1',
          authorName: 'Julian Vance',
          authorHandle: '@julianvance',
          content: 'Thank you Elena. Exactly—when layout shifts occur, the physical trust in the surface is momentarily breached. In architecture, if a staircase wobbled half an inch underfoot, no one would marvel at the balustrade.',
          createdAt: '2026-10-11T11:02:00Z',
          likes: 9,
        },
        {
          id: 'c1-1-r2',
          articleId: 'essay-1',
          parentId: 'c1-1',
          authorName: 'Marcus Lindqvist',
          authorHandle: '@marcus_arch',
          content: 'Have you experimented with audio cues in software that mirror material textures? Subtle woodblock or felt clicks rather than synthetic high-frequency chimes?',
          createdAt: '2026-10-12T04:20:00Z',
          likes: 4,
        },
      ],
    },
    {
      id: 'c1-2',
      articleId: 'essay-1',
      authorName: 'Claire Chen',
      authorHandle: '@claire_chen',
      content: 'The reading experience on this page itself proves your argument. No cookie popups sliding into the viewport, no newsletter modals interrupting paragraph two. Clean, dignified typography. A breath of fresh air.',
      createdAt: '2026-10-12T16:45:00Z',
      likes: 12,
      replies: [],
    },
  ],
  'essay-2': [
    {
      id: 'c2-1',
      articleId: 'essay-2',
      authorName: 'Devon Patel',
      authorHandle: '@devonp',
      content: 'Every time I replace a 400-line framework wrapper with 20 lines of native Web APIs, my sleep quality improves by at least 15%. Beautiful essay.',
      createdAt: '2026-10-05T09:20:00Z',
      likes: 14,
      replies: [
        {
          id: 'c2-1-r1',
          articleId: 'essay-2',
          parentId: 'c2-1',
          authorName: 'Sarah Wu',
          authorHandle: '@swu_eng',
          content: 'The challenge is organizational: junior engineers are often evaluated on introducing new architectural paradigms rather than deleting obsolete ones.',
          createdAt: '2026-10-05T13:40:00Z',
          likes: 7,
        },
      ],
    },
  ],
  'essay-3': [
    {
      id: 'c3-1',
      articleId: 'essay-3',
      authorName: 'Thomas K.',
      authorHandle: '@thomask_audio',
      content: '"Mental reverberation time" is a phrase I will be quoting for years. The analogy between critical distance in audio physics and mental focus is strikingly accurate.',
      createdAt: '2026-09-29T18:05:00Z',
      likes: 8,
      replies: [],
    },
  ],
};

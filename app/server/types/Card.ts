import { CardType } from './CardType';

export interface Card {
  name: string;
  description: string;
  type: CardType;
  probability: number;
}

export const allCards: Card[] = [
  {
    name: '5 lignes de code',
    type: CardType.CODE_CLEAN,
    description: 'Des lignes de code pour votre PR.',
    probability: 0.1,
  },
  {
    name: '5 lignes codées avec le cul',
    type: CardType.CODE_DIRTY,
    description: 'Des lignes de code pour votre PR.',
    probability: 0.1,
  },
  {
    name: '10 lignes de code',
    type: CardType.CODE_CLEAN,
    description: 'Des lignes de code pour votre PR.',
    probability: 0.1,
  },
  {
    name: '10 lignes codées avec le cul',
    type: CardType.CODE_DIRTY,
    description: 'Des lignes de code pour votre PR.',
    probability: 0.1,
  },
  {
    name: '25 lignes de code',
    type: CardType.CODE_CLEAN,
    description: 'Des lignes de code pour votre PR.',
    probability: 0.1,
  },
  {
    name: '25 lignes codées avec le cul',
    type: CardType.CODE_DIRTY,
    description: 'Des lignes de code pour votre PR.',
    probability: 0.1,
  },
  {
    name: '50 lignes de code',
    type: CardType.CODE_CLEAN,
    description: 'Des lignes de code pour votre PR.',
    probability: 0.1,
  },
  {
    name: '50 lignes codées avec le cul',
    type: CardType.CODE_DIRTY,
    description: 'Des lignes de code pour votre PR.',
    probability: 0.1,
  },
  {
    name: 'fatal error',
    type: CardType.TRAP,
    description: 'Le code est en erreur et n’avance plus jusqu’à trouver réparation.',
    probability: 0.1,
  },
  {
    name: 'tests validés',
    type: CardType.CURE,
    description: 'Répare le “fatal error”.',
    probability: 0.1,
  },
  {
    name: 'commenter le code',
    type: CardType.TRAP,
    description: 'La PR a besoin de 20% de lignes de code en plus pour être terminée.',
    probability: 0.1,
  },
  {
    name: 'framework obsolète',
    type: CardType.TRAP,
    description: 'Le code est obsolète et n’avance plus jusqu’à trouver réparation.',
    probability: 0.1,
  },
  {
    name: 'montée de version',
    type: CardType.CURE,
    description: 'Répare un code obsolète.',
    probability: 0.1,
  },
  {
    name: "s'endort",
    type: CardType.TRAP,
    description: 'Passe son tour.',
    probability: 0.1,
  },
  {
    name: 'musique',
    type: CardType.CURE,
    description:
      'Peut être utilisée pour contrer directement un “s’endort” et jouer son tour. Sinon, elle permet, au tour suivant, de multiplier par 2 le score de sa prochaine carte code.',
    probability: 0.1,
  },
  {
    name: 'review technique',
    type: CardType.TRAP,
    description: 'Enlève toutes les lignes de code codées avec le cul.',
    probability: 0.1,
  },
  {
    name: 'petit refacto',
    type: CardType.CURE,
    description: '50% des lignes codées avec le cul sont remplacées en belles lignes de code.',
    probability: 0.1,
  },
  {
    name: 'grand refacto',
    type: CardType.CURE,
    description: '100% des lignes codées avec le cul sont remplacées en belles lignes de code.',
    probability: 0.1,
  },
  {
    name: 'code mal formaté',
    type: CardType.TRAP,
    description: "Code à l'arrêt jusqu’à trouver réparation.",
    probability: 0.1,
  },
  {
    name: 'npm run lint',
    type: CardType.CURE,
    description: 'Répare un code mal formaté.',
    probability: 0.1,
  },
  {
    name: 'code piraté',
    type: CardType.TRAP,
    description: 'Code n’avance plus jusqu’à trouver réparation.',
    probability: 0.1,
  },
  {
    name: 'fix cybersécurité',
    type: CardType.TRAP,
    description: 'Répare un code piraté.',
    probability: 0.1,
  },
  {
    name: 'code robuste',
    type: CardType.AS,
    description: 'Ne peut plus être la cible de “fatal error” ou de “commenter le code”.',
    probability: 0.1,
  },
  {
    name: 'Lead-Tech',
    type: CardType.AS,
    description: 'Ne peut plus piocher de cartes codée avec le cul',
    probability: 0.1,
  },
  {
    name: 'anti-virus',
    type: CardType.AS,
    description: 'Ne peut plus être la cible de cyber-attaques.',
    probability: 0.1,
  },
];

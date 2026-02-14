export interface Rat {
  id: string;
  name: string;
  description: string;
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  audioPath: string;
}

export const rats: Rat[] = [
  {
    id: 'chef',
    name: 'Remy the Chef',
    description: 'A culinary mastermind with a nose for fine ingredients.',
    x: 20,
    y: 60,
    audioPath: '/audio/rat-1.mp3',
  },
  {
    id: 'astronaut',
    name: 'Commander Whiskers',
    description: 'The first rat on Mars. He found no cheese there.',
    x: 50,
    y: 30,
    audioPath: '/audio/rat-2.mp3',
  },
  {
    id: 'pirate',
    name: 'Captain Longtail',
    description: 'Scourge of the seven sewers.',
    x: 80,
    y: 65,
    audioPath: '/audio/rat-3.mp3',
  },
  {
    id: 'scholar',
    name: 'Professor Squeak',
    description: 'Has read every book in the library foundation.',
    x: 35,
    y: 80,
    audioPath: '/audio/rat-4.mp3',
  },
  {
    id: 'ninja',
    name: 'Shadow Paw',
    description: 'You never saw him coming. Or going.',
    x: 65,
    y: 45,
    audioPath: '/audio/rat-5.mp3',
  },
];

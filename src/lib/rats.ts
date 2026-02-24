export interface Rat {
  id: string;
  name: string;
  description: string;
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  audioPath: string;
  imagePath: string;
  hoverScene: string; // Hover variant of the main scene
}

export const rats: Rat[] = [
  {
    id: 'poker-crew',
    name: 'The High-Stakes Squeak',
    description: 'Baron Barnaby von Brie never blinks — mostly because of the monocle. "Slippery" Silas has bet three gold buttons and a very promising-looking cracker. Twitchy Tom deals faster than a cat can hiss.',
    x: 20,
    y: 55,
    audioPath: '/audio/rat-1.mp3',
    imagePath: '/images/rat_poker.png',
    hoverScene: '/images/rat_main_menu_poker-crew.png',
  },
  {
    id: 'thaddeus',
    name: 'Arch-Librarian Thaddeus Whiskersworth',
    description: 'The Midnight Scholar. He has read every tome in the great library and annotated all of them twice.',
    x: 48,
    y: 28,
    audioPath: '/audio/rat-2.mp3',
    imagePath: '/images/rat_reader.png',
    hoverScene: '/images/rat_main_menu_thaddeus.png',
  },
  {
    id: 'frankie',
    name: 'Frankie "Tail-Spin" Sinatra',
    description: 'The Velvet Crooner. His voice could melt a wheel of brie at fifty paces.',
    x: 78,
    y: 60,
    audioPath: '/audio/rat-3.mp3',
    imagePath: '/images/rat_music.png',
    hoverScene: '/images/rat_main_menu_frankie.png',
  },
  {
    id: 'percival',
    name: 'Sir Percival of Pepperjack',
    description: 'The Dashing Duelist. Never lost a duel. Mostly because he writes the terms.',
    x: 15,
    y: 28,
    audioPath: '/audio/rat-4.mp3',
    imagePath: '/images/rats_rogue1.png',
    hoverScene: '/images/rat_main_menu_percival.png',
  },
  {
    id: 'cassius',
    name: 'Count Cassius de Camembert',
    description: 'The Silver-Tongued Strategist. He has never raised his voice. He has never needed to.',
    x: 85,
    y: 32,
    audioPath: '/audio/rat-5.mp3',
    imagePath: '/images/rat_rogue2.png',
    hoverScene: '/images/rat_main_menu_cassius.png',
  },
  {
    id: 'bubbles',
    name: 'Dr. Bartholomew "Bubbles" Beaker',
    description: 'The Alchemist. Currently on the verge of his fifteenth major breakthrough. The laboratory has been rebuilt three times.',
    x: 55,
    y: 78,
    audioPath: '/audio/rat-6.mp3',
    imagePath: '/images/rat_alchemist.png',
    hoverScene: '/images/rat_main_menu_bubbles.png',
  },
];

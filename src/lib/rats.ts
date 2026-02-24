export interface Rat {
  id: string;
  name: string;
  description: string;
  // Clickable region as percentages (0-100) of the scene container
  x1: number; // left edge
  y1: number; // top edge
  x2: number; // right edge
  y2: number; // bottom edge
  audioPath: string;
  imagePath: string;
  hoverScene: string;
}

export const rats: Rat[] = [
  {
    id: 'poker-crew',
    name: 'The High-Stakes Squeak',
    description: 'Baron Barnaby von Brie never blinks — mostly because of the monocle. "Slippery" Silas has bet three gold buttons and a very promising-looking cracker. Twitchy Tom deals faster than a cat can hiss.',
    x1: 31, y1: 51.5, x2: 82, y2: 100,
    audioPath: '/audio/rat-1.mp3',
    imagePath: '/images/rat_poker.png',
    hoverScene: '/images/rat_main_menu_poker-crew.png',
  },
  {
    id: 'thaddeus',
    name: 'Arch-Librarian Thaddeus Whiskersworth',
    description: 'The Midnight Scholar. He has read every tome in the great library and annotated all of them twice.',
    x1: 11.3, y1: 41, x2: 31, y2: 84.5,
    audioPath: '/audio/rat-2.mp3',
    imagePath: '/images/rat_reader.png',
    hoverScene: '/images/rat_main_menu_thaddeus.png',
  },
  {
    id: 'frankie',
    name: 'Frankie "Tail-Spin" Sinatra',
    description: 'The Velvet Crooner. His voice could melt a wheel of brie at fifty paces.',
    x1: 82, y1: 18, x2: 93, y2: 56,
    audioPath: '/audio/rat-3.mp3',
    imagePath: '/images/rat_music.png',
    hoverScene: '/images/rat_main_menu_frankie.png',
  },
  {
    id: 'barnaby',
    name: 'Sir Barnaby "the Curd" Stilton',
    description: 'The Silver-Tongued Strategist. He has never raised his voice. He has never needed to.',
    x1: 46, y1: 27.3, x2: 71, y2: 51.5,
    audioPath: '/audio/rat-5.mp3',
    imagePath: '/images/rats_rogue1.png',
    hoverScene: '/images/rat_main_menu_barnaby.png',
  },
  {
    id: 'percival',
    name: 'Sir Percival of Pepperjack',
    description: 'The Dashing Duelist. Never lost a duel. Mostly because he writes the terms.',
    x1: 32, y1: 26.1, x2: 46, y2: 51.5,
    audioPath: '/audio/rat-4.mp3',
    imagePath: '/images/rat_rogue2.png',
    hoverScene: '/images/rat_main_menu_percival.png',
  },
  {
    id: 'bubbles',
    name: 'Dr. Bartholomew "Bubbles" Beaker',
    description: 'The Alchemist. Currently on the verge of his fifteenth major breakthrough. The laboratory has been rebuilt three times.',
    x1: 26, y1: 27, x2: 32, y2: 41,
    audioPath: '/audio/rat-6.mp3',
    imagePath: '/images/rat_alchemist.png',
    hoverScene: '/images/rat_main_menu_bubbles.png',
  },
];

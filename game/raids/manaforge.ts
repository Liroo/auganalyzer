import Boss3129Jpg from 'images/raids/manaforgeomega/3129-icon.jpg';
import Boss3131Jpg from 'images/raids/manaforgeomega/3131-icon.jpg';
import Boss3130Jpg from 'images/raids/manaforgeomega/3130-icon.jpg';
import Boss3132Jpg from 'images/raids/manaforgeomega/3132-icon.jpg';
import Boss3122Jpg from 'images/raids/manaforgeomega/3122-icon.jpg';
import Boss3133Jpg from 'images/raids/manaforgeomega/3133-icon.jpg';
import Boss3134Jpg from 'images/raids/manaforgeomega/3134-icon.jpg';
import Boss3135Jpg from 'images/raids/manaforgeomega/3135-icon.jpg';
import Zone43Png from 'images/raids/manaforgeomega/zone-43.png';
import { Zone } from '.';

export default {
  name: 'Manaforge Omega',
  id: 43,
  icon: Zone43Png,
  partition: 0,
  encounters: [
    {
      name: 'Plexus Sentinel',
      id: 3129,
      icon: Boss3129Jpg,
    },
    {
      name: 'Loom\'ithar',
      id: 3131,
      icon: Boss3131Jpg,
    },
    {
      name: 'Soulbinder Naazindhri',
      id: 3130,
      icon: Boss3130Jpg,
    },
    {
      name: 'Forgeweaver Araz',
      id: 3132,
      icon: Boss3132Jpg,
    },
    {
      name: 'The Soul Hunters',
      id: 3122,
      icon: Boss3122Jpg,
    },
    {
      name: 'Fractilus',
      id: 3133,
      icon: Boss3133Jpg,
    },
    {
      name: 'Nexus-King Salhadaar',
      id: 3134,
      icon: Boss3134Jpg,
    },
    {
      name: 'Dimensius, the All-Devouring',
      id: 3135,
      icon: Boss3135Jpg,
    },
  ],
} satisfies Zone;

export interface Poem {
  id: number;
  title: string;
  content: string;
  color: string;
  image: string;
  audio?: string; // Optional audio URL
}

export const poems: Poem[] = [
  {
    id: 1,
    title: "Kitty Dreams",
    content: "In a garden filled with light, A kitten dreams of stars so bright. With ribbon bows and hearts aglow, The sweetest dreams begin to grow.",
    color: "pink",
    image: "https://images.pexels.com/photos/7237139/pexels-photo-7237139.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3" // Example audio URL
  },
  {
    id: 2,
    title: "Gentle Whispers",
    content: "Whispers soft and whispers sweet, Tiny paws on tiny feet. Through the meadow, through the sky, Hearts connect as time goes by.",
    color: "blue",
    image: "https://images.pexels.com/photos/7237865/pexels-photo-7237865.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3" // Example audio URL
  },
  {
    id: 3,
    title: "Ribbon Dance",
    content: "Ribbons dance in gentle breeze, Flowers bloom with graceful ease. Smiles shine like morning dew, Creating worlds so fresh and new.",
    color: "purple",
    image: "https://images.pexels.com/photos/7237820/pexels-photo-7237820.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3" // Example audio URL
  },
  {
    id: 4,
    title: "Starlight Journey",
    content: "Under skies of twinkling light, Friends together day and night. Sharing dreams and sharing joy, Precious moments to enjoy.",
    color: "yellow",
    image: "https://images.pexels.com/photos/7237772/pexels-photo-7237772.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3" // Example audio URL
  },
  {
    id: 5,
    title: "Apple Picnic",
    content: "Apples sweet and skies so blue, Happy times for me and you. Picnic blankets, treats to share, Gentle breezes through the air.",
    color: "red",
    image: "https://images.pexels.com/photos/7237777/pexels-photo-7237777.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3" // Example audio URL
  },
  {
    id: 6,
    title: "Tea Party",
    content: "Teacups filled with warmth and cheer, Bringing friends from far and near. Cookies sweet and stories told, Treasures more precious than gold.",
    color: "mint",
    image: "https://images.pexels.com/photos/7237145/pexels-photo-7237145.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3" // Example audio URL
  }
];
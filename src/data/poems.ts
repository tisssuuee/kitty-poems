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
    title: "Sakura Smiles",
    content: `To Japan we’ll fly with hearts so light,  
Cherry blossoms bloom in pink and white.  
Your eyes like stars, your smile a beam,  
Wearing pink, you’re my sweetest dream.  
  
That kurti sways in morning breeze,  
And time with you feels soft as peace.  
Your stupid-cute face, it makes me grin,  
In your laughter, love begins.`,
    color: "cherryblossom",
    image: "https://images.pexels.com/photos/3707997/pexels-photo-3707997.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/sakura-smiles.mp3"
  },
  {
    id: 2,
    title: "Rainy Rasa",
    content: `We danced in rain like kids, no care,  
With laughter soaking through our hair.  
Each drop a beat, each step a song,  
With you, the world just sings along.  
  
Your eyes lit up, my heart went light,  
We twirled through puddles, what a sight!  
So *pyara*, pure, and full of grace,  
The rain fell soft on your sweet face.`,
    color: "mistyblue",
    image: "https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/rainy-rasa.mp3"
  },
  {
    id: 3,
    title: "Seashore Secrets",
    content: `We sat on sands as daylight died,  
The waves just whispered by our side.  
No words were forced, we let them flow,  
Like all the things we've come to know.  
  
Through memories both sweet and tough,  
You held my hand — that was enough.  
We wished on stars, we dreamed out loud,  
Two souls who made each other proud.`,
    color: "sunsetgold",
    image: "https://images.pexels.com/photos/2611022/pexels-photo-2611022.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/seashore-secrets.mp3"
  }
];

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
    image: "https://images.pexels.com/photos/31767431/pexels-photo-31767431/free-photo-of-woman-in-white-dress-by-the-ocean-shore.jpeg",
    audio: "/audio/seashore-secrets.mp3"
  },
  {
    id: 4,
    title: "Moonlit Whispers",
    content: `Beneath the moon, we carved our tale,  
In silver light, so soft, so pale.  
Your voice a melody, low and sweet,  
Each word a spark where hearts would meet.  
  
The night was ours, the stars our guide,  
With you, my fears all fade aside.  
In your embrace, I find my place,  
A love that time cannot erase.`,
    color: "moonsilver",
    image: "https://images.pexels.com/photos/355120/pexels-photo-355120.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/moonlit-whispers.mp3"
  },
  {
    id: 5,
    title: "Autumn’s Embrace",
    content: `Leaves fall slow in autumn’s glow,  
We walk where crimson breezes blow.  
Your scarf, it flutters, wild and free,  
Your warmth’s the world that calls to me.  
  
Each crunch of leaves, a moment shared,  
Your silly grin shows how you cared.  
Through chilly air, our hearts stay warm,  
In your love, I’m safe from storm.`,
    color: "crimsonfall",
    image: "https://images.pexels.com/photos/589840/pexels-photo-589840.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/autumns-embrace.mp3"
  },
  {
    id: 6,
    title: "Stardust Dreams",
    content: `We lay on grass, the sky ablaze,  
With stars that danced in cosmic maze.  
Your whispers painted dreams so grand,  
Our future held within your hand.  
  
Each twinkle told a tale of us,  
Of love and hope and wanderlust.  
Your heart’s my home, my guiding light,  
With you, the stars burn twice as bright.`,
    color: "cosmicblue",
    image: "https://images.pexels.com/photos/957040/pexels-photo-957040.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/stardust-dreams.mp3"
  },
  {
    id: 7,
    title: "Lotus Lullaby",
    content: `By the lake where lotuses bloom,  
We drifted soft in morning’s gloom.  
Your laughter rippled ‘cross the tide,  
My heart sailed free with you beside.  
  
Each petal held a wish we made,  
In your sweet gaze, my fears would fade.  
With every breath, our love would grow,  
Like lotus blooms in dawn’s soft glow.`,
    color: "lotuspink",
    image: "https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/lotus-lullaby.mp3"
  },
  {
    id: 8,
    title: "Mountain Mirth",
    content: `We climbed the hills where clouds would play,  
Your silly dance led cares away.  
The wind would sing, the peaks would call,  
With you, I’d never fear to fall.  
  
Your eyes like valleys, deep and true,  
Each step a vow to stay with you.  
On mountain paths, our hearts align,  
Your love’s the summit I’d always climb.`,
    color: "emeraldpeak",
    image: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/mountain-mirth.mp3"
  },
  {
    id: 9,
    title: "Sunflower Serenade",
    content: `In fields of gold, we chased the sun,  
With sunflowers tall, our hearts would run.  
Your smile outshone the midday light,  
My world feels whole when you’re in sight.  
  
We wove through blooms, your hand in mine,  
Each moment felt like love divine.  
Your joy’s the warmth that makes me stay,  
My sunflower girl, my bright bouquet.`,
    color: "sunflowergold",
    image: "https://images.pexels.com/photos/54267/sunflower-blossom-bloom-flowers-54267.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/sunflower-serenade.mp3"
  },
  {
    id: 10,
    title: "Twilight Tryst",
    content: `At twilight’s edge, where colors blend,  
We swore our love would never end.  
The sky turned violet, soft and deep,  
Your promises my heart would keep.  
  
Each glance from you, a spark, a flame,  
Each whispered word would stake its claim.  
In dusk’s embrace, we found our truth,  
Our love the fire that burns through youth.`,
    color: "violetdusk",
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/twilight-tryst.mp3"
  },
  {
    id: 11,
    title: "Meadow Muse",
    content: `Through meadows green, we spun and swayed,  
Where wildflowers our secrets laid.  
Your giggle echoed, free and wild,  
You’re joy itself, my inner child.  
  
The breeze would lift your hair with glee,  
Each moment carved eternity.  
In fields of green, my heart’s your own,  
With you, I’ve found my truest home.`,
    color: "meadowgreen",
    image: "https://images.pexels.com/photos/459879/pexels-photo-459879.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/meadow-muse.mp3"
  },
  {
    id: 12,
    title: "Snowflake Waltz",
    content: `In winter’s hush, we twirled through snow,  
Each flake a star in evening’s glow.  
Your mittened hand held mine so tight,  
We danced beneath the frosted light.  
  
Your cheeks were flushed, your eyes so bright,  
You made the cold feel warm and right.  
In snow’s soft fall, our love would sing,  
A waltz to last through every spring.`,
    color: "frostwhite",
    image: "https://images.pexels.com/photos/773953/pexels-photo-773953.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/snowflake-waltz.mp3"
  },
  {
    id: 13,
    title: "Desert Dawn",
    content: `At desert’s dawn, where sands awake,  
We watched the sky begin to break.  
Your voice was soft, a tender hum,  
My heart would follow where you’d come.  
  
The dunes held secrets, vast and wide,  
But none as true as you beside.  
In golden light, our souls would soar,  
With you, I’d wander evermore.`,
    color: "sandgold",
    image: "https://images.pexels.com/photos/533923/pexels-photo-533923.jpeg?auto=compress&cs=tinysrgb&w=600",
    audio: "/audio/desert-dawn.mp3"
  }
];

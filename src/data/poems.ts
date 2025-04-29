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
    image: "/image/5.jpeg",
    audio: "/audio/1.mp3"
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
    image: "/image/14.avif",
    audio: "/audio/rainy-rasa.mp3"
  },
  {
    id: 3,
    title: "The day i met You",
    content: ` 2 jan thi, ghar se bolke nikla tha mumma ko ki nit hmr mein doston se milne jara hun, konse dost, hain, bangye the,
papa chowrne aaye the bus stop pe, mujhe chadwa ke gye the talwara wali bus mein subeh 7:30 baje, dhundh thi, mein 8 baje tak pauch gya tha fir task tha direct hamirpur wali bus dhundhne ka par nahi mili,
ek khulri thi una ki, mein beth gya, amb utar gya, fir udhar jwalaji ki bus thori der mein nikalne wali thi usme Beth gya, 10 baje nikli vo,
ye wala road ka patch boht kharab tha mein saare time ankh band karke upar ko mooh karke betha tha - papa ne vomit na hone wali dawai khilwa di thi,  
aur mein fir nadaun pauch gya, fir task tha opposite end mein jaake hamirpur ki bus pakadne ka, it was all impromptu, kuch sochke nahi aya tha, socha tha par bas uske liye jo leke aya tha vo ~ ki usne bola tha green hoodie meri bola toh vaguely tha par laya tha saath par ring, 
ring ke liye toh bola tha mere liye sachi wah I'm gonna cry and the big eyed baby emoji, pretend karti hai strong woman hai farak nai padhta par saaali itni pyaari paglu bacchi hai andar se, 
fir madam ji ko live location bheji, unka phone aya ki amroh chownk utar jana, mene conductor ko 3 baar bola vo bhenga sala mujhe main city hi Lee aya fir mene kaha chalo koina mooh haath dhoke milunga fir madam ji aayin gaadi peeee`,
    color: "moonsilver",
    image: "/image/2.jpeg",
    audio: "/audio/seashore-secrets.mp3"
  },
  {
    id: 4,
    title: "The day i met You - 2",
    content: `Madam ji aayin apni gaadi mein, mene bola bag rakhlun peeche aur patak diya, kehti aaram seee, fir mein ekdum aaram se pyaar se betha pucha aise theek hai kehti haaan, hans rahi thi aur mere chehre pe itna bada pimple tha sala bandage lagake ghumra tha rakh leta isse ache use tab karta jab madam ji apne pyaar se call pe baat kar rahin thi 😭 canteen se tiffin le Lena chabbi aapko di thi na ahhhh, mujhe momos khilane le gyi, apna escapism wala route dikhaya, mene pucha aap sab ladkon ko pehli baar yahi laate ho, kehtii haaaan aur hassi, mein piche susu karne gya sala khayii thi khaayi sidhi, momos 3 khaaye mushkil se mam ne aur coffee peee, photos lene se mana kardiya, fir mene vo coffee se thore sip liye, tasty thi, tu, ahahaha, fir shayd mene pay Kiya aur jo bachhe hue momos the vo doggy ke liye lee aaye hum, usne bhi reject kardiye, fir aap mujhe vapis chowrne gye, mene kaha thori der aur toh aapne bataya ki ghar walon ne 6 baje strict vapis aane ko kaha hai, toh i was okey. Fir aap bus stand se Thora aage lee gye taaki logo mein halla na ho 😭, fir i fetched my bag and took out the ring, fir mene kaha pehnane toh de but ig tab tak aap daal chuke the, fir mene bola nervous hoke idkkk 😭😭 ki haath ni sundar aapke ugly hain, fir jab saaaaaale pakde mene aisa laga kisi bacche ko gudda milgya kabhi naaa chodta mein, itne soft itne komal itne mulayummm kaash waqt wahi ruk jata , you laughed, i could see something in your eyes pta ni shayd ye sochre the ki ye kitna chutiya hai idkkk, fir hoodie bhi di, fir Huggie maangi, apne di par saali half hearted seat wali Huggie thi fir humari banter hoti thi ki agli baar milenge toh ache se denge.`,
    color: "moonsilver",
    image: "/image/1.jpeg",
    audio: "/audio/moonlit-whispers.mp3"
  },
  {
    id: 5,
    title: "We walked in Jaipur ",
    content: `We walked that night through jaipur, I was impatient because you said you were gonna take a bath in the tub,
some guy fought w you and left, and I came there in an auto, looked all around and sat on a pipe right next to the hotel, 
there you came by the lift, in that purple kurti and jeans ig you had flats on well I was really flattered. 

I had no plans, it was all impromptu, like it always did w you, everything so raw so let's do this, 
mujhe chaap khaani hai, I think everything had finished coz we were late and we met your friends and exchanged words, 
we wanted to go on that roof top, we took the lift, I was in a lift w you going to a dinner, wish I was there forever. 
`,
    color: "cosmicblue",
    image: "/image/3.jpg",
    audio: "/audio/stardust-dreams.mp3"
  },
  {
    id: 6,
    title: "Flatbread",
    content: `Flatbread? Seriously? Sabse sasta sabse suna suna yahi lagra hai order kar lete hain. 

Mumma called you and i tried capturing that on my phone, han sab thik hai, mein bhi theek hun, tu theek nai boht zada sundar lag rahi thi uss warm light mein jab tu giggle kar rahi thi aur random pose de rahi thi, 

tere haath me scrunchie tha, tere Baal bawaal lag rahe the aur tu mujhe roast kar rahi thi.`,
    color: "lotuspink",
    image: "/image/8.jpeg",
    audio: "/audio/lotus-lullaby.mp3"
  },
  {
    id: 7,
    title: "Coffee pasand hai mujhe - Cold Coffee",
    content: `Coffee peeyegi? Flat bread se toh kuch hua ni hoga? Haan chal. 
Cappuccino order karti hai aur mein shayd cold coffee mujhe yaad nahi ache se. Fir hum road side bench pe bethte hain. 

Ek bench pe dono, hah dream. Mein shayd apka sar apne shoulder pe rakhta hun par aap hata lete ho 2 sec baad, mein thehra chutiya, 
I ask for your foot, boht dard hora hoga na pure din chalke lemme massage, I think I touched your feet and even did some finger massage, you were just not comfortable and I was just so dumb. 
Im very sorry.`,
    color: "emeraldpeak",
    image: "/image/13.jpeg",
    audio: "/audio/mountain-mirth.mp3"
  },
  {
    id: 8,
    title: "Mujhe vapis jana hai jaldi",
    content: `Cab ni aari auto se chal lein? Haan thik hai mujhe bas jaldi jana hai vapis hotel. Books an auto. 

Tu sidha bethi hai par mein teda betha hun, teko dekhe jara hun, kabhi dekha ni na teko itni der tak, auto boht tez chalare the bhaiya apke Baal apko pareshaan kar rahe the, 

you took out your scrunchie and tied them and I said khulle baalon me zada pyaari lagti hai tu. Tied hairs and you flip those hairs back and tuck them behind your ears both sides at the same time, 

a pyara kala sling bag and that kurti on a mooney night. AHHHHHHHH `,
    color: "sunflowergold",
    image: "/image/12.jpeg",
    audio: "/audio/sunflower-serenade.mp3"
  },
  {
    id: 9,
    title: "That last hug ~ Feb 21st 2023",
    content: `I kissed your hand, it was your right hand, right after i unsuccessfully tried lifting you, 
    
    hah i would have done it easily but I was asked not to and i obliged, we hugged, I think I even kissed your forehead, you prolly don't remember it as much as I do or do you? 
    
    I went back and realised ki I was being so pushy I was so inconsiderate I was always this consent wala ladka and I did what, i called you up and apologized. 
    
    IDK how i never understood that in the moment, I was sucha brat. It takes a lot of time before you get physcially comfortable and idk why I couldnt pick that!`,
    color: "violetdusk",
    image: "/image/11.jpeg",
    audio: "/audio/twilight-tryst.mp3"
  },
  {
    id: 10,
    title: "I told Mumma about you",
    content: `Mene mumma ko bataya tha sabkuch jab aap jaipur aane wale the uss time, apki pyaari si photos bhi dikhayi thi, mumma toh is a stan,
mumma ko pucha tha ki aiseee uski trian jaipur se chalegi aur fir vo rukti hai next station pe 2 min jo college ke ekdum paas hai toh udhar sweets dene jaaunga 😭 mumma said haan usse acha lagega but bhenchod hum dono hi chutiye3ee hain ho hini paya ye because of that damn gussa gussi choda chaadi wtp ke saamne. 
I was stoopid, tu bhi thi stoopid, sala itne pyaare mere khat, teri potrait jo saala pehel toh mene usse vintage look dene ke liye frame karvaya tha jaake ek jaipur ki market mein ekdum sasti lagri thi sab logo ne hostel mein aas paas unapprove kardi thi 😭,fir mene uss frame ko ditch kiya aur Naya mangwaya amazon se fir finalllly uske peeche itnaaa sab likhaa tere mere phrases mujhe toh yaad bhini kya kya diya tha saale vo roses mujhe kitne dhundhne pade the fir sala kaali shirt aur goggles lagake jaipur ki tang galiyon mein walk karke ara tha apke paas sabbb logg dekhreee the 😭 auto mein bhi aaju baaju ke log dekhre the obvvv jaise date ya propose karne jara hoooo badaaa,  
vo pyaare roses aur vo dark chocolate blinkit ke bag mein ahahaha, vo letter aur ek alag se bhi tha shayd ek page pe kuch aur haaaan vo saale chats ke screenshot hahaahaha sala college mein print nikaalne gya toh bhaiya hasre the kehte wahh, AHHHH kitna sweet tha mein.`,
    color: "crimsonfall",
    image: "/image/9.jpeg",
    audio: "/audio/autumns-embrace.mp3"
  },
  {
    id: 11,
    title: "I remember",
    content: `I still remember how big the smile was on my face the night I returned home after hanging out with you for the first time.

Aapne mujhe bus stand chowr diya tha first i boarded the bus to Nadaun, sarr ghumne laga tha then I took another pill and sar upar karke betha tha, 
i was just thinking about kya kya hogya aaj i was just i was just hehe haha in my head. fir mein utra nadaun and fir mujje 30 mins tak bus hini mili thi,

fir kaaaafi puchne ke baad mujhe pata laga ki hoshiarpur ki bus aayegi fir i on stood there in bas hope (and your thoughts obv loll), fir bus ayyii,
meds kicked in and i slept, bohttt zaadi thand thi bhyiii i was shivering, fir meri nini khuli just hoshiarpur pauchte hi, dhundh hi dhund thi,

fir meko mukerian ki bus milgyiii and i sat sabse aage taaki motion sicknees kamm ho par saalaa vo bus wala andhon ke tarah chala raha tha bus full kohree meinn`,
    color: "frostwhite",
    image: "/image/16.jpeg",
    audio: "/audio/snowflake-waltz.mp3"
  },
  {
    id: 12,
    title: "The letter i wrote for my pookie",
    content: `titled - A love letter?
mujhe nahi samajh aara tha kya likhun, par fir mene likhna chalu kara aur haan ig i told you about this ki i wrote w pencil first loll, fir stroked pen over it and erased the graphite
tbh i dont even remember what i wrote in that haan ye yaad hai ki i mentioned many songs idkk kaise se the par i can surely say ki slow karke vo bajte jab tujhe dekhta hun

tu khaas hai yaar, boht zaada khaas hai, unique piece hai ekdum, atpati hai, jaldi dukhi hojati hai aur abhi tak vo bramashtra dhundh nahi paya hun jiss se aapko khush kardun,
hasti hai boht zada mujhe tera hasna boht pasand hai, mein bhi kabhi kabhi tereko boht zada hansaaa deta hun, hasti hui kya kaatil lagti hai tu, kaash puri zindagi hasa paaun :)`,
    color: "sandgold",
    image: "/image/17.jpeg",
    audio: "/audio/desert-dawn.mp3"
  },
  {
    id: 13,
    title: "The Distance",
    content: `tere khayaal aatein hain, ache ache khayal, tu boht pyaari hai par rude bhi kabhi kabhi, meri calls nahi uthati hai kabhi kabhi, mood swings tere mashallah, 
  choti si bacchi hai tu pyaari si ladaku si cutie si, boht ziddi bhi par meri hai meri pyaari kittu Riya. Mujhe nahi pata kabhi kabhi apko kya hojata hai aapko time chhaiye hota hai, lone time,

  aur mein thehra clingy, par mein puri koshish karta hun ki apko waqt dun aur meri Pyaariya vapis aa jaye par humesha koshish karta hun ki aap full nonverbal naa jaayein kyonki fir it feels to me,
  ki i cant be next to you in battles that you are chosing for yourself haan apki ladaiyan hain vo par mein hun apka chota sa pyaala sa junior commander mujhe bhi maukaa do dushman ke chakke chudaaaane kaa

  I'd just say i'm always here but never required, my girl is just too overpowered with gods own strength hahhaha, she be godess herself ;)`,
    color: "sandgold",
    image: "/image/15.jpeg",
    audio: "/audio/desert-dawn.mp3"
  },
  {
    id: 14,
    title: "our MOU",
    content: `tere khayaal aatein hain, ache ache khayal, tu boht pyaari hai par rude bhi kabhi kabhi, meri calls nahi uthati hai kabhi kabhi, mood swings tere mashallah, 
  choti si bacchi hai tu pyaari si ladaku si cutie si, boht ziddi bhi par meri hai meri pyaari kittu Riya. Mujhe nahi pata kabhi kabhi apko kya hojata hai aapko time chhaiye hota hai, lone time,


Hers --   @riyavdutta (The ruder one)
Koenigsegg cc850,  Bugatti Chiron,  3BHK in Bombay,   Flaars for life,   World Trips,   Princess Treatment(unwanted unasked but receiving plethora of loll)

Him --   @tushar._xo (The Demander/Begger)
Porsche 918 Spyder - (baby blue),   Her about to be ex-iPad & Iphone 12 purpleyyy,  Sony Headphones,   Ghar pe bulana, Muma papa se milwana.,   A freer more independent girl Boss You.,   Trying to understand you and always being there for you unconditionally.
Trips - (Europe- by train/car, Canada/US, South Korea, Kerala, Kinnaur, Amritsar, Delhi, Australia) Some extras by “over karne wala” Me - College milne aana, Train mein ikathe ghar vaapis ana)
`,
    color: "sandgold",
    image: "/image/18.png",
    audio: "/audio/desert-dawn.mp3"
  },
  {
    id: 15,
    title: "The Email - 31st Oct 2023",
    content: `I only ever wanted to be by your side, maybe best case hold hands, but just listen to you every day, and see how you slowly opened up to me. I wish we had visited that Gurudwara and that I had seen you in silhouette of the holy shrine. I wish I had just held you longer and picked you up on that last hug outside the hotel at 11 in the night. And if I didn't love you sincerely, I would have never told my mumma about you. 
I constantly wish for your wellness, you never left my mind, you never left my prayers. Aur fir chal diye tum kahan hum kahan, but this guy never really was able to detach himself from the person he met on his 20th birthday.

I'm really sorry for everything, just everything. It's just that I literally liked you so much. I'm sorry. 

I was in Udaipur for 3 days between October 20th and October 23rd. I just want to see Udaipur again, holding your hand, I really do. Attaching a few attachments from Udaipur.

I seek you through my thoughts. I click images, thinking, yeh usko bhejta, usko yeh pasand aatin. These bangles, those earrings, yeh jhanjhar voh kurti.

I've turned into an image of the guy I once was. Idk if you can relate to a person blasting Kabira in full volume on headphones and walking alone in silence at 3 a.m. on a moonlit passage.

I miss you. And these words aren't enough; I was never able to express myself like you did.
This emptiness, this numbness, and this void. This feeling of something being absent. This Aditya in his financial best wondering how her Geet is doing in Manali. 
No contacts.
I feel aadha aadha, kisko bataun, muma se kya kahun.
I miss your voice 
I miss your rants
I miss you roasting me dead
Mene itna hurt kardiya kya?
Meko maaf kardo 
I regret never coming back to Hamipur to see you again
I regret never meeting your muma papa
I regret I became someone to you, you never again wanna be in touch with
What is this constant delulu
In which I seek your presence, a place I used to feel the safest.
I miss my RIRU.`,
    color: "sandgold",
    image: "/image/19.jpg",
    audio: "/audio/desert-dawn.mp3"
  },
  {
    id: 16,
    title: "(no subject)",
    content: `
Riya Dutta <riyavdutta@gmail.com>
31 Oct 2023, 12:42
to me

Number de, I deleted it gusse mein.  A mere paragraph cannot summarise what I've been meaning to say to you so I guess I'll settle it with a call. I missed you so much and I'm so happy that you found your way towards me, once again. I'm sorry for hurting you, but I really missed you a lot.

Tushar gautam <tgautam380@gmail.com>
31 Oct 2023, 12:44
to Riya

6239684270
7681954188`,
    color: "sandgold",
    image: "/image/20.png",
    audio: "/audio/desert-dawn.mp3"
  }
];

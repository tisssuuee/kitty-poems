import React, { useState } from 'react';
import { poems } from '../data/poems';
import PoemCard from './poem-card';
import PoemNavigation from './poem-navigation';
import useSound from 'use-sound';

const clickSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3';

const PoemPlayer: React.FC = () => {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [playClick] = useSound(clickSoundUrl, { volume: 0.3 });
  const currentPoem = poems[currentPoemIndex];

  const handleChangePoemIndex = (newIndex: number) => {
    playClick();
    setCurrentPoemIndex(newIndex);
  }

  return (
    <div className="max-w-[50rem] min-h-[35rem] relative mx-auto">
      {currentPoem ? (
        <PoemCard
          poem={currentPoem}
          isActive={true}
        />
      ) : (
        <p>No poem available</p>
      )}

      <div className='absolute w-full bottom-0 '>
        <PoemNavigation
          poems={poems}
          currentPoemIndex={currentPoemIndex}
          onChangePoemIndex={handleChangePoemIndex}
        />
      </div>
    </div>
  );
};

export default PoemPlayer;

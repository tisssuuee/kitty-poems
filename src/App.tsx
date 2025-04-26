import { ThemeSwitcher } from './components/theme-switcher';
import { AnimatedBackground } from './components/ui/animated-gradient-background';

function App() {
  return (
    <AnimatedBackground>
      <div className=' flex justify-center items-center gap-x-4 dark:text-white h-full '>
        <div className='font-funnel text-5xl'>
          <span className='mr-4'>
            Hello cuttiee potutiie
          </span>
          <ThemeSwitcher />
        </div>
      </div>
    </AnimatedBackground>
  );
}

export default App;

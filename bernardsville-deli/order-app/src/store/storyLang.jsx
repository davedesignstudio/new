import { createContext, useContext, createSignal } from 'solid-js';
import { loadStoryLang, saveStoryLang } from '../data/storyBlend';

const StoryLangContext = createContext();

export function StoryLangProvider(props) {
  const [lang, setLangState] = createSignal(loadStoryLang());

  const setLang = (next) => {
    setLangState(next);
    saveStoryLang(next);
  };

  const toggleLang = () => setLang(lang() === 'it' ? 'blend' : 'it');

  return (
    <StoryLangContext.Provider value={{ lang, setLang, toggleLang }}>
      {props.children}
    </StoryLangContext.Provider>
  );
}

export function useStoryLang() {
  const ctx = useContext(StoryLangContext);
  if (!ctx) throw new Error('useStoryLang must be used within StoryLangProvider');
  return ctx;
}

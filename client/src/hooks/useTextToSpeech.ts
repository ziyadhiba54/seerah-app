import { useState, useEffect, useCallback, useRef } from 'react';

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    setSupported(true);

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) voicesRef.current = v;
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const getBestVoice = (lang: string): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current.length > 0
      ? voicesRef.current
      : window.speechSynthesis.getVoices();

    const exactMatch = voices.find(v => v.lang === lang);
    if (exactMatch) return exactMatch;

    const prefix = lang.split('-')[0];
    const prefixMatch = voices.find(v => v.lang.startsWith(prefix));
    return prefixMatch || null;
  };

  const speak = useCallback((text: string, lang: string = 'ar-SA') => {
    if (!supported) return;

    window.speechSynthesis.cancel();

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      const voice = getBestVoice(lang);
      if (voice) utterance.voice = voice;

      utterance.rate = lang.startsWith('ar') ? 0.9 : 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    };

    if (voicesRef.current.length > 0) {
      doSpeak();
    } else {
      const loadAndSpeak = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
        window.speechSynthesis.removeEventListener('voiceschanged', loadAndSpeak);
        doSpeak();
      };
      window.speechSynthesis.addEventListener('voiceschanged', loadAndSpeak);
      const immediateVoices = window.speechSynthesis.getVoices();
      if (immediateVoices.length > 0) {
        voicesRef.current = immediateVoices;
        window.speechSynthesis.removeEventListener('voiceschanged', loadAndSpeak);
        doSpeak();
      }
    }
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [supported]);

  return { speak, stop, isSpeaking, supported };
}

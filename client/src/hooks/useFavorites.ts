import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('seerah_favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (storyId: number) => {
    setFavorites(prev => {
      const next = prev.includes(storyId) 
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId];
      localStorage.setItem('seerah_favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (storyId: number) => favorites.includes(storyId);

  return { favorites, toggleFavorite, isFavorite };
}

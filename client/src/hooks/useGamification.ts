import { useState, useEffect } from 'react';

const LEVELS = [
  { name: 'novice', minPoints: 0 },
  { name: 'learner', minPoints: 100 },
  { name: 'scholar', minPoints: 500 },
  { name: 'expert', minPoints: 1000 },
];

export function useGamification() {
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const savedPoints = localStorage.getItem('seerah_points');
    if (savedPoints) {
      setPoints(parseInt(savedPoints, 10));
    }
    const savedBadges = localStorage.getItem('seerah_badges');
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }
  }, []);

  const addBadge = (badgeId: string) => {
    if (!badges.includes(badgeId)) {
      const newBadges = [...badges, badgeId];
      setBadges(newBadges);
      localStorage.setItem('seerah_badges', JSON.stringify(newBadges));
    }
  };

  const addPoints = (amount: number) => {
    setPoints(prevPoints => {
      const newPoints = prevPoints + amount;
      localStorage.setItem('seerah_points', newPoints.toString());
      
      // Auto-badge check based on level
      if (newPoints >= 100 && newPoints < 500) addBadge('badge_learner');
      if (newPoints >= 500 && newPoints < 1000) addBadge('badge_scholar');
      if (newPoints >= 1000) addBadge('badge_expert');
      
      return newPoints;
    });
  };

  const getLevel = () => {
    return LEVELS.slice().reverse().find(l => points >= l.minPoints) || LEVELS[0];
  };

  return { points, addPoints, level: getLevel(), badges, addBadge };
}

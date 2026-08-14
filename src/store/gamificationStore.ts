import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GamificationState {
  scratchCards: number;
  spinsAvailable: number;
  couponsClaimed: string[];
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  useScratchCard: () => void;
  useSpin: () => void;
  claimCoupon: (code: string) => void;
  earnScratchCard: () => void;
  earnSpin: () => void;
  addPoints: (amount: number) => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set) => ({
      scratchCards: 3, // Start user with 3 free scratch cards
      spinsAvailable: 1, // Start with 1 free spin
      couponsClaimed: [],
      points: 4250,
      tier: 'Bronze',
      
      useScratchCard: () => set((state) => ({ 
        scratchCards: Math.max(0, state.scratchCards - 1) 
      })),
      
      useSpin: () => set((state) => ({ 
        spinsAvailable: Math.max(0, state.spinsAvailable - 1) 
      })),
      
      claimCoupon: (code) => set((state) => ({ 
        couponsClaimed: [...state.couponsClaimed, code] 
      })),
      
      earnScratchCard: () => set((state) => ({ 
        scratchCards: state.scratchCards + 1 
      })),
      
      earnSpin: () => set((state) => ({ 
        spinsAvailable: state.spinsAvailable + 1 
      })),

      addPoints: (amount) => set((state) => {
        const newPoints = state.points + amount;
        let newTier = state.tier;
        if (newPoints >= 25000) newTier = 'Diamond';
        else if (newPoints >= 10000) newTier = 'Platinum';
        else if (newPoints >= 5000) newTier = 'Gold';
        else if (newPoints >= 1000) newTier = 'Silver';
        else newTier = 'Bronze';
        
        return {
          points: newPoints,
          tier: newTier
        };
      }),
    }),
    {
      name: 'gamification-storage',
    }
  )
);

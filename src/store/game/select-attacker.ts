import { create } from 'zustand'

interface IUseSelectAttacker {
	cardAttackerId: string | null
	setCardAttackerId: (cardId: string | null) => void
}

export const useSelectAttacker = create<IUseSelectAttacker>(set => ({
	cardAttackerId: null,
	setCardAttackerId: cardId => set({ cardAttackerId: cardId }),
}))

import { create } from 'zustand'

interface IDamageStore {
	damages: {
		[key: string]: { id: string; amount: number }[]
	}
	addDamage: (cardId: string, damage: number) => void
}

export const useDamageStore = create<IDamageStore>(set => ({
	damages: {},
	addDamage: (cardId, damage) => {
		const damageId = `${cardId}-${Date.now()}`

		set(state => ({
			damages: {
				...state.damages,
				[cardId]: [
					...(state.damages[cardId] || []),
					{ id: damageId, amount: damage },
				],
			},
		}))

		setTimeout(() => {
			set(state => ({
				damages: {
					...state.damages,
					[cardId]: state.damages[cardId].filter(d => d.id !== damageId),
				},
			}))
		}, 2000)
	},
}))

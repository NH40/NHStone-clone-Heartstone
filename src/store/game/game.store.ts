import type { IGameStore } from '@/types/game.types'
import { create } from 'zustand'
import {
	attackCardAction,
	attackHeroAction,
	endTurnAction,
	playCardAction,
	returnCardAction,
	startGameAction,
} from './actions'
import { randomOpponentPlay } from './actions/opponent-core-game/random-opponent-play'
import { initialGameData } from './initial-data'

const useGameStore = create<IGameStore>(set => ({
	...initialGameData,
	isGameStarted: false,
	startGame: () => set(startGameAction()),
	endTurn: () => {
		set(endTurnAction)

		setTimeout(() => {
			set(state => {
				const updatedState = randomOpponentPlay(state)

				setTimeout(() => {
					set(() => endTurnAction(updatedState))
				}, 2500)

				return updatedState
			})
		}, 3000)
	},
	playCard: (cardId: string) => {
		set(state => playCardAction(state, cardId))
	},
	returnCard: (cardId: string) => {
		set(state => returnCardAction(state, cardId))
	},
	attackCard: (attackerId: string, targetId: string) => {
		set(state => attackCardAction(state, attackerId, targetId))
	},
	attackHero: (attackerId: string) => {
		set(state => attackHeroAction(state, attackerId))
	},
}))

export { useGameStore }


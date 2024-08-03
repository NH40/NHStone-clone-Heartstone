import { MAX_HAND_CARDS } from '@/constants/game/core.constants'
import shuffle from 'lodash/shuffle'

import type { IGameCard, IGameStore } from '@/types/game.types'
import { initialGameData } from '../../initial-data'
import { createDeck } from './create-deck'

const getFirstCards = (deck: IGameCard[]): IGameCard[] =>
	deck.map((card, index) => ({
		...card,
		isOnHand: index < MAX_HAND_CARDS,
		isTaken: index < MAX_HAND_CARDS,
	}))

export const startGameAction = (): Partial<IGameStore> => {
	const playerInitialDeck = shuffle(createDeck('player'))
	const opponentInitialDeck = shuffle(createDeck('opponent'))

	return {
		...initialGameData,
		player: {
			...initialGameData.player,
			deck: getFirstCards(playerInitialDeck),
		},
		opponent: {
			...initialGameData.opponent,
			deck: getFirstCards(opponentInitialDeck),
		},
	}
}

import { CARDS } from '@/constants/game/cards.constants'
import type { IGameCard, TPlayer } from '@/types/game.types'


export function createDeck(typePlayer: TPlayer): IGameCard[] {
	return CARDS.map((card, index) => ({
		...card,
		id: index + 1 + '_' + typePlayer,
		isTaken: false,
		isOnHand: false,
		isOnBoard: false,
		isCanAttack: false,
		isPlayedThisTurn: false,
	}))
}


import { EnumTypeCard } from '@/types/card.types'
import { useDamageStore } from '../damage.store'

import { useNotificationStore } from '@/store/notification/notification.store'
import type { IGameStore } from '@/types/game.types'
import { getCardById } from './attack-card'

export const attackHeroAction = (
	state: IGameStore,
	attackerId: string
): Partial<IGameStore> => {
	const isAttackerPlayer = state.currentTurn === 'player'
	const opponent = isAttackerPlayer ? state.opponent : state.player

	const attacker = getCardById(
		attackerId,
		isAttackerPlayer ? state.player.deck : state.opponent.deck
	)

	const opponentTaunt = opponent.deck.find(
		card => card.type === EnumTypeCard.taunt && card.isOnBoard
	)

	if (attacker && attacker.isCanAttack && !opponentTaunt) {
		opponent.health -= attacker.attack
		attacker.isCanAttack = false

		useDamageStore
			.getState()
			.addDamage(isAttackerPlayer ? 'opponent' : 'player', attacker.attack)

		if (opponent.health <= 0) {
			state.isGameOver = true
			state.isGameStarted = false

			useNotificationStore
				.getState()
				.show(
					isAttackerPlayer ? 'Вы победили!' : 'Вы проиграли :(',
					isAttackerPlayer ? 'win' : 'lose'
				)
		}
	}

	return {
		player: state.player,
		opponent: state.opponent,
		isGameOver: state.isGameOver,
		isGameStarted: state.isGameStarted,
	}
}

import type { IGameCard, IGameStore } from '@/types/game.types'
import { useDamageStore } from '../damage.store'


export const getCardById = (cardId: string, deck: IGameCard[]) =>
	deck.find(card => card.id === cardId)

export const attackCardAction = (
	state: IGameStore,
	attackerId: string,
	targetId: string
) => {
	const isAttackerPlayer = state.currentTurn === 'player'

	const attacker = getCardById(
		attackerId,
		isAttackerPlayer ? state.player.deck : state.opponent.deck
	)

	const target = getCardById(
		targetId,
		isAttackerPlayer ? state.opponent.deck : state.player.deck
	)

	if (attacker && target && attacker.isCanAttack) {
		target.health -= attacker.attack
		attacker.health -= target.attack

		attacker.isCanAttack = false

		useDamageStore.getState().addDamage(targetId, attacker.attack)
		useDamageStore.getState().addDamage(attackerId, target.attack)

		if (target.health <= 0) {
			if (isAttackerPlayer) {
				state.opponent.deck = state.opponent.deck.filter(
					card => card.id !== targetId
				)
			} else {
				state.player.deck = state.player.deck.filter(
					card => card.id !== targetId
				)
			}
		}

		if (attacker.health <= 0) {
			if (isAttackerPlayer) {
				state.player.deck = state.player.deck.filter(
					card => card.id !== attackerId
				)
			} else {
				state.opponent.deck = state.opponent.deck.filter(
					card => card.id !== attackerId
				)
			}
		}
	}

	return { player: state.player, opponent: state.opponent }
}

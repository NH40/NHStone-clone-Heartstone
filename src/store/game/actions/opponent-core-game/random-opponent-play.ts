import { MAX_MANA } from '@/constants/game/core.constants'
import { EnumTypeCard } from '@/types/card.types'
import type { IGameStore } from '@/types/game.types'
import random from 'lodash/random'
import { attackCardAction } from '../attack-card'
import { attackHeroAction } from '../attack-hero'
import { playRandomCard } from './play-random-card'

export const randomOpponentPlay = (state: IGameStore) => {
	const opponent = state.opponent

	opponent.deck
		.filter(card => card.isOnBoard)
		.forEach(card => {
			const taunt = state.player.deck.find(
				card => card.type === EnumTypeCard.taunt && card.isOnBoard
			)

			if (taunt) {
				state = { ...state, ...attackCardAction(state, card.id, taunt.id) }
				return
			}

			if (!state.player.deck.filter(card => card.isOnBoard).length) {
				state = { ...state, ...attackHeroAction(state, card.id) }
				return
			}

			if (random(10) > 5 && state.player.deck) {
				const targetId = state.player.deck[random(state.player.deck.length)].id
				state = { ...state, ...attackCardAction(state, card.id, targetId) }
			} else {
				state = { ...state, ...attackHeroAction(state, card.id) }
			}
		})

	let mana = opponent.mana
	let iterations = 0

	while (mana > 0 && iterations <= MAX_MANA) {
		const newState = playRandomCard(state, mana)
		mana = newState.opponent.mana
		state = { ...state, ...newState }
		iterations++
	}

	return {
		...state,
		opponent: {
			...state.opponent,
			mana: 0,
		},
	}
}

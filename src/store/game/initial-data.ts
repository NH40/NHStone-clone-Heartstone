import { MAX_HP } from '@/constants/game/core.constants'
import type { IGameFnStore, IGameStore, IHero } from '@/types/game.types'


export const initialPlayerData: IHero = {
	health: MAX_HP,
	mana: 1,
	deck: [],
}

export const initialGameData: Omit<IGameStore, keyof IGameFnStore> = {
	player: initialPlayerData,
	opponent: initialPlayerData,
	currentTurn: 'player',
	isGameOver: false,
	isGameStarted: true,
	turn: 1,
}

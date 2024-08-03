import { useGameStore } from '@/store/game/game.store'

import { useSelectAttacker } from '@/store/game/select-attacker'
import type { IGameCard } from '@/types/game.types'
import cn from 'clsx'
import { motion } from 'framer-motion'
import { DamageList } from '../DamageList'
import { useEnemyTarget } from './useAnimeTarget'


interface Props {
	card: IGameCard
	isPlayerSide: boolean
}

export function BoardCard({ card, isPlayerSide }: Props) {
	const { handleSelectTarget } = useEnemyTarget()
	const { returnCard, currentTurn } = useGameStore()
	const { setCardAttackerId, cardAttackerId } = useSelectAttacker()

	const handleClick = (cardId: string) => {
		if (isPlayerSide) {
			if (card.isCanAttack) {
				setCardAttackerId(cardId)
			} else if (card.isPlayedThisTurn) {
				returnCard(cardId)
			}
		} else {
			handleSelectTarget(cardId)
		}
	}

	const isPlayerSelectAttacker = isPlayerSide && cardAttackerId === card.id

	return (
		<motion.button
			className={cn(
				'h-[11.3rem] w-32 rounded-lg border-2 border-transparent border-solid transition-colors relative',
				{
					'cursor-pointer !border-green-400 shadow-2xl':
						card.isCanAttack &&
						!isPlayerSelectAttacker &&
						isPlayerSide &&
						currentTurn === 'player',
					'!border-primary shadow-2xl': isPlayerSelectAttacker,
					'!border-red-400': !isPlayerSide && cardAttackerId,
					'cursor-not-allowed': currentTurn !== 'player',
				}
			)}
			initial={{ scale: 0.5, rotate: -15, y: -200, opacity: 0 }}
			animate={{
				scale: 1,
				rotate: 0,
				y: 0,
				opacity: 1,
			}}
			transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 1 }}
			onClick={() => (currentTurn !== 'player' ? null : handleClick(card.id))}
		>
			<img alt={card.name} src={card.imageUrl} draggable='false' />
			<DamageList id={card.id} isRight />
		</motion.button>
	)
}

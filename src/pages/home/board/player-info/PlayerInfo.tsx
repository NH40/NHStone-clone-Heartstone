import { Badge } from '@/components/ui/Badge'
import { MAX_HP } from '@/constants/game/core.constants'
import { useGameStore } from '@/store/game/game.store'
import { useSelectAttacker } from '@/store/game/select-attacker'
import { EnumTypeCard } from '@/types/card.types'
import type { IHero, TPlayer } from '@/types/game.types'
import cn from 'clsx'
import { useEnemyTarget } from '../board-card/useAnimeTarget'
import { DamageList } from '../DamageList'

interface Props {
	player: Omit<IHero, 'deck'>
	typePlayer: TPlayer
}

export function PlayerInfo({ player, typePlayer }: Props) {
	const { cardAttackerId } = useSelectAttacker()
	const { handleSelectTarget } = useEnemyTarget()
	const { currentTurn, opponent } = useGameStore()

	const opponentTaunt = opponent.deck.find(
		card => card.type === EnumTypeCard.taunt && card.isOnBoard
	)

	const isPlayer = typePlayer === 'player'

	return (
		<button
			className={cn(
				'absolute z-[1] border-2 border-transparent transition-colors rounded-xl cursor-default max-md:w-32',
				{
					'left-9 -bottom-1 max-lg:left-2': isPlayer,
					'right-6 top-2 max-lg:right-2 max-lg:top-0': !isPlayer,
					'!border-red-400 !cursor-pointer':
						!isPlayer && cardAttackerId && !opponentTaunt,
				}
			)}
			disabled={isPlayer || currentTurn === 'opponent'}
			onClick={() => (isPlayer ? null : handleSelectTarget(undefined, true))}
		>
			<img
				width={200}
				src={
					isPlayer ? '/assets/heroes/player.png' : '/assets/heroes/opponent.png'
				}
				alt={typePlayer}
				draggable={false}
			/>

			<div
				className={cn(
					'absolute w-full flex items-center justify-center',
					isPlayer ? 'bottom-2.5' : '-bottom-1'
				)}
			>
				<Badge value={player.health} maxValue={MAX_HP} color='red' />
			</div>

			<DamageList id={typePlayer} isRight={isPlayer} />
		</button>
	)
}

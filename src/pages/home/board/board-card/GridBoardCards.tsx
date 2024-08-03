import type { IGameCard } from '@/types/game.types'
import { BoardCard } from './BoardCard'

interface Props {
	deck: IGameCard[]
	isPlayerSide: boolean
}

export function GridBoardCards({ deck, isPlayerSide }: Props) {
	return (
		<div className='px-20 flex items-center justify-center gap-2'>
			{deck
				.filter(card => card.isOnBoard)
				.map(card => (
					<BoardCard key={card.id} card={card} isPlayerSide={isPlayerSide} />
				))}
		</div>
	)
}

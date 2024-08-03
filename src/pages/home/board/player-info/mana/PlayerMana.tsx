import { Badge } from '@/components/ui/Badge'
import type { TPlayer } from '@/types/game.types'

import cn from 'clsx'

interface Props {
	currentMana: number
	maxMana: number
	typePlayer: TPlayer
}

export function PlayerMana({ currentMana, maxMana, typePlayer }: Props) {
	const isPlayer = typePlayer === 'player'

	return (
		<div
			className={cn('flex items-center absolute', {
				'right-9 bottom-7': isPlayer,
				'left-8 top-7': !isPlayer,
			})}
		>
			<Badge value={currentMana} maxValue={maxMana} color='blue' />
			<div className='flex items-center ml-2'>
				{new Array(maxMana).fill(0).map((_, index) => (
					<div
						key={index}
						className={cn(
							'w-6 h-6 bg-gradient-to-t from-sky-900 rounded-full mx-1 shadow-inner',
							index < currentMana ? 'to-sky-400' : 'to-sky-950'
						)}
					/>
				))}
			</div>
		</div>
	)
}

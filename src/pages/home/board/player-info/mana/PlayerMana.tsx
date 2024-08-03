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
			className={cn('flex items-center absolute max-md:flex-col max-md:gap-2', {
				'right-9 bottom-7 max-lg:right-4  max-lg:bottom-3 max-md:!right-2 max-md:!items-end ':
					isPlayer,
				'left-8 top-7  max-lg:left-3 max-lg:top-3 max-md:!left-2 max-md:!items-start ':
					!isPlayer,
			})}
		>
			<div
				className={cn({
					'max-md:order-2': !isPlayer,
				})}
			>
				<Badge value={currentMana} maxValue={maxMana} color='blue' />
			</div>
			<div
				className={cn('flex items-center ml-2 max-md:ml-0', {
					'max-md:order-1': !isPlayer,
				})}
			>
				{new Array(maxMana).fill(0).map((_, index) => (
					<div
						key={index}
						className={cn(
							'w-6 h-6 max-lg:w-4 max-lg:h-4 bg-gradient-to-t from-sky-900 rounded-full mx-1 shadow-inner',
							index < currentMana ? 'to-sky-400' : 'to-sky-950'
						)}
					/>
				))}
			</div>
		</div>
	)
}

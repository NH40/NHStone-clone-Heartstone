import { useGameStore } from '@/store/game/game.store'
import type { ICard } from '@/types/card.types'
import cn from 'clsx'
import { motion } from 'framer-motion'
import { useState, type CSSProperties } from 'react'
import { useGetStyleRotation } from './use-get-style-rotation'

interface Props {
	card: ICard
	onClick?: () => void
	isDisabled?: boolean
	isHided?: boolean
	style?: CSSProperties
	index: number
	arrayLength: number
}

export function HandCard({
	card,
	onClick,
	isDisabled,
	isHided,
	style,
	arrayLength,
	index,
}: Props) {
	const { currentTurn, player } = useGameStore()
	const [isHovered, setIsHovered] = useState(false)

	const { rotate, translateY } = useGetStyleRotation(
		index,
		arrayLength,
		!isHided
	)

	const initialAnimation = {
		scale: 1,
		zIndex: 0,
		y: translateY,
		rotate,
	}

	const isDisabledButton = isDisabled || (currentTurn !== 'player' && !isHided)

	return (
		<motion.button
			className={cn(
				'h-[8.5rem] w-24 max-md:h-[7rem] max-md:w-20 inline-block rounded-lg will-change-transform relative border-2 border-transparent transition-colors',
				{
					'shadow -ml-7': !isHided,
					'-ml-[2.15rem]': isHided,
					'cursor-pointer': !isHided && !isDisabledButton,
					'!border-green-400':
						!isHided && currentTurn === 'player' && player.mana >= card.mana,
				}
			)}
			style={style}
			disabled={isDisabledButton}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			initial={{ scale: 1, zIndex: 0, y: 0 }}
			animate={
				isHovered && !isHided
					? { scale: 1.3, zIndex: 10, y: -95 }
					: initialAnimation
			}
			transition={{ type: 'keyframes', stiffness: 230, damping: 32 }}
		>
			{isDisabledButton && (
				<div className='absolute top-0 left-0 w-full h-full bg-black/45 z-[1] rounded-lg' />
			)}
			<img
				src={isHided ? '/assets/cards/cover.png' : card.imageUrl}
				alt={card.name}
				draggable='false'
				className='will-change-transform'
			/>
		</motion.button>
	)
}

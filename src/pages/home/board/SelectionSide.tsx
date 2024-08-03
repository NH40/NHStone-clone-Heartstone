import cn from 'clsx'
import type { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
	isPlayer: boolean
}

export function SectionSide({ isPlayer, children }: Props) {
	return (
		<section
			className={cn('absolute w-full h-[49.5vh] left-0', {
				'pt-[6rem] pb-7 max-lg:pb-2 top-0 flex flex-col justify-end': !isPlayer,
				'pb-[6rem] pt-7 max-lg:pt-2 bottom-0': isPlayer,
			})}
		>
			{children}
		</section>
	)
}

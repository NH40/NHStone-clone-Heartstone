import cn from 'clsx'

interface Props {
	value: number
	maxValue: number
	color: 'blue' | 'red'
}

export function Badge({ maxValue, value, color }: Props) {
	return (
		<div
			className={cn(
				'bg-gradient-to-t px-3.5 max-lg:px-2 rounded-2xl max-lg:rounded-lg shadow-lg w-max [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] max-lg:text-sm max-md:!text-xs',
				{
					'from-sky-700 to-sky-400': color === 'blue',
					'from-red-700 to-red-400': color === 'red',
				}
			)}
		>
			{value}/{maxValue}
		</div>
	)
}

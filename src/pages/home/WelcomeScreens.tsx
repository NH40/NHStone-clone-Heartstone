import { Button } from '@/components/ui/button/Button'
import { Heading } from '@/components/ui/heading/Heading'
import { Loader } from '@/components/ui/loader/Loader'
import { useGameStore } from '@/store/game/game.store'
import { useTransition } from 'react'

export function WelcomeScreen() {
	const [isPending, startTransition] = useTransition()
	const { startGame } = useGameStore()

	const onClick = () => {
		startTransition(() => {
			startGame()
		})
	}

	return (
		<div className='flex items-center justify-center flex-col gap-4 h-screen'>
			<Heading>NH STONE</Heading>

			<Button variant='primary' onClick={onClick}>
				{isPending ? <Loader /> : 'Начать игру'}
			</Button>
		</div>
	)
}

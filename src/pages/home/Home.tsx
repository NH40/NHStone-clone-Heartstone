import { Notification } from '@/components/ui/notification/Notification'
import { useGameStore } from '@/store/game/game.store'
import { GameBoard } from './board/GameBoard'
import { WelcomeScreen } from './WelcomeScreens'

function Home() {
	const { isGameStarted } = useGameStore()

	return (
		<main>
			<Notification />
			{isGameStarted ? <GameBoard /> : <WelcomeScreen />}
		</main>
	)
}

export default Home

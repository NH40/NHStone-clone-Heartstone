import { MAX_MANA } from '@/constants/game/core.constants'
import { useGameStore } from '@/store/game/game.store'
import { EndTurnButton } from './EndTurnButton'
import { SectionSide } from './SelectionSide'
import { AudioPlayer } from './audio-player/AudioPlayer'
import { GridBoardCards } from './board-card/GridBoardCards'
import { HandCard } from './hand-card/HandCard'
import { PlayerInfo } from './player-info/PlayerInfo'
import { PlayerMana } from './player-info/mana/PlayerMana'

export function GameBoard() {
	const { player, opponent, playCard } = useGameStore()

	return (
		<div className='relative h-screen w-full'>
			<SectionSide isPlayer={false}>
				<div>
					<PlayerInfo player={opponent} typePlayer='opponent' />
					<PlayerMana
						currentMana={opponent.mana}
						maxMana={MAX_MANA}
						typePlayer='opponent'
					/>

					<div className='-top-6 absolute w-full'>
						<div className='flex items-center justify-center'>
							{opponent.deck
								.filter(card => card.isOnHand)
								.map((card, index, array) => (
									<HandCard
										card={card}
										arrayLength={array.length}
										index={index}
										key={card.id}
										isHided
									/>
								))}
						</div>
					</div>
				</div>

				<GridBoardCards deck={opponent.deck} isPlayerSide={false} />
			</SectionSide>

			<div
				className='absolute left-0 w-full'
				style={{
					top: 'calc(50.1vh - 1px)',
				}}
			>
				<hr className='border-brown-400 opacity-60 w-11/12' />
				<EndTurnButton />
			</div>

			<SectionSide isPlayer>
				<GridBoardCards deck={player.deck} isPlayerSide />

				<PlayerInfo player={player} typePlayer='player' />

				<PlayerMana
					currentMana={player.mana}
					maxMana={MAX_MANA}
					typePlayer='player'
				/>

				<AudioPlayer />

				<div className='-bottom-6 absolute w-full'>
					<div className='flex items-center justify-center'>
						{player.deck
							.filter(card => card.isOnHand)
							.map((card, index, array) => (
								<HandCard
									card={card}
									arrayLength={array.length}
									index={index}
									key={card.id}
									onClick={() => playCard(card.id)}
									isDisabled={player.mana < card.mana}
								/>
							))}
					</div>
				</div>
			</SectionSide>
		</div>
	)
}

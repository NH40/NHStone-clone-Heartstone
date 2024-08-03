import { Button } from '@/components/ui/button/Button'
import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'

export function AudioPlayer() {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	const handlePlayPause = () => {
		if (!audioRef.current) return null

		if (isPlaying) {
			audioRef.current.pause()
		} else {
			audioRef.current.play()
		}
		setIsPlaying(!isPlaying)
	}

	return (
		<Button
			className='absolute right-9 bottom-[4.5rem] z-10 max-lg:right-4 max-lg:bottom-12 max-md:!right-2 max-md:!bottom-16'
			variant='gray'
			isCircle
			onClick={handlePlayPause}
		>
			<audio ref={audioRef} loop>
				<source src='/assets/music/adventure.mp3' type='audio/mp3' />
				Your browser does not support the audio element.
			</audio>
			{isPlaying ? <Pause /> : <Play />}
		</Button>
	)
}

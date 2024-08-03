import { useEffect, useState } from 'react'

interface WindowDimensions {
	width: number | undefined
	height: number | undefined
	isMobile: boolean
	isTablet: boolean
	isDesktop: boolean
}

// Хук для получения размеров окна браузера
export function useWindowDimensions(): WindowDimensions {
	// Функция для получения размеров окна
	const getWindowDimensions = (): WindowDimensions => {
		const width = window.innerWidth
		const height = window.innerHeight

		const isMobile = width ? width <= 480 : false
		const isTablet = width ? width > 480 && width <= 768 : false
		const isDesktop = width ? width > 768 : false

		return {
			width,
			height,
			isMobile,
			isTablet,
			isDesktop,
		}
	}

	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
		getWindowDimensions()
	)

	useEffect(() => {
		// Обработчик изменения размеров окна
		function handleResize() {
			setWindowDimensions(getWindowDimensions())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowDimensions
}

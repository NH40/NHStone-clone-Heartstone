import { useWindowDimensions } from '@/hooks/useWindowDimensions'

export const useGetStyleRotation = (
	index: number,
	total: number,
	isPlayer?: boolean
) => {
	const { isTablet, isMobile } = useWindowDimensions()

	const middle = (total - 1) / 2
	const rotate = (index - middle) * (isTablet ? 5 : 10)

	const distanceFromMiddle = Math.abs(index - middle)
	const translateY =
		Math.pow(distanceFromMiddle, isTablet ? 1.55 : isMobile ? 1.8 : 2) *
		(isTablet ? 5 : 7)

	return {
		rotate: isPlayer ? rotate : -rotate,
		translateY: isPlayer ? translateY : -translateY,
	}
}

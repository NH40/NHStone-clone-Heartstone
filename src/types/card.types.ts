export enum EnumTypeCard {
	'taunt',
}

export interface ICard {
	name: string
	mana: number
	health: number
	attack: number
	type?: EnumTypeCard
	imageUrl: string
}

export type TClub = {
  name: string
  foundedOn: string
  code: string
  active: boolean
  type: ClubTypeEnum
}

export enum ClubTypeEnum {
  Rotarac = 'rotarac',
  Rotary = 'rotary',
}

export enum ClubXHeaderNames {
  ClubName = 'club y codigo',
  Active = 'activo',
  DateFounded = 'fecha fundacion',
}

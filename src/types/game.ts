export interface GameIcons {
  large: string
  medium: string
  small: string
}

export interface Game {
  id: string
  name: string
  url: string
  description: string
  categories: string[]
  iframeUrl: string
  icons: {
    small: string
    medium: string
    large: string
  }
  popularity: number
  createdAt: string
}

export type GameCategory = {
  id: string
  name: string
  icon: string
  description: string
}

export type GameListResponse = {
  games: Game[]
  total: number
  page: number
  pageSize: number
} 
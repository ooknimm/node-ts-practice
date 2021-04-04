export interface ArticleCreateInput {
  user_id: number
  title: string
  description: string
}


export interface ArticleUpdateInput {
  id: number
  title?: string
  description?: string
}


export interface ArticleDeleteInput {
  id: number
}

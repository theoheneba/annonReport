export interface BlogPost {
  id: string
  title: string
  author: string
  publishDate: string
  excerpt: string
}

export type SortableColumn = keyof Omit<BlogPost, "excerpt">


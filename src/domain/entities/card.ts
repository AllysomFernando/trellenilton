export type Card = {
  id: string,
  idPriority: string,
  idCategory: string,
  idStatus: string,
  title: string,
  description?: string,
  createdAt: string,
  updatedAt?: string,
  endedAt?: string,
  deleted: boolean,
}
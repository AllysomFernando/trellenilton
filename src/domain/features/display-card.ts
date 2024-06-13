import type { ICardRepository } from "../contracts/card-repository"
import type { Card } from "../entities/card"

type Input = {}
type Output = Card[]
type DisplayCards = (input: Input) => Promise<Output>
type SetupDisplayCardsProps = {
    repository: ICardRepository
}
type Setup = (props: SetupDisplayCardsProps) => DisplayCards

export const setupDisplayCards: Setup = ({
    repository
}) => async input => {
    try {
        const cards = await repository.loadAllCards()
        if (cards.length === 0) throw new Error ("No cards found", {
            cause: "no-cards"
        })
        return cards
    } catch (error) {
        throw new Error("Could not load all cards", {
            cause: "display-cards"
        })
    }
}
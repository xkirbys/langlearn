import GetNumCardsReviewedByDay from '@/app/api/getNumCardsReviewedByDay';
import FindCards from '@/app/api/findCards';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const AnkiPage = () => {
    return (
        <div>
            <div className={"absolute top-16 left-16 py-4"}>
                <Card>
                    <CardHeader>
                        <CardTitle>Anki Cards Reviewed By Day</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <GetNumCardsReviewedByDay />
                    </CardContent>
                </Card>
            </div>
            <div className={"absolute top-16 right-16 py-4"}>
                <FindCards deckName={"日本語"} />
            </div>
        </div>
    )
}

export default AnkiPage;
import GetNumCardsReviewedByDay from '@/app/api/getNumCardsReviewedByDay';
import { TestChart } from '@/app/test/testgraph';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
        </div>
    )
}

export default AnkiPage;
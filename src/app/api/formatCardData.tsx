import type { AnkiCardProps, RTKCardProps } from '@/app/api/settings/cardProps';
import type { CardProps } from '@/app/api/cardInfo';

function formatCardData(rawData: CardProps[] | undefined): (AnkiCardProps | RTKCardProps)[] {
    if (!rawData) {
        return [];
    }

    const formattedCards: (AnkiCardProps | RTKCardProps)[] = [];

    rawData.forEach((card) => {
        if (isRTKCard(card)) {
            formattedCards.push({
                ...card,
                cardType: 'rtk',
            });
        } else if (isAnkiCard(card)) {
            formattedCards.push({
                ...card,
                cardType: 'anki',
            });
        }
        // Ignore cards that are neither RTK nor Anki
    });


    return formattedCards;
}


function isRTKCard(card: CardProps): boolean {
    return 'Character' in card.fields && 'RTK Number' in card.fields;
}

function isAnkiCard(card: CardProps): boolean {
    return 'Word' in card.fields;
}


export { formatCardData };
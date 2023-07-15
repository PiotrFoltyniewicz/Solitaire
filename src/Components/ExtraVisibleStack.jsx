import Card from "./Card"

export default function ExtraVisibleStack(props) {

    const styles = [];

    for (let i = 0; i < 3; i++) {
        styles.push({ left: (i * 30) + 'px' })
    }

    return (
        <div className='extraVisibleStack'>
            {props.cards.map((card, i) => {
                i++;
                return <Card
                    key={card.id}
                    number={card.number}
                    color={card.color}
                    visible={true}
                    shift={styles[i - 1]}
                />
            })}
        </div>
    )
}
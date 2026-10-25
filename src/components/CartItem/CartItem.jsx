export default function CartItem(
    {
        item,
        onRemove
    }
) {
    return (
        <>
            <p>{ item.name }</p>
            <p>{ item.price }</p>
            <p>{ item.quantity }</p>
            <p>Total: { item.price * item.quantity }</p>
            <button onClick={() => onRemove( item.id )}> Remove from cart </button>
        </>
    )
}
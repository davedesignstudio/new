export default function DealCard(props) {
  const deal = () => props.deal

  return (
    <article class="deal-card">
      <div class="deal-card__media">
        <img src={deal().image} alt="" loading="lazy" />
        <span class="deal-card__badge">{deal().badge}</span>
      </div>
      <div class="deal-card__body">
        <h3>{deal().title}</h3>
        <p>{deal().subtitle}</p>
        <div class="deal-card__row">
          <span class="price">${deal().price.toFixed(2)}</span>
          <span class="deal-card__hint">per item</span>
        </div>
      </div>
    </article>
  )
}

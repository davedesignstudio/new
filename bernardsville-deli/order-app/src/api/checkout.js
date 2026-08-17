const API_BASE = '';

export async function fetchWooStatus() {
  const res = await fetch(`${API_BASE}/api/woocommerce-status.php`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    return { ok: false, connected: false };
  }
  return res.json();
}

export async function placeOrder(payload) {
  const res = await fetch(`${API_BASE}/api/checkout.php`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    const errors = data.errors || [data.reason || 'Checkout failed.'];
    const err = new Error(errors.join(' '));
    err.errors = errors;
    err.status = res.status;
    throw err;
  }
  return data;
}

export function cartLinesToPayload(items) {
  return items.map((line) => ({
    id: line.itemId,
    itemId: line.itemId,
    name: line.name,
    price: line.price,
    quantity: line.quantity,
    options: line.options || null,
    size: line.options?.size || null,
    crust: line.options?.crust || null,
    cheese: line.options?.cheese || null,
    toppings: line.options?.toppings || null,
    variation: line.options
      ? {
          size: line.options.size,
          crust: line.options.crust,
        }
      : null,
  }));
}

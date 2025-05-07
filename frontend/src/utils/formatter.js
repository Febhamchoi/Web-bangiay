export const formatter = (number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number)
}

export const formatPrice = (price) => {
  return `${price.toLocaleString()}đ`
}


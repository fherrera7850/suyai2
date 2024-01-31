export const formatSubtotal = (amount) => {
    return amount.toLocaleString("es-ES", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true
    });
}
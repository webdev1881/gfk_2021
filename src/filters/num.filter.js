export default function currencyFilter( val ) {
    let num = +val.toFixed(0)
    return num.toLocaleString(undefined, { minimumFractionDigits: 0 });    
}
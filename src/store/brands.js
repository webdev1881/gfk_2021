import brands from '../data/brands'

export default {
    actions: {
        async fetchBrands({dispatch, commit},[ url, qty]) {
            const res = await fetch(url).then(res => res.json())
            // const brands = Array.from(new Set(res.map(({ BRAND }) => BRAND)))
            let weeks = Array.from(new Set(res.map(({ Week }) => Week)))
      
            let brandsValue = []
            let sortedBrandsValue = []
            let lastWeek = Math.max.apply(null, weeks)
           
            weeks = weeks.filter(w => +w >= lastWeek-qty+1 )
      
            for (let b in brands) { // перебор уникальных брендов
      
              let weekBrands = weeks.reduce((newObj, item) => {
                newObj[item] = {"UNITS": 0,"UAH": 0, "ASP":0}
                return newObj
              }, {})
      
              for( let v in res ) {
                if ( brands[b] === res[v].BRAND && weekBrands[res[v].Week] ) {
                  weekBrands[res[v].Week].UNITS = weekBrands[res[v].Week].UNITS + +res[v]["Sales Units"]
                  weekBrands[res[v].Week].UAH = weekBrands[res[v].Week].UAH + +res[v]["Sales Value UAH"]
                  weekBrands[res[v].Week].ASP = weekBrands[res[v].Week].UAH / weekBrands[res[v].Week].UNITS
                }
              }
              brandsValue.push( {brand: brands[b], weeks: weekBrands} )
            }     
      
            Object.keys(brandsValue).sort(function(a,b){
              return brandsValue[b].weeks[lastWeek].ASP - brandsValue[a].weeks[lastWeek].ASP
            }).map( item => {sortedBrandsValue.push( brandsValue[item] )})    
      
            console.log( [sortedBrandsValue, lastWeek] )
            return [sortedBrandsValue, lastWeek]
          },
    }
}
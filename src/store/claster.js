export default {
  actions: {
    async fetchBrandClusters({ dispatch, commit }, url) {
      const res = await fetch(url).then(res => res.json())
      // console.log(res);
      const brands = Array.from(new Set(res.map(({ BRAND }) => BRAND)))
      let weeks = Array.from(new Set(res.map(({ Week }) => Week)))
      const clasters = Array.from(new Set(res.map(({ SIZE }) => SIZE)))
      let brandsValue = []

      for (let b in brands) {
        let weeksValue = []

        for (let w in weeks) { // перебор уникальных недель    

          let weekClaster = clasters.reduce((newObj, item) => {
            newObj[item] = {  "UNITS": 0,
                              "UAH": 0,
                              "SmartUNITS":0, 
                              "NoSmartUNITS":0, 
                              "SmartUAH":0, 
                              "NoSmartUAH":0 }
            return newObj
          }, {})

          for (let v in res) {

            if (brands[b] === res[v].BRAND && weeks[w] === res[v]["Week"]) {

              for (let c in clasters) { // ____________________________clasters
                if (clasters[c] === res[v].SIZE) {
                  weekClaster[clasters[c]].UNITS = weekClaster[clasters[c]].UNITS + +res[v]["Sales Units"]
                  weekClaster[clasters[c]].UAH = weekClaster[clasters[c]].UAH + +res[v]["Sales Value UAH"]
                  if ( res[v].SmartTV === "Smart" ) {
                    weekClaster[clasters[c]].SmartUNITS = weekClaster[clasters[c]].SmartUNITS + +res[v]["Sales Units"]
                    weekClaster[clasters[c]].SmartUAH = weekClaster[clasters[c]].SmartUAH + +res[v]["Sales Value UAH"]
                  } else {
                    weekClaster[clasters[c]].NoSmartUNITS = weekClaster[clasters[c]].NoSmartUNITS + +res[v]["Sales Units"]
                    weekClaster[clasters[c]].NoSmartUAH = weekClaster[clasters[c]].NoSmartUAH + +res[v]["Sales Value UAH"]
                  }
                }
              }

            }
          }
          let weekGroupClaster = {
            '32': { "UNITS": 0, "UAH": 0,"SmartUNITS":0, "NoSmartUNITS":0, "SmartUAH":0, "NoSmartUAH":0 },
            '43': { "UNITS": 0, "UAH": 0,"SmartUNITS":0, "NoSmartUNITS":0, "SmartUAH":0, "NoSmartUAH":0  },
            '50': { "UNITS": 0, "UAH": 0,"SmartUNITS":0, "NoSmartUNITS":0, "SmartUAH":0, "NoSmartUAH":0  },
            '60 >': { "UNITS": 0, "UAH": 0,"SmartUNITS":0, "NoSmartUNITS":0, "SmartUAH":0, "NoSmartUAH":0  },
          }
          for (let g in weekClaster) { //____________________ switch  clasters
            switch (true) {
              case g >= 31.5 && g <= 32:
                weekGroupClaster[32].UNITS += weekClaster[g].UNITS
                weekGroupClaster[32].UAH += weekClaster[g].UAH
                weekGroupClaster[32].SmartUNITS += weekClaster[g].SmartUNITS
                weekGroupClaster[32].NoSmartUNITS += weekClaster[g].NoSmartUNITS
                weekGroupClaster[32].SmartUAH += weekClaster[g].SmartUAH
                weekGroupClaster[32].NoSmartUAH += weekClaster[g].NoSmartUAH
                break;
              case g >= 33 && g <= 40:
                weekGroupClaster[43].UNITS += weekClaster[g].UNITS
                weekGroupClaster[43].UAH += weekClaster[g].UAH
                break;
              case g >= 46 && g <= 55:
                weekGroupClaster[50].UNITS += weekClaster[g].UNITS
                weekGroupClaster[50].UAH += weekClaster[g].UAH
                break;
              case g >= 56:
                weekGroupClaster['60 >'].UNITS += weekClaster[g].UNITS
                weekGroupClaster['60 >'].UAH += weekClaster[g].UAH
                break;
            }
          }
          weeksValue.push({ week: weeks[w], clasters: weekGroupClaster })

        }

        brandsValue.push({ "brand": brands[b], "weeks": weeksValue })
      }

// console.log(brandsValue);      
      return brandsValue

    }
  }
}
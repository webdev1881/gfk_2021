import Vue from 'vue'
import Vuex from 'vuex'

import brandsASP from './brands'
import claster from './claster'
import test from './test'

Vue.use(Vuex)

export default new Vuex.Store({

  actions: {

    async fetchJson({ dispatch, commit }, url) {
      const res = await fetch(url).then(res => res.json())
      const weeks = Array.from(new Set(res.map(({ Week }) => Week)))
      const clasters = Array.from(new Set(res.map(({ SIZE }) => SIZE)))
      const brands = Array.from(new Set(res.map(({ BRAND }) => BRAND)))
      let weeksValue = []

      for (let w in weeks) { // перебор уникальных недель
        let units = 0
        let uah = 0

        let weekClaster = clasters.reduce((newObj, item) => {
          newObj[item] = { "UNITS": 0, "UAH": 0 }
          return newObj
        }, {})

        let weekBrands = brands.reduce((newObj, item) => {
          newObj[item] = { "UNITS": 0, "UAH": 0 }
          return newObj
        }, {})

        for (let v in res) {
          if (weeks[w] === res[v]["Week"]) {
            units = units + +res[v]["Sales Units"] //________________total units
            uah = uah + +res[v]["Sales Value UAH"] //________________total uah
            for (let c in clasters) { // ____________________________clasters
              if (clasters[c] === res[v].SIZE) {
                weekClaster[clasters[c]].UNITS = weekClaster[clasters[c]].UNITS + +res[v]["Sales Units"]
                weekClaster[clasters[c]].UAH = weekClaster[clasters[c]].UAH + +res[v]["Sales Value UAH"]
              }
            }
            for (let b in brands) { //________________________________brands
              if (brands[b] === res[v].BRAND) {
                weekBrands[brands[b]].UNITS = weekBrands[brands[b]].UNITS + +res[v]["Sales Units"]
                weekBrands[brands[b]].UAH = weekBrands[brands[b]].UAH + +res[v]["Sales Value UAH"]
              }
            }
          }
        }
        let weekGroupClaster = {
          '32': { "UNITS": 0, "UAH": 0 },
          '40': { "UNITS": 0, "UAH": 0 },
          '43': { "UNITS": 0, "UAH": 0 },
          '50': { "UNITS": 0, "UAH": 0 },
          '60 >': { "UNITS": 0, "UAH": 0 },
        }
        for (let g in weekClaster) { //____________________ switch  clasters
          switch (true) {
            case g >= 31.5 && g <= 32:
              weekGroupClaster[32].UNITS += weekClaster[g].UNITS
              weekGroupClaster[32].UAH += weekClaster[g].UAH
              break;
            case g >= 33 && g <= 40:
                weekGroupClaster[40].UNITS += weekClaster[g].UNITS
                weekGroupClaster[40].UAH += weekClaster[g].UAH
                break;
            case g >= 33 && g <= 45:
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
        weeksValue.push({ week: weeks[w], clasters: weekGroupClaster, brands: weekBrands, units: units, uah: uah })
      }
      // console.log(weeksValue)
      return weeksValue
    },

  },

  modules: { brandsASP, claster, test }

})

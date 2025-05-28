export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const updateNestedObject: any = (object: any, objectOld: any) => {
  const final: any = {}
  if (object !== undefined || object !== null) {
    Object.keys(object).forEach((i) => {
      if (object[i] !== null && object[i] !== undefined) {
        if (Array.isArray(object[i])) {
          final[i] = object[i].map((item: any, index: number) => {
            if (typeof item === 'object') {
              return updateNestedObject(item, objectOld[i][index])
            } else {
              return item
            }
          })
        } else if (typeof object[i] === 'object' && !Array.isArray(object[i])) {
          const response: any = updateNestedObject(object[i], objectOld[i])
          final[i] = response
        } else {
          final[i] = object[i]
        }
      } else {
        final[i] = objectOld[i]
      }
    })
  }

  return final
}

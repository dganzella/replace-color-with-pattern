const convertColor = require('./utils/convert-color')
const getDelta = require('./utils/get-delta')

module.exports = ({
  jimpImage,
  targetColor,
  replaceColors,
  formula = 'E00',
  deltaE = 2.3
} = {}, callback) => {

  return new Promise((resolve, reject) => {
    callback = callback || ((err, jimpImage) => {
      if (err) return reject(err)
      return resolve(jimpImage)
    })

    const targetLABColor = convertColor(targetColor.type, 'lab', targetColor.color)
    let replaceRGBColors = []
      
    replaceColors.forEach((repColor) => {
        replaceRGBColors.push(convertColor(repColor.type, 'rgb', repColor.color))
    })

    jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, (x, y, idx) => {
      const currentLABColor = convertColor('rgb', 'lab', [
        jimpImage.bitmap.data[idx],
        jimpImage.bitmap.data[idx + 1],
        jimpImage.bitmap.data[idx + 2]
      ])

      let index = (x+y)%replaceColors.length;

      if (getDelta(currentLABColor, targetLABColor, formula) <= deltaE) {
        jimpImage.bitmap.data[idx] = replaceRGBColors[index][0]
        jimpImage.bitmap.data[idx + 1] = replaceRGBColors[index][1]
        jimpImage.bitmap.data[idx + 2] = replaceRGBColors[index][2]
        if (replaceRGBColors[3] !== null) jimpImage.bitmap.data[idx + 3] = replaceRGBColors[index][3]
      }
    })

    callback(null, jimpImage)
  });
}

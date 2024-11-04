```javascript
const replaceColor = require('replace-color')
const { Jimp } = require("jimp");

const image = await Jimp.read('test.png');

replaceColor({
  jimpImage: image,
  colors: {
    type: 'hex',
    targetColor: '#FF0000',
    replaceColor: '#FFFFFF'
  }
}, (err, jimpObject) => {
  if (err) return console.log(err)
  jimpObject.write('./output.jpg', (err) => {
    if (err) return console.log(err)
  })
})
```

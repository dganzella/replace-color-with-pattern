```javascript
const replaceColor = require('replace-color')
const { Jimp } = require("jimp");

const image = await Jimp.read('test.png');

replaceColor({
    jimpImage: image,
    targetColor: {
        type: 'hex',
        color: '#FF797979',
    },
    replaceColors: [{
        type: 'hex',
        color: '#FFFFFFFF',
    },{
        type: 'hex',
        color: '#FF000000',
    }
    ],
        }, (err, jimpObject) => {
        if (err) return console.log(err)
        jimpObject.write('test-x2.png', (err) => {
            if (err) return console.log(err)
        })
    })
```

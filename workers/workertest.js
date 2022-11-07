// const ProductMetaWorker = require("./ProductMetaWorker")
(async () => {
    const ProductMetaWorker = require("./ProductMetaWorker")
    let names = await ProductMetaWorker.getkeywordA()
    console.log(names)
  })();

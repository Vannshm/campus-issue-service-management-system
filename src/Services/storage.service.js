const imageKit = require('@imagekit/nodejs')

const client = new imageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
  const result = await client.files.upload({
  file,
  fileName:'image'
})
return result
}

module.exports = {uploadFile}
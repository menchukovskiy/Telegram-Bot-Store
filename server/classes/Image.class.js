const sharp = require('sharp')
const mime = require('mime-types')


class Image {

    checkImageType( file ){
        const type = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
        return type.includes( mime.lookup( file ) )
        
    }

    async createImage( file, newFile, width, height, quality = 90 ) {

        let imageWidth = width
        let imageHeight = height

        try{
            await sharp(file)
            .resize(imageWidth,imageHeight )
            .jpeg({ quality: quality })
            .toFile(
                newFile
            )
        } catch(e){
            
        }

        
    }

}

module.exports = new Image()
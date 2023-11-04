const { product } = require('../models');
const { imageKit } = require('../utils');

module.exports = {
    createImage: async(req, res) => {
        try {
            console.log(req.file)
            const data = await product.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    image: `/images/${req.file.filename}`,
                }
            })

            return res.status(201).json({
                data
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    },
    createWithImageKit: async(req, res) => {
        try {
            const fileTostring = req.file.buffer.toString('base64');

            const uploadFile = await imageKit.upload({
                fileName: req.file.originalname,
                file: fileTostring
            });

            const data = await product.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    image: uploadFile.url
                }
            })

            return res.status(201).json({
                data
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    },
    upload: async(req, res) => {
        try {
            const fileTostring = req.file.buffer.toString('base64');

            const uploadFile = await imageKit.upload({
                fileName: req.file.originalname,
                file: fileTostring
            });

            return res.status(200).json({
                data: {
                    name: uploadFile.name,
                    url: uploadFile.url,
                    type: uploadFile.fileType
                }
            })
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
    },
    getImage: async(req, res) => {
        const images = await product.findMany();
        return res.json({
            data: images,
            message: "All Image Data has been found"
        })
    },
    getImagebyId: async(req, res) => {
        const { id } = req.params;
        const image = await product.findUnique({
            where: { id: parseInt(id) }
        });
        if (!image) {
            res.status(404).json({ error: 'Image not found' });
        } else {
            return res.json({
                data: image,
                message: "Data has been found"
            })
        }
    },

    editImages: async(req, res) => {
        try {
            const { id } = req.params;
            const { title, description } = req.body;

            const updatedImage = await product.update({
                where: { id: parseInt(id) },
                data: { title, description },
            });

            if (!updatedImage) {
                res.status(404).json({ error: 'Image not found' });
            } else {
                res.json({
                    data: updatedImage,
                    message: "title & description updated succesfully"
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update image' });
        }
    },
    deleteImage: async(req, res) => {
        const { id } = req.params;
        const image = await product.delete({
            where: { id: parseInt(id) }
        });
        return res.json({
            data: image,
            message: "Data has been deleted"
        })
    }
}
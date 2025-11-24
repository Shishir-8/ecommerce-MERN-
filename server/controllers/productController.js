import Product from "../models/Product.js";


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({createdAt: -1})
        if(!products) {
            return res.status(404).json({
                success: false,
                message: "Products not found"
            })
        }

        res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category")
        res.status(200).json(categories) 
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    }
}


export const getHomeProducts = async (req, res) => {
    try {
        const products = await Product.find().limit(4)
        res.status(200).json({
            success: true,
            products
        })
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); 
    }
}

export const getTrendingProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({createdAt: -1}).limit(4)
        res.status(200).json({
            success: true,
            products
        })
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); 
    }
}



// for admin only
export const createProducts = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({success: true, message: "Product created succesfully", product})
        
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    }
}
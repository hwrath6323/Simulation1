module.exports = {

    check(req, res) {
        return res.status(200).send({
            message: 'Yay it worked'
        })
    },

    get_inventory(req, res){
        const db = req.app.get('db');

        // const dbInstance = req.applicationCache.get('/api/inventory');
        
        db.get_inventory()
            .then(products => res.status(200).send(products))
            .catch(err => {
                    console.log(err);
                    res.status(400).send(err);
            });
    },

    get_product(req, res){
        const db = req.app.get('db');
        db.products.findOne({id:req.params.id})
            .then(product => res.status(200).send(product))
            .catch(err => {
                    console.log(err);
                    res.status(400).send(err);
            });
    },

    create_product(req, res){
        const db = req.app.get('db');

        db.create_product({
            url: req.body.product_url,
            name: req.body.product_name,
            price: req.body.product_price
        })
            .then(([ product ]) => res.status(200).send(product))
            .catch(err => {
                console.warn('error with the db', err)
                res.status(400).send(err);
            });
        
    },

    delete_product(req, res){
        const db = req.app.get('db');

        db.delete_product([
            req.params.id])
                .then(() => {
                    res.send('deleted')
                })
                .catch(err => {
                    console.warn('could not be deleted', err);
                });
    },

    edit_product(req,res){
        const db = req.app.get('db');

        db.edit_product({
            id: req.body.product_id,
            url: req.body.product_url,
            name: req.body.product_name,
            price: req.body.product_price
        })
            .then(([product]) => {res.status(200).send(product)})
            .catch(err => {
                console.warn('could not update', err)
                res.status(400).send(err)
            })

    }








}








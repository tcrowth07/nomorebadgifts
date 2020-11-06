import express from 'express';
import Type from '../models/typesModel.js'
import cors from 'cors'

const router = express.Router();
router.use(cors());

//GET: /types
// gets all types from DB
router.get("/", (req, res) => {
    Type.find()
        .then((results) => {
            res.send(results)
        })
        .catch((err) => {
            console.log(err)
        })
});

//GET: /types/{id}
// gets specific type from DB
router.get("/:typeID", (req, res) => {
    let type = req.params.typeID
    Type.findOne({ "id": type.toUpperCase()})
        .then((results) => {
            res.send(results)
        })
        .catch((err) => {
            console.log(err)
        })
});

//get: /types/add
//adds a single type to db
// router.get("/add", (req, res) => {
//     const type = new Type({
//         id: "ESFP",
//         introverted: false,
//         observant: true,
//         thinking: false,
//         judging: false,
//         description: "ESFPs love the element of surprise when it comes to gifts. They aren’t likely to hand out detailed wish lists or pressure you to get them any one particular thing. What matters to the ESFP is that you put your heart into the process. They love to get a sentimental gift that shows how well you really know them. Because ESFPs have dominant Extraverted Sensing (Se) the gifts they desire often satisfy their love of anything sensory. Experiences that introduce them to new sights or tastes, clothes that are soft and lush, or practical gifts that make their homes more pleasing to the eye.",
//     });
//     type.save()
//         .then((result) => {
//             console.log("Added type to DB")
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

export default router;
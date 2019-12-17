const express = require('express')
const router = new express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const userregistration = require('../controllers/registercontroller');
const imageuploadService = require('../controllers/imageuploadcontroller');
const paypalCheckoutService = require('../controllers/paypalcontroller');
const twilioService = require('../controllers/twiliocontroller');
const forgotPasswordService = require('../controllers/forgotpasswordcontroller');
const productdetailService = require('../controllers/productcontroller')
const servicedetail = require('../controllers/servicescontroller');
const categorydetail = require('../controllers/categorycontroller')


aws.config.update({
    secretAccessKey: 'H0vh22HcvzQw8+CGyJew0kUzI/euuhFApKEks+q8',
    accessKeyId: 'AKIAIQKR4CCYPQCBCMUQ',
    region: 'us-west-1'
});

const s3 = new aws.S3();


var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'shoclefbucket',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); 
        }
    })
});





router.get('/', (req,res) => {
    res.json({
        message: "Welcome to Shoclef"
    })
})



/**
 * @swagger
 * definition:
 *   Register:
 *     properties:
 *       fullname:
 *         type: string
 *       latitude:
 *         type: string
 *       longitude:
 *         type: string
 *       profilepicture:
 *         type: string
 *       phone_number:
 *         type: string
 *       country_code:
 *         type: string
 *       email_id:
 *         type: string
 *       password:
 *         type: string
 *       city:
 *         type: string
 *       state:
 *         type: string
 *       country:
 *         type: string
 *       facebooktoken:
 *         type: string
 *       googletoken:
 *         type: string
 *       userfborgid:
 *         type: string
 */     



/**
 * @swagger
 * /registration/register:
 *   post:
 *     tags:
 *       - Register
 *     description: Creates Registration
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Register
 *         description: Register object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Register'
 *     responses:
 *       200:
 *         description: Successfully created
 */


router.post('/registration/register/', userregistration.registerDetails);



/**
 * @swagger
 * definition:
 *   UserVerification:
 *     properties:
 *       country_code:
 *         type: string
 *       phone_number:
 *         type: string
 *       verification_code:
 *         type: string
 *       user_id:
 *         type: string
 */


/**
 * @swagger
 * /registration/verification:
 *   post:
 *     tags:
 *       - UserVerification
 *     description: Update Registration
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: UserVerification
 *         description: Userverification object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/UserVerification'
 *     responses:
 *       200:
 *         description: Successfully created
 */


router.post('/registration/verification/', userregistration.userverification);




/**
 * @swagger
 * /registration/getalldetails:
 *   get:
 *     tags:
 *       - Register
 *     description: Get Details of Registration
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of register Details
 *         schema:
 *           $ref: '#/definitions/Register'
 * 
 */
 


router.get('/registration/getalldetails',userregistration.getregisterDetails)

/**
 * @swagger
 * /secureuser/upload:
 *   post:
 *     tags:
 *       - Secureuser
 *     description: Image Upload
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: imageupload
 *         description: The file to upload
 *         in: formData
 *         required: true
 *         type: file
 *         schema:
 *           $ref: '#/definitions/Secureuser'
 *     responses:
 *       200:
 *         description: Successfully Uploaded
 */

router.post('/secureuser/upload/', upload.single('imageupload'), imageuploadService.imageupload);

/**  
 * @swagger
 * definition:
 *   Paypal:
 *     properties:
 *      items:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            name:
 *             type: string
 *            sku:
 *             type: string
 *            price:
 *             type: string
 *            currency:
 *             type: string
 *            quantity:
 *             type: string
 *      amount:
 *        type: object
 *        properties:
 *          currency:
 *           type: string
 *          total:
 *           type: string
 *      customer:
 *        type: object
 *        properties:
 *          country_code:
 *           type: string
 *          phone:
 *           type: string
 */

/**
 * @swagger
 * /secureuser/paypalcheckout:
 *   post:
 *     tags:
 *       - Paypal
 *     summary: Enter phone number with country code. Example +91 
 *     description: Paypal checkout
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Paypal
 *         description: Paypal object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Paypal'
 *     responses:
 *       200:
 *         description: Successfully checked out 
 */


router.post('/secureuser/paypalcheckout/', paypalCheckoutService.paypaldetail);


/**  
 * @swagger
 * definition:
 *   PaypalDetails:
 *     properties:
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      email_id:
 *        type: string
 *      phone:
 *        type: string
 */

/**
 * @swagger
 * /secureuser/paypalgettoken:
 *   post:
 *     tags:
 *       - PaypalDetails
 *     description: Paypal Get Token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: PaypalDetails
 *         description: Paypal object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/PaypalDetails'
 *     responses:
 *       200:
 *         description: Successfully Get Token
 */

router.post('/secureuser/paypalgettoken/', paypalCheckoutService.paypalToken);
/**  
 * @swagger
 * definition:
 *   PaypalDetailCheckOut:
 *     properties:
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      email_id:
 *        type: string
 *      phone_number:
 *        type: string
 *      streetAddress:
 *        type: string
 *      extendedAddress:
 *        type: string
 *      locality:
 *        type: string
 *      region: 
 *        type: string
 *      postalCode:
 *        type: string
 *      countryCode:
 *        type: string
 *      paymentMethodNonce:
 *        type: string
 */


/**
 * @swagger
 * /secureuser/paypalcheckoutdetails:
 *   post:
 *     tags:
 *       - PaypalDetailCheckOut
 *     description: Paypal Get Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: paypalcheckout
 *         description: paypal checkout details object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/PaypalDetailCheckOut'
 *     responses:
 *       200:
 *         description: Successfully Get Data
 */ 
router.post('/secureuser/paypalcheckoutdetails/', paypalCheckoutService.paypalCheckoutDetails);

router.post('/secureuser/razorpayorderdetails/', paypalCheckoutService.orderDetails)

//router.post('/secureuser/razorpaycheckout/', paypalCheckoutService.razorpayDetails);

/**
 * @swagger
 * definition:
 *   Twilio:
 *     properties:
 *       phone_number:
 *         type: string
 *       country_code:
 *         type: string
 *       verification_code:
 *         type: string
 */

/**
 * @swagger
 * /secureuser/startverification:
 *   post:
 *     tags:
 *       - Twilio
 *     description: Twilio Start Verification
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Twilio
 *         description: Twilio object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Twilio'
 *     responses:
 *       200:
 *         description: Successfully checked out 
 */


router.post('/secureuser/startverification/', twilioService.requestPhoneVerification);

/**
 * @swagger
 * /secureuser/verfication:
 *   post:
 *     tags:
 *       - Twilio
 *     description: Twilio Verification
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Twilio
 *         description: Twilio object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Twilio'
 *     responses:
 *       200:
 *         description: Successfully checked out 
 */

router.post('/secureuser/verfication/', twilioService.confirmPhoneVerification);


router.post('/secureuser/signin',userregistration.usersignin)


/**
 * @swagger
 * definition:
 *   Forgetpassword:
 *     properties:
 *       phone_number:
 *         type: string
 *       country_code:
 *         type: string
 *       verification_code:
 *         type: string
 */

 /**
 * @swagger
 * /secureuser/changepassword:
 *   post:
 *     tags:
 *       - Forgetpassword
 *     description: Forgetpassword Check
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ForgetPassword
 *         description: Forgetpassword object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Forgetpassword'
 *     responses:
 *       200:
 *         description: Successfully checked out 
 */

router.post('/secureuser/changepassword', forgotPasswordService.changePassword)

 /**
 * @swagger
 * /secureuser/updatepassword:
 *   post:
 *     tags:
 *       - Forgetpassword
 *     description: Forgetpassword Check
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ForgetPassword
 *         description: Forgetpassword object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Forgetpassword'
 *     responses:
 *       200:
 *         description: Successfully checked out 
 */

router.post('/secureuser/updatepassword', forgotPasswordService.updatePassword)


/**
 * @swagger
 * definition:
 *   Updatepassword:
 *     properties:
 *       user_id:
 *         type: string
 *       password:
 *         type: string
 *       fullname:
 *         type: string 
 */

 /**
 * @swagger
 * /secureuser/updateuserpassword:
 *   post:
 *     tags:
 *       - Updatepassword
 *     description: Forgetpassword Check
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Updatepassword
 *         description: Updatepassword object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Updatepassword'
 *     responses:
 *       200:
 *         description: Successfully checked out 
 */

router.post('/secureuser/updateuserpassword', forgotPasswordService.updateUserPassword)



/**
 * @swagger
 * definition:
 *   ProductDetails:
 *     properties:
 *       categoryId:
 *         type: string
 *       title:
 *         type: string
 *       skuImage:
 *         type: string
 *       productImages:
 *         type: array
 *       reviews:
 *         type: array 
 *       trade:
 *         type: string
 *       prices:
 *         type: array
 *       likeCount:
 *         type: string 
 */


/**
 * @swagger
 * /productdetails/getproductlist:
 *   get:
 *     tags:
 *       - ProductDetails
 *     description: Get Details of Product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: page
 *         in: query
 *         required: true
 *         type: string
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: true
 *         type: string
 *       - name: CategoryId
 *         description: CategoryId
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of Product Details
 *         schema:
 *           $ref: '#/definitions/ProductDetails'
 * 
 */


router.get('/productdetails/getproductlist',productdetailService.getproductAllDetails)

 /**
 * @swagger
 * /productdetails/getproductdata:
 *   get:
 *     tags:
 *       - ProductDetails
 *     description: Get Product Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ProductId
 *         description: Product Id
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of Registration Details
 * 
 */
 

router.get('/productdetails/getproductdata',productdetailService.getproductdata)

 /**
 * @swagger
 * /productdetails/productsearch:
 *   get:
 *     tags:
 *       - ProductDetails
 *     description: Get Product Search Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: page
 *         in: query
 *         required: true
 *         type: string
 *       - name: limit
 *         description: limit
 *         in: query
 *         required: true
 *         type: string
 *       - name: ProductSearch
 *         description: Product Search
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of Product Search Details
 * 
 */

router.get('/productdetails/productsearch',productdetailService.getProductSearch)



/**
 * @swagger
 * /servicedetails/getLiveServiceDetails:
 *   get:
 *     tags:
 *       - LiveServiceDetails
 *     description: Get Details of Live Services
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of LiveService Details
 *         schema:
 *           $ref: '#/definitions/getLiveServiceDetails'
 * 
 */


router.get('/servicedetails/getLiveServiceDetails', servicedetail.getLiveServiceDetails)

/**
 * @swagger
 * /servicedetails/getLiveServiceDetailsById:
 *   get:
 *     tags:
 *       - LiveServiceDetails
 *     description: Get Details of LiveServices On The basis of service and provider ids 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: service_id
 *         description: Service Id
 *         in: query
 *         required: false
 *         type: string
 *       - name: category_id
 *         description: Category id
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of LiveServices Details
 *         schema:
 *           $ref: '#/definitions/getLiveServiceDetailsById'
 * 
 */

router.get('/servicedetails/getLiveServiceDetailsById', servicedetail.getLiveServiceDetailsById)



/**
 * @swagger
 * /servicedetails/getOnlineServiceDetails:
 *   get:
 *     tags:
 *       - OnlineServiceDetails
 *     description: Get Details of Online Services
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of OnlineService Details
 *         schema:
 *           $ref: '#/definitions/getOnlineServiceDetails'
 * 
 */


router.get('/servicedetails/getOnlineServiceDetails', servicedetail.getOnlineServiceDetails)

/**
 * @swagger
 * /servicedetails/getOnlineServiceDetailsById:
 *   get:
 *     tags:
 *       - OnlineServiceDetails
 *     description: Get Details of OnlineServices On The basis of service and provider ids 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: service_id
 *         description: Service Id
 *         in: query
 *         required: false
 *         type: string
 *       - name: category_id
 *         description: Category id
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of OnlineServices Details
 *         schema:
 *           $ref: '#/definitions/getOnlineServiceDetailsById'
 * 
 */

router.get('/servicedetails/getOnlineServiceDetailsById', servicedetail.getOnlineServiceDetailsById)



/**
 * @swagger
 * /servicedetails/getLocalServiceDetails:
 *   get:
 *     tags:
 *       - LocalServiceDetails
 *     description: Get Details of Local Services
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of LocalService Details
 *         schema:
 *           $ref: '#/definitions/getLocalServiceDetails'
 * 
 */


router.get('/servicedetails/getLocalServiceDetails', servicedetail.getLocalServiceDetails)



/**
 * @swagger
 * /servicedetails/getLocalServiceDetailsById:
 *   get:
 *     tags:
 *       - LocalServiceDetails
 *     description: Get Details of Services On The basis of service and provider ids
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: service_id
 *         description: Service Id
 *         in: query
 *         required: false
 *         type: string
 *       - name: category_id
 *         description: Category id
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: List of Service Details
 *         schema:
 *           $ref: '#/definitions/getLocalServiceDetailsById'
 * 
 */


router.get('/servicedetails/getLocalServiceDetailsById', servicedetail.getLocalServiceDetailsById)


/**
 * @swagger
 * /categorydetails/getCategoryMapping:
 *   get:
 *     tags:
 *       - CategoryDetails
 *     summary: Get Category Mapping
 *     description: Get Details of Category Mapping
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: CategoryId
 *         description: CategoryId
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Details of Category Mapping
 *         schema:
 *           $ref: '#/definitions/CategoryDetails'
 * 
 */
router.get('/categorydetails/getCategoryMapping',categorydetail.getCategoryDetails);


module.exports = router;
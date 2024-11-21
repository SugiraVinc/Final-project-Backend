import {Router} from 'express'
import { 
    createContributorContent, 
    getContributorContent, 
    deleteContributorContent,
    getContent, 
    getSingleContent, 
    createComment, 
    getCommentsByContentId, 
    createLike, 
    getLikesByContentId,
    createTestimonyContent,
    getTestimonyContent,
    getAllTestimonyContent,
    getSingleTestimonyContent,
    deleteTestimonyContent,
    setContributor,
    createPoem,
    getAllPoems,
    getSinglePoem,
    deletePoem
} from '../controller/contributorGalleryController.js'
import authCheck from '../middleware/authMiddleware.js'

const router  = Router()

router.get('/contributor',authCheck, getContributorContent)
router.delete('/contributor/:id',authCheck, deleteContributorContent)
router.post('/contributor',authCheck, createContributorContent)
router.get('/content', getContent)
router.get('/content/:id', getSingleContent)
router.post('/comments/:contentId', authCheck, createComment);
router.get('/comments/:contentId', getCommentsByContentId);
router.post('/likes/:contentId', authCheck, createLike); 
router.get('/likes/:contentId', getLikesByContentId); 
router.post('/testimony',authCheck, createTestimonyContent)
router.get('/testimony-user',authCheck, getTestimonyContent)
router.get('/testimony', getAllTestimonyContent)
router.get('/testimony/:id', getSingleTestimonyContent)
router.delete('/testimony/:id',authCheck, deleteTestimonyContent)
router.put('/set-contributor',authCheck, setContributor)
router.post('/poem',authCheck, createPoem)
router.get('/poem', getAllPoems)
router.get('/poem/:id', getSinglePoem)
router.delete('/poem/:id',authCheck, deletePoem)

export default router
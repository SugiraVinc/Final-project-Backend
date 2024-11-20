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
    deleteTestimonyContent
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
router.post('/testimony', createTestimonyContent)
router.get('/testimony-user', getTestimonyContent)
router.get('/testimony', getAllTestimonyContent)
router.get('/testimony/:id', getSingleTestimonyContent)
router.delete('/testimony/:id', deleteTestimonyContent)

export default router
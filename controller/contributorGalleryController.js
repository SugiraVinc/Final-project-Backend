import ContributorContent from '../models/contributorGalleryModel.js';
import cloudinary from '../helpers/cloundinary/cloudinary.js';
import upload from '../helpers/multer/galleryMulter.js'
import Comment from '../models/comment.js';
import User from '../models/userModel.js';
import Like from '../models/like.js';
import Testimony from '../models/testimonyModel.js';
import Poem from '../models/poem.js';

export const createContributorContent = async(req, res) => {
  upload(req, res, async(err) => {
    if(err) {
      return res.status(400).json({err})
    }

    if (!req.file) {
      return res.status(400).json({ err: 'Please select an image or video' });
    }

    try {
      const { room, title, description } = req.body;
      const userId = req.user._id;
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "SUGIRA_GALLERY",
        resource_type: "auto",
      });

      let newContributorContent;
      if (req.file.mimetype.startsWith('image/') || req.file.mimetype.startsWith('video/')) {
        newContributorContent = await ContributorContent.create({
          userId,
          mediaType: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
          media: {
            public_id: result.public_id,
            url: result.secure_url
          },
          room, 
          title,
          description
        });
      } else {
        return res.status(400).json({ err: 'Invalid file type. Please upload an image or video.' });
      }

      return res.status(200).json({
        message: 'Created gallery successfully',
        newContributorContent
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  })
}
export const createTestimonyContent = async(req, res) => {
  upload(req, res, async(err) => {
    if(err) {
      return res.status(400).json({err})
    }

    if (!req.file) {
      return res.status(400).json({ err: 'Please select an image or video' });
    }

    try {
      const { room, title, description } = req.body;
      const userId = req.user._id;
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "SUGIRA_GALLERY",
        resource_type: "auto",
      });

      let newTestimony;
      if (req.file.mimetype.startsWith('image/') || req.file.mimetype.startsWith('video/')) {
        newTestimony = await Testimony.create({
          userId,
          mediaType: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
          media: {
            public_id: result.public_id,
            url: result.secure_url
          },
          room, 
          title,
          description
        });
      } else {
        return res.status(400).json({ err: 'Invalid file type. Please upload an image or video.' });
      }

      return res.status(200).json({
        message: 'Created Testimony successfully',
        newTestimony
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  })
}
  

export const getContributorContent = async (req, res) => {
    try {
        const userId = req.user._id;
        const contributorContent = await ContributorContent.find({ userId });

        res.status(200).json({
            success: true,
            data: contributorContent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch contributor content'
        });
    }
};
export const getTestimonyContent = async (req, res) => {
    try {
        const userId = req.user._id;
        const contributorContent = await Testimony.find({ userId });

        res.status(200).json({
            success: true,
            data: contributorContent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch Testimony content'
        });
    }
};

export const getContent = async(req, res) => {
  try {
    const contributorContent = await ContributorContent.find();

    res.status(200).json({
        success: true,
        data: contributorContent
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch contributor content'
    });
}
}
export const getAllTestimonyContent = async(req, res) => {
  try {
    const contributorContent = await Testimony.find();

    res.status(200).json({
        success: true,
        data: contributorContent
    });
} catch (error) {
    res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch Testimony content'
    });
}
}
export const getSingleContent = async (req, res) => {
  try {
    const { id } = req.params;

    const contributorContent = await ContributorContent.findById(id);

    if (!contributorContent) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contributorContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch contributor content',
    });
  }
};
export const getSingleTestimonyContent = async (req, res) => {
  try {
    const { id } = req.params;

    const contributorContent = await Testimony.findById(id);

    if (!contributorContent) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contributorContent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch Testimony content',
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { comment } = req.body;
    const userId = req.user._id; 


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found. Login' });
    }

    // Create the comment
    const newComment = await Comment.create({
      contentId,
      userId,
      name: user.name,
      comment,
    });

    res.status(201).json({
      success: true,
      data: newComment,
      message: 'Comment created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create comment',
    });
  }
};

// Get comments for a specific content
export const getCommentsByContentId = async (req, res) => {
  try {
    const { contentId } = req.params; // Content ID from the URL

    // Find comments for the given content ID
    const comments = await Comment.find({ contentId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments,
      message: `Comments for content ID ${contentId} retrieved successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch comments',
    });
  }
};


export const createLike = async (req, res) => {
  try {
    const { contentId } = req.params; // Content ID from request parameters
    const userId = req.user._id; // Authenticated user ID from the request

    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found, Login.',
      });
    }

  
    // Check if the user has already liked the content
    const existingLike = await Like.findOne({ contentId, userId });
    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: 'You have already liked this content.',
      });
    }

    // Create a new like entry
    const newLike = new Like({
      contentId,
      userId,
      like: 1,
    });

    // Save the new like
    await newLike.save();

    return res.status(201).json({
      success: true,
      data: newLike,
      message: 'Content liked successfully.',
    });
  } catch (error) {
    console.error('Error creating like:', error);

    return res.status(500).json({
      success: false,
      message: 'An error occurred while liking the content.',
    });
  }
};


// Get likes for a specific content
export const getLikesByContentId = async (req, res) => {
  try {
    const { contentId } = req.params; // Content ID from URL

    // Find all likes for the given content ID
    const likes = await Like.find({ contentId });

    // Count the total number of likes
    const totalLikes = likes.reduce((sum, like) => sum + like.like, 0);

    res.status(200).json({
      success: true,
      data: { totalLikes, likes },
      message: `Likes for content ID ${contentId} retrieved successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch likes',
    });
  }
};

export const deleteContributorContent = async (req, res) => {
  try {
      const contentId = req.params.id; // Get the content ID from the request parameters

      // Delete the content by its ID
      const deletedContent = await ContributorContent.findByIdAndDelete(contentId);

      if (!deletedContent) {
          return res.status(404).json({
              success: false,
              message: 'Content not found'
          });
      }

      res.status(200).json({
          success: true,
          message: 'Content successfully deleted',
          data: deletedContent
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message || 'Failed to delete content'
      });
  }
};
export const deleteTestimonyContent = async (req, res) => {
  try {
      const contentId = req.params.id; // Get the content ID from the request parameters

      // Delete the content by its ID
      const deletedContent = await Testimony.findByIdAndDelete(contentId);

      if (!deletedContent) {
          return res.status(404).json({
              success: false,
              message: 'Content not found'
          });
      }

      res.status(200).json({
          success: true,
          message: 'Content successfully deleted',
          data: deletedContent
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message || 'Failed to delete content'
      });
  }
};

export const setContributor = async (req, res) => {
  try {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isContributor: true },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated to contributor successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update user',
    });
  }
};


export const createPoem = async (req, res) => {
  try {
    const { title, description, room } = req.body;

    // Validate input
    if (!title ) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: 'description is required',
      });
    }
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'room are required',
      });
    }

    // Create and save the poem
    const newPoem = await Poem.create({
      title,
      description,
      room,
    });

    res.status(201).json({
      success: true,
      message: 'Poem created successfully',
      data: newPoem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create poem',
    });
  }
};


export const getAllPoems = async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      success: true,
      message: 'Poems fetched successfully',
      data: poems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch poems',
    });
  }
};

export const getSinglePoem = async (req, res) => {
  try {
    const { id } = req.params;

    const poem = await Poem.findById(id);

    if (!poem) {
      return res.status(404).json({
        success: false,
        message: 'Poem not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Poem fetched successfully',
      data: poem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch poem',
    });
  }
};

export const deletePoem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPoem = await Poem.findByIdAndDelete(id);

    if (!deletedPoem) {
      return res.status(404).json({
        success: false,
        message: 'Poem not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Poem deleted successfully',
      data: deletedPoem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete poem',
    });
  }
};
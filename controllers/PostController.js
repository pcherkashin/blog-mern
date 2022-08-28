import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
    const posts = await PostModel.find().populate('user').exec();
    
    res.json(posts);
} catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'No post found',
    });
    }    
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
    PostModel.findOneAndUpdate(
        {
        _id: postId,
        }, 
        {
        $inc: { viewsCount: 1 },
        }, 
        {
        returnDocument: 'after',
        }, 
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'No ability to return article',
                });
            }

        if (!doc) {
        return res.status(404).json({
            message: 'No post found',
        });
    }

    res.json(doc);
    },
    );
    
} catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'No post found',
    });
    }    
};
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findOneAndDelete({
            _id: postId,
        },
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'No ability to remove article',
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'No post found',
                });
            }

                res.json({
                    success: true,
                }); 
        }
        );
    
} catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'No post found',
    });
    }    
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageURL: req.body.imageURL,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to create post',
        });
    };
};
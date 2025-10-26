import { Response } from 'express';
import { AppDataSource } from '../config/database';
import { Post } from '../entities/Post';
import { Like } from '../entities/Like';
import { AuthRequest } from '../middleware/authMiddleware';

const postRepository = AppDataSource.getRepository(Post);
const likeRepository = AppDataSource.getRepository(Like);

export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const posts = await postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'like')
      .orderBy('post.createdAt', 'DESC')
      .getMany();

    const postsWithLikeCount = posts.map(post => ({
      id: post.id,
      message: post.message,
      userId: post.userId,
      createdAt: post.createdAt,
      likesCount: post.likes.length,
      isLikedByUser: post.likes.some(like => like.userId === req.user?.userId)
    }));

    res.json(postsWithLikeCount);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const post = postRepository.create({
      message: message.trim(),
      userId: req.user!.userId
    });

    await postRepository.save(post);

    res.status(201).json({
      id: post.id,
      message: post.message,
      userId: post.userId,
      createdAt: post.createdAt,
      likesCount: 0,
      isLikedByUser: false
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const likePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postId } = req.body;

    if (!postId) {
      res.status(400).json({ error: 'Post ID is required' });
      return;
    }

    const post = await postRepository.findOne({ where: { id: postId } });

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const existingLike = await likeRepository.findOne({
      where: {
        postId,
        userId: req.user!.userId
      }
    });

    if (existingLike) {
      await likeRepository.remove(existingLike);
      res.json({ message: 'Like removed', liked: false });
    } else {
      const like = likeRepository.create({
        postId,
        userId: req.user!.userId
      });

      await likeRepository.save(like);
      res.json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

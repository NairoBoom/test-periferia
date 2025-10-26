import { useState, useEffect, FormEvent } from 'react';
import { postsService, Post } from '../api/postsService';
import { usersService } from '../api/usersService';
import { useThemeStore } from '../store/themeStore';
import ParticleCanvas from '../components/ParticleCanvas';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { ToastContainer } from '../components/Toast';
import { LikeButton } from '../components/LikeButton';
import { Avatar } from '../components/Avatar';
import { EmptyState } from '../components/EmptyState';
import { TypingIndicator } from '../components/TypingIndicator';
import { TiltCard } from '../components/TiltCard';
import { useToast } from '../hooks/useToast';
import '../components/ParticleCanvas.css';
import './Posts.css';

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userMap, setUserMap] = useState<Record<string, any>>({});
  const [newPostMessage, setNewPostMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { theme } = useThemeStore();
  const { toasts, removeToast, success, error: showError } = useToast();

  const fetchPosts = async () => {
    try {
      const postsData = await postsService.getPosts();
      setPosts(postsData);

      const uniqueUserIds = [...new Set(postsData.map(post => post.userId))];
      const userPromises = uniqueUserIds.map(async (userId) => {
        try {
          const user = await usersService.getUserById(userId);
          return { userId, user };
        } catch {
          return { userId, user: null };
        }
      });

      const userData = await Promise.all(userPromises);
      const userMapping = userData.reduce((acc, { userId, user }) => {
        if (user) acc[userId] = user;
        return acc;
      }, {} as Record<string, any>);

      setUserMap(userMapping);
    } catch (err) {
      showError('Error al cargar las publicaciones');
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPostMessage.trim()) return;

    setLoading(true);

    try {
      await postsService.createPost({ message: newPostMessage });
      setNewPostMessage('');
      setIsTyping(false);
      await fetchPosts();
      success('¡Publicación creada exitosamente!');
    } catch (err) {
      showError('Error al crear la publicación');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await postsService.likePost(postId);
      await fetchPosts();
    } catch (err) {
      showError('Error al dar like');
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="posts-container particle-container">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <ParticleCanvas
        particleCount={50}
        connectionDistance={100}
        mouseRadius={120}
        particleSpeed={0.3}
        className="posts-particles"
        theme={theme}
      />
      <div className="posts-content particle-content">
        <div className="create-post-section">
          <h2>Crear Publicación</h2>
          <form onSubmit={handleSubmit} className="create-post-form">
            <textarea
              value={newPostMessage}
              onChange={handleTextChange}
              placeholder="¿Qué estás pensando?"
              rows={4}
              required
              disabled={loading}
            />
            <TypingIndicator show={isTyping && !loading} />
            <button type="submit" disabled={loading || !newPostMessage.trim()}>
              {loading ? 'Publicando...' : 'Publicar'}
            </button>
          </form>
        </div>

        <div className="posts-list">
          <h2>Publicaciones</h2>
          {initialLoading ? (
            <SkeletonLoader type="post" count={3} />
          ) : posts.length === 0 ? (
            <EmptyState
              title="No hay publicaciones aún"
              message="Sé el primero en compartir algo con la comunidad. ¡Crea tu primera publicación!"
              icon="posts"
            />
          ) : (
            posts.map((post) => {
              const user = userMap[post.userId];
              const fullName = user ? `${user.firstName} ${user.lastName}` : 'Usuario';

              return (
                <TiltCard key={post.id} maxTilt={5} scale={1.02}>
                  <div className="post-card">
                    <div className="post-header">
                      <div className="post-user-info" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Avatar name={fullName} size="medium" />
                        <div>
                          <span className="user-alias">
                            {user?.alias || 'Usuario'}
                          </span>
                          <span className="user-full-name">{fullName}</span>
                        </div>
                      </div>
                      <span className="post-date">{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="post-content">
                      <p>{post.message}</p>
                    </div>
                    <div className="post-actions">
                      <LikeButton
                        isLiked={post.isLikedByUser}
                        likesCount={post.likesCount}
                        onLike={() => handleLike(post.id)}
                      />
                    </div>
                  </div>
                </TiltCard>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;

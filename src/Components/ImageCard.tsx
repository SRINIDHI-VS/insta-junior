import React, { useState } from 'react';
import { Comment, Image } from '../types';

interface ImageCardProps {
    image: Image;
    liked: boolean;
    onLike: (id: number) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, liked, onLike }) => {
    const [commentText, setCommentText] = useState<string>('');
    const [replyText, setReplyText] = useState<string>('');
    const [currentCommentId, setCurrentCommentId] = useState<number | null>(null);

    const handleAddComment = () => {
        if (!commentText) return;
        const newComment: Comment = {
            id: Date.now(),
            name: JSON.parse(localStorage.getItem('user') || '{}').name || 'Guest',
            body: commentText,
            replies: []
        };
        image.comments.push(newComment);
        setCommentText('');
    };

    const handleAddReply = () => {
        if (!replyText || currentCommentId === null) return;
        const comment = image.comments.find((c) => c.id === currentCommentId);
        if (comment) {
            comment.replies.push({
                id: Date.now(),
                name: JSON.parse(localStorage.getItem('user') || '{}').name || 'Guest',
                body: replyText,
                replies: [],
            });
        }
        setReplyText('');
        setCurrentCommentId(null);
    };


    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src={image.url} alt="Image" className="w-full h-64 object-cover rounded-lg" />
            <button
                onClick={() => onLike(image.id)}
                className={`mt-3 bg-red-500 text-white p-2 rounded-full w-full ${liked ? 'bg-gray-500' : ''}`}
            >
                {liked ? `Unlike (${image.likes})` : `Like (${image.likes})`}
            </button>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full mt-4 p-2 border border-gray-300 rounded-lg"
                placeholder="Add a comment"
            />
            <button
                onClick={handleAddComment}
                className="mt-2 w-full bg-green-500 text-white p-2 rounded-lg"
            >
                Add Comment
            </button>

            {image.comments.map((comment) => (
                <div key={comment.id} className="mt-4 border-t pt-4">
                    <p className="font-semibold text-gray-800">{comment.name}</p>
                    <p className="text-gray-600">{comment.body}</p>
                    {comment.replies.map((reply) => (
                        <div key={reply.id} className="ml-4 mt-2 border-t pt-2">
                            <p className="font-semibold text-gray-700">{reply.name}</p>
                            <p className="text-gray-600">{reply.body}</p>
                        </div>
                    ))}
                    <button
                        onClick={() => setCurrentCommentId(comment.id)}
                        className="text-blue-500 mt-2"
                    >
                        Reply
                    </button>
                    {currentCommentId === comment.id && (
                        <div className="mt-2">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Add a reply"
                            />
                            <button
                                onClick={handleAddReply}
                                className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
                            >
                                Add Reply
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ImageCard;


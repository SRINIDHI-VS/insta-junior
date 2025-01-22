import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../../services/firebaseConfig';
import ImageCard from './ImageCard';
import Loader from '../common/Loader';

interface Comment {
    id: number;
    name: string;
    body: string;
    replies: Comment[];
}

interface Image {
    id: number;
    url: string;
    likes: number;
    comments: Comment[];
}

const ImageGallery: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                const imagesData: Image[] = Array.from({ length: 50 }, (_, i) => ({
                    id: i,
                    url: `https://picsum.photos/800/600?random=${i}`,
                    likes: 0,
                    comments: []
                }));
                setImages(imagesData);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    const handleLike = (id: number) => {
        setLikedImages((prev) => {
            const updated = new Set(prev);
            if (updated.has(id)) {
                updated.delete(id);
                updateImageLikes(id, -1);
            } else {
                updated.add(id);
                updateImageLikes(id, 1);
            }
            return updated;
        });
    };

    const updateImageLikes = (id: number, increment: number) => {
        setImages((prevImages) =>
            prevImages.map((image) =>
                image.id === id ? { ...image, likes: image.likes + increment } : image
            )
        );
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('user');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="p-14 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Insta Junior</h1>
                <h5 className="text-2xl font-bold text-red-500">
                    Welcome {JSON.parse(localStorage.getItem('user') || '{}').name || 'Guest'}
                </h5>
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white p-2 w-20 rounded-full"
                >
                    Logout
                </button>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <ImageCard
                            key={image.id}
                            image={image}
                            liked={likedImages.has(image.id)}
                            onLike={handleLike}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
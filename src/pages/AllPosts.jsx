import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/conf_service';
import { Container, PostCard, Loader } from '../components';
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteService
      .getPosts([
        Query.equal('userId', userData.$id),
        Query.orderDesc('$updatedAt'),
      ])
      .then((res) => {
        if (res) {
          setPosts(res.documents);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  } else if (posts.length === 0) {
    return (
      <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
        <h1 className="text-xl font-medium px-4 text-center">
          You have not created any posts yet.{' '}
          <Link
            to="../add-post"
            className="text-light-purple underline underline-offset-2"
          >
            Create
          </Link>{' '}
          one now!
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="mx-auto max-w-[450px]">
          {posts.map((post) => (
            <PostCard {...post} key={post.id} statusToBeShown />
          ))}
        </div>
      </Container>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Container, Loader, PostCard } from '../components';
import appwriteService from '../appwrite/conf_service';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Query } from 'appwrite';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus) {
      async function fetchPosts() {
        try {
          const res = await appwriteService.getPosts([
            Query.equal('status', 'active'),
            Query.orderDesc('$updatedAt'),
          ]);
          if (res) {
            setPosts(res.documents);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [authStatus]);

  if (loading) {
    return <Loader />;
  } else if (!authStatus) {
    return (
      <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
        <h1 className="text-xl font-medium">
          <Link
            to="login"
            className="text-light-purple underline underline-offset-2"
          >
            Login
          </Link>{' '}
          to read posts
        </h1>
      </div>
    );
  } else if (posts.length === 0) {
    return (
      <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
        <h1 className="text-xl font-medium">
          No post available.{' '}
          <Link
            to="add-post"
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
            <PostCard {...post} key={post.id} />
          ))}
        </div>
      </Container>
    </div>
  );
}

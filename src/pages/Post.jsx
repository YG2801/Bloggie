import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/conf_service';
import { Button, Container, Loader } from '../components/index';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DummyAvatar from '../assets/dummy_avatar.jpg';
import { openModal } from '../store/modalSlice';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';

export default function Post() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      async function fetchPost() {
        try {
          const post = await appwriteService.getPost(slug);
          if (post) {
            const user = await appwriteService.getUser(post.userId);
            setPost({ ...post, user });
          } else navigate('/');
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchPost();
    } else navigate('/');
  }, [slug, navigate]);

  const handleDelete = () => {
    dispatch(
      openModal({
        purpose: 'delete',
        action: 'DELETE_POST',
        params: {
          $id: post.$id,
          featuredImage: post.featuredImage,
        },
      })
    );
  };

  return post ? (
    <>
      <div className="w-full py-8">
        <Container>
          <div className="mx-auto max-w-[600px]">
            <h1 className="text-center text-2xl font-semibold text-gray-800 md:text-start md:text-3xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 px-3 py-2">
              <img
                src={
                  (post?.user?.avatar &&
                    appwriteService.getFilePreview(post.user.avatar)) ||
                  DummyAvatar
                }
                alt="avatar"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div>{post?.user?.name}</div>
            </div>
            <div className="mt-2 flex flex-col  justify-between md:flex-row md:items-end">
              <p className=" text-sm leading-none text-gray-500">
                Last updated at:{' '}
                <span>{new Date(post.$updatedAt).toLocaleString()}</span>
              </p>
              {isAuthor && (
                <div className="mt-4 flex self-center text-center md:mt-0 md:self-end">
                  <Link to={`/edit-post/${post.$id}`} className="mr-3">
                    <Button className="flex w-[100px] items-center justify-center gap-1">
                      <BiEditAlt />
                      <p>Edit</p>
                    </Button>
                  </Link>
                  <Button
                    className="flex items-center justify-center gap-1"
                    onClick={handleDelete}
                  >
                    <RiDeleteBin6Line /> <p>Delete</p>
                  </Button>
                </div>
              )}
            </div>
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="mt-6 w-full"
            />
            <div className="mt-4 text-justify">{parse(post.body)}</div>
          </div>
        </Container>
      </div>
    </>
  ) : loading ? (
    <Loader />
  ) : null;
}

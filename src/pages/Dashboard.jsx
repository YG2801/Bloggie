import React, { useEffect, useRef, useState } from 'react';
import service from '../appwrite/conf_service';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button } from '../components';
import DummyAvatar from '../assets/dummy_avatar.jpg';
import { toast } from 'react-toastify';
import { login } from '../store/authSlice';
import { RiEdit2Fill } from 'react-icons/ri';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { Query } from 'appwrite';

function Dashboard() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const imageUploadInputRef = useRef(null);
  const imageChangeInputRef = useRef(null);
  const bioInputRef = useRef(null);
  const [updateBio, setUpdateBio] = useState(false);
  const [totalUserPosts, setTotalUserPosts] = useState(null);

  useEffect(() => {
    if (userData?.userDetails) {
      // create an IIFE
      (async () => {
        const posts = await service.getPosts([
          Query.equal('userId', userData.userDetails.$id),
        ]);
        setTotalUserPosts(posts.documents.length);
      })();
    }
  }, [userData]);

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    try {
      const fileData = await service.uploadFile(file);
      console.log({ ...userData.userDetails });
      const updatedUser = await service.updateUser(userData.userDetails.$id, {
        name: userData.userDetails.name,
        email: userData.userDetails.email,
        bio: userData.userDetails.bio,
        avatar: fileData.$id,
      });
      if (updatedUser) {
        dispatch(
          login({ userData: { ...userData, userDetails: updatedUser } })
        );
        toast.success('Avatar updated successfully!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    try {
      const fileData = await service.uploadFile(file);
      if (fileData) {
        service.deleteFile(userData.userDetails.avatar);
      }
      const updatedUser = await service.updateUser(userData.userDetails.$id, {
        name: userData.userDetails.name,
        email: userData.userDetails.email,
        bio: userData.userDetails.bio,
        avatar: fileData.$id,
      });
      if (updatedUser) {
        dispatch(
          login({ userData: { ...userData, userDetails: updatedUser } })
        );
        toast.success('Avatar updated successfully!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateBio = async () => {
    try {
      const updatedUser = await service.updateUser(userData.userDetails.$id, {
        name: userData.userDetails.name,
        email: userData.userDetails.email,
        bio: bioInputRef.current.value || 'No bio available.',
        avatar: userData.userDetails.avatar,
      });
      if (updatedUser) {
        dispatch(
          login({ userData: { ...userData, userDetails: updatedUser } })
        );
        toast.success('Bio updated successfully!');
        setUpdateBio(false);
      }
    } catch (error) {
      toast.error(error.message);
      bioInputRef.current.value = bioInputRef.current.defaultValue;
      setUpdateBio(false);
    }
  };

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:gap-20">
          <div className="flex flex-col items-center gap-6">
            <div className="h-[300px] w-[300px] rounded-full">
              <img
                src={
                  (userData?.userDetails?.avatar &&
                    service.getFilePreview(userData.userDetails.avatar)) ||
                  DummyAvatar
                }
                alt="avatar"
                className="h-full w-full rounded-full"
              />
            </div>
            {userData?.userDetails?.avatar ? (
              <>
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  ref={imageChangeInputRef}
                  className="hidden"
                  onChange={handleChangeAvatar}
                />
                <Button
                  onClick={() => {
                    imageChangeInputRef.current.click();
                  }}
                >
                  Change avatar
                </Button>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  ref={imageUploadInputRef}
                  className="hidden"
                  onChange={handleUploadAvatar}
                />
                <Button
                  onClick={() => {
                    imageUploadInputRef.current.click();
                  }}
                >
                  Upload avatar
                </Button>
              </>
            )}
            {totalUserPosts !== null && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Total posts: {totalUserPosts}
                </h2>
              </div>
            )}
          </div>
          <div className="md:mt-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              {userData?.userDetails?.name}
            </h1>
            <p className="text-gray-500">{userData?.userDetails?.email}</p>
            <div className="mt-6">
              <div className="flex justify-end">
                {updateBio ? (
                  <div className="flex gap-2">
                    <Button
                      className="rounded-md"
                      bgColor="bg-red-600"
                      hoverBgColor="hover:bg-red-700"
                      onClick={() => {
                        setUpdateBio(false);
                        bioInputRef.current.value =
                          bioInputRef.current.defaultValue;
                      }}
                    >
                      <ImCross />
                    </Button>
                    <Button
                      className="rounded-md"
                      bgColor="bg-green-600"
                      hoverBgColor="hover:bg-green-700"
                      onClick={() => {
                        if (!bioInputRef.current.value.length) {
                          bioInputRef.current.value = 'No bio available.';
                        }
                        handleUpdateBio();
                      }}
                    >
                      <FaCheck />
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="rounded-md"
                    onClick={() => {
                      setUpdateBio(true);
                    }}
                  >
                    <RiEdit2Fill />
                  </Button>
                )}
              </div>
              <textarea
                name="bio"
                defaultValue={userData?.userDetails?.bio}
                maxLength={500}
                readOnly={!updateBio}
                className={`mt-2 h-[200px] w-full resize-none rounded-md text-gray-700 outline-none md:h-[300px] md:w-[550px] ${
                  updateBio ? 'bg-white/50 p-4 shadow-lg' : 'bg-transparent'
                }`}
                ref={bioInputRef}
              ></textarea>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;

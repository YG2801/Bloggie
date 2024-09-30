import service from '../appwrite/conf_service';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import DummyAvatar from '../assets/dummy_avatar.jpg';

export default function PostCard({
  $id,
  title,
  body,
  featuredImage,
  $updatedAt,
  user,
  status,
  statusToBeShown = false,
}) {
  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (days < 7) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (weeks < 4) {
      return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    } else if (months < 12) {
      return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
      return `${years} year${years === 1 ? '' : 's'} ago`;
    }
  }

  return (
    <div className="mb-4 w-full rounded-sm bg-white text-gray-700 transition hover:brightness-90">
      <Link to={`/post/${$id}`}>
        <div className="flex items-center gap-4 px-3 py-2">
          <img
            src={
              (user?.avatar && service.getFilePreview(user?.avatar)) ||
              DummyAvatar
            }
            alt="avatar"
            className="h-[50px] w-[50px] rounded-full"
          />
          <div>{user?.name}</div>
        </div>
        <div className="flex max-h-fit min-h-[300px] w-full items-center justify-center bg-gray-100">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="w-full rounded-sm"
          />
        </div>
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">{title}</p>
            {statusToBeShown && (
              <p
                className={`px-3 py-1 ${
                  status === 'active' ? 'bg-green-600' : 'bg-red-600'
                } h-fit rounded text-gray-50`}
              >
                {status === 'active' ? 'Published' : 'Draft'}
              </p>
            )}
          </div>
          <h2 className="truncate-2-lines mt-2 text-sm text-gray-600">
            {parse(body)}
          </h2>
          <p className="mt-1 text-xs text-gray-500">{timeAgo($updatedAt)}</p>
        </div>
      </Link>
    </div>
  );
}

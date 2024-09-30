import appwriteService from '../appwrite/conf_service';
import { toast } from 'react-toastify';

export async function deletePost($id, featuredImage) {
  try {
    const status = await appwriteService.deletePost($id);
    if (status) {
      appwriteService.deleteFile(featuredImage);
      toast.success('Post deleted successfully!');
    }
  } catch (error) {
    toast.error(error.message);
    throw Error(error);
  }
}

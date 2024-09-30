import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { deletePost } from '../store/modalActions';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../store/modalSlice';

function Modal() {
  const dispatch = useDispatch();
  const { showModal, purpose, action, params } = useSelector(
    (state) => state.modal
  );
  const navigate = useNavigate();

  const onCancel = () => {
    dispatch(closeModal());
  };

  const onConfirm = async () => {
    switch (action) {
      case 'DELETE_POST':
        try {
          await deletePost(params.$id, params.featuredImage);
          navigate('/');
        } catch (error) {
          console.log(error);
        }
        break;
    }
    dispatch(closeModal());
  };

  return (
    <div
      className={`fixed left-0 top-0 z-[1000] flex h-full w-full items-center justify-center bg-black bg-opacity-30 ${
        showModal ? 'visible opacity-100 ' : 'invisible opacity-0'
      } transition-all duration-200`}
    >
      <div className="w-[300px] rounded-md bg-white px-6 pb-6 pt-3 md:w-[400px]">
        <div className="flex justify-end">
          <button onClick={onCancel} className="text-xl">
            <RxCross2 />
          </button>
        </div>
        <p className="mt-2 text-center text-xl text-gray-800">Are you sure?</p>
        <p className="mt-2 text-center leading-tight text-gray-500">
          Do you really want to {purpose} this? This process cannot be undone.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

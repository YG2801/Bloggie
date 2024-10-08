import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import config from '../config/config';

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 inline-block pl-1">{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={config.tinymceApiKey}
            init={{
              plugins:
                'anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount linkchecker',

              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject('See docs to implement AI Assistant')
                ),
            }}
            initialValue={defaultValue}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

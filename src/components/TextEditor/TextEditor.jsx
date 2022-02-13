import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react'

function TextEditor({height}) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
  return (
    <>
       <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="Type something"
         init={{
           height: height,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
     </>
  )
}

export default TextEditor
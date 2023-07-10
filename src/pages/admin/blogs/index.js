import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function mceEditor() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <Editor apiKey='3qzpfrz5r80f4sbgrtgsva36ytd2igqg3nt5i0wxr4ovsjsz'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 800,
                    // menubar: false,
                    plugins: [
                        "advlist",
                        "anchor",
                        "autolink",
                        "charmap",
                        "code",
                        "fullscreen",
                        "help",
                        "image",
                        "insertdatetime",
                        "link",
                        "lists",
                        "media",
                        "preview",
                        "searchreplace",
                        "table",
                        "visualblocks",
                        "powerpaste"
                    ],
                    toolbar:
                        "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                    skin: "snow", //Add these two options
                    icons: "thin",
                    file_picker_types: 'file image media',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}

export default mceEditor;
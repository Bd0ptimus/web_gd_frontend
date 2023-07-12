
import { connect } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import { Modal, Button, Row, Col, Form, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import moment from 'moment';


import mainStyles from '../../../index.module.scss';
import HeaderCpn from "@/components/layouts/headerCpn";
import FooterCpn from "@/components/layouts/footerCpn";
import blogsApi from '@/api/blogs';
function EditBlog({ data, JWT }) {
    const editorRef = useRef(null);
    const router = useRouter()
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogId, setBlogId] = useState(null);

    useEffect(() => {
        setBlogTitle(data.blog.data.blog.title);
        setBlogContent(data.blog.data.blog.content);
        setBlogId(data.blog.data.blog.id);
        console.log(data.blog.data.blog);
    }, [data]);

    function errorAlert(message) {
        toast.warning(`${message}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function successAlert(message) {
        toast.success(`${message}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const submitBlog = async () => {
        const data = new FormData();

        // data.append(`title`, blogTitle);
        data.append(`content`, editorRef.current.getContent());
        data.append(`blogId`, blogId);

        blogsApi.updateBlogs(data, JWT).then((response) => {
            console.log('response : ', response);
            if (response.data.errCode == 0) {
                successAlert('Chỉnh sửa bài viết thành công');
                // router.replace("/admin/blogs");
            } else {
                errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
            }
        }).catch((e) => {
            errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
            console.log(e)

        });
    }

    return (
        <>
            <div>
                <Head>
                    <title>Tạo blog</title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            </div>
            <div>
                <HeaderCpn></HeaderCpn>
                <div className={`${mainStyles.bodySec}`} >
                    <div className={`d-flex justify-content-center`} style={{ margin: 20 }}>
                        <h4>Chỉnh sửa bài viết</h4>
                    </div>
                    <div className="card">
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" placeholder="Tiêu đề blog" value={blogTitle} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Editor apiKey='3qzpfrz5r80f4sbgrtgsva36ytd2igqg3nt5i0wxr4ovsjsz'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={blogContent}
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
                            </Form.Group>
                            <div className="d-flex justify-content-center m-3">
                                <Button variant="secondary" onClick={submitBlog}>Xác nhận</Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <FooterCpn></FooterCpn>
                <ToastContainer />

            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    let data = {};
    let blogData = await blogsApi.getBlogs(context.query.slug);
    console.log('check block data : ', blogData.data);
    data.blog = blogData.data;
    return { props: { data } }
}

function mapStateToProps(state) {
    return { JWT: state.system.userJWT };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
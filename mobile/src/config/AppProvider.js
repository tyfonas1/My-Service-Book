import React, {createContext, useContext, useEffect, useState} from 'react';
import {api, func} from '../constants';
// import translations from './translations';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function AppProvider(props) {
  const {storeData, retrieveData, removeData} = func;
  //// INITIAL  ///
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [loggedIn, setloggedIn] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentRouteName, setCurrentRouteName] = useState(null);
  const [data] = useState([]);
  const [settings] = useState(null);
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [students, setStudents] = useState([]);
  const [tags, setTags] = useState([]);
  const [generalMedia, setGeneralMedia] = useState([]);
  const [postFilterType, setPostFilterType] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [postData, setPostData] = useState({
    content: '',
    family_visible: false,
    groups: [],
    media: [],
    tags: [],
  });

  // change postData fields for create post
  //////////////////////////////////////////////
  const postFieldsChange = (name, val, type) => {
    if (name === 'media') {
      const newData = postData[name];
      if (type === 'video') {
        setPostData({
          ...postData,
          [name]: [...newData, val],
        });
      } else if (type === 'pdf') {
        setPostData({
          ...postData,
          [name]: [...newData, val],
        });
      } else {
        setPostData({
          ...postData,
          [name]: [...newData, ...val],
        });
      }
    } else if (name === 'general') {
      const newData = postData[name];
      setPostData({
        ...postData,
        [name]: [...newData, val],
      });
    } else {
      setPostData({
        ...postData,
        [name]: val,
      });
    }
  };

  const studentSelection = val => {
    setStudents([...students, ...val]);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  // Clear Post Data
  //////////////////////////////

  useEffect(() => {
    if (currentRouteName === 'Home') {
      setPostData({
        ...postData,
        content: '',
        family_visible: false,
        groups: [],
        students: [],
        media: [],
        tags: [],
      });
      setStudents([]);
    }
  }, [currentRouteName]);

  /// INITIAL DATA

  const getInitialData = async () => {
    retrieveData('token').then(tkn => {
      if (tkn) {
        setToken(tkn);
        setloggedIn(true);
        getApiData(tkn);
        getFilteredPosts(null, tkn);
        getMe(tkn);
      } else {
        logOut();
      }
    });
    // retrieveData('user').then((usr) => {
    //   if (usr) {
    //     setUser(usr);
    //   }
    // });
    retrieveData('terms').then(trm => {
      if (trm) {
        setAcceptTerms(trm);
      }
    });
  };

  const callApi = async (
    url,
    tkn,
    method = 'GET',
    payload,
    isFormData = false,
  ) => {
    // setLoading(true);
    let resp;
    const methHeaders = {
      GET: {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'x-auth-token': tkn,
        },
      },
      POST: {
        method: method,
        headers: isFormData
          ? {
              'X-Requested-With': 'XMLHttpRequest',
              'x-auth-token': tkn,
            }
          : {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'x-auth-token': tkn,
            },
        body: isFormData ? payload : JSON.stringify({...payload}),
      },
      PATCH: {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'x-auth-token': token,
        },
        body: JSON.stringify({...payload}),
      },
      PUT: {
        method: method,
        headers: isFormData
          ? {
              'X-Requested-With': 'XMLHttpRequest',
              'x-auth-token': tkn,
            }
          : {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'x-auth-token': tkn,
            },
        body: isFormData ? payload : JSON.stringify({...payload}),
      },
      DELETE: {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'x-auth-token': tkn,
        },
      },
    }[method];

    try {
      await fetch(url, methHeaders)
        .then(response =>
          response.json().then(res => ({status: response.status, body: res})),
        )
        .then(myJson => {
          resp = myJson;
          if (myJson.status === 200) {
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
    return resp;
  };

  const getApiData = async tkn => {
    const urlA = `${api.url}groups/`;
    const urlB = `${api.url}settings/general-media`;
    const urlC = `${api.url}settings/tags`;

    await Promise.all([
      callApi(urlA, tkn).then(res => {
        if (res.status < 300) {
          setGroups(res.body);
        }
        setRefreshing(false);
      }), //Get all groups
      callApi(urlB, tkn).then(res => {
        if (res.status < 300) {
          setGeneralMedia(res.body);
        }
        setRefreshing(false);
      }), //Get all general media
      callApi(urlC, tkn).then(res => {
        if (res.status < 300) {
          setTags(res.body);
        }
        setRefreshing(false);
      }), //Get all tags
    ]);
  };

  // get me
  ////////////////////////////////////////////////////////////////

  const getMe = async tkn => {
    const urlA = `${api.url}users/me`;
    const res = await callApi(urlA, tkn);
    if (res && res.status < 300) {
      setUser(res.body);
    } else {
      setSnack(!snack);
      //   setSnackMsg(translations.POSTS[res?.body?.message]);
    }
    return res.status;
  };

  const getFilteredPosts = async (id, tkn) => {
    setPostFilterType(id);
    let filtered;
    if (id === 'myposts') {
      filtered = `${api.url}posts?my_posts=true`; //url my posts
    } else if (id) {
      filtered = `${api.url}posts?group_id=${id}`; //url by group
    } else {
      filtered = `${api.url}posts`; //url all posts
    }
    const res = await callApi(filtered, tkn); //Get posts
    if (res && res?.status < 300) {
      setPosts(res.body);
    }
  };

  ///////Refresh

  const onRefresh = () => {
    setRefreshing(true);
    getApiData(token);
    getFilteredPosts(postFilterType, token);
  };

  //////// LOGIN

  /**
   *
   * @param loginData
   */

  const login = async loginData => {
    setLoading(true);
    try {
      await fetch(`${api.url}user/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({...loginData}),
      })
        .then(response =>
          response.json().then(res => ({
            status: response.status,
            body: res,
          })),
        )
        .then(myJson => {
          setLoading(false);
          if (myJson.status === 200) {
            setUser(myJson.body);
            setToken(myJson.body.token);
            getApiData(myJson.body.token);
            getFilteredPosts(null, myJson.body.token);
            storeData('token', myJson.body.token);
            storeData('user', myJson.body);
            setloggedIn(true);
          } else {
            setLoading(false);
            // setSnackMsg(translations.LOGIN[myJson.body?.message]);
            setSnack(!snack);
            logOut();
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Create Post and empty postData
  //////////////////////////////////////////////////////////

  const handleEmptyPostData = () => {
    setPostData({
      ...postData,
      content: '',
      family_visible: false,
      groups: [],
      students: [],
      media: [],
      tags: [],
    });
  };

  const createPost = async () => {
    const formData = new FormData();
    const studentsIds = [];

    if (postData.groups.length < 1) {
      formData.append('groups', '');
    } else {
      postData.groups.map(gr => {
        gr.students.map(student => {
          if (student.selected) {
            studentsIds.push(student._id);
          }
        });

        formData.append('groups', gr._id);
      });
    }

    if (studentsIds.length > 0) {
      studentsIds.map(id => {
        formData.append('students', id);
      });
    } else {
      formData.append('students', '');
    }

    if (postData.tags.length < 1) {
      formData.append('tags', '');
    } else {
      postData.tags.map(tag => {
        formData.append('tags', tag._id);
      });
    }
    if (postData.media.length < 1) {
      formData.append('media', '');
    } else {
      postData.media.map(md => {
        const testMedia = md;
        const filename = testMedia.source
          ? testMedia.source.split('/').pop()
          : testMedia.url
          ? testMedia.url.split('/').pop()
          : testMedia.path.split('/').pop();
        let testImage = {
          uri: testMedia.path
            ? testMedia.path
            : testMedia.url
            ? testMedia.url
            : testMedia.source,
          type: testMedia.url
            ? `image/${md.url.split('.').pop()}`
            : testMedia.mime,
          name:
            md.mime === 'application/pdf'
              ? `${filename}.${md.mime.split('/').pop()}`
              : filename,
        };

        formData.append('media', testImage);
        // if (testMedia.thumbnail) {
        //   formData.append('thumbnail', testMedia.thumbnail);
        // }

        // const filename = md.path.split('/').pop();
        // med.push({
        //   uri: md.path,
        //   type: md.mime,
        //   name: filename,
        // });
      });
    }
    formData.append('content', postData.content);
    formData.append('family_visible', postData.family_visible);

    const urlA = `${api.url}posts`;
    const res = await callApi(urlA, token, 'POST', formData, true);

    if (res && res.status < 300) {
      setSnack(!snack);
      //   setSnackMsg(translations.POSTS[res?.body?.message]);
    } else {
      setSnack(!snack);
      //   setSnackMsg(translations.POSTS[res?.body?.message]);
    }
    return res.status;
  };

  // Delete a post
  /////////////////////////////////////////////////////////////////

  const handleDeletePost = async id => {
    await posts.filter(post => {
      if (id === post._id) {
        const filteredItems = posts.filter(item => item !== post);
        setPosts(filteredItems);
        deletePost(id);
      }
    });
  };

  const deletePost = async id => {
    const urlA = `${api.url}posts/${id}`;
    const res = await callApi(urlA, token, 'DELETE');
    if (res && res.status < 300) {
      setSnack(!snack);
      //   setSnackMsg(translations.POSTS[res?.body?.message]);
    } else {
      setSnack(!snack);
      //   setSnackMsg(translations.POSTS[res?.body?.message]);
    }
    return res.status;
  };

  // Edit Post
  /////////////////////////////////////////////////////////////

  const editPost = async id => {
    setLoading(true);
    const formData = new FormData();
    const studentsIds = [];
    if (postData.groups.length < 1) {
      formData.append('groups', '');
    } else {
      postData.groups.map(gr => {
        gr.students.map(student => {
          if (student.selected) {
            studentsIds.push(student._id);
          }
        });

        formData.append('groups', gr._id);
      });
    }

    if (studentsIds.length > 0) {
      studentsIds.map(ide => {
        formData.append('students', ide);
      });
    } else {
      formData.append('students', '');
    }
    if (postData.tags.length < 1) {
      formData.append('tags', '');
    } else {
      postData.tags.map(tag => {
        formData.append('tags', tag._id);
      });
    }
    if (postData.media.length < 1) {
      formData.append('media', '');
    } else {
      postData.media.map(md => {
        const testMedia = md;

        let filename;
        let media;
        if (testMedia?.source || testMedia?.path || testMedia?.url) {
          filename = testMedia.source
            ? testMedia.source.split('/').pop()
            : testMedia.path
            ? testMedia.path.split('/').pop()
            : testMedia.url.split('/').pop();
          media = {
            uri: testMedia.path
              ? testMedia.path
              : testMedia.source
              ? testMedia.source
              : testMedia.url,
            type: testMedia.url
              ? `image/${md.url.split('.').pop()}`
              : testMedia.mime,
            name:
              md.mime === 'application/pdf'
                ? `${filename}.${md.mime.split('/').pop()}`
                : filename,
          };

          formData.append('media', media);
        } else {
          filename = testMedia.split('/').pop();

          formData.append('media', testMedia);
        }
      });
    }

    formData.append('content', postData.content);
    formData.append('family_visible', postData.family_visible);

    const urlA = `${api.url}posts/${id}`;
    const res = await callApi(urlA, token, 'PUT', formData, true);
    if (res && res.status < 300) {
      setLoading(false);
      handleEmptyPostData();
      onRefresh();
      setSnack(!snack);
      //   setSnackMsg(translations.POSTS[res.body?.message]);
    } else {
      setSnack(!snack);
      //   setSnackMsg(translations.POSTS[res.body?.message]);
      setLoading(false);
    }
    return res.status;
  };

  const logOut = () => {
    setPosts([]);
    setGroups([]);
    setUser(null);
    setToken(null);
    removeData('token');
    removeData('user');
    setloggedIn(false);
  };

  //// SEND media
  return (
    <LocalStateProvider
      value={{
        token,
        snack,
        setSnack,
        snackMsg,
        loggedIn,
        refreshing,
        loading,
        setCurrentRouteName,
        data,
        user,
        settings,
        setUser,
        onRefresh,
        handleEmptyPostData,
        setSnackMsg,
        currentRouteName,
        postData,
        setPostData,
        posts,
        tags,
        setPosts,
        postFieldsChange,
        deletePost,
        editPost,
        setGeneralMedia,
        generalMedia,
        studentSelection,
        students,
        setStudents,
        callApi,
        logOut,
        // translations,
        handleDeletePost,
        setPostFilterType,
        postFilterType,
        getFilteredPosts,
        groups,
        login,
        createPost,
        acceptTerms,
        setAcceptTerms,
      }}>
      {props.children}
    </LocalStateProvider>
  );
}

function useAppContext() {
  // We use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export {AppProvider, useAppContext};

import React from 'react';
import './index.scss';

import state, {addPost, updatePostText} from "./redux/state";
import {rerenderApp} from "./render";

rerenderApp(state, addPost, updatePostText)
// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import '@/styles/markdown-body.css';
import '@/styles/yt.css';

import 'prism-themes/themes/prism-material-dark.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function(Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout);
}

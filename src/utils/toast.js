    // utils/toast.js
import toast from 'react-hot-toast';

toast.info = (msg, opts = {}) =>
  toast(msg, { icon: 'ℹ️', style: { borderLeft: '4px solid #3B82F6' }, ...opts });

toast.warning = (msg, opts = {}) =>
  toast(msg, { icon: '⚠️', style: { borderLeft: '4px solid #F59E0B' }, ...opts });

export default toast;
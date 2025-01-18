import {useRouter} from 'next/router';

import { motion } from 'framer-motion';

import s from './NotFound.module.css';

import {getLayout} from '@/components/layout/Layout';


const NotFound = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className={s.notFoundContainer}
    >
      <h1 className={s.title}>404</h1>
      <p className={s.description}>Страница не найдена</p>
      <button className={s.backButton} onClick={() => router.push('/')}>
                На главную
      </button>
    </motion.div>
  );
};

NotFound.getLayout = getLayout;
export default NotFound;

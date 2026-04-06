import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import ReadingProgress from '../components/ReadingProgress';
import { DIARY_ENTRIES, DIARY_NAV_SECTIONS } from '../config/journalContent';
import { useNavigationActions } from '../context/NavigationContext';

export { DIARY_NAV_SECTIONS as DIARY_SECTIONS };

/**
 * Development diary — module requirement: 5–8 entries (here: 6), first entry = project + aims + academic context.
 */
const Diary = () => {
  const { setSections } = useNavigationActions();

  useEffect(() => {
    setSections(DIARY_NAV_SECTIONS);
    return () => setSections([]);
  }, [setSections]);

  return (
    <>
      <ReadingProgress />

      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="page-container"
        id="diary"
        role="main"
        aria-label="Development diary"
      >
        <div id="main-content" />

        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Development diary</h1>
          <p className="page-subtitle">
            Six entries documenting the development of Echoes of Control — from project aims and academic
            context through video generation, scene iteration, Twine interface work, supervision, and
            reflections on the process. Written in a more direct voice than the essay. For milestones
            see Evolution; for theory in depth, see Research.
          </p>
        </motion.header>

        {DIARY_ENTRIES.map((post, index) => (
          <motion.article
            key={post.id}
            id={post.id}
            className="content-section journal-post"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + index * 0.05 }}
            aria-labelledby={`${post.id}-heading`}
          >
            <div className="card journal-post__card">
              <p className="journal-post__meta" style={{ marginBottom: '0.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                <span style={{ marginRight: '0.75rem' }}>Entry {index + 1} of {DIARY_ENTRIES.length}</span>
                {post.date && <time dateTime={post.date}>{post.date}</time>}
                {post.kind === 'opening' && (
                  <span style={{ marginLeft: '0.75rem' }} aria-label="Opening entry">· Opening</span>
                )}
              </p>
              <h2 id={`${post.id}-heading`}>{post.title}</h2>
              {post.paragraphs.map((para, i) => (
                <p key={i} className="journal-post__para">
                  {para}
                </p>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </>
  );
};

export default memo(Diary);

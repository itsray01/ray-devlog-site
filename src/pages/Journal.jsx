import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import ReadingProgress from '../components/ReadingProgress';
import { JOURNAL_POSTS, JOURNAL_NAV_SECTIONS } from '../config/journalContent';
import { useNavigation } from '../context/NavigationContext';

export { JOURNAL_NAV_SECTIONS as JOURNAL_SECTIONS };

/**
 * Journal — backfilled devlog: tools, prompts, Twine, hosting, reflection
 */
const Journal = () => {
  const { setSections } = useNavigation();

  useEffect(() => {
    setSections(JOURNAL_NAV_SECTIONS);
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
        id="journal"
        role="main"
        aria-label="Journal"
      >
        <div id="main-content" />

        <motion.header
          className="page-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>Journal</h1>
          <p className="page-subtitle">
            Process notes, tool choices, and reflections that did not fit neatly on other pages—written to backfill the story of how Echoes of Control was made.
          </p>
        </motion.header>

        {JOURNAL_POSTS.map((post, index) => (
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

export default memo(Journal);

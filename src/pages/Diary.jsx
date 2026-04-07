import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../constants/animations';
import ReadingProgress from '../components/ReadingProgress';
import { DIARY_ENTRIES, DIARY_NAV_SECTIONS } from '../config/journalContent';
import { useNavigationActions } from '../context/NavigationContext';
import '../styles/diary.css';

export { DIARY_NAV_SECTIONS as DIARY_SECTIONS };

/**
 * Development diary — 7 entries, first entry = project + aims + academic context.
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
            Seven entries documenting the development of Echoes of Control — from project aims and
            academic context through video generation, scene iteration, tool decisions, Twine interface
            work, supervision, and reflections on the process. Written in a more direct voice than the
            essay. For milestones see Evolution; for theory in depth, see Research.
          </p>
        </motion.header>

        {DIARY_ENTRIES.map((post, index) => {
          const entryNum = String(index + 1).padStart(2, '0');
          return (
            <motion.article
              key={post.id}
              id={post.id}
              className="content-section journal-post"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              aria-labelledby={`${post.id}-heading`}
            >
              <div
                className="card journal-post__card"
                data-entry-num={entryNum}
              >
                {/* Header: entry number left, date + badge right */}
                <div className="journal-post__header">
                  <div className="journal-post__entry-tag">
                    <span className="journal-post__entry-num" aria-hidden="true">
                      {entryNum}
                    </span>
                    <span className="journal-post__entry-of">
                      of {DIARY_ENTRIES.length}
                    </span>
                  </div>

                  <div className="journal-post__meta-right">
                    {post.date && (
                      <time className="journal-post__date" dateTime={post.date}>
                        {post.date}
                      </time>
                    )}
                    {post.kind === 'opening' && (
                      <span className="journal-post__badge" aria-label="Opening entry">
                        Opening
                      </span>
                    )}
                  </div>
                </div>

                <h2 id={`${post.id}-heading`}>
                  Entry {index + 1}: {post.title}
                </h2>

                {post.paragraphs.map((para, i) => (
                  <p key={i} className="journal-post__para">
                    {para}
                  </p>
                ))}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </>
  );
};

export default memo(Diary);

# How to Add Content to Your Digital Logbook

## 🎯 Adding Content to Story Development

### **Method 1: Static Content (Recommended for now)**

Edit the file: `src/pages/Home.jsx`

**To add new development entries, find the "Static Foundation content" section and add new `<motion.article>` blocks:**

```jsx
<motion.article 
  className="card note"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2 }} // Increment this delay for each new entry
  whileHover={{ 
    scale: 1.01,
    boxShadow: "0 0 25px rgba(138, 43, 226, 0.2)",
    transition: { duration: 0.2 }
  }}
>
  <h3>Your New Development Phase</h3>
  <small className="meta">v0.4 (Nov 2025)</small>
  
  <p><strong>What I did:</strong> Describe what you accomplished.</p>
  <p><strong>What wasn't working:</strong> Describe any challenges.</p>
  <p><strong>How I improved:</strong> Describe your solutions.</p>
  
  {/* Add images or media if needed */}
  <div className="media-row">
    <figure>
      <img src="/img/your-image.png" alt="Description" />
      <figcaption>Caption for your image</figcaption>
    </figure>
  </div>
</motion.article>
```

### **Method 2: Dynamic Content (Backend Required)**

If you want to use the backend server, you need to:

1. **Start the backend server** (in `server/` folder):
   ```bash
   cd server
   node index.js
   ```

2. **Add entries to** `data/devlog.json`:
   ```json
   {
     "entries": [
       {
         "version": "v0.4",
         "date": "2025-11-01",
         "title": "New Development Phase",
         "content": "Your content here...",
         "tags": ["development", "experiment"],
         "images": ["img/your-image.png"]
       }
     ]
   }
   ```

## 🎨 Customizing Grids

### **Storyboard Grid (2 high × 3 wide)**
Located in the Foundations section:
```jsx
<motion.div className="storyboard-grid">
  <div>Scene 1 Placeholder</div>
  <div>Scene 2 Placeholder</div>
  <div>Scene 3 Placeholder</div>
  <div>Scene 4 Placeholder</div>
  <div>Scene 5 Placeholder</div>
  <div>Scene 6 Placeholder</div>
</motion.div>
```

**To replace with real content:**
```jsx
<motion.div className="storyboard-grid">
  <img src="/img/storyboard-1.png" alt="Scene 1" />
  <img src="/img/storyboard-2.png" alt="Scene 2" />
  <img src="/img/storyboard-3.png" alt="Scene 3" />
  <img src="/img/storyboard-4.png" alt="Scene 4" />
  <img src="/img/storyboard-5.png" alt="Scene 5" />
  <img src="/img/storyboard-6.png" alt="Scene 6" />
</motion.div>
```

### **Veo3 Grid (1 high × 3 wide)**
Located in the Foundations section:
```jsx
<motion.div className="veo3-grid">
  <div>Frame 1 Placeholder</div>
  <div>Frame 2 Placeholder</div>
  <div>Frame 3 Placeholder</div>
</motion.div>
```

**To replace with real content:**
```jsx
<motion.div className="veo3-grid">
  <img src="/img/veo3-frame-1.png" alt="Veo3 Frame 1" />
  <img src="/img/veo3-frame-2.png" alt="Veo3 Frame 2" />
  <img src="/img/veo3-frame-3.png" alt="Veo3 Frame 3" />
</motion.div>
```

## 🖼️ Adding Images

### **Step 1: Add Images to Project**
1. Put your images in the `img/` folder
2. Use descriptive names like `storyboard-1.png`, `veo3-frame-1.png`

### **Step 2: Update References**
Replace placeholder `<div>` elements with `<img>` tags:
```jsx
// Instead of:
<div>Scene 1 Placeholder</div>

// Use:
<img src="/img/storyboard-1.png" alt="Scene 1: Opening shot" />
```

### **Step 3: Add Captions (Optional)**
Wrap images in `<figure>` elements for captions:
```jsx
<figure>
  <img src="/img/storyboard-1.png" alt="Scene 1" />
  <figcaption>Opening shot: Establishing the dystopian world</figcaption>
</figure>
```

## 📝 Content Structure Template

Use this structure for consistent entries:

```jsx
<motion.article className="card note">
  <h3>Phase/Experiment Title</h3>
  <small className="meta">v0.X (Month Year)</small>
  
  <p><strong>What I did:</strong> Brief description of your actions.</p>
  <p><strong>What wasn't working:</strong> Challenges you faced.</p>
  <p><strong>How I improved:</strong> Solutions and iterations.</p>
  
  {/* Optional: Lists */}
  <ul className="bullets">
    <li>Key point 1</li>
    <li>Key point 2</li>
    <li>Key point 3</li>
  </ul>
  
  {/* Optional: Media */}
  <div className="media-row">
    <figure>
      <img src="/img/your-image.png" alt="Description" />
      <figcaption>Caption</figcaption>
    </figure>
  </div>
</motion.article>
```

## 🎯 Quick Tips

### **Adding New Sections**
1. **Copy an existing article block**
2. **Change the title and content**
3. **Increment the animation delay** (transition={{ delay: 1.2 }})
4. **Update the version number** in the meta

### **Styling Classes Available**
- `.card` - Main card container
- `.note` - Additional card styling
- `.section-blur` - Frosted glass effect
- `.media-row` - Two-column image layout
- `.bullets` - Styled bullet list
- `.meta` - Version/date styling

### **Animation Delays**
Keep incrementing delays for smooth sequential animations:
- First article: `delay: 0.4`
- Second article: `delay: 1.0`
- Third article: `delay: 1.1`
- Fourth article: `delay: 1.2`
- etc.

## 🚀 Example: Adding a New Development Phase

```jsx
<motion.article 
  className="card note"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2 }}
  whileHover={{ 
    scale: 1.01,
    boxShadow: "0 0 25px rgba(138, 43, 226, 0.2)",
    transition: { duration: 0.2 }
  }}
>
  <h3>Advanced AI Integration</h3>
  <small className="meta">v0.4 (Nov 2025)</small>
  
  <p><strong>What I did:</strong> Integrated advanced AI models for more realistic character movements and facial expressions.</p>
  <p><strong>What wasn't working:</strong> The AI-generated characters felt too robotic and lacked emotional depth.</p>
  <p><strong>How I improved:</strong> Fine-tuned the prompts to focus on subtle micro-expressions and added post-processing for more human-like imperfections.</p>
  
  <ul className="bullets">
    <li>Tested 5 different AI models for character generation</li>
    <li>Created custom prompt templates for emotional states</li>
    <li>Added grain and noise filters for analog feel</li>
  </ul>
  
  <div className="media-row">
    <figure>
      <img src="/img/ai-character-1.png" alt="AI Character Test 1" />
      <figcaption>Initial AI-generated character</figcaption>
    </figure>
    <figure>
      <img src="/img/ai-character-2.png" alt="AI Character Test 2" />
      <figcaption>Refined character with emotional depth</figcaption>
    </figure>
  </div>
</motion.article>
```

---

**Your content will automatically get beautiful animations and hover effects!** 🎨✨

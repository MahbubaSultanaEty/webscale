# WebScale

A visual drag-and-drop page builder. Compose a landing page from ready-made sections, click any element to edit it, reorder and resize elements on the canvas, and have everything autosaved to MongoDB.

> **Status:** early MVP. The core builder and save/load work. Auth, publishing and multi-page support are not built yet (see [Roadmap](#roadmap)).

---

## Features

- **Visual builder UI:** TopBar, Sidebar (section picker), Canvas (live preview) and EditorPanel (properties).
- **6 section templates:** Hero, Features, Testimonials, FAQ, Gallery, CTA Banner.
- **5 editable elements:** heading, paragraph, button, image, card. Click an element to edit its content and styles.
- **Drag-and-drop reorder** of elements inside a section (powered by `@dnd-kit`), using a dedicated Move handle so click-to-edit still works.
- **Resize elements** from the four corner handles (width and height are stored in the element's `styles`).
- **Element actions:** right-click menu with Duplicate and Delete (Copy is a placeholder).
- **Section controls:** move up, move down, delete.
- **Persistence:** MongoDB page CRUD through the Express API, debounced autosave, and a `localStorage` fallback when the API is unreachable.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19 |
| Styling | CSS Modules, Tailwind CSS 4 |
| Drag and drop | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| Icons | `lucide-react` |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A running MongoDB instance (local or Atlas)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd webscale
npm install
```

### 2. Set up the server

The Express API listens on **port 5000** (the frontend calls `http://localhost:5000/api/pages`).

```bash
cd server          # adjust if your server folder has a different name
npm install
```

Create a `.env` file in the server folder with your MongoDB connection string:

```env
# TODO: use the variable names your server actually reads
MONGODB_URI=mongodb://localhost:27017/webscale
PORT=5000
```

Start the server:

```bash
npm run dev        # or: node index.js
```

### 3. Start the frontend

From the project root, in a second terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and go to `/builder`.

> If the server is not running, the builder still loads from `localStorage`, but changes are **not** saved to MongoDB.

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/builder` | The visual page builder |

### API (Express)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/pages` | List pages |
| GET | `/api/pages/:id` | Get one page |
| POST | `/api/pages` | Create a page |
| PUT | `/api/pages/:id` | Update a page (used by autosave) |

> TODO: confirm the exact endpoints against your server routes.

---

## Project Structure

```
src/
├── app/                      # Next.js routes (/ and /builder)
├── context/
│   └── BuilderContext.js     # Global builder state + actions + autosave
├── lib/
│   ├── sectionRegistry.js    # Section templates and their default elements
│   ├── elementRegistry.js    # Element types, default styles, editor fields
│   ├── generateId.js         # Unique id helper
│   ├── api.js                # API client (pages CRUD)
│   └── storage.js            # localStorage fallback
└── components/
    ├── builder/              # Canvas, SectionWrapper, ElementActionMenu, ...
    ├── renderer/
    │   ├── SectionRenderer.jsx
    │   ├── ElementRenderer.jsx       # useSortable + ElementWrapper
    │   └── SortableElementList.jsx   # DndContext + SortableContext
    ├── sections/             # Hero, Features, Testimonials, FAQ, Gallery, CTABanner
    └── elements/
        ├── ElementWrapper/   # Selection, drag handle, resize handles, badge
        ├── Heading/  Paragraph/  Button/  Image/  Card/
```

---

## How It Works

### Data model

A page is a list of sections, and each section is a list of elements:

```js
{
  name: 'My Page',
  sections: [
    {
      id: 'sec_xxx',
      type: 'Hero',
      styles: { backgroundColor: '#1a1a2e', paddingTop: 80, ... },
      props: { ... },
      elements: [
        {
          id: 'el_xxx',
          type: 'heading',
          content: { text: 'Build Something Amazing' },
          styles: { fontSize: 52, color: '#ffffff', width: '480px' }
        }
      ]
    }
  ]
}
```

### Registries

- `sectionRegistry` defines each section template: label, icon, component, default styles, `createDefaultElements()` and the editor fields.
- `elementRegistry` defines each element type: component, default content/styles and the editor fields.

To add a new element or section, register it in the matching file.

### Drag and drop

Every section renders its elements through `SortableElementList`, which provides the `DndContext` and `SortableContext`. Each element is wrapped by `ElementRenderer` (`useSortable`), and `ElementWrapper` renders the Move handle that receives the drag listeners.

Rules to keep in mind when adding or editing sections:

- Render elements with **one** `<SortableElementList />`. Do not wrap it in `elements.map(...)`, or the list renders multiple times and element ids duplicate.
- Every element id must be unique. Duplicate ids break selection, delete and drag.
- For grid layouts pass `strategy={rectSortingStrategy}`. If you pass a filtered subset of elements, also pass `allElements={section.elements}` so the reorder index is correct.

### Persistence

`BuilderContext` loads the first page from the API on startup, then autosaves (600 ms debounce) on every change and mirrors the page into `localStorage`. If the API is unavailable it falls back to `localStorage`.

---

## Roadmap

**Not built yet**

- [ ] Authentication and login
- [ ] Publish and public preview page
- [ ] Multi-page support (page picker; currently the first page always loads)
- [ ] Element palette to add new elements to a section
- [ ] Copy action in the element menu (UI placeholder)
- [ ] Moving elements between sections
- [ ] Project documentation for the API

**Known limitations**

- Resize stores a fixed `width` and `height` in px on the element.
- In sections with separate groups (for example heading vs cards), elements can only be reordered inside their own group.

---

## Scripts

| Command | Where | Description |
|---|---|---|
| `npm run dev` | project root | Start the Next.js dev server |
| `npm run build` | project root | Production build |
| `npm run dev` | server folder | Start the Express API |

---


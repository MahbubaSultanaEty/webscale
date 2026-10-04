# WebScale

WebScale is a demo **website builder / CMS**. You assemble a landing page from ready-made sections, click any element to edit its content and style, and the page is stored in MongoDB through a REST API, so it is still there when you come back.

> **Status:** early MVP. The builder, editing and save/load work end to end. Authentication, publishing and multi-page management are not built yet (see [Roadmap](#roadmap)).

---

## Features

### Page builder
- **Three-panel editor:** Sidebar (section picker), Canvas (live preview) and Editor Panel (properties), plus a TopBar with save status.
- **6 section templates:** Hero, Features, Testimonials, FAQ, Gallery, CTA Banner.
- **5 editable elements:** heading, paragraph, button, image, card. Select an element on the canvas to edit its text, links, colors, typography and spacing.
- **Section controls:** add, delete, move up and move down.
- **Element actions:** right-click menu with Duplicate and Delete (Copy is a placeholder).
- **Reorder and resize:** drag elements to reorder them inside a section, and resize them from the corner handles.

### CMS and persistence
- **MongoDB storage** through an Express REST API (full CRUD for pages).
- **Autosave:** changes are saved after a 600 ms debounce, with a status badge in the TopBar (Saving..., Saved, Save failed).
- **Manual Save / Load** buttons in the TopBar.
- **localStorage fallback** if the API is unreachable.
- **Safe icon storage:** Lucide icons are stored as string names (for example `'Flame'`) and mapped back to components when rendering, so page data stays JSON-serializable.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19 |
| Styling | CSS Modules, Tailwind CSS 4 |
| Drag and drop | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| Icons | `lucide-react` |
| Backend | Node.js, Express, CORS, dotenv |
| Database | MongoDB Atlas with Mongoose |

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A MongoDB database (MongoDB Atlas or a local instance)

### 1. Install dependencies

```bash
# frontend (project root)
npm install

# backend
cd server
npm install
cd ..
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/?appName=<app-name>
PORT=5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> Never commit `.env`. It contains your database credentials. Make sure `.env` is listed in `.gitignore`.

### 3. Run the backend (port 5000)

```bash
npm run server
# or, with file watching during development:
npm run server:dev
```

### 4. Run the frontend (port 3000)

In a second terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and go to `/builder`.

> If the backend is not running, the builder falls back to `localStorage`. Changes are then **not** saved to MongoDB.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run server` | Start the Express API |
| `npm run server:dev` | Start the Express API with `node --watch` |

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/builder` | The visual page builder |

---

## API

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | API health check |
| GET | `/pages` | Get all pages (latest updated first) |
| GET | `/pages/:id` | Get a page by ID |
| POST | `/pages` | Create a page |
| PUT | `/pages/:id` | Update a page (name and sections) |
| DELETE | `/pages/:id` | Delete a page |

Responses use the shape `{ "success": true, "data": ... }`. Invalid ObjectIds are rejected, and the server has 404 and 500 handlers.

The `Page` model stores `name` (String) and `sections` (Array), plus automatic `createdAt` and `updatedAt` timestamps.

---

## Project Structure

```
webscale/
├── server/
│   ├── config/db.js                 # Mongoose connection
│   ├── controllers/pageController.js # CRUD logic
│   ├── models/Page.js               # Page schema
│   ├── routes/pageRoutes.js         # /api/pages routes
│   ├── server.js                    # Express entry point
│   └── package.json
├── src/
│   ├── app/                         # Next.js routes (/ and /builder)
│   ├── components/
│   │   ├── builder/                 # BuilderLayout, Canvas, Sidebar, TopBar,
│   │   │                            # EditorPanel, SectionWrapper, ElementActionMenu
│   │   ├── renderer/                # SectionRenderer, ElementRenderer,
│   │   │                            # SortableElementList
│   │   ├── sections/                # Hero, Features, Testimonials, FAQ,
│   │   │                            # Gallery, CTABanner
│   │   └── elements/                # Heading, Paragraph, Button, Image, Card,
│   │                                # ElementWrapper
│   ├── context/BuilderContext.js    # Global state, actions, autosave
│   └── lib/
│       ├── api.js                   # API client
│       ├── storage.js               # API + localStorage fallback
│       ├── sectionRegistry.js       # Section templates
│       ├── elementRegistry.js       # Element types and editor fields
│       ├── iconMap.js               # Icon name -> Lucide component
│       └── generateId.js            # Unique id helper
├── .env
├── .gitignore
└── package.json
```

---

## How It Works

### Data model

A page is a list of sections. Each section is a list of elements:

```js
{
  name: 'My Page',
  sections: [
    {
      id: 'sec_xxx',
      type: 'Hero',
      styles: { backgroundColor: '#1a1a2e', paddingTop: 80 },
      props: {},
      elements: [
        {
          id: 'el_xxx',
          type: 'heading',
          content: { text: 'Build Something Amazing' },
          styles: { fontSize: 52, color: '#ffffff' }
        }
      ]
    }
  ]
}
```

### Registries

- `sectionRegistry` defines each section template: label, icon, component, default styles, `createDefaultElements()` and the editor fields.
- `elementRegistry` defines each element type: component, default content and styles, and the editor fields.

To add a new section or element type, register it in the matching file.

### Persistence flow

1. On load, `BuilderContext` calls `getPages()`. If a page exists it loads that page's `_id`, `name` and `sections`. If none exists it creates a default page.
2. An `isLoadedRef` guard stops the initial empty state from overwriting the database.
3. Every change to `sections` triggers a debounced `PUT /api/pages/:id`, and the TopBar badge shows the save status.
4. If the API call fails on load, the page is read from `localStorage` instead.

### Drag and drop and resize

Every section renders its elements through a single `<SortableElementList />`, which provides the `DndContext` and `SortableContext`. Each element is wrapped by `ElementRenderer` (`useSortable`), and `ElementWrapper` renders the Move handle and the four resize handles. Resize saves `width` and `height` into the element's `styles`.

Notes for contributors adding sections:

- Render elements with one `<SortableElementList />`. Do not wrap it in `elements.map(...)`, or the list renders multiple times and element ids duplicate.
- Element ids must be unique, otherwise selection, delete and drag break.
- For grid layouts pass `strategy={rectSortingStrategy}`. If you pass a filtered subset of elements, also pass `allElements={section.elements}` so the reorder index is correct.

---

## Roadmap

**Not built yet**

- [ ] Authentication and user accounts (all endpoints are currently public)
- [ ] Publish flow and public preview page
- [ ] Multi-page dashboard and page picker (the builder always loads the first page)
- [ ] Element palette to add new elements to a section
- [ ] Copy action in the element menu (UI placeholder)
- [ ] Moving elements between sections

**Known limitations**

- In sections with separate groups (for example heading vs cards), elements can only be reordered inside their own group.
- Resize stores fixed pixel `width` and `height` values.

---

## License

TODO: add a license.
# Harshdeep Web Studios Backend (Next.js 13 App Router + MongoDB + Mongoose + NextAuth)

I need you to generate a **complete backend setup** for my Next.js 13 (App Router) project using MongoDB and Mongoose.  
I already have `app/api/` folder and `lib/` folder in root.  

### 📁 Required Project Structure

- `lib/db.js` → MongoDB connection using Mongoose
- `models/` (Mongoose models for each collection)
  - `User.js`
  - `Project.js`
  - `Post.js`
  - `Service.js`
  - `Pricing.js`
  - `Testimonial.js`
  - `Team.js`
  - `FAQ.js`
  - `Contact.js`
- `controllers/` (business logic functions)
  - `userController.js`
  - `projectController.js`
  - `postController.js`
  - `serviceController.js`
  - `pricingController.js`
  - `testimonialController.js`
  - `teamController.js`
  - `faqController.js`
  - `contactController.js`
- `app/api/` (API routes calling controllers)
  - `/users/[id]/route.js`
  - `/projects/[id]/route.js`
  - `/posts/[id]/route.js`
  - `/services/[id]/route.js`
  - `/pricing/[id]/route.js`
  - `/testimonials/[id]/route.js`
  - `/team/[id]/route.js`
  - `/faq/[id]/route.js`
  - `/contacts/[id]/route.js`
- `utils/` (helper functions like `auth.js`, error handling, response formatting)

### 🔑 Requirements

1. Use **Mongoose** for schema and models.
2. Use **controllers** for separating business logic from routes.
3. CRUD APIs for each model:
   - GET all
   - GET by id/slug
   - POST (create)
   - PUT (update)
   - DELETE (remove)
4. Protect admin-only routes with authentication (NextAuth).
5. Contact form should just **store message in DB** + return success.
6. All routes must return JSON responses (`{ success, data, message }`).
7. Code should be clean, modular, bug-free, and production ready.

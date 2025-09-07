# API Configuration Guide

## 🔄 Switching Between Mock API and Real API

Dự án hiện tại được cấu hình để sử dụng Mock API cho việc testing và development. Để chuyển đổi giữa Mock API và Real API, làm theo hướng dẫn dưới đây:

### 📋 Current Configuration

File: `src/types/api.ts`

```typescript
const USE_MOCK_API = true; // Set to false when backend is ready
```

### 🧪 Mock API (Current - For Testing)

**Advantages:**
- ✅ Không cần backend server
- ✅ Có thể test toàn bộ UI/UX
- ✅ Simulate API delays và error handling
- ✅ Data persists trong session (không save vào database)

**Features Available:**
- Create, Read, Update, Delete Ideas
- Create, Read, Update, Delete Comments  
- Search và filter Ideas
- Realistic API delays (200-500ms)

### 🌐 Real API (For Production)

**To Enable Real API:**

1. **Update API Configuration:**
   ```typescript
   // In src/types/api.ts
   const USE_MOCK_API = false;
   ```

2. **Set Backend URL:**
   ```bash
   # In .env file
   VITE_API_URL=http://your-backend-server:port/api
   ```

3. **Ensure Backend Endpoints Match:**
   - `GET /api/ideas` - Get ideas with query params
   - `POST /api/ideas` - Create new idea
   - `PUT /api/ideas/:id` - Update idea
   - `DELETE /api/ideas/:id` - Delete idea
   - `GET /api/ideas/:id` - Get idea by ID
   - `GET /api/ideas/:ideaId/comments` - Get comments for idea
   - `POST /api/ideas/:ideaId/comments` - Create comment
   - `PUT /api/comments/:commentId` - Update comment
   - `DELETE /api/comments/:commentId` - Delete comment

### 🗃️ Database Schema Expected

**Ideas Table:**
```sql
- id (string/varchar)
- title (string)
- description (text)
- status ('new' | 'in-progress' | 'completed')
- tags (array/json)
- category (string)
- createdAt (datetime)
- createdBy (string)
- googleDocUrl (string, optional)
```

**Comments Table:**
```sql
- comment_id (int, primary key)
- idea_id (int, foreign key)
- user_id (int, foreign key) 
- comment_text (text)
- created_at (datetime)
```

### 🔧 Mock Data Files

- `src/mocks/mockIdeas.ts` - Sample ideas data
- `src/mocks/mockComments.ts` - Sample comments data
- `src/services/mockApi.ts` - Mock API implementation

### 📱 Testing Instructions

**With Mock API (Current):**
1. Start frontend: `npm run dev`
2. Navigate to `/app/idealist`
3. Test all CRUD operations
4. Test comments on ideas
5. Data will reset on page refresh

**With Real API:**
1. Start backend server
2. Set `USE_MOCK_API = false`
3. Update `VITE_API_URL` in .env
4. Start frontend: `npm run dev`
5. Test with persistent data

### 🚨 Error Handling

Both Mock API và Real API implement proper error handling:
- Network errors
- Not found errors  
- Validation errors
- Loading states
- User feedback messages

### 🔄 Quick Switch Commands

**Enable Mock API:**
```bash
# Set in src/types/api.ts
const USE_MOCK_API = true;
```

**Enable Real API:**
```bash
# Set in src/types/api.ts  
const USE_MOCK_API = false;
# And update .env
echo "VITE_API_URL=http://localhost:3001/api" > .env
```

---

## 📊 Mock Data Structure

### Sample Idea:
```typescript
{
  id: "1",
  title: "AI-powered Customer Support",
  description: "Implement chatbot for 24/7 customer service",
  status: "new",
  tags: ["AI", "Customer Service", "Automation"],
  category: "Technology",
  createdAt: new Date(),
  createdBy: "John Doe"
}
```

### Sample Comment:
```typescript
{
  comment_id: 1,
  idea_id: 1,
  user_id: 1,
  comment_text: "Great idea! This could really improve our response time.",
  created_at: new Date(),
  author: "Jane Smith"
}
```

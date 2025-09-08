# Mock API Usage Guide

## 🎯 Mục đích
Mock API được tạo để test các component frontend mà không cần backend thật. Đặc biệt hữu ích cho:
- Test offline
- Development nhanh
- Demo features
- Unit testing

## 🚀 Cách sử dụng

### 1. Bật/Tắt Mock API
Mở file `/src/services/api.ts` và điều chỉnh:

```typescript
const USE_MOCK_API = true;  // Bật Mock API
const USE_MOCK_API = false; // Tắt Mock API (sử dụng real backend)
```

### 2. Cấu trúc Mock API

#### 📁 Files liên quan:
- `/src/services/api.ts` - API wrapper với toggle Mock/Real
- `/src/services/mockApi.ts` - Mock API implementation
- `/src/mocks/mockIdeas.ts` - Mock data cho ideas

## 📊 Mock Data có sẵn

### Ideas Data
- **Tổng cộng**: 25+ ideas
- **Categories**: 'content', 'marketing', 'event' 
- **Status**: 'new', 'in-progress', 'completed'
- **ID range**: '1' đến '25'

### Ví dụ Mock Idea:
```typescript
{
  idea_id: '1',
  title: 'Tổ chức cuộc thi viết sáng tạo',
  description: 'Cuộc thi dành cho sinh viên với chủ đề tự do...',
  status: 'new',
  tags: ['sáng tạo', 'sinh viên'],
  category: 'content',
  createdAt: new Date('2025-08-14'),
  createdBy: 'Nguyễn Văn A',
  googleDocUrl: 'https://docs.google.com/document/d/abc123'
}
```

## ⚡ Mock API Features

### 1. Idea Operations
```typescript
// Lấy danh sách ideas với filter
ideaApi.getIdeas({
  search: 'tổ chức',
  status: 'new',
  category: 'content',
  tags: ['sáng tạo']
})

// Lấy idea theo ID
ideaApi.getIdeaById('1')

// Tạo idea mới
ideaApi.createIdea({
  title: 'Idea mới',
  description: 'Mô tả',
  category: 'content',
  tags: ['tag1', 'tag2']
})

// Cập nhật idea
ideaApi.updateIdea('1', formData)

// Xóa idea
ideaApi.deleteIdea('1')
```

### 2. Realistic Behavior
- **Network Delay**: 500ms delay để simulate real API
- **Error Handling**: Throw errors khi không tìm thấy data
- **Data Persistence**: Changes persist trong session (không save vào localStorage)
- **Filtering**: Hỗ trợ search, filter theo status, category, tags

## 🧪 Test Cases

### Test URL Navigation
```
/app/discussion/1    -> Idea "Tổ chức cuộc thi viết sáng tạo"
/app/discussion/2    -> Idea "Chuỗi bài viết về kỹ năng mềm"  
/app/discussion/3    -> Idea "Workshop kỹ năng thuyết trình"
/app/discussion/999  -> Not Found Error
```

### Test Operations
1. **View Details**: Click vào idea trong sidebar
2. **Edit Idea**: Click nút "Chỉnh sửa" trong IdeaDetails
3. **Delete Idea**: Click nút "Xóa" và confirm
4. **Create New**: Thêm idea mới từ form
5. **Search**: Test filter trong IdeaList

## 🐛 Debugging Tips

### 1. Check Mock API Status
```javascript
// Console.log trong browser
console.log('Using Mock API:', USE_MOCK_API);
```

### 2. Inspect Mock Data
```javascript
// Trong browser console
import { mockIdeas } from './mocks/mockIdeas';
console.log('Available ideas:', mockIdeas);
```

### 3. Monitor API Calls
- Mở **DevTools > Network tab**
- Mock API calls sẽ không xuất hiện (vì không có real HTTP request)
- Check **Console tab** cho API logs

### 4. Test Data Persistence
```javascript
// Add idea -> Check sidebar updates
// Delete idea -> Check sidebar removes item
// Edit idea -> Check changes reflect
```

## 🔧 Customization

### Thêm Mock Data
Edit `/src/mocks/mockIdeas.ts`:
```typescript
export const mockIdeas: Idea[] = [
  // ... existing ideas
  {
    idea_id: '26',
    title: 'Idea mới của bạn',
    description: 'Mô tả chi tiết...',
    status: 'new',
    tags: ['custom'],
    category: 'content',
    createdAt: new Date(),
    createdBy: 'Test User'
  }
];
```

### Thay đổi Mock Delay
Edit `/src/services/mockApi.ts`:
```typescript
// Thay đổi từ 500ms thành 1000ms
await new Promise(resolve => setTimeout(resolve, 1000))
```

### Custom Error Simulation
```typescript
// Trong mockApi.ts, thêm error conditions
if (id === 'error-test') {
  throw new Error('Simulated API Error');
}
```

## 📝 Common Issues & Solutions

### Issue 1: "Idea not found" hiển thị khi loading
**Solution**: Đã fix trong DiscussionPanel logic - loading state ưu tiên

### Issue 2: Sidebar không cập nhật sau khi xóa
**Solution**: Navigate về `/app/idealist` để trigger refresh

### Issue 3: TypeScript errors với idea null
**Solution**: Sử dụng `idea!` assertion sau null check

### Issue 4: Mock data không persist
**Expected behavior**: Mock data chỉ persist trong session, refresh sẽ reset

## 🚀 Production Ready

### Chuyển sang Real API
1. Set `USE_MOCK_API = false`
2. Đảm bảo backend running
3. Check `API_URL` environment variable
4. Test all operations work với real backend

### Environment Variables
```bash
# .env.local
VITE_API_URL=http://localhost:3001/api  # Development
VITE_API_URL=https://api.production.com  # Production
```

## 📚 Best Practices

1. **Always test với Mock trước** khi integrate real API
2. **Keep mock data realistic** - giống real data structure
3. **Test error cases** - simulate 404, 500 errors
4. **Document changes** - update guide khi thêm features
5. **Performance testing** - Mock API có delay, test user experience

---

💡 **Tip**: Sử dụng Mock API để develop UI/UX hoàn chỉnh trước khi backend sẵn sàng!
import { Idea } from "../types/idea";

export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'Tổ chức cuộc thi viết sáng tạo',
    description: 'Cuộc thi dành cho sinh viên với chủ đề tự do, khuyến khích ý tưởng mới.',
    status: 'new',
    tags: ['sáng tạo', 'sinh viên'],
    category: 'content',
    createdAt: new Date('2025-08-14'),
    createdBy: 'Nguyễn Văn A',
    googleDocUrl: 'https://docs.google.com/document/d/abc123'
  },
  {
    id: '2',
    title: 'Chuỗi bài viết về kỹ năng mềm',
    description: 'Viết và đăng bài về kỹ năng mềm cho sinh viên trên fanpage CLB.',
    status: 'in-progress',
    tags: ['kỹ năng', 'fanpage'],
    category: 'marketing',
    createdAt: new Date('2025-08-13'),
    createdBy: 'Trần Thị B',
    googleDocUrl: ''
  },
  {
    id: '3',
    title: 'Video phỏng vấn sinh viên tiêu biểu',
    description: 'Thực hiện và đăng video phỏng vấn sinh viên có thành tích nổi bật.',
    status: 'completed',
    tags: ['video', 'phỏng vấn'],
    category: 'event',
    createdAt: new Date('2025-08-12'),
    createdBy: 'Lê Văn C',
    googleDocUrl: 'https://docs.google.com/document/d/xyz789'
  }
];
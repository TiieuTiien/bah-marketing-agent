import { Comment } from '@/types/comment';

export const mockComments: Comment[] = [
    {
        comment_id: 1,
        idea_id: 1,
        user_id: 1,
        comment_text: 'Đây là một ý tưởng rất hay! Tôi nghĩ chúng ta nên triển khai ngay.',
        created_at: new Date('2024-01-15T10:30:00').toISOString(),
        username: 'Nguyễn Văn A'
    },
    {
        comment_id: 2,
        idea_id: 1,
        user_id: 2,
        comment_text: 'Tôi đồng ý với bạn. Có thể bắt đầu với prototype nhỏ.',
        created_at: new Date('2024-01-15T11:00:00').toISOString(),
        username: 'Trần Thị B'
    },
    {
        comment_id: 3,
        idea_id: 1,
        user_id: 3,
        comment_text: 'Cần phải xem xét chi phí và thời gian thực hiện. Có kế hoạch cụ thể chưa?',
        created_at: new Date('2024-01-15T14:15:00').toISOString(),
        username: 'Lê Văn C'
    },
    {
        comment_id: 4,
        idea_id: 2,
        user_id: 4,
        comment_text: 'Ý tưởng thú vị, nhưng cần nghiên cứu thêm về tính khả thi.',
        created_at: new Date('2024-01-16T09:20:00').toISOString(),
        username: 'Phạm Thị D'
    }
];
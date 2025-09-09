import { Idea } from "../types/idea";

export const mockIdeas: Idea[] = [
  {
    idea_id: '1',
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
    idea_id: '2',
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
    idea_id: '3',
    title: 'Video phỏng vấn sinh viên tiêu biểu',
    description: 'Thực hiện và đăng video phỏng vấn sinh viên có thành tích nổi bật.',
    status: 'completed',
    tags: ['video', 'phỏng vấn'],
    category: 'event',
    createdAt: new Date('2025-08-12'),
    createdBy: 'Lê Văn C',
    googleDocUrl: 'https://docs.google.com/document/d/xyz789'
  },
  {
    idea_id: '4',
    title: 'Infographic giới thiệu CLB',
    description: 'Thiết kế infographic giới thiệu về hoạt động và thành tích CLB.',
    status: 'new',
    tags: ['design', 'infographic'],
    category: 'marketing',
    createdAt: new Date('2025-08-11'),
    createdBy: 'Phạm Thị D',
    googleDocUrl: ''
  },
  {
    idea_id: '5',
    title: 'Chuỗi workshop kỹ năng viết',
    description: 'Tổ chức workshop cho sinh viên rèn luyện kỹ năng viết sáng tạo.',
    status: 'in-progress',
    tags: ['workshop', 'kỹ năng'],
    category: 'event',
    createdAt: new Date('2025-08-10'),
    createdBy: 'Ngô Văn E',
    googleDocUrl: 'https://docs.google.com/document/d/aaa111'
  },
  {
    idea_id: '6',
    title: 'Bản tin hàng tháng',
    description: 'Xuất bản bản tin hàng tháng tổng hợp tin tức và hoạt động CLB.',
    status: 'completed',
    tags: ['bản tin', 'thông tin'],
    category: 'content',
    createdAt: new Date('2025-08-09'),
    createdBy: 'Đặng Thị F',
    googleDocUrl: ''
  },
  {
    idea_id: '7',
    title: 'Thiết kế logo sự kiện thường niên',
    description: 'Tạo logo mới cho sự kiện thường niên của CLB.',
    status: 'new',
    tags: ['logo', 'design'],
    category: 'event',
    createdAt: new Date('2025-08-08'),
    createdBy: 'Bùi Văn G',
    googleDocUrl: ''
  },
  {
    idea_id: '8',
    title: 'Podcast chia sẻ trải nghiệm',
    description: 'Thu âm podcast với khách mời chia sẻ trải nghiệm học tập và hoạt động.',
    status: 'in-progress',
    tags: ['podcast', 'chia sẻ'],
    category: 'content',
    createdAt: new Date('2025-08-07'),
    createdBy: 'Hoàng Thị H',
    googleDocUrl: 'https://docs.google.com/document/d/podcast001'
  },
  {
    idea_id: '9',
    title: 'Minigame fanpage',
    description: 'Tổ chức minigame nhỏ trên fanpage để tăng tương tác.',
    status: 'completed',
    tags: ['minigame', 'fanpage'],
    category: 'marketing',
    createdAt: new Date('2025-08-06'),
    createdBy: 'Nguyễn Văn I',
    googleDocUrl: ''
  },
  {
    idea_id: '10',
    title: 'Video hậu trường sự kiện',
    description: 'Ghi lại và dựng video hậu trường của các sự kiện CLB.',
    status: 'new',
    tags: ['video', 'hậu trường'],
    category: 'event',
    createdAt: new Date('2025-08-05'),
    createdBy: 'Trần Văn J',
    googleDocUrl: ''
  },
  {
    idea_id: '11',
    title: 'Chiến dịch truyền thông online',
    description: 'Thực hiện chiến dịch truyền thông online cho sự kiện chính.',
    status: 'in-progress',
    tags: ['chiến dịch', 'truyền thông'],
    category: 'marketing',
    createdAt: new Date('2025-08-04'),
    createdBy: 'Lê Thị K',
    googleDocUrl: 'https://docs.google.com/document/d/campaign001'
  },
  {
    idea_id: '12',
    title: 'Ảnh kỷ niệm CLB',
    description: 'Tập hợp ảnh kỷ niệm và chia sẻ lên fanpage.',
    status: 'completed',
    tags: ['ảnh', 'kỷ niệm'],
    category: 'content',
    createdAt: new Date('2025-08-03'),
    createdBy: 'Phan Văn L',
    googleDocUrl: ''
  },
  {
    idea_id: '13',
    title: 'Tổ chức talkshow với cựu thành viên',
    description: 'Talkshow chia sẻ kinh nghiệm từ các cựu thành viên CLB.',
    status: 'new',
    tags: ['talkshow', 'cựu thành viên'],
    category: 'event',
    createdAt: new Date('2025-08-02'),
    createdBy: 'Đỗ Thị M',
    googleDocUrl: ''
  },
  {
    idea_id: '14',
    title: 'Chuỗi bài viết truyền cảm hứng',
    description: 'Đăng bài viết chia sẻ câu chuyện truyền cảm hứng của sinh viên.',
    status: 'in-progress',
    tags: ['cảm hứng', 'bài viết'],
    category: 'content',
    createdAt: new Date('2025-08-01'),
    createdBy: 'Nguyễn Văn N',
    googleDocUrl: 'https://docs.google.com/document/d/inspire001'
  },
  {
    idea_id: '15',
    title: 'Livestream sự kiện đặc biệt',
    description: 'Phát trực tiếp sự kiện CLB trên Facebook để nhiều người theo dõi.',
    status: 'completed',
    tags: ['livestream', 'facebook'],
    category: 'event',
    createdAt: new Date('2025-07-31'),
    createdBy: 'Trần Thị O',
    googleDocUrl: ''
  },
  {
    idea_id: '16',
    title: 'Thiết kế poster tuyển thành viên',
    description: 'Tạo poster và banner truyền thông cho đợt tuyển thành viên mới.',
    status: 'new',
    tags: ['poster', 'tuyển thành viên'],
    category: 'marketing',
    createdAt: new Date('2025-07-30'),
    createdBy: 'Phạm Văn P',
    googleDocUrl: ''
  },
  {
    idea_id: '17',
    title: 'Chuỗi bài viết chia sẻ kỹ năng nghiên cứu',
    description: 'Hướng dẫn kỹ năng nghiên cứu và viết báo cáo học thuật.',
    status: 'in-progress',
    tags: ['nghiên cứu', 'kỹ năng'],
    category: 'content',
    createdAt: new Date('2025-07-29'),
    createdBy: 'Lê Thị Q',
    googleDocUrl: 'https://docs.google.com/document/d/research001'
  },
  {
    idea_id: '18',
    title: 'Triển lãm ảnh CLB',
    description: 'Tổ chức triển lãm ảnh ghi lại hoạt động của CLB qua các năm.',
    status: 'completed',
    tags: ['triển lãm', 'ảnh'],
    category: 'event',
    createdAt: new Date('2025-07-28'),
    createdBy: 'Ngô Văn R',
    googleDocUrl: ''
  },
  {
    idea_id: '19',
    title: 'Ebook kỹ năng mềm',
    description: 'Biên soạn ebook kỹ năng mềm dành cho sinh viên mới.',
    status: 'new',
    tags: ['ebook', 'kỹ năng mềm'],
    category: 'content',
    createdAt: new Date('2025-07-27'),
    createdBy: 'Hoàng Thị S',
    googleDocUrl: ''
  },
  {
    idea_id: '20',
    title: 'Chiến dịch hashtag trên mạng xã hội',
    description: 'Khởi động chiến dịch hashtag để lan tỏa sự kiện CLB.',
    status: 'in-progress',
    tags: ['hashtag', 'social'],
    category: 'marketing',
    createdAt: new Date('2025-07-26'),
    createdBy: 'Nguyễn Văn T',
    googleDocUrl: 'https://docs.google.com/document/d/hashtag001'
  },
  {
    idea_id: '21',
    title: 'Bài viết giới thiệu thành viên mới',
    description: 'Đăng bài viết giới thiệu các thành viên mới gia nhập CLB.',
    status: 'completed',
    tags: ['giới thiệu', 'thành viên'],
    category: 'content',
    createdAt: new Date('2025-07-25'),
    createdBy: 'Trần Thị U',
    googleDocUrl: ''
  },
  {
    idea_id: '22',
    title: 'Video highlight hoạt động năm',
    description: 'Tổng hợp video highlight các hoạt động nổi bật trong năm.',
    status: 'new',
    tags: ['video', 'highlight'],
    category: 'event',
    createdAt: new Date('2025-07-24'),
    createdBy: 'Lê Văn V',
    googleDocUrl: ''
  },
  {
    idea_id: '23',
    title: 'Khảo sát ý tưởng mới',
    description: 'Tạo khảo sát để thu thập ý tưởng từ sinh viên cho hoạt động sắp tới.',
    status: 'in-progress',
    tags: ['khảo sát', 'ý tưởng'],
    category: 'marketing',
    createdAt: new Date('2025-07-23'),
    createdBy: 'Phạm Thị W',
    googleDocUrl: 'https://docs.google.com/document/d/survey001'
  }
];

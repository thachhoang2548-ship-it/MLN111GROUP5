import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: { message: 'Nội dung câu hỏi (prompt) không được để trống.' } });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: {
        message: 'Chưa cấu hình GEMINI_API_KEY ở môi trường máy chủ. Vui lòng kiểm tra lại file .env.'
      }
    });
  }

  try {
    const systemPrompt = `Bạn là một Giáo sư/Học giả Triết học Mác-Lênin xuất sắc chuyên nghiên cứu về Giai cấp và Dân tộc.
Nhiệm vụ của bạn là giải đáp các câu hỏi học thuật liên quan đến: Triết học Mác-Lênin, Tư tưởng Hồ Chí Minh, Giai cấp, Dân tộc, Đấu tranh giai cấp, và các nội dung có trên trang web "Class Struggle Simulator".

QUY TẮC QUAN TRỌNG:
1. Bạn CHỈ được phép trả lời các câu hỏi nằm trong phạm vi kiến thức nêu trên.
2. Đối với bất kỳ câu hỏi nào ngoài phạm vi này (ví dụ: câu hỏi về công nghệ, lập trình, viết mã nguồn, công thức nấu ăn, toán học, thời tiết, giải trí, hoặc trò chuyện phiếm không liên quan), bạn phải từ chối trả lời một cách lịch sự bằng tiếng Việt. Hãy nhắc nhở người dùng rằng bạn là Trợ lý Học thuật chuyên sâu về đề tài "Giai cấp & Dân tộc" và khuyến khích họ quay lại chủ đề chính.
3. Câu trả lời cần khoa học, chuyên nghiệp, trích dẫn quan điểm của K.Marx, F.Engels, V.I.Lenin và tư tưởng Hồ Chí Minh khi phù hợp.
4. Sử dụng định dạng Markdown sạch sẽ (in đậm, danh sách dòng). Trả lời súc tích, ngắn gọn để dễ trình bày trên lớp học.

Câu hỏi của người dùng: "${prompt}"`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Gemini API error response:', data);
      return res.status(response.status || 500).json({
        error: {
          message: data.error?.message || 'Có lỗi xảy ra khi gọi đến Gemini API.'
        }
      });
    }

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      const text = data.candidates[0].content.parts[0].text;
      return res.json({ text });
    }

    return res.status(500).json({ error: { message: 'Định dạng phản hồi từ Gemini không hợp lệ.' } });
  } catch (error) {
    console.error('Server error calling Gemini:', error);
    return res.status(500).json({ error: { message: 'Lỗi kết nối máy chủ: ' + error.message } });
  }
});

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running correctly.' });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Key, AlertCircle, Trash2, HelpCircle, Loader2 } from 'lucide-react';
import { sound } from './SoundManager';

const PRESET_QUESTIONS = [
  {
    q: 'Mối quan hệ biện chứng giữa giai cấp và dân tộc là gì?',
    a: 'Theo lý luận chủ nghĩa Mác-Lênin, mối quan hệ giữa giai cấp và dân tộc là quan hệ biện chứng hai chiều:\n\n1. **Giai cấp quyết định dân tộc**: Sự xuất hiện và tồn tại của giai cấp quyết định bản chất của dân tộc. Giai cấp thống trị xã hội đồng thời cũng là giai cấp đại diện cho tiếng nói và lợi ích của quốc gia dân tộc đó trong quan hệ đối ngoại. Bản chất của chế độ giai cấp quy định sự phát triển của dân tộc.\n\n2. **Dân tộc tác động ngược lại giai cấp**: Sự áp bức dân tộc từ bên ngoài sẽ làm trầm trọng hơn hoặc thay đổi tính chất đấu tranh giai cấp trong nước. Sự phát triển và độc lập của dân tộc là địa bàn, là tiền đề vật chất trực tiếp để giai cấp vô sản thực hiện sứ mệnh giải phóng giai cấp vô sản khỏi ách thống trị tư bản.'
  },
  {
    q: 'Tại sao Nguyễn Ái Quốc khẳng định giải phóng dân tộc trước, giải phóng giai cấp sau?',
    a: 'Ở các nước thuộc địa như Việt Nam đầu thế kỷ 20, mâu thuẫn bao trùm xã hội không phải là mâu thuẫn giai cấp giữa tư sản và vô sản, mà là **mâu thuẫn dân tộc** giữa toàn thể nhân dân Việt Nam với thực dân xâm lược Pháp.\n\nNguyễn Ái Quốc đã vận dụng sáng tạo chủ nghĩa Mác-Lênin vào thực tiễn Việt Nam:\n- Nếu không giải phóng được dân tộc, đòi lại độc lập tự chủ, thì đất nước vẫn mãi làm nô lệ, và lợi ích của mọi giai cấp (kể cả công nhân, nông dân) đều không thể thực hiện được.\n- Do đó, cách mạng Việt Nam phải ưu tiên giương cao ngọn cờ giải phóng dân tộc lên trên hết, đoàn kết mọi giai cấp yêu nước, làm tiền đề để tiến tới cuộc cách mạng xã hội chủ nghĩa giải phóng giai cấp triệt để.'
  },
  {
    q: 'Thế nào là "bóc lột kép" trong thời đại toàn cầu hóa hiện nay?',
    a: 'Trong bối cảnh toàn cầu hóa và chủ nghĩa tư bản độc quyền xuyên quốc gia, người lao động ở các nước đang phát triển thường phải chịu sự **"bóc lột kép"**:\n\n1. **Bóc lột từ giới chủ tư bản nội địa**: Giới tài phiệt trong nước duy trì mức lương tối thiểu thấp và giờ làm kéo dài để tích lũy tư bản.\n2. **Bóc lột từ tư bản độc quyền quốc tế**: Các siêu tập đoàn đa quốc gia chuyển dịch chuỗi cung ứng giá trị thấp về các nước nghèo, tận dụng lao động rẻ mạt và tài nguyên quốc gia để vắt kiệt giá trị thặng dư (M) rồi chuyển lợi nhuận về chính quốc.\n\nĐiều này đe dọa chủ quyền kinh tế của các quốc gia dân tộc chậm phát triển và tạo ra làn sóng bóc lột xuyên biên giới.'
  },
  {
    q: 'Lợi ích dân tộc và lợi ích giai cấp vô sản thống nhất với nhau như thế nào?',
    a: 'Trong thời kỳ cách mạng vô sản, lợi ích của giai cấp công nhân và lợi ích của toàn thể dân tộc có sự **thống nhất căn bản**:\n- Giai cấp công nhân không có lợi ích riêng biệt độc lập với lợi ích chung của toàn thể nhân dân lao động. \n- Việc giải phóng giai cấp công nhân khỏi ách bóc lột tư bản đồng thời cũng là giải phóng tuyệt đại đa số nhân dân khỏi nghèo nàn, lạc hậu.\n- Như Marx và Engels đã viết trong Tuyên ngôn: *"Giai cấp vô sản mỗi nước trước hết phải giành lấy chính quyền, phải tự vươn lên thành giai cấp dân tộc, phải tự mình trở thành dân tộc."*'
  }
];

export default function AIChatbot({ audioEnabled }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Chào đồng chí! Tôi là Trợ lý Học thuật AI về chuyên đề **Giai cấp & Dân tộc**. Đồng chí có câu hỏi nào cần thảo luận hoặc giải đáp về học thuyết Marx - Lenin hay tư tưởng Hồ Chí Minh không?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const callGemini = async (userPrompt) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userPrompt
        })
      });

      const data = await response.json();
      if (data.error) {
        return `❌ **Lỗi Backend:** ${data.error.message}`;
      }
      if (data.text) {
        return data.text;
      }
      throw new Error('API Response structure invalid');
    } catch (error) {
      console.error(error);
      return '❌ **Lỗi kết nối:** Không thể kết nối với máy chủ Backend. Vui lòng kiểm tra lại kết nối mạng hoặc đảm bảo máy chủ đang hoạt động.';
    }
  };

  const handleSend = async (textToSend) => {
    const prompt = textToSend.trim();
    if (!prompt) return;

    if (audioEnabled) sound.playTick();

    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', text: prompt }]);
    setInput('');
    setLoading(true);

    // Look for preset match (offline fallback)
    const preset = PRESET_QUESTIONS.find(item =>
      prompt.toLowerCase().includes(item.q.toLowerCase()) ||
      item.q.toLowerCase().includes(prompt.toLowerCase())
    );

    let reply = '';
    if (preset) {
      // Simulate think delay
      await new Promise(resolve => setTimeout(resolve, 800));
      reply = preset.a;
    } else {
      // Live API Call to Backend
      reply = await callGemini(prompt);
    }

    setLoading(false);
    const botMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: botMsgId, role: 'bot', text: reply }]);
    if (audioEnabled) sound.playTick();
  };

  const parseMarkdown = (text) => {
    // Basic formatting helper
    return text.split('\n').map((line, idx) => {
      let content = line;
      // Bold **text**
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Bullet points
      if (content.trim().startsWith('- ') || content.trim().startsWith('* ')) {
        return <li key={idx} className="ml-4 list-disc text-gray-300 my-1" dangerouslySetInnerHTML={{ __html: content.replace(/^[-*]\s+/, '') }} />;
      }
      // Headings
      if (content.trim().startsWith('### ')) {
        return <h4 key={idx} className="text-sm font-bold text-soviet-gold mt-3 mb-1" dangerouslySetInnerHTML={{ __html: content.replace(/^###\s+/, '') }} />;
      }
      if (content.trim().startsWith('1. ') || content.trim().startsWith('2. ') || content.trim().startsWith('3. ') || content.trim().startsWith('4. ')) {
        return <p key={idx} className="text-gray-300 pl-2 my-1" dangerouslySetInnerHTML={{ __html: content }} />;
      }
      return <p key={idx} className="mb-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />;
    });
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4 z-10 relative">
      {/* Title */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-soviet-red/30 bg-soviet-red/10 text-soviet-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <Bot className="w-3.5 h-3.5 text-soviet-red animate-pulse" />
          Học Giả Số Mác-Lênin
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold text-soviet-beige mb-3">
          Trợ Lý AI: Lý Luận Giai Cấp & Dân Tộc
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          Tra cứu, thảo luận và làm sáng tỏ các luận điểm về mối quan hệ giữa Giai cấp và Quốc gia Dân tộc dưới góc nhìn duy vật lịch sử.
        </p>
      </div>

      <div className="bg-[#1b1b22] border border-soviet-border rounded-2xl flex flex-col shadow-2xl overflow-hidden h-[600px] relative">

        {/* Chat Header */}
        <div className="bg-[#14141a] border-b border-soviet-border p-4 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-soviet-red/10 border border-soviet-red/30 flex items-center justify-center text-soviet-gold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-soviet-beige flex items-center gap-1.5">
                Trợ lý Triết học AI
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Đang trực tuyến" />
              </div>
              <div className="text-[10px] text-gray-500 font-mono">
                Sử dụng Gemini 2.0 Flash qua máy chủ Backend
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4 bg-[#14141a]/30">
          {messages.map((msg) => {
            const isBot = msg.role === 'bot';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`w-8.5 h-8.5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border ${isBot
                  ? 'bg-soviet-red/10 border-soviet-red/20 text-soviet-gold'
                  : 'bg-soviet-gold/15 border-soviet-gold/30 text-soviet-beige'
                  }`}>
                  {isBot ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                </div>

                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-lg ${isBot
                  ? 'bg-[#1b1b22] border border-soviet-border text-gray-300 rounded-tl-none'
                  : 'bg-soviet-red text-white rounded-tr-none'
                  }`}>
                  {isBot ? parseMarkdown(msg.text) : msg.text}
                </div>
              </motion.div>
            );
          })}

          {loading && (
            <div className="flex gap-3 mr-auto max-w-[80%]">
              <div className="w-8.5 h-8.5 rounded-full bg-soviet-red/10 border border-soviet-red/20 flex items-center justify-center text-soviet-gold">
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-[#1b1b22] border border-soviet-border text-gray-400 rounded-tl-none text-xs flex items-center gap-2">
                Đồng chí AI đang suy ngẫm lý luận...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions Quick Buttons */}
        <div className="p-3 bg-[#14141a]/60 border-t border-soviet-border overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-thin">
          {PRESET_QUESTIONS.map((item, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => handleSend(item.q)}
              className="px-3.5 py-1.5 bg-[#1b1b22] hover:bg-soviet-red/10 border border-soviet-border hover:border-soviet-red/40 rounded-full text-xs text-gray-400 hover:text-soviet-gold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {item.q.length > 40 ? item.q.slice(0, 40) + '...' : item.q}
            </button>
          ))}
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-4 bg-[#14141a] border-t border-soviet-border flex gap-3 flex-shrink-0"
        >
          <input
            type="text"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi thảo luận bất kỳ của đồng chí..."
            className="flex-grow bg-[#1b1b22] border border-soviet-border focus:border-soviet-red rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 bg-gradient-to-r from-soviet-red to-red-700 hover:from-red-600 hover:to-red-800 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-gray-600 text-white rounded-xl border border-soviet-gold/20 flex items-center justify-center transition-all cursor-pointer"
          >
            <Send className="w-4.5 h-4.5" />
          </button>
        </form>



      </div>
    </section>
  );
}

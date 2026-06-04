import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Eye, Sparkles, BookOpen, PenTool, CheckCircle } from 'lucide-react';
import { sound } from './SoundManager';

export default function AITransparency({ audioEnabled }) {
  const [activeSubTab, setActiveSubTab] = useState('pledge');

  const handleTabChange = (tabId) => {
    if (audioEnabled) sound.playTick();
    setActiveSubTab(tabId);
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4 z-10 relative">
      {/* Title Header */}
      <div className="text-center mb-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-soviet-red/30 bg-soviet-red/10 text-soviet-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Phụ Lục Điểm Cộng
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-soviet-beige mb-4">
          Minh Bạch Sử Dụng AI & Liêm Chính Học Thuật
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Tuyên bố minh bạch về phạm vi hỗ trợ của Trí tuệ nhân tạo (AI) và cam kết trách nhiệm học thuật của nhóm sinh viên theo đúng chuẩn mực đào tạo của Đại học FPT.
        </p>
      </div>

      {/* Internal Tabs Switcher */}
      <div className="flex justify-center gap-2 md:gap-4 mb-8">
        <button
          onClick={() => handleTabChange('pledge')}
          className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeSubTab === 'pledge'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          <HeartHandshake className="w-4 h-4 inline-block mr-1.5" />
          Cam Kết Liêm Chính
        </button>

        <button
          onClick={() => handleTabChange('log')}
          className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeSubTab === 'log'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          <PenTool className="w-4 h-4 inline-block mr-1.5" />
          Bảng Kê Sử Dụng AI
        </button>

        <button
          onClick={() => handleTabChange('verify')}
          className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg border text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeSubTab === 'verify'
              ? 'bg-soviet-red border-soviet-gold text-white shadow-lg'
              : 'bg-[#1b1b22] border-soviet-border text-gray-400 hover:text-soviet-beige'
          }`}
        >
          <BookOpen className="w-4 h-4 inline-block mr-1.5" />
          Đối Chiếu & Kiểm Chứng
        </button>
      </div>

      {/* Main Content Box */}
      <div className="bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 shadow-2xl min-h-[420px] flex flex-col justify-start">
        <AnimatePresence mode="wait">
          {activeSubTab === 'pledge' && (
            <motion.div
              key="pledge-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-soviet-border pb-4">
                <div className="w-10 h-10 rounded-full bg-green-950/40 border border-green-500/50 flex items-center justify-center text-green-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Cam Kết Liêm Chính Học Thuật (Academic Integrity Pledge)</h3>
                  <p className="text-xs text-gray-500 font-mono">Đại học FPT - Tri thức song hành cùng Chính trực</p>
                </div>
              </div>

              <div className="prose prose-invert text-gray-300 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Chúng tôi, tập thể nhóm thực hiện dự án **"Class Struggle Simulator"**, chính thức cam kết tuân thủ nghiêm ngặt chuẩn mực liêm chính học thuật trong việc ứng dụng công nghệ Trí tuệ nhân tạo (AI):
                </p>
                
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-soviet-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Không lạm dụng, không thay thế hoàn toàn:</strong> AI chỉ đóng vai trò là một trợ lý kỹ thuật hỗ trợ xây dựng khung mã nguồn React/Tailwind và phác thảo các sơ đồ trực quan. Toàn bộ nội dung cốt lõi của ứng dụng đều do sinh viên trực tiếp nghiên cứu và xây dựng.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-soviet-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Trực tiếp làm chủ và chịu trách nhiệm:</strong> Nhóm sinh viên đã rà soát thủ công, dịch thuật ngữ chuyên ngành sang tiếng Việt chuẩn xác theo giáo trình, thiết lập các tham số toán học cho trò chơi vĩ mô và chịu trách nhiệm hoàn toàn về độ chính xác lý luận chính trị của sản phẩm cuối cùng.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-soviet-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Đối chiếu nguồn chính thống:</strong> Mọi thông tin, định nghĩa được gợi ý bởi mô hình ngôn ngữ lớn đều được đối chiếu trực tiếp với Giáo trình Triết học Mác-Lênin do Bộ Giáo dục & Đào tạo phát hành để loại bỏ hoàn toàn các lỗi suy diễn hoặc thuật ngữ sai lệch.</span>
                  </li>
                </ul>

                <div className="bg-[#14141a] p-4 rounded-xl border border-soviet-border/50 text-xs italic text-gray-400 mt-6">
                  "AI có thể giúp chúng ta viết mã nhanh hơn, nhưng chính tư duy phản biện, sự thấu hiểu lý luận biện chứng và lòng kiên định học thuật của con người mới là yếu tố quyết định giá trị của một sản phẩm giáo dục sáng tạo."
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'log' && (
            <motion.div
              key="log-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-soviet-border pb-4">
                <div className="w-10 h-10 rounded-full bg-soviet-red/20 border border-soviet-red/50 flex items-center justify-center text-soviet-red">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Bảng Kê Nhật Ký Sử Dụng AI (AI Usage Log)</h3>
                  <p className="text-xs text-gray-500 font-mono">Báo cáo minh bạch về công cụ, câu lệnh và vai trò thực tế</p>
                </div>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-soviet-border bg-[#14141a] text-soviet-gold font-bold">
                      <th className="p-3">Công Cụ & Mục Đích</th>
                      <th className="p-3">Prompt Sử Dụng</th>
                      <th className="p-3">Kết Quả Từ AI</th>
                      <th className="p-3">Sinh Viên Biên Soạn & Sửa Đổi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-soviet-border/50 text-gray-300">
                    <tr>
                      <td className="p-3 font-semibold text-white">
                        Gemini 2.0 & ChatGPT<br/>
                        <span className="text-[10px] text-gray-500">(Xây dựng khung giao diện & Game)</span>
                      </td>
                      <td className="p-3 italic max-w-[200px] truncate" title='“Hãy viết code cho một trò chơi nhập vai giai cấp bằng React và Tailwind CSS, hiển thị các chỉ số tài sản, tự do...”'>
                        "Hãy viết code cho một trò chơi nhập vai giai cấp bằng React..."
                      </td>
                      <td className="p-3">
                        Khung logic game cơ bản, cấu trúc layout Tailwind, code mẫu canvas tạo hạt bụi bay.
                      </td>
                      <td className="p-3 text-green-400 font-medium">
                        Việt hóa toàn bộ; Cân bằng lại các chỉ số kinh tế; Viết thêm các kịch bản thực tiễn tại Việt Nam; Tích hợp hệ thống quản lý âm thanh.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">
                        Github Copilot<br/>
                        <span className="text-[10px] text-gray-500">(Hỗ trợ lập trình & Gợi ý code)</span>
                      </td>
                      <td className="p-3 italic">
                        Tự động hoàn thành (Auto-complete) các đoạn mã xử lý trạng thái (useState, useEffect).
                      </td>
                      <td className="p-3">
                        Gợi ý các hàm điều khiển phím di chuyển, hàm lọc câu hỏi trắc nghiệm.
                      </td>
                      <td className="p-3 text-green-400 font-medium">
                        Kiểm thử lỗi logic vòng lặp; Chỉnh sửa phím tắt Presentation Mode để phù hợp với tốc độ thuyết trình trên lớp học.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">
                        Midjourney / SVG Generators<br/>
                        <span className="text-[10px] text-gray-500">(Thiết kế đồ họa & Icon)</span>
                      </td>
                      <td className="p-3 italic max-w-[200px] truncate" title='“Stylized golden star and industrial hammer silhouette vector, dark mode socialist style, flat design, SVG”'>
                        "Stylized golden star and industrial hammer silhouette vector..."
                      </td>
                      <td className="p-3">
                        Các vector thô và ý tưởng hình học biểu tượng tháp giai cấp xã hội.
                      </td>
                      <td className="p-3 text-green-400 font-medium">
                        Vẽ lại bằng JSX SVG trực tiếp trong code; Cài đặt hiệu ứng phát sáng neon (glow effect) và hiệu ứng xoay tròn bằng Framer Motion.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">
                        Google Veo (Gemini)<br/>
                        <span className="text-[10px] text-gray-500">(Sản xuất video giới thiệu/thuyết trình)</span>
                      </td>
                      <td className="p-3 italic max-w-[200px] truncate" title='“A cinematic documentary video of industrial revolution, vintage factories, workers struggle, soviet red color tone, high detail”'>
                        "A cinematic documentary video of industrial revolution, vintage factories..."
                      </td>
                      <td className="p-3">
                        Video tư liệu lịch sử mô phỏng bối cảnh cách mạng công nghiệp và đấu tranh giai cấp.
                      </td>
                      <td className="p-3 text-green-400 font-medium">
                        Cắt ghép biên tập video; Đồng bộ âm thanh nhạc nền; Trực tiếp xây dựng trình phát HTML5 Video trên trang chủ của web.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'verify' && (
            <motion.div
              key="verify-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-soviet-border pb-4">
                <div className="w-10 h-10 rounded-full bg-amber-950/40 border border-soviet-gold/50 flex items-center justify-center text-soviet-gold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Đối Chiếu Giáo Trình & Kiểm Chứng Lý Luận</h3>
                  <p className="text-xs text-gray-500 font-mono">Bảo đảm tính chính xác học thuật của Chủ nghĩa duy vật lịch sử</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
                <div className="bg-[#14141a] p-5 rounded-xl border border-soviet-border space-y-3">
                  <h4 className="font-bold text-soviet-red uppercase tracking-wider">Lỗi Sai/Thiếu Sót Lý Luận Từ AI</h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-400">
                    <li>
                      <strong className="text-white">Thuật ngữ không chuẩn xác:</strong> AI dùng từ "Giai cấp trung lưu" theo xã hội học phương Tây thay vì định danh chính xác là "Tiểu tư sản" hay "Các giai cấp trung gian" theo quan điểm kinh tế chính trị Mác.
                    </li>
                    <li>
                      <strong className="text-white">Thiếu tính lịch sử:</strong> AI giải thích sự hình thành dân tộc ở Đông Phương giống hệt Châu Âu, bỏ qua đặc thù hình thành dân tộc sớm do yêu cầu trị thủy và đấu tranh chống ngoại xâm.
                    </li>
                    <li>
                      <strong className="text-white">Mơ hồ về đấu tranh giai cấp:</strong> Coi đấu tranh giai cấp chỉ là bạo động vũ trang, thiếu đi sự phân tích đấu tranh về mặt kinh tế và hệ tư tưởng.
                    </li>
                  </ul>
                </div>

                <div className="bg-[#14141a] p-5 rounded-xl border border-soviet-gold/30 space-y-3">
                  <h4 className="font-bold text-soviet-gold uppercase tracking-wider">Hiệu Chỉnh Theo Giáo Trình Chính Thống</h4>
                  <ul className="space-y-2 list-disc list-inside text-gray-300">
                    <li>
                      <strong className="text-white">Chuẩn hóa học thuật:</strong> Hiệu chỉnh lại toàn bộ định nghĩa giai cấp theo định nghĩa kinh điển của V.I.Lênin (Giáo trình Triết học Mác-Lênin - trang 265).
                    </li>
                    <li>
                      <strong className="text-white">Vận dụng sáng tạo tại Việt Nam:</strong> Bổ sung phân tích về vai trò lãnh đạo của Đảng Cộng sản Việt Nam và tư tưởng Hồ Chí Minh về sự thống nhất giữa giải phóng dân tộc và giải phóng giai cấp.
                    </li>
                    <li>
                      <strong className="text-white">Chỉ rõ 3 hình thức đấu tranh:</strong> Bổ sung nội dung lý luận về Đấu tranh Kinh tế, Đấu tranh Chính trị và Đấu tranh Tư tưởng trong mục infographics.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-soviet-gold/5 p-4 rounded-xl border border-soviet-gold/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-gray-300">
                <div>
                  <span className="font-bold text-soviet-gold uppercase block mb-1">Tài Liệu Giáo Trình Đối Chiếu Trực Tiếp:</span>
                  1. Giáo trình Triết học Mác - Lênin (Dành cho bậc Đại học hệ không chuyên), Bộ Giáo dục và Đào tạo, NXB Chính trị Quốc gia Sự thật.<br/>
                  2. Giáo trình Chủ nghĩa xã hội khoa học, Bộ Giáo dục và Đào tạo, NXB Chính trị Quốc gia Sự thật.
                </div>
                <div className="flex-shrink-0 bg-soviet-gold/10 text-soviet-gold px-3 py-1 rounded border border-soviet-gold/30 font-bold uppercase tracking-wider font-mono">
                  Verified
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

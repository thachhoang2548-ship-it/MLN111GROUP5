import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, CheckCircle2, RefreshCw, Star, Coins, UserCheck, ShieldAlert, Award } from 'lucide-react';
import { sound } from './SoundManager';

const rolesData = [
  {
    id: 'slave',
    name: 'Nô lệ (Slave)',
    era: 'Xã hội Chiếm hữu Nô lệ',
    desc: 'Lao dịch không giới hạn trong các mỏ đá, điền trang. Bị xem như vật sở hữu của chủ nô.',
    meansOfProduction: 'Không sở hữu gì cả (Bản thân là tài sản của người khác)',
    stats: { wealth: 0, freedom: 2, conditions: 5, status: 5 },
    event: {
      question: 'Chủ nô đánh đập dã man một người bạn của bạn vì làm vỡ dụng cụ. Bạn sẽ làm gì?',
      choices: [
        {
          text: 'Tham gia âm mưu nổi dậy, trốn chạy đêm nay.',
          feedback: 'Bạn đào tẩu thành công cùng một nhóm nhỏ, nhưng bị lính tuần La Mã săn đuổi. Tự do của bạn tăng vọt, nhưng vị thế xã hội vô cùng nguy hiểm!',
          changes: { wealth: 0, freedom: 60, conditions: 20, status: 20 }
        },
        {
          text: 'Chấp nhận chịu đựng, tiếp tục cúi đầu làm việc.',
          feedback: 'Bạn an toàn tính mạng nhưng thể chất hao mòn. Điều kiện lao động giảm sút trầm trọng. Bạn cảm nhận sâu sắc sự tha hóa con người.',
          changes: { wealth: 0, freedom: 2, conditions: 2, status: 2 }
        },
        {
          text: 'Đứng ra nhận lỗi thay để làm dịu cơn thịnh nộ.',
          feedback: 'Bạn bị quất roi tàn bạo, mất đi 50% sức khỏe, nhưng nhận được sự nể trọng âm thầm từ các nô lệ khác. Uy tín của bạn tăng.',
          changes: { wealth: 0, freedom: 2, conditions: 1, status: 40 }
        }
      ]
    }
  },
  {
    id: 'peasant',
    name: 'Nông dân (Peasant)',
    era: 'Chế độ Phong kiến',
    desc: 'Cày cấy trên ruộng đất của Lãnh chúa phong kiến. Phải nộp tô thuế nặng nề và làm lao dịch.',
    meansOfProduction: 'Không sở hữu đất đai (Chỉ có nông cụ thô sơ tự chế)',
    stats: { wealth: 15, freedom: 20, conditions: 25, status: 20 },
    event: {
      question: 'Năm nay mất mùa do thiên tai, nhưng địa chủ vẫn ép nộp đủ 70% sản lượng làm tô thuế. Bạn làm gì?',
      choices: [
        {
          text: 'Vay nặng lãi của quý tộc để nộp đủ tô thuế.',
          feedback: 'Bạn giữ được mảnh đất canh tác nhưng rơi vào bẫy nợ nần truyền kiếp. Tài sản của bạn giảm về âm.',
          changes: { wealth: 2, freedom: 10, conditions: 20, status: 15 }
        },
        {
          text: 'Bỏ trốn lên thành thị làm thợ thủ công tự do.',
          feedback: 'Bạn thoát ly khỏi sự kiềm tỏa của địa chủ, gia nhập hàng ngũ thị dân tự do. Tự do tăng mạnh nhưng cuộc sống mới bấp bênh.',
          changes: { wealth: 25, freedom: 50, conditions: 30, status: 35 }
        },
        {
          text: 'Liên kết với dân làng tổ chức chống nộp tô.',
          feedback: 'Địa chủ sai lính canh xuống đàn áp. Cuộc xung đột vũ trang nổ ra. Giai cấp mâu thuẫn đẩy lên cực đỉnh. Bạn trở thành thủ lĩnh nghĩa quân!',
          changes: { wealth: 10, freedom: 30, conditions: 15, status: 70 }
        }
      ]
    }
  },
  {
    id: 'worker',
    name: 'Công nhân (Worker)',
    era: 'Chủ nghĩa Tư bản',
    desc: 'Bán sức lao động trong nhà máy công nghiệp. Nhận đồng lương ít ỏi và chịu áp lực tăng ca liên tục.',
    meansOfProduction: 'Không có tư liệu sản xuất (Chỉ sở hữu sức lao động cá nhân)',
    stats: { wealth: 30, freedom: 50, conditions: 30, status: 30 },
    event: {
      question: 'Chủ nhà máy tăng giờ làm từ 12 lên 16 tiếng nhưng giảm lương để cạnh tranh thị trường. Bạn xử trí thế nào?',
      choices: [
        {
          text: 'Vận động thành lập Công đoàn, đình công bãi thị.',
          feedback: 'Nhà máy bị đình trệ. Cảnh sát can thiệp, nhưng công đoàn của bạn đã buộc chủ doanh nghiệp thỏa hiệp rút ngắn giờ làm. Tự do & vị thế tăng!',
          changes: { wealth: 25, freedom: 65, conditions: 50, status: 60 }
        },
        {
          text: 'Chấp nhận tăng ca để tránh bị sa thải.',
          feedback: 'Bạn giữ được công việc, nhưng kiệt quệ thể xác. Giá trị thặng dư của bạn bị vắt kiệt tối đa cho nhà tư bản.',
          changes: { wealth: 35, freedom: 30, conditions: 10, status: 20 }
        },
        {
          text: 'Phá hoại máy móc nhà xưởng (Phong trào đập phá máy móc).',
          feedback: 'Hành động phản kháng tự phát phá hỏng dây chuyền sản xuất. Bạn bị đuổi việc và truy nã. Mâu thuẫn giai cấp đẩy lên tột cùng.',
          changes: { wealth: 5, freedom: 10, conditions: 15, status: 40 }
        }
      ]
    }
  },
  {
    id: 'bourgeoisie',
    name: 'Chủ nô (Slave Owner)',
    era: 'Xã hội Chiếm hữu Nô lệ',
    desc: 'Sở hữu hàng trăm nô lệ, đất đai trù phú và quyền lực chính trị tuyệt đối tại Viện Nguyên Lão.',
    meansOfProduction: 'Sở hữu tư nhân tuyệt đối mọi tư liệu sản xuất và nô lệ',
    stats: { wealth: 95, freedom: 95, conditions: 95, status: 95 },
    event: {
      question: 'Phát hiện một nhóm nô lệ đang tích trữ nông cụ để lập mưu nổi loạn khởi nghĩa. Bạn làm gì?',
      choices: [
        {
          text: 'Ra lệnh xử tử thị uy ngay lập tức.',
          feedback: 'Các nô lệ khiếp sợ phục tùng trở lại. Tài sản và địa vị của bạn được bảo toàn vững chắc.',
          changes: { wealth: 95, freedom: 90, conditions: 95, status: 98 }
        },
        {
          text: 'Cải thiện nhẹ chế độ ăn uống để xoa dịu mâu thuẫn.',
          feedback: 'Nô lệ bớt phẫn nộ lâm thời, nhưng chi phí tăng nhẹ làm giảm một chút tích lũy tài sản của bạn.',
          changes: { wealth: 88, freedom: 95, conditions: 95, status: 90 }
        }
      ]
    }
  },
  {
    id: 'landlord',
    name: 'Quý tộc / Địa chủ (Landlord)',
    era: 'Chế độ Phong kiến',
    desc: 'Quản lý thái ấp, thu tô thuế nông dân và hưởng các đặc quyền thế tập từ triều đình.',
    meansOfProduction: 'Sở hữu toàn bộ ruộng đất canh tác trong vùng lãnh địa',
    stats: { wealth: 85, freedom: 90, conditions: 90, status: 90 },
    event: {
      question: 'Triều đình yêu cầu trưng thu thêm tô thuế để chuẩn bị cho chiến tranh. Bạn đẩy gánh nặng này thế nào?',
      choices: [
        {
          text: 'Ép nông nô đóng thêm 20% thuế sản lượng.',
          feedback: 'Hầu bao của bạn không bị ảnh hưởng, nhưng sự oán hận của nông nô dâng cao, nguy cơ bùng nổ bạo động.',
          changes: { wealth: 90, freedom: 90, conditions: 90, status: 80 }
        },
        {
          text: 'Tự bỏ tiền túi đóng thuế để đổi lấy lòng trung thành.',
          feedback: 'Lòng trung thành của nông dân tăng giúp lãnh địa yên bình, song tài sản quý tộc của bạn sụt giảm đáng kể.',
          changes: { wealth: 70, freedom: 90, conditions: 90, status: 95 }
        }
      ]
    }
  },
  {
    id: 'capitalist',
    name: 'Nhà Tư bản (Capitalist)',
    era: 'Chủ nghĩa Tư bản',
    desc: 'Sở hữu tập đoàn công nghiệp, kiểm soát dây chuyền sản xuất lớn và tối đa hóa lợi nhuận thặng dư.',
    meansOfProduction: 'Sở hữu tư nhân đối với toàn bộ nhà máy, cổ phần và dây chuyền kỹ thuật',
    stats: { wealth: 98, freedom: 95, conditions: 95, status: 90 },
    event: {
      question: 'Công nhân đình công đòi giảm giờ làm xuống 8 tiếng/ngày và tăng lương. Bạn phản ứng ra sao?',
      choices: [
        {
          text: 'Thuê cảnh sát và lực lượng bảo an trấn áp cuộc đình công.',
          feedback: 'Cuộc đình công bị dập tắt, công nhân phải quay lại làm việc. Lợi nhuận phục hồi nhưng xung đột giai cấp âm ỉ.',
          changes: { wealth: 95, freedom: 95, conditions: 95, status: 85 }
        },
        {
          text: 'Đồng ý nhượng bộ một phần, tăng lương 5% và giữ nguyên giờ làm.',
          feedback: 'Công nhân tạm chấp nhận. Lợi nhuận của bạn giảm nhẹ nhưng doanh nghiệp hoạt động ổn định không bị đình trệ.',
          changes: { wealth: 90, freedom: 95, conditions: 95, status: 92 }
        },
        {
          text: 'Đầu tư mua máy móc tự động hóa để sa thải bớt công nhân đình công.',
          feedback: 'Năng suất lao động tăng vọt nhờ công nghệ mới, giảm phụ thuộc vào sức lao động thủ công. Bạn tích lũy thêm thặng dư lớn.',
          changes: { wealth: 99, freedom: 95, conditions: 95, status: 95 }
        }
      ]
    }
  }
];

export default function RoleplaySimulation({ audioEnabled }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentStats, setCurrentStats] = useState(null);
  const [activeChoice, setActiveChoice] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  const handleRoleSelect = (role) => {
    if (audioEnabled) {
      sound.playTick();
      sound.playDrone();
    }
    setSelectedRole(role);
    setCurrentStats({ ...role.stats });
    setActiveChoice(null);
    setFeedbackText('');
  };

  const handleChoice = (choice, idx) => {
    if (audioEnabled) {
      if (choice.changes.freedom < currentStats.freedom || choice.changes.wealth < currentStats.wealth) {
        sound.playClang();
      } else {
        sound.playTrumpet();
      }
    }
    setActiveChoice(idx);
    setCurrentStats(choice.changes);
    setFeedbackText(choice.feedback);
  };

  const handleReset = () => {
    if (audioEnabled) sound.playTick();
    setSelectedRole(null);
    setCurrentStats(null);
    setActiveChoice(null);
    setFeedbackText('');
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 z-10 relative">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-soviet-red/30 bg-soviet-red/10 text-soviet-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <User className="w-3.5 h-3.5" />
          Mô Phỏng Nhập Vai
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-soviet-beige mb-4">
          Hãy Chọn Vai Trò Của Bạn Trong Lịch Sử
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Trải nghiệm thực tế cuộc sống, điều kiện lao động, và sở hữu tư liệu sản xuất của các giai cấp đối kháng qua từng thời kỳ để hiểu rõ căn nguyên của xung đột.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedRole ? (
          /* Grid of Roles */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rolesData.map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className="bg-[#1b1b22] hover:bg-[#22222c] border border-soviet-border hover:border-soviet-gold/50 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between shadow-lg hover:shadow-2xl group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs uppercase tracking-wider text-soviet-red font-bold">
                      {role.era}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#14141a] flex items-center justify-center text-soviet-gold group-hover:bg-soviet-red group-hover:text-white transition-colors duration-300">
                      <UserCheck className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-soviet-beige group-hover:text-soviet-gold transition-colors mb-2">
                    {role.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {role.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-soviet-border text-xs text-gray-400">
                  <span className="font-semibold text-soviet-gold">Tư liệu sản xuất:</span> {role.meansOfProduction}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          /* Simulator Dashboard */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 shadow-2xl relative"
          >
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-soviet-border pb-6 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-soviet-red font-bold">
                  Bảng Điều Khiển Mô Phỏng / {selectedRole.era}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-soviet-gold mt-1">
                  {selectedRole.name}
                </h3>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-[#14141a] hover:bg-soviet-red hover:text-white border border-soviet-border px-4 py-2 rounded-lg text-sm transition-colors text-gray-400"
              >
                <RefreshCw className="w-4 h-4" /> Đổi vai trò khác
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Gauges Side */}
              <div className="lg:col-span-5 bg-[#14141a] border border-soviet-border rounded-xl p-6 space-y-6">
                <h4 className="text-sm font-bold text-soviet-beige uppercase tracking-wider mb-4 border-b border-soviet-border pb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-soviet-gold" /> Chỉ số trạng thái cá nhân
                </h4>
                
                {/* Gauge 1: Wealth */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400 flex items-center gap-1"><Coins className="w-3.5 h-3.5" /> Tài sản / Thu nhập</span>
                    <span className="font-semibold text-white">{currentStats.wealth}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#0f0f12] rounded-full overflow-hidden border border-soviet-border">
                    <div 
                      className="h-full bg-yellow-500 transition-all duration-500" 
                      style={{ width: `${currentStats.wealth}%` }}
                    />
                  </div>
                </div>

                {/* Gauge 2: Freedom */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400 flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> Quyền tự do & Dân sự</span>
                    <span className="font-semibold text-white">{currentStats.freedom}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#0f0f12] rounded-full overflow-hidden border border-soviet-border">
                    <div 
                      className="h-full bg-green-500 transition-all duration-500" 
                      style={{ width: `${currentStats.freedom}%` }}
                    />
                  </div>
                </div>

                {/* Gauge 3: Working Conditions */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Điều kiện làm việc</span>
                    <span className="font-semibold text-white">{currentStats.conditions}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#0f0f12] rounded-full overflow-hidden border border-soviet-border">
                    <div 
                      className="h-full bg-cyan-500 transition-all duration-500" 
                      style={{ width: `${currentStats.conditions}%` }}
                    />
                  </div>
                </div>

                {/* Gauge 4: Social Status */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400 flex items-center gap-1"><Star className="w-3.5 h-3.5" /> Địa vị xã hội / Uy tín</span>
                    <span className="font-semibold text-white">{currentStats.status}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#0f0f12] rounded-full overflow-hidden border border-soviet-border">
                    <div 
                      className="h-full bg-purple-500 transition-all duration-500" 
                      style={{ width: `${currentStats.status}%` }}
                    />
                  </div>
                </div>

                {/* Means of production info */}
                <div className="mt-4 p-4 bg-[#1b1b22] border border-soviet-border rounded-lg text-xs">
                  <div className="text-soviet-gold font-bold uppercase mb-1">Quan hệ sở hữu tư liệu sản xuất:</div>
                  <p className="text-gray-300 italic">{selectedRole.meansOfProduction}</p>
                </div>
              </div>

              {/* Event & Story Side */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                
                {/* Event Card */}
                <div className="bg-[#14141a] border border-soviet-border rounded-xl p-6 mb-6">
                  <span className="inline-block bg-soviet-red/20 text-soviet-red text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-3 border border-soviet-red/30 animate-pulse">
                    Tình huống lịch sử xảy ra
                  </span>
                  <h4 className="text-lg font-bold text-soviet-beige leading-snug">
                    {selectedRole.event.question}
                  </h4>
                </div>

                {/* Choices */}
                <div className="space-y-3">
                  {selectedRole.event.choices.map((choice, idx) => {
                    const isSelected = activeChoice === idx;
                    return (
                      <button
                        key={idx}
                        disabled={activeChoice !== null}
                        onClick={() => handleChoice(choice, idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                          isSelected
                            ? 'bg-soviet-red/20 border-soviet-gold text-white'
                            : activeChoice !== null
                              ? 'opacity-40 border-soviet-border text-gray-500 cursor-not-allowed'
                              : 'bg-[#1b1b22] hover:bg-[#22222a] border-soviet-border hover:border-soviet-gold/50 text-gray-300'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-xs ${
                          isSelected ? 'border-soviet-gold bg-soviet-gold text-soviet-dark font-bold' : 'border-gray-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm font-semibold">{choice.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Presentation */}
                <AnimatePresence>
                  {feedbackText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-[#1b1b22] border-l-4 border-soviet-gold rounded-r-lg text-sm text-gray-300 leading-relaxed shadow-lg"
                    >
                      <span className="font-bold text-soviet-gold block mb-1">Kết quả & Phân tích lý thuyết:</span>
                      {feedbackText}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

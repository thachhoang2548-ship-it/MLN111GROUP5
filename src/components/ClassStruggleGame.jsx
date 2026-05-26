import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Heart, TrendingUp, AlertTriangle, Play, RefreshCw, MessageSquare } from 'lucide-react';
import { sound } from './SoundManager';

const scenarios = [
  {
    id: 1,
    title: 'Quyết sách về Luật Lao Động',
    desc: 'Làn sóng công nhân đình công nổ ra trên diện rộng, đòi giảm giờ làm xuống 40 giờ/tuần và tăng lương tối thiểu thêm 25% để bù đắp lạm phát. Giới chủ phản đối kịch liệt vì lo ngại giảm sức cạnh tranh quốc gia.',
    choices: [
      {
        text: 'Đáp ứng toàn bộ yêu sách: Giảm giờ làm, tăng lương tối thiểu.',
        result: 'Nhân dân phấn khởi, mâu thuẫn giai cấp giảm mạnh, nhưng giới đầu tư rút vốn nhẹ do chi phí tăng.',
        changes: { conflict: -25, stability: 15, inequality: -20 }
      },
      {
        text: 'Sử dụng bảo an giải tán đình công, cấm thành lập công đoàn.',
        result: 'Cuộc đình công bị dập tắt tạm thời nhưng xung đột bùng phát ngầm dữ dội. Bất bình đẳng tăng cao.',
        changes: { conflict: 30, stability: -25, inequality: 15 }
      },
      {
        text: 'Đàm phán hòa giải: Chỉ tăng lương 10% và giữ nguyên giờ làm.',
        result: 'Cả hai bên đều không hoàn toàn thỏa mãn, mâu thuẫn giảm nhẹ nhưng bất bình đẳng không đổi.',
        changes: { conflict: -5, stability: 5, inequality: 0 }
      }
    ]
  },
  {
    id: 2,
    title: 'Thuế tài sản đối với giới siêu giàu',
    desc: 'Đề xuất áp thuế tài sản lũy tiến lên đến 45% đối với các cá nhân có tài sản trên 100 tỷ đồng để tài trợ phúc lợi xã hội, y tế và giáo dục công miễn phí.',
    choices: [
      {
        text: 'Thông qua luật áp thuế tài sản cao.',
        result: 'Bất bình đẳng giảm mạnh. Người nghèo có thêm cơ hội tiếp cận giáo dục, song giới tư bản đe dọa dịch chuyển nhà máy.',
        changes: { conflict: -20, stability: 20, inequality: -30 }
      },
      {
        text: 'Bác bỏ dự luật để thu hút dòng vốn đầu tư.',
        result: 'Các nhà tài phiệt hài lòng, nhưng các tổ chức lao động biểu tình rầm rộ phản đối chính quyền bắt tay với tư bản.',
        changes: { conflict: 25, stability: -20, inequality: 20 }
      },
      {
        text: 'Chỉ áp thuế tượng trưng 5% kèm các khoản giảm trừ.',
        result: 'Tác động thực tế không đáng kể. Người dân thất vọng vì chính sách mang tính thỏa hiệp nửa vời.',
        changes: { conflict: 10, stability: -5, inequality: 5 }
      }
    ]
  },
  {
    id: 3,
    title: 'Quyết định trước Đe dọa Độc lập Kinh tế từ bên ngoài',
    desc: 'Một siêu tập đoàn đa quốc gia yêu cầu miễn thuế tài nguyên trọn đời và đặc quyền tự trị pháp lý tại các khu công nghiệp trọng điểm để đầu tư. Giai cấp tư bản muốn nhượng bộ để hưởng lợi nhuận liên doanh, còn nhân dân lo sợ mất độc lập dân tộc.',
    choices: [
      {
        text: 'Từ chối nhượng bộ, quốc hữu hóa tài nguyên thiên nhiên dưới quyền tự chủ của quốc gia.',
        result: 'Khơi dậy lòng yêu nước, khối liên minh công-nông-trí thức được thắt chặt, đoàn kết dân tộc tăng vọt, mâu thuẫn giai cấp giảm bớt.',
        changes: { conflict: -25, stability: 30, inequality: -15 }
      },
      {
        text: 'Nhượng bộ hoàn toàn để thu hút FDI bằng mọi giá.',
        result: 'Kinh tế tăng trưởng số liệu ảo nhưng chủ quyền quốc gia bị xâm phạm, công nhân bản địa bị bóc lột kép bởi tư bản nội và ngoại.',
        changes: { conflict: 35, stability: -30, inequality: 25 }
      },
      {
        text: 'Thỏa hiệp: Thuế tài nguyên ở mức trung bình, buộc tập đoàn tuyển dụng 80% quản lý là người bản địa.',
        result: 'Giảm thiểu thiệt hại, bảo vệ được một phần lợi ích dân tộc song bất công lao động vẫn chưa được giải quyết dứt điểm.',
        changes: { conflict: 5, stability: 5, inequality: 5 }
      }
    ]
  },
  {
    id: 4,
    title: 'Hợp pháp hóa Công đoàn độc lập',
    desc: 'Các nhóm công nhân công nghệ và tài xế công nghệ (gig-workers) nỗ lực thành lập các tổ chức tự quản công đoàn độc lập để thương lượng tập thể, vượt qua sự cấm cản của các tập đoàn đa quốc gia.',
    choices: [
      {
        text: 'Hợp pháp hóa hoàn toàn quyền tự lập công đoàn.',
        result: 'Công nhân đoàn kết tốt, tự do thương lượng tăng. Bất bình đẳng giảm, mâu thuẫn xã hội đi vào đối thoại hòa bình.',
        changes: { conflict: -15, stability: 15, inequality: -15 }
      },
      {
        text: 'Cấm công đoàn tự phát, ép tham gia công đoàn chịu quản lý nhà nước.',
        result: 'Hoạt động công đoàn bị bóp nghẹt. Sự bức xúc xã hội tăng cao, nguy cơ biểu tình tự phát bất hợp pháp.',
        changes: { conflict: 20, stability: -15, inequality: 10 }
      },
      {
        text: 'Để mặc các doanh nghiệp tự thỏa thuận với người lao động.',
        result: 'Các doanh nghiệp dùng ưu thế sa thải để ép công nhân ký cam kết không tham gia công đoàn.',
        changes: { conflict: 15, stability: -10, inequality: 15 }
      }
    ]
  }
];

export default function ClassStruggleGame({ audioEnabled }) {
  const [round, setRound] = useState(0);
  const [conflict, setConflict] = useState(60);
  const [stability, setStability] = useState(50);
  const [inequality, setInequality] = useState(70);
  const [gameEnded, setGameEnded] = useState(false);
  const [lastResult, setLastResult] = useState('');

  const clampValue = (val) => Math.max(0, Math.min(100, val));

  const handleChoiceSelect = (choice) => {
    if (audioEnabled) {
      if (choice.changes.conflict > 0) sound.playClang();
      else sound.playTrumpet();
    }

    setConflict(prev => clampValue(prev + choice.changes.conflict));
    setStability(prev => clampValue(prev + choice.changes.stability));
    setInequality(prev => clampValue(prev + choice.changes.inequality));
    setLastResult(choice.result);

    if (round < scenarios.length - 1) {
      setRound(prev => prev + 1);
    } else {
      setGameEnded(true);
    }
  };

  const resetGame = () => {
    if (audioEnabled) sound.playTick();
    setRound(0);
    setConflict(60);
    setStability(50);
    setInequality(70);
    setGameEnded(false);
    setLastResult('');
  };

  // Get propaganda news based on current statistics
  const getPropagandaNews = () => {
    if (conflict > 75) {
      return 'TIN KHẨN: Đình công lớn nổ ra tại khu công nghiệp trung tâm! Hàng vạn lao động bãi công đòi lật đổ giới quản lý...';
    }
    if (inequality > 80) {
      return 'THỐNG KÊ: Khoảng cách giàu nghèo đạt kỷ lục, 1% người giàu nắm giữ khối lượng tài sản gấp 100 lần nửa dưới dân số...';
    }
    if (stability < 35) {
      return 'BÁO CÁO CẢNH BÁO: Chỉ số an ninh xã hội sụt giảm nghiêm trọng, nguy cơ bất ổn hiến pháp tăng cao...';
    }
    return 'BẢN TIN: Các tổ chức xã hội kêu gọi đối thoại quốc gia nhằm hòa hợp giai cấp và xây dựng khối đoàn kết dân tộc...';
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
          <Radio className="w-3.5 h-3.5 text-soviet-red animate-pulse" />
          Trình Giả Lập Quyết Sách Xã Hội
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-soviet-beige mb-4">
          Mini-Game: Quyết Sách Giai Cấp & Dân Tộc
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Hãy đóng vai trò nhà hoạch định chính sách, cân nhắc mâu thuẫn giai cấp trong nước và lợi ích độc lập dân tộc trước sức ép của chủ nghĩa tư bản toàn cầu hóa.
        </p>
      </div>

      {/* Dynamic Scrolling News Ticker */}
      <div className="w-full bg-red-950/20 border border-soviet-red/30 rounded-lg p-2.5 mb-8 flex items-center overflow-hidden gap-4 text-xs font-mono">
        <span className="bg-soviet-red text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse flex-shrink-0">
          Radio Công Nhân
        </span>
        <div className="relative w-full overflow-hidden h-5">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute whitespace-nowrap text-soviet-gold font-bold"
          >
            {getPropagandaNews()}
          </motion.div>
        </div>
      </div>

      {/* Main Game Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Status Gauges */}
        <div className="lg:col-span-4 bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <h3 className="text-lg font-serif font-bold text-soviet-beige mb-6 border-b border-soviet-border pb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-soviet-gold" /> Chỉ số đo lường xã hội
            </h3>
            
            <div className="space-y-6">
              {/* Conflict Meter */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-400">🔥 Mâu thuẫn giai cấp</span>
                  <span className={`font-bold ${conflict > 70 ? 'text-red-500 animate-pulse' : 'text-gray-300'}`}>{conflict}%</span>
                </div>
                <div className="w-full h-3 bg-[#14141a] rounded-full overflow-hidden border border-soviet-border">
                  <motion.div
                    animate={{ width: `${conflict}%` }}
                    transition={{ type: 'spring', stiffness: 80 }}
                    className={`h-full rounded-full ${
                      conflict > 75 
                        ? 'bg-gradient-to-r from-red-700 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
                        : 'bg-gradient-to-r from-red-900 to-red-600'
                    }`}
                  />
                </div>
              </div>

              {/* Stability / National Unity Meter */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-400">⚖️ Ổn định & Đoàn kết dân tộc</span>
                  <span className={`font-bold ${stability < 30 ? 'text-orange-500 animate-pulse' : 'text-gray-300'}`}>{stability}%</span>
                </div>
                <div className="w-full h-3 bg-[#14141a] rounded-full overflow-hidden border border-soviet-border">
                  <motion.div
                    animate={{ width: `${stability}%` }}
                    transition={{ type: 'spring', stiffness: 80 }}
                    className={`h-full rounded-full ${
                      stability < 35 
                        ? 'bg-gradient-to-r from-orange-700 to-orange-500' 
                        : 'bg-gradient-to-r from-green-800 to-green-600'
                    }`}
                  />
                </div>
              </div>

              {/* Inequality Meter */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-400">📊 Bất bình đẳng kinh tế</span>
                  <span className={`font-bold ${inequality > 75 ? 'text-amber-500 animate-pulse' : 'text-gray-300'}`}>{inequality}%</span>
                </div>
                <div className="w-full h-3 bg-[#14141a] rounded-full overflow-hidden border border-soviet-border">
                  <motion.div
                    animate={{ width: `${inequality}%` }}
                    transition={{ type: 'spring', stiffness: 80 }}
                    className="h-full bg-gradient-to-r from-yellow-800 to-yellow-600 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-[#14141a] border border-soviet-border rounded-xl text-xs text-gray-400">
            {conflict > 75 && (
              <div className="flex items-start gap-2 text-red-500">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>Cảnh báo cách mạng:</strong> Mâu thuẫn giai cấp quá cao sẽ đẩy xã hội vào các cuộc nổi dậy vũ trang và đình công toàn quốc!
                </span>
              </div>
            )}
            {conflict <= 75 && stability >= 60 && (
              <div className="text-green-500">
                ✔️ Xã hội hiện tại đang ở trạng thái cân bằng ổn định tương đối tạm thời.
              </div>
            )}
            {conflict <= 75 && stability < 60 && (
              <div className="text-yellow-500">
                ⚠️ Bất ổn âm ỉ. Người lao động đang mất dần kiên nhẫn.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Gameplay Card */}
        <div className="lg:col-span-8 bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {!gameEnded ? (
              <motion.div
                key={round}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-soviet-gold uppercase tracking-widest bg-soviet-gold/10 px-2 py-0.5 rounded border border-soviet-gold/20">
                      Tình huống {round + 1} / {scenarios.length}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">Quyết định lập pháp</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-soviet-beige mb-4 leading-snug">
                    {scenarios[round].title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 bg-[#14141a] p-4 rounded-xl border border-soviet-border">
                    {scenarios[round].desc}
                  </p>
                </div>

                <div className="space-y-4">
                  {scenarios[round].choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoiceSelect(choice)}
                      className="w-full text-left p-4 rounded-xl bg-[#14141a] hover:bg-soviet-red/10 border border-soviet-border hover:border-soviet-red/50 transition-all duration-300 text-sm text-gray-300 hover:text-white font-semibold flex items-center gap-3 cursor-pointer"
                    >
                      <span className="w-6 h-6 rounded-full border border-soviet-red text-soviet-red flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      {choice.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="end"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col justify-between h-full text-center py-6"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-soviet-gold mb-4">
                    Kết Quả Giả Lập Xã Hội
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6">
                    Sau các vòng quyết sách lập pháp, bạn đã định hình cấu trúc xã hội với các chỉ số cuối cùng:
                  </p>

                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8 bg-[#14141a] p-4 rounded-xl border border-soviet-border">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Mâu thuẫn</div>
                      <div className="text-2xl font-bold text-red-500">{conflict}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Đoàn kết Dân tộc</div>
                      <div className="text-2xl font-bold text-green-500">{stability}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Bất bình đẳng</div>
                      <div className="text-2xl font-bold text-yellow-500">{inequality}%</div>
                    </div>
                  </div>

                  {/* Summary evaluation */}
                  <div className="p-5 bg-soviet-red/5 border border-soviet-red/20 rounded-xl max-w-xl mx-auto text-sm text-gray-300 leading-relaxed mb-8">
                    <span className="font-bold text-soviet-gold block mb-1">Kết luận học thuyết lịch sử:</span>
                    {conflict > 70 ? (
                      'Mâu thuẫn giai cấp vượt quá giới hạn. Độc lập kinh tế dân tộc bị đe dọa dẫn đến phong trào cách mạng kết hợp giải phóng dân tộc và giải phóng giai cấp bùng nổ dữ dội để lật đổ trật tự cũ.'
                    ) : inequality > 75 ? (
                      'Khoảng cách giàu nghèo sâu sắc tiếp tục xói mòn lòng tin của nhân dân. Mặc dù tinh thần dân tộc được nêu cao để ổn định xã hội, nhưng sự bóc lột tích tụ sẽ dẫn tới nguy cơ khủng hoảng kép trong tương lai.'
                    ) : (
                      'Bạn đã giữ vững chủ quyền dân tộc đồng thời giảm thiểu khoảng cách giàu nghèo nội tại. Đây là tiền đề vững chắc cho việc xây dựng khối đại đoàn kết dân tộc bền vững trên cơ sở lợi ích của toàn thể nhân dân lao động.'
                    )}
                  </div>
                </div>

                <button
                  onClick={resetGame}
                  className="mx-auto flex items-center gap-2 bg-gradient-to-r from-soviet-red to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg border border-soviet-gold/30 transition-transform hover:-translate-y-0.5 text-sm cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Bắt đầu giả lập lại
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Last Result Alert */}
          {!gameEnded && lastResult && (
            <div className="mt-6 p-3.5 bg-soviet-red/10 border-l-4 border-soviet-red rounded text-xs text-gray-300">
              <strong>Phản hồi vòng trước:</strong> {lastResult}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

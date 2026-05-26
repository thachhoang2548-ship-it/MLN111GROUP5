import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Award, CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from './SoundManager';

const quizQuestions = [
  {
    id: 1,
    topic: 'Định nghĩa Giai cấp',
    question: 'Theo định nghĩa kinh điển của V.I.Lênin, đặc trưng cơ bản nhất phân định các giai cấp khác nhau trong xã hội là gì?',
    options: [
      'Địa vị chính trị, uy tín cá nhân và tôn giáo của các thành viên.',
      'Quan hệ đối với việc sở hữu tư liệu sản xuất, địa vị trong hệ thống tổ chức lao động xã hội và phương thức hưởng thụ của cải.',
      'Trình độ học vấn, học hàm học vị và kỹ năng chuyên môn nghề nghiệp.',
      'Chủng tộc, màu da, giới tính và xuất thân vùng miền.'
    ],
    answerIndex: 1,
    explanation: 'Chính quan hệ sở hữu đối với tư liệu sản xuất quyết định địa vị thống trị hay bị trị, quyết định vai trò quản lý lao động và cách phân phối tài sản trong xã hội có giai cấp.'
  },
  {
    id: 2,
    topic: 'Nguồn gốc Giai cấp',
    question: 'Theo chủ nghĩa duy vật lịch sử, nguồn gốc trực tiếp và sâu xa nhất dẫn đến sự xuất hiện giai cấp là gì?',
    options: [
      'Chiến tranh xâm lược giữa các bộ lạc thời cổ đại.',
      'Sự phân công lao động xã hội kết hợp với sự xuất hiện của chế độ tư hữu về tư liệu sản xuất.',
      'Sự bất bình đẳng về năng lực thể chất và tư duy trí tuệ của con người.',
      'Ý chí áp đặt của các thủ lĩnh quân sự phong kiến.'
    ],
    answerIndex: 1,
    explanation: 'Sự phát triển lực lượng sản xuất tạo ra của cải dư thừa, dẫn tới khả năng chiếm đoạt của dư thừa làm của riêng (chế độ tư hữu), hình thành nên giai cấp bóc lột và bị bóc lột.'
  },
  {
    id: 3,
    topic: 'Đấu tranh Giai cấp',
    question: 'Vì sao đấu tranh giai cấp được coi là động lực phát triển của các xã hội có giai cấp đối kháng?',
    options: [
      'Vì nó tiêu diệt lực lượng lao động dư thừa để cân bằng xã hội.',
      'Vì nó giải quyết các mâu thuẫn giai cấp, lật đổ quan hệ sản xuất lỗi thời kìm hãm để thay thế bằng quan hệ sản xuất mới tiến bộ hơn.',
      'Vì nó giúp giới chủ tập trung thêm nguồn vốn tư bản lớn.',
      'Vì nó duy trì sự thống trị vĩnh viễn của các triều đại quý tộc.'
    ],
    answerIndex: 1,
    explanation: 'Đấu tranh giai cấp đạt đỉnh điểm dẫn đến cách mạng xã hội, phá vỡ quan hệ sản xuất cũ lỗi thời, mở đường cho lực lượng sản xuất phát triển mạnh mẽ.'
  },
  {
    id: 4,
    topic: 'Sự hình thành Dân tộc',
    question: 'Sự hình thành dân tộc ở châu Âu gắn liền với thời kỳ nào và phương thức sản xuất nào?',
    options: [
      'Thời kỳ cổ đại - Phương thức sản xuất chiếm hữu nô lệ La Mã.',
      'Thời kỳ cận đại - Phương thức sản xuất tư bản chủ nghĩa, xóa bỏ sự biệt lập cát cứ phong kiến.',
      'Thời kỳ trung cổ - Phương thức sản xuất phong kiến nông nghiệp.',
      'Thời kỳ hiện đại - Xu hướng toàn cầu hóa của thế kỷ 21.'
    ],
    answerIndex: 1,
    explanation: 'Chủ nghĩa tư bản phát triển thúc đẩy liên kết kinh tế, thống nhất thị trường, ngôn ngữ, văn hóa lãnh thổ, từ đó hình thành nên các quốc gia dân tộc cận đại.'
  },
  {
    id: 5,
    topic: 'Quan hệ Giai cấp và Dân tộc',
    question: 'Nhận định nào dưới đây đúng nhất về mối quan hệ biện chứng giữa giai cấp và dân tộc?',
    options: [
      'Lợi ích dân tộc hoàn toàn tách rời và không bị chi phối bởi giai cấp thống trị.',
      'Lợi ích giai cấp thống trị quyết định xu hướng phát triển và bản chất của dân tộc; giải phóng giai cấp là cơ sở để giải phóng dân tộc triệt để.',
      'Mâu thuẫn dân tộc luôn gay gắt hơn mâu thuẫn giai cấp trong mọi hoàn cảnh lịch sử.',
      'Đấu tranh giai cấp phá hoại tính thống trị vững bền của dân tộc.'
    ],
    answerIndex: 1,
    explanation: 'Giai cấp thống trị đại diện cho quốc gia dân tộc ở đối ngoại, lợi ích của họ chi phối đường lối dân tộc. Giải phóng giai cấp vô sản là tiền đề xóa bỏ áp bức dân tộc giữa các quốc gia.'
  }
];

export default function QuizSystem({ audioEnabled }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeQuestion = quizQuestions[currentIdx];

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    if (audioEnabled) sound.playTick();
    setSelectedOpt(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOpt === null || isAnswered) return;
    
    setIsAnswered(true);
    const isCorrect = selectedOpt === activeQuestion.answerIndex;
    
    if (isCorrect) {
      if (audioEnabled) sound.playTrumpet();
      setScore(prev => prev + 1);
      // Trigger mini confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      if (audioEnabled) sound.playClang();
    }
  };

  const handleNext = () => {
    if (audioEnabled) sound.playTick();
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      // Trigger major celebratory fanfare
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const resetQuiz = () => {
    if (audioEnabled) sound.playTick();
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4 z-10 relative">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-soviet-red/30 bg-soviet-red/10 text-soviet-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Bài Tập Củng Cố
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-soviet-beige mb-4">
          Trắc Nghiệm Khắc Sâu Kiến Thức
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Kiểm tra nhanh mức độ hiểu biết của bạn về lý thuyết Giai cấp và Dân tộc theo Chủ nghĩa duy vật lịch sử.
        </p>
      </div>

      <div className="bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 shadow-2xl relative min-h-[480px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col justify-between h-full flex-grow"
            >
              <div>
                {/* Question Info Bar */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-soviet-gold uppercase tracking-widest bg-soviet-gold/10 px-2 py-0.5 rounded border border-soviet-gold/20">
                    Chuyên đề: {activeQuestion.topic}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Câu {currentIdx + 1} / {quizQuestions.length}
                  </span>
                </div>

                {/* Question Text */}
                <h3 className="text-lg md:text-xl font-bold text-soviet-beige mb-6 leading-snug">
                  {activeQuestion.question}
                </h3>

                {/* Options list */}
                <div className="space-y-3.5 mb-6">
                  {activeQuestion.options.map((option, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isCorrect = idx === activeQuestion.answerIndex;
                    
                    let cardStyle = 'bg-[#14141a] border-soviet-border text-gray-300 hover:border-soviet-gold/40';
                    if (isSelected) cardStyle = 'bg-soviet-red/10 border-soviet-gold text-white';
                    if (isAnswered) {
                      if (isCorrect) cardStyle = 'bg-green-950/20 border-green-500 text-green-300';
                      else if (isSelected) cardStyle = 'bg-red-950/20 border-red-500 text-red-300';
                      else cardStyle = 'bg-[#14141a] border-soviet-border text-gray-500 opacity-60';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 text-sm ${cardStyle}`}
                      >
                        <span className={`w-5.5 h-5.5 rounded-full border flex-shrink-0 flex items-center justify-center font-bold text-[11px] ${
                          isAnswered && isCorrect 
                            ? 'bg-green-500 border-green-500 text-soviet-dark' 
                            : isAnswered && isSelected
                              ? 'bg-red-500 border-red-500 text-white'
                              : isSelected
                                ? 'bg-soviet-gold border-soviet-gold text-soviet-dark'
                                : 'border-gray-500'
                        }`}>
                          {isAnswered && isCorrect ? '✓' : isAnswered && isSelected ? '✗' : String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action and feedback footer */}
              <div>
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-xs leading-relaxed mb-6 border ${
                        selectedOpt === activeQuestion.answerIndex
                          ? 'bg-green-950/10 border-green-500/20 text-green-300'
                          : 'bg-red-950/10 border-red-500/20 text-red-300'
                      }`}
                    >
                      <strong className="block mb-1">
                        {selectedOpt === activeQuestion.answerIndex ? '🎉 CHÍNH XÁC!' : '❌ CHƯA ĐÚNG!'} Phân tích lý thuyết:
                      </strong>
                      {activeQuestion.explanation}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-end">
                  {!isAnswered ? (
                    <button
                      disabled={selectedOpt === null}
                      onClick={handleCheckAnswer}
                      className={`py-3 px-6 rounded-lg text-sm font-semibold transition-all ${
                        selectedOpt === null
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed border border-transparent'
                          : 'bg-gradient-to-r from-soviet-red to-red-700 hover:from-red-600 hover:to-red-800 text-white border border-soviet-gold/30 shadow-lg'
                      }`}
                    >
                      Kiểm Tra Đáp Án
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-1 bg-gradient-to-r from-soviet-red to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg border border-soviet-gold/30 shadow-lg text-sm"
                    >
                      {currentIdx < quizQuestions.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả'} <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Results Screen */
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 flex flex-col items-center justify-center flex-grow"
            >
              <Award className="w-16 h-16 text-soviet-gold mb-4 animate-bounce" />
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-soviet-beige mb-2">
                Hoàn Thành Trắc Nghiệm!
              </h3>
              <p className="text-gray-400 text-sm max-w-md mb-6">
                Chúc mừng bạn đã hoàn thành bài củng cố lý luận về Giai cấp và Dân tộc.
              </p>

              <div className="text-5xl font-extrabold text-soviet-gold font-mono mb-8 bg-[#14141a] px-8 py-4 rounded-2xl border border-soviet-border shadow-inner">
                {score} / {quizQuestions.length}
              </div>

              <div className="text-sm text-gray-300 max-w-lg mb-8 leading-relaxed italic">
                {score === quizQuestions.length ? (
                  'Xuất sắc! Bạn đã thấu suốt toàn diện các quan điểm cốt lõi của Chủ nghĩa duy vật lịch sử về sự phát triển xã hội.'
                ) : score >= 3 ? (
                  'Rất tốt! Bạn nắm khá vững lý thuyết nền tảng và đã sẵn sàng cho bài thi kết thúc học phần.'
                ) : (
                  'Hãy đọc kỹ lại các nội dung trong infographics và timeline để củng cố thêm các khái niệm căn bản.'
                )}
              </div>

              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 bg-gradient-to-r from-soviet-red to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg border border-soviet-gold/30 shadow-lg text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Làm lại bài trắc nghiệm
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
